/**
 * data/quiz-data.js
 * Flat pool of exam-mode questions drawn from all chapters.
 * Exports window.quizData — used exclusively by js/exam-mode.js
 *
 * LOAD ORDER REQUIREMENT:
 *   <script src="data/chapter1-data.js"></script>
 *   <script src="data/chapter2-data.js"></script>
 *   <script src="data/chapter3-data.js"></script>
 *   <script src="data/chapter4-data.js"></script>
 *   <script src="data/chapter5-data.js"></script>
 *   <script src="data/chapter6-data.js"></script>
 *   <script src="data/chapter7-data.js"></script>
 *   <script src="data/chapter8-data.js"></script>
 *   <script src="data/quiz-data.js"></script>   ← this file last
 *
 * Each question object mirrors the chapter data schema with two additional
 * fields injected at build time:
 *   chapter  — "ch1" | "ch2"
 *   topicId  — section ID string (e.g. "ch1-internet", "ch2-email")
 *             used by exam-mode.js to identify and flag weak topics
 *
 * The exam engine calls Quiz.sample(window.quizData, 20) to draw a
 * random 20-question exam from this pool.
 */

window.quizData = (function buildExamPool() {
  // ── Source map: [chapterDataGlobal, chapterKey] ──────────────────────────
  const SOURCES = [
    [window.chapter1Data, "ch1"],
    [window.chapter2Data, "ch2"],
    [window.chapter3Data, "ch3"],
    [window.chapter4Data, "ch4"],
    [window.chapter5Data, "ch5"],
    [window.chapter6Data, "ch6"],
    [window.chapter7Data, "ch7"],
    [window.chapter8Data, "ch8"]
  ];

  const pool = [];

  SOURCES.forEach(function (entry) {
    const chData  = entry[0];
    const chKey   = entry[1];

    if (!chData || !Array.isArray(chData.sections)) {
      console.warn("[quiz-data] Chapter data not found for key:", chKey,
        "— ensure chapter data scripts are loaded before quiz-data.js");
      return;
    }

    chData.sections.forEach(function (section) {
      if (!Array.isArray(section.quiz)) return;

      section.quiz.forEach(function (q) {
        // Shallow-clone question object, inject routing metadata
        pool.push(Object.assign({}, q, {
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
 * Maps every topicId to a human-readable label and its parent chapter key.
 */
window.quizTopicMeta = {
  // Chapter 1
  "ch1-internet":   { label: "What is the Internet?",       chapter: "ch1" },
  "ch1-protocols":  { label: "Protocols",                    chapter: "ch1" },
  "ch1-structure":  { label: "Network Structure",            chapter: "ch1" },
  "ch1-access":     { label: "Access Networks",              chapter: "ch1" },

  // Chapter 2
  "ch2-client-server":   { label: "Client-Server Architecture",    chapter: "ch2" },
  "ch2-p2p":             { label: "Peer-to-Peer Architecture",      chapter: "ch2" },
  "ch2-processes":       { label: "Processes and Sockets",          chapter: "ch2" },
  "ch2-addressing":      { label: "Addressing Processes",           chapter: "ch2" },
  "ch2-app-protocols":   { label: "Application-Layer Protocols",    chapter: "ch2" },
  "ch2-transport-req":   { label: "Transport Service Requirements", chapter: "ch2" },
  "ch2-tcp-udp":         { label: "TCP vs UDP",                     chapter: "ch2" },
  "ch2-http-intro":      { label: "Web and HTTP — Basics",          chapter: "ch2" },
  "ch2-http-char":       { label: "HTTP Characteristics",           chapter: "ch2" },
  "ch2-http-persistent": { label: "Persistent vs Non-Persistent HTTP", chapter: "ch2" },
  "ch2-http-flow":       { label: "HTTP Request-Response Flow",     chapter: "ch2" },
  "ch2-email":           { label: "Electronic Mail (SMTP/IMAP/POP3)", chapter: "ch2" },

  // Chapter 3
  "ch3-transport-fundamentals": { label: "Transport Layer Fundamentals",    chapter: "ch3" },
  "ch3-mux-demux":              { label: "Multiplexing & Demultiplexing",    chapter: "ch3" },
  "ch3-udp":                    { label: "UDP: Connectionless Transport",    chapter: "ch3" },
  "ch3-checksum":               { label: "Internet Checksum",                chapter: "ch3" },
  "ch3-rdt":                    { label: "Reliable Data Transfer",           chapter: "ch3" },
  "ch3-sliding-window":         { label: "Go-Back-N & Selective Repeat",     chapter: "ch3" },
  "ch3-tcp-segment":            { label: "TCP Segment Structure",            chapter: "ch3" },
  "ch3-tcp-rtt":                { label: "TCP RTT & Timeout",                chapter: "ch3" },
  "ch3-tcp-flow":               { label: "TCP Flow Control & Handshake",     chapter: "ch3" },
  "ch3-congestion":             { label: "TCP Congestion Control",           chapter: "ch3" },

  // Chapter 4
  "ch4-planes":       { label: "Data Plane vs Control Plane",    chapter: "ch4" },
  "ch4-ip-format":    { label: "IP Datagram Format",             chapter: "ch4" },
  "ch4-fragmentation":{ label: "IP Fragmentation & Reassembly",  chapter: "ch4" },
  "ch4-addressing":   { label: "IPv4 Addressing & CIDR",         chapter: "ch4" },
  "ch4-dhcp-nat":     { label: "DHCP & NAT",                     chapter: "ch4" },
  "ch4-ipv6":         { label: "IPv6",                           chapter: "ch4" },

  // Chapter 5
  "ch5-link-state":       { label: "Link-State Routing & Dijkstra",  chapter: "ch5" },
  "ch5-distance-vector":  { label: "Distance-Vector & Bellman-Ford",  chapter: "ch5" },
  "ch5-ospf-bgp":         { label: "OSPF & BGP",                      chapter: "ch5" },
  "ch5-sdn":              { label: "SDN Control Plane",               chapter: "ch5" },
  "ch5-icmp":             { label: "ICMP",                            chapter: "ch5" },

  // Chapter 6
  "ch6-intro":            { label: "Link Layer: Intro & Services",    chapter: "ch6" },
  "ch6-error-detection":  { label: "Error Detection & CRC",           chapter: "ch6" },
  "ch6-mac-protocols":    { label: "Multiple Access Protocols",       chapter: "ch6" },
  "ch6-ethernet-arp":     { label: "Ethernet & ARP",                  chapter: "ch6" },
  "ch6-switches-vlan":    { label: "Switches & VLANs",                chapter: "ch6" },

  // Chapter 7
  "ch7-wireless-intro":   { label: "Wireless Link Characteristics",   chapter: "ch7" },
  "ch7-wifi-arch":        { label: "802.11 WiFi Architecture",        chapter: "ch7" },
  "ch7-wifi-mac":         { label: "802.11 MAC: CSMA/CA & RTS/CTS",  chapter: "ch7" },
  "ch7-cellular":         { label: "Cellular: 4G LTE & 5G",           chapter: "ch7" },
  "ch7-mobility":         { label: "Mobility Management",             chapter: "ch7" },

  // Chapter 8
  "ch8-intro":            { label: "Security Goals & Threat Model",   chapter: "ch8" },
  "ch8-symmetric":        { label: "Symmetric Cryptography (AES)",    chapter: "ch8" },
  "ch8-public-key":       { label: "Public Key & Digital Signatures", chapter: "ch8" },
  "ch8-tls":              { label: "TLS/SSL & HTTPS",                 chapter: "ch8" },
  "ch8-firewalls":        { label: "Firewalls & IDS",                 chapter: "ch8" }
};

/**
 * Chapter display metadata — used by exam-mode.js for the per-chapter
 * score breakdown bars on the results screen.
 */
window.quizChapterMeta = {
  ch1: { label: "Chapter 1: Introduction to Networking",              color: "var(--accent-cyan)"   },
  ch2: { label: "Chapter 2: Application Layer",                       color: "var(--accent-purple)" },
  ch3: { label: "Chapter 3: Transport Layer",                         color: "var(--accent-green)"  },
  ch4: { label: "Chapter 4: Network Layer — Data Plane",              color: "var(--accent-orange)" },
  ch5: { label: "Chapter 5: Network Layer — Control Plane",           color: "var(--accent-purple)" },
  ch6: { label: "Chapter 6: The Link Layer and LANs",                 color: "var(--accent-cyan)"   },
  ch7: { label: "Chapter 7: Wireless and Mobile Networks",            color: "var(--accent-green)"  },
  ch8: { label: "Chapter 8: Security in Computer Networks",           color: "var(--accent-red)"    }
};
