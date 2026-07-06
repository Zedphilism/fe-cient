/**
 * data/logic-chapter6-data.js
 * Module 6 — Functions of Combinational Logic (SECR1013 Digital Logic)
 * Global: window.dlChapter6Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.dlChapter6Data = {
  id: "logic-chapter6",
  key: "dl6",
  title: "Chapter 6: Functions of Combinational Logic",
  heroTitle: "Functions of Combinational Logic",
  heroDesc: "The standard building blocks every digital system is made of: adders (half/full/parallel), comparators, " +
    "decoders, encoders, multiplexers and demultiplexers. Know each block's truth table, its equations, and when " +
    "to use it — the exam tests all three.",
  statusLabel: "MODULE 6 — COMBINATIONAL FUNCTIONS",
  nextChapter: { label: "Chapter 7: Latches & Flip-Flops", href: "logic-chapter7.html" },
  completeText: "You can trace adders bit-by-bit, build comparators, size decoders, and route data with MUX/DEMUX — the complete combinational toolkit.",

  sections: [

    /* ───────────────── SECTION 1 — Adders ───────────────── */
    {
      id: "dl6-adders",
      title: "Half, Full & Parallel Adders",
      subtitle: "HA: Sum = A⊕B, C = AB · FA adds Cin · Ripple-carry chains · Carry = AB + (A⊕B)Cin",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "The <strong>half adder</strong> adds two bits: Sum = A ⊕ B, Carry = AB — but it has no way to accept an " +
          "incoming carry. The <strong>full adder</strong> fixes that with a third input C<sub>in</sub>: " +
          "Sum = A ⊕ B ⊕ C<sub>in</sub>, C<sub>out</sub> = AB + (A ⊕ B)C<sub>in</sub>. A full adder can be built from " +
          "<em>two half adders plus an OR gate</em>. Chaining n full adders — each C<sub>out</sub> feeding the next " +
          "C<sub>in</sub> — makes an n-bit <strong>parallel (ripple-carry) adder</strong>, the arithmetic core of every ALU.",
        formula: "HA: S = A⊕B, C = AB   ·   FA: S = A⊕B⊕Cin, Cout = AB + (A⊕B)Cin",
        bullets: [
          "Binary addition rules: 0+0=0 · 0+1=1 · 1+0=1 · 1+1=10 (sum 0, carry 1)",
          "Half adder: 2 inputs (A, B) → Sum = A⊕B, Carry = AB — XOR plus AND",
          "Full adder: 3 inputs (A, B, Cin) → handles the carry chain",
          "FA from 2 HAs: HA₁ adds A+B; HA₂ adds that sum to Cin; OR combines the two carries",
          "Parallel adder: n full adders in a chain, Cout(k) → Cin(k+1) — carry 'ripples' left",
          "The LSB stage can be a half adder (no incoming carry) or a FA with Cin = 0",
          "Ripple delay: the MSB result is valid only after the carry has propagated through every stage"
        ],
        analogy: "Column addition by hand. Adding 47 + 38, you add 7+8 = 15: write 5, carry 1 — one column is a full adder (digits plus incoming carry). The rightmost column never receives a carry — that's the half adder. And you cannot write the tens column's answer until the units column's carry arrives: that waiting is exactly ripple-carry delay."
      },
      workedExample: {
        problem: "Add the 4-bit numbers A = 1011 (11) and B = 0110 (6) with a ripple-carry adder, tracing each full adder stage.",
        steps: [
          "<strong>Stage 0 (LSB):</strong> A₀+B₀ = 1+0, Cin = 0 → Sum₀ = 1, C = 0",
          "<strong>Stage 1:</strong> 1+1, Cin = 0 → Sum₁ = 0, C = 1  (1+1 = 10)",
          "<strong>Stage 2:</strong> 0+1, Cin = 1 → Sum₂ = 0, C = 1  (0+1+1 = 10)",
          "<strong>Stage 3 (MSB):</strong> 1+0, Cin = 1 → Sum₃ = 0, C = 1  (1+0+1 = 10)",
          "<strong>Result:</strong> Cout Sum = 1 0001 → <strong>10001₂ = 17</strong> ✓ (11 + 6 = 17)"
        ],
        note: "Trace tables like this are the standard exam format — always show Sum and Carry at every stage, LSB first."
      },
      quiz: [
        {
          id: "q-dl6-001",
          type: "mcq",
          question: "The outputs of a HALF adder for inputs A and B are:",
          options: [
            "Sum = A + B, Carry = A ⊕ B",
            "Sum = A ⊕ B, Carry = AB",
            "Sum = AB, Carry = A ⊕ B",
            "Sum = A ⊕ B ⊕ 1, Carry = A + B"
          ],
          answer: 1,
          explanation: "Sum = A⊕B (1 only when the bits differ) and Carry = AB (1 only for 1+1). Check all four rows: 0+0→00, 0+1→01, 1+0→01, 1+1→10 ✓. One XOR + one AND — the smallest arithmetic circuit that exists.",
          xpReward: 25
        },
        {
          id: "q-dl6-002",
          type: "mcq",
          question: "What distinguishes a FULL adder from a half adder?",
          options: [
            "It adds two full bytes instead of two bits",
            "It has a carry INPUT (Cin), so it can sit in the middle of a multi-bit carry chain",
            "It produces two sum outputs",
            "It uses only NAND gates"
          ],
          answer: 1,
          explanation: "The Cin input. A half adder adds A+B only; a full adder adds A+B+Cin — essential for every column except the rightmost in multi-bit addition, because carries ripple in from the previous stage. Structure: FA = two HAs + an OR gate combining their carries.",
          xpReward: 25
        },
        {
          id: "q-dl6-003",
          type: "calc",
          question: "A full adder receives A = 1, B = 1, Cin = 1. The two-bit output (Cout Sum) written as a decimal number is: (1+1+1 = ?)",
          setup: "A + B + Cin = 1 + 1 + 1\nSum = A⊕B⊕Cin, Cout = AB + (A⊕B)Cin\nAnswer with the decimal total",
          hint: "Three ones added together",
          answer: 3,
          tolerance: 0,
          unit: "total",
          calcType: "numeric",
          explanation: "1+1+1 = 3 = 11₂: Sum = 1⊕1⊕1 = 1 and Cout = (1·1) + (1⊕1)·1 = 1 + 0 = 1. The full adder's output pair (Cout, Sum) always equals the arithmetic count of its HIGH inputs (0–3) in binary — a handy sanity check when tracing.",
          xpReward: 35
        },
        {
          id: "q-dl6-004",
          type: "truefalse",
          question: "A full adder can be constructed from two half adders and an OR gate.",
          answer: 0,
          explanation: "True. HA₁ computes A⊕B and AB; HA₂ adds (A⊕B) to Cin giving Sum = A⊕B⊕Cin and carry (A⊕B)Cin; the OR merges the two carries: Cout = AB + (A⊕B)Cin. The two carries can never be 1 simultaneously, so OR suffices. A standard construction question — draw it until it's automatic.",
          xpReward: 25
        },
        {
          id: "q-dl6-005",
          type: "mcq",
          question: "In a 4-bit ripple-carry parallel adder, why is the MSB sum the LAST output to become valid?",
          options: [
            "The MSB full adder uses slower gates",
            "The carry must propagate stage-by-stage from the LSB — each stage waits on the previous one's Cout",
            "The MSB requires two clock cycles",
            "Binary addition is performed MSB-first"
          ],
          answer: 1,
          explanation: "Carry propagation. Stage k's inputs include C(k−1), which itself depends on C(k−2)… all the way to the LSB. Worst case (e.g. 1111 + 0001) the carry ripples through every stage — total delay ≈ n × one-stage delay. Same reason your tens column waits for the units carry in hand addition; and the motivation for carry-lookahead adders.",
          xpReward: 25
        },
        {
          id: "q-dl6-006",
          type: "calc",
          question: "A 4-bit parallel adder computes 0111 (7) + 0101 (5). What is the decimal value of the 5-bit result (Cout + Sum bits)?",
          setup: "  0111  (7)\n+ 0101  (5)\n———————\nTrace the carries stage by stage, or simply add",
          hint: "7 + 5",
          answer: 12,
          tolerance: 0,
          unit: "=",
          calcType: "numeric",
          explanation: "7 + 5 = 12 = 01100₂. Stage trace: 1+1=10 (S=0,C=1) · 1+0+1=10 (S=0,C=1) · 1+1+1=11 (S=1,C=1) · 0+0+1=1 (S=1,C=0) → Sum = 1100, Cout = 0. Note stage 2's three-ones case producing BOTH sum and carry — the situation only a full adder can handle.",
          xpReward: 35
        },
        {
          id: "q-dl6-023",
          type: "truefalse",
          question: "A full adder is characterized by two inputs and two outputs.",
          answer: 1,
          explanation: "False — a full adder has THREE inputs (A, B, and Cin) and two outputs (Sum, Cout). Confusing it with the half adder (which genuinely has 2 inputs, 2 outputs) is the exact trap: the defining feature added when going from half → full adder is the extra Cin input, so the input count MUST go up to 3. This exact statement is a verbatim final-exam True/False item — memorise '3 in, 2 out' for the full adder.",
          xpReward: 25
        },
        {
          id: "q-dl6-024",
          type: "calc",
          question: "A 4-bit parallel adder has Cin (LSB) = LOW (0). Add A = 1101 and B = 0111. What is the decimal value of the 5-bit result (Cout followed by the 4-bit Sum)?",
          setup: "  1101  (13)\n+ 0111  (7)\nCin (LSB) = 0\n———————",
          hint: "13 + 7 = 20",
          answer: 20,
          tolerance: 0,
          unit: "=",
          calcType: "numeric",
          explanation: "13 + 7 = 20 = 10100₂ (Cout=1, Sum=0100). Stage trace: bit0: 1+1+0=10 (S=0,C=1) · bit1: 0+1+1=10 (S=0,C=1) · bit2: 1+1+1=11 (S=1,C=1) · bit3(MSB): 1+0+1=10 (S=0,C=1) → Sum=0100, Cout=1 → 10100₂=20 ✓. This exact setup (Cin explicitly stated as LOW) appears verbatim in final exams — always start your stage trace from Cin at the LSB.",
          xpReward: 35
        }
      ]
    },

    /* ───────────────── SECTION 1b — Parity Generator/Checker ───────────────── */
    {
      id: "dl6-parity",
      title: "Parity Generators & Checkers",
      subtitle: "XOR tree detects odd/even 1-count · Even parity vs odd parity · Single-bit error detection",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "A <strong>parity bit</strong> is an extra bit added to a data word so the TOTAL number of 1s (data + parity) " +
          "matches a chosen convention — <strong>even parity</strong> (total 1s is even) or <strong>odd parity</strong> " +
          "(total 1s is odd). The generator/checker circuit is simply a tree of <strong>XOR gates</strong>: XOR outputs 1 when " +
          "an ODD number of its inputs are 1, so cascading XORs across all data bits computes the <em>modulo-2 sum</em> — " +
          "exactly the parity of the word. The same XOR-tree circuit is reused at the receiver as a <strong>checker</strong>: " +
          "recompute parity on the received bits and compare to the received parity bit — a mismatch flags a single-bit error.",
        formula: "Modulo-2 sum of 4 bits = ((A⊕B)⊕C)⊕D — needs exactly 3 XOR gates cascaded   ·   even parity: total 1s (data+parity) is even",
        bullets: [
          "XOR of n bits = 1 exactly when an ODD number of those bits are 1 — this IS the modulo-2 sum",
          "Modulo-2 sum of 4 data bits needs exactly <strong>3 cascaded XOR gates</strong> (XOR is 2-input; n bits need n−1 XORs)",
          "Even parity generator: parity bit P = XOR of all data bits (so data+P has an even 1-count)",
          "Odd parity generator: parity bit P = XNOR of all data bits (complement of the even-parity XOR)",
          "Parity CHECKER at the receiver: XOR all received bits (data + parity bit) together",
          "Even-parity checker: output HIGH (error flagged) if the total XOR is 1 (odd) — the check FAILS when the count is odd",
          "Odd-parity checker: output HIGH (error flagged) if the total XOR is 0 (even) — mirror logic",
          "Parity detects any SINGLE-bit flip, but is blind to an even number of simultaneous bit flips (2 flips cancel out)"
        ],
        analogy: "A dinner party headcount rule: 'the total guests (data) plus the host (parity bit) must always be an even number.' If the doorperson (checker) counts everyone at the end and gets an ODD number, someone slipped in or left unnoticed — an error is flagged. But if exactly TWO uninvited guests sneak in together, the total is still even and the doorperson notices nothing — parity catches single intruders, not pairs."
      },
      workedExample: {
        problem: "A sender wants EVEN parity and transmits the 8-bit data 1010 1101 with an added parity bit. Determine the parity bit, and show how the receiver's XOR-tree checker verifies it.",
        steps: [
          "<strong>Count the 1s in 1010 1101:</strong> bits are 1,0,1,0,1,1,0,1 → five 1s (odd count)",
          "<strong>Even parity rule:</strong> total 1s (data + parity bit) must be EVEN. Data already has 5 (odd) → parity bit must add 1 more to make it even: <strong>P = 1</strong>",
          "<strong>Transmitted word:</strong> 1010 1101 <strong>1</strong> (9 bits total, six 1s — even ✓)",
          "<strong>Generator circuit:</strong> XOR all 8 data bits together (7 cascaded XOR gates for 8 bits) — the output IS the parity bit P=1",
          "<strong>Receiver check:</strong> XOR all 9 received bits (data + P) together. If no error occurred, the result is 0 (even count) → check PASSES. If any single bit flipped in transit, the XOR result becomes 1 → error FLAGGED"
        ],
        note: "Marks are awarded for showing the running XOR chain bit-by-bit, not just the final parity value — draw the cascade explicitly in your answer."
      },
      quiz: [
        {
          id: "q-dl6-025",
          type: "truefalse",
          question: "The modulo-2 sum of four bits can be formed by three exclusive-OR gates connected in a cascade.",
          answer: 0,
          explanation: "True. XOR is a 2-input gate, so combining 4 bits needs 3 XORs: ((A⊕B)⊕C)⊕D — each XOR reduces the bit count by one, and 4 bits need 3 reduction steps. This exact statement is a verbatim final-exam True/False item. General rule: n bits need (n−1) cascaded XOR gates for the modulo-2 sum.",
          xpReward: 25
        },
        {
          id: "q-dl6-026",
          type: "truefalse",
          question: "For a parity checker using EVEN parity, when the number of 1s on the inputs (data + parity bit) is even, the output X is HIGH (indicating an error).",
          answer: 1,
          explanation: "False. For even parity, an EVEN 1-count is the CORRECT, expected condition — no error, so the checker output should be LOW. The checker's error flag (X = HIGH) fires when the count is ODD, since that means the even-parity convention has been violated. This exact statement (with the polarity reversed) is a verbatim final-exam trap — always match 'even parity' with 'even = OK, odd = error'.",
          xpReward: 25
        },
        {
          id: "q-dl6-027",
          type: "calc",
          question: "Using ODD parity, how many 1s must the transmitted data 1100 have plus its parity bit (data bits + P), in total?",
          setup: "Data 1100 has two 1s (even count)\nOdd parity requires: total 1s (data + P) must be ODD",
          hint: "Data already has an even count — what parity bit flips the total to odd?",
          answer: 3,
          tolerance: 0,
          unit: "total 1s",
          calcType: "numeric",
          explanation: "Data 1100 has two 1s (even). For odd parity the TOTAL (data + P) must be odd, so P = 1 is added, giving 2 + 1 = 3 total 1s (odd ✓). If the data already had an odd count, P would be 0 to keep the total odd. Odd-parity generator logic: P = XNOR of all data bits (the complement of the even-parity XOR).",
          xpReward: 35
        },
        {
          id: "q-dl6-028",
          type: "mcq",
          question: "A parity scheme can reliably detect:",
          options: [
            "Any number of simultaneous bit errors",
            "A single-bit error only — an even number of simultaneous flips cancels out and goes undetected",
            "Only errors in the most significant bit",
            "Errors only if the parity bit itself is corrupted"
          ],
          answer: 1,
          explanation: "Single-bit errors only. Each bit flip toggles the XOR-tree's output, so ONE flip changes the overall parity (detected), but TWO simultaneous flips toggle it twice — back to the original parity, and the checker sees no error at all. This blind spot is why more robust codes (e.g. checksums, CRC) exist for burst-error-prone links.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Comparators ───────────────── */
    {
      id: "dl6-comparator",
      title: "Comparators",
      subtitle: "Equality via XNOR per bit · A>B / A<B logic · MSB-first cascading",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "A <strong>comparator</strong> reports the relationship between two binary numbers on three outputs: " +
          "A = B, A &gt; B, A &lt; B. <strong>Equality</strong> is per-bit sameness: XNOR each bit pair and AND all the " +
          "results — every pair must match. <strong>Magnitude</strong> is decided <em>MSB first</em>: the first (highest) " +
          "bit position where the numbers differ settles the comparison, and lower bits become irrelevant. " +
          "IC comparators (e.g. 4-bit 74HC85) provide cascade inputs so wider comparisons can be chained.",
        formula: "Per-bit equality: xᵢ = Aᵢ ⊙ Bᵢ (XNOR)   ·   A=B when ALL xᵢ = 1   ·   magnitude decided at the highest differing bit",
        bullets: [
          "XNOR = equality detector for one bit pair: outputs 1 when Aᵢ = Bᵢ",
          "n-bit equality: AND together the n XNOR outputs — a single mismatch kills equality",
          "A > B: at the most significant differing position i, Aᵢ = 1 and Bᵢ = 0",
          "A < B: at that position Aᵢ = 0 and Bᵢ = 1",
          "Compare MSB-first: once bits differ, lower bits cannot change the verdict",
          "Exactly ONE of the three outputs (=, >, <) is HIGH at any time",
          "Cascading: connect the 4-bit IC's =, >, < outputs to the next stage's cascade inputs for 8-bit+ compares"
        ],
        analogy: "Alphabetical ordering of words. Comparing 'CART' and 'CASE', you scan from the FIRST letter: C=C, A=A, then R vs S — S wins, decision made; the last letters never matter. Binary comparators do the same from the MSB: the first difference decides, everything below it is ignored. And two words are 'equal' only if EVERY letter matches — the AND of per-letter XNORs."
      },
      workedExample: {
        problem: "Compare A = 1011 (11) and B = 1101 (13) with a 4-bit comparator, reasoning MSB-first.",
        steps: [
          "<strong>Bit 3 (MSB):</strong> A₃ = 1, B₃ = 1 → equal so far, continue",
          "<strong>Bit 2:</strong> A₂ = 0, B₂ = 1 → they differ, and B has the 1 → <strong>decision: A &lt; B</strong>",
          "<strong>Bits 1, 0:</strong> irrelevant — the comparison was settled at bit 2 (indeed A's lower bits 11 > B's 01, but too late to matter)",
          "<strong>Outputs:</strong> (A=B) = 0, (A&gt;B) = 0, (A&lt;B) = <strong>1</strong> ✓ (11 < 13)",
          "<strong>Equality check structure:</strong> XNOR gives 1,0,1,0 per bit → AND = 0 → not equal, consistent"
        ],
        note: "The trap: bit-by-bit LSB-first comparison gives wrong answers. Magnitude is always decided at the highest differing bit."
      },
      quiz: [
        {
          id: "q-dl6-007",
          type: "mcq",
          question: "Which gate detects whether two individual bits are EQUAL?",
          options: [
            "XOR — HIGH when bits are equal",
            "XNOR — HIGH when bits are equal",
            "AND — HIGH when bits are equal",
            "NOR — HIGH when bits are equal"
          ],
          answer: 1,
          explanation: "XNOR: 00→1, 11→1, 01→0, 10→0 — HIGH exactly when the bits match. (XOR is its complement, the DIFFERENCE detector.) An n-bit equality comparator is n XNORs feeding one AND — all bit pairs must match.",
          xpReward: 25
        },
        {
          id: "q-dl6-008",
          type: "mcq",
          question: "A 4-bit comparator compares A = 1010 and B = 1001. How is the A > B decision reached?",
          options: [
            "By counting which number has more 1s",
            "Bit 3: equal (1,1) · bit 2: equal (0,0) · bit 1: A=1, B=0 → A > B decided; bit 0 ignored",
            "By subtracting B from A and checking the sign at bit 0",
            "By comparing the LSBs first: A ends in 0, B in 1, so B > A"
          ],
          answer: 1,
          explanation: "MSB-first scan: bits 3 and 2 match, bit 1 differs with A holding the 1 → A > B (10 > 9 ✓), and bit 0 cannot overturn it. Option D shows why LSB-first fails: B's final 1 is worth only 1, while A's bit-1 advantage is worth 2. Highest differing bit always wins.",
          xpReward: 25
        },
        {
          id: "q-dl6-009",
          type: "calc",
          question: "An 8-bit equality comparator is built from XNOR gates feeding a single AND gate. How many XNOR gates are required?",
          setup: "One XNOR per bit pair; 8 bit pairs for 8-bit words",
          hint: "One gate per bit position",
          answer: 8,
          tolerance: 0,
          unit: "gates",
          calcType: "numeric",
          explanation: "8 XNORs — one per bit position — with all outputs ANDed (one 8-input AND or a tree). Every pair must report 'equal' for A=B to be HIGH; one mismatched bit zeroes the AND. The structure scales linearly: n-bit equality = n XNORs + AND.",
          xpReward: 35
        },
        {
          id: "q-dl6-010",
          type: "truefalse",
          question: "In a magnitude comparator, if the two MSBs differ, the remaining lower-order bits still influence the A > B / A < B decision.",
          answer: 1,
          explanation: "False. The highest differing bit position settles everything: that bit's weight (2ⁱ) exceeds the combined weight of ALL lower bits (2ⁱ − 1). If A's MSB is 1 and B's is 0, A > B no matter what follows — 1000 (8) beats 0111 (7). This positional-weight argument is the standard 'explain why' exam answer.",
          xpReward: 25
        },
        {
          id: "q-dl6-011",
          type: "match",
          question: "Match each comparator output/structure to its logic.",
          pairs: [
            { term: "A = B (n-bit)",        definition: "AND of all per-bit XNOR outputs" },
            { term: "A > B",                definition: "At the highest differing bit: Aᵢ=1, Bᵢ=0" },
            { term: "A < B",                definition: "At the highest differing bit: Aᵢ=0, Bᵢ=1" },
            { term: "Wider than 4 bits",    definition: "Cascade ICs via the =, >, < expansion inputs" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete comparator picture: equality is an all-bits AND-of-XNORs, magnitude is decided at the first (highest) disagreement, and IC cascade inputs let 4-bit chips chain into 8-, 12-, 16-bit comparators — the lower chip's verdict feeds the upper chip's tie-breaker inputs.",
          xpReward: 25
        },
        {
          id: "q-dl6-029",
          type: "mcq",
          question: "A 4-bit comparator compares A = 0101 and B = 1010. At which bit position does the comparator stop comparing, and why?",
          options: [
            "Bit 0 (LSB) — comparators always finish at the last bit regardless of earlier results",
            "Bit 3 (MSB) — A₃=0 and B₃=1 already differ at the very first (highest) position checked, so the decision (A<B) is made immediately and no lower bits need to be examined",
            "It compares all 4 bits every time before deciding, since comparators cannot stop early",
            "Bit 2 — because that is where the two numbers happen to have the same value"
          ],
          answer: 1,
          explanation: "Bit 3 (the MSB). A₃=0, B₃=1 — they already differ at the very FIRST bit position examined (comparators always scan MSB-first), so B is immediately known to be larger and the comparator's decision is settled right there: A < B. Bits 2,1,0 are irrelevant and never need to be checked — explaining exactly WHERE and WHY the comparison stops is what full exam marks require, not just the final answer.",
          xpReward: 25
        },
        {
          id: "q-dl6-030",
          type: "calc",
          question: "A = 0110 and B = 0011 are fed into a 4-bit comparator. What is the comparator's output result — enter 1 for 'A>B is HIGH', 2 for 'A=B is HIGH', or 3 for 'A<B is HIGH'.",
          setup: "A = 0110\nB = 0011\nScan MSB→LSB: bit3: A=0,B=0 (equal) · bit2: A=1,B=0 (differ!)",
          hint: "At bit 2, A has the 1 and B has the 0 — who wins?",
          answer: 1,
          tolerance: 0,
          unit: "result code",
          calcType: "numeric",
          explanation: "Result 1: A>B is HIGH (the other two outputs are LOW). Bit 3 ties (0,0); at bit 2, A=1 and B=0 — A wins immediately (0110=6 > 0011=3 ✓), and bits 1,0 are never consulted. This exact A=0110,B=0011 pairing is a verbatim final-exam True/False setup ('A<B is HIGH' would be the false statement to spot).",
          xpReward: 35
        }
      ]
    },

    /* ───────────────── SECTION 3 — Decoders & Encoders ───────────────── */
    {
      id: "dl6-decoder-encoder",
      title: "Decoders & Encoders",
      subtitle: "n → 2ⁿ one-hot decoding · BCD-to-7-segment · Encoders & priority · Address decoding",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "A <strong>decoder</strong> converts an n-bit binary code into the activation of exactly ONE of its 2ⁿ " +
          "outputs — the output whose index equals the input value (one-hot). Applications: memory <em>address decoding</em>, " +
          "instruction decoding, and the <strong>BCD-to-7-segment</strong> display driver. An <strong>encoder</strong> does the " +
          "reverse: 2ⁿ input lines → the n-bit binary code of the active line. A <strong>priority encoder</strong> resolves " +
          "multiple simultaneous inputs by outputting the code of the HIGHEST-numbered active input.",
        formula: "Decoder: n inputs → 2ⁿ outputs (one-hot)   ·   Encoder: 2ⁿ inputs → n-bit code   ·   each decoder output = one minterm (AND gate)",
        bullets: [
          "Binary decoder: input value k activates output k only — every other output stays inactive",
          "Each output is one minterm: a 3-to-8 decoder's output 5 = A·B̄·C (101)",
          "Sizes: 2-to-4, 3-to-8, 4-to-16 (74HC154); many ICs have active-LOW outputs and enable pins",
          "Address decoder: the CPU's n-bit address selects exactly one memory location/chip — a decoder in every RAM",
          "BCD-to-7-segment decoder: 4-bit digit code → 7 segment drive lines (a–g) to display 0–9",
          "Encoder: active input line number → binary code out (decimal-to-BCD: 10 lines → 4 bits)",
          "Priority encoder: if several inputs are active, the HIGHEST-numbered one wins (e.g. 74HC147)"
        ],
        analogy: "A hotel keycard panel and the front desk. The decoder is the lift panel: you enter room number 305 (binary code) and exactly ONE door unlocks — never two. The encoder is the front desk fire panel: a smoke alarm goes off in SOME room, and the panel reports that room's NUMBER (code) to the fire service. Priority encoding is the desk's triage rule: if two alarms ring at once, report the higher floor first."
      },
      workedExample: {
        problem: "A 3-to-8 binary decoder receives input ABC = 101 (5). Determine the outputs, and give the AND-gate equation for the active one.",
        steps: [
          "<strong>Input value:</strong> 101₂ = 5 → output Y₅ activates, Y₀–Y₄ and Y₆–Y₇ stay inactive",
          "<strong>Equation:</strong> Y₅ = A·B̄·C — the minterm for 101: uncomplemented where the bit is 1, complemented where 0",
          "<strong>Check a neighbour:</strong> Y₆ = A·B·C̄ needs 110 — with 101 applied, B̄ = 1 kills it ✓",
          "<strong>One-hot property:</strong> exactly one of the 8 minterms is true for any input — the decoder is all 8 minterm AND gates in one package",
          "<strong>Active-LOW variant:</strong> ICs like the 74HC154 pull the selected output LOW instead (NAND gates internally); the selection logic is identical"
        ],
        note: "'Decoder output k = minterm k' is the key insight — it's why a decoder + OR gate can implement ANY truth table."
      },
      quiz: [
        {
          id: "q-dl6-012",
          type: "calc",
          question: "How many outputs does a 4-input binary decoder have?",
          setup: "Decoder: n inputs → 2ⁿ outputs\nn = 4",
          hint: "2⁴",
          answer: 16,
          tolerance: 0,
          unit: "outputs",
          calcType: "numeric",
          explanation: "2⁴ = 16 outputs (a 4-to-16 decoder, e.g. the 74HC154). Each of the 16 input combinations activates exactly one output. The inverse sizing question also appears: to select one of 32 memory chips you need log₂32 = 5 address bits.",
          xpReward: 35
        },
        {
          id: "q-dl6-013",
          type: "mcq",
          question: "A 3-to-8 decoder receives ABC = 011. Which output activates, and what is its minterm equation?",
          options: [
            "Y₆, equation A·B·C̄",
            "Y₃, equation Ā·B·C",
            "Y₃, equation A·B̄·B",
            "Y₅, equation A·B̄·C"
          ],
          answer: 1,
          explanation: "011₂ = 3 → Y₃, whose minterm is Ā·B·C (complement where the bit is 0, plain where 1). Option A reads the code backwards (110 = 6) — bit-order slips are the most common decoder error. One input value, one active output, one true minterm.",
          xpReward: 25
        },
        {
          id: "q-dl6-014",
          type: "mcq",
          question: "What does a BCD-to-7-segment decoder do?",
          options: [
            "Converts 7 input lines into a 4-bit BCD code",
            "Converts a 4-bit BCD digit into the 7 segment-drive signals that display the digit",
            "Compares BCD numbers 7 bits at a time",
            "Adds two BCD digits with carry"
          ],
          answer: 1,
          explanation: "4-bit digit in (0000–1001 for 0–9) → 7 outputs (segments a–g) that light the display pattern. E.g. input 0111 (7) lights segments a, b, c only. It's a decoder because each input code maps to a fixed output pattern — the everyday example being every digital clock and meter display.",
          xpReward: 25
        },
        {
          id: "q-dl6-015",
          type: "mcq",
          question: "A priority encoder has inputs 2, 5, and 7 active simultaneously. Its output code is:",
          options: [
            "010 (2) — the lowest active input",
            "111 (7) — the highest-numbered active input wins",
            "100 (the average)",
            "Undefined — encoders cannot handle multiple active inputs"
          ],
          answer: 1,
          explanation: "111 (7). 'Priority' means exactly this: when several inputs are active, the highest-numbered one is encoded and the rest are ignored. Without priority logic, multiple active lines WOULD produce a garbled OR of codes — the priority rule is what makes real encoders (74HC147/148) robust.",
          xpReward: 25
        },
        {
          id: "q-dl6-016",
          type: "truefalse",
          question: "In memory systems, a decoder converts the CPU's address bits into the selection of exactly one memory location or chip.",
          answer: 0,
          explanation: "True — address decoding is THE canonical decoder application. The n-bit address is decoded one-hot so precisely one row/chip responds to a read or write; two chips answering at once would collide on the bus. Every RAM, ROM and memory-mapped I/O system contains address decoders.",
          xpReward: 25
        },
        {
          id: "q-dl6-017",
          type: "match",
          question: "Match each device to its function.",
          pairs: [
            { term: "Binary decoder",       definition: "n-bit code in → exactly one of 2ⁿ outputs active" },
            { term: "Encoder",              definition: "Active line number in → n-bit binary code out" },
            { term: "Priority encoder",     definition: "Multiple active inputs → code of the highest-numbered one" },
            { term: "BCD-to-7-segment",     definition: "Digit code in → segment drive pattern for displays" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Decoders and encoders are inverse translators between 'binary code' and 'which line'. Priority resolves simultaneous activations; the 7-segment driver is the decoder you see every day. Keep the directions straight: decoder = code→lines, encoder = lines→code.",
          xpReward: 25
        },
        {
          id: "q-dl6-031",
          type: "truefalse",
          question: "A 3-to-8 decoder's logic symbol shows inputs A, B, C. If the binary value ABC = 101 is applied, output Y5 will be activated (HIGH).",
          answer: 0,
          explanation: "True. 101₂ = 5, so output Y5 (the minterm A·B̄·C) activates — exactly one output per input code, always the one whose subscript equals the binary value applied. Reading a decoder's logic symbol is just: convert the input code to decimal, that number's output is the active one.",
          xpReward: 25
        },
        {
          id: "q-dl6-032",
          type: "mcq",
          question: "An HPRI/BCD priority encoder has inputs Q3, Q5, and Q7 simultaneously active (asserted). Per priority-encoder rules, which input does the encoder actually respond to, and what happens to the others?",
          options: [
            "It responds to Q3 (the lowest-numbered active input) and ignores Q5 and Q7",
            "It responds to Q7 (the HIGHEST-numbered active input) and ignores Q3 and Q5, producing the BCD code for 7",
            "It averages all three active inputs into one code",
            "The output is undefined/invalid whenever more than one input is active"
          ],
          answer: 1,
          explanation: "It responds to Q7 and ignores Q3 and Q5. 'Priority' always means the HIGHEST-numbered active input wins — lower-numbered active inputs are simply ignored, not combined or averaged. This is exactly what makes a priority encoder well-defined and usable in real systems (e.g. interrupt controllers), unlike a plain encoder which would garble multiple simultaneous inputs.",
          xpReward: 25
        },
        {
          id: "q-dl6-033",
          type: "calc",
          question: "A BCD-to-7-segment decoder receives the BCD input 0111 (decimal 7). On a standard 7-segment display, digit '7' lights only segments a, b, c. Does segment 'f' light up? Enter 1 for YES or 0 for NO.",
          setup: "BCD input: 0111 = decimal 7\nStandard 7-segment pattern for digit '7': segments a, b, c ON; segments d, e, f, g OFF",
          hint: "Does the numeral '7' use the top-left vertical segment (f)?",
          answer: 0,
          tolerance: 0,
          unit: "(1=yes, 0=no)",
          calcType: "numeric",
          explanation: "NO (0) — segment f is OFF for digit 7. The decoder's job is exactly this: map each BCD input code to a FIXED, pre-wired segment pattern. Digit '7' only needs segments a (top), b (upper-right), c (lower-right) to be drawn — f (upper-left) stays dark. Exam questions give you a specific BCD input and ask whether a NAMED segment lights — memorise the seven-segment patterns for 0–9, or reason from what strokes each digit actually needs.",
          xpReward: 35
        }
      ]
    },

    /* ───────────────── SECTION 4 — MUX & DEMUX ───────────────── */
    {
      id: "dl6-mux-demux",
      title: "Multiplexers & Demultiplexers",
      subtitle: "MUX = data selector · DEMUX = data distributor · n select lines → 2ⁿ channels · Decoder as DEMUX",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "A <strong>multiplexer (MUX)</strong> is a data <em>selector</em>: 2ⁿ data inputs, n select lines, one output — " +
          "the select code chooses which input is connected through. A <strong>demultiplexer (DEMUX)</strong> is the reverse, " +
          "a data <em>distributor</em>: one input routed to the one of 2ⁿ outputs chosen by the select code. Together they " +
          "let many signals share one wire (time-division multiplexing). A binary <strong>decoder with an enable pin " +
          "doubles as a DEMUX</strong> — feed the data into the enable input.",
        formula: "1-of-4 MUX: Y = D₀S̄₁S̄₀ + D₁S̄₁S₀ + D₂S₁S̄₀ + D₃S₁S₀   ·   n select lines → 2ⁿ channels",
        bullets: [
          "MUX: 2ⁿ data inputs + n select lines → 1 output (data selector, e.g. 74LS151 = 8-to-1)",
          "Each product term = one data input ANDed with its select-code minterm",
          "DEMUX: 1 data input + n select lines → routed to one of 2ⁿ outputs (data distributor)",
          "Select lines count: 8 channels need log₂8 = 3 select bits; 16 need 4",
          "A decoder with an enable input works as a DEMUX: data drives enable, address drives select (74HC154)",
          "MUX + DEMUX pair = time-division multiplexing: many slow signals share one fast line",
          "A 2ⁿ-to-1 MUX can implement ANY n-variable truth table: wire each Dᵢ to that row's output value"
        ],
        analogy: "Railway switching yards. The MUX is the merging yard: many incoming tracks, one outgoing line, and the signal box (select lines) decides which train proceeds. The DEMUX is the fan-out yard at the far end: one arriving line, many platforms, the same signal code steering each train to its own platform. Set both signal boxes to the same code and train #3 always arrives at platform #3 — that's multiplexed communication."
      },
      workedExample: {
        problem: "A 1-of-4 MUX has data inputs D₀=1, D₁=0, D₂=1, D₃=0 and select lines S₁S₀ = 10. Find the output Y.",
        steps: [
          "<strong>Select code:</strong> S₁S₀ = 10₂ = 2 → channel D₂ is selected",
          "<strong>Equation check:</strong> Y = D₀S̄₁S̄₀ + D₁S̄₁S₀ + D₂S₁S̄₀ + D₃S₁S₀ — with S₁=1, S₀=0 only the D₂S₁S̄₀ term survives",
          "<strong>Output:</strong> Y = D₂ = <strong>1</strong>",
          "<strong>Change the code:</strong> S₁S₀ = 11 would give Y = D₃ = 0 — the output follows whichever input the code points at",
          "<strong>DEMUX mirror:</strong> sending Y down a wire to a DEMUX with the same select code 10 delivers the bit to output 2 on the far side"
        ],
        note: "MUX questions are select-code lookups: decode S, name the channel, read its value. Show the surviving product term for full marks."
      },
      quiz: [
        {
          id: "q-dl6-018",
          type: "calc",
          question: "How many select lines does a 16-to-1 multiplexer require?",
          setup: "2ⁿ data inputs need n select lines\n2ⁿ = 16 → n = ?",
          hint: "log₂(16)",
          answer: 4,
          tolerance: 0,
          unit: "lines",
          calcType: "numeric",
          explanation: "log₂16 = 4 select lines — each of the 16 binary codes 0000–1111 picks one channel. The same log rule sizes decoders, DEMUX outputs, and memory address bits: n control bits ↔ 2ⁿ things controlled.",
          xpReward: 35
        },
        {
          id: "q-dl6-019",
          type: "mcq",
          question: "A 1-of-4 MUX has D₀=0, D₁=1, D₂=0, D₃=1 and select code S₁S₀ = 01. The output Y is:",
          options: [
            "0 — channel D₀ is selected",
            "1 — channel D₁ is selected (01₂ = 1)",
            "0 — channel D₂ is selected",
            "1 — channel D₃ is selected"
          ],
          answer: 1,
          explanation: "S₁S₀ = 01₂ = 1 selects D₁, so Y = D₁ = 1. In the SOP equation only the D₁S̄₁S₀ term survives (S̄₁ = 1, S₀ = 1). Careful with bit order — S₁ is the MSB of the select code; reading 01 as channel 2 is the standard slip.",
          xpReward: 25
        },
        {
          id: "q-dl6-020",
          type: "mcq",
          question: "The functional difference between a MUX and a DEMUX is:",
          options: [
            "MUX selects one of many inputs onto one output; DEMUX routes one input to one of many outputs",
            "MUX works on analog signals, DEMUX on digital",
            "MUX needs no select lines; DEMUX does",
            "They are identical devices with different names"
          ],
          answer: 0,
          explanation: "Selector vs distributor — many→one vs one→many. Both use n select lines for 2ⁿ channels; they are mirror images and often bookend a shared transmission line (time-division multiplexing): MUX merges at the sender, DEMUX fans out at the receiver, both driven by the same channel-select code.",
          xpReward: 25
        },
        {
          id: "q-dl6-021",
          type: "truefalse",
          question: "A binary decoder with an enable input can be used as a demultiplexer by feeding the data stream into the enable pin.",
          answer: 0,
          explanation: "True. Select the target output with the address inputs; the data on the ENABLE pin then appears on (only) that selected output — data routed one-to-many, exactly a DEMUX. This dual identity (74HC154 sold as 'decoder/demultiplexer') is a favourite exam fact connecting the two devices.",
          xpReward: 25
        },
        {
          id: "q-dl6-022",
          type: "match",
          question: "Match each device to its input/output structure.",
          pairs: [
            { term: "8-to-1 MUX",     definition: "8 data in, 3 select lines, 1 output" },
            { term: "1-to-8 DEMUX",   definition: "1 data in, 3 select lines, 8 outputs" },
            { term: "3-to-8 decoder", definition: "3 code inputs, 8 one-hot outputs, no data line" },
            { term: "8-to-3 encoder", definition: "8 input lines, 3-bit code output" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The four routing/translating blocks side by side. MUX/DEMUX carry DATA under select-code control; decoder/encoder translate between codes and one-hot lines with no separate data path. Counting inputs/outputs/select lines correctly identifies any of them instantly on an exam diagram.",
          xpReward: 25
        },
        {
          id: "q-dl6-034",
          type: "truefalse",
          question: "A MUX (multiplexer) is used to distribute a single input signal to multiple outputs.",
          answer: 1,
          explanation: "False — that description is the DEMULTIPLEXER's job, not the multiplexer's. A MUX does the OPPOSITE: it selects ONE of MANY inputs and routes it to a SINGLE output. 'Distributing one input to many outputs' = DEMUX (one → many); 'selecting one of many inputs to one output' = MUX (many → one). This exact role-swap is a verbatim final-exam trap — the two devices are mirror images and are easy to mix up under time pressure.",
          xpReward: 25
        },
        {
          id: "q-dl6-035",
          type: "mcq",
          question: "A 1-of-4 MUX logic symbol shows select inputs S1, S0. If S1S0 = 01 is applied, which data input is routed to the output Y?",
          options: [
            "D0",
            "D1 — because 01₂ = 1, selecting channel 1",
            "D2",
            "D3"
          ],
          answer: 1,
          explanation: "D1. S1S0 = 01₂ = decimal 1, so the channel numbered 1 (D1) is the one connected through to Y. Reading a MUX's select code is a direct binary-to-decimal conversion — whatever channel number that decimal value names is the one selected.",
          xpReward: 25
        }
      ]
    }
  ]
};
