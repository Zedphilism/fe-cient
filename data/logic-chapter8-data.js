/**
 * data/logic-chapter8-data.js
 * Module 8 (a+b) — Counters (SECR1013 Digital Logic)
 * Global: window.dlChapter8Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.dlChapter8Data = {
  id: "logic-chapter8",
  key: "dl8",
  title: "Chapter 8: Counters",
  heroTitle: "Counters",
  heroDesc: "Sequential circuits that step through prescribed state sequences. Asynchronous (ripple) counters chain " +
    "toggle flip-flops; synchronous counters clock every stage at once; truncated counters recycle early via CLR decoding; " +
    "and the 6-step synchronous design procedure turns any state diagram into hardware. Module 8a + 8b, fully drilled.",
  statusLabel: "MODULE 8 — COUNTERS",
  nextChapter: null,
  completeText: "You can size counters, compute f_max and ripple delay, build any MOD-N truncated counter, and design synchronous counters from state diagrams.",

  sections: [

    /* ───────────────── SECTION 1 — Async Ripple Counters ───────────────── */
    {
      id: "dl8-async",
      title: "Asynchronous (Ripple) Counters",
      subtitle: "CLK drives only FF₀ · Each Q clocks the next · Ripple delay N × tpd · f_max = 1/(N·tpd)",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "A <strong>counter</strong> is a sequential circuit stepping through a prescribed state sequence; its " +
          "<strong>modulus</strong> is the number of states before it recycles. In an <strong>asynchronous (ripple) counter</strong>, " +
          "the external clock drives ONLY the LSB flip-flop; each subsequent stage is clocked by the previous stage's output. " +
          "All flip-flops sit in toggle mode (J=K=1). Simple hardware — but the carry <em>ripples</em>: stage k changes only " +
          "after k propagation delays, so total settle time is N × t<sub>pd</sub> and the max clock frequency is " +
          "<strong>f<sub>max</sub> = 1/(N × t<sub>pd</sub>)</strong>, worsening with every added bit.",
        formula: "n-bit counter: MOD ≤ 2ⁿ   ·   ripple delay = N × tpd   ·   f_max = 1 / (N × tpd)",
        bullets: [
          "Modulus (MOD-n) = number of states in the cycle; n flip-flops give max MOD = 2ⁿ",
          "External CLK → FF₀ only; FF₁ is clocked by Q₀, FF₂ by Q₁, … (count-up with the right edge pairing)",
          "All FFs in toggle mode: J = K = 1",
          "Count-up vs count-down: clock the next stage from Q or from Q̄ (depends on edge polarity)",
          "Each stage halves the frequency: Q₀ = CLK/2, Q₁ = CLK/4, Q₂ = CLK/8 …",
          "Ripple delay accumulates: the MSB is valid only N × tpd after the clock edge",
          "f_max = 1/(N × tpd) — adding bits directly reduces the usable clock rate",
          "Transient glitch states appear momentarily while the ripple propagates (e.g. 011 → 010 → 000 → 100)"
        ],
        analogy: "A row of dominoes. You tip only the first domino (external clock → FF₀); each falling domino tips the next. Simple to set up — but the last domino falls noticeably later than the first: with 10 dominoes at 10 ns each, 100 ns passes before the row settles. Push dominoes faster than the row can finish falling and the pattern corrupts — that's exactly why f_max = 1/(N × tpd)."
      },
      workedExample: {
        problem: "A 4-bit ripple counter uses JK flip-flops with tpd = 10 ns each. Compute the total ripple delay and the maximum clock frequency, then trace the count after 6 pulses from 0000.",
        steps: [
          "<strong>Ripple delay:</strong> worst case all 4 stages must flip in sequence → 4 × 10 ns = <strong>40 ns</strong>",
          "<strong>Max frequency:</strong> f_max = 1/(40 ns) = <strong>25 MHz</strong> — above this, a new edge arrives before the previous ripple finishes",
          "<strong>Count trace:</strong> starting 0000, each pulse adds 1: 0001, 0010, 0011, 0100, 0101, <strong>0110</strong> after 6 pulses (6₁₀ ✓)",
          "<strong>Frequency division check:</strong> Q₀ toggles every pulse (CLK/2), Q₁ every 2 pulses (CLK/4), Q₂ every 4 (CLK/8), Q₃ every 8 (CLK/16)",
          "<strong>Compare synchronous:</strong> the same FFs clocked in parallel settle in ~1 × tpd + gate delay → f_max stays high regardless of bit count"
        ],
        note: "Two formulas carry most Module 8a exam marks: delay = N × tpd and f_max = 1/(N × tpd). Practise both directions (given f_max, find N or tpd)."
      },
      quiz: [
        {
          id: "q-dl8-001",
          type: "mcq",
          question: "In an asynchronous ripple counter, the external clock signal connects to:",
          options: [
            "Every flip-flop simultaneously",
            "Only the LSB flip-flop — each later stage is clocked by the previous stage's output",
            "Only the MSB flip-flop",
            "The CLR inputs of all flip-flops"
          ],
          answer: 1,
          explanation: "Only FF₀. The defining feature: FF₁'s clock is Q₀, FF₂'s clock is Q₁, and so on — the carry ripples through like dominoes. 'All flip-flops share one clock' is the SYNCHRONOUS counter — the fundamental architectural distinction of Module 8.",
          xpReward: 25
        },
        {
          id: "q-dl8-002",
          type: "calc",
          question: "A 4-bit ripple counter uses flip-flops with tpd = 10 ns. Compute its maximum clock frequency in MHz.",
          setup: "Ripple delay = N × tpd = 4 × 10 ns = 40 ns\nf_max = 1 / (40 ns) = 1 / (40 × 10⁻⁹ s)",
          hint: "1/40ns = 25 × 10⁶ Hz",
          answer: 25,
          tolerance: 0.5,
          unit: "MHz",
          calcType: "numeric",
          explanation: "f_max = 1/(4 × 10 ns) = 1/40 ns = 25 MHz. Clock any faster and a new edge arrives before the worst-case ripple (all 4 bits flipping, e.g. 0111→1000) completes — corrupt states result. Note the trade-off: a 5th bit would drop f_max to 20 MHz.",
          xpReward: 35
        },
        {
          id: "q-dl8-003",
          type: "calc",
          question: "A ripple counter must count 0–59 (60 states, like the seconds of a clock). What is the MINIMUM number of flip-flops required?",
          setup: "Need 2ⁿ ≥ 60\n2⁵ = 32 (too small) · 2⁶ = 64 ✓",
          hint: "Smallest n with 2ⁿ ≥ 60",
          answer: 6,
          tolerance: 0,
          unit: "FFs",
          calcType: "numeric",
          explanation: "6 flip-flops: 2⁶ = 64 ≥ 60 (5 gives only 32). The counter is then TRUNCATED from MOD-64 to MOD-60 by decoding state 60 and forcing CLR. The sizing rule 2ⁿ⁻¹ < M ≤ 2ⁿ is the first step of every truncated-counter design — and a guaranteed exam calculation.",
          xpReward: 35
        },
        {
          id: "q-dl8-004",
          type: "mcq",
          question: "In a ripple counter, every flip-flop is configured with:",
          options: [
            "J = 1, K = 0 (permanent set)",
            "J = K = 1 (toggle mode)",
            "J = K = 0 (hold mode)",
            "D connected to the clock"
          ],
          answer: 1,
          explanation: "Toggle mode, J=K=1. Binary counting IS toggling: bit k flips exactly when all lower bits roll over — which the ripple architecture delivers automatically, since each Q's edge clocks the next stage. No steering logic needed; the wiring does the arithmetic.",
          xpReward: 25
        },
        {
          id: "q-dl8-005",
          type: "truefalse",
          question: "In a 3-bit ripple counter, the Q₂ output has a frequency equal to the input clock divided by 8.",
          answer: 0,
          explanation: "True. Each toggling stage divides by 2: Q₀ = CLK/2, Q₁ = CLK/4, Q₂ = CLK/8 = CLK/2³. A ripple counter doubles as a frequency divider chain — clocks, timers and prescalers in microcontrollers are exactly this structure.",
          xpReward: 25
        },
        {
          id: "q-dl8-006",
          type: "mcq",
          question: "Why do brief 'glitch' states appear on a ripple counter's outputs (e.g. passing through 010 and 000 when counting 011 → 100)?",
          options: [
            "The flip-flops are faulty",
            "The bits change one-by-one as the carry ripples — intermediate patterns are momentarily visible",
            "The clock frequency is too low",
            "The J and K inputs are floating"
          ],
          answer: 1,
          explanation: "Stage-by-stage transitions: going 011→100, Q₀ flips first (011→010), then Q₁ (010→000), then Q₂ (000→100) — each intermediate pattern exists for one tpd. Downstream logic decoding these states can false-trigger. Synchronous counters eliminate the problem: all bits change together on the shared edge.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Synchronous Counters ───────────────── */
    {
      id: "dl8-sync",
      title: "Synchronous Counters",
      subtitle: "One shared clock · All bits change together · Toggle when all lower bits are 1 · f_max independent of width",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "A <strong>synchronous counter</strong> feeds the SAME clock to every flip-flop — all state changes happen " +
          "simultaneously on the shared edge. The counting logic moves into combinational gating: for a binary up-counter, " +
          "<strong>FF₀ always toggles; FF<sub>k</sub> toggles when ALL lower bits are 1</strong> (J<sub>k</sub> = K<sub>k</sub> = " +
          "Q₀·Q₁·…·Q<sub>k−1</sub>). The critical path is one AND chain plus one flip-flop delay — <em>independent of bit " +
          "count</em> — so f<sub>max</sub> stays high for wide counters, and outputs are glitch-free since no ripple exists.",
        formula: "FF₀: J=K=1 always   ·   FFₖ: Jₖ = Kₖ = Q₀·Q₁·…·Qₖ₋₁   ·   settle time ≈ 1 tpd (not N·tpd)",
        bullets: [
          "All flip-flops share ONE clock — every bit updates on the same edge",
          "Next-state logic computed in parallel by AND gates BEFORE the edge arrives",
          "Binary up-counter rule: bit k toggles when all lower bits are 1 (carry into position k)",
          "2-bit example: FF₀ J=K=1 · FF₁ J=K=Q₀ → sequence 00, 01, 10, 11, 00 …",
          "Settle time ≈ one FF delay + carry-gate delay — nearly independent of width",
          "No transient glitch states: bits change simultaneously",
          "Cost: extra combinational gating per stage (the price of speed)",
          "Standard in all timing-critical hardware: CPUs, FPGAs, communication systems"
        ],
        analogy: "A rowing crew versus a bucket brigade. The ripple counter is a bucket brigade: each person acts only after receiving from the previous one — total time grows with every added member. The synchronous counter is a rowing eight: the cox calls the stroke (shared clock) and all eight oars move at the same instant — adding rowers doesn't slow the stroke rate. The crew just needs each rower to know IN ADVANCE whether to pull (the AND-gate carry logic)."
      },
      workedExample: {
        problem: "Design a 2-bit synchronous up-counter with JK flip-flops and trace it through one full cycle.",
        steps: [
          "<strong>Wiring:</strong> both FFs share CLK · FF₀: J₀=K₀=1 (always toggle) · FF₁: J₁=K₁=Q₀ (toggle only when Q₀=1)",
          "<strong>State 00, edge:</strong> FF₀ toggles → 1; FF₁ sees Q₀=0 → holds → <strong>01</strong>",
          "<strong>State 01, edge:</strong> FF₀ toggles → 0; FF₁ sees Q₀=1 → toggles → <strong>10</strong>",
          "<strong>State 10, edge:</strong> FF₀ toggles → 1; FF₁ sees Q₀=0 → holds → <strong>11</strong>",
          "<strong>State 11, edge:</strong> FF₀ toggles → 0; FF₁ sees Q₀=1 → toggles → <strong>00</strong> — cycle complete: 00→01→10→11→00, all bits changing on the shared edge"
        ],
        note: "Key subtlety: FF₁'s J/K are read from Q₀'s value BEFORE the edge (setup time) — the gating is evaluated on the old state, then everyone jumps together."
      },
      quiz: [
        {
          id: "q-dl8-007",
          type: "mcq",
          question: "The defining feature of a synchronous counter is:",
          options: [
            "Each flip-flop clocks the next one in a chain",
            "All flip-flops receive the same clock and change state simultaneously",
            "It can only count down",
            "It needs no combinational logic"
          ],
          answer: 1,
          explanation: "One shared clock, simultaneous updates — the rowing crew, not the bucket brigade. The intelligence moves from the wiring (ripple chains) into AND-gate carry logic computed in parallel before each edge. Result: constant settle time, glitch-free outputs, width-independent f_max.",
          xpReward: 25
        },
        {
          id: "q-dl8-008",
          type: "mcq",
          question: "In a 4-bit synchronous binary up-counter, flip-flop FF₂ should toggle when:",
          options: [
            "Every clock edge",
            "Q₀ = 1 only",
            "Q₀ = 1 AND Q₁ = 1 — all lower bits are 1",
            "Q₃ = 1"
          ],
          answer: 2,
          explanation: "J₂=K₂=Q₀·Q₁. Binary arithmetic: bit 2 flips exactly when a carry propagates into it, i.e. when bits 0 and 1 are both 1 (…011 + 1 = …100). Generalise: FFₖ toggles when Q₀ through Qₖ₋₁ are ALL 1 — the AND chain that replaces the ripple wiring.",
          xpReward: 25
        },
        {
          id: "q-dl8-009",
          type: "calc",
          question: "A 4-bit SYNCHRONOUS counter uses the same tpd = 10 ns flip-flops as the earlier ripple example (plus ~0 gate delay for simplicity). Approximately what is its f_max in MHz?",
          setup: "Synchronous settle time ≈ 1 × tpd = 10 ns (all FFs change together)\nf_max ≈ 1 / (10 ns)",
          hint: "1/10 ns = 100 × 10⁶ Hz",
          answer: 100,
          tolerance: 2,
          unit: "MHz",
          calcType: "numeric",
          explanation: "≈ 1/(10 ns) = 100 MHz — four times the ripple counter's 25 MHz with identical flip-flops. The gap widens with width: an 8-bit ripple counter drops to 12.5 MHz while the synchronous version stays ≈ 100 MHz (minus a small AND-chain delay). This comparison is the classic exam question of Module 8.",
          xpReward: 35
        },
        {
          id: "q-dl8-010",
          type: "truefalse",
          question: "Adding more bits to a synchronous counter reduces its maximum clock frequency proportionally, just as it does for a ripple counter.",
          answer: 1,
          explanation: "False. The synchronous settle time is one FF delay plus the carry-gate path — nearly constant in width (the AND chain grows slowly and can be flattened with wider gates). The ripple counter's N × tpd scaling is precisely the problem synchronous design exists to solve.",
          xpReward: 25
        },
        {
          id: "q-dl8-011",
          type: "match",
          question: "Match each property to the counter architecture.",
          pairs: [
            { term: "Clock wiring",     definition: "Ripple: CLK → FF₀ only · Synchronous: CLK → all FFs" },
            { term: "Settle time",      definition: "Ripple: N × tpd · Synchronous: ≈ 1 tpd + gate delay" },
            { term: "Output glitches",  definition: "Ripple: transient false states · Synchronous: none" },
            { term: "Hardware cost",    definition: "Ripple: minimal · Synchronous: extra AND gating per stage" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete ripple-vs-synchronous comparison table — reproduce it for any 'compare the two architectures' exam question. Simplicity vs speed and cleanliness: ripple wins on gate count, synchronous wins on everything timing-related.",
          xpReward: 25
        },
        {
          id: "q-dl8-012",
          type: "fillblank",
          question: "In a synchronous up-counter, the flip-flop for the LSB (FF₀) has its J and K inputs permanently tied to ______.",
          answer: "1",
          explanation: "1 (HIGH) — the LSB toggles on EVERY clock edge (binary: the units bit alternates 0,1,0,1…). Higher stages gate their toggling on the AND of all lower bits. FF₀'s J=K=1 is the anchor of the design pattern.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Modulus & Truncated Counters ───────────────── */
    {
      id: "dl8-modulus",
      title: "Modulus & Truncated Counters",
      subtitle: "MOD-N from 2ⁿ · Decode-and-clear with NAND → CLR · Decade (MOD-10) counter · Cascading",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "An n-bit counter naturally counts 2ⁿ states. To get any modulus M &lt; 2ⁿ, build a <strong>truncated " +
          "counter</strong>: choose n with 2ⁿ⁻¹ &lt; M ≤ 2ⁿ, then <strong>decode state M with a NAND gate</strong> wired to the " +
          "Q outputs that are 1 in M's binary code, and connect the NAND output to every flip-flop's active-LOW CLR̅. " +
          "The instant the counter touches state M, CLR̅ asserts and forces all stages to 0 — the counter visits 0…M−1 " +
          "and recycles. The <strong>decade counter</strong> (MOD-10) decodes 1010₂ with NAND(Q₃, Q₁). Cascading counters " +
          "multiplies moduli: MOD-10 × MOD-6 = MOD-60 (clock seconds).",
        formula: "Choose n: 2ⁿ⁻¹ < M ≤ 2ⁿ   ·   NAND the Qs that are 1 in M's code → CLR̅ of all FFs   ·   cascade: MOD(A×B) = MOD-A × MOD-B",
        bullets: [
          "Modulus = number of states visited before recycling; truncation forces early recycle",
          "Sizing: MOD-10 needs 4 FFs (2³ = 8 < 10 ≤ 16 = 2⁴)",
          "Decode ONLY the bits that are 1 in the reset state M — not all bits (e.g. 1010 → NAND(Q₃, Q₁))",
          "NAND output = 0 exactly at state M → asserts every CLR̅ simultaneously → counter jumps to 0",
          "State M appears for a few nanoseconds — a normal, expected glitch",
          "Counter visits 0 … M−1 (M states); state M itself is only transient",
          "Decade counter: MOD-10, decode 1010₂ = state 10 with NAND(Q₃, Q₁)",
          "Cascading: a MOD-10 stage clocking a MOD-6 stage gives 60 states — the seconds counter in every digital clock"
        ],
        analogy: "A board game with a house rule: 'if you reach square 10, go straight back to START.' The board physically has 16 squares (4-bit counter), but the tripwire on square 10 (NAND decode) teleports you home the instant you touch it — so the game effectively has squares 0–9. You DO touch square 10 for a split second (the glitch), but no move is ever played from it."
      },
      workedExample: {
        problem: "Build a MOD-10 (decade) counter from a 4-bit ripple counter, and verify the design decodes the right state.",
        steps: [
          "<strong>Size check:</strong> 2³ = 8 < 10 ≤ 16 = 2⁴ → 4 flip-flops needed",
          "<strong>Reset state:</strong> M = 10 = 1010₂ → Q₃=1, Q₂=0, Q₁=1, Q₀=0",
          "<strong>Decode:</strong> NAND only the 1-bits → NAND(Q₃, Q₁); output goes LOW when Q₃ = Q₁ = 1",
          "<strong>Why not decode all four bits?</strong> counting UP from 0, the FIRST state with Q₃=1 AND Q₁=1 is exactly 1010 (10) — states 0–9 never have both set, so two inputs suffice",
          "<strong>Wire:</strong> NAND output → CLR̅ of all four FFs. At the 10th pulse the counter touches 1010 for a few ns, clears to 0000, and the cycle 0–9 repeats",
          "<strong>Result:</strong> counts 0,1,2,…,9,0,… — the digit counter inside every digital clock and meter"
        ],
        note: "Decoding only the 1-bits works because the reset state is the FIRST count where that particular bit combination appears — always argue this in exam answers."
      },
      quiz: [
        {
          id: "q-dl8-013",
          type: "calc",
          question: "A MOD-12 counter (counts 0–11) must be built from a natural binary counter. How many flip-flops are required?",
          setup: "Need 2ⁿ⁻¹ < 12 ≤ 2ⁿ\n2³ = 8 < 12 ≤ 16 = 2⁴",
          hint: "Smallest n with 2ⁿ ≥ 12",
          answer: 4,
          tolerance: 0,
          unit: "FFs",
          calcType: "numeric",
          explanation: "4 flip-flops (2⁴ = 16 ≥ 12; three give only 8). Then truncate: decode state 12 = 1100₂ with NAND(Q₃, Q₂) → CLR̅ all stages. Sizing (2ⁿ rule) + decoding (1-bits only) is the complete two-step recipe for any MOD-N counter.",
          xpReward: 35
        },
        {
          id: "q-dl8-014",
          type: "mcq",
          question: "To truncate a 4-bit counter to MOD-10, the NAND gate decodes state 10 (1010₂) using which inputs?",
          options: [
            "All four outputs Q₃, Q₂, Q₁, Q₀",
            "Only Q₃ and Q₁ — the outputs that are 1 in 1010",
            "Only Q₂ and Q₀ — the outputs that are 0 in 1010",
            "The clock and Q₃"
          ],
          answer: 1,
          explanation: "NAND(Q₃, Q₁) — decode only the 1-bits. It's sufficient because counting up from 0, state 10 is the FIRST time Q₃ and Q₁ are simultaneously 1 (check: states 0–9 never have both). Fewer inputs, same effect — and 'why only two inputs?' is the standard follow-up exam question.",
          xpReward: 25
        },
        {
          id: "q-dl8-015",
          type: "mcq",
          question: "In a truncated MOD-10 counter, the state 1010 (10):",
          options: [
            "Never occurs at all",
            "Appears for a few nanoseconds before the asynchronous clear forces 0000 — a normal, expected glitch",
            "Is a stable state lasting one full clock period",
            "Causes permanent damage if it occurs"
          ],
          answer: 1,
          explanation: "Transient glitch: the counter must actually REACH 1010 for the NAND to fire; the clear then wipes it within nanoseconds. Visible on an oscilloscope, usually harmless — but worth knowing since downstream logic that decodes state 10 could false-trigger. 'Expected glitch at the reset state' is a favourite true/false item.",
          xpReward: 25
        },
        {
          id: "q-dl8-016",
          type: "calc",
          question: "A MOD-10 counter cascaded with a MOD-6 counter produces an overall modulus of:",
          setup: "Cascaded counters multiply moduli:\nMOD-10 × MOD-6 = ?",
          hint: "10 × 6",
          answer: 60,
          tolerance: 0,
          unit: "MOD-",
          calcType: "numeric",
          explanation: "10 × 6 = MOD-60 — the seconds (and minutes) counter of every digital clock: the units digit cycles 0–9 (MOD-10), and its rollover clocks the tens digit through 0–5 (MOD-6). Cascading multiplies because the second stage advances once per full cycle of the first.",
          xpReward: 35
        },
        {
          id: "q-dl8-017",
          type: "truefalse",
          question: "A truncated MOD-6 counter built from 3 flip-flops visits states 0 through 5 and skips states 6 and 7 entirely (except the transient reset glitch at 6).",
          answer: 0,
          explanation: "True. MOD-6 from 2³ = 8: decode state 6 (110₂ → NAND(Q₂, Q₁)) → CLR̅. The stable sequence is 000→001→010→011→100→101→(110 glitch)→000; state 7 (111) is never reached at all. Six stable states from three flip-flops — the BCD-hours pattern in clocks.",
          xpReward: 25
        },
        {
          id: "q-dl8-018",
          type: "match",
          question: "Match each counter requirement to its design.",
          pairs: [
            { term: "MOD-10 (decade)",   definition: "4 FFs, decode 1010 with NAND(Q₃, Q₁) → CLR̅" },
            { term: "MOD-6",             definition: "3 FFs, decode 110 with NAND(Q₂, Q₁) → CLR̅" },
            { term: "MOD-60",            definition: "Cascade MOD-10 × MOD-6" },
            { term: "MOD-16",            definition: "4 FFs, natural count — no truncation needed" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Four canonical designs. Powers of two need no truncation; anything else gets the decode-and-clear treatment; larger moduli come from cascading (multiply the stages' moduli). Together these build the complete digital clock: MOD-10 & MOD-6 for seconds/minutes, MOD-12 or MOD-24 for hours.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 4 — Synchronous Counter Design ───────────────── */
    {
      id: "dl8-design",
      title: "Synchronous Counter Design",
      subtitle: "State diagram → next-state table → excitation table → K-maps → J/K equations → circuit",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "Any state sequence — up, down, or arbitrary — can be implemented synchronously with the 6-step recipe: " +
          "<strong>(1)</strong> draw the state diagram, <strong>(2)</strong> build the next-state table (present → next), " +
          "<strong>(3)</strong> use the flip-flop <strong>excitation table</strong> to find what J/K (or D or T) inputs force each " +
          "transition, <strong>(4)</strong> K-map each input as a function of the present state, <strong>(5)</strong> read off the " +
          "minimal input equations, <strong>(6)</strong> draw the circuit. The JK excitation table is the key tool: each " +
          "transition needs only one input pinned, the other is don't-care (X) — those don't-cares make JK designs minimal.",
        formula: "JK excitation: 0→0: J=0,K=X · 0→1: J=1,K=X · 1→0: J=X,K=1 · 1→1: J=X,K=0",
        bullets: [
          "Step 1 — state diagram: bubbles = states, arrows = transitions per clock pulse",
          "Step 2 — next-state table: every present state paired with its successor",
          "Step 3 — excitation table per flip-flop: which inputs produce the needed Q-transition",
          "JK excitation: 0→0 (J=0, K=X) · 0→1 (J=1, K=X) · 1→0 (J=X, K=1) · 1→1 (J=X, K=0)",
          "D excitation is trivial: D = next Q (no don't-cares — simpler table, usually more gates)",
          "T excitation: T = 1 when Q changes, 0 when it holds",
          "Step 4–5 — K-map each J/K input over the present-state variables; X's help minimise",
          "Step 6 — draw: gates from the equations + one shared clock to every FF",
          "The method handles ANY sequence: down-counters, Gray-code counters, arbitrary state machines"
        ],
        analogy: "Choreographing a dance instead of a conga line. The ripple counter is a conga line — each dancer follows the one ahead, no plan needed but sloppy timing. Synchronous design writes explicit choreography: the state diagram is the routine, the next-state table lists every dancer's next position, and the excitation table converts positions into instructions each dancer needs BEFORE the beat (J/K inputs). On each beat (clock), everyone moves at once, exactly as scripted."
      },
      workedExample: {
        problem: "Design a 2-bit synchronous UP counter (00→01→10→11→00) with JK flip-flops using the 6-step method.",
        steps: [
          "<strong>State diagram & next-state table:</strong> 00→01, 01→10, 10→11, 11→00 (present Q₁Q₀ → next Q₁Q₀)",
          "<strong>Excitation for FF₀:</strong> Q₀ goes 0→1, 1→0, 0→1, 1→0 → rows: (J₀=1,K₀=X), (J₀=X,K₀=1), (J₀=1,K₀=X), (J₀=X,K₀=1)",
          "<strong>Excitation for FF₁:</strong> Q₁ goes 0→0, 0→1, 1→1, 1→0 → rows: (J₁=0,K₁=X), (J₁=1,K₁=X), (J₁=X,K₁=0), (J₁=X,K₁=1)",
          "<strong>K-maps:</strong> J₀: 1s and Xs everywhere → J₀ = 1; K₀ = 1 likewise. J₁: 1 at Q₀=1 (X's absorb the rest) → J₁ = Q₀; K₁ = Q₀ the same way",
          "<strong>Equations:</strong> J₀ = K₀ = 1 · J₁ = K₁ = Q₀ — matching the known up-counter pattern ✓",
          "<strong>Circuit:</strong> two JK FFs, shared clock, Q₀ wired to J₁ and K₁ — design recovered from first principles"
        ],
        note: "The same 6 steps handle down-counters (11→10→01→00: J₁=K₁=Q̄₀) and arbitrary sequences — only the next-state table changes. Exam papers ask for 2- and 3-bit versions with JK, D, or T flip-flops."
      },
      quiz: [
        {
          id: "q-dl8-019",
          type: "mcq",
          question: "Put the synchronous counter design steps in the correct order:",
          options: [
            "Circuit → K-maps → state diagram → excitation table",
            "State diagram → next-state table → excitation table → K-maps → input equations → circuit",
            "Excitation table → state diagram → circuit → K-maps",
            "Next-state table → circuit → state diagram → equations"
          ],
          answer: 1,
          explanation: "Diagram → next-state table → excitation table → K-maps → equations → circuit. Each step feeds the next: you can't derive excitations without knowing the transitions, and can't map inputs without excitations. Exam design questions are marked step-by-step — show all six.",
          xpReward: 25
        },
        {
          id: "q-dl8-020",
          type: "mcq",
          question: "Per the JK excitation table, forcing a flip-flop transition from Q=0 to Q=1 requires:",
          options: [
            "J=1, K=1",
            "J=1, K=X (don't care)",
            "J=0, K=1",
            "J=X, K=0"
          ],
          answer: 1,
          explanation: "J=1, K=X. With Q=0: J=1,K=0 sets (0→1 ✓) and J=1,K=1 toggles (0→1 ✓) — K's value doesn't matter, hence don't-care. The four excitation rows (0→0: 0,X · 0→1: 1,X · 1→0: X,1 · 1→1: X,0) are THE tool of synchronous design; the generous X's are why JK implementations minimise so well.",
          xpReward: 25
        },
        {
          id: "q-dl8-021",
          type: "mcq",
          question: "When designing the same counter with D flip-flops instead of JK, the excitation logic is:",
          options: [
            "Identical to the JK case",
            "Simply D = next-state Q — trivial to derive, but with no don't-cares the gate logic is often larger",
            "Impossible — D flip-flops cannot build counters",
            "D = present-state Q"
          ],
          answer: 1,
          explanation: "D = Q(next): the D input IS the next state, so the excitation table writes itself. The cost: no don't-care entries, so K-maps minimise less and the combinational logic is typically bigger than the JK equivalent. The JK-vs-D design trade-off (easy derivation vs minimal gates) is a standard discussion question.",
          xpReward: 25
        },
        {
          id: "q-dl8-022",
          type: "mcq",
          question: "For a 2-bit synchronous DOWN counter (11→10→01→00→11…), the FF₁ input equations are:",
          options: [
            "J₁ = K₁ = Q₀ — same as the up counter",
            "J₁ = K₁ = Q̄₀ — the MSB toggles when Q₀ = 0",
            "J₁ = 1, K₁ = 0 permanently",
            "J₁ = K₁ = 0 permanently"
          ],
          answer: 1,
          explanation: "J₁ = K₁ = Q̄₀. Counting down, the MSB flips on borrows: 00→11 and 10→01 — exactly the transitions where Q₀ = 0. (Up-counters toggle on carries, when lower bits are all 1; down-counters on borrows, when lower bits are all 0.) Run the 6 steps on the down sequence and the K-maps deliver this automatically.",
          xpReward: 25
        },
        {
          id: "q-dl8-023",
          type: "truefalse",
          question: "The 6-step synchronous design method works only for straight binary up-count sequences.",
          answer: 1,
          explanation: "False — it handles ANY state sequence: down-counters, up/down, Gray-code, BCD, or completely arbitrary orders (e.g. 0→2→5→1→0). Only the next-state table changes; excitation tables, K-maps and equations follow mechanically. That generality is the method's whole point — it is really finite-state-machine design.",
          xpReward: 25
        },
        {
          id: "q-dl8-024",
          type: "fillblank",
          question: "In excitation tables, the symbol X marks a ______ condition — the input's value doesn't affect the required transition and can be chosen freely during K-map minimisation.",
          answer: "don't care",
          explanation: "Don't-care. Each JK transition pins only one input; the other is X and the K-map may treat it as 0 or 1, whichever groups better — the reason JK designs come out minimal. Exploiting X's correctly is where design-question marks are won or lost.",
          xpReward: 25
        }
      ]
    }
  ]
};
