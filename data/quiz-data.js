/**
 * data/quiz-data.js
 * Flat pool of exam-mode questions drawn from all chapters.
 * Exports window.quizData — used exclusively by js/exam-mode.js
 *
 * LOAD ORDER REQUIREMENT:
 *   <script src="data/chapter1-data.js"></script>
 *   <script src="data/chapter2-data.js"></script>
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
    [window.chapter2Data, "ch2"]
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
  "ch2-email":           { label: "Electronic Mail (SMTP/IMAP/POP3)", chapter: "ch2" }
};

/**
 * Chapter display metadata — used by exam-mode.js for the per-chapter
 * score breakdown bars on the results screen.
 */
window.quizChapterMeta = {
  ch1: { label: "Chapter 1: Introduction to Networking", color: "var(--accent-cyan)" },
  ch2: { label: "Chapter 2: Application Layer",          color: "var(--accent-purple)" }
};
