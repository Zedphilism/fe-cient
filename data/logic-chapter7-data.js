/**
 * data/logic-chapter7-data.js
 * Module 7 — Latches and Flip-Flops (SECR1013 Digital Logic)
 * Global: window.dlChapter7Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.dlChapter7Data = {
  id: "logic-chapter7",
  key: "dl7",
  title: "Chapter 7: Latches & Flip-Flops",
  heroTitle: "Latches & Flip-Flops",
  heroDesc: "Sequential logic remembers: outputs depend on current inputs AND past state. Master the SR latch's " +
    "feedback (and its invalid state), the gated D latch, edge-triggered D/SR flip-flops, the JK's toggle fix, " +
    "the T flip-flop's frequency division, and the asynchronous PRE/CLR overrides — with the timing diagrams exams demand.",
  statusLabel: "MODULE 7 — LATCHES & FLIP-FLOPS",
  nextChapter: { label: "Chapter 8: Counters", href: "logic-chapter8.html" },
  completeText: "You can fill in any flip-flop truth table, trace timing diagrams pulse by pulse, and explain latch-vs-flip-flop triggering.",

  sections: [

    /* ───────────────── SECTION 1 — Latches ───────────────── */
    {
      id: "dl7-latches",
      title: "SR, Gated SR & Gated D Latches",
      subtitle: "Cross-coupled feedback · Invalid state S=R=1 · Enable window · D latch kills the invalid state",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "Sequential circuits contain <strong>memory</strong>: output depends on current inputs AND previous state. " +
          "The <strong>SR latch</strong> is the fundamental memory element — two cross-coupled gates whose outputs feed each " +
          "other's inputs. S (Set) forces Q=1, R (Reset) forces Q=0, and S=R=0 <em>holds</em> the stored bit via regenerative " +
          "feedback. S=R=1 is the <strong>invalid state</strong> (both outputs forced equal, unpredictable on release). " +
          "The <strong>gated SR latch</strong> adds an Enable — inputs only act while EN=1. The <strong>gated D latch</strong> " +
          "feeds D to S and D̄ to R, making S=R=1 structurally impossible: while EN=1, Q transparently follows D.",
        formula: "SR: S=1→Q=1 · R=1→Q=0 · S=R=0→hold · S=R=1→INVALID   ·   D latch: EN=1 → Q follows D",
        bullets: [
          "Combinational = no memory (output from inputs only) · Sequential = memory via feedback",
          "Active-HIGH SR latch (cross-coupled NOR): 00 hold · 01 reset · 10 set · 11 INVALID",
          "Active-LOW S̄R̄ latch (cross-coupled NAND): mirror — 11 hold, 00 invalid",
          "Invalid state: both outputs forced to the same value (Q = Q′ violated); releasing both inputs → unpredictable race",
          "Gated SR: S and R only act while EN = 1; EN = 0 freezes the state",
          "Gated D latch: R = D̄ structurally — D=1 sets, D=0 resets; no invalid state possible",
          "'Transparent': while EN = 1, Q follows every change of D in real time",
          "Classic latch application: switch debouncing — the first contact sets the state, bounces are absorbed"
        ],
        analogy: "A light switch with two buttons and a helpful flaw. Press ON (S) — the light stays on after you let go; press OFF (R) — it stays off: that self-holding is feedback memory. Press BOTH at once (S=R=1) and the mechanism jams — release them together and the light lands on or off at random: the invalid state. The D latch is the fix: one rocker replaces the two buttons, so 'both pressed' physically cannot happen."
      },
      workedExample: {
        problem: "A gated D latch has EN=1 and D=1, so Q=1. Then: (a) D drops to 0 while EN=1. (b) EN drops to 0, then D rises to 1. What is Q after each event?",
        steps: [
          "<strong>(a) EN=1, D: 1→0:</strong> the latch is transparent — Q follows D immediately → <strong>Q = 0</strong>",
          "<strong>(b) EN: 1→0:</strong> the latch closes, storing the last value → Q stays 0",
          "<strong>(b cont.) D: 0→1 while EN=0:</strong> D is ignored — <strong>Q remains 0</strong>",
          "<strong>Lesson:</strong> the D latch samples continuously during the whole EN=1 window (level-sensitive), and holds while EN=0 — whatever D was at the moment EN fell is what's kept"
        ],
        note: "Level-sensitivity is the latch's signature — and its weakness: any glitch on D during the open window corrupts Q. Edge-triggered flip-flops fix this."
      },
      quiz: [
        {
          id: "q-dl7-001",
          type: "mcq",
          question: "The fundamental difference between combinational and sequential logic is:",
          options: [
            "Sequential circuits use more gates",
            "Sequential circuits have memory — output depends on current inputs AND previous state (via feedback)",
            "Combinational circuits require a clock",
            "Sequential circuits cannot use AND gates"
          ],
          answer: 1,
          explanation: "Memory through feedback. Combinational outputs are a pure function of present inputs (like a numeric keypad where order doesn't matter); sequential outputs also depend on history (like a phone-unlock pattern where sequence matters — the module's own analogy). The feedback path from output back to input is what stores the past.",
          xpReward: 25
        },
        {
          id: "q-dl7-002",
          type: "mcq",
          question: "For an active-HIGH SR latch, the input combination S=1, R=1 is invalid because:",
          options: [
            "It sets Q = 1 permanently",
            "Both outputs are forced to the same level (violating Q = Q̄′), and releasing both inputs leaves the final state unpredictable",
            "It causes a short circuit that damages the gates",
            "The latch simply holds its previous state"
          ],
          answer: 1,
          explanation: "Both gates are driven simultaneously, forcing Q and Q′ to the same value — the complementary-output rule breaks. Worse, when S and R return to 0 together, the two stable states race and the winner is unpredictable (depends on gate delays). No damage occurs — the problem is logical indeterminacy, which is why the D latch and JK flip-flop were invented.",
          xpReward: 25
        },
        {
          id: "q-dl7-003",
          type: "match",
          question: "Match each active-HIGH SR latch input combination to its action.",
          pairs: [
            { term: "S=0, R=0", definition: "Hold — Q keeps its previous state" },
            { term: "S=0, R=1", definition: "Reset — Q = 0" },
            { term: "S=1, R=0", definition: "Set — Q = 1" },
            { term: "S=1, R=1", definition: "Invalid — outputs forced equal, state unpredictable on release" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The four-row SR truth table — the foundation for every other latch/flip-flop table in this module. (For the NAND-based active-LOW version, mirror it: 11 holds and 00 is invalid.) Write this table from memory before the exam; everything else derives from it.",
          xpReward: 25
        },
        {
          id: "q-dl7-004",
          type: "mcq",
          question: "How does the gated D latch make the invalid state impossible?",
          options: [
            "It uses a faster clock",
            "An inverter forces R = D̄, so S and R are always complements — S=R=1 can never occur",
            "It disables the R input permanently",
            "It uses XOR gates instead of NAND gates"
          ],
          answer: 1,
          explanation: "Structural fix: one data input D drives S directly and R through an inverter. D=1 → S=1,R=0 (set); D=0 → S=0,R=1 (reset). The combinations S=R=1 (invalid) and S=R=0 (hold-by-inputs) are both unreachable — holding is done by EN=0 instead. One inverter closes the SR latch's loophole.",
          xpReward: 25
        },
        {
          id: "q-dl7-005",
          type: "truefalse",
          question: "While its enable input is HIGH, a gated D latch is 'transparent': the output Q follows every change on D in real time.",
          answer: 0,
          explanation: "True — that's the defining behaviour (and the name 'transparent latch'). The open window is also the weakness: glitches on D during EN=1 pass straight to Q. When EN falls, the last D value is frozen. Contrast with edge-triggered flip-flops, which sample only at the clock edge instant.",
          xpReward: 25
        },
        {
          id: "q-dl7-006",
          type: "mcq",
          question: "A mechanical switch bounces several times when pressed. Why does feeding its contacts into an SR latch produce a clean single transition?",
          options: [
            "The latch slows the signal down",
            "The first contact sets the latch; subsequent bounces re-assert the same state, which changes nothing",
            "The latch counts the bounces and outputs the average",
            "It doesn't — latches make bouncing worse"
          ],
          answer: 1,
          explanation: "Debouncing by memory: the first touch flips the latch (Set), and every following bounce on the same contact just re-applies Set to an already-set latch — a no-op. The output changes exactly once. This is the classic practical application of the plain SR latch.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Edge-Triggered Flip-Flops ───────────────── */
    {
      id: "dl7-edge-ff",
      title: "Edge-Triggered Flip-Flops: SR & D",
      subtitle: "Level vs edge triggering · Camera-shutter sampling · D flip-flop: Q ← D at the edge · Setup/hold",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "A <strong>flip-flop</strong> is a bistable element that changes state only at a clock <strong>edge</strong> " +
          "(rising ↑ or falling ↓) — unlike the level-sensitive latch, which listens during the whole enable window. " +
          "Between edges a flip-flop ignores its inputs completely, giving synchronous designs their glitch immunity and " +
          "analysable timing. The <strong>edge-triggered SR flip-flop</strong> applies the SR table at each edge (11 still " +
          "invalid). The <strong>D flip-flop</strong> — the workhorse of registers, pipelines and counters — simply captures " +
          "D at the edge: <strong>Q ← D</strong>. Data must be stable for the <em>setup time</em> before and <em>hold time</em> " +
          "after the edge.",
        formula: "Latch: level-sensitive (whole EN window)   ·   Flip-flop: edge-triggered (clock transition instant)   ·   D-FF: Qₙₑₓₜ = D at edge",
        bullets: [
          "Edge-triggered: state can change ONLY at the active clock transition (↑ positive or ↓ negative edge)",
          "Between edges: inputs completely ignored — glitch immunity",
          "Symbol: triangle at the CLK pin = edge-triggered; bubble before the triangle = falling-edge",
          "SR flip-flop: SR truth table applied per edge — S=R=1 remains invalid",
          "D flip-flop: Qₙₑₓₜ = D — one input, no invalid state, no ambiguity",
          "Internally: master-slave latch pair — master samples while CLK high/low, slave copies at the opposite phase",
          "Setup time (t_su): D stable BEFORE the edge · Hold time (t_h): D stable AFTER the edge",
          "Applications: registers (n D-FFs sharing a clock), pipeline stages, state memories"
        ],
        analogy: "Window vs camera shutter. The latch is an open window — everything that passes during the open interval affects the room, including flies (glitches). The flip-flop is a camera with a fast shutter: it records the scene at one precise instant (the clock edge) and ignores everything before and after. A 5 ns glitch between edges never appears in the photo — which is why all modern synchronous design photographs its data rather than leaving windows open."
      },
      workedExample: {
        problem: "A positive-edge-triggered D flip-flop starts with Q=0. The D waveform is: D=1 during clock pulses 1–2, D=0 at pulse 3, D=1 again at pulse 4 — but D also glitches briefly to 0 BETWEEN pulses 1 and 2. Trace Q.",
        steps: [
          "<strong>Edge 1 (↑):</strong> D=1 at the instant of the edge → Q ← 1",
          "<strong>Glitch between edges:</strong> D dips to 0 momentarily — no clock edge occurs → <strong>ignored</strong>, Q stays 1",
          "<strong>Edge 2 (↑):</strong> D=1 → Q stays 1",
          "<strong>Edge 3 (↑):</strong> D=0 → Q ← 0",
          "<strong>Edge 4 (↑):</strong> D=1 → Q ← 1. Final sequence of Q after each edge: <strong>1, 1, 0, 1</strong> — the glitch left no trace"
        ],
        note: "Timing-diagram rule: look at D ONLY at each active edge, copy it to Q, ignore everything between. A latch tracing the same waveform WOULD show the glitch."
      },
      quiz: [
        {
          id: "q-dl7-007",
          type: "mcq",
          question: "The key difference between a latch and a flip-flop is:",
          options: [
            "Latches store more bits than flip-flops",
            "A latch is level-sensitive (responds during the whole enable window); a flip-flop is edge-triggered (responds only at the clock transition)",
            "Flip-flops do not need power to retain state",
            "Latches are digital, flip-flops are analog"
          ],
          answer: 1,
          explanation: "Level vs edge — window vs camera shutter. The latch's open window passes glitches; the flip-flop samples one instant and is immune between edges. This single distinction drives why synchronous design (CPUs, FPGAs) is built exclusively from flip-flops, with latches reserved for niches like debouncing.",
          xpReward: 25
        },
        {
          id: "q-dl7-008",
          type: "mcq",
          question: "On a flip-flop schematic symbol, a small triangle at the clock input with a bubble before it means:",
          options: [
            "Level-sensitive, active-HIGH enable",
            "Positive (rising) edge-triggered",
            "Negative (falling) edge-triggered",
            "Asynchronous operation, no clock needed"
          ],
          answer: 2,
          explanation: "Triangle = edge-triggered (dynamic input); bubble = inversion → the FALLING edge (HIGH→LOW) is the active one. Without the bubble it's rising-edge. Reading these markings correctly is essential for timing-diagram questions — a falling-edge FF samples at completely different instants than a rising-edge one.",
          xpReward: 25
        },
        {
          id: "q-dl7-009",
          type: "calc",
          question: "A positive-edge D flip-flop sees this D sequence at successive rising edges: 1, 1, 0, 1, 0. Starting from Q=0, what is Q after the 4th edge?",
          setup: "Rule per edge: Q ← D\nEdge 1: D=1 → Q=1\nEdge 2: D=1 → Q=?\nEdge 3: D=0 → Q=?\nEdge 4: D=1 → Q=?",
          hint: "Q simply copies D at each edge",
          answer: 1,
          tolerance: 0,
          unit: "Q =",
          calcType: "numeric",
          explanation: "Q after each edge: 1, 1, 0, 1 → after the 4th edge Q = 1. The D flip-flop has the simplest rule of all: Q becomes whatever D is at the edge, and holds it until the next edge — 'Q follows D, one clock behind'. Every register and pipeline stage is exactly this, replicated n times.",
          xpReward: 35
        },
        {
          id: "q-dl7-010",
          type: "truefalse",
          question: "Between active clock edges, an edge-triggered flip-flop's output can still be changed by its D (or S/R) inputs.",
          answer: 1,
          explanation: "False. Between edges the synchronous inputs are completely ignored — that's the entire point of edge-triggering (glitch immunity, deterministic timing). The ONLY inputs that can act between edges are the asynchronous overrides PRE and CLR (next sections), which bypass the clock by design.",
          xpReward: 25
        },
        {
          id: "q-dl7-011",
          type: "mcq",
          question: "Setup time and hold time specify that:",
          options: [
            "The clock must run slower than 1 MHz",
            "D must be stable for a minimum time BEFORE (setup) and AFTER (hold) the active clock edge for reliable capture",
            "The flip-flop needs time to power up",
            "Q changes exactly one setup time after D changes"
          ],
          answer: 1,
          explanation: "The camera needs the subject still while the shutter clicks: D stable t_su before the edge and t_h after it. Violating either window risks metastability — the output hovering at an invalid level before randomly resolving. These two parameters + propagation delay set the maximum clock frequency of any synchronous system.",
          xpReward: 25
        },
        {
          id: "q-dl7-012",
          type: "fillblank",
          question: "An 8-bit register is built from eight ______ flip-flops sharing a common clock, capturing all 8 data-bus bits simultaneously.",
          answer: "D",
          explanation: "D flip-flops — the storage workhorse. One shared clock edge photographs the whole bus at once: Qᵢ ← Dᵢ for all 8 bits. Registers, pipeline stages, and state registers are all arrays of D-FFs, which is why D dominates VLSI design (simple rule, no invalid state, no toggle ambiguity).",
          xpReward: 25
        },
        {
          id: "q-dl7-028",
          type: "truefalse",
          question: "A gated (EN) S-R flip-flop enters the SET state when S is HIGH, R is LOW, and EN is HIGH.",
          answer: 0,
          explanation: "True. The Enable input acts as a gatekeeper: the S/R inputs only have effect while EN=HIGH (or, for edge-triggered gated versions, only around the active clock edge while EN qualifies it). With EN=HIGH, S=1, R=0 applies the ordinary SET rule → Q=1. If EN were LOW instead, the flip-flop would ignore S and R entirely and simply hold its previous state — EN is the master switch that turns synchronous control on or off.",
          xpReward: 25
        },
        {
          id: "q-dl7-029",
          type: "truefalse",
          question: "The S-R flip-flop has three valid output states.",
          answer: 0,
          explanation: "True. Of the four possible (S,R) input combinations, three produce well-defined, VALID outputs — Hold (S=0,R=0), Reset (S=0,R=1→Q=0), and Set (S=1,R=0→Q=1) — while the fourth (S=1,R=1) is the INVALID/forbidden combination that must be avoided. 'Three valid states, one invalid' is the standard way this fact is tested — don't confuse 'valid states' (3) with 'total input combinations' (4).",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — JK & T Flip-Flops ───────────────── */
    {
      id: "dl7-jk-t",
      title: "JK & T Flip-Flops",
      subtitle: "JK fixes SR's invalid state with Toggle · T = JK tied together · Divide-by-2 frequency",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "The <strong>JK flip-flop</strong> is the SR with the loophole closed: J=Set, K=Reset as before, but " +
          "<strong>J=K=1 now means TOGGLE</strong> — Q flips to its complement at each active edge. Internally, J is gated " +
          "by Q̄ and K by Q, so both internal latch inputs can never assert together. The JK is universal: J=K=1 makes a " +
          "T flip-flop; J=D, K=D̄ makes a D flip-flop. The <strong>T (toggle) flip-flop</strong> has one input: T=0 hold, " +
          "T=1 toggle. With T permanently 1, Q inverts every edge — output frequency = clock ÷ 2, the seed of every " +
          "binary counter.",
        formula: "JK: 00 hold · 01 reset · 10 set · 11 TOGGLE (Q → Q̄)   ·   T-FF = JK with J=K=T   ·   f_Q = f_CLK / 2 when T=1",
        bullets: [
          "JK truth table (per active edge): J=0,K=0 hold · J=0,K=1 reset · J=1,K=0 set · J=1,K=1 toggle",
          "Toggle mechanism: J is ANDed with Q̄, K with Q — only the 'useful' half ever fires internally",
          "JK is universal: tie J=K → T flip-flop · J=D with K=D̄ → D flip-flop",
          "T flip-flop: T=0 → hold · T=1 → toggle at every active edge",
          "T=1 permanently: Q alternates 0,1,0,1… → output frequency = clock frequency ÷ 2",
          "n cascaded toggling FFs divide frequency by 2ⁿ — the basis of ripple counters (Module 8)",
          "Mnemonics: J = 'Jam 1' (set), K = 'Kill 1' (reset)"
        ],
        analogy: "A push-button lamp instead of a two-button one. The SR lamp has separate ON and OFF buttons — press both and it jams (invalid). The JK lamp rewires 'both pressed' to mean 'flip whatever it is now' — always well-defined. The T lamp goes further: ONE button that flips the state on every press (T=1) or is disconnected (T=0). Press it rhythmically and the lamp blinks at exactly half your pressing rate — frequency division by 2."
      },
      workedExample: [
        {
          problem: "A negative-edge JK flip-flop starts at Q=0 with J=K=1 (toggle mode) for 5 clock pulses; then K changes to 0 (J=1) for pulses 6–7. Trace Q after each falling edge.",
          steps: [
            "<strong>Pulses 1–5 (J=K=1, toggle):</strong> Q flips each falling edge: 0→<strong>1</strong>, 1→<strong>0</strong>, 0→<strong>1</strong>, 1→<strong>0</strong>, 0→<strong>1</strong>",
            "<strong>Observation:</strong> Q completed 2½ cycles while the clock completed 5 — output frequency is exactly half the clock",
            "<strong>Pulses 6–7 (J=1, K=0 = Set):</strong> edge 6: Q ← 1 (already 1, stays 1) · edge 7: Q ← 1 (still 1)",
            "<strong>Final:</strong> Q sequence after each edge = 1, 0, 1, 0, 1, 1, 1 — toggle mode alternates, set mode pins Q at 1"
          ],
          note: "The exam's favourite JK trace: toggle for a few pulses, then switch modes mid-stream. Track (J, K) at EVERY edge — the mode can change between pulses."
        },
        {
          title: "WORKED EXAMPLE — Full Sequential State Table (exam table format)",
          problem: "A negative-clock-triggered JK flip-flop starts at Q=0. Complete the row-by-row table for the given CLK/J/K sequence, filling in Q and its STATE (Set / Reset / Hold / Toggle) for every row. This is the exact multi-row table format used in final exams (8 rows of CLK, J, K → Q, State).",
          steps: [
            "<strong>Golden rule:</strong> read CLK first — if CLK shows no active (negative) edge that row, Q simply CARRIES OVER from the previous row regardless of J/K (the FF is only negative-edge triggered, so a HIGH-only or no-transition row changes nothing)",
            "<strong>Row 1 — CLK↓, J=0,K=1:</strong> Reset rule fires → Q=0. <strong>State: Reset</strong>",
            "<strong>Row 2 — CLK↓, J=1,K=1:</strong> Toggle rule fires on previous Q=0 → Q=1. <strong>State: Toggle</strong>",
            "<strong>Row 3 — CLK↓, J=1,K=0:</strong> Set rule fires → Q=1 (already 1, stays 1). <strong>State: Set</strong>",
            "<strong>Row 4 — CLK↓, J=1,K=1:</strong> Toggle rule fires on previous Q=1 → Q=0. <strong>State: Toggle</strong>",
            "<strong>Row 5 — CLK↓, J=0,K=1:</strong> Reset rule fires → Q=0 (already 0, stays 0). <strong>State: Reset</strong>",
            "<strong>Row 6 — CLK↓, J=1,K=1:</strong> Toggle rule fires on previous Q=0 → Q=1. <strong>State: Toggle</strong>",
            "<strong>Row 7 — no active edge this row (CLK stays HIGH, no ↓ transition):</strong> Q simply CARRIES OVER → Q=1 (unchanged). <strong>State: Hold</strong> (not because J=K=0, but because no clock edge occurred at all)",
            "<strong>Row 8 — CLK↓, J=1,K=0:</strong> Set rule fires → Q=1 (already 1, stays 1). <strong>State: Set</strong>"
          ],
          note: "The single biggest scoring mistake: forgetting that Q ONLY updates on an ACTIVE edge. If a row shows no falling edge (CLK didn't transition HIGH→LOW that row), copy the PREVIOUS row's Q down unchanged — J and K are irrelevant that row. Always write the State column using the vocabulary Set / Reset / Hold / Toggle, matching the J,K combination that actually fired (or 'Hold — no clock edge' when the clock itself didn't tick)."
        }
      ],
      quiz: [
        {
          id: "q-dl7-013",
          type: "mcq",
          question: "How does the JK flip-flop resolve the SR flip-flop's invalid state?",
          options: [
            "It forbids J=K=1 electrically",
            "J=K=1 is redefined as TOGGLE: Q flips to its complement at each active edge",
            "It ignores the clock when J=K=1",
            "It resets to 0 whenever J=K=1"
          ],
          answer: 1,
          explanation: "The 11 combination becomes toggle. Internally J is gated with Q̄ and K with Q: if Q=0 only the set path can fire, if Q=1 only the reset path — the internal latch never sees both asserted. The problematic input pair is converted into the most USEFUL mode: controlled state inversion, the heart of counters.",
          xpReward: 25
        },
        {
          id: "q-dl7-014",
          type: "calc",
          question: "A JK flip-flop in toggle mode (J=K=1) starts at Q=0. What is Q after 5 active clock edges?",
          setup: "Toggle: Q flips each edge\nStart 0 → after edges: 1, 0, 1, 0, ?",
          hint: "Odd number of toggles from 0",
          answer: 1,
          tolerance: 0,
          unit: "Q =",
          calcType: "numeric",
          explanation: "Q alternates 1,0,1,0,1 — after an ODD number of toggles from 0, Q = 1. Shortcut: Q after n toggles = n mod 2 (starting from 0). This even/odd insight answers any 'after N pulses' toggle question instantly, no tracing needed.",
          xpReward: 35
        },
        {
          id: "q-dl7-015",
          type: "mcq",
          question: "A T flip-flop is created from a JK flip-flop by:",
          options: [
            "Grounding K permanently",
            "Tying J and K together as the single input T",
            "Connecting Q back to J",
            "Removing the clock input"
          ],
          answer: 1,
          explanation: "J = K = T: then T=0 gives J=K=0 (hold) and T=1 gives J=K=1 (toggle) — exactly the T truth table, two rows and done. The JK's universality also covers D (J=D, K=D̄). One flip-flop type, configured three ways — a classic exam construction question.",
          xpReward: 25
        },
        {
          id: "q-dl7-016",
          type: "calc",
          question: "A T flip-flop with T=1 receives a 12 MHz clock. What is the frequency of Q in MHz?",
          setup: "Toggling halves the frequency: f_Q = f_CLK / 2 = 12 / 2",
          hint: "Divide by 2",
          answer: 6,
          tolerance: 0.01,
          unit: "MHz",
          calcType: "numeric",
          explanation: "12/2 = 6 MHz: Q needs TWO clock edges (toggle up, toggle down) to complete one full cycle of its own. Chain a second toggling FF off Q and you get 3 MHz — n stages divide by 2ⁿ. This divide-by-2 property is why toggle flip-flops ARE binary counters (Module 8).",
          xpReward: 35
        },
        {
          id: "q-dl7-017",
          type: "match",
          question: "Match each JK input combination (at the active edge) to its action.",
          pairs: [
            { term: "J=0, K=0", definition: "Hold — Q unchanged" },
            { term: "J=0, K=1", definition: "Reset — Q = 0" },
            { term: "J=1, K=0", definition: "Set — Q = 1" },
            { term: "J=1, K=1", definition: "Toggle — Q flips to Q̄" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The JK table = SR table with row 11 upgraded from 'invalid' to 'toggle'. Mnemonic: J = Jam 1 (set), K = Kill 1 (reset), both = flip. This table drives every JK timing-diagram and counter-design question — it must be automatic.",
          xpReward: 25
        },
        {
          id: "q-dl7-018",
          type: "truefalse",
          question: "Four cascaded toggle flip-flops (each Q clocking the next, all T=1) divide the input clock frequency by 8.",
          answer: 1,
          explanation: "False — by 16. Each toggling stage divides by 2, so n stages divide by 2ⁿ: 4 stages → 2⁴ = 16. (Dividing by 8 needs 3 stages.) The 2ⁿ rule connects directly to counters: a 4-stage ripple counter's MSB completes one cycle per 16 clock pulses — it counts 0–15.",
          xpReward: 25
        },
        {
          id: "q-dl7-024",
          type: "calc",
          question: "A negative-edge JK flip-flop starts at Q=0. Four falling edges occur in sequence with (J,K) = (0,1), (1,1), (1,1), (1,0). What is Q after the 4th edge?",
          setup: "Edge 1: J=0,K=1 (Reset) → Q=0\nEdge 2: J=1,K=1 (Toggle on Q=0) → Q=?\nEdge 3: J=1,K=1 (Toggle) → Q=?\nEdge 4: J=1,K=0 (Set) → Q=?",
          hint: "Trace row by row: Reset→0, Toggle flips it, Toggle flips it back, Set forces 1",
          answer: 1,
          tolerance: 0,
          unit: "Q =",
          calcType: "numeric",
          explanation: "Edge1 (Reset): Q=0. Edge2 (Toggle, was 0): Q=1. Edge3 (Toggle, was 1): Q=0. Edge4 (Set): Q=1. Final Q=1. This row-by-row sequential trace — where each row's starting point is the PREVIOUS row's Q — is exactly the multi-row JK table format used in final exams. Never evaluate a row in isolation; always carry the running Q forward.",
          xpReward: 35
        },
        {
          id: "q-dl7-025",
          type: "mcq",
          question: "In a multi-row JK flip-flop timing table, one row shows the clock remaining HIGH with no falling edge occurring during that row. What happens to Q in that row?",
          options: [
            "Q toggles regardless of J and K, since time has passed",
            "Q carries over UNCHANGED from the previous row — J and K are irrelevant without an active clock edge",
            "Q resets to 0 automatically",
            "Q becomes undefined (metastable)"
          ],
          answer: 1,
          explanation: "Q holds exactly its previous value. A negative-edge JK flip-flop only evaluates J and K at the instant of a HIGH→LOW clock transition — if no such edge occurs in a given row (the clock stays HIGH, or only rises), Q simply carries its old value forward untouched, no matter what J and K show. This is the #1 mark-losing mistake in exam sequential tables — always check for an actual active edge before applying the J/K rule.",
          xpReward: 25
        },
        {
          id: "q-dl7-026",
          type: "calc",
          question: "A T flip-flop is built by tying J=K=T on a JK flip-flop. Starting from Q=0, the following T values arrive at successive active edges: 0, 1, 1, 0, 1. What is Q after the 5th edge?",
          setup: "T=0 → Hold · T=1 → Toggle\nEdge1: T=0 (Hold) → Q=0\nEdge2: T=1 (Toggle) → Q=?\nEdge3: T=1 (Toggle) → Q=?\nEdge4: T=0 (Hold) → Q=?\nEdge5: T=1 (Toggle) → Q=?",
          hint: "Only T=1 edges change Q; T=0 edges just repeat the previous value",
          answer: 1,
          tolerance: 0,
          unit: "Q =",
          calcType: "numeric",
          explanation: "Edge1 (T=0, Hold): Q=0. Edge2 (T=1, Toggle): Q=1. Edge3 (T=1, Toggle): Q=0. Edge4 (T=0, Hold): Q=0. Edge5 (T=1, Toggle): Q=1. Final Q=1. Shortcut: only T=1 edges change Q — count them (3 toggles here, an odd number), so Q ends up flipped from its starting value: 0→1.",
          xpReward: 35
        },
        {
          id: "q-dl7-027",
          type: "match",
          question: "Match each JK timing-table scenario to the correct Q behaviour.",
          pairs: [
            { term: "Active edge, J=0,K=1",           definition: "Reset fires — Q becomes 0" },
            { term: "Active edge, J=1,K=1",           definition: "Toggle fires — Q flips from its previous value" },
            { term: "No active edge occurs this row", definition: "Q carries over unchanged from the previous row" },
            { term: "Active edge, J=1,K=0",           definition: "Set fires — Q becomes 1" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete row-evaluation logic for any JK sequential timing table: check for an active edge FIRST (no edge = no change, full stop), then apply Reset/Toggle/Set based on J,K using the PREVIOUS row's Q as the toggle's starting point. Master this four-row decision process and any 8-row exam table becomes mechanical.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 4 — Asynchronous Inputs & Timing ───────────────── */
    {
      id: "dl7-async-timing",
      title: "Asynchronous Inputs & Timing Diagrams",
      subtitle: "PRE and CLR override the clock · Active-LOW conventions · Reading multi-signal waveforms",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "Synchronous inputs (D, J, K, T) act only at clock edges — but <strong>asynchronous inputs</strong> " +
          "<strong>PRE̅</strong> (preset → Q=1) and <strong>CLR̅</strong> (clear → Q=0) act <em>immediately</em>, ignoring the " +
          "clock entirely. They are usually <strong>active-LOW</strong>: pulling the pin to 0 asserts it; both must idle HIGH " +
          "for normal clocked operation. Asserting both at once is invalid (echo of the SR problem). Their main uses: " +
          "power-on initialisation (every counter/register starts in a known state) and the forced-reset trick behind " +
          "truncated-modulus counters. Timing diagrams put all of this together — the exam's favourite format.",
        formula: "PRE̅ = 0 → Q = 1 immediately   ·   CLR̅ = 0 → Q = 0 immediately   ·   both = 1 → normal clocked operation",
        bullets: [
          "Asynchronous = clock-independent: PRE/CLR act the instant they are asserted",
          "Active-LOW convention (bubble on the pin): 0 = asserted, 1 = inactive",
          "PRE̅ = 0 → Q = 1 (preset) · CLR̅ = 0 → Q = 0 (clear) · both HIGH → normal operation",
          "Asserting PRE̅ and CLR̅ together: invalid (both outputs forced HIGH in the classic 74LS74 — avoid)",
          "While CLR̅ is held LOW, clock edges are overridden — Q stays 0 no matter what D/J/K do",
          "Use 1: power-on reset — counters and registers must wake in a known state",
          "Use 2: truncated counters — decode the target count and pulse CLR̅ (Module 8)",
          "Timing diagrams: evaluate async pins FIRST, then apply the synchronous rule at each active edge"
        ],
        analogy: "A scheduled meeting vs the fire alarm. Synchronous inputs are agenda items — considered only at the scheduled moments (clock edges). PRE and CLR are the fire alarm: they interrupt IMMEDIATELY, mid-sentence, no waiting for the agenda. And like a real alarm panel, the buttons are 'active-LOW' — the system is normal while the line is held high, and pulling it down triggers the override."
      },
      workedExample: [
        {
          problem: "A positive-edge D flip-flop has D=1 throughout. Events: edge 1 occurs; then CLR̅ is pulsed LOW between edges 1 and 2; edges 2 and 3 occur with CLR̅ back HIGH. Trace Q.",
          steps: [
            "<strong>Edge 1 (CLR̅=1, D=1):</strong> normal operation → Q ← 1",
            "<strong>CLR̅ pulses LOW between edges:</strong> asynchronous clear acts IMMEDIATELY → <strong>Q drops to 0 right there</strong>, without any clock edge",
            "<strong>CLR̅ returns HIGH:</strong> Q stays 0 (the override released, but nothing re-evaluates until an edge)",
            "<strong>Edge 2 (D=1):</strong> normal capture → Q ← 1",
            "<strong>Edge 3 (D=1):</strong> Q stays 1. Final waveform: Q rises at edge 1, falls mid-cycle at the CLR̅ pulse, rises again at edge 2"
          ],
          note: "The mid-cycle drop is the giveaway of an async input on a timing diagram — synchronous-only behaviour NEVER changes Q between edges."
        },
        {
          title: "WORKED EXAMPLE — Derive Equations From a Mixed Circuit, Then Trace With Async + Sync Combined",
          problem: "A circuit contains: FF1 (JK, negative-edge triggered, synchronous inputs J1,K1) and FF2 (D, negative-edge triggered, same clock as FF1, asynchronous input CLR̅2). An AND gate combines Q1 and K1 to drive D2 (i.e. D2 = Q1 · K1). Another AND gate combines Q1 and Q2 to form the circuit output: Y = Q1 · Q2. Starting Q1=0, Q2=0, trace 4 rows of (J1,K1,CLR̅2) = (1,1,1), (0,1,1), (1,0,0), (1,1,1).",
          steps: [
            "<strong>Step 1 — read the circuit, write the equations:</strong> the AND gate feeding D2 has inputs Q1 and K1, so <strong>D2 = Q1 · K1</strong>. The AND gate forming the output has inputs Q1 and Q2, so <strong>Y = Q1 · Q2</strong>. Always derive these two equations FIRST, before touching the state table.",
            "<strong>Row 1 (J1=1,K1=1,CLR̅2=1 — no override):</strong> compute D2 BEFORE the edge using the OLD Q1=0: D2 = 0·1 = 0. At the edge: FF1 toggles (J1=K1=1, old Q1=0) → Q1=1. FF2 captures D2 → Q2=0. Output Y = Q1·Q2 = 1·0 = <strong>0</strong>. <em>FF1 state: Toggle.</em>",
            "<strong>Row 2 (J1=0,K1=1,CLR̅2=1):</strong> D2 = Q1·K1 = 1·1 = 1 (using OLD Q1=1). At the edge: FF1 resets (J1=0,K1=1) → Q1=0. FF2 captures D2 → Q2=1. Y = 0·1 = <strong>0</strong>. <em>FF1 state: Reset.</em>",
            "<strong>Row 3 (J1=1,K1=0, CLR̅2=0 — ASYNC CLEAR ASSERTED):</strong> CLR̅2=0 overrides the clock IMMEDIATELY → Q2 is forced to 0 regardless of D2 or any edge. Separately, FF1 still responds to its own synchronous inputs at the edge: J1=1,K1=0 (Set) → Q1=1. Y = Q1·Q2 = 1·0 = <strong>0</strong>. <em>FF1 state: Set · FF2 state: Asynchronous Clear (override, not a normal D-capture).</em>",
            "<strong>Row 4 (J1=1,K1=1,CLR̅2=1 — override released):</strong> D2 = Q1·K1 = 1·1 = 1 (OLD Q1=1, from the just-cleared Q2 having no bearing on D2). At the edge: FF1 toggles (old Q1=1) → Q1=0. FF2 captures D2 → Q2=1. Y = 0·1 = <strong>0</strong>. <em>FF1 state: Toggle.</em>"
          ],
          note: "The exam scores THREE separate skills here: (1) reading the circuit to write D2 and Y correctly, (2) computing D2 from the OLD (pre-edge) value of Q1 — a very common slip is using the NEW Q1 instead, and (3) recognising that when CLR̅2=0, FF2's output is decided by the ASYNCHRONOUS override, not by D2 at all — the D-capture logic is completely bypassed that row. Always evaluate async inputs first per row, and only fall back to the synchronous rule when all async inputs are inactive (idling HIGH)."
        }
      ],
      quiz: [
        {
          id: "q-dl7-019",
          type: "mcq",
          question: "What distinguishes asynchronous inputs (PRE, CLR) from synchronous inputs (D, J, K)?",
          options: [
            "Asynchronous inputs only work when the clock is stopped",
            "Asynchronous inputs act immediately when asserted, ignoring the clock; synchronous inputs act only at active clock edges",
            "Asynchronous inputs set Q while synchronous ones can only reset it",
            "There is no difference — all flip-flop inputs are clocked"
          ],
          answer: 1,
          explanation: "Immediate vs edge-gated — the fire alarm vs the meeting agenda. PRE̅=0 forces Q=1 and CLR̅=0 forces Q=0 the instant they assert, mid-cycle, clock ignored. On a timing diagram, any Q change BETWEEN clock edges is the fingerprint of an async input firing.",
          xpReward: 25
        },
        {
          id: "q-dl7-020",
          type: "mcq",
          question: "A flip-flop's preset and clear pins are labelled with overbars (PRE̅, CLR̅) and drawn with bubbles. To CLEAR the flip-flop you apply:",
          options: [
            "PRE̅ = 0, CLR̅ = 1",
            "PRE̅ = 1, CLR̅ = 0",
            "Both pins HIGH",
            "Both pins LOW"
          ],
          answer: 1,
          explanation: "Active-LOW: the bubble/overbar means 0 asserts. Clear requires CLR̅ = 0 while PRE̅ idles at 1 → Q = 0 immediately. Both HIGH = normal clocked operation; both LOW = the invalid double-assert. Misreading active-LOW pins is among the most common exam slips — bubble means 'pull me down to fire'.",
          xpReward: 25
        },
        {
          id: "q-dl7-021",
          type: "truefalse",
          question: "While CLR̅ is held LOW, clock edges still update Q from the D input as normal.",
          answer: 1,
          explanation: "False. An asserted asynchronous input OVERRIDES the clocked behaviour: Q is pinned at 0 for as long as CLR̅ stays LOW, and edges are ignored. Normal edge-triggered operation resumes only after CLR̅ returns HIGH. This override-precedence is exactly what truncated counters exploit (Module 8).",
          xpReward: 25
        },
        {
          id: "q-dl7-022",
          type: "mcq",
          question: "Why do practical systems pulse CLR̅ on all flip-flops at power-up?",
          options: [
            "To test that the flip-flops work",
            "Because flip-flops power up in unpredictable states — a reset forces every register and counter to a known starting value",
            "To synchronise the power supply with the clock",
            "To increase the clock frequency"
          ],
          answer: 1,
          explanation: "At power-on each bistable settles randomly to 0 or 1 — a counter could wake at state 13 of 16. The power-on-reset circuit pulses CLR̅ so everything starts at a defined state (usually all-zeros). Every real CPU, FPGA and microcontroller has exactly this circuit; it's also why RESET pins exist on chips.",
          xpReward: 25
        },
        {
          id: "q-dl7-023",
          type: "match",
          question: "Match each input/combination to its immediate effect on Q.",
          pairs: [
            { term: "PRE̅ = 0, CLR̅ = 1", definition: "Q = 1 immediately (preset)" },
            { term: "PRE̅ = 1, CLR̅ = 0", definition: "Q = 0 immediately (clear)" },
            { term: "PRE̅ = 1, CLR̅ = 1", definition: "Normal edge-triggered operation" },
            { term: "PRE̅ = 0, CLR̅ = 0", definition: "Invalid — both overrides asserted at once" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The async-input truth table, active-LOW edition. Note the family resemblance to the SR latch's table — including the invalid both-asserted row. Idle both HIGH, pulse one LOW to override, never both: the complete operating manual in four rows.",
          xpReward: 25
        },
        {
          id: "q-dl7-030",
          type: "mcq",
          question: "In a mixed-flip-flop circuit, an AND gate takes Q1 (from FF1) and K1 (the K input of FF1) as its two inputs, and its output drives D2 (the D input of FF2). What is the correct Boolean equation for D2?",
          options: [
            "D2 = Q1 + K1",
            "D2 = Q1 · K1",
            "D2 = Q1 ⊕ K1",
            "D2 = K̄1"
          ],
          answer: 1,
          explanation: "D2 = Q1 · K1. An AND gate's output equation is simply the product of its inputs — reading the circuit means identifying WHICH two signals feed a gate, then writing the corresponding Boolean operator (AND→product, OR→sum, XOR→⊕). This 'read the gate, write the equation' step is graded separately from the table-tracing that follows it — get the equation right first before attempting any row.",
          xpReward: 25
        },
        {
          id: "q-dl7-031",
          type: "calc",
          question: "Using D2 = Q1 · K1: at the start of a clock cycle (before the edge), Q1 = 1 and K1 = 1. What is D2 for this row (the value that will be captured by FF2 at the upcoming edge)?",
          setup: "D2 = Q1 · K1 = 1 · 1",
          hint: "AND of two 1s",
          answer: 1,
          tolerance: 0,
          unit: "D2 =",
          calcType: "numeric",
          explanation: "D2 = 1·1 = 1. Critically, D2 must be computed using Q1's value BEFORE the edge (its 'old' value) — D2 is a combinational function of the CURRENT state, evaluated an instant before the clock ticks and captured into FF2 at that same edge. Using the wrong (post-edge) Q1 is the most common error when tracing these combined circuits.",
          xpReward: 35
        },
        {
          id: "q-dl7-032",
          type: "mcq",
          question: "In a row of a mixed synchronous/asynchronous state table, CLR̅2 = 0 (asserted) for flip-flop FF2, while FF2's D input that row would normally compute to D2 = 1. What is Q2 after this row?",
          options: [
            "Q2 = 1, because D2 = 1 and the clock edge captures it",
            "Q2 = 0 — the asserted asynchronous clear overrides and bypasses the D input entirely, regardless of what D2 computes to",
            "Q2 is undefined/invalid",
            "Q2 keeps its previous value, ignoring both D2 and CLR̅2"
          ],
          answer: 1,
          explanation: "Q2 = 0. An asserted asynchronous input always takes PRECEDENCE over the synchronous data path — CLR̅2=0 forces Q2 to 0 immediately and completely bypasses D2, even though D2 itself computed to 1 that row. This precedence rule (async overrides sync, always) is exactly what full exam marks test — many students correctly compute D2 but then forget the clear overrides it.",
          xpReward: 25
        },
        {
          id: "q-dl7-033",
          type: "match",
          question: "Match each step of the 'derive-then-trace' mixed-circuit method to its purpose.",
          pairs: [
            { term: "Step 1: read the gates",              definition: "Write the Boolean equation for each derived input (e.g. D2 = Q1·K1) and for the output Y" },
            { term: "Step 2: check async inputs each row",  definition: "If any async input (PRE̅/CLR̅) is asserted, it overrides everything else that row" },
            { term: "Step 3: compute derived inputs",       definition: "Evaluate D2 (or J/K equations) using the PRESENT (pre-edge) state values" },
            { term: "Step 4: apply the edge rule",          definition: "If no async override, capture the derived input normally at the active clock edge" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "This four-step method handles every 'circuit diagram → state table' question in the final exam, regardless of which flip-flop types or gates are used: derive the equations once, then for every row check async-first, compute derived inputs from present state, and only then apply the normal edge-triggered rule.",
          xpReward: 25
        }
      ]
    }
  ]
};
