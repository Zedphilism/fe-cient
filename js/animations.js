/* ============================================================
   animations.js — Simulation Controllers
   NetCore Academy

   All simulations live here.
   Each sim is mounted into a container element and stepped
   through by the user (or auto-played).

   Depends on: progress.js, gamification.js (must load first)

   Public API:
     Animations.runSimulation(simId, containerEl)
     Animations.stopSimulation(simId)

   Sim IDs:
     sim-client-server    Client pings server, server responds
     sim-socket           Process A → socket → network → Process B
     sim-packet-flow      IP packet through routers (client→server)
     sim-network-core     Network edge → access → core routers
     sim-tcp-handshake    3-way handshake (SYN / SYN-ACK / ACK)
     sim-http-request     HTTP GET → 200 OK step-by-step
     sim-tcp-vs-udp       Reliable delivery vs fire-and-forget
     sim-persistent-http  Persistent vs non-persistent connections
     sim-protocol-stack   Layered protocol encapsulation
     sim-access-network   Last-mile connection types
     sim-p2p              Peer-to-peer file sharing
     sim-addressing       IP:port socket addressing
     sim-app-layer        HTTP/SMTP/FTP/DNS app-layer protocols
     sim-http-methods     GET/POST/HEAD/PUT request methods
     sim-http-pipeline    DNS→TCP→GET→Response→Render pipeline
     sim-email-delivery   SMTP/IMAP email delivery chain
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     TEXT CONSTANTS
  ---------------------------------------------------------- */

  const TEXT = {
    btn_next:      'Next Step',
    btn_reset:     'Reset',
    btn_autoplay:  'Auto-Play',
    btn_pause:     'Pause',
    btn_replay:    'Replay',
    step_of:       'Step',
    of:            'of',
    complete:      'Simulation complete',
    xp_earned:     '+15 XP — Simulation Complete!'
  };

  /* ----------------------------------------------------------
     ACTIVE SIM REGISTRY
     Allows stopSimulation() to clean up running timers/intervals
  ---------------------------------------------------------- */

  const _active = {};   // { [instanceId]: controller }

  /* ----------------------------------------------------------
     SHARED RENDER UTILITIES
  ---------------------------------------------------------- */

  /**
   * Build the standard sim shell: canvas + log + controls.
   * instanceId is used for all DOM element IDs (unique per mount).
   * simId is kept separately for Progress.completeSimulation().
   */
  function buildShell(simId, stepCount, instanceId) {
    const id = instanceId || simId;
    const host = document.createElement('div');
    host.className = 'sim-container';
    host.id = id + '-host';

    const canvas = document.createElement('div');
    canvas.className = 'sim-canvas';
    canvas.id = id + '-canvas';

    const log = document.createElement('div');
    log.className = 'sim-log';
    log.id = id + '-log';

    const controls = document.createElement('div');
    controls.className = 'sim-controls';
    controls.innerHTML = `
      <button class="btn-sim" id="${id}-next">${TEXT.btn_next}</button>
      <button class="btn-sim" id="${id}-auto">&#9654; ${TEXT.btn_autoplay}</button>
      <button class="btn-sim" id="${id}-reset">${TEXT.btn_reset}</button>
      <span   class="sim-status" id="${id}-status">
        ${TEXT.step_of} 0 ${TEXT.of} ${stepCount}
      </span>`;

    host.appendChild(canvas);
    host.appendChild(log);
    host.appendChild(controls);
    return { host, canvas, log, controls };
  }

  /** Update the step counter label */
  function setStatus(simId, current, total, instanceId) {
    const id = instanceId || simId;
    const el = document.getElementById(id + '-status');
    if (el) el.textContent = current >= total
      ? TEXT.complete
      : `${TEXT.step_of} ${current} ${TEXT.of} ${total}`;
  }

  /** Write a message to the sim log panel */
  function setLog(simId, html, instanceId) {
    const id = instanceId || simId;
    const el = document.getElementById(id + '-log');
    if (!el) return;
    el.innerHTML = `<span class="sim-log-msg anim-fade-in">${html}</span>`;
  }

  /** Create an SVG element with a viewBox */
  function makeSVG(w, h) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width',   '100%');
    svg.setAttribute('height',  h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.style.display = 'block';
    return svg;
  }

  /** Create an SVG element by tag */
  function svgEl(tag, attrs) {
    const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  }

  /** Draw a node circle + label in SVG */
  function svgNode(svg, cx, cy, r, label, sublabel, color) {
    color = color || '#00f5ff';
    const g = svgEl('g');

    // Glow filter id
    const filtId = 'glow-' + Math.random().toString(36).slice(2);
    const defs = svgEl('defs');
    const filter = svgEl('filter', { id: filtId, x: '-50%', y: '-50%', width: '200%', height: '200%' });
    const blur = svgEl('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: '3', result: 'blur' });
    const merge = svgEl('feMerge');
    const mn1 = svgEl('feMergeNode', { in: 'blur' });
    const mn2 = svgEl('feMergeNode', { in: 'SourceGraphic' });
    merge.appendChild(mn1); merge.appendChild(mn2);
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
    svg.insertBefore(defs, svg.firstChild);

    const circle = svgEl('circle', {
      cx, cy, r,
      fill:   'rgba(255,255,255,0.04)',
      stroke: color,
      'stroke-width': '1.5',
      filter: `url(#${filtId})`
    });

    const text = svgEl('text', {
      x: cx, y: cy + 4,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      fill: color,
      'font-family': 'JetBrains Mono, monospace',
      'font-size': '10',
      'font-weight': '600'
    });
    text.textContent = label;

    const lbl = svgEl('text', {
      x: cx, y: cy + r + 14,
      'text-anchor': 'middle',
      fill: '#64748b',
      'font-family': 'JetBrains Mono, monospace',
      'font-size': '9'
    });
    lbl.textContent = sublabel || '';

    g.appendChild(circle);
    g.appendChild(text);
    g.appendChild(lbl);
    svg.appendChild(g);
    return circle;   // return circle for pulse animation
  }

  /** Draw a connector line between two points */
  function svgLine(svg, x1, y1, x2, y2, color, dashed) {
    color = color || 'rgba(255,255,255,0.08)';
    const line = svgEl('line', {
      x1, y1, x2, y2,
      stroke: color,
      'stroke-width': '1.5',
      'stroke-dasharray': dashed ? '6 4' : 'none'
    });
    svg.appendChild(line);
    return line;
  }

  /**
   * Animate a packet div along a straight path from (x1,y1) to (x2,y2)
   * inside a positioned canvas element.  Returns a Promise.
   */
  function animatePacket(canvas, x1, y1, x2, y2, color, label, durationMs) {
    return new Promise(resolve => {
      color      = color      || 'var(--accent-cyan)';
      durationMs = durationMs || 600;

      const pkt = document.createElement('div');
      pkt.className = 'sim-packet';
      pkt.style.cssText = `
        position:absolute;
        left:${x1}px; top:${y1}px;
        width:12px; height:12px;
        border-radius:50%;
        background:${color};
        box-shadow:0 0 10px ${color};
        transition:left ${durationMs}ms ease, top ${durationMs}ms ease;
        z-index:10;
        pointer-events:none;`;

      if (label) {
        const lbl = document.createElement('span');
        lbl.style.cssText = `
          position:absolute; top:-18px; left:50%;
          transform:translateX(-50%);
          font-family:'JetBrains Mono',monospace;
          font-size:9px; color:${color};
          white-space:nowrap;`;
        lbl.textContent = label;
        pkt.appendChild(lbl);
      }

      canvas.style.position = 'relative';
      canvas.appendChild(pkt);

      requestAnimationFrame(() => {
        setTimeout(() => {
          pkt.style.left = x2 + 'px';
          pkt.style.top  = y2 + 'px';
          setTimeout(() => {
            pkt.remove();
            resolve();
          }, durationMs + 100);
        }, 30);
      });
    });
  }

  /**
   * Draw an animated arrow from (x1,y1) to (x2,y2) in SVG.
   * Returns the drawn elements so caller can remove them.
   */
  function svgArrow(svg, x1, y1, x2, y2, color, label, animDur) {
    color   = color   || 'var(--accent-cyan)';
    animDur = animDur || '0.5s';

    const length = Math.hypot(x2 - x1, y2 - y1);
    const g = svgEl('g');

    const line = svgEl('line', {
      x1, y1, x2, y2,
      stroke: color,
      'stroke-width': '1.5',
      'stroke-dasharray': length,
      'stroke-dashoffset': length
    });

    // Arrowhead
    const angle  = Math.atan2(y2 - y1, x2 - x1);
    const tipX   = x2 - 8 * Math.cos(angle);
    const tipY   = y2 - 8 * Math.sin(angle);
    const arrow  = svgEl('polygon', {
      points: `${x2},${y2} ${tipX + 4*Math.sin(angle)},${tipY - 4*Math.cos(angle)} ${tipX - 4*Math.sin(angle)},${tipY + 4*Math.cos(angle)}`,
      fill:   color,
      opacity: '0'
    });

    // Mid-point label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - 10;
    const lbl  = svgEl('text', {
      x: midX, y: midY,
      'text-anchor': 'middle',
      fill: color,
      'font-family': 'JetBrains Mono, monospace',
      'font-size': '9',
      opacity: '0'
    });
    lbl.textContent = label || '';

    g.appendChild(line);
    g.appendChild(arrow);
    g.appendChild(lbl);
    svg.appendChild(g);

    // Trigger draw animation
    requestAnimationFrame(() => {
      line.style.transition  = `stroke-dashoffset ${animDur} ease`;
      arrow.style.transition = `opacity 0.2s ${animDur}`;
      lbl.style.transition   = `opacity 0.2s ${animDur}`;
      setTimeout(() => {
        line.setAttribute('stroke-dashoffset', '0');
        arrow.setAttribute('opacity', '1');
        lbl.setAttribute('opacity', '1');
      }, 30);
    });

    return g;   // caller can remove() this group to erase the arrow
  }

  /** Pulse a node circle (scale up then back) */
  function pulseNode(circleEl, color) {
    if (!circleEl) return;
    color = color || '#00f5ff';
    const orig = circleEl.getAttribute('stroke');
    circleEl.style.transition = 'none';
    circleEl.setAttribute('stroke', color);
    circleEl.setAttribute('stroke-width', '3');
    circleEl.style.filter = `drop-shadow(0 0 8px ${color})`;
    setTimeout(() => {
      circleEl.setAttribute('stroke-width', '1.5');
      circleEl.style.filter = '';
      circleEl.setAttribute('stroke', orig || color);
    }, 500);
  }

  /* ----------------------------------------------------------
     STEP-RUNNER FACTORY
     Creates a standard next/reset/autoplay controller for any sim.
  ---------------------------------------------------------- */

  /**
   * Wire up Next / Reset / Auto-play buttons for a sim.
   * instanceId: used to find the control buttons in the DOM (unique per mount).
   * simId: used for Progress.completeSimulation() (the logical sim name).
   * steps: array of functions (each called in sequence).
   * onReset: function to re-build the canvas.
   * onComplete: optional callback when all steps done.
   */
  function makeController(instanceId, simId, steps, onReset, onComplete) {
    let current   = 0;
    let autoTimer = null;
    let playing   = false;

    const nextBtn  = document.getElementById(instanceId + '-next');
    const autoBtn  = document.getElementById(instanceId + '-auto');
    const resetBtn = document.getElementById(instanceId + '-reset');

    function doStep() {
      if (current >= steps.length) return;
      steps[current]();
      current++;
      setStatus(simId, current, steps.length, instanceId);
      if (current >= steps.length) {
        if (nextBtn)  nextBtn.disabled = true;
        if (autoBtn)  autoBtn.textContent = '↺ ' + TEXT.btn_replay;
        // Award sim XP once on completion
        if (typeof onComplete === 'function') onComplete();
        else Progress.completeSimulation(simId);
      }
    }

    function reset() {
      clearInterval(autoTimer);
      playing = false;
      current = 0;
      if (nextBtn)  { nextBtn.disabled = false; }
      if (autoBtn)  { autoBtn.textContent = '▶ ' + TEXT.btn_autoplay; }
      setStatus(simId, 0, steps.length, instanceId);
      setLog(simId, '', instanceId);
      onReset();
    }

    function toggleAuto() {
      if (current >= steps.length) { reset(); return; }
      if (playing) {
        clearInterval(autoTimer);
        playing = false;
        if (autoBtn) autoBtn.textContent = '▶ ' + TEXT.btn_autoplay;
      } else {
        playing = true;
        if (autoBtn) autoBtn.textContent = '⏸ ' + TEXT.btn_pause;
        doStep();
        autoTimer = setInterval(() => {
          if (current >= steps.length) {
            clearInterval(autoTimer);
            playing = false;
            if (autoBtn) autoBtn.textContent = '↺ ' + TEXT.btn_replay;
          } else {
            doStep();
          }
        }, 1200);
      }
    }

    if (nextBtn)  nextBtn.addEventListener('click',  doStep);
    if (autoBtn)  autoBtn.addEventListener('click',  toggleAuto);
    if (resetBtn) resetBtn.addEventListener('click',  reset);

    return { doStep, reset, toggleAuto,
             stop: () => clearInterval(autoTimer) };
  }

  /* ============================================================
     INSTANCE ID HELPER
     Derives a unique instance ID from the container element.
  ============================================================ */

  function getInstanceId(containerEl, simId) {
    if (containerEl && containerEl.id) {
      return containerEl.id.replace('sim-mount-', '') + '-sim';
    }
    return simId;
  }

  /* ============================================================
     SIM 1: sim-client-server
     Client sends request → Server responds
     ============================================================ */

  function buildClientServer(containerEl, instanceId) {
    const simId = 'sim-client-server';
    const W = 500, H = 140;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Static track line
    svgLine(svg, 90, 70, 410, 70, 'rgba(255,255,255,0.06)');

    // Nodes
    const cNode = svgNode(svg,  70, 70, 30, '💻', 'CLIENT', '#00f5ff');
    const sNode = svgNode(svg, 430, 70, 30, '🖥️', 'SERVER', '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);

    let arrows = [];

    function clearArrows() {
      arrows.forEach(a => a.remove());
      arrows = [];
    }

    const steps = [
      () => {
        setLog(simId, '① <strong>Client</strong> wants to load a web page. It knows the server\'s IP address and port.', instanceId);
        pulseNode(cNode, '#00f5ff');
      },
      () => {
        setLog(simId, '② Client sends an <strong>HTTP request</strong> across the network to the server.', instanceId);
        arrows.push(svgArrow(svg, 105, 62, 395, 62, '#00f5ff', 'HTTP Request →'));
      },
      () => {
        setLog(simId, '③ <strong>Server</strong> receives the request, processes it, and prepares a response.', instanceId);
        pulseNode(sNode, '#a855f7');
      },
      () => {
        setLog(simId, '④ Server sends <strong>HTTP response</strong> (200 OK + data) back to the client. ✓', instanceId);
        arrows.push(svgArrow(svg, 395, 78, 105, 78, '#a855f7', '← 200 OK'));
        pulseNode(cNode, '#00ff88');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);
    });
  }

  /* ============================================================
     SIM 2: sim-socket
     Process A → Socket → Network → Socket → Process B
     ============================================================ */

  function buildSocket(containerEl, instanceId) {
    const simId = 'sim-socket';
    const W = 560, H = 150;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Background track
    svgLine(svg, 60, 75, 500, 75, 'rgba(255,255,255,0.06)');

    const procA  = svgNode(svg,  40, 75, 28, 'A',  'Process A', '#00f5ff');
    const sockA  = svgNode(svg, 150, 75, 22, '⬡',  'Socket A',  '#00ff88');
    const net    = svgNode(svg, 280, 75, 32, '🌐', 'Network',   '#ff6b35');
    const sockB  = svgNode(svg, 410, 75, 22, '⬡',  'Socket B',  '#00ff88');
    const procB  = svgNode(svg, 520, 75, 28, 'B',  'Process B', '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Process A</strong> creates data it wants to send to Process B. Processes communicate through <em>sockets</em> — the OS-managed interface between app and network.', instanceId);
        pulseNode(procA, '#00f5ff');
      },
      () => {
        setLog(simId, '② Process A <strong>pushes data into Socket A</strong>. The socket is like a door — the app writes data in, and the transport layer picks it up.', instanceId);
        arrows.push(svgArrow(svg, 72, 68, 125, 68, '#00f5ff', 'write()'));
        pulseNode(sockA, '#00ff88');
      },
      () => {
        setLog(simId, '③ The <strong>transport layer</strong> (TCP/UDP) packages the data into segments and sends them across the network.', instanceId);
        arrows.push(svgArrow(svg, 176, 68, 245, 68, '#00ff88', 'segments →'));
        pulseNode(net, '#ff6b35');
      },
      () => {
        setLog(simId, '④ Data arrives at <strong>Socket B</strong> on the destination machine. The OS buffers it until Process B reads.', instanceId);
        arrows.push(svgArrow(svg, 316, 68, 385, 68, '#ff6b35', '→ deliver'));
        pulseNode(sockB, '#00ff88');
      },
      () => {
        setLog(simId, '⑤ <strong>Process B calls read()</strong> on Socket B and receives the data. Communication complete. ✓', instanceId);
        arrows.push(svgArrow(svg, 436, 68, 488, 68, '#a855f7', 'read()'));
        pulseNode(procB, '#a855f7');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);
    });
  }

  /* ============================================================
     SIM 3: sim-packet-flow
     IP Packet: Client → Router 1 → Router 2 → Server
     ============================================================ */

  function buildPacketFlow(containerEl, instanceId) {
    const simId = 'sim-packet-flow';
    const W = 560, H = 160;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 70, 80, 490, 80, 'rgba(255,255,255,0.06)');

    const cNode  = svgNode(svg,  50, 80, 28, '💻', 'Client',    '#00f5ff');
    const r1Node = svgNode(svg, 190, 80, 24, 'R1', 'Router 1',  '#ff6b35');
    const r2Node = svgNode(svg, 330, 80, 24, 'R2', 'Router 2',  '#ff6b35');
    const sNode  = svgNode(svg, 490, 80, 28, '🖥️', 'Server',    '#a855f7');

    // TTL label
    const ttlLbl = svgEl('text', {
      x: 280, y: 140,
      'text-anchor': 'middle',
      fill: '#64748b',
      'font-family': 'JetBrains Mono, monospace',
      'font-size': '9'
    });
    ttlLbl.textContent = '';
    svg.appendChild(ttlLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; ttlLbl.textContent = ''; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Client</strong> creates an IP packet with destination address = server IP. TTL (Time To Live) is set to 64 — decremented at each router hop.', instanceId);
        pulseNode(cNode, '#00f5ff');
        ttlLbl.textContent = 'TTL = 64';
      },
      () => {
        setLog(simId, '② Packet transmitted on the link to <strong>Router 1</strong>. Router 1 checks its forwarding table and decrements TTL → 63.', instanceId);
        arrows.push(svgArrow(svg, 82, 72, 163, 72, '#00f5ff', 'pkt →'));
        pulseNode(r1Node, '#ff6b35');
        ttlLbl.textContent = 'TTL = 63';
      },
      () => {
        setLog(simId, '③ Router 1 forwards the packet to <strong>Router 2</strong>. TTL → 62. If TTL ever hits 0, the packet is dropped and an ICMP "Time Exceeded" is sent back.', instanceId);
        arrows.push(svgArrow(svg, 218, 72, 303, 72, '#ff6b35', 'pkt →'));
        pulseNode(r2Node, '#ff6b35');
        ttlLbl.textContent = 'TTL = 62';
      },
      () => {
        setLog(simId, '④ Router 2 forwards to the destination network. Packet is on the final link toward the server.', instanceId);
        arrows.push(svgArrow(svg, 358, 72, 460, 72, '#ff6b35', 'pkt →'));
        ttlLbl.textContent = 'TTL = 61';
      },
      () => {
        setLog(simId, '⑤ <strong>Server</strong> receives the packet. Checks destination IP matches its own, passes payload up to the transport layer. ✓', instanceId);
        pulseNode(sNode, '#a855f7');
        ttlLbl.textContent = 'Delivered ✓';
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to begin.', instanceId);
    });
  }

  /* ============================================================
     SIM 4: sim-tcp-handshake
     SYN → SYN-ACK → ACK
     ============================================================ */

  function buildTcpHandshake(containerEl, instanceId) {
    const simId = 'sim-tcp-handshake';
    const W = 500, H = 200;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Vertical lifelines
    svgLine(svg, 80,  30, 80,  180, '#00f5ff', true);
    svgLine(svg, 420, 30, 420, 180, '#a855f7', true);

    // Node boxes
    svgNode(svg,  80, 20, 20, 'C', 'Client', '#00f5ff');
    svgNode(svg, 420, 20, 20, 'S', 'Server', '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to begin. TCP requires a 3-way handshake before data can flow.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const yPositions = [70, 110, 150];

    const steps = [
      () => {
        setLog(simId, '① <strong>SYN</strong> — Client wants to open a connection. It sends a segment with the SYN flag set and a random sequence number (e.g. seq=100). Server must be LISTENING.', instanceId);
        arrows.push(svgArrow(svg, 100, yPositions[0], 400, yPositions[0], '#00f5ff', 'SYN  seq=100'));
      },
      () => {
        setLog(simId, '② <strong>SYN-ACK</strong> — Server acknowledges the client\'s SYN (ack=101) and sends its own SYN with a new sequence number (seq=300). Server enters SYN-RECEIVED state.', instanceId);
        arrows.push(svgArrow(svg, 400, yPositions[1], 100, yPositions[1], '#a855f7', 'SYN-ACK  seq=300  ack=101'));
      },
      () => {
        setLog(simId, '③ <strong>ACK</strong> — Client acknowledges the server\'s SYN (ack=301). Both sides are now in ESTABLISHED state. The connection is open.', instanceId);
        arrows.push(svgArrow(svg, 100, yPositions[2], 400, yPositions[2], '#00ff88', 'ACK  ack=301'));
      },
      () => {
        setLog(simId, '✓ <strong>Connection established.</strong> 3-way handshake complete. Data segments can now flow in both directions. Each segment will carry seq/ack numbers to guarantee reliable, ordered delivery.', instanceId);
        // Highlight both lifelines green
        svg.querySelectorAll('line').forEach(l => {
          if (l.getAttribute('stroke-dasharray')) {
            l.setAttribute('stroke', '#00ff88');
          }
        });
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      svg.querySelectorAll('line').forEach(l => {
        if (l.getAttribute('stroke-dasharray')) {
          l.setAttribute('stroke', 'rgba(255,255,255,0.12)');
        }
      });
      setLog(simId, 'Press <strong>Next Step</strong> to begin. TCP requires a 3-way handshake before data can flow.', instanceId);
    });
  }

  /* ============================================================
     SIM 5: sim-http-request
     Full HTTP GET → 200 OK flow with headers shown
     ============================================================ */

  function buildHttpRequest(containerEl, instanceId) {
    const simId = 'sim-http-request';
    const W = 500, H = 220;
    const { host, canvas } = buildShell(simId, 6, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 80,  30, 80,  200, '#00f5ff', true);
    svgLine(svg, 420, 30, 420, 200, '#a855f7', true);
    svgNode(svg,  80, 20, 20, 'C', 'Client', '#00f5ff');
    svgNode(svg, 420, 20, 20, 'S', 'Server', '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to begin. We\'ll trace one full HTTP/1.1 GET request.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const ys = [60, 90, 115, 145, 170, 195];

    const steps = [
      () => {
        setLog(simId, '① <strong>TCP Connection</strong> — Before HTTP can run, a TCP connection is established (3-way handshake). HTTP is an application-layer protocol that runs over TCP.', instanceId);
        arrows.push(svgArrow(svg, 100, ys[0], 400, ys[0], '#64748b', '── TCP connect ──'));
        arrows.push(svgArrow(svg, 400, ys[1], 100, ys[1], '#64748b', '── SYN-ACK ──'));
      },
      () => {
        setLog(simId,
          '② <strong>HTTP Request</strong> sent by client:<br>' +
          '<code>GET /index.html HTTP/1.1</code><br>' +
          '<code>Host: www.example.com</code><br>' +
          '<code>Connection: keep-alive</code>', instanceId);
        arrows.push(svgArrow(svg, 100, ys[2], 400, ys[2], '#00f5ff', 'GET /index.html'));
      },
      () => {
        setLog(simId, '③ <strong>Server processes</strong> the request — looks up the resource on disk, reads the file, builds the response headers.', instanceId);
        const proc = svgEl('rect', { x: 400, y: ys[2] + 8, width: 36, height: 14,
          rx: 3, fill: 'rgba(168,85,247,0.2)', stroke: '#a855f7', 'stroke-width': '1' });
        const ptxt = svgEl('text', { x: 418, y: ys[2]+17, 'text-anchor':'middle',
          fill:'#a855f7','font-size':'8','font-family':'JetBrains Mono,monospace' });
        ptxt.textContent = 'proc…';
        arrows.push(proc); arrows.push(ptxt);
        svg.appendChild(proc); svg.appendChild(ptxt);
      },
      () => {
        setLog(simId,
          '④ <strong>HTTP Response</strong> sent by server:<br>' +
          '<code>HTTP/1.1 200 OK</code><br>' +
          '<code>Content-Type: text/html</code><br>' +
          '<code>Content-Length: 1240</code>', instanceId);
        arrows.push(svgArrow(svg, 400, ys[3], 100, ys[3], '#00ff88', '← 200 OK + body'));
      },
      () => {
        setLog(simId, '⑤ <strong>Client renders</strong> the page. With <code>Connection: keep-alive</code> (HTTP/1.1 default), the TCP connection stays open — no new handshake needed for the next request.', instanceId);
        arrows.push(svgArrow(svg, 100, ys[4], 400, ys[4], '#00f5ff', 'GET /style.css'));
      },
      () => {
        setLog(simId, '⑥ Server responds again on the <strong>same connection</strong>. This is <em>persistent HTTP</em> — one TCP connection, multiple request/response pairs. Far more efficient than non-persistent. ✓', instanceId);
        arrows.push(svgArrow(svg, 400, ys[5], 100, ys[5], '#00ff88', '← 200 OK'));
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to begin. We\'ll trace one full HTTP/1.1 GET request.', instanceId);
    });
  }

  /* ============================================================
     SIM 6: sim-tcp-vs-udp
     Side-by-side reliable vs fire-and-forget
     ============================================================ */

  function buildTcpVsUdp(containerEl, instanceId) {
    const simId = 'sim-tcp-vs-udp';
    const W = 560, H = 220;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Divider
    svgLine(svg, 280, 10, 280, 210, 'rgba(255,255,255,0.08)');

    // TCP column (left)
    const tcpLbl = svgEl('text', { x: 140, y: 18, 'text-anchor':'middle',
      fill:'#00f5ff','font-size':'10','font-weight':'700','font-family':'JetBrains Mono,monospace' });
    tcpLbl.textContent = 'TCP — Reliable';
    svg.appendChild(tcpLbl);

    svgLine(svg,  60, 30,  60, 205, '#00f5ff', true);
    svgLine(svg, 220, 30, 220, 205, '#00f5ff', true);
    svgNode(svg,  60, 22, 14, 'C', null, '#00f5ff');
    svgNode(svg, 220, 22, 14, 'S', null, '#00f5ff');

    // UDP column (right)
    const udpLbl = svgEl('text', { x: 420, y: 18, 'text-anchor':'middle',
      fill:'#ff6b35','font-size':'10','font-weight':'700','font-family':'JetBrains Mono,monospace' });
    udpLbl.textContent = 'UDP — Best-Effort';
    svg.appendChild(udpLbl);

    svgLine(svg, 320, 30, 320, 205, '#ff6b35', true);
    svgLine(svg, 500, 30, 500, 205, '#ff6b35', true);
    svgNode(svg, 320, 22, 14, 'C', null, '#ff6b35');
    svgNode(svg, 500, 22, 14, 'S', null, '#ff6b35');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to compare TCP and UDP side by side.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① Both sides begin. <strong>TCP</strong> performs a 3-way handshake before any data — overhead but guarantees a connection. <strong>UDP</strong> just sends immediately — no handshake.', instanceId);
        arrows.push(svgArrow(svg,  76, 48, 204, 48, '#00f5ff', 'SYN →', '0.4s'));
        arrows.push(svgArrow(svg, 204, 62,  76, 62, '#00f5ff', '← SYN-ACK', '0.4s'));
        arrows.push(svgArrow(svg,  76, 76, 204, 76, '#00f5ff', 'ACK →', '0.4s'));
        // UDP: send immediately
        arrows.push(svgArrow(svg, 336, 48, 484, 48, '#ff6b35', 'datagram 1 →', '0.4s'));
      },
      () => {
        setLog(simId, '② <strong>TCP</strong>: Sends segment 1, then <em>waits</em> for acknowledgment before sending segment 2. This ensures the receiver got it. <strong>UDP</strong>: Keeps blasting datagrams — no waiting.', instanceId);
        arrows.push(svgArrow(svg,  76, 100, 204, 100, '#00f5ff', 'data[1] →'));
        arrows.push(svgArrow(svg, 336,  75, 484,  75, '#ff6b35', 'datagram 2 →'));
        arrows.push(svgArrow(svg, 336,  95, 484,  95, '#ff6b35', 'datagram 3 →'));
      },
      () => {
        setLog(simId, '③ <strong>TCP</strong> receiver sends ACK — "segment 1 received." Sender can now send segment 2. <strong>UDP</strong> receiver got datagrams 1 and 3 — datagram 2 was lost in the network. No notification to sender.', instanceId);
        arrows.push(svgArrow(svg, 204, 115,  76, 115, '#00ff88', '← ACK 1'));
        // UDP: loss indicator
        const lost = svgEl('text', { x: 410, y: 112, 'text-anchor':'middle',
          fill:'#ff3366','font-size':'10','font-family':'JetBrains Mono,monospace' });
        lost.textContent = '✗ lost';
        svg.appendChild(lost);
        arrows.push(lost);
      },
      () => {
        setLog(simId, '④ <strong>TCP</strong>: Sends segment 2. If no ACK arrives within the timeout window, TCP will <em>retransmit</em>. <strong>UDP</strong>: Sender keeps sending. Lost datagram 2 is gone — no retransmit, no recovery.', instanceId);
        arrows.push(svgArrow(svg,  76, 135, 204, 135, '#00f5ff', 'data[2] →'));
        arrows.push(svgArrow(svg, 336, 130, 484, 130, '#ff6b35', 'datagram 4 →'));
      },
      () => {
        setLog(simId,
          '⑤ <strong>Summary:</strong><br>' +
          '• TCP: reliable, ordered, congestion-controlled — ideal for HTTP, email, file transfer.<br>' +
          '• UDP: low-latency, no overhead — ideal for DNS, video streaming, online gaming, VoIP.', instanceId);
        arrows.push(svgArrow(svg, 204, 158,  76, 158, '#00ff88', '← ACK 2'));
        const udpDone = svgEl('text', { x: 412, y: 165, 'text-anchor':'middle',
          fill:'#ff6b35','font-size':'9','font-family':'JetBrains Mono,monospace' });
        udpDone.textContent = 'no ACK — done';
        svg.appendChild(udpDone);
        arrows.push(udpDone);
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to compare TCP and UDP side by side.', instanceId);
    });
  }

  /* ============================================================
     SIM 7: sim-persistent-http
     Non-persistent vs Persistent HTTP connection timelines
     ============================================================ */

  function buildPersistentHttp(containerEl, instanceId) {
    const simId = 'sim-persistent-http';
    const W = 560, H = 230;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Divider
    svgLine(svg, 280, 10, 280, 220, 'rgba(255,255,255,0.08)');

    // Non-persistent column
    const npLbl = svgEl('text', { x: 140, y: 16, 'text-anchor':'middle',
      fill:'#ff6b35','font-size':'9','font-weight':'700','font-family':'JetBrains Mono,monospace' });
    npLbl.textContent = 'Non-Persistent HTTP';
    svg.appendChild(npLbl);

    svgLine(svg,  55, 24,  55, 215, '#ff6b35', true);
    svgLine(svg, 220, 24, 220, 215, '#ff6b35', true);
    svgNode(svg,  55, 16, 12, 'C', null, '#ff6b35');
    svgNode(svg, 220, 16, 12, 'S', null, '#ff6b35');

    // Persistent column
    const pLbl = svgEl('text', { x: 420, y: 16, 'text-anchor':'middle',
      fill:'#00ff88','font-size':'9','font-weight':'700','font-family':'JetBrains Mono,monospace' });
    pLbl.textContent = 'Persistent HTTP';
    svg.appendChild(pLbl);

    svgLine(svg, 315, 24, 315, 215, '#00ff88', true);
    svgLine(svg, 500, 24, 500, 215, '#00ff88', true);
    svgNode(svg, 315, 16, 12, 'C', null, '#00ff88');
    svgNode(svg, 500, 16, 12, 'S', null, '#00ff88');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to compare non-persistent vs persistent HTTP.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Request 1.</strong> Both sides open a TCP connection first. Non-persistent: new connection per object. Persistent: one connection reused.', instanceId);
        // NP: TCP open
        arrows.push(svgArrow(svg,  67, 40, 208, 40, '#ff6b35', 'TCP open', '0.35s'));
        arrows.push(svgArrow(svg, 208, 52,  67, 52, '#ff6b35', '',          '0.35s'));
        // P: TCP open
        arrows.push(svgArrow(svg, 327, 40, 488, 40, '#00ff88', 'TCP open', '0.35s'));
        arrows.push(svgArrow(svg, 488, 52, 327, 52, '#00ff88', '',          '0.35s'));
      },
      () => {
        setLog(simId, '② <strong>First GET</strong> on both. Same request cost either way — 1 RTT for the request + 1 RTT for response. Persistent keeps the connection open; non-persistent closes it.', instanceId);
        arrows.push(svgArrow(svg,  67, 68, 208, 68, '#ff6b35', 'GET obj1'));
        arrows.push(svgArrow(svg, 208, 82,  67, 82, '#ff6b35', '← 200 OK'));
        // NP close
        const npClose = svgEl('text', { x: 138, y: 98, 'text-anchor':'middle',
          fill:'#ff6b35','font-size':'8.5','font-family':'JetBrains Mono,monospace' });
        npClose.textContent = '─ TCP close ─';
        svg.appendChild(npClose);
        arrows.push(npClose);
        // P: first GET (no close)
        arrows.push(svgArrow(svg, 327, 68, 488, 68, '#00ff88', 'GET obj1'));
        arrows.push(svgArrow(svg, 488, 82, 327, 82, '#00ff88', '← 200 OK'));
      },
      () => {
        setLog(simId, '③ <strong>Request 2.</strong> Non-persistent must open a <em>new TCP connection</em> — paying 1 extra RTT before the GET can be sent. Persistent skips this and immediately sends another GET.', instanceId);
        // NP: new TCP open
        arrows.push(svgArrow(svg,  67, 108, 208, 108, '#ff6b35', 'TCP open 2'));
        arrows.push(svgArrow(svg, 208, 120,  67, 120, '#ff6b35', ''));
        // P: immediate GET
        arrows.push(svgArrow(svg, 327, 100, 488, 100, '#00ff88', 'GET obj2 (pipelined)'));
      },
      () => {
        setLog(simId, '④ <strong>Response 2.</strong> Non-persistent finally gets object 2 — but needed 2 extra RTTs (TCP open + GET). Persistent delivers with no extra overhead.', instanceId);
        arrows.push(svgArrow(svg,  67, 136, 208, 136, '#ff6b35', 'GET obj2'));
        arrows.push(svgArrow(svg, 208, 150,  67, 150, '#ff6b35', '← 200 OK'));
        arrows.push(svgArrow(svg, 488, 116, 327, 116, '#00ff88', '← 200 OK'));
      },
      () => {
        setLog(simId,
          '⑤ <strong>Summary:</strong><br>' +
          '• Non-persistent: <code>2 RTT + file time</code> per object — expensive for pages with many objects.<br>' +
          '• Persistent (default in HTTP/1.1): <code>1 RTT + file time</code> after the first, connection reused until idle timeout. ✓', instanceId);
        // NP: close again
        const npClose2 = svgEl('text', { x: 138, y: 168, 'text-anchor':'middle',
          fill:'#ff6b35','font-size':'8.5','font-family':'JetBrains Mono,monospace' });
        npClose2.textContent = '─ TCP close ─';
        svg.appendChild(npClose2);
        arrows.push(npClose2);
        // P: idle close later
        const pClose = svgEl('text', { x: 412, y: 145, 'text-anchor':'middle',
          fill:'#00ff88','font-size':'8.5','font-family':'JetBrains Mono,monospace' });
        pClose.textContent = 'connection kept alive…';
        svg.appendChild(pClose);
        arrows.push(pClose);
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to compare non-persistent vs persistent HTTP.', instanceId);
    });
  }

  /* ============================================================
     SIM 8: sim-network-core
     Network edge → access network → core routers (packet vs circuit switching)
     ============================================================ */

  function buildNetworkCore(containerEl, instanceId) {
    const simId = 'sim-network-core';
    const W = 560, H = 160;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 70, 80, 490, 80, 'rgba(255,255,255,0.06)');

    const cNode  = svgNode(svg,  50, 80, 28, '🏠', 'Edge',     '#00f5ff');
    const aNode  = svgNode(svg, 175, 80, 24, 'AP', 'Access',   '#00ff88');
    const r1Node = svgNode(svg, 300, 80, 24, 'R1', 'Core R1',  '#ff6b35');
    const r2Node = svgNode(svg, 420, 80, 24, 'R2', 'Core R2',  '#ff6b35');
    const sNode  = svgNode(svg, 510, 80, 28, '🖥️', 'Server',   '#a855f7');

    // Label zones
    const edgeLbl = svgEl('text', { x: 110, y: 135, 'text-anchor': 'middle',
      fill: '#00f5ff', 'font-size': '8', 'font-family': 'JetBrains Mono,monospace' });
    edgeLbl.textContent = '← Network Edge →';
    svg.appendChild(edgeLbl);

    const coreLbl = svgEl('text', { x: 360, y: 135, 'text-anchor': 'middle',
      fill: '#ff6b35', 'font-size': '8', 'font-family': 'JetBrains Mono,monospace' });
    coreLbl.textContent = '←── Network Core ──→';
    svg.appendChild(coreLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to trace a packet through the network structure.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① The <strong>Network Edge</strong> is where end systems live — your laptop, phone, or home server. Applications (web browser, email) run here, not in the core.', instanceId);
        pulseNode(cNode, '#00f5ff');
      },
      () => {
        setLog(simId, '② The <strong>Access Network</strong> (last mile) connects your end system to the first router. Technologies: DSL, cable (HFC), FTTH, WiFi, 4G/5G.', instanceId);
        arrows.push(svgArrow(svg, 82, 72, 148, 72, '#00f5ff', 'last mile →'));
        pulseNode(aNode, '#00ff88');
      },
      () => {
        setLog(simId, '③ The packet enters the <strong>Network Core</strong> — a mesh of high-speed routers. Packet switching: the router stores the packet, checks its forwarding table, and sends it onward. <em>No dedicated circuit is reserved.</em>', instanceId);
        arrows.push(svgArrow(svg, 202, 72, 273, 72, '#00ff88', 'packet →'));
        pulseNode(r1Node, '#ff6b35');
      },
      () => {
        setLog(simId, '④ <strong>Core Router R1</strong> forwards the packet to <strong>R2</strong> via the best available path. Many user packets share the same high-speed fiber links — this is <em>statistical multiplexing</em>.', instanceId);
        arrows.push(svgArrow(svg, 328, 72, 393, 72, '#ff6b35', 'forward →'));
        pulseNode(r2Node, '#ff6b35');
      },
      () => {
        setLog(simId, '⑤ The packet arrives at the destination server. Key insight: <strong>packet switching</strong> is efficient for bursty internet traffic — no bandwidth is wasted reserving a circuit for idle time. ✓', instanceId);
        arrows.push(svgArrow(svg, 448, 72, 480, 72, '#ff6b35', '→ dest'));
        pulseNode(sNode, '#a855f7');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to trace a packet through the network structure.', instanceId);
    });
  }

  /* ============================================================
     SIM 9: sim-protocol-stack
     Layered protocol encapsulation (Ch1 Section 2 — Protocols)
     ============================================================ */

  function buildProtocolStack(containerEl, instanceId) {
    const simId = 'sim-protocol-stack';
    const W = 520, H = 180;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Layer boxes — sender side
    const layers = [
      { name: 'Application',  y: 20,  color: '#00f5ff' },
      { name: 'Transport',    y: 60,  color: '#00ff88' },
      { name: 'Network',      y: 100, color: '#ff6b35' },
      { name: 'Link/Physical',y: 140, color: '#a855f7' }
    ];

    layers.forEach(l => {
      const rect = svgEl('rect', { x: 30, y: l.y, width: 140, height: 30,
        rx: 4, fill: 'rgba(255,255,255,0.03)', stroke: l.color, 'stroke-width': '1' });
      const txt = svgEl('text', { x: 100, y: l.y + 19, 'text-anchor':'middle',
        fill: l.color, 'font-size': '9', 'font-family': 'JetBrains Mono,monospace' });
      txt.textContent = l.name;
      svg.appendChild(rect); svg.appendChild(txt);

      // Receiver side
      const rect2 = svgEl('rect', { x: 350, y: l.y, width: 140, height: 30,
        rx: 4, fill: 'rgba(255,255,255,0.03)', stroke: l.color, 'stroke-width': '1' });
      const txt2 = svgEl('text', { x: 420, y: l.y + 19, 'text-anchor':'middle',
        fill: l.color, 'font-size': '9', 'font-family': 'JetBrains Mono,monospace' });
      txt2.textContent = l.name;
      svg.appendChild(rect2); svg.appendChild(txt2);
    });

    // Sender / Receiver labels
    const senderLbl = svgEl('text', { x: 100, y: 12, 'text-anchor':'middle',
      fill:'#64748b','font-size':'8','font-family':'JetBrains Mono,monospace' });
    senderLbl.textContent = 'SENDER';
    svg.appendChild(senderLbl);

    const receiverLbl = svgEl('text', { x: 420, y: 12, 'text-anchor':'middle',
      fill:'#64748b','font-size':'8','font-family':'JetBrains Mono,monospace' });
    receiverLbl.textContent = 'RECEIVER';
    svg.appendChild(receiverLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to see how protocols layer and encapsulate data.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Application layer</strong> creates a message (e.g., HTTP request). Each layer adds its own <em>header</em> as the data passes downward — this is <strong>encapsulation</strong>.', instanceId);
        arrows.push(svgArrow(svg, 100, 50, 100, 62, layers[0].color, ''));
        const hdr = svgEl('text', { x: 175, y: 35, 'text-anchor':'start',
          fill: layers[0].color, 'font-size': '8', 'font-family': 'JetBrains Mono,monospace' });
        hdr.textContent = '+ App header';
        svg.appendChild(hdr); arrows.push(hdr);
      },
      () => {
        setLog(simId, '② <strong>Transport layer</strong> (TCP/UDP) adds a transport header — port numbers, sequence numbers. The app message is now a <em>segment</em> or <em>datagram</em>.', instanceId);
        arrows.push(svgArrow(svg, 100, 90, 100, 102, layers[1].color, ''));
        const hdr = svgEl('text', { x: 175, y: 75, 'text-anchor':'start',
          fill: layers[1].color, 'font-size': '8', 'font-family': 'JetBrains Mono,monospace' });
        hdr.textContent = '+ TCP/UDP hdr';
        svg.appendChild(hdr); arrows.push(hdr);
      },
      () => {
        setLog(simId, '③ <strong>Network layer</strong> (IP) adds source and destination IP addresses — creating a <em>packet</em>. Routers in the core operate at this layer.', instanceId);
        arrows.push(svgArrow(svg, 100, 130, 100, 142, layers[2].color, ''));
        const hdr = svgEl('text', { x: 175, y: 115, 'text-anchor':'start',
          fill: layers[2].color, 'font-size': '8', 'font-family': 'JetBrains Mono,monospace' });
        hdr.textContent = '+ IP header';
        svg.appendChild(hdr); arrows.push(hdr);
      },
      () => {
        setLog(simId, '④ <strong>Link layer</strong> adds a frame header (MAC addresses) and transmits bits. At the receiver, each layer <em>strips</em> its header and passes data upward — <strong>decapsulation</strong>. ✓', instanceId);
        // Draw the transmission arrow in the middle
        arrows.push(svgArrow(svg, 175, 155, 348, 155, '#a855f7', '─── bits on wire ───'));
        // Decap arrow at receiver
        arrows.push(svgArrow(svg, 420, 155, 420, 130, layers[2].color, ''));
        arrows.push(svgArrow(svg, 420, 115, 420, 90,  layers[1].color, ''));
        arrows.push(svgArrow(svg, 420, 75,  420, 50,  layers[0].color, ''));
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to see how protocols layer and encapsulate data.', instanceId);
    });
  }

  /* ============================================================
     SIM 10: sim-access-network
     End system → modem → central office → ISP core (Ch1 Section 4)
     ============================================================ */

  function buildAccessNetwork(containerEl, instanceId) {
    const simId = 'sim-access-network';
    const W = 560, H = 160;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 65, 80, 490, 80, 'rgba(255,255,255,0.06)');

    const homeNode  = svgNode(svg,  45, 80, 28, '🏠', 'Home',      '#00f5ff');
    const modemNode = svgNode(svg, 175, 80, 24, 'M',  'DSL/Cable', '#00ff88');
    const coNode    = svgNode(svg, 320, 80, 28, 'CO', 'DSLAM/CMTS','#ff6b35');
    const ispNode   = svgNode(svg, 470, 80, 28, '🌐', 'ISP Core',  '#a855f7');

    // Tech label
    const techLbl = svgEl('text', { x: 280, y: 148, 'text-anchor':'middle',
      fill:'#64748b','font-size':'8','font-family':'JetBrains Mono,monospace' });
    techLbl.textContent = '';
    svg.appendChild(techLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to trace the last-mile access network.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; techLbl.textContent = ''; }

    const steps = [
      () => {
        setLog(simId, '① <strong>End system</strong> (your home device) generates data. It connects to the Internet via a last-mile technology: DSL, cable HFC, FTTH, WiFi, or cellular.', instanceId);
        pulseNode(homeNode, '#00f5ff');
        techLbl.textContent = 'DSL: copper phone wire | Cable: coaxial HFC | FTTH: fiber';
      },
      () => {
        setLog(simId, '② Data travels from the home to the <strong>DSL/Cable modem</strong> (or ONT for fiber). The modem modulates digital data onto the physical medium — copper, coax, or fiber.', instanceId);
        arrows.push(svgArrow(svg, 78, 72, 148, 72, '#00f5ff', 'last mile'));
        pulseNode(modemNode, '#00ff88');
      },
      () => {
        setLog(simId, '③ The modem connects to the <strong>Central Office</strong>: a DSLAM (for DSL) or CMTS (for cable). This equipment aggregates traffic from thousands of homes and connects to the ISP backbone.', instanceId);
        arrows.push(svgArrow(svg, 202, 72, 288, 72, '#00ff88', 'upstream'));
        pulseNode(coNode, '#ff6b35');
      },
      () => {
        setLog(simId, '④ Traffic enters the <strong>ISP Core</strong> — high-speed fiber backbone connecting regional and national networks. From here, packets are routed globally. Your last-mile speed is the bottleneck. ✓', instanceId);
        arrows.push(svgArrow(svg, 351, 72, 440, 72, '#ff6b35', 'backbone'));
        pulseNode(ispNode, '#a855f7');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to trace the last-mile access network.', instanceId);
    });
  }

  /* ============================================================
     SIM 11: sim-p2p
     Peer-to-peer file sharing (Ch2 Section 2)
     ============================================================ */

  function buildP2P(containerEl, instanceId) {
    const simId = 'sim-p2p';
    const W = 520, H = 200;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Peer nodes in a rough triangle + extra
    const peerA = svgNode(svg,  80, 60,  26, 'A', 'Peer A',  '#00f5ff');
    const peerB = svgNode(svg, 260, 140, 26, 'B', 'Peer B',  '#a855f7');
    const peerC = svgNode(svg, 440, 60,  26, 'C', 'Peer C',  '#00ff88');

    // Dashed "possible links" between all peers
    svgLine(svg,  80, 60, 260, 140, 'rgba(255,255,255,0.05)', true);
    svgLine(svg, 260, 140, 440, 60, 'rgba(255,255,255,0.05)', true);
    svgLine(svg,  80, 60, 440, 60, 'rgba(255,255,255,0.05)', true);

    // "No server" label
    const noSrvLbl = svgEl('text', { x: 260, y: 16, 'text-anchor':'middle',
      fill:'#64748b','font-size':'8.5','font-family':'JetBrains Mono,monospace' });
    noSrvLbl.textContent = 'No central server — peers communicate directly';
    svg.appendChild(noSrvLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to see peer-to-peer file sharing in action.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Peer A</strong> has a file split into chunks (BitTorrent style). There is no central server — Peer A is simultaneously a client (it downloaded chunks) and a server (it can upload chunks to others).', instanceId);
        pulseNode(peerA, '#00f5ff');
      },
      () => {
        setLog(simId, '② <strong>Peer B</strong> wants the file. It discovers Peer A (via a tracker or DHT) and sends a direct <em>request</em> for specific chunks. No intermediary server handles this transfer.', instanceId);
        arrows.push(svgArrow(svg, 235, 128, 105, 72, '#a855f7', 'request chunks →'));
        pulseNode(peerB, '#a855f7');
      },
      () => {
        setLog(simId, '③ <strong>Peer A sends chunks directly to Peer B</strong>. The more Peer B downloads, the more it can share with others. Each new peer adds capacity — this is <em>self-scalability</em>.', instanceId);
        arrows.push(svgArrow(svg, 108, 72, 234, 128, '#00f5ff', '← chunks'));
        pulseNode(peerB, '#00ff88');
      },
      () => {
        setLog(simId, '④ Now <strong>Peer B seeds to Peer C</strong>. Peer B acts as a server without being one — it forwards chunks it received. The network gets stronger as more peers join. ✓', instanceId);
        arrows.push(svgArrow(svg, 286, 128, 414, 72, '#00ff88', 'chunks →'));
        pulseNode(peerC, '#00ff88');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to see peer-to-peer file sharing in action.', instanceId);
    });
  }

  /* ============================================================
     SIM 12: sim-addressing
     IP:port socket addressing (Ch2 Section 4)
     ============================================================ */

  function buildAddressing(containerEl, instanceId) {
    const simId = 'sim-addressing';
    const W = 500, H = 180;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Client and server nodes
    const cNode = svgNode(svg,  70, 90, 30, '💻', 'Client', '#00f5ff');
    const sNode = svgNode(svg, 430, 90, 30, '🖥️', 'Server', '#a855f7');
    svgLine(svg, 104, 90, 397, 90, 'rgba(255,255,255,0.06)');

    // Address labels (dynamic)
    const clientAddrLbl = svgEl('text', { x: 70, y: 145, 'text-anchor':'middle',
      fill:'#00f5ff','font-size':'8','font-family':'JetBrains Mono,monospace' });
    clientAddrLbl.textContent = '';
    svg.appendChild(clientAddrLbl);

    const serverAddrLbl = svgEl('text', { x: 430, y: 145, 'text-anchor':'middle',
      fill:'#a855f7','font-size':'8','font-family':'JetBrains Mono,monospace' });
    serverAddrLbl.textContent = 'IP: 93.184.216.34';
    svg.appendChild(serverAddrLbl);

    const portLbl = svgEl('text', { x: 430, y: 157, 'text-anchor':'middle',
      fill:'#a855f7','font-size':'8','font-family':'JetBrains Mono,monospace' });
    portLbl.textContent = 'Port: 80 (HTTP)';
    svg.appendChild(portLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to understand IP:port socket addressing.', instanceId);

    let arrows = [];
    function clearArrows() {
      arrows.forEach(a => a.remove()); arrows = [];
      clientAddrLbl.textContent = '';
    }

    const steps = [
      () => {
        setLog(simId, '① The application wants to reach a server. To send a message, you need <strong>two pieces of information</strong>: the server\'s <em>IP address</em> (which host?) and a <em>port number</em> (which process?).', instanceId);
        pulseNode(cNode, '#00f5ff');
        serverAddrLbl.textContent = 'IP: 93.184.216.34';
        portLbl.textContent = 'Port: 80 (HTTP)';
      },
      () => {
        setLog(simId, '② The OS assigns the client an <strong>ephemeral port</strong> (randomly chosen, e.g. 54321). The client\'s full socket address is: <code>192.168.1.5:54321</code>. Together, src+dst form a 4-tuple.', instanceId);
        clientAddrLbl.textContent = 'IP: 192.168.1.5  Port: 54321';
        pulseNode(cNode, '#00ff88');
      },
      () => {
        setLog(simId, '③ <strong>Socket = IP + Port</strong>. The client socket is <code>192.168.1.5:54321</code>. The server socket is <code>93.184.216.34:80</code>. The 4-tuple (src IP, src port, dst IP, dst port) uniquely identifies this connection.', instanceId);
        const tuple = svgEl('text', { x: 250, y: 50, 'text-anchor':'middle',
          fill:'#64748b','font-size':'7.5','font-family':'JetBrains Mono,monospace' });
        tuple.textContent = '(192.168.1.5, 54321) → (93.184.216.34, 80)';
        svg.appendChild(tuple);
        arrows.push(tuple);
      },
      () => {
        setLog(simId, '④ Well-known ports: <code>HTTP=80</code>, <code>HTTPS=443</code>, <code>SMTP=25</code>, <code>DNS=53</code>, <code>SSH=22</code>. Client ephemeral ports: 49152–65535. The OS demultiplexes incoming packets to the right process by port number. ✓', instanceId);
        arrows.push(svgArrow(svg, 104, 82, 397, 82, '#00f5ff', '→ :80'));
        arrows.push(svgArrow(svg, 397, 98, 104, 98, '#a855f7', ':54321 ←'));
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to understand IP:port socket addressing.', instanceId);
    });
  }

  /* ============================================================
     SIM 13: sim-app-layer
     HTTP/SMTP/FTP/DNS as app-layer protocols (Ch2 Section 5)
     ============================================================ */

  function buildAppLayer(containerEl, instanceId) {
    const simId = 'sim-app-layer';
    const W = 520, H = 190;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Transport layer base
    const tcpBar = svgEl('rect', { x: 30, y: 140, width: 215, height: 30,
      rx: 4, fill: 'rgba(0,245,255,0.06)', stroke: '#00f5ff', 'stroke-width': '1' });
    const tcpTxt = svgEl('text', { x: 137, y: 159, 'text-anchor':'middle',
      fill:'#00f5ff','font-size':'9','font-family':'JetBrains Mono,monospace' });
    tcpTxt.textContent = 'TCP (Transport Layer)';
    svg.appendChild(tcpBar); svg.appendChild(tcpTxt);

    const udpBar = svgEl('rect', { x: 275, y: 140, width: 215, height: 30,
      rx: 4, fill: 'rgba(255,107,53,0.06)', stroke: '#ff6b35', 'stroke-width': '1' });
    const udpTxt = svgEl('text', { x: 382, y: 159, 'text-anchor':'middle',
      fill:'#ff6b35','font-size':'9','font-family':'JetBrains Mono,monospace' });
    udpTxt.textContent = 'UDP (Transport Layer)';
    svg.appendChild(udpBar); svg.appendChild(udpTxt);

    // Protocol boxes at app layer (hidden initially)
    const protocols = [
      { name: 'HTTP',  x: 40,  color: '#00f5ff', transport: 'TCP', tx: 60  },
      { name: 'SMTP',  x: 145, color: '#00ff88', transport: 'TCP', tx: 165 },
      { name: 'FTP',   x: 250, color: '#a855f7', transport: 'TCP', tx: 270 },
      { name: 'DNS',   x: 370, color: '#ff6b35', transport: 'UDP', tx: 390 }
    ];

    const protoEls = protocols.map(p => {
      const rect = svgEl('rect', { x: p.x, y: 70, width: 80, height: 40,
        rx: 4, fill: 'rgba(255,255,255,0.03)', stroke: p.color, 'stroke-width': '1',
        opacity: '0' });
      const txt = svgEl('text', { x: p.x + 40, y: 94, 'text-anchor':'middle',
        fill: p.color, 'font-size': '11', 'font-weight': '700',
        'font-family': 'JetBrains Mono,monospace', opacity: '0' });
      txt.textContent = p.name;
      svg.appendChild(rect); svg.appendChild(txt);

      const connLine = svgEl('line', { x1: p.x + 40, y1: 112, x2: p.tx, y2: 138,
        stroke: p.color, 'stroke-width': '1', 'stroke-dasharray': '4 3', opacity: '0' });
      svg.appendChild(connLine);

      return { rect, txt, connLine };
    });

    // App layer label
    const appLbl = svgEl('text', { x: 260, y: 60, 'text-anchor':'middle',
      fill:'#64748b','font-size':'8','font-family':'JetBrains Mono,monospace' });
    appLbl.textContent = 'Application Layer Protocols';
    svg.appendChild(appLbl);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to explore application-layer protocols.', instanceId);

    let visibleCount = 0;

    function showProtocol(i) {
      protoEls[i].rect.setAttribute('opacity', '1');
      protoEls[i].txt.setAttribute('opacity', '1');
      protoEls[i].connLine.setAttribute('opacity', '1');
    }

    function hideAll() {
      protoEls.forEach(p => {
        p.rect.setAttribute('opacity', '0');
        p.txt.setAttribute('opacity', '0');
        p.connLine.setAttribute('opacity', '0');
      });
      visibleCount = 0;
    }

    const stepDescriptions = [
      '① <strong>HTTP</strong> (HyperText Transfer Protocol) — used by web browsers to request and serve web pages. Runs over <strong>TCP port 80</strong> (HTTPS: 443). Stateless request-response protocol.',
      '② <strong>SMTP</strong> (Simple Mail Transfer Protocol) — pushes email between mail servers. Runs over <strong>TCP port 25</strong>. ASCII text protocol; MIME extends it for binary attachments.',
      '③ <strong>FTP</strong> (File Transfer Protocol) — transfers files between client and server. Runs over <strong>TCP ports 20/21</strong>. Uses separate control and data connections.',
      '④ <strong>DNS</strong> (Domain Name System) — translates hostnames to IP addresses. Runs over <strong>UDP port 53</strong> (fast lookups). All internet communication depends on DNS. ✓'
    ];

    const steps = stepDescriptions.map((desc, i) => () => {
      setLog(simId, desc, instanceId);
      showProtocol(i);
    });

    return makeController(instanceId, simId, steps, () => {
      hideAll();
      setLog(simId, 'Press <strong>Next Step</strong> to explore application-layer protocols.', instanceId);
    });
  }

  /* ============================================================
     SIM 14: sim-http-methods
     GET/POST/HEAD/PUT HTTP request methods (Ch2 Section 9)
     ============================================================ */

  function buildHttpMethods(containerEl, instanceId) {
    const simId = 'sim-http-methods';
    const W = 500, H = 200;
    const { host, canvas } = buildShell(simId, 4, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 80, 30, 80, 185, '#00f5ff', true);
    svgLine(svg, 420, 30, 420, 185, '#a855f7', true);
    svgNode(svg,  80, 20, 18, 'C', 'Client', '#00f5ff');
    svgNode(svg, 420, 20, 18, 'S', 'Server', '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to explore HTTP request methods.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const methodSteps = [
      {
        y: 55, color: '#00f5ff',
        req: 'GET /page.html HTTP/1.1',
        res: '200 OK + body',
        desc: '① <strong>GET</strong> — retrieves a resource. The request has no body. The server responds with the resource in the body. Most common HTTP method — used for all normal page/image/file loads.'
      },
      {
        y: 95, color: '#00ff88',
        req: 'POST /submit',
        res: '201 Created',
        desc: '② <strong>POST</strong> — submits data to the server (e.g., form submission, JSON payload). The request has a body containing the data. Server may create a new resource or process the input.'
      },
      {
        y: 135, color: '#ff6b35',
        req: 'HEAD /page.html',
        res: '200 OK (headers only)',
        desc: '③ <strong>HEAD</strong> — like GET, but the server sends only the response headers — no body. Used to check if a resource exists, check its size, or validate a cached copy without downloading it.'
      },
      {
        y: 170, color: '#a855f7',
        req: 'PUT /resource/1',
        res: '200 OK / 204',
        desc: '④ <strong>PUT</strong> — uploads/replaces a resource at a specific URL. Idempotent: sending the same PUT twice has the same effect as once. <strong>DELETE</strong> removes a resource. Core REST API methods. ✓'
      }
    ];

    methodSteps.forEach((m, i) => {
      const steps_fn = () => {
        setLog(simId, m.desc, instanceId);
        arrows.push(svgArrow(svg, 100, m.y, 400, m.y, m.color, `${m.req} →`));
        if (i < 3) {
          setTimeout(() => {
            arrows.push(svgArrow(svg, 400, m.y + 10, 100, m.y + 10, m.color, `← ${m.res}`));
          }, 600);
        } else {
          arrows.push(svgArrow(svg, 400, m.y, 100, m.y, m.color, `← ${m.res}`));
        }
      };
      return steps_fn;
    });

    const steps = methodSteps.map((m, i) => () => {
      setLog(simId, m.desc, instanceId);
      arrows.push(svgArrow(svg, 100, m.y, 400, m.y, m.color, `→ ${m.req}`));
      arrows.push(svgArrow(svg, 400, m.y + 12, 100, m.y + 12, m.color, `← ${m.res}`));
    });

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to explore HTTP request methods.', instanceId);
    });
  }

  /* ============================================================
     SIM 15: sim-http-pipeline
     DNS → TCP → GET → Response → Render full pipeline (Ch2 Section 11)
     ============================================================ */

  function buildHttpPipeline(containerEl, instanceId) {
    const simId = 'sim-http-pipeline';
    const W = 560, H = 170;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 65, 85, 495, 85, 'rgba(255,255,255,0.06)');

    const browserNode = svgNode(svg,  45, 85, 28, '🌐', 'Browser',   '#00f5ff');
    const dnsNode     = svgNode(svg, 175, 85, 24, 'DNS','DNS Server','#ff6b35');
    const tcpNode     = svgNode(svg, 300, 85, 24, 'TCP','TCP Stack',  '#00ff88');
    const serverNode  = svgNode(svg, 455, 85, 28, '🖥️', 'Server',    '#a855f7');

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to trace the full HTTP request pipeline.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>DNS Lookup</strong> — Browser needs the server\'s IP. It sends a DNS query (UDP port 53). The DNS server responds with the IP address. This happens before any HTTP.', instanceId);
        arrows.push(svgArrow(svg, 78, 77, 148, 77, '#ff6b35', 'DNS query →'));
        arrows.push(svgArrow(svg, 148, 93, 78, 93, '#ff6b35', '← IP addr'));
        pulseNode(dnsNode, '#ff6b35');
      },
      () => {
        setLog(simId, '② <strong>TCP Handshake</strong> — Browser opens a TCP connection to the server (3-way handshake: SYN → SYN-ACK → ACK). This costs 1 RTT before any HTTP data flows.', instanceId);
        arrows.push(svgArrow(svg, 78, 77, 272, 77, '#00ff88', 'SYN →'));
        arrows.push(svgArrow(svg, 272, 93, 78, 93, '#00ff88', '← SYN-ACK'));
        arrows.push(svgArrow(svg, 78, 85, 272, 85, '#00ff88', 'ACK →'));
        pulseNode(tcpNode, '#00ff88');
      },
      () => {
        setLog(simId, '③ <strong>HTTP GET sent</strong> — Browser sends the HTTP request over the established TCP connection. Request includes method, URL, headers (Host, User-Agent, Accept).', instanceId);
        arrows.push(svgArrow(svg, 78, 77, 424, 77, '#00f5ff', 'GET /index.html →'));
        pulseNode(serverNode, '#a855f7');
      },
      () => {
        setLog(simId, '④ <strong>Server processes</strong> — Server locates the resource, reads it from disk, builds HTTP response headers (status, content-type, content-length), and prepares to send.', instanceId);
        const proc = svgEl('rect', { x: 430, y: 92, width: 46, height: 16,
          rx: 3, fill: 'rgba(168,85,247,0.2)', stroke: '#a855f7', 'stroke-width': '1' });
        const ptxt = svgEl('text', { x: 453, y: 103, 'text-anchor':'middle',
          fill:'#a855f7','font-size':'8','font-family':'JetBrains Mono,monospace' });
        ptxt.textContent = 'process…';
        svg.appendChild(proc); svg.appendChild(ptxt);
        arrows.push(proc); arrows.push(ptxt);
      },
      () => {
        setLog(simId, '⑤ <strong>Response received + rendered</strong> — Browser gets 200 OK with HTML body. It parses HTML, discovers embedded objects (CSS, JS, images), and fires additional GETs — reusing the persistent TCP connection. ✓', instanceId);
        arrows.push(svgArrow(svg, 424, 93, 78, 93, '#00ff88', '← 200 OK + HTML'));
        pulseNode(browserNode, '#00ff88');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to trace the full HTTP request pipeline.', instanceId);
    });
  }

  /* ============================================================
     SIM 16: sim-email-delivery
     SMTP/IMAP email delivery chain (Ch2 Section 12)
     ============================================================ */

  function buildEmailDelivery(containerEl, instanceId) {
    const simId = 'sim-email-delivery';
    const W = 560, H = 160;
    const { host, canvas } = buildShell(simId, 5, instanceId);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 60, 80, 500, 80, 'rgba(255,255,255,0.06)');

    const uaA   = svgNode(svg,  40, 80, 24, '✉️', 'Alice UA',      '#00f5ff');
    const msA   = svgNode(svg, 160, 80, 26, 'MS', "Alice's Server", '#00ff88');
    const msB   = svgNode(svg, 360, 80, 26, 'MS', "Bob's Server",   '#ff6b35');
    const uaB   = svgNode(svg, 490, 80, 24, '📬', 'Bob UA',         '#a855f7');

    // Protocol labels
    const smtp1 = svgEl('text', { x: 105, y: 60, 'text-anchor':'middle',
      fill:'#64748b','font-size':'7.5','font-family':'JetBrains Mono,monospace' });
    smtp1.textContent = 'SMTP';
    svg.appendChild(smtp1);

    const smtp2 = svgEl('text', { x: 260, y: 60, 'text-anchor':'middle',
      fill:'#64748b','font-size':'7.5','font-family':'JetBrains Mono,monospace' });
    smtp2.textContent = 'SMTP relay';
    svg.appendChild(smtp2);

    const imap = svgEl('text', { x: 430, y: 60, 'text-anchor':'middle',
      fill:'#64748b','font-size':'7.5','font-family':'JetBrains Mono,monospace' });
    imap.textContent = 'IMAP/POP3';
    svg.appendChild(imap);

    containerEl.appendChild(host);
    setLog(simId, 'Press <strong>Next Step</strong> to trace an email from sender to recipient.', instanceId);

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog(simId, '① <strong>Alice\'s User Agent</strong> (Outlook, Gmail, Thunderbird) composes the email. The UA uses <strong>SMTP</strong> (port 25) to push the message to Alice\'s mail server.', instanceId);
        arrows.push(svgArrow(svg, 67, 72, 130, 72, '#00f5ff', 'SMTP →'));
        pulseNode(msA, '#00ff88');
      },
      () => {
        setLog(simId, '② <strong>Alice\'s mail server</strong> accepts the message, stores it in an outgoing queue, and immediately tries to relay it to Bob\'s mail server using <strong>SMTP over TCP port 25</strong>.', instanceId);
        pulseNode(msA, '#00ff88');
        arrows.push(svgArrow(svg, 190, 72, 330, 72, '#00ff88', 'SMTP relay →'));
      },
      () => {
        setLog(simId, '③ <strong>Bob\'s mail server</strong> receives the message and stores it in Bob\'s mailbox. If Alice\'s server cannot reach Bob\'s, it retries for days before bouncing. This is <em>store-and-forward</em>.', instanceId);
        pulseNode(msB, '#ff6b35');
      },
      () => {
        setLog(simId, '④ Bob\'s <strong>User Agent retrieves</strong> the email using <strong>IMAP</strong> (keeps copy on server, syncs across devices) or <strong>POP3</strong> (downloads and usually removes from server).', instanceId);
        arrows.push(svgArrow(svg, 420, 72, 462, 72, '#a855f7', 'IMAP/POP3 →'));
        pulseNode(uaB, '#a855f7');
      },
      () => {
        setLog(simId,
          '⑤ <strong>Summary of email protocols:</strong><br>' +
          '• <code>SMTP</code> (port 25): push — sender UA → sender server → receiver server<br>' +
          '• <code>IMAP</code> (port 143): pull — keeps messages on server, multi-device<br>' +
          '• <code>POP3</code> (port 110): pull — downloads to one device, removes from server ✓', instanceId);
        pulseNode(uaA, '#00f5ff');
        pulseNode(uaB, '#a855f7');
      }
    ];

    return makeController(instanceId, simId, steps, () => {
      clearArrows();
      setLog(simId, 'Press <strong>Next Step</strong> to trace an email from sender to recipient.', instanceId);
    });
  }

  /* ----------------------------------------------------------
     SIMULATION REGISTRY
  ---------------------------------------------------------- */

  const SIM_BUILDERS = {
    'sim-client-server':   buildClientServer,
    'sim-socket':          buildSocket,
    'sim-packet-flow':     buildPacketFlow,
    'sim-network-core':    buildNetworkCore,
    'sim-tcp-handshake':   buildTcpHandshake,
    'sim-http-request':    buildHttpRequest,
    'sim-tcp-vs-udp':      buildTcpVsUdp,
    'sim-persistent-http': buildPersistentHttp,
    'sim-protocol-stack':  buildProtocolStack,
    'sim-access-network':  buildAccessNetwork,
    'sim-p2p':             buildP2P,
    'sim-addressing':      buildAddressing,
    'sim-app-layer':       buildAppLayer,
    'sim-http-methods':    buildHttpMethods,
    'sim-http-pipeline':   buildHttpPipeline,
    'sim-email-delivery':  buildEmailDelivery
  };

  /* ----------------------------------------------------------
     STYLE INJECTION
  ---------------------------------------------------------- */

  (function injectStyles() {
    if (document.getElementById('anim-js-styles')) return;
    const s = document.createElement('style');
    s.id = 'anim-js-styles';
    s.textContent = `
      .sim-log {
        min-height: 54px;
        padding: 10px 14px;
        font-size: 0.78rem;
        color: var(--text-muted);
        line-height: 1.65;
        border-top: 1px solid var(--border-glass);
      }
      .sim-log code {
        font-family: var(--font-display);
        font-size: 0.75rem;
        color: var(--accent-green);
        background: rgba(0,255,136,0.07);
        padding: 1px 5px;
        border-radius: 3px;
      }
      .sim-log strong { color: var(--text-primary); font-weight: 600; }
      .sim-log em     { color: var(--accent-cyan); font-style: normal; }
      .sim-log-msg { display:block; animation: fadeIn 0.3s ease; }
    `;
    document.head.appendChild(s);
  })();

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */

  /**
   * Mount and initialise a simulation into containerEl.
   * containerEl: the DOM element to render into.
   * simId: one of the SIM_BUILDERS keys.
   * Returns the controller (or null on error).
   */
  function runSimulation(simId, containerEl) {
    if (!containerEl) {
      console.warn('[Animations] containerEl required for', simId);
      return null;
    }

    const builder = SIM_BUILDERS[simId];
    if (!builder) {
      console.warn('[Animations] Unknown sim:', simId);
      containerEl.innerHTML = `<p class="empty-state">Unknown simulation: ${simId}</p>`;
      return null;
    }

    // Derive a unique instance ID from the container's element ID
    const instanceId = getInstanceId(containerEl, simId);

    // Stop any existing sim for this instance
    if (_active[instanceId]) {
      _active[instanceId].stop();
      delete _active[instanceId];
    }

    containerEl.innerHTML = '';
    const controller = builder(containerEl, instanceId);
    if (controller) _active[instanceId] = controller;
    return controller;
  }

  /** Stop a running simulation and clean up */
  function stopSimulation(simId) {
    // Stop all active instances whose key includes simId
    Object.keys(_active).forEach(key => {
      if (key === simId || key.includes(simId)) {
        _active[key].stop();
        delete _active[key];
      }
    });
  }

  window.Animations = {
    runSimulation,
    stopSimulation
  };

})();
