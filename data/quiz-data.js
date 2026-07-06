/**
 * data/quiz-data.js
 * Flat pool of exam-mode questions drawn from all chapters of all three modules.
 * Exports window.quizData — used exclusively by js/exam-mode.js
 *
 * LOAD ORDER REQUIREMENT: every chapter data file must load BEFORE this file.
 *
 * Each question object mirrors the chapter data schema with three additional
 * fields injected at build time:
 *   module   — "net" | "math" | "logic"      (exam-mode filtering)
 *   chapter  — chapter key e.g. "ch4", "math7", "dl5"
 *   topicId  — section ID string (e.g. "ch4-planes", "dl5-and-or")
 *
 * The exam engine calls Quiz.sample(pool, 20) on the (module-filtered) pool.
 */

window.quizData = (function buildExamPool() {
  // ── Source map: [chapterDataGlobal, chapterKey, moduleKey] ───────────────
  const SOURCES = [
    // Network Communication (SCSR2213)
    [window.chapter4Data,      "ch4",    "net"],
    [window.chapter5Data,      "ch5",    "net"],
    [window.chapter6Data,      "ch6",    "net"],
    [window.chapter7Data,      "ch7",    "net"],
    [window.chapter8Data,      "ch8",    "net"],
    // Computational Mathematics (SECI1113)
    [window.mathChapter5Data,  "math5",  "math"],
    [window.mathChapter6Data,  "math6",  "math"],
    [window.mathChapter7Data,  "math7",  "math"],
    [window.mathChapter8Data,  "math8",  "math"],
    [window.mathChapter9Data,  "math9",  "math"],
    [window.mathChapter10Data, "math10", "math"],
    // Digital Logic (SECR1013)
    [window.dlChapter5Data,    "dl5",    "logic"],
    [window.dlChapter6Data,    "dl6",    "logic"],
    [window.dlChapter7Data,    "dl7",    "logic"],
    [window.dlChapter8Data,    "dl8",    "logic"]
  ];

  const pool = [];

  SOURCES.forEach(function (entry) {
    const chData = entry[0];
    const chKey  = entry[1];
    const modKey = entry[2];

    if (!chData || !Array.isArray(chData.sections)) {
      // Data file not loaded on this page — normal for chapter pages,
      // exam-mode.html must include every data file.
      return;
    }

    chData.sections.forEach(function (section) {
      if (!Array.isArray(section.quiz)) return;
      section.quiz.forEach(function (q) {
        pool.push(Object.assign({}, q, {
          module:  modKey,
          chapter: chKey,
          topicId: section.id
        }));
      });
    });
  });

  return pool;
}());

/**
 * Topic metadata — used by exam-mode.js for the score breakdown display.
 */
window.quizTopicMeta = {
  // ── Network Ch4 ──
  "ch4-planes":        { label: "Data Plane vs Control Plane",   chapter: "ch4" },
  "ch4-ip-format":     { label: "IP Datagram Format",            chapter: "ch4" },
  "ch4-fragmentation": { label: "IP Fragmentation & Reassembly", chapter: "ch4" },
  "ch4-addressing":    { label: "IPv4 Addressing & CIDR",        chapter: "ch4" },
  "ch4-dhcp-nat":      { label: "DHCP & NAT",                    chapter: "ch4" },
  "ch4-ipv6":          { label: "IPv6",                          chapter: "ch4" },

  // ── Network Ch5 ──
  "ch5-link-state":      { label: "Link-State Routing & Dijkstra", chapter: "ch5" },
  "ch5-distance-vector": { label: "Distance-Vector & Bellman-Ford", chapter: "ch5" },
  "ch5-ospf-bgp":        { label: "OSPF & BGP",                     chapter: "ch5" },
  "ch5-sdn":             { label: "SDN Control Plane",              chapter: "ch5" },
  "ch5-icmp":            { label: "ICMP & SNMP",                    chapter: "ch5" },

  // ── Network Ch6 ──
  "ch6-intro":           { label: "Link Layer: Intro & Services", chapter: "ch6" },
  "ch6-error-detection": { label: "Error Detection & CRC",        chapter: "ch6" },
  "ch6-mac-protocols":   { label: "Multiple Access Protocols",    chapter: "ch6" },
  "ch6-ethernet-arp":    { label: "Ethernet & ARP",               chapter: "ch6" },
  "ch6-switches-vlan":   { label: "Switches & VLANs",             chapter: "ch6" },

  // ── Network Ch7 ──
  "ch7-wireless-intro": { label: "Wireless Link Characteristics", chapter: "ch7" },
  "ch7-wifi-arch":      { label: "802.11 WiFi Architecture",      chapter: "ch7" },
  "ch7-wifi-mac":       { label: "802.11 MAC: CSMA/CA & RTS/CTS", chapter: "ch7" },
  "ch7-cellular":       { label: "Cellular: 4G LTE & 5G",         chapter: "ch7" },
  "ch7-mobility":       { label: "Mobility Management",           chapter: "ch7" },

  // ── Network Ch8 ──
  "ch8-intro":      { label: "Security Goals & Threat Model",   chapter: "ch8" },
  "ch8-symmetric":  { label: "Symmetric Cryptography (AES)",    chapter: "ch8" },
  "ch8-public-key": { label: "Public Key & Digital Signatures", chapter: "ch8" },
  "ch8-tls":        { label: "TLS/SSL & HTTPS",                 chapter: "ch8" },
  "ch8-firewalls":  { label: "Firewalls & IDS",                 chapter: "ch8" },

  // ── Math Ch5 — Accuracy & Error ──
  "math5-error-types":   { label: "Sources of Numerical Error",  chapter: "math5" },
  "math5-abs-rel-error": { label: "Absolute & Relative Error",   chapter: "math5" },
  "math5-propagation":   { label: "Rounding Error Propagation",  chapter: "math5" },

  // ── Math Ch6 — Non-Linear Equations ──
  "math6-ivt":       { label: "Intermediate Value Theorem",  chapter: "math6" },
  "math6-bisection": { label: "Bisection Method",            chapter: "math6" },
  "math6-newton":    { label: "Newton-Raphson Method",       chapter: "math6" },
  "math6-secant":    { label: "Secant Method & Selection",   chapter: "math6" },

  // ── Math Ch7 — Eigenvalues ──
  "math7-definition":     { label: "Eigenvalue Equation Av = λv",       chapter: "math7" },
  "math7-characteristic": { label: "Characteristic Polynomial",         chapter: "math7" },
  "math7-power-method":   { label: "Power Method",                      chapter: "math7" },

  // ── Math Ch8 — Interpolation ──
  "math8-concept":  { label: "Interpolation Problem",              chapter: "math8" },
  "math8-forward":  { label: "Newton Forward Difference",          chapter: "math8" },
  "math8-backward": { label: "Newton Backward Difference",         chapter: "math8" },

  // ── Math Ch9 — Numerical Differentiation ──
  "math9-finite-diff": { label: "Forward & Backward Differences", chapter: "math9" },
  "math9-central":     { label: "Central Difference & Optimal h", chapter: "math9" },

  // ── Math Ch10 — Numerical Integration ──
  "math10-trapezoidal": { label: "Trapezoidal Rule",                   chapter: "math10" },
  "math10-simpsons":    { label: "Simpson's 1/3 Rule",                 chapter: "math10" },
  "math10-comparison":  { label: "Error Analysis & Method Comparison", chapter: "math10" },

  // ── Logic Ch5 — Combinational Logic Circuits ──
  "dl5-and-or":       { label: "AND-OR & AND-OR-Invert",     chapter: "dl5" },
  "dl5-universal":    { label: "Universal Gates: NAND & NOR", chapter: "dl5" },
  "dl5-dual-symbols": { label: "Dual Gate Symbols",           chapter: "dl5" },
  "dl5-design":       { label: "Combinational Design Steps",  chapter: "dl5" },

  // ── Logic Ch6 — Functions of Combinational Logic ──
  "dl6-adders":          { label: "Half, Full & Parallel Adders", chapter: "dl6" },
  "dl6-parity":          { label: "Parity Generators & Checkers", chapter: "dl6" },
  "dl6-comparator":      { label: "Comparators",                  chapter: "dl6" },
  "dl6-decoder-encoder": { label: "Decoders & Encoders",          chapter: "dl6" },
  "dl6-mux-demux":       { label: "Multiplexers & DEMUX",         chapter: "dl6" },

  // ── Logic Ch7 — Latches & Flip-Flops ──
  "dl7-latches":      { label: "SR / Gated / D Latches",          chapter: "dl7" },
  "dl7-edge-ff":      { label: "Edge-Triggered SR & D Flip-Flops", chapter: "dl7" },
  "dl7-jk-t":         { label: "JK & T Flip-Flops",               chapter: "dl7" },
  "dl7-async-timing": { label: "Async Inputs & Timing Diagrams",  chapter: "dl7" },

  // ── Logic Ch8 — Counters ──
  "dl8-async":           { label: "Asynchronous Ripple Counters",       chapter: "dl8" },
  "dl8-sync":            { label: "Synchronous Counters",               chapter: "dl8" },
  "dl8-modulus":         { label: "Modulus & Truncated Counters",       chapter: "dl8" },
  "dl8-design":          { label: "Synchronous Counter Design",         chapter: "dl8" },
  "dl8-shift-registers": { label: "Shift Registers, Ring & Johnson",    chapter: "dl8" }
};

/**
 * Chapter display metadata — per-chapter score bars on the results screen.
 */
window.quizChapterMeta = {
  ch4:    { label: "Net Ch.4: Network Layer — Data Plane",    color: "var(--accent-cyan)",   module: "net" },
  ch5:    { label: "Net Ch.5: Network Layer — Control Plane", color: "var(--accent-purple)", module: "net" },
  ch6:    { label: "Net Ch.6: The Link Layer and LANs",       color: "var(--accent-green)",  module: "net" },
  ch7:    { label: "Net Ch.7: Wireless and Mobile Networks",  color: "var(--accent-orange)", module: "net" },
  ch8:    { label: "Net Ch.8: Network Security",              color: "var(--accent-red)",    module: "net" },

  math5:  { label: "Math Ch.5: Accuracy & Error",             color: "var(--accent-green)",  module: "math" },
  math6:  { label: "Math Ch.6: Non-Linear Equations",         color: "var(--accent-cyan)",   module: "math" },
  math7:  { label: "Math Ch.7: Eigenvalues & Eigenvectors",   color: "var(--accent-purple)", module: "math" },
  math8:  { label: "Math Ch.8: Interpolation",                color: "var(--accent-orange)", module: "math" },
  math9:  { label: "Math Ch.9: Numerical Differentiation",    color: "var(--accent-red)",    module: "math" },
  math10: { label: "Math Ch.10: Numerical Integration",       color: "var(--accent-green)",  module: "math" },

  dl5:    { label: "Logic Ch.5: Combinational Logic",         color: "var(--accent-purple)", module: "logic" },
  dl6:    { label: "Logic Ch.6: Combinational Functions",     color: "var(--accent-cyan)",   module: "logic" },
  dl7:    { label: "Logic Ch.7: Latches & Flip-Flops",        color: "var(--accent-green)",  module: "logic" },
  dl8:    { label: "Logic Ch.8: Counters",                    color: "var(--accent-orange)", module: "logic" }
};

/**
 * Module display metadata — exam-mode landing and filtering.
 */
window.quizModuleMeta = {
  net:   { label: "Network Communication",     code: "SCSR2213", color: "var(--accent-cyan)"   },
  math:  { label: "Computational Mathematics", code: "SECI1113", color: "var(--accent-green)"  },
  logic: { label: "Digital Logic",             code: "SECR1013", color: "var(--accent-purple)" }
};
