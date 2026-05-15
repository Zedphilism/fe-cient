/* ============================================================
   animations.js — Simulation Controllers
   NetCore Academy

   All 7 interactive simulations live here.
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
     sim-tcp-handshake    3-way handshake (SYN / SYN-ACK / ACK)
     sim-http-request     HTTP GET → 200 OK step-by-step
     sim-tcp-vs-udp       Reliable delivery vs fire-and-forget
     sim-persistent-http  Persistent vs non-persistent connections
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

  const _active = {};   // { [simId]: controller }

  /* ----------------------------------------------------------
     SHARED RENDER UTILITIES
  ---------------------------------------------------------- */

  /** Build the standard sim shell: canvas + log + controls */
  function buildShell(simId, stepCount) {
    const host = document.createElement('div');
    host.className = 'sim-container';
    host.id = simId + '-host';

    const canvas = document.createElement('div');
    canvas.className = 'sim-canvas';
    canvas.id = simId + '-canvas';

    const log = document.createElement('div');
    log.className = 'sim-log';
    log.id = simId + '-log';

    const controls = document.createElement('div');
    controls.className = 'sim-controls';
    controls.innerHTML = `
      <button class="btn-sim" id="${simId}-next">${TEXT.btn_next}</button>
      <button class="btn-sim" id="${simId}-auto">&#9654; ${TEXT.btn_autoplay}</button>
      <button class="btn-sim" id="${simId}-reset">${TEXT.btn_reset}</button>
      <span   class="sim-status" id="${simId}-status">
        ${TEXT.step_of} 0 ${TEXT.of} ${stepCount}
      </span>`;

    host.appendChild(canvas);
    host.appendChild(log);
    host.appendChild(controls);
    return { host, canvas, log, controls };
  }

  /** Update the step counter label */
  function setStatus(simId, current, total) {
    const el = document.getElementById(simId + '-status');
    if (el) el.textContent = current >= total
      ? TEXT.complete
      : `${TEXT.step_of} ${current} ${TEXT.of} ${total}`;
  }

  /** Write a message to the sim log panel */
  function setLog(simId, html) {
    const el = document.getElementById(simId + '-log');
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
   * steps: array of functions (each called in sequence).
   * simId: used to find the control buttons.
   * onReset: function to re-build the canvas.
   * onComplete: optional callback when all steps done.
   */
  function makeController(simId, steps, onReset, onComplete) {
    let current   = 0;
    let autoTimer = null;
    let playing   = false;

    const nextBtn  = document.getElementById(simId + '-next');
    const autoBtn  = document.getElementById(simId + '-auto');
    const resetBtn = document.getElementById(simId + '-reset');

    function doStep() {
      if (current >= steps.length) return;
      steps[current]();
      current++;
      setStatus(simId, current, steps.length);
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
      setStatus(simId, 0, steps.length);
      setLog(simId, '');
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
     SIM 1: sim-client-server
     Client sends request → Server responds
     ============================================================ */

  function buildClientServer(container) {
    const W = 500, H = 140;
    const { host, canvas, log } = buildShell('sim-client-server', 4);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Static track line
    svgLine(svg, 90, 70, 410, 70, 'rgba(255,255,255,0.06)');

    // Nodes
    const cNode = svgNode(svg,  70, 70, 30, '💻', 'CLIENT', '#00f5ff');
    const sNode = svgNode(svg, 430, 70, 30, '🖥️', 'SERVER', '#a855f7');

    container.appendChild(host);
    setLog('sim-client-server', 'Press <strong>Next Step</strong> to begin.');

    let arrows = [];

    function clearArrows() {
      arrows.forEach(a => a.remove());
      arrows = [];
    }

    const steps = [
      () => {
        setLog('sim-client-server', '① <strong>Client</strong> wants to load a web page. It knows the server\'s IP address and port.');
        pulseNode(cNode, '#00f5ff');
      },
      () => {
        setLog('sim-client-server', '② Client sends an <strong>HTTP request</strong> across the network to the server.');
        arrows.push(svgArrow(svg, 105, 62, 395, 62, '#00f5ff', 'HTTP Request →'));
      },
      () => {
        setLog('sim-client-server', '③ <strong>Server</strong> receives the request, processes it, and prepares a response.');
        pulseNode(sNode, '#a855f7');
      },
      () => {
        setLog('sim-client-server', '④ Server sends <strong>HTTP response</strong> (200 OK + data) back to the client. ✓');
        arrows.push(svgArrow(svg, 395, 78, 105, 78, '#a855f7', '← 200 OK'));
        pulseNode(cNode, '#00ff88');
      }
    ];

    return makeController('sim-client-server', steps, () => {
      clearArrows();
      setLog('sim-client-server', 'Press <strong>Next Step</strong> to begin.');
    });
  }

  /* ============================================================
     SIM 2: sim-socket
     Process A → Socket → Network → Socket → Process B
     ============================================================ */

  function buildSocket(container) {
    const W = 560, H = 150;
    const { host, canvas, log } = buildShell('sim-socket', 5);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Background track
    svgLine(svg, 60, 75, 500, 75, 'rgba(255,255,255,0.06)');

    const procA  = svgNode(svg,  40, 75, 28, 'A',  'Process A', '#00f5ff');
    const sockA  = svgNode(svg, 150, 75, 22, '⬡',  'Socket A',  '#00ff88');
    const net    = svgNode(svg, 280, 75, 32, '🌐', 'Network',   '#ff6b35');
    const sockB  = svgNode(svg, 410, 75, 22, '⬡',  'Socket B',  '#00ff88');
    const procB  = svgNode(svg, 520, 75, 28, 'B',  'Process B', '#a855f7');

    container.appendChild(host);
    setLog('sim-socket', 'Press <strong>Next Step</strong> to begin.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog('sim-socket', '① <strong>Process A</strong> creates data it wants to send to Process B. Processes communicate through <em>sockets</em> — the OS-managed interface between app and network.');
        pulseNode(procA, '#00f5ff');
      },
      () => {
        setLog('sim-socket', '② Process A <strong>pushes data into Socket A</strong>. The socket is like a door — the app writes data in, and the transport layer picks it up.');
        arrows.push(svgArrow(svg, 72, 68, 125, 68, '#00f5ff', 'write()'));
        pulseNode(sockA, '#00ff88');
      },
      () => {
        setLog('sim-socket', '③ The <strong>transport layer</strong> (TCP/UDP) packages the data into segments and sends them across the network.');
        arrows.push(svgArrow(svg, 176, 68, 245, 68, '#00ff88', 'segments →'));
        pulseNode(net, '#ff6b35');
      },
      () => {
        setLog('sim-socket', '④ Data arrives at <strong>Socket B</strong> on the destination machine. The OS buffers it until Process B reads.');
        arrows.push(svgArrow(svg, 316, 68, 385, 68, '#ff6b35', '→ deliver'));
        pulseNode(sockB, '#00ff88');
      },
      () => {
        setLog('sim-socket', '⑤ <strong>Process B calls read()</strong> on Socket B and receives the data. Communication complete. ✓');
        arrows.push(svgArrow(svg, 436, 68, 488, 68, '#a855f7', 'read()'));
        pulseNode(procB, '#a855f7');
      }
    ];

    return makeController('sim-socket', steps, () => {
      clearArrows();
      setLog('sim-socket', 'Press <strong>Next Step</strong> to begin.');
    });
  }

  /* ============================================================
     SIM 3: sim-packet-flow
     IP Packet: Client → Router 1 → Router 2 → Server
     ============================================================ */

  function buildPacketFlow(container) {
    const W = 560, H = 160;
    const { host, canvas, log } = buildShell('sim-packet-flow', 5);

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
    ttlLbl.id = 'pf-ttl';
    ttlLbl.textContent = '';
    svg.appendChild(ttlLbl);

    container.appendChild(host);
    setLog('sim-packet-flow', 'Press <strong>Next Step</strong> to begin.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; ttlLbl.textContent = ''; }

    const steps = [
      () => {
        setLog('sim-packet-flow', '① <strong>Client</strong> creates an IP packet with destination address = server IP. TTL (Time To Live) is set to 64 — decremented at each router hop.');
        pulseNode(cNode, '#00f5ff');
        ttlLbl.textContent = 'TTL = 64';
      },
      () => {
        setLog('sim-packet-flow', '② Packet transmitted on the link to <strong>Router 1</strong>. Router 1 checks its forwarding table and decrements TTL → 63.');
        arrows.push(svgArrow(svg, 82, 72, 163, 72, '#00f5ff', 'pkt →'));
        pulseNode(r1Node, '#ff6b35');
        ttlLbl.textContent = 'TTL = 63';
      },
      () => {
        setLog('sim-packet-flow', '③ Router 1 forwards the packet to <strong>Router 2</strong>. TTL → 62. If TTL ever hits 0, the packet is dropped and an ICMP "Time Exceeded" is sent back.');
        arrows.push(svgArrow(svg, 218, 72, 303, 72, '#ff6b35', 'pkt →'));
        pulseNode(r2Node, '#ff6b35');
        ttlLbl.textContent = 'TTL = 62';
      },
      () => {
        setLog('sim-packet-flow', '④ Router 2 forwards to the destination network. Packet is on the final link toward the server.');
        arrows.push(svgArrow(svg, 358, 72, 460, 72, '#ff6b35', 'pkt →'));
        ttlLbl.textContent = 'TTL = 61';
      },
      () => {
        setLog('sim-packet-flow', '⑤ <strong>Server</strong> receives the packet. Checks destination IP matches its own, passes payload up to the transport layer. ✓');
        pulseNode(sNode, '#a855f7');
        ttlLbl.textContent = 'Delivered ✓';
      }
    ];

    return makeController('sim-packet-flow', steps, () => {
      clearArrows();
      setLog('sim-packet-flow', 'Press <strong>Next Step</strong> to begin.');
    });
  }

  /* ============================================================
     SIM 4: sim-tcp-handshake
     SYN → SYN-ACK → ACK
     ============================================================ */

  function buildTcpHandshake(container) {
    const W = 500, H = 200;
    const { host, canvas, log } = buildShell('sim-tcp-handshake', 4);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    // Vertical lifelines
    svgLine(svg, 80,  30, 80,  180, '#00f5ff', true);
    svgLine(svg, 420, 30, 420, 180, '#a855f7', true);

    // Node boxes
    svgNode(svg,  80, 20, 20, 'C', 'Client', '#00f5ff');
    svgNode(svg, 420, 20, 20, 'S', 'Server', '#a855f7');

    container.appendChild(host);
    setLog('sim-tcp-handshake', 'Press <strong>Next Step</strong> to begin. TCP requires a 3-way handshake before data can flow.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const yPositions = [70, 110, 150];

    const steps = [
      () => {
        setLog('sim-tcp-handshake', '① <strong>SYN</strong> — Client wants to open a connection. It sends a segment with the SYN flag set and a random sequence number (e.g. seq=100). Server must be LISTENING.');
        arrows.push(svgArrow(svg, 100, yPositions[0], 400, yPositions[0], '#00f5ff', 'SYN  seq=100'));
      },
      () => {
        setLog('sim-tcp-handshake', '② <strong>SYN-ACK</strong> — Server acknowledges the client\'s SYN (ack=101) and sends its own SYN with a new sequence number (seq=300). Server enters SYN-RECEIVED state.');
        arrows.push(svgArrow(svg, 400, yPositions[1], 100, yPositions[1], '#a855f7', 'SYN-ACK  seq=300  ack=101'));
      },
      () => {
        setLog('sim-tcp-handshake', '③ <strong>ACK</strong> — Client acknowledges the server\'s SYN (ack=301). Both sides are now in ESTABLISHED state. The connection is open.');
        arrows.push(svgArrow(svg, 100, yPositions[2], 400, yPositions[2], '#00ff88', 'ACK  ack=301'));
      },
      () => {
        setLog('sim-tcp-handshake', '✓ <strong>Connection established.</strong> 3-way handshake complete. Data segments can now flow in both directions. Each segment will carry seq/ack numbers to guarantee reliable, ordered delivery.');
        // Highlight both lifelines green
        svg.querySelectorAll('line').forEach(l => {
          if (l.getAttribute('stroke-dasharray')) {
            l.setAttribute('stroke', '#00ff88');
          }
        });
      }
    ];

    return makeController('sim-tcp-handshake', steps, () => {
      clearArrows();
      svg.querySelectorAll('line').forEach(l => {
        if (l.getAttribute('stroke-dasharray')) {
          l.setAttribute('stroke', 'rgba(255,255,255,0.12)');
        }
      });
      setLog('sim-tcp-handshake', 'Press <strong>Next Step</strong> to begin. TCP requires a 3-way handshake before data can flow.');
    });
  }

  /* ============================================================
     SIM 5: sim-http-request
     Full HTTP GET → 200 OK flow with headers shown
     ============================================================ */

  function buildHttpRequest(container) {
    const W = 500, H = 220;
    const { host, canvas, log } = buildShell('sim-http-request', 6);

    const svg = makeSVG(W, H);
    canvas.appendChild(svg);

    svgLine(svg, 80,  30, 80,  200, '#00f5ff', true);
    svgLine(svg, 420, 30, 420, 200, '#a855f7', true);
    svgNode(svg,  80, 20, 20, 'C', 'Client', '#00f5ff');
    svgNode(svg, 420, 20, 20, 'S', 'Server', '#a855f7');

    container.appendChild(host);
    setLog('sim-http-request', 'Press <strong>Next Step</strong> to begin. We\'ll trace one full HTTP/1.1 GET request.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const ys = [60, 90, 115, 145, 170, 195];

    const steps = [
      () => {
        setLog('sim-http-request', '① <strong>TCP Connection</strong> — Before HTTP can run, a TCP connection is established (3-way handshake). HTTP is an application-layer protocol that runs over TCP.');
        arrows.push(svgArrow(svg, 100, ys[0], 400, ys[0], '#64748b', '── TCP connect ──'));
        arrows.push(svgArrow(svg, 400, ys[1], 100, ys[1], '#64748b', '── SYN-ACK ──'));
      },
      () => {
        setLog('sim-http-request',
          '② <strong>HTTP Request</strong> sent by client:<br>' +
          '<code>GET /index.html HTTP/1.1</code><br>' +
          '<code>Host: www.example.com</code><br>' +
          '<code>Connection: keep-alive</code>');
        arrows.push(svgArrow(svg, 100, ys[2], 400, ys[2], '#00f5ff', 'GET /index.html'));
      },
      () => {
        setLog('sim-http-request', '③ <strong>Server processes</strong> the request — looks up the resource on disk, reads the file, builds the response headers.');
        const proc = svgEl('rect', { x: 400, y: ys[2] + 8, width: 36, height: 14,
          rx: 3, fill: 'rgba(168,85,247,0.2)', stroke: '#a855f7', 'stroke-width': '1' });
        const ptxt = svgEl('text', { x: 418, y: ys[2]+17, 'text-anchor':'middle',
          fill:'#a855f7','font-size':'8','font-family':'JetBrains Mono,monospace' });
        ptxt.textContent = 'proc…';
        arrows.push(proc); arrows.push(ptxt);
        svg.appendChild(proc); svg.appendChild(ptxt);
      },
      () => {
        setLog('sim-http-request',
          '④ <strong>HTTP Response</strong> sent by server:<br>' +
          '<code>HTTP/1.1 200 OK</code><br>' +
          '<code>Content-Type: text/html</code><br>' +
          '<code>Content-Length: 1240</code>');
        arrows.push(svgArrow(svg, 400, ys[3], 100, ys[3], '#00ff88', '← 200 OK + body'));
      },
      () => {
        setLog('sim-http-request', '⑤ <strong>Client renders</strong> the page. With <code>Connection: keep-alive</code> (HTTP/1.1 default), the TCP connection stays open — no new handshake needed for the next request.');
        arrows.push(svgArrow(svg, 100, ys[4], 400, ys[4], '#00f5ff', 'GET /style.css'));
      },
      () => {
        setLog('sim-http-request', '⑥ Server responds again on the <strong>same connection</strong>. This is <em>persistent HTTP</em> — one TCP connection, multiple request/response pairs. Far more efficient than non-persistent. ✓');
        arrows.push(svgArrow(svg, 400, ys[5], 100, ys[5], '#00ff88', '← 200 OK'));
      }
    ];

    return makeController('sim-http-request', steps, () => {
      clearArrows();
      setLog('sim-http-request', 'Press <strong>Next Step</strong> to begin. We\'ll trace one full HTTP/1.1 GET request.');
    });
  }

  /* ============================================================
     SIM 6: sim-tcp-vs-udp
     Side-by-side reliable vs fire-and-forget
     ============================================================ */

  function buildTcpVsUdp(container) {
    const W = 560, H = 220;
    const { host, canvas, log } = buildShell('sim-tcp-vs-udp', 5);

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

    container.appendChild(host);
    setLog('sim-tcp-vs-udp', 'Press <strong>Next Step</strong> to compare TCP and UDP side by side.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog('sim-tcp-vs-udp', '① Both sides begin. <strong>TCP</strong> performs a 3-way handshake before any data — overhead but guarantees a connection. <strong>UDP</strong> just sends immediately — no handshake.');
        arrows.push(svgArrow(svg,  76, 48, 204, 48, '#00f5ff', 'SYN →', '0.4s'));
        arrows.push(svgArrow(svg, 204, 62,  76, 62, '#00f5ff', '← SYN-ACK', '0.4s'));
        arrows.push(svgArrow(svg,  76, 76, 204, 76, '#00f5ff', 'ACK →', '0.4s'));
        // UDP: send immediately
        arrows.push(svgArrow(svg, 336, 48, 484, 48, '#ff6b35', 'datagram 1 →', '0.4s'));
      },
      () => {
        setLog('sim-tcp-vs-udp', '② <strong>TCP</strong>: Sends segment 1, then <em>waits</em> for acknowledgment before sending segment 2. This ensures the receiver got it. <strong>UDP</strong>: Keeps blasting datagrams — no waiting.');
        arrows.push(svgArrow(svg,  76, 100, 204, 100, '#00f5ff', 'data[1] →'));
        arrows.push(svgArrow(svg, 336,  75, 484,  75, '#ff6b35', 'datagram 2 →'));
        arrows.push(svgArrow(svg, 336,  95, 484,  95, '#ff6b35', 'datagram 3 →'));
      },
      () => {
        setLog('sim-tcp-vs-udp', '③ <strong>TCP</strong> receiver sends ACK — "segment 1 received." Sender can now send segment 2. <strong>UDP</strong> receiver got datagrams 1 and 3 — datagram 2 was lost in the network. No notification to sender.');
        arrows.push(svgArrow(svg, 204, 115,  76, 115, '#00ff88', '← ACK 1'));
        // UDP: loss indicator
        const lost = svgEl('text', { x: 410, y: 112, 'text-anchor':'middle',
          fill:'#ff3366','font-size':'10','font-family':'JetBrains Mono,monospace' });
        lost.textContent = '✗ lost';
        svg.appendChild(lost);
        arrows.push(lost);
      },
      () => {
        setLog('sim-tcp-vs-udp', '④ <strong>TCP</strong>: Sends segment 2. If no ACK arrives within the timeout window, TCP will <em>retransmit</em>. <strong>UDP</strong>: Sender keeps sending. Lost datagram 2 is gone — no retransmit, no recovery.');
        arrows.push(svgArrow(svg,  76, 135, 204, 135, '#00f5ff', 'data[2] →'));
        arrows.push(svgArrow(svg, 336, 130, 484, 130, '#ff6b35', 'datagram 4 →'));
      },
      () => {
        setLog('sim-tcp-vs-udp',
          '⑤ <strong>Summary:</strong><br>' +
          '• TCP: reliable, ordered, congestion-controlled — ideal for HTTP, email, file transfer.<br>' +
          '• UDP: low-latency, no overhead — ideal for DNS, video streaming, online gaming, VoIP.');
        arrows.push(svgArrow(svg, 204, 158,  76, 158, '#00ff88', '← ACK 2'));
        const udpDone = svgEl('text', { x: 412, y: 165, 'text-anchor':'middle',
          fill:'#ff6b35','font-size':'9','font-family':'JetBrains Mono,monospace' });
        udpDone.textContent = 'no ACK — done';
        svg.appendChild(udpDone);
        arrows.push(udpDone);
      }
    ];

    return makeController('sim-tcp-vs-udp', steps, () => {
      clearArrows();
      setLog('sim-tcp-vs-udp', 'Press <strong>Next Step</strong> to compare TCP and UDP side by side.');
    });
  }

  /* ============================================================
     SIM 7: sim-persistent-http
     Non-persistent vs Persistent HTTP connection timelines
     ============================================================ */

  function buildPersistentHttp(container) {
    const W = 560, H = 230;
    const { host, canvas, log } = buildShell('sim-persistent-http', 5);

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

    container.appendChild(host);
    setLog('sim-persistent-http', 'Press <strong>Next Step</strong> to compare non-persistent vs persistent HTTP.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog('sim-persistent-http', '① <strong>Request 1.</strong> Both sides open a TCP connection first. Non-persistent: new connection per object. Persistent: one connection reused.');
        // NP: TCP open
        arrows.push(svgArrow(svg,  67, 40, 208, 40, '#ff6b35', 'TCP open', '0.35s'));
        arrows.push(svgArrow(svg, 208, 52,  67, 52, '#ff6b35', '',          '0.35s'));
        // P: TCP open
        arrows.push(svgArrow(svg, 327, 40, 488, 40, '#00ff88', 'TCP open', '0.35s'));
        arrows.push(svgArrow(svg, 488, 52, 327, 52, '#00ff88', '',          '0.35s'));
      },
      () => {
        setLog('sim-persistent-http', '② <strong>First GET</strong> on both. Same request cost either way — 1 RTT for the request + 1 RTT for response. Persistent keeps the connection open; non-persistent closes it.');
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
        setLog('sim-persistent-http', '③ <strong>Request 2.</strong> Non-persistent must open a <em>new TCP connection</em> — paying 1 extra RTT before the GET can be sent. Persistent skips this and immediately sends another GET.');
        // NP: new TCP open
        arrows.push(svgArrow(svg,  67, 108, 208, 108, '#ff6b35', 'TCP open 2'));
        arrows.push(svgArrow(svg, 208, 120,  67, 120, '#ff6b35', ''));
        // P: immediate GET
        arrows.push(svgArrow(svg, 327, 100, 488, 100, '#00ff88', 'GET obj2 (pipelined)'));
      },
      () => {
        setLog('sim-persistent-http', '④ <strong>Response 2.</strong> Non-persistent finally gets object 2 — but needed 2 extra RTTs (TCP open + GET). Persistent delivers with no extra overhead.');
        arrows.push(svgArrow(svg,  67, 136, 208, 136, '#ff6b35', 'GET obj2'));
        arrows.push(svgArrow(svg, 208, 150,  67, 150, '#ff6b35', '← 200 OK'));
        arrows.push(svgArrow(svg, 488, 116, 327, 116, '#00ff88', '← 200 OK'));
      },
      () => {
        setLog('sim-persistent-http',
          '⑤ <strong>Summary:</strong><br>' +
          '• Non-persistent: <code>2 RTT + file time</code> per object — expensive for pages with many objects.<br>' +
          '• Persistent (default in HTTP/1.1): <code>1 RTT + file time</code> after the first, connection reused until idle timeout. ✓');
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

    return makeController('sim-persistent-http', steps, () => {
      clearArrows();
      setLog('sim-persistent-http', 'Press <strong>Next Step</strong> to compare non-persistent vs persistent HTTP.');
    });
  }

  /* ----------------------------------------------------------
     SIMULATION REGISTRY
  ---------------------------------------------------------- */

  /* ============================================================
     SIM 8: sim-network-core
     Network edge → access network → core routers (packet vs circuit switching)
     Used by Chapter 1 Section 3 (Network Structure).
     Distinct from sim-packet-flow to avoid duplicate DOM element IDs.
     ============================================================ */

  function buildNetworkCore(container) {
    const W = 560, H = 160;
    const { host, canvas, log } = buildShell('sim-network-core', 5);

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

    container.appendChild(host);
    setLog('sim-network-core', 'Press <strong>Next Step</strong> to trace a packet through the network structure.');

    let arrows = [];
    function clearArrows() { arrows.forEach(a => a.remove()); arrows = []; }

    const steps = [
      () => {
        setLog('sim-network-core', '① The <strong>Network Edge</strong> is where end systems live — your laptop, phone, or home server. Applications (web browser, email) run here, not in the core.');
        pulseNode(cNode, '#00f5ff');
      },
      () => {
        setLog('sim-network-core', '② The <strong>Access Network</strong> (last mile) connects your end system to the first router. Technologies: DSL, cable (HFC), FTTH, WiFi, 4G/5G.');
        arrows.push(svgArrow(svg, 82, 72, 148, 72, '#00f5ff', 'last mile →'));
        pulseNode(aNode, '#00ff88');
      },
      () => {
        setLog('sim-network-core', '③ The packet enters the <strong>Network Core</strong> — a mesh of high-speed routers. Packet switching: the router stores the packet, checks its forwarding table, and sends it onward. <em>No dedicated circuit is reserved.</em>');
        arrows.push(svgArrow(svg, 202, 72, 273, 72, '#00ff88', 'packet →'));
        pulseNode(r1Node, '#ff6b35');
      },
      () => {
        setLog('sim-network-core', '④ <strong>Core Router R1</strong> forwards the packet to <strong>R2</strong> via the best available path. Many user packets share the same high-speed fiber links — this is <em>statistical multiplexing</em>.');
        arrows.push(svgArrow(svg, 328, 72, 393, 72, '#ff6b35', 'forward →'));
        pulseNode(r2Node, '#ff6b35');
      },
      () => {
        setLog('sim-network-core', '⑤ The packet arrives at the destination server. Key insight: <strong>packet switching</strong> is efficient for bursty internet traffic — no bandwidth is wasted reserving a circuit for idle time. ✓');
        arrows.push(svgArrow(svg, 448, 72, 480, 72, '#ff6b35', '→ dest'));
        pulseNode(sNode, '#a855f7');
      }
    ];

    return makeController('sim-network-core', steps, () => {
      clearArrows();
      setLog('sim-network-core', 'Press <strong>Next Step</strong> to trace a packet through the network structure.');
    });
  }

  const SIM_BUILDERS = {
    'sim-client-server':   buildClientServer,
    'sim-socket':          buildSocket,
    'sim-packet-flow':     buildPacketFlow,
    'sim-network-core':    buildNetworkCore,
    'sim-tcp-handshake':   buildTcpHandshake,
    'sim-http-request':    buildHttpRequest,
    'sim-tcp-vs-udp':      buildTcpVsUdp,
    'sim-persistent-http': buildPersistentHttp
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

    // Stop any existing sim in this container
    stopSimulation(simId);

    containerEl.innerHTML = '';
    const controller = builder(containerEl);
    if (controller) _active[simId] = controller;
    return controller;
  }

  /** Stop a running simulation and clean up */
  function stopSimulation(simId) {
    if (_active[simId]) {
      _active[simId].stop();
      delete _active[simId];
    }
  }

  window.Animations = {
    runSimulation,
    stopSimulation
  };

})();
