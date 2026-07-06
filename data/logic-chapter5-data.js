/**
 * data/logic-chapter5-data.js
 * Module 5 — Combinational Logic Circuits (SECR1013 Digital Logic)
 * Global: window.dlChapter5Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.dlChapter5Data = {
  id: "logic-chapter5",
  key: "dl5",
  title: "Chapter 5: Combinational Logic Circuits",
  heroTitle: "Combinational Logic Circuits",
  heroDesc: "AND-OR logic implements SOP; AND-OR-Invert implements POS. NAND and NOR are universal gates that can " +
    "build anything. Dual symbols make circuit reading fast, and a 6-step recipe turns word problems into working " +
    "circuits — every one of these is a guaranteed exam topic.",
  statusLabel: "MODULE 5 — COMBINATIONAL LOGIC",
  nextChapter: { label: "Chapter 6: Functions of Combinational Logic", href: "logic-chapter6.html" },
  completeText: "You can implement SOP/POS with AND-OR / AND-OR-Invert, convert any circuit to NAND-only or NOR-only, and design combinational circuits from word problems.",

  sections: [

    /* ───────────────── SECTION 1 — AND-OR / AND-OR-Invert ───────────────── */
    {
      id: "dl5-and-or",
      title: "AND-OR & AND-OR-Invert Logic",
      subtitle: "SOP ↔ active-HIGH output · POS ↔ active-LOW output · XOR/XNOR building blocks",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "An <strong>AND-OR</strong> circuit (a layer of AND gates feeding one OR gate) directly implements any " +
          "<strong>SOP</strong> expression like X = AB + CD — the output is HIGH when ANY product term is satisfied, i.e. an " +
          "<em>active-HIGH</em> design. Complementing that circuit gives <strong>AND-OR-Invert (AOI)</strong>, which " +
          "implements <strong>POS</strong>: X̄ = AB + CD is the same as X = (Ā+B̄)(C̄+D̄) by DeMorgan — the " +
          "<em>active-LOW</em> design. Choose SOP/AND-OR when the output should be 1, POS/AOI when it should be 0.",
        formula: "SOP → AND-OR (active HIGH)   ·   POS → AND-OR-Invert (active LOW)   ·   AB + CD = (A+B)(C+D)",
        bullets: [
          "AND-OR: AND gates for each product term, one OR gate combines them — output HIGH if ANY term is HIGH",
          "X = AB + CD is HIGH when (A AND B) or (C AND D) — read the truth table rows where X = 1",
          "AND-OR-Invert = AND-OR followed by inversion → implements POS (the complement)",
          "DeMorgan bridge: (AB + CD)′ = (AB)′(CD)′ = (A′+B′)(C′+D′)",
          "Design for active-HIGH output → derive SOP from the 1-rows of the truth table",
          "Design for active-LOW output → derive POS (complement of X) and use AOI logic",
          "XOR: X = AB̄ + ĀB (HIGH when inputs differ) · XNOR: X = AB + ĀB̄ (HIGH when inputs equal)"
        ],
        analogy: "Two ways to guard a door. AND-OR is a list of ACCEPT rules: 'let them in if (badge AND appointment) OR (staff AND uniform)' — any satisfied rule opens the door (output 1). AND-OR-Invert is the same list used as REJECT rules: the door stays open unless a rule fires (output 0). Same rule list, opposite polarity — that's SOP vs POS, active-HIGH vs active-LOW."
      },
      workedExample: {
        problem: "For X = AB + CD, determine the output for inputs A=1, B=1, C=0, D=1, and describe the AND-OR circuit that implements it.",
        steps: [
          "<strong>Circuit structure:</strong> AND gate #1 computes AB, AND gate #2 computes CD, one OR gate combines: X = AB + CD",
          "<strong>Evaluate the AND terms:</strong> AB = 1·1 = 1 · CD = 0·1 = 0",
          "<strong>Evaluate the OR:</strong> X = 1 + 0 = <strong>1</strong> — one satisfied product term is enough",
          "<strong>Truth-table view:</strong> X = 1 on exactly the rows where (A=B=1) or (C=D=1) — 7 of 16 rows",
          "<strong>Active-LOW variant:</strong> for X̄ instead, add an inverter (AOI) or build POS: X̄ = (A′+B′)(C′+D′) by DeMorgan"
        ],
        note: "Slides' rule of thumb — Output 1 wanted: SOP with AND-OR. Output 0 wanted: POS with AND-OR-Invert."
      },
      quiz: [
        {
          id: "q-dl5-001",
          type: "mcq",
          question: "An AND-OR circuit implements X = AB + CD. Its output X is HIGH when:",
          options: [
            "All four inputs A, B, C, D are HIGH",
            "At least one of the AND terms (AB or CD) is satisfied",
            "Exactly one AND gate output is HIGH",
            "The OR gate receives two LOW inputs"
          ],
          answer: 1,
          explanation: "At least one product term satisfied: the OR gate outputs HIGH if ANY of its inputs is HIGH, and each input is an AND term. A=B=1 alone suffices (regardless of C, D). This 'any accept-rule opens the door' behaviour is the definition of SOP/active-HIGH logic.",
          xpReward: 25
        },
        {
          id: "q-dl5-002",
          type: "mcq",
          question: "To design a circuit whose output must be 0 (active-LOW) for certain input combinations, the standard approach is:",
          options: [
            "SOP expression implemented with AND-OR logic",
            "POS expression implemented with AND-OR-Invert logic",
            "XOR gates only",
            "A single NOT gate"
          ],
          answer: 1,
          explanation: "POS with AND-OR-Invert. Per the module: active-HIGH output ↔ SOP ↔ AND-OR; active-LOW output ↔ POS ↔ AND-OR-Invert. AOI is literally the AND-OR circuit with an inversion, and DeMorgan converts the complemented SOP into the POS form: (AB + CD)′ = (A′+B′)(C′+D′).",
          xpReward: 25
        },
        {
          id: "q-dl5-003",
          type: "calc",
          question: "For X = AB + CD with inputs A=1, B=0, C=1, D=1, compute X (enter 0 or 1).",
          setup: "AB = 1·0 = ?\nCD = 1·1 = ?\nX = AB + CD (OR of the two terms)",
          hint: "AND then OR",
          answer: 1,
          tolerance: 0,
          unit: "X =",
          calcType: "numeric",
          explanation: "AB = 0, CD = 1, so X = 0 + 1 = 1. The failed first term doesn't matter — SOP only needs ONE satisfied product. Evaluating expressions gate-by-gate like this is the fastest way to fill truth-table rows in the exam.",
          xpReward: 35
        },
        {
          id: "q-dl5-004",
          type: "mcq",
          question: "By DeMorgan's theorem, the complement of AB + CD equals:",
          options: [
            "ĀB̄ + C̄D̄",
            "(Ā + B̄)(C̄ + D̄)",
            "(A + B)(C + D)",
            "ĀB̄ · C̄D̄"
          ],
          answer: 1,
          explanation: "(AB + CD)′ = (AB)′ · (CD)′ = (Ā + B̄)(C̄ + D̄). DeMorgan twice: the outer OR becomes AND, and each inner AND becomes OR with complemented literals. This identity is exactly why AND-OR-Invert hardware implements POS — memorise it as 'break the bar, flip the operator'.",
          xpReward: 25
        },
        {
          id: "q-dl5-005",
          type: "truefalse",
          question: "An XOR gate outputs HIGH only when its two inputs are different, implementing X = AB̄ + ĀB.",
          answer: 0,
          explanation: "True. XOR = 'difference detector': 01 and 10 give HIGH; 00 and 11 give LOW — the SOP form AB̄ + ĀB captures exactly the two 'different' rows. Its complement XNOR (X = AB + ĀB̄) is the 'equality detector', outputting HIGH when inputs match. Both are two-level AND-OR circuits inside.",
          xpReward: 25
        },
        {
          id: "q-dl5-006",
          type: "match",
          question: "Match each design goal / expression form to its implementation.",
          pairs: [
            { term: "SOP (e.g. AB + CD)",       definition: "AND-OR logic — active-HIGH output" },
            { term: "POS (e.g. (A+B)(C+D))",    definition: "AND-OR-Invert logic — active-LOW output" },
            { term: "Inputs differ → HIGH",      definition: "XOR: X = AB̄ + ĀB" },
            { term: "Inputs equal → HIGH",       definition: "XNOR: X = AB + ĀB̄" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The four basic combinational patterns of Module 5. SOP/POS map to AND-OR/AOI by output polarity; XOR/XNOR are the difference/equality specialists. Exam questions frequently give a truth table and ask which pattern implements it.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Universal Gates ───────────────── */
    {
      id: "dl5-universal",
      title: "Universal Gates: NAND & NOR",
      subtitle: "Build NOT/AND/OR from one gate type · NAND↔SOP, NOR↔POS · Gate-count table",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "NAND and NOR are <strong>universal gates</strong>: each alone can implement NOT, AND, OR — and therefore " +
          "any logic circuit whatsoever. A NAND with its inputs tied together is a NOT; NAND followed by NAND-as-NOT is an " +
          "AND; NANDing two inverted inputs gives OR (DeMorgan). Manufacturing loves this: one gate type, one chip, any " +
          "function. Practical pairing: <strong>NAND is natural for SOP</strong> (two-level NAND-NAND = AND-OR) and " +
          "<strong>NOR is natural for POS</strong> (NOR-NOR = OR-AND).",
        formula: "NAND(A,A) = Ā · NAND(NAND(A,B), NAND(A,B)) = AB · NAND(Ā,B̄) = A + B",
        bullets: [
          "Universal gate: can realise NOT, AND, OR alone → can build ANY combinational circuit",
          "NOT from NAND: tie both inputs together — NAND(A,A) = (AA)′ = Ā (same trick works with NOR)",
          "AND from NAND: NAND then invert (2 gates) · OR from NAND: invert both inputs, then NAND (3 gates — DeMorgan)",
          "OR from NOR: NOR then invert (2 gates) · AND from NOR: invert both inputs, then NOR (3 gates)",
          "Gate-count table: NOT=1/1, AND=2/3, OR=3/2, NAND=–/4, NOR=4/– (NAND count / NOR count)",
          "SOP circuits convert cleanly to ALL-NAND · POS circuits convert cleanly to ALL-NOR",
          "Adjacent inverting bubbles (double inversion) cancel: A″ = A — the key simplification when converting"
        ],
        analogy: "LEGO's universal brick. You could stock ten specialised pieces — or one brick type that builds anything with a few extra placements. Factories prefer stocking one: a full logic family from a single NAND (or NOR) chip means simpler inventory, uniform electrical behaviour, and cheaper dies. The 'extra placements' are the small gate-count overhead in the conversion table."
      },
      workedExample: {
        problem: "Implement X = AB + CD using NAND gates only, and explain why some gates can be discarded.",
        steps: [
          "<strong>Start (SOP):</strong> two AND gates (AB, CD) feeding one OR gate",
          "<strong>Naive conversion:</strong> replace each AND with NAND+inverter, and the OR with inverters+NAND — 7 NAND gates (G1 makes (AB)′, G2 re-inverts to AB, G3–G4 same for CD, G5–G6 invert the OR inputs, G7 NANDs them)",
          "<strong>Spot double inversions:</strong> G2 re-inverts what G5 will invert again — the pairs G2+G5 and G4+G6 are back-to-back bubbles: A″ = A",
          "<strong>Discard:</strong> remove G2, G4, G5, G6 → <strong>3 NAND gates</strong>: G1 = (AB)′, G3 = (CD)′, G7 = ((AB)′·(CD)′)′",
          "<strong>Verify with DeMorgan:</strong> ((AB)′(CD)′)′ = AB + CD ✓ — NAND-NAND two-level = AND-OR exactly"
        ],
        note: "General rule: any 2-level SOP (AND-OR) circuit becomes NAND-NAND gate-for-gate. Likewise POS (OR-AND) becomes NOR-NOR."
      },
      quiz: [
        {
          id: "q-dl5-007",
          type: "mcq",
          question: "Why are NAND and NOR called universal gates?",
          options: [
            "They have more inputs than other gates",
            "Each can implement NOT, AND, and OR alone — and therefore any logic function",
            "They consume no power",
            "They are the only gates with truth tables"
          ],
          answer: 1,
          explanation: "Either gate alone suffices to build the three primitives (NOT, AND, OR), and any Boolean function decomposes into those — so a single gate type can implement anything. Practical payoff: one-chip-type manufacturing. AND or OR alone are NOT universal (neither can create inversion).",
          xpReward: 25
        },
        {
          id: "q-dl5-008",
          type: "mcq",
          question: "How is a NOT gate created from a single NAND gate?",
          options: [
            "Connect one input to ground",
            "Tie both inputs together: NAND(A, A) = (A·A)′ = Ā",
            "Connect the output back to an input",
            "It cannot be done with one NAND"
          ],
          answer: 1,
          explanation: "Tie the inputs: NAND(A,A) = (AA)′ = Ā since A·A = A (idempotent law). The same trick works with NOR: NOR(A,A) = (A+A)′ = Ā. This one-gate inverter is the first building block in every universal-gate conversion. (Grounding an input would force a NAND output permanently HIGH.)",
          xpReward: 25
        },
        {
          id: "q-dl5-009",
          type: "calc",
          question: "Per the module's gate-count table, how many NAND gates are required to build an OR gate?",
          setup: "OR from NAND: invert A (1 gate), invert B (1 gate),\nthen NAND the results: (Ā·B̄)′ = A + B (1 gate)",
          hint: "Two input inverters + one combining NAND",
          answer: 3,
          tolerance: 0,
          unit: "gates",
          calcType: "numeric",
          explanation: "3 NAND gates: NAND(A,A) = Ā, NAND(B,B) = B̄, then NAND(Ā,B̄) = (ĀB̄)′ = A + B by DeMorgan. The full table — NOT: 1/1, AND: 2/3, OR: 3/2, NOR: 4/–, NAND: –/4 (NAND-count/NOR-count) — is directly examinable; note the symmetry: each gate is cheap in its 'natural' family.",
          xpReward: 35
        },
        {
          id: "q-dl5-010",
          type: "mcq",
          question: "A two-level SOP circuit (AND gates into an OR gate) is converted to NAND-only. The result is:",
          options: [
            "NAND gates for the ANDs, an unchanged OR at the output",
            "A NAND-NAND circuit — every gate becomes a NAND, same topology",
            "Twice as many gate levels as before",
            "Impossible without adding XOR gates"
          ],
          answer: 1,
          explanation: "NAND-NAND, gate-for-gate: put bubbles on the OR's inputs and compensating bubbles on the AND outputs — bubbles pair up and cancel, each AND-with-bubble is a NAND, and the OR-with-input-bubbles is a negative-OR ≡ NAND. Topology unchanged, function unchanged: ((AB)′(CD)′)′ = AB + CD. The POS twin: OR-AND → NOR-NOR.",
          xpReward: 25
        },
        {
          id: "q-dl5-011",
          type: "truefalse",
          question: "When converting a circuit to universal gates, two inverting bubbles appearing back-to-back on the same line cancel and both gates can often be discarded.",
          answer: 0,
          explanation: "True. Double complement: A″ = A (rule 9). In the naive AB + CD conversion, 7 NANDs shrink to 3 precisely by discarding the two pairs of back-to-back inverters. Hunting for cancelling bubble pairs is the standard simplification step in every conversion exercise (the slides discard G2, G4, G5, G6).",
          xpReward: 25
        },
        {
          id: "q-dl5-012",
          type: "fillblank",
          question: "NAND-NAND two-level circuits naturally implement SOP expressions, while NOR-NOR circuits naturally implement ______ expressions.",
          answer: "POS",
          explanation: "POS (product of sums). The pairing NAND↔SOP, NOR↔POS follows from DeMorgan: NAND-NAND collapses to AND-OR (= SOP) and NOR-NOR collapses to OR-AND (= POS). Pick the universal gate that matches your expression form and the conversion costs nothing.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Dual Symbols ───────────────── */
    {
      id: "dl5-dual-symbols",
      title: "Dual Gate Symbols",
      subtitle: "NAND ≡ negative-OR · NOR ≡ negative-AND · Odd/even levels · Reading circuits fast",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "Every inverting gate has two equivalent symbols. A NAND can be drawn as an AND with an output bubble " +
          "<em>or</em> as an OR with input bubbles (<strong>negative-OR</strong>) — DeMorgan guarantees they are the same " +
          "hardware: (AB)′ = Ā + B̄. Likewise NOR ≡ <strong>negative-AND</strong>: (A+B)′ = Ā·B̄. In multi-level NAND-only " +
          "circuits, replacing the gates at <em>alternating levels</em> (odd or even, counting from the output) with dual " +
          "symbols makes bubbles cancel pairwise along every wire — the Boolean expression can then be read directly " +
          "off the diagram.",
        formula: "NAND: (AB)′ = Ā + B̄ (negative-OR)   ·   NOR: (A+B)′ = Ā·B̄ (negative-AND)",
        bullets: [
          "Dual symbol = DeMorgan drawn as a schematic: same gate, two appearances",
          "NAND standard symbol: AND + output bubble · dual: OR + input bubbles",
          "NOR standard symbol: OR + output bubble · dual: AND + input bubbles",
          "Technique: number the gate levels from the output (1, 2, 3, …); replace all gates at ODD (or all at EVEN) levels with duals",
          "Result: output bubbles meet input bubbles on every internal wire → they cancel → read the expression straight through",
          "Purpose is readability only — the hardware is unchanged",
          "Applies equally to NAND-only and NOR-only circuits"
        ],
        analogy: "Reading double negatives in a sentence. 'It is not the case that no student passed' takes effort to parse — 'some student passed' is instant. Bubbles are schematic negations: two on the same wire is a double negative. Redrawing alternating gates with dual symbols pairs up the negations so they cancel visually, turning a bubble-riddled schematic into a plain-English AND-OR sentence you can read in one pass."
      },
      workedExample: {
        problem: "A 3-level NAND-only circuit computes X = ((AB)′(CD)′)′ at the output gate. Use dual symbols to read the expression directly.",
        steps: [
          "<strong>Number levels from the output:</strong> output NAND = level 1 (odd), the two input NANDs = level 2 (even)",
          "<strong>Replace odd levels with duals:</strong> the level-1 NAND becomes a negative-OR (OR with input bubbles); level-2 gates keep their AND-with-output-bubble form",
          "<strong>Cancel bubbles:</strong> each level-2 output bubble meets a level-1 input bubble on the same wire — both cancel",
          "<strong>Read directly:</strong> what remains visually is two AND gates into an OR gate: X = <strong>AB + CD</strong>",
          "<strong>Verify algebraically:</strong> ((AB)′(CD)′)′ = (AB)″ + (CD)″ = AB + CD ✓ — DeMorgan agrees with the picture"
        ],
        note: "Choose whichever parity (odd or even levels) makes bubbles pair up along the internal wires — exam questions specify which to use."
      },
      quiz: [
        {
          id: "q-dl5-013",
          type: "mcq",
          question: "The dual symbol for a NAND gate is:",
          options: [
            "An AND gate with no bubbles",
            "An OR gate with bubbles on its inputs (negative-OR)",
            "An OR gate with a bubble on its output",
            "An XOR gate"
          ],
          answer: 1,
          explanation: "Negative-OR: (AB)′ = Ā + B̄ by DeMorgan, and 'OR of complemented inputs' is drawn as an OR with input bubbles. Same silicon, alternative drawing. (An OR with an output bubble is a NOR — a different gate entirely, and the classic wrong answer.)",
          xpReward: 25
        },
        {
          id: "q-dl5-014",
          type: "mcq",
          question: "The dual symbol for a NOR gate is:",
          options: [
            "A negative-AND: AND gate with bubbles on its inputs",
            "A negative-OR: OR gate with bubbles on its inputs",
            "An AND gate with a bubble on its output",
            "A buffer with two bubbles"
          ],
          answer: 0,
          explanation: "Negative-AND: (A+B)′ = Ā·B̄ — an AND of complemented inputs, drawn as AND with input bubbles. The symmetric pairing to remember: NAND ↔ negative-OR, NOR ↔ negative-AND. (AND with an output bubble is a NAND — another different gate.)",
          xpReward: 25
        },
        {
          id: "q-dl5-015",
          type: "mcq",
          question: "Why are dual symbols substituted at ALTERNATING gate levels (odd or even) in a NAND-only circuit?",
          options: [
            "To halve the number of physical gates",
            "So output bubbles and input bubbles meet on each internal wire and cancel — the expression becomes directly readable",
            "Because odd-level gates are electrically different from even-level gates",
            "To convert the circuit from NAND to NOR"
          ],
          answer: 1,
          explanation: "Bubble-cancellation. Alternating duals puts an output bubble (from a standard NAND) against an input bubble (from a dual negative-OR) on every internal wire — a double inversion that cancels visually. The de-bubbled diagram reads as a plain AND-OR expression. Hardware untouched; only the drawing (and your reading speed) changes.",
          xpReward: 25
        },
        {
          id: "q-dl5-016",
          type: "truefalse",
          question: "Replacing a NAND gate with its negative-OR dual symbol changes the circuit's logical function.",
          answer: 1,
          explanation: "False. The dual symbol is the SAME gate — DeMorgan's identity (AB)′ = Ā + B̄ drawn differently. Function, hardware, truth table: all identical. Dual symbols exist purely as a documentation/reading convention; if redrawing changed behaviour, it would be useless.",
          xpReward: 25
        },
        {
          id: "q-dl5-017",
          type: "match",
          question: "Match each symbol description to its gate identity.",
          pairs: [
            { term: "AND + output bubble",  definition: "NAND — standard symbol" },
            { term: "OR + input bubbles",   definition: "NAND — dual (negative-OR) symbol" },
            { term: "OR + output bubble",   definition: "NOR — standard symbol" },
            { term: "AND + input bubbles",  definition: "NOR — dual (negative-AND) symbol" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The four inverting-gate appearances. Bubble position is everything: output bubble = the familiar NAND/NOR; input bubbles = the DeMorgan dual of the OTHER shape. Being fluent in all four lets you read any mixed schematic at sight — the point of this whole topic.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 4 — Combinational Design ───────────────── */
    {
      id: "dl5-design",
      title: "Designing Combinational Circuits",
      subtitle: "Word problem → truth table → SOP → K-map simplify → draw → convert to universal gates",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "The systematic recipe that turns a word problem into hardware: <strong>(1) Understand</strong> the problem and " +
          "name inputs/outputs · <strong>(2) Build the truth table</strong> for all 2ⁿ input combinations · " +
          "<strong>(3) Extract the expression</strong> — SOP from the 1-rows · <strong>(4) Simplify</strong> with Boolean " +
          "algebra or a K-map · <strong>(5) Draw</strong> the minimal circuit · <strong>(6) Convert</strong> to NAND-only or " +
          "NOR-only if required. The classic example: three chemical tanks with LOW-level sensors, alarm when ANY TWO tanks run low.",
        formula: "Understand → Truth table → SOP → Simplify (K-map) → Draw → Convert to universal gates",
        bullets: [
          "Name inputs/outputs first: 3 sensors A, B, C (HIGH = tank low), output X (HIGH = alarm)",
          "Truth table has 2ⁿ rows: n = 3 sensors → 8 rows; mark X = 1 where ≥ 2 inputs are 1",
          "SOP from 1-rows: X = A′BC + AB′C + ABC′ + ABC",
          "Simplify: X = AB + AC + BC (each pair-term absorbs ABC; Boolean rules 6 & 11 or a K-map)",
          "Minimal circuit: three 2-input ANDs + one 3-input OR",
          "Convert step: SOP → NAND-NAND directly (four NAND gates)",
          "Always re-check the simplified circuit against the original truth table"
        ],
        analogy: "A recipe with fixed courses. You never jump from 'hungry' to 'plated dish' — you plan the menu (understand), list every ingredient combination (truth table), write the recipe (SOP), trim redundant steps (simplify), cook (draw), and adapt to the kitchen's one appliance (universal-gate conversion). Skipping a course is how designs — and exam answers — go wrong."
      },
      workedExample: {
        problem: "Three tanks have level sensors A, B, C (HIGH when the tank's level drops too low). Design a circuit whose output X goes HIGH when ANY TWO (or more) tanks are low.",
        steps: [
          "<strong>Truth table (8 rows):</strong> X = 1 for ABC = 011, 101, 110, 111 — the rows with two or more 1s",
          "<strong>Raw SOP:</strong> X = A′BC + AB′C + ABC′ + ABC",
          "<strong>Simplify:</strong> group ABC with each pair: X = BC(A′+A) + AC(B′+B) + AB(C′+C) = <strong>AB + AC + BC</strong>",
          "<strong>Draw:</strong> AND(A,B), AND(A,C), AND(B,C) → 3-input OR → X",
          "<strong>NAND-only conversion:</strong> the three ANDs become NANDs, the OR becomes a 3-input NAND (SOP → NAND-NAND): X = ((AB)′(AC)′(BC)′)′",
          "<strong>Check:</strong> A=1, B=1, C=0 → AB=1 → X=1 ✓ · A=1, B=0, C=0 → all terms 0 → X=0 ✓"
        ],
        note: "X = AB + AC + BC is the majority function — worth memorising, it reappears in adder carry logic (Module 6: carry = AB + AC_in + BC_in)."
      },
      quiz: [
        {
          id: "q-dl5-018",
          type: "mcq",
          question: "Put the combinational design steps in the correct order:",
          options: [
            "Draw circuit → truth table → simplify → understand problem",
            "Understand → truth table → derive SOP → simplify (K-map) → draw → convert to universal gates",
            "Simplify → truth table → SOP → draw",
            "Truth table → convert to NAND → derive expression → draw"
          ],
          answer: 1,
          explanation: "Understand → tabulate → extract SOP → simplify → draw → convert. The order matters: you can't extract an expression before the table exists, and simplifying before extraction has nothing to work on. Exam design questions award marks per step — follow the sequence visibly.",
          xpReward: 25
        },
        {
          id: "q-dl5-019",
          type: "calc",
          question: "A combinational design problem has 3 inputs. How many rows must its truth table contain?",
          setup: "Rows = 2ⁿ where n = number of inputs = 3",
          hint: "2³",
          answer: 8,
          tolerance: 0,
          unit: "rows",
          calcType: "numeric",
          explanation: "2³ = 8 rows — every combination from 000 to 111 must be listed and given an output value. The 2ⁿ growth is also why K-maps (up to 4–5 variables) and algebraic simplification matter: brute-force tables explode quickly.",
          xpReward: 35
        },
        {
          id: "q-dl5-020",
          type: "mcq",
          question: "In the three-tank alarm problem (alarm when ≥2 sensors HIGH), the simplified output expression is:",
          options: [
            "X = A + B + C",
            "X = ABC",
            "X = AB + AC + BC",
            "X = A′B′C′"
          ],
          answer: 2,
          explanation: "X = AB + AC + BC — the majority-of-3 function. Each product detects one PAIR of low tanks; the raw four-minterm SOP (A′BC + AB′C + ABC′ + ABC) collapses because ABC is absorbed into each pair term via (A′+A) = 1. A+B+C would alarm on a single low tank; ABC only when all three are low.",
          xpReward: 25
        },
        {
          id: "q-dl5-021",
          type: "fillblank",
          question: "The SOP expression is extracted from the truth table by writing one product term for each row where the output equals ______.",
          answer: "1",
          explanation: "1 (HIGH). Each 1-row becomes a minterm: variables uncomplemented where the input is 1, complemented where 0 (row 011 → A′BC). OR all minterms together for the raw SOP. (The dual: 0-rows give maxterms for the POS form — used for active-LOW designs.)",
          xpReward: 25
        },
        {
          id: "q-dl5-022",
          type: "truefalse",
          question: "Simplifying X = A′BC + AB′C + ABC′ + ABC to X = AB + AC + BC changes the truth table of the circuit.",
          answer: 1,
          explanation: "False. Simplification preserves the function exactly — both expressions produce identical outputs on all 8 rows (verify: 111 gives 1 in both; 011 gives BC = 1 ✓). Fewer gates, same behaviour: that is the entire point of Boolean simplification. If simplification changed the table, it would be an error, not a simplification.",
          xpReward: 25
        },
        {
          id: "q-dl5-023",
          type: "mcq",
          question: "After simplifying to X = AB + AC + BC, the design must use NAND gates only. The most direct implementation is:",
          options: [
            "Three AND gates and one OR gate — no conversion possible",
            "Four NAND gates: three for the product terms, one combining them (SOP → NAND-NAND)",
            "Twelve NAND gates — each AND needs four NANDs",
            "Three XOR gates"
          ],
          answer: 1,
          explanation: "Four NANDs. Two-level SOP converts gate-for-gate: each AND → NAND, the OR → NAND (bubbles cancel pairwise): X = ((AB)′(AC)′(BC)′)′. No extra inverters needed because the double inversions cancel — the payoff of the dual-symbol/bubble analysis from the previous section.",
          xpReward: 25
        }
      ]
    }
  ]
};
