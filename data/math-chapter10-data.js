/**
 * data/math-chapter10-data.js
 * Chapter 10 — Numerical Integration (SECI1113 Computational Mathematics)
 *
 * Consumed by math-chapter10.html via <script src="data/math-chapter10-data.js">
 * Schema mirrors CLAUDE.md §5 Data Schema spec (math variant).
 *
 * Question types used: mcq | truefalse | fillblank | match | calc
 * Pedagogy: Recall → Procedure (calc) → Concept, per CLAUDE.md §7.4
 *
 * Global: window.mathChapter10Data
 */

window.mathChapter10Data = {
  id: "math-chapter10",
  title: "Chapter 10: Numerical Integration",

  sections: [

    /* ─────────────────────────────────────────────────────────────
       SECTION 1 — Trapezoidal Rule
    ───────────────────────────────────────────────────────────── */
    {
      id: "math10-trapezoidal",
      title: "Trapezoidal Rule",
      xpReward: 10,
      content: {
        summary: "The composite trapezoidal rule approximates ∫ₐᵇ f(x) dx by dividing [a, b] into N equal subintervals of width h = (b−a)/N, then summing the area of N trapezoids — one per subinterval. Each trapezoid has a sloped top connecting f(xₖ) to f(xₖ₊₁), giving a piecewise-linear approximation to the curve. Interior nodes are counted in two adjacent trapezoids and therefore receive weight 2; endpoints x₀ and xₙ appear only once and receive weight 1.",
        bullets: [
          "Formula: ∫ₐᵇ f(x) dx ≈ (h/2) [f₀ + 2f₁ + 2f₂ + … + 2fₙ₋₁ + fₙ]",
          "Step size: h = (b − a) / N  (N subintervals, N+1 equally-spaced nodes)",
          "Endpoint weights: 1  ·  Interior node weights: 2",
          "Error order: O(h²) — halving h reduces truncation error by factor of 4",
          "Works when f is only known at discrete tabulated values (no closed-form needed)",
          "N can be any positive integer — no parity constraint"
        ],
        analogy: "Paint rollers of different widths. One wide roller across a curved surface — big gaps. Switch to many narrow rollers placed edge-to-edge: together their flat tops follow the curve closely. Each roller is a trapezoid; more (narrower) rollers = smaller h = better approximation.",
        formula: "(h/2)[f₀ + 2f₁ + 2f₂ + … + 2fₙ₋₁ + fₙ]",
        visual: null
      },
      quiz: [

        /* ── RECALL ───────────────────────────────────────────────── */

        {
          id: "q-math10-001",
          type: "mcq",
          question: "What geometric shape does the composite trapezoidal rule use to approximate the area under f(x) on each subinterval?",
          options: [
            "A rectangle whose height equals the left-endpoint function value",
            "A trapezoid formed by connecting f(xₖ) and f(xₖ₊₁) with a straight line",
            "A parabola fitted through three consecutive node values",
            "A semicircle whose diameter spans the subinterval"
          ],
          answer: 1,
          explanation: "A trapezoid has two parallel sides (the vertical function values at xₖ and xₖ₊₁) and a sloped top connecting them — a straight-line approximation to the curve. This is the defining choice of the trapezoidal rule. Parabolas are used by Simpson's rule; rectangles belong to Riemann sum methods.",
          xpReward: 25
        },

        {
          id: "q-math10-002",
          type: "mcq",
          question: "For the composite trapezoidal rule over [a, b] with N equal subintervals, the step size h is:",
          options: [
            "h = N / (b − a)",
            "h = (b − a) × N",
            "h = (b − a) / N",
            "h = (b − a) / (N − 1)"
          ],
          answer: 2,
          explanation: "Dividing the interval width (b − a) by the number of subintervals N gives the width of each equal piece. With h = (b − a)/N, node positions are xₖ = a + k·h for k = 0, 1, …, N.",
          xpReward: 25
        },

        {
          id: "q-math10-003",
          type: "mcq",
          question: "In the composite trapezoidal formula (h/2)[f₀ + 2f₁ + 2f₂ + … + 2fₙ₋₁ + fₙ], which nodes receive a coefficient of 2?",
          options: [
            "Only the first interior node f₁",
            "The two endpoints f₀ and fₙ",
            "All interior nodes f₁ through fₙ₋₁",
            "Alternate nodes (f₁, f₃, f₅, …)"
          ],
          answer: 2,
          explanation: "Each interior node is the right edge of one trapezoid and the left edge of the next — it appears in two consecutive trapezoids. When the N individual trapezoid areas are summed, each interior node contributes twice, giving coefficient 2. The two endpoints x₀ and xₙ each appear in only one trapezoid, so they have coefficient 1.",
          xpReward: 25
        },

        {
          id: "q-math10-004",
          type: "truefalse",
          question: "Halving the step size h in the composite trapezoidal rule reduces the truncation error by a factor of exactly 4.",
          answer: 0,
          explanation: "True. The trapezoidal rule has O(h²) truncation error. If h is replaced by h/2, the new error is proportional to (h/2)² = h²/4 — exactly one-quarter of the original. This is the practical test for O(h²) convergence: run N and 2N, and the error ratio should be approximately 4.",
          xpReward: 25
        },

        {
          id: "q-math10-005",
          type: "fillblank",
          question: "In the composite trapezoidal formula, each interior node (f₁ through fₙ₋₁) is multiplied by a weight of ______.",
          answer: "2",
          explanation: "Interior nodes appear as the right boundary of one trapezoid AND the left boundary of the next. Summing both trapezoid areas counts each interior node twice, producing the weight 2 in the formula (h/2)[f₀ + 2f₁ + … + 2fₙ₋₁ + fₙ].",
          xpReward: 25
        },

        /* ── PROCEDURE ────────────────────────────────────────────── */

        {
          id: "q-math10-006",
          type: "calc",
          question: "Approximate ∫₀² x² dx using the composite trapezoidal rule with N = 4 subintervals.",
          setup: "f(x) = x²  ·  a = 0, b = 2, N = 4\nh = (2 − 0) / 4 = 0.5\n\nNodes and f-values:\n  x₀ = 0.0  →  f₀ = 0.0000\n  x₁ = 0.5  →  f₁ = 0.2500\n  x₂ = 1.0  →  f₂ = 1.0000\n  x₃ = 1.5  →  f₃ = 2.2500\n  x₄ = 2.0  →  f₄ = 4.0000",
          hint: "Formula: (h/2) [f₀ + 2(f₁ + f₂ + f₃) + f₄]",
          answer: 2.75,
          tolerance: 0.01,
          unit: "approx",
          calcType: "numeric",
          explanation: "Step 1 — h = 0.5.\nStep 2 — Sum of interior nodes: 0.25 + 1.00 + 2.25 = 3.50.\nStep 3 — Apply formula: (0.5/2)[0 + 2(3.50) + 4.0] = 0.25 × [0 + 7.0 + 4.0] = 0.25 × 11.0 = 2.75.\nExact value: ∫₀² x² dx = [x³/3]₀² = 8/3 ≈ 2.6667. Error ≈ 0.0833. Doubling N to 8 would shrink the error to ≈ 0.0208 (one quarter), confirming O(h²).",
          xpReward: 35
        },

        /* ── CONCEPTUAL ───────────────────────────────────────────── */

        {
          id: "q-math10-007",
          type: "mcq",
          question: "The truncation error of the composite trapezoidal rule is classified as:",
          options: [
            "O(h)  — error halves each time h halves",
            "O(h²) — error quarters each time h halves",
            "O(h³) — error decreases by factor 8 each time h halves",
            "O(h⁴) — error decreases by factor 16 each time h halves"
          ],
          answer: 1,
          explanation: "The trapezoidal rule uses a linear (degree-1) approximation per subinterval. The local per-interval error is O(h³), which sums over N = (b−a)/h intervals to give a global error of O(h²). Practically: halve h → error divides by 4. Simpson's rule (parabolic) achieves O(h⁴).",
          xpReward: 25
        },

        {
          id: "q-math10-008",
          type: "match",
          question: "Match each component of the trapezoidal rule to its role.",
          pairs: [
            { term: "h = (b−a)/N",           definition: "Width of each equal subinterval" },
            { term: "Weight 1 (endpoints)",   definition: "f₀ and fₙ appear in only one trapezoid each" },
            { term: "Weight 2 (interior)",    definition: "f₁ through fₙ₋₁ each shared by two adjacent trapezoids" },
            { term: "O(h²) error",            definition: "Halving h reduces the truncation error by a factor of 4" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Each piece of the formula has a geometric reason: h sets the trapezoid width; endpoint weights of 1 reflect single-trapezoid membership; interior weights of 2 reflect double-membership; the O(h²) order follows from the degree-1 polynomial approximation — one order higher than a simple rectangle (O(h)).",
          xpReward: 25
        }

      ]
    },

    /* ─────────────────────────────────────────────────────────────
       SECTION 2 — Simpson's Rule
    ───────────────────────────────────────────────────────────── */
    {
      id: "math10-simpsons",
      title: "Simpson's 1/3 Rule",
      xpReward: 10,
      content: {
        summary: "Simpson's 1/3 rule fits a parabola (degree-2 polynomial) through every consecutive triplet of equally-spaced nodes, then integrates that parabola exactly. Processing triplets means N must be even. The middle node of each triplet receives coefficient 4 (it controls the parabola's curvature); the two endpoint nodes receive 1; true interior shared nodes alternate between 4 and 2. The resulting O(h⁴) error is four orders better than the trapezoidal O(h²) — halving h reduces Simpson's error by a factor of 16.",
        bullets: [
          "Formula: ∫ₐᵇ f(x) dx ≈ (h/3)[f₀ + 4f₁ + 2f₂ + 4f₃ + 2f₄ + … + 4fₙ₋₁ + fₙ]",
          "Coefficient pattern: 1, 4, 2, 4, 2, …, 4, 1  (endpoints 1; alternating 4 and 2 inside)",
          "Constraint: N must be even (pairs of subintervals per parabola)",
          "Error order: O(h⁴) — halving h reduces error by factor of 16",
          "Middle node weight 4 because it anchors the parabola's bend — small changes there have largest effect",
          "For smooth functions at the same h, Simpson's is far more accurate than trapezoidal"
        ],
        analogy: "Trapezoidal rule = connecting dots with a ruler (straight lines). Simpson's rule = using a flexible curve template that bends to pass through three dots at once. The flexible template (parabola) captures the curvature of f that straight lines ignore entirely — the extra bend makes the area estimate dramatically more accurate.",
        formula: "(h/3)[f₀ + 4f₁ + 2f₂ + 4f₃ + … + 4fₙ₋₁ + fₙ]",
        visual: null
      },
      quiz: [

        /* ── RECALL ───────────────────────────────────────────────── */

        {
          id: "q-math10-009",
          type: "mcq",
          question: "Simpson's 1/3 rule achieves higher accuracy than the trapezoidal rule because it fits what type of polynomial over each pair of subintervals?",
          options: [
            "A linear polynomial (degree 1) connecting two endpoint values",
            "A quadratic polynomial (parabola) through three equally-spaced points",
            "A cubic polynomial (degree 3) through four consecutive nodes",
            "A trigonometric function that exactly matches f(x) locally"
          ],
          answer: 1,
          explanation: "A quadratic (degree-2) polynomial through three points can reproduce the curvature of f(x) within each two-subinterval group. This is one polynomial degree higher than the trapezoidal rule (degree 1), which is why the error drops from O(h²) to O(h⁴) — two orders of magnitude improvement per halving of h.",
          xpReward: 25
        },

        {
          id: "q-math10-010",
          type: "mcq",
          question: "In the basic three-point Simpson's formula (h/3)[f₀ + 4f₁ + f₂], what is the coefficient of the middle node f₁?",
          options: ["1", "2", "3", "4"],
          answer: 3,
          explanation: "The middle point f₁ controls the curvature (the 'bend') of the fitted parabola. A small change in f₁ has the largest influence on the integral, so it receives the highest weight — 4. The two endpoint values f₀ and f₂ each receive weight 1. The sum of coefficients is 1 + 4 + 1 = 6, and (h/3) × 6 × average_f reproduces the average correctly.",
          xpReward: 25
        },

        {
          id: "q-math10-011",
          type: "mcq",
          question: "For composite Simpson's 1/3 rule to be applied directly, the number of subintervals N must satisfy which constraint?",
          options: [
            "N must be odd",
            "N must be divisible by 3",
            "N must be even",
            "N can be any positive integer"
          ],
          answer: 2,
          explanation: "Simpson's rule processes subintervals in pairs — each parabola covers two subintervals (three nodes). If N is odd, the last subinterval cannot form a complete pair and cannot be processed by the standard formula. N must be even. (If N is odd, one subinterval is sometimes handled with the trapezoidal rule as a correction.)",
          xpReward: 25
        },

        {
          id: "q-math10-012",
          type: "truefalse",
          question: "Halving the step size h in composite Simpson's 1/3 rule reduces the truncation error by a factor of 16.",
          answer: 0,
          explanation: "True. Simpson's rule has O(h⁴) error. When h is halved: (h/2)⁴ = h⁴/16 — exactly one-sixteenth of the original error. Compare with the trapezoidal rule: halving h there gives only a factor-of-4 reduction (O(h²)). This is why Simpson's rule is almost always preferred for smooth functions.",
          xpReward: 25
        },

        {
          id: "q-math10-013",
          type: "mcq",
          question: "For N = 6 subintervals, what is the correct coefficient pattern for composite Simpson's 1/3 rule?",
          options: [
            "1, 2, 2, 2, 2, 2, 1",
            "1, 4, 4, 4, 4, 4, 1",
            "1, 4, 2, 4, 2, 4, 1",
            "1, 2, 4, 2, 4, 2, 1"
          ],
          answer: 2,
          explanation: "The composite pattern is always: 1 (left endpoint), then alternating 4, 2 for interior nodes, ending with 4 (second-to-last node), then 1 (right endpoint). For N = 6 nodes are f₀ … f₆: weights are 1, 4, 2, 4, 2, 4, 1. Every 'middle' of a parabola group gets 4; every node shared between two groups gets 2; endpoints get 1.",
          xpReward: 25
        },

        /* ── PROCEDURE ────────────────────────────────────────────── */

        {
          id: "q-math10-014",
          type: "calc",
          question: "Approximate ∫₀¹ eˣ dx using composite Simpson's 1/3 rule with N = 4 subintervals. Give your answer to 4 decimal places.",
          setup: "f(x) = eˣ  ·  a = 0, b = 1, N = 4  (N is even ✓)\nh = (1 − 0) / 4 = 0.25\n\nNodes and f-values:\n  x₀ = 0.00  →  f₀ = 1.0000\n  x₁ = 0.25  →  f₁ ≈ 1.2840\n  x₂ = 0.50  →  f₂ ≈ 1.6487\n  x₃ = 0.75  →  f₃ ≈ 2.1170\n  x₄ = 1.00  →  f₄ ≈ 2.7183\n\nCoefficients: 1, 4, 2, 4, 1",
          hint: "Formula: (h/3)[f₀ + 4f₁ + 2f₂ + 4f₃ + f₄]",
          answer: 1.7183,
          tolerance: 0.001,
          unit: "approx",
          calcType: "numeric",
          explanation: "(0.25/3)[1.0000 + 4(1.2840) + 2(1.6487) + 4(2.1170) + 2.7183]\n= (0.25/3)[1.0000 + 5.1360 + 3.2974 + 8.4680 + 2.7183]\n= (0.25/3)[20.6197]\n= 0.08333 × 20.6197\n≈ 1.7183.\n\nExact value: e − 1 ≈ 1.71828. Error ≈ 0.00002. For comparison, the trapezoidal rule with N = 4 gives ≈ 1.7272, error ≈ 0.009 — Simpson's is ~450× more accurate at the same step size.",
          xpReward: 35
        },

        /* ── CONCEPTUAL ───────────────────────────────────────────── */

        {
          id: "q-math10-015",
          type: "mcq",
          question: "Why must N be even for composite Simpson's 1/3 rule?",
          options: [
            "The formula divides by 3, so N must be divisible by 3 to avoid fractions",
            "Each parabola requires three nodes spanning two subintervals, so subintervals must pair up evenly",
            "An even N ensures all node weights are whole numbers",
            "The error term O(h⁴) only applies when N is even"
          ],
          answer: 1,
          explanation: "Each parabola is fitted through three consecutive nodes (xₖ, xₖ₊₁, xₖ₊₂), which spans exactly two subintervals. The composite rule processes these non-overlapping triplets across [a, b]. If N were odd, the last subinterval would not complete a pair and cannot be covered by the standard formula. The even-N constraint is purely about how the parabola-fitting groups divide the interval.",
          xpReward: 25
        },

        {
          id: "q-math10-016",
          type: "mcq",
          question: "Using composite Simpson's 1/3 rule with N = 6 subintervals, how many equally-spaced nodes (including both endpoints) are required?",
          options: ["6", "7", "8", "12"],
          answer: 1,
          explanation: "The number of nodes is always N + 1: one node at each subinterval boundary plus the starting endpoint. For N = 6 subintervals: 6 + 1 = 7 nodes (x₀, x₁, x₂, x₃, x₄, x₅, x₆). This formula applies to both trapezoidal and Simpson's rules.",
          xpReward: 25
        }

      ]
    },

    /* ─────────────────────────────────────────────────────────────
       SECTION 3 — Error Analysis & Method Comparison
    ───────────────────────────────────────────────────────────── */
    {
      id: "math10-comparison",
      title: "Error Analysis & Method Comparison",
      xpReward: 10,
      content: {
        summary: "Choosing between the trapezoidal rule and Simpson's rule depends on three factors: accuracy needed, available node count, and function smoothness. Simpson's rule always wins on accuracy for smooth functions at the same step size — O(h⁴) vs O(h²) means halving h shrinks the error by 16× (Simpson's) versus only 4× (trapezoidal). However, if N happens to be odd, only the trapezoidal rule applies directly. For non-smooth or experimental data with limited points, the trapezoidal rule is the safer, more flexible choice.",
        bullets: [
          "Same h, smooth function: Simpson's error ≈ (h⁴/180)(b−a) · f⁽⁴⁾(ξ)  vs trapezoidal ≈ (h²/12)(b−a) · f″(ξ)",
          "Halving h: Simpson's error shrinks ×16; trapezoidal error shrinks ×4",
          "Simpson's requires N even; trapezoidal works for any N ≥ 1",
          "Rule of thumb: if N is odd or data is irregular, use trapezoidal; otherwise prefer Simpson's",
          "Practical test for O(h²): run N=4 then N=8 — if the error ratio is ≈ 4, it's O(h²)",
          "Practical test for O(h⁴): run N=4 then N=8 — if error ratio is ≈ 16, it's O(h⁴)"
        ],
        analogy: "Speed cameras vs radar guns. The trapezoidal rule is a roadside speed sign that shows speed at fixed snapshots — decent but misses acceleration. Simpson's rule is a radar gun tracking the car's actual curve of motion — far more precise at the same sampling rate. But the radar gun needs pairs of readings; if you only have one reading left over, you fall back to the speed sign.",
        formula: null,
        visual: null
      },
      quiz: [

        /* ── CONCEPTUAL ───────────────────────────────────────────── */

        {
          id: "q-math10-017",
          type: "mcq",
          question: "For the same step size h applied to a smooth function, which method gives the more accurate integral approximation?",
          options: [
            "Trapezoidal rule — it avoids the even-N constraint so it can use more subintervals",
            "Simpson's 1/3 rule — its O(h⁴) error is much smaller than the trapezoidal O(h²)",
            "They are always equally accurate when N is the same",
            "It depends only on the specific function, not the method"
          ],
          answer: 1,
          explanation: "At the same h, the error ratio Simpson's/Trapezoidal ≈ (h⁴)/(h²) = h² — for small h this is very small. For ∫₀¹ eˣ dx with N = 4: trapezoidal error ≈ 0.009, Simpson's error ≈ 0.00002 (about 450× smaller). The parabolic approximation simply captures curvature that the straight-line approximation misses entirely.",
          xpReward: 25
        },

        {
          id: "q-math10-018",
          type: "mcq",
          question: "If you halve the step size h, by what factor does each method's truncation error decrease?",
          options: [
            "Trapezoidal: factor 2  ·  Simpson's: factor 4",
            "Trapezoidal: factor 4  ·  Simpson's: factor 8",
            "Trapezoidal: factor 4  ·  Simpson's: factor 16",
            "Trapezoidal: factor 16  ·  Simpson's: factor 4"
          ],
          answer: 2,
          explanation: "Error order determines the reduction factor when h → h/2:\n• Trapezoidal O(h²): (h/2)² = h²/4  →  factor of 4\n• Simpson's O(h⁴): (h/2)⁴ = h⁴/16  →  factor of 16\nThis is why Simpson's converges so much faster — each time you double N, you get 16× improvement rather than 4×.",
          xpReward: 25
        },

        {
          id: "q-math10-019",
          type: "truefalse",
          question: "The composite trapezoidal rule can be applied with any positive integer value of N — even or odd.",
          answer: 0,
          explanation: "True. Unlike Simpson's rule, the trapezoidal rule has no parity constraint. It processes one trapezoid per subinterval, so N can be 1, 2, 3, 4, 5, … whatever is convenient. This flexibility makes it the default choice when the number of data points is not guaranteed to be even.",
          xpReward: 25
        },

        {
          id: "q-math10-020",
          type: "mcq",
          question: "An engineer has experimental readings at 4 equally-spaced time points, giving N = 3 subintervals. Which integration method can be applied directly?",
          options: [
            "Composite Simpson's 1/3 rule only (N = 3 satisfies the parabola grouping)",
            "Composite trapezoidal rule only (N = 3 is odd; Simpson's requires even N)",
            "Both methods work equally well for N = 3",
            "Neither method applies — a minimum of N = 4 is required"
          ],
          answer: 1,
          explanation: "N = 3 is odd. Composite Simpson's 1/3 rule requires an even number of subintervals so that triplet-groups can be formed without remainder. With N = 3, there is no way to partition the three subintervals into complete pairs. The trapezoidal rule has no such constraint — it handles any N ≥ 1 directly.",
          xpReward: 25
        },

        /* ── PROCEDURE ────────────────────────────────────────────── */

        {
          id: "q-math10-021",
          type: "calc",
          question: "Using the trapezoidal rule with N = 2, the approximation of ∫₀¹ eˣ dx is 1.7539. The exact value is e − 1 ≈ 1.7183. What is the absolute error, rounded to 4 decimal places?",
          setup: "Trapezoidal approximation with N = 2:  T₂ = 1.7539\nExact value:  e − 1 ≈ 1.7183\n\nAbsolute error = |approximation − exact value|",
          hint: "Absolute error = |T₂ − exact|  (always positive)",
          answer: 0.0356,
          tolerance: 0.001,
          unit: "≈",
          calcType: "numeric",
          explanation: "|1.7539 − 1.7183| = |0.0356| = 0.0356.\n\nWith N = 2 and the trapezoidal rule: h = 0.5. Error ≈ 0.0356. Doubling to N = 4 (h = 0.25) should reduce the error by factor 4 → ≈ 0.0089, which matches the computed trapezoidal error for N = 4 (≈ 0.009), confirming the O(h²) relationship.",
          xpReward: 35
        },

        /* ── RECALL ───────────────────────────────────────────────── */

        {
          id: "q-math10-022",
          type: "match",
          question: "Match each integration method property to its correct description.",
          pairs: [
            { term: "Trapezoidal error order",  definition: "O(h²) — error quarters when h halves" },
            { term: "Simpson's error order",    definition: "O(h⁴) — error reduces by factor 16 when h halves" },
            { term: "N constraint",             definition: "Simpson's requires N even; trapezoidal accepts any N" },
            { term: "Polynomial degree used",   definition: "Degree 1 (trapezoidal) vs degree 2 (Simpson's) per group" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Both methods belong to Newton-Cotes integration. The trapezoidal rule is the degree-1 (linear) Newton-Cotes formula; Simpson's 1/3 rule is the degree-2 (quadratic) formula. Higher polynomial degree → better accuracy → stricter node constraints (even N) → higher-order error reduction. Always choose Simpson's when N is even and f is smooth; fall back to trapezoidal otherwise.",
          xpReward: 25
        },

        {
          id: "q-math10-023",
          type: "mcq",
          question: "Approximating ∫₁³ (1/x) dx with N = 4 (Simpson's rule gives 1.0987; exact = ln 3 ≈ 1.0986). Approximating the same integral with N = 4 using the trapezoidal rule gives 1.1111. Which conclusion is correct?",
          options: [
            "Both methods are equally accurate because they use the same N",
            "Trapezoidal is more accurate here because 1/x is a decreasing function",
            "Simpson's is far more accurate: its absolute error (0.0001) is about 125× smaller than the trapezoidal error (0.0125)",
            "The results cannot be compared because N is not large enough for either method"
          ],
          answer: 2,
          explanation: "Simpson's error ≈ |1.0987 − 1.0986| = 0.0001. Trapezoidal error ≈ |1.1111 − 1.0986| = 0.0125. Ratio ≈ 125×. This enormous accuracy gap at the same N illustrates the practical power of O(h⁴) over O(h²): the parabolic fit captures the curvature of 1/x that the linear fit misses. Note: f(x) = 1/x is smooth on [1, 3], which is why Simpson's performs so well.",
          xpReward: 25
        }

      ]
    }

  ]
};
