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
      workedExample: [
        {
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
        {
          title: "WORKED EXAMPLE — Full Design: MOD-6 Asynchronous Up-Counter (negative-edge JK, with PRE̅/CLR̅)",
          problem: "Design and draw a complete MOD-6 count-up asynchronous counter using negative-edge-triggered JK flip-flops with asynchronous PRE̅/CLR̅ inputs. Then determine the waveform for 10 clock cycles.",
          steps: [
            "<strong>Step 1 — size the counter:</strong> need 2ⁿ⁻¹ < 6 ≤ 2ⁿ → 2² = 4 < 6 ≤ 8 = 2³ → <strong>3 flip-flops</strong> (FF0, FF1, FF2)",
            "<strong>Step 2 — wire as a ripple counter:</strong> CLK → FF0's clock; FF0's Q0 → FF1's clock; FF1's Q1 → FF2's clock (each stage clocked by the previous Q, all negative-edge triggered). All three FFs: J=K=1 (toggle mode, permanently)",
            "<strong>Step 3 — identify the reset state:</strong> M = 6 = 110₂ → Q2=1, Q1=1, Q0=0",
            "<strong>Step 4 — decode only the 1-bits:</strong> NAND(Q2, Q1) — output goes LOW exactly when Q2=1 AND Q1=1, which first happens at state 110 (6)",
            "<strong>Step 5 — wire the decode output to CLR̅:</strong> connect NAND(Q2,Q1) to the CLR̅ pin of ALL THREE flip-flops (PRE̅ idles HIGH throughout — never asserted in normal counting)",
            "<strong>Step 6 — waveform for 10 cycles:</strong> 000,001,010,011,100,101,(110 glitch→clear)000,001,010,011,100 — the counter completes ONE full 0–5 cycle (6 pulses) then starts a second cycle for the remaining 4 pulses, ending at count 4 (100) after the 10th pulse"
          ],
          note: "'Design and draw' questions want ALL SIX steps shown explicitly — sizing, ripple wiring with all J=K=1, the target state in binary, which bits get decoded (and why only those), and the CLR̅ connection. The waveform question that usually follows tests whether you can keep counting correctly across the RESET boundary (cycle 2 restarts unless the question says otherwise)."
        }
      ],
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
        },
        {
          id: "q-dl8-025",
          type: "calc",
          question: "Design a MODULUS-5 count-up asynchronous counter using JK flip-flops. How many flip-flops are the minimum required?",
          setup: "Need 2ⁿ⁻¹ < 5 ≤ 2ⁿ\n2¹=2 (too small) · 2²=4 (too small) · 2³=8 ✓",
          hint: "5 is not a clean power of 2 — find the smallest n with 2ⁿ ≥ 5",
          answer: 3,
          tolerance: 0,
          unit: "FFs",
          calcType: "numeric",
          explanation: "3 flip-flops (2² = 4 < 5, so 2 FFs are NOT enough; 2³ = 8 ≥ 5 ✓). MOD-5 is a favourite exam modulus precisely because it's odd and doesn't divide evenly into a power of 2 — it tests whether you apply the sizing rule correctly rather than just memorising MOD-10/MOD-6 by rote.",
          xpReward: 35
        },
        {
          id: "q-dl8-026",
          type: "mcq",
          question: "For the MOD-5 counter (3 flip-flops), which state must the NAND gate decode to force the asynchronous clear, and which Q outputs does it need?",
          options: [
            "State 4 (100₂) — decode Q2 only",
            "State 5 (101₂) — decode Q2 AND Q0 (the two bits that are 1 in 101)",
            "State 5 (101₂) — decode all three outputs Q2, Q1, Q0",
            "State 4 (100₂) — decode Q2 and Q1"
          ],
          answer: 1,
          explanation: "State 5 = 101₂ → decode Q2 and Q0 (the bits that are 1), giving NAND(Q2, Q0) → CLR̅. The counter then visits states 0,1,2,3,4 (five states, MOD-5 ✓) before touching 101 momentarily and clearing back to 000. Same recipe every time: decode the TARGET modulus value's 1-bits only, never all bits, never the value one below the target.",
          xpReward: 25
        },
        {
          id: "q-dl8-027",
          type: "calc",
          question: "A MOD-5 asynchronous up-counter (3-bit, JK, negative-edge) starts at 000. After 6 clock cycles, what decimal count value does it show (remember it recycles after reaching state 5)?",
          setup: "MOD-5 visits states 0,1,2,3,4 then recycles to 0\nPulse: 1→1, 2→2, 3→3, 4→4, 5→(touches 5, clears)→0, 6→1",
          hint: "After 5 pulses it's back at 0 (having touched and cleared from state 5); pulse 6 advances it once more",
          answer: 1,
          tolerance: 0,
          unit: "count",
          calcType: "numeric",
          explanation: "After 6 pulses the count is 1. Trace: pulse1→1, pulse2→2, pulse3→3, pulse4→4, pulse5→touches 5(101), NAND fires, clears to 0, pulse6→1. Waveform questions like 'draw the output for N cycles' require exactly this pulse-by-pulse trace, remembering the counter restarts its cycle every 5 pulses (not 8, even though 3 bits could reach 8).",
          xpReward: 35
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
      workedExample: [
        {
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
        {
          title: "WORKED EXAMPLE — REVERSE Direction: Given a Circuit, Derive Equations → Table → State Diagram",
          problem: "A 2-bit synchronous circuit is given (NOT a state diagram) with two JK flip-flops Q1 (MSB), Q0 (LSB), sharing one clock. Reading the gates: J1 is wired directly to Q0; K1 is wired to the output of an inverter on Q0 (so K1 = Q̄0); J0 is wired to the output of an inverter on Q1 (so J0 = Q̄1); K0 is wired directly to Q1. An XOR gate combines Q1 and Q0 to form output Y. Derive all equations, build the next-state table, and draw the state diagram.",
          steps: [
            "<strong>Step 1 — read the circuit, write every equation:</strong> J1 = Q0 · K1 = Q̄0 · J0 = Q̄1 · K0 = Q1 · Y = Q1 ⊕ Q0. (This is the REVERSE of normal design — the gates already exist; your job is to name what they compute.)",
            "<strong>Step 2 — evaluate at state Q1Q0=00:</strong> J1=Q0=0, K1=Q̄0=1 → FF1: J=0,K=1 = Reset → Q1_next=0. J0=Q̄1=1, K0=Q1=0 → FF0: J=1,K=0 = Set → Q0_next=1. <strong>Next state: 01.</strong> Y=0⊕0=0.",
            "<strong>Step 3 — state Q1Q0=01:</strong> J1=Q0=1,K1=Q̄0=0 → Set → Q1_next=1. J0=Q̄1=1,K0=Q1=0 → Set → Q0_next=1. <strong>Next state: 11.</strong> Y=0⊕1=1.",
            "<strong>Step 4 — state Q1Q0=11:</strong> J1=Q0=1,K1=Q̄0=0 → Set → Q1_next=1. J0=Q̄1=0,K0=Q1=1 → Reset → Q0_next=0. <strong>Next state: 10.</strong> Y=1⊕1=0.",
            "<strong>Step 5 — state Q1Q0=10:</strong> J1=Q0=0,K1=Q̄0=1 → Reset → Q1_next=0. J0=Q̄1=0,K0=Q1=1 → Reset → Q0_next=0. <strong>Next state: 00.</strong> Y=1⊕0=1.",
            "<strong>Step 6 — state diagram:</strong> 00→01→11→10→00 — this is a <strong>2-bit GRAY CODE counter</strong> (only one bit changes per transition), NOT the plain binary up-counter (00→01→10→11) — reverse-engineering the circuit revealed a completely different, non-obvious count sequence"
          ],
          note: "This is exactly the skill tested when an exam gives you a circuit diagram instead of a state diagram (worth up to 20 marks): derive every gate's equation FIRST, then mechanically evaluate all four present states one at a time using THOSE equations — never assume it's a plain binary counter until you've actually checked. Many circuits (like this one) implement Gray code, non-binary, or partially-unused sequences."
        }
      ],
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
        },
        {
          id: "q-dl8-028",
          type: "mcq",
          question: "An exam gives you a circuit diagram (not a state diagram) with flip-flops and gates already drawn, and asks you to derive the Boolean expressions and produce the next-state table. What is the FIRST step?",
          options: [
            "Assume it's a standard binary up-counter and write the known equations from memory",
            "Trace each gate in the circuit to identify exactly which signals feed each flip-flop's J/K (or D) inputs, writing the Boolean equation for each",
            "Build the K-maps before looking at the circuit",
            "Guess the state sequence and work backwards"
          ],
          answer: 1,
          explanation: "Read the circuit first, always. This is the REVERSE of state-diagram-driven design: the gates already exist, so your job is to correctly name what each one computes (e.g. 'this AND gate's inputs are Q1 and Q̄0, so J1 = Q1·Q̄0'). Only after every input equation is written do you evaluate the present states to build the next-state table — assuming a standard binary pattern without checking is the single biggest source of lost marks on this question type, since many exam circuits deliberately implement Gray-code or non-binary sequences.",
          xpReward: 25
        },
        {
          id: "q-dl8-029",
          type: "calc",
          question: "Reverse-engineering a circuit, you determine J1 = Q0 and K1 = Q̄0 for flip-flop FF1. At present state Q1=1, Q0=0, what is Q1's NEXT value?",
          setup: "J1 = Q0 = 0\nK1 = Q̄0 = 1\nJK rule: J=0, K=1 → Reset",
          hint: "J=0,K=1 forces which JK action?",
          answer: 0,
          tolerance: 0,
          unit: "Q1_next =",
          calcType: "numeric",
          explanation: "Q1_next = 0 (Reset fires since J1=0,K1=1). Once the equations are correctly derived from the circuit, EVERY subsequent step is just ordinary JK-rule evaluation, present state by present state — the hard part is Step 1 (reading the gates correctly), not the JK arithmetic itself.",
          xpReward: 35
        },
        {
          id: "q-dl8-030",
          type: "calc",
          question: "A cascaded counter is built from a MOD-4 counter feeding a MOD-4 counter (overall MOD-16). If the input clock frequency is 8 GHz, what is the output frequency in MHz?",
          setup: "Overall modulus = MOD-4 × MOD-4 = MOD-16\nOutput frequency = input frequency ÷ overall modulus\nf_out = 8 GHz / 16 = 8000 MHz / 16",
          hint: "8000 MHz ÷ 16",
          answer: 500,
          tolerance: 5,
          unit: "MHz",
          calcType: "numeric",
          explanation: "8000 MHz / 16 = 500 MHz. Cascading counters multiplies their MODULI (MOD-4 × MOD-4 = MOD-16), and each stage of a counter is fundamentally a frequency divider — the FINAL output completes one cycle only once per 16 input pulses, so its frequency is the input frequency divided by the overall modulus. This 'modulus multiplies, frequency divides by that same product' pairing is a guaranteed exam calculation.",
          xpReward: 35
        },
        {
          id: "q-dl8-031",
          type: "truefalse",
          question: "When reverse-engineering a synchronous counter from a given circuit, the resulting state sequence is always the standard binary up-count (000, 001, 010, …).",
          answer: 1,
          explanation: "False. The circuit's gates could implement ANY sequence the designer chose — Gray code, down-counting, an arbitrary or partially-unused sequence, or a standard binary count. You cannot know which until you derive the equations and actually evaluate every present state. This is precisely why exams test this skill: it proves you can read logic rather than pattern-match to memorised sequences.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 5 — Shift Registers, Ring & Johnson Counters ───────────────── */
    {
      id: "dl8-shift-registers",
      title: "Shift Registers, Ring & Johnson Counters",
      subtitle: "SISO/SIPO/PISO/PIPO · Universal bidirectional register · Ring counter (N states) · Johnson counter (2N states)",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "A <strong>shift register</strong> is a chain of D flip-flops sharing ONE common clock, where each stage's output " +
          "feeds the next stage's input — data shifts one position per clock pulse. Four data-transfer modes exist depending on " +
          "how data enters/leaves: <strong>SISO</strong> (Serial-In Serial-Out), <strong>SIPO</strong> (Serial-In Parallel-Out), " +
          "<strong>PISO</strong> (Parallel-In Serial-Out), and <strong>PIPO</strong> (Parallel-In Parallel-Out). A " +
          "<strong>universal bidirectional shift register</strong> combines all four: it has serial inputs (often labelled J/K " +
          "or simply 'serial in'), parallel data inputs D<sub>i</sub>, parallel outputs Q<sub>i</sub>, and a MODE CONTROL line " +
          "selecting shift-left / shift-right / parallel-load / hold. Wiring a shift register's LAST output back to its FIRST " +
          "input creates two special-purpose counters: the <strong>ring counter</strong> (feeds Q<sub>last</sub> straight back — " +
          "a single 1 circulates, giving exactly <strong>N valid states</strong> for N stages) and the <strong>Johnson " +
          "(twisted-ring) counter</strong> (feeds Q̄<sub>last</sub> back inverted — giving <strong>2N valid states</strong>).",
        formula: "Ring counter: N stages → N valid states   ·   Johnson counter: N stages → 2N valid states   ·   shift register: ALL stages share ONE common clock (not ripple)",
        bullets: [
          "SISO: data enters serially (1 bit/clock) and exits serially — used for simple time delays",
          "SIPO: data enters serially, all bits become available in parallel once fully shifted in — 'serial-to-parallel converter'",
          "PISO: data is loaded in parallel (all bits at once) then shifted out serially, 1 bit per clock — 'parallel-to-serial converter'",
          "PIPO: data loads in parallel and reads out in parallel — effectively a parallel storage register (no shifting needed)",
          "Universal bidirectional register: mode-control line selects shift-right, shift-left, parallel-load, or hold — one chip, all four transfer types",
          "CRITICAL: shift registers use a COMMON shared clock to every stage — NOT a ripple/chained clock like an asynchronous counter",
          "An N-bit shift register needs N clock pulses to fully shift NEW serial data all the way through the register",
          "Ring counter: connect Q(last) → D(first) directly. Starting with a single 1 preset (e.g. 1000), the 1 circulates: 1000→0100→0010→0001→1000… — exactly N unique states",
          "Johnson counter: connect Q̄(last) → D(first) (inverted feedback). Starting from all-0s, the register fills with 1s then empties with 0s: 000→100→110→111→011→001→000 (for 3 bits) — exactly 2N unique states",
          "Both ring and Johnson counters need MORE flip-flops than a binary counter for the same number of states, but decode each state with just ONE gate (or none) instead of a multi-input NAND — a speed/simplicity trade for extra hardware"
        ],
        analogy: "A bucket-brigade line passing water buckets hand to hand — but everyone passes on the SAME whistle blow (common clock), unlike a ripple counter's staggered domino chain. A ring counter is this bucket line bent into a circle: one 'full' bucket (the single 1) endlessly circulates the loop, lighting up a new position each whistle — perfect for 'which station's turn is it?' sequencing (traffic lights, LED chasers). A Johnson counter is the same circular line, but every bucket handed to the START is secretly INVERTED (empty becomes full, full becomes empty) — so the circle takes twice as long to repeat, doubling the usable states for the same number of buckets."
      },
      workedExample: [
        {
          title: "WORKED EXAMPLE — Universal Bidirectional Shift Register: Reading the Mode & Tracing a Shift",
          problem: "A 4-bit universal bidirectional shift register holds Q3Q2Q1Q0 = 0011 (decimal 3). Its mode control is set to SHIFT-RIGHT, and the serial input line is HIGH (1). Determine the register's contents after one clock pulse, and identify which basic data-transfer operation this represents.",
          steps: [
            "<strong>Read the mode:</strong> mode control = shift-right → on each clock pulse, every bit moves one position toward Q0, Q0 falls out (or is captured as serial output), and the serial input fills the vacated Q3 position",
            "<strong>Present state:</strong> Q3Q2Q1Q0 = 0011",
            "<strong>Apply the shift:</strong> new Q3 = serial input = 1 · new Q2 = old Q3 = 0 · new Q1 = old Q2 = 0 · new Q0 = old Q1 = 1 (old Q0 = 1 shifts out as the serial output bit)",
            "<strong>Result:</strong> Q3Q2Q1Q0 = <strong>1001</strong> (decimal 9) — the register shifted right by one position, serial-in on the left, serial-out on the right",
            "<strong>Classify the operation:</strong> since we are reading individual bits IN serially (one at a time) and the register's contents are read out in PARALLEL (all 4 Qᵢ available simultaneously) — this single shift is part of an overall <strong>SIPO (Serial-In, Parallel-Out)</strong> operation"
          ],
          note: "The four basic data-transfer operations a shift register performs are exactly: serial-in→serial-out, serial-in→parallel-out, parallel-in→serial-out, parallel-in→parallel-out. Any exam question describing 'data enters one bit at a time' = serial; 'all bits available/loaded at once' = parallel — classify input and output independently."
        },
        {
          title: "WORKED EXAMPLE — Ring Counter vs Johnson Counter: Truth Table & Valid States (3-bit)",
          problem: "Build the complete output truth table for a 3-bit ring counter AND a 3-bit Johnson counter, both starting from an initial preset state, across enough clock cycles to see the full repeating pattern. State how many valid states each produces.",
          steps: [
            "<strong>Ring counter — preset to 100 (a single 1 in the MSB):</strong> feedback wire is Q(last)→D(first) directly (no inversion)",
            "<strong>Ring counter sequence:</strong> Clock0: 100 · Clock1: 010 · Clock2: 001 · Clock3: 100 (repeats) — the single 1 slides right one position per clock and wraps around unchanged",
            "<strong>Ring counter valid states: exactly <u>3</u></strong> (equal to the number of flip-flops, N=3) — each state has exactly one bit HIGH",
            "<strong>Johnson counter — preset to 000:</strong> feedback wire is Q̄(last)→D(first) — the LAST stage's output is INVERTED before feeding back to the first stage",
            "<strong>Johnson counter sequence:</strong> Clock0: 000 · Clock1: 100 · Clock2: 110 · Clock3: 111 · Clock4: 011 · Clock5: 001 · Clock6: 000 (repeats)",
            "<strong>Johnson counter valid states: exactly <u>6</u></strong> (equal to 2N = 2×3) — the register fills up with 1s left-to-right, then empties with 0s left-to-right"
          ],
          note: "Ring counter states are all 'one-hot' (single 1, rest 0s) — easy to decode (each state needs only ONE wire tapped, no gate at all) but wasteful (N flip-flops for only N states, same as a one-hot encoded counter). Johnson counter roughly doubles the states for the same flip-flop count, but decoding a specific state needs a small 2-input gate rather than a single wire tap."
        }
      ],
      quiz: [
        {
          id: "q-dl8-032",
          type: "match",
          question: "Match each shift register data-transfer mode to its input/output behaviour.",
          pairs: [
            { term: "SISO",  definition: "Serial-In, Serial-Out — data enters and exits one bit at a time" },
            { term: "SIPO",  definition: "Serial-In, Parallel-Out — data enters bit-by-bit, read out all at once" },
            { term: "PISO",  definition: "Parallel-In, Serial-Out — data loaded all at once, shifted out bit-by-bit" },
            { term: "PIPO",  definition: "Parallel-In, Parallel-Out — data loaded and read out all at once (no shifting)" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The four basic shift-register data-transfer operations — classify INPUT and OUTPUT independently as serial or parallel and you get exactly one of these four modes. SIPO is the classic 'serial-to-parallel converter' (e.g. receiving serial data from a communication link and presenting it as a parallel byte); PISO is the reverse ('parallel-to-serial', used to transmit a parallel byte out over a single serial wire).",
          xpReward: 25
        },
        {
          id: "q-dl8-033",
          type: "truefalse",
          question: "All types of shift registers (SISO, SIPO, PISO, PIPO) operate based on a ripple clock, where each stage is clocked by the previous stage's output.",
          answer: 1,
          explanation: "False. Shift registers use a SINGLE COMMON clock connected to every stage simultaneously — not a ripple/chained clock. This is a critical distinction from asynchronous ripple counters: because every flip-flop in a shift register sees the same clock edge at the same instant, ALL bits shift together in one synchronized step, with no ripple delay. This exact statement is a verbatim final-exam True/False trap.",
          xpReward: 25
        },
        {
          id: "q-dl8-034",
          type: "calc",
          question: "A 4-bit serial-in shift register is completely empty (0000) and new serial data begins arriving one bit per clock pulse. How many clock pulses are needed before all 4 new bits have fully entered the register?",
          setup: "Register length = 4 bits\nEach clock pulse shifts data in by exactly one position",
          hint: "One new bit enters per pulse — how many pulses to fill all 4 positions?",
          answer: 4,
          tolerance: 0,
          unit: "clock pulses",
          calcType: "numeric",
          explanation: "4 clock pulses — an N-bit shift register needs exactly N clock pulses to fully load N bits of new serial data (one bit enters per pulse, and the first bit that entered has moved all the way to the far end by pulse N). This N-pulses-per-N-bits relationship is the basis for calculating 'when is the data ready' in any SISO or SIPO timing-diagram question.",
          xpReward: 35
        },
        {
          id: "q-dl8-035",
          type: "mcq",
          question: "A shift register's MODE CONTROL line (often labelled SHIFT/LOAD̄) is set LOW. What operation does the register perform on the next clock edge?",
          options: [
            "It shifts all bits one position to the right, as in normal shift mode",
            "It performs a PARALLEL LOAD — the parallel data inputs Dᵢ are captured directly into the corresponding Qᵢ outputs, bypassing the shift path entirely",
            "It holds its current value with no change",
            "It clears all outputs to 0"
          ],
          answer: 1,
          explanation: "Parallel load. The active-LOW naming (SHIFT/LOAD̄) tells you the default HIGH state selects SHIFT, and pulling the line LOW selects the complementary operation: LOAD (parallel). On that clock edge, each Qᵢ ← Dᵢ directly — the register ignores its own previous contents and the serial input entirely, loading fresh parallel data in one step. Reading mode-control naming conventions (active-HIGH vs active-LOW function names) is essential for logic-symbol interpretation questions.",
          xpReward: 25
        },
        {
          id: "q-dl8-036",
          type: "calc",
          question: "A 4-bit ring counter is preset to 1000 (single 1 in the MSB position, feedback wired directly Q3→D0 with no inversion). What is the register's content after exactly 4 clock pulses?",
          setup: "Ring counter: the single 1 shifts one position per clock and wraps around\nClock0: 1000 · Clock1: ? · Clock2: ? · Clock3: ? · Clock4: ?",
          hint: "A ring counter returns to its starting state after exactly N clock pulses (N=4 here)",
          answer: 1000,
          tolerance: 0,
          unit: "(binary pattern)",
          calcType: "numeric",
          explanation: "1000 — after exactly N=4 clock pulses, a ring counter always returns to its starting state (the single 1 has circulated all the way around: 1000→0100→0010→0001→1000). This 'returns home after N pulses' property is exactly why a ring counter has N valid states — it's a direct N-state cycle, one state per flip-flop.",
          xpReward: 35
        },
        {
          id: "q-dl8-037",
          type: "calc",
          question: "How many valid (unique) states does a 3-bit RING counter produce, and how many does a 3-bit JOHNSON counter produce? Enter your answer as the SUM of both counts (ring states + Johnson states).",
          setup: "Ring counter: N valid states\nJohnson counter: 2N valid states\nN = 3",
          hint: "Ring: 3 states. Johnson: 2×3 = 6 states. Sum = ?",
          answer: 9,
          tolerance: 0,
          unit: "combined total",
          calcType: "numeric",
          explanation: "3 + 6 = 9. A 3-bit ring counter produces N=3 valid (one-hot) states; a 3-bit Johnson counter produces 2N=6 valid states (fill-then-empty pattern). This N-vs-2N relationship, for the SAME number of flip-flops, is the single most commonly tested fact distinguishing these two counter types — Johnson always doubles the ring counter's state count.",
          xpReward: 35
        },
        {
          id: "q-dl8-038",
          type: "mcq",
          question: "What is the key structural difference between a ring counter and a Johnson (twisted-ring) counter?",
          options: [
            "The ring counter uses D flip-flops while the Johnson counter uses JK flip-flops",
            "The ring counter feeds the last stage's output directly back to the first stage; the Johnson counter feeds back the COMPLEMENT (inverted) of the last stage's output",
            "The Johnson counter has no feedback at all",
            "The ring counter requires twice as many flip-flops as the Johnson counter for the same state count"
          ],
          answer: 1,
          explanation: "Direct feedback (ring) vs inverted feedback (Johnson) — that single inversion is the ENTIRE structural difference, yet it doubles the number of valid states (N → 2N). Both counters are otherwise identical: a chain of flip-flops sharing one clock, with the last stage's signal routed back to the first. Ring counters need direct wire; Johnson counters need one extra inverter on that feedback path.",
          xpReward: 25
        },
        {
          id: "q-dl8-039",
          type: "calc",
          question: "A 3-bit Johnson counter starts at 000 with feedback Q̄(last)→D(first). What is the register's content after exactly 2 clock pulses?",
          setup: "Johnson sequence (3-bit): 000 → 100 → 110 → 111 → 011 → 001 → 000 …\nClock0: 000 · Clock1: 100 · Clock2: ?",
          hint: "Follow the fill pattern two steps from 000",
          answer: 110,
          tolerance: 0,
          unit: "(binary pattern)",
          calcType: "numeric",
          explanation: "110 — after clock 1 the register shows 100 (first 1 enters), after clock 2 it shows 110 (a second 1 enters while the first is still present) — the Johnson counter FILLS UP one bit at a time before it starts emptying. Continuing: 111 (full), then 011, 001, 000 (emptying one bit at a time) — 6 total states for N=3, confirming 2N.",
          xpReward: 35
        },
        {
          id: "q-dl8-040",
          type: "truefalse",
          question: "Decoding a specific state of a ring counter requires only tapping a single wire (one flip-flop's output), with no additional gate needed.",
          answer: 0,
          explanation: "True. Because every valid ring-counter state has EXACTLY ONE bit HIGH (one-hot encoding), that state is already fully identified by whichever single Q output is HIGH — no AND/NAND gate is needed to decode it, unlike a binary counter's NAND-based modulus decoding. This simplicity is the main advantage ring counters offer over binary counters, at the cost of needing more flip-flops for the same number of states.",
          xpReward: 25
        }
      ]
    }
  ]
};
