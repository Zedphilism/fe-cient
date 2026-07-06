/**
 * data/math-chapter6-data.js
 * Chapter 6 — Solutions of Non-Linear Equations (SECI1113)
 * Global: window.mathChapter6Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.mathChapter6Data = {
  id: "math-chapter6",
  key: "math6",
  title: "Chapter 6: Non-Linear Equations",
  heroTitle: "Solutions of Non-Linear Equations",
  heroDesc: "Find roots of f(x) = 0 numerically: verify a root exists (IVT), bracket it and halve (Bisection), " +
    "follow the tangent (Newton-Raphson), or approximate the tangent from two points (Secant). " +
    "Exam questions demand hand iterations — this chapter drills them.",
  statusLabel: "CHAPTER 6 — NON-LINEAR EQUATIONS",
  nextChapter: { label: "Chapter 7: Eigenvalues & Eigenvectors", href: "math-chapter7.html" },
  completeText: "You can verify brackets with IVT, run bisection/Newton/secant iterations by hand, and choose the right method with justification.",

  sections: [

    /* ───────────────── SECTION 1 — IVT ───────────────── */
    {
      id: "math6-ivt",
      title: "Intermediate Value Theorem",
      subtitle: "Sign-change test f(a)·f(b) < 0 · Continuity requirement · Existence, not location",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "The IVT guarantees: if f is <strong>continuous</strong> on [a, b] and f(a), f(b) have opposite signs " +
          "(f(a)·f(b) < 0), then at least one root exists in (a, b). A continuous curve cannot jump from below the x-axis " +
          "to above it without crossing. The theorem proves <em>existence only</em> — it does not count roots or locate them; " +
          "that is what the numerical methods that follow are for.",
        formula: "f continuous on [a,b]  and  f(a) · f(b) < 0   ⟹   ∃ root in (a, b)",
        bullets: [
          "f(a)·f(b) < 0 → at least one root in (a, b) — IVT applies",
          "f(a)·f(b) > 0 → NO conclusion (roots may or may not exist)",
          "f(a)·f(b) = 0 → an endpoint is itself a root — done",
          "Continuity is non-negotiable: a discontinuous f can change sign with no crossing",
          "IVT guarantees existence only — not the number of roots, not their location",
          "This test is the mandatory prerequisite before starting the bisection method"
        ],
        analogy: "A hiking trail that starts above sea level and ends below sea level. If the trail is unbroken (continuous), you MUST have crossed sea level (the x-axis) somewhere — no teleporting. But knowing you crossed doesn't tell you where, or whether you crossed once or five times. That's the IVT: certainty that a crossing exists, silence about everything else."
      },
      workedExample: {
        problem: "For f(x) = x² + 2x − 1, test the intervals [−1, 0], [0, 1] and [1, 2] using the IVT sign-change test.",
        steps: [
          "<strong>[−1, 0]:</strong> f(−1) = 1 − 2 − 1 = −2 · f(0) = −1 · product = (−2)(−1) = +2 > 0 → <strong>no IVT guarantee</strong>",
          "<strong>[0, 1]:</strong> f(0) = −1 · f(1) = 1 + 2 − 1 = +2 · product = (−1)(2) = −2 < 0 → <strong>root exists in (0, 1)</strong> ✓",
          "<strong>[1, 2]:</strong> f(1) = +2 · f(2) = 4 + 4 − 1 = +7 · product = +14 > 0 → <strong>no IVT guarantee</strong>",
          "<strong>Interpretation:</strong> 'no guarantee' ≠ 'no root'. IVT failing on [−1, 0] does not prove absence — it simply cannot say."
        ],
        note: "Exam habit: always show f(a), f(b), the product, its sign, AND the conclusion in words — markers award each step."
      },
      quiz: [
        {
          id: "q-math6-001",
          type: "calc",
          question: "For f(x) = x³ − x − 1 on the interval [1, 2], compute the product f(1) × f(2).",
          setup: "f(x) = x³ − x − 1\nf(1) = 1 − 1 − 1 = ?\nf(2) = 8 − 2 − 1 = ?\n\nCompute f(1) × f(2)",
          hint: "Evaluate each endpoint, then multiply",
          answer: -5,
          tolerance: 0.01,
          unit: "=",
          calcType: "numeric",
          explanation: "f(1) = −1 and f(2) = 5, so the product is (−1)(5) = −5 < 0. Since the product is negative and f is a polynomial (continuous everywhere), the IVT guarantees at least one root in (1, 2). A negative product is exactly the 'trail crossed sea level' certificate.",
          xpReward: 35
        },
        {
          id: "q-math6-002",
          type: "mcq",
          question: "f is continuous and f(a)·f(b) > 0 on [a, b]. What can the IVT conclude?",
          options: [
            "There is definitely no root in (a, b)",
            "There is exactly one root in (a, b)",
            "Nothing — roots may or may not exist in (a, b)",
            "There is an even number of roots in (a, b)"
          ],
          answer: 2,
          explanation: "Nothing. A positive product means both endpoints are on the same side of the x-axis — but the curve could dip across and come back (e.g. x² − 0.5 on [−1, 1]: f(−1) = f(1) = 0.5 > 0, yet two roots inside). Absence of guarantee is NOT evidence of absence. (The 'even number of crossings' intuition is common but is not what the theorem states, and tangential roots break it.)",
          xpReward: 25
        },
        {
          id: "q-math6-003",
          type: "truefalse",
          question: "The IVT sign-change test can be applied to any function, including discontinuous ones.",
          answer: 1,
          explanation: "False. Continuity is the non-negotiable hypothesis. Example: f(x) = 1/x has f(−1) = −1 and f(1) = +1 (sign change!) but no root anywhere — it jumps across zero through its discontinuity at x = 0. Without continuity, the sign test is meaningless.",
          xpReward: 25
        },
        {
          id: "q-math6-004",
          type: "mcq",
          question: "f(a)·f(b) < 0 holds for continuous f. Which statement is guaranteed?",
          options: [
            "Exactly one root lies in (a, b)",
            "At least one root lies in (a, b) — but IVT does not count them",
            "The root lies at the midpoint (a + b)/2",
            "The function is monotonic on [a, b]"
          ],
          answer: 1,
          explanation: "At least one root — existence only. There could be one, three, five crossings; the IVT cannot count. It also says nothing about location (the midpoint claim confuses IVT with the first bisection step) or monotonicity. Numerical methods take over from here.",
          xpReward: 25
        },
        {
          id: "q-math6-005",
          type: "fillblank",
          question: "If f(a)·f(b) = 0, then at least one of the interval ______ is itself a root.",
          answer: "endpoints",
          explanation: "Endpoints. A zero product means f(a) = 0 or f(b) = 0 — you have already found a root and no further searching is needed. The three product cases (negative / positive / zero) map to (guaranteed root inside / no conclusion / endpoint root).",
          xpReward: 25
        },
        {
          id: "q-math6-006",
          type: "match",
          question: "Match each sign-test outcome to its correct conclusion.",
          pairs: [
            { term: "f(a)·f(b) < 0", definition: "At least one root guaranteed inside (a, b)" },
            { term: "f(a)·f(b) > 0", definition: "No conclusion — root may or may not exist" },
            { term: "f(a)·f(b) = 0", definition: "An endpoint is itself a root" },
            { term: "f discontinuous", definition: "Sign test is invalid regardless of the product" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete IVT decision table. Every bisection question starts with this check — and 'discontinuous f invalidates everything' is the trap option examiners love. Cite continuity explicitly when you apply the theorem.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Bisection ───────────────── */
    {
      id: "math6-bisection",
      title: "Bisection Method",
      subtitle: "Halve the bracket · Error (b−a)/2ⁿ · Iteration count n ≥ log₂((b−a)/ε) · Guaranteed convergence",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "Bisection finds a root by repeatedly halving a sign-change bracket. Compute the midpoint c = (a+b)/2, " +
          "evaluate f(c), and keep whichever half still shows a sign change. After n steps the root is pinned inside an " +
          "interval of width (b−a)/2ⁿ. Uniquely, the number of iterations needed for accuracy ε can be computed " +
          "<em>before starting</em>: n ≥ log₂((b−a)/ε). Slow but guaranteed — bisection cannot fail from a valid bracket.",
        formula: "c = (a + b)/2   ·   error ≤ (b − a)/2ⁿ   ·   n ≥ log₂((b − a)/ε)",
        bullets: [
          "Prerequisite: IVT holds — f(a)·f(b) < 0",
          "Midpoint c = (a + b)/2; if f(a)·f(c) < 0 keep [a, c], else keep [c, b]",
          "If f(c) = 0 exactly, c is the root — stop",
          "Error bound after n iterations: (b − a)/2ⁿ",
          "Iterations for accuracy ε: n ≥ log₂((b − a)/ε) — plannable in advance (unique to bisection)",
          "ε for d decimal places: ε = 0.5 × 10⁻ᵈ",
          "Guaranteed convergence from any valid bracket; cannot find tangential (no-sign-change) roots",
          "Slower than Newton (quadratic) and secant (order ≈ 1.618) — robustness traded for speed"
        ],
        analogy: "Binary search in a phone book. You know the name is somewhere inside; open to the middle page and every check eliminates exactly half the remaining pages. After 10 splits, 1/1024 of the book remains. It's never the fastest way — but it literally cannot fail, and you can compute in advance exactly how many splits you'll need."
      },
      workedExample: {
        problem: "Find the root of f(x) = x³ − 3x² + 8x − 5 in [0, 1] to 2-decimal-place accuracy (ε = 0.005). Plan the iterations, then carry out the first two.",
        steps: [
          "<strong>IVT check:</strong> f(0) = −5 < 0 · f(1) = 1 − 3 + 8 − 5 = +1 > 0 · product < 0 ✓ root exists in (0, 1)",
          "<strong>Plan iterations:</strong> n ≥ log₂((1 − 0)/0.005) = log₂(200) ≈ 7.64 → <strong>at least 8 iterations</strong>",
          "<strong>Iteration 1:</strong> c = (0+1)/2 = 0.5 · f(0.5) = 0.125 − 0.75 + 4 − 5 = −1.625 < 0 · sign matches f(0) → root in <strong>[0.5, 1]</strong>",
          "<strong>Iteration 2:</strong> c = (0.5+1)/2 = 0.75 · f(0.75) ≈ 0.422 − 1.688 + 6 − 5 = −0.266 < 0 → root in <strong>[0.75, 1]</strong>",
          "<strong>After 8 iterations:</strong> width = 1/2⁸ = 0.0039 < 0.005 ✓ required accuracy achieved"
        ],
        note: "Tabulate a, b, c, f(c), and the kept half at every step — exam markers award the table, not just the final root."
      },
      quiz: [
        {
          id: "q-math6-007",
          type: "calc",
          question: "Bisection is applied on [1, 2] and the root is needed to 3-decimal-place accuracy (ε = 0.0005). Compute the minimum number of iterations required (round UP to a whole number).",
          setup: "Interval width: b − a = 2 − 1 = 1\nTolerance: ε = 0.0005\n\nn ≥ log₂((b − a)/ε) = log₂(1/0.0005) = log₂(2000)",
          hint: "log₂(2000) = ln(2000)/ln(2) ≈ 10.97 — round up",
          answer: 11,
          tolerance: 0.1,
          unit: "iterations",
          calcType: "numeric",
          explanation: "n ≥ log₂(2000) ≈ 10.97, so n = 11 iterations. Check: 1/2¹¹ = 1/2048 ≈ 0.000488 < 0.0005 ✓ (10 gives 0.000977 — not enough). Being able to pre-compute the cost is unique to bisection: its convergence rate is fixed at ½ per step regardless of the function.",
          xpReward: 35
        },
        {
          id: "q-math6-008",
          type: "calc",
          question: "Bisection runs on f(x) = x² − 3 with bracket [1, 2]. Compute the first midpoint c₁ and report f(c₁).",
          setup: "c₁ = (1 + 2)/2 = 1.5\nf(x) = x² − 3\nf(c₁) = (1.5)² − 3 = ?",
          hint: "Square the midpoint, subtract 3",
          answer: -0.75,
          tolerance: 0.01,
          unit: "=",
          calcType: "numeric",
          explanation: "f(1.5) = 2.25 − 3 = −0.75 < 0. Since f(1) = −2 (same sign as f(c₁)) and f(2) = +1, the sign change is now between 1.5 and 2 → new bracket [1.5, 2]. (The true root is √3 ≈ 1.732 — indeed inside.) Each iteration repeats exactly this: midpoint, evaluate, keep the sign-change half.",
          xpReward: 35
        },
        {
          id: "q-math6-009",
          type: "mcq",
          question: "After each bisection iteration, the interval containing the root:",
          options: [
            "Shrinks by a variable amount depending on f",
            "Is exactly halved — error after n steps is (b−a)/2ⁿ",
            "Shrinks quadratically, doubling correct digits each step",
            "Stays the same until the final iteration"
          ],
          answer: 1,
          explanation: "Exactly halved, every time, regardless of the function — that fixed ½ ratio is why the error after n steps is (b−a)/2ⁿ and why the iteration count is predictable. Quadratic digit-doubling describes Newton's method, not bisection. Fixed-rate certainty is bisection's whole identity.",
          xpReward: 25
        },
        {
          id: "q-math6-010",
          type: "mcq",
          question: "The midpoint evaluation gives f(c) with the SAME sign as f(a). What is the next bracket?",
          options: [
            "[a, c] — keep the left half",
            "[c, b] — the sign change now lies between c and b",
            "[a, b] — restart with the same interval",
            "The method fails and must switch to Newton's method"
          ],
          answer: 1,
          explanation: "[c, b]. The root lives where the sign changes. If f(c) matches f(a)'s sign, then a→c has no crossing, but c→b must (f(c) and f(b) have opposite signs). Rule of thumb: replace the endpoint whose sign matches f(c). This bookkeeping step is where most hand-calculation marks are lost.",
          xpReward: 25
        },
        {
          id: "q-math6-011",
          type: "truefalse",
          question: "Bisection can locate a root where the function touches the x-axis without crossing it (a tangential root, e.g. f(x) = (x−1)²).",
          answer: 1,
          explanation: "False. A tangential root has no sign change — f is ≥ 0 on both sides (e.g. (x−1)² ≥ 0 everywhere), so no valid bracket f(a)·f(b) < 0 can ever be found. Bisection's guarantee applies only to sign-crossing roots. Newton's method CAN converge to tangential roots (though more slowly).",
          xpReward: 25
        },
        {
          id: "q-math6-012",
          type: "calc",
          question: "After exactly 8 bisection iterations starting from the bracket [0, 1], what is the maximum possible error (interval width)? Answer to 4 decimal places.",
          setup: "Error bound = (b − a)/2ⁿ = (1 − 0)/2⁸",
          hint: "2⁸ = 256",
          answer: 0.0039,
          tolerance: 0.0002,
          unit: "≤",
          calcType: "numeric",
          explanation: "1/256 ≈ 0.0039. This is below ε = 0.005 (2-d.p. accuracy), confirming 8 iterations suffice for [0, 1] → 2 d.p. The formula error = (b−a)/2ⁿ turns 'how accurate after n steps?' and 'how many steps for accuracy ε?' into the same one-line computation.",
          xpReward: 35
        },
        {
          id: "q-math6-013",
          type: "match",
          question: "Match each bisection property to its statement.",
          pairs: [
            { term: "Prerequisite",     definition: "f(a)·f(b) < 0 with f continuous (IVT bracket)" },
            { term: "Convergence",      definition: "Guaranteed from any valid bracket — cannot diverge" },
            { term: "Speed",            definition: "Slowest of the three methods — fixed ½ rate per step" },
            { term: "Unique advantage", definition: "Iteration count computable before starting" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Bisection's exam profile in four rows: needs a bracket, never fails, converges slowly, and is perfectly plannable. When an exam asks 'which method would you choose and why', these four trade-offs are the expected vocabulary.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Newton-Raphson ───────────────── */
    {
      id: "math6-newton",
      title: "Newton-Raphson Method",
      subtitle: "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) · Quadratic convergence · Fails when f′ = 0 · √c shortcut",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "Newton-Raphson follows the <strong>tangent line</strong> at the current estimate down to the x-axis: " +
          "x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>)/f′(x<sub>n</sub>). Near a root it converges <strong>quadratically</strong> " +
          "— correct digits roughly double each iteration (2 → 4 → 8 → 16). The price: you must supply the derivative f′, " +
          "the formula fails outright if f′(x<sub>n</sub>) = 0 (horizontal tangent never crosses the axis), and a poor " +
          "starting guess can make the sequence diverge.",
        formula: "xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)   ·   stop when |xₙ₊₁ − xₙ| < ε",
        bullets: [
          "Derivation: tangent at (xₙ, f(xₙ)) has slope f′(xₙ); set y = 0 and solve for x",
          "Quadratic convergence near the root — fastest of the three methods",
          "Requires the analytic derivative f′(x) at every iterate",
          "Failure 1: f′(xₙ) = 0 → division by zero (horizontal tangent)",
          "Failure 2: poor x₀ in a sharply curving region → divergence",
          "Square-root special case: f(x) = x² − c gives xₙ₊₁ = (xₙ + c/xₙ)/2",
          "Stopping rule: |xₙ₊₁ − xₙ| < ε; growing differences signal divergence — restart with new x₀"
        ],
        analogy: "A mountain climber descending to sea level using the local slope. Instead of blindly halving a search area (bisection), you read the steepness under your feet (the derivative) and stride to where the slope line predicts sea level. Informed steps are huge — you converge in a handful of strides. But stand on flat ground (f′ = 0) and the slope points nowhere; start on a treacherous curve and your stride overshoots into the wrong valley entirely."
      },
      workedExample: {
        problem: "Solve f(x) = x³ − 2x² − 5 = 0 with x₀ = 2, ε = 0.0005. (True root ≈ 2.6906.) Carry out two iterations.",
        steps: [
          "<strong>Derivative:</strong> f′(x) = 3x² − 4x",
          "<strong>Iteration 1:</strong> f(2) = 8 − 8 − 5 = −5 · f′(2) = 12 − 8 = 4 · x₁ = 2 − (−5)/4 = <strong>3.25</strong> · |x₁ − x₀| = 1.25 > ε → continue",
          "<strong>Iteration 2:</strong> f(3.25) ≈ 34.328 − 21.125 − 5 = 8.203 · f′(3.25) = 31.6875 − 13 = 18.6875 · x₂ = 3.25 − 8.203/18.6875 ≈ <strong>2.8110</strong>",
          "<strong>Convergence check:</strong> |x₂ − x₁| ≈ 0.439 > ε → continue (typically 4–6 iterations total to reach 2.6906)"
        ],
        note: "√c shortcut: for f(x) = x² − 5, x₀ = 2: x₁ = (2 + 5/2)/2 = 2.25, x₂ = (2.25 + 5/2.25)/2 ≈ 2.2361 → √5 in two steps."
      },
      quiz: [
        {
          id: "q-math6-014",
          type: "calc",
          question: "Apply ONE Newton-Raphson iteration to f(x) = x³ − x − 2 starting at x₀ = 1.5. Compute x₁ to 4 decimal places.",
          setup: "f(x) = x³ − x − 2   →   f(1.5) = 3.375 − 1.5 − 2 = −0.125\nf′(x) = 3x² − 1      →   f′(1.5) = 6.75 − 1 = 5.75\n\nx₁ = x₀ − f(x₀)/f′(x₀)",
          hint: "x₁ = 1.5 − (−0.125)/5.75",
          answer: 1.5217,
          tolerance: 0.001,
          unit: "≈",
          calcType: "numeric",
          explanation: "x₁ = 1.5 − (−0.125)/5.75 = 1.5 + 0.021739 ≈ 1.5217. Note the negative f value pushes the estimate RIGHT (the tangent from below the axis crosses to the right). The true root is ≈ 1.5214 — one informed step got us to 3 correct decimals, showcasing quadratic convergence.",
          xpReward: 35
        },
        {
          id: "q-math6-015",
          type: "calc",
          question: "Use the Newton square-root formula xₙ₊₁ = (xₙ + c/xₙ)/2 to compute √5. Starting from x₀ = 2, compute x₁.",
          setup: "c = 5, x₀ = 2\nx₁ = (x₀ + c/x₀)/2 = (2 + 5/2)/2",
          hint: "(2 + 2.5)/2",
          answer: 2.25,
          tolerance: 0.001,
          unit: "=",
          calcType: "numeric",
          explanation: "x₁ = (2 + 2.5)/2 = 2.25. Next: x₂ = (2.25 + 5/2.25)/2 ≈ 2.2361 = √5 to 4 d.p. — two iterations! The formula is Newton on f(x) = x² − c: xₙ₊₁ = xₙ − (xₙ² − c)/(2xₙ) = (xₙ + c/xₙ)/2. This 'average of guess and c/guess' is how calculators compute square roots.",
          xpReward: 35
        },
        {
          id: "q-math6-016",
          type: "mcq",
          question: "Newton-Raphson fails with a division-by-zero error at iterate xₙ. The geometric reason is:",
          options: [
            "The function value f(xₙ) is zero — a root was found",
            "The tangent at xₙ is horizontal (f′(xₙ) = 0) and never crosses the x-axis",
            "The iterate xₙ has moved outside the original bracket",
            "The second derivative vanishes at xₙ"
          ],
          answer: 1,
          explanation: "f′(xₙ) = 0 means a horizontal tangent — a horizontal line at height f(xₙ) ≠ 0 never meets the x-axis, so 'where the tangent crosses' is undefined: algebraically, division by zero. (f(xₙ) = 0 would be success, not failure.) Avoid starting near stationary points of f.",
          xpReward: 25
        },
        {
          id: "q-math6-017",
          type: "mcq",
          question: "Near a simple root, Newton-Raphson roughly doubles the number of correct digits each iteration. This convergence rate is called:",
          options: [
            "Linear convergence",
            "Superlinear convergence of order ≈ 1.618",
            "Quadratic convergence",
            "Logarithmic convergence"
          ],
          answer: 2,
          explanation: "Quadratic convergence — the error squares each step (e → e²), so 2 correct digits become 4, then 8, then 16. Order 1.618 (golden ratio) is the secant method; linear (fixed ratio) is bisection. This speed ranking — Newton > secant > bisection — is a staple exam comparison.",
          xpReward: 25
        },
        {
          id: "q-math6-018",
          type: "truefalse",
          question: "Newton-Raphson is guaranteed to converge from any starting point x₀, just like bisection from a valid bracket.",
          answer: 1,
          explanation: "False. Newton has NO global guarantee: a poor x₀ in a sharply curving region (or near an inflection/flat spot) can send iterates far away or into oscillation. Bisection is the guaranteed-but-slow method; Newton is the fast-but-conditional one. Watching |xₙ₊₁ − xₙ| grow is the standard divergence alarm — restart with a better x₀ (an IVT bracket helps pick one).",
          xpReward: 25
        },
        {
          id: "q-math6-019",
          type: "fillblank",
          question: "The Newton-Raphson iteration is derived by finding where the ______ line at the current estimate crosses the x-axis.",
          answer: "tangent",
          explanation: "Tangent. The line through (xₙ, f(xₙ)) with slope f′(xₙ) is the best local linear stand-in for the curve; setting its y to 0 yields xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). Replace the exact tangent slope with a two-point estimate and you get the secant method — the two formulas are siblings.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 4 — Secant ───────────────── */
    {
      id: "math6-secant",
      title: "Secant Method & Choosing a Method",
      subtitle: "Derivative-free Newton · Two initial guesses · Order ≈ 1.618 · Method selection trade-offs",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "The secant method is <strong>derivative-free Newton</strong>: it replaces the exact slope f′(xₙ) with the " +
          "slope of the line through the last two iterates, giving x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>)(x<sub>n</sub> − x<sub>n−1</sub>)/(f(x<sub>n</sub>) − f(x<sub>n−1</sub>)). " +
          "It needs two starting guesses (no sign-change required), converges at order ≈ 1.618 (faster than bisection, " +
          "slower than Newton), and fails only if f(x<sub>n</sub>) = f(x<sub>n−1</sub>). Method choice is a standard exam " +
          "question: guaranteed-but-slow (bisection) vs fast-but-needs-f′ (Newton) vs fast-and-derivative-free (secant).",
        formula: "xₙ₊₁ = xₙ − f(xₙ)·(xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))",
        bullets: [
          "Approximates f′(xₙ) by the finite difference [f(xₙ) − f(xₙ₋₁)] / (xₙ − xₙ₋₁)",
          "Two initial guesses x₀, x₁ — NO sign-change condition required",
          "Convergence order ≈ 1.618 (golden ratio): bisection < secant < Newton",
          "No derivative computation needed — the key advantage over Newton",
          "Division-by-zero failure only if f(xₙ) = f(xₙ₋₁); can diverge from poor guesses (swapping x₀, x₁ sometimes rescues it)",
          "Each iteration keeps the two most recent points and discards the oldest",
          "<strong>Choose bisection</strong> when a bracket exists and certainty matters · <strong>Newton</strong> when f′ is cheap and x₀ is good · <strong>secant</strong> when f′ is unavailable/expensive"
        ],
        analogy: "Dead-reckoning navigation without a compass. Newton reads the exact heading from an instrument (the derivative); the secant navigator estimates direction from the last two known positions and projects forward. Slightly less accurate per step, but requires no instrument at all — and as the fixes get closer to the destination, the estimated heading approaches the true one."
      },
      workedExample: {
        problem: "Solve f(x) = eˣ − x² = 0 with x₀ = −1, x₁ = 0, ε = 0.0005. (Root ≈ −0.7035.) Carry out two iterations.",
        steps: [
          "<strong>Setup:</strong> f(−1) = e⁻¹ − 1 ≈ −0.632 · f(0) = 1 − 0 = 1",
          "<strong>Iteration 1:</strong> x₂ = 0 − (1)(0 − (−1))/(1 − (−0.632)) = −1/1.632 ≈ <strong>−0.613</strong>",
          "<strong>Evaluate:</strong> f(−0.613) = e^(−0.613) − 0.613² ≈ 0.542 − 0.376 = 0.166",
          "<strong>Iteration 2:</strong> x₃ = −0.613 − (0.166)(−0.613 − 0)/(0.166 − 1) = −0.613 − (0.166)(−0.613)/(−0.834) ≈ <strong>−0.735</strong>",
          "<strong>Continue</strong> until |xₙ₊₁ − xₙ| < 0.0005 → converges to −0.7035"
        ],
        note: "Bookkeeping rule: always use the TWO MOST RECENT points. After computing x₂, the pair becomes (x₁, x₂); x₀ is discarded."
      },
      quiz: [
        {
          id: "q-math6-020",
          type: "calc",
          question: "Apply ONE secant iteration to f(x) = x³ − 2 with x₀ = 1 and x₁ = 2. Compute x₂ to 4 decimal places.",
          setup: "f(1) = 1 − 2 = −1\nf(2) = 8 − 2 = 6\n\nx₂ = x₁ − f(x₁)·(x₁ − x₀)/(f(x₁) − f(x₀))\n   = 2 − 6·(2 − 1)/(6 − (−1))",
          hint: "x₂ = 2 − 6/7",
          answer: 1.1429,
          tolerance: 0.001,
          unit: "≈",
          calcType: "numeric",
          explanation: "x₂ = 2 − 6(1)/7 = 2 − 0.8571 ≈ 1.1429. The secant line through (1, −1) and (2, 6) crosses the x-axis at ≈ 1.14. (True root: ∛2 ≈ 1.2599.) The next iteration uses the pair (x₁, x₂) = (2, 1.1429) — always the two most recent points.",
          xpReward: 35
        },
        {
          id: "q-math6-021",
          type: "mcq",
          question: "The key advantage of the secant method over Newton-Raphson is:",
          options: [
            "It converges faster than Newton's quadratic rate",
            "It never diverges regardless of starting guesses",
            "It requires no derivative — the slope is estimated from the last two function values",
            "It needs only one initial guess instead of two"
          ],
          answer: 2,
          explanation: "No derivative needed. The finite-difference slope [f(xₙ) − f(xₙ₋₁)]/(xₙ − xₙ₋₁) replaces f′(xₙ) — crucial when f′ is unknown, expensive, or f exists only as data. The trade-offs go the other way: secant is SLOWER than Newton (1.618 < 2), CAN diverge, and needs TWO guesses.",
          xpReward: 25
        },
        {
          id: "q-math6-022",
          type: "truefalse",
          question: "Like bisection, the secant method requires its two starting points to satisfy the sign-change condition f(x₀)·f(x₁) < 0.",
          answer: 1,
          explanation: "False. The secant method places NO sign condition on x₀, x₁ — they are just two starting positions for the slope estimate (in the worked example both f(−1) < 0 and… actually f(0) = 1 > 0 there, but x₀ = 1, x₁ = 2 with f = −1, 6 works and so would f-values of the same sign). This freedom is a convenience, but it is also why convergence is not guaranteed — bisection's guarantee comes precisely from maintaining the bracket.",
          xpReward: 25
        },
        {
          id: "q-math6-023",
          type: "mcq",
          question: "Rank the three root-finding methods from SLOWEST to FASTEST convergence (assuming all converge):",
          options: [
            "Newton < secant < bisection",
            "Bisection < secant < Newton",
            "Secant < bisection < Newton",
            "Bisection < Newton < secant"
          ],
          answer: 1,
          explanation: "Bisection (linear, ratio ½) < secant (order ≈ 1.618) < Newton (quadratic, order 2). The speed order exactly mirrors how much local information each uses: none (just signs) → estimated slope (two points) → exact slope (derivative). More information per step = faster convergence = more conditions to satisfy.",
          xpReward: 25
        },
        {
          id: "q-math6-024",
          type: "mcq",
          question: "f(x) is available only as tabulated experimental data (no formula). A root estimate is needed quickly and no sign-change bracket is known. The most suitable method is:",
          options: [
            "Newton-Raphson — differentiate the data table",
            "Bisection — it is always the safest choice",
            "Secant — derivative-free and needs no bracket, just two starting points",
            "None — root-finding requires an analytic formula"
          ],
          answer: 2,
          explanation: "Secant. Newton needs an analytic f′ (unavailable from a table without introducing extra differentiation error); bisection needs a sign-change bracket (not known here). Secant runs off two data points directly. Method-selection questions reward matching each method's requirements to what the problem actually provides.",
          xpReward: 25
        },
        {
          id: "q-math6-025",
          type: "match",
          question: "Match each method to its defining requirement/property.",
          pairs: [
            { term: "Bisection",       definition: "Sign-change bracket required; convergence guaranteed; slowest" },
            { term: "Newton-Raphson",  definition: "Analytic derivative required; quadratic convergence; can diverge" },
            { term: "Secant",          definition: "Two guesses, no derivative, no bracket; order ≈ 1.618" },
            { term: "All three",       definition: "Stop when |xₙ₊₁ − xₙ| < ε (successive-difference criterion)" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete comparison table in four rows — reproduce it from memory before the exam. Requirements: bracket / derivative / neither. Speed: ½-rate linear / quadratic / golden-ratio. Guarantee: yes / no / no. Stopping: the same ε criterion serves all three (bisection can also pre-compute n).",
          xpReward: 25
        }
      ]
    }
  ]
};
