/**
 * data/math-chapter9-data.js
 * Chapter 9 — Numerical Differentiation (SECI1113)
 * Global: window.mathChapter9Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.mathChapter9Data = {
  id: "math-chapter9",
  key: "math9",
  title: "Chapter 9: Numerical Differentiation",
  heroTitle: "Numerical Differentiation",
  heroDesc: "Estimate f′(x) from discrete data using finite differences. Two-point forward/backward formulas for " +
    "boundaries (O(h)), the three-point central formula for interior points (O(h²)), and the truncation-vs-rounding " +
    "trade-off that makes 'smaller h' NOT always better.",
  statusLabel: "CHAPTER 9 — NUMERICAL DIFFERENTIATION",
  nextChapter: { label: "Chapter 10: Numerical Integration", href: "math-chapter10.html" },
  completeText: "You can apply forward, backward, and central difference formulas, choose the right one by position, and explain the optimal-h trade-off.",

  sections: [

    /* ───────────────── SECTION 1 — 2-Point Formulas ───────────────── */
    {
      id: "math9-finite-diff",
      title: "Forward & Backward Differences",
      subtitle: "Taylor-series origin · f′ ≈ [f(x+h) − f(x)]/h · O(h) error · Boundary use",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "All finite-difference formulas come from truncating <strong>Taylor series</strong>. Expanding " +
          "f(x+h) = f(x) + hf′(x) + (h²/2)f″(x) + … and solving for f′(x) while discarding higher terms gives the " +
          "<strong>forward difference</strong> f′(x) ≈ [f(x+h) − f(x)]/h with error O(h). The <strong>backward difference</strong> " +
          "[f(x) − f(x−h)]/h is its mirror. Both are 2-point, first-order formulas — halving h only halves the error. " +
          "They matter at <em>data boundaries</em> where only one side is available.",
        formula: "Forward:  f′(xᵢ) ≈ [f(xᵢ+h) − f(xᵢ)]/h   ·   Backward:  f′(xᵢ) ≈ [f(xᵢ) − f(xᵢ−h)]/h   (both O(h))",
        bullets: [
          "Derived by truncating the Taylor expansion after the linear term — the discarded remainder is the truncation error",
          "Forward difference: uses the CURRENT and NEXT points → apply at the LEFT boundary of data",
          "Backward difference: uses the CURRENT and PREVIOUS points → apply at the RIGHT boundary",
          "Error order O(h): halving h halves the error (slow first-order improvement)",
          "Geometric meaning: slope of the secant line between two adjacent samples",
          "Discrete twin of the derivative definition — with h kept finite instead of h → 0"
        ],
        analogy: "Estimating the slope of a hill by looking at one nearby point. Look ahead (forward) or look behind (backward) — either way you get the average slope over one stride, not the exact slope under your feet. Stand at the left edge of a cliff-side trail and you can ONLY look ahead; at the right edge, only behind. That is exactly when the one-sided formulas earn their keep."
      },
      workedExample: {
        problem: "f(x) = √x sampled at x = 1.00, 1.05, 1.10 (h = 0.05): f = 1.00000, 1.02470, 1.04881. Estimate f′(1.05) with the forward and backward differences and compare with the exact value.",
        steps: [
          "<strong>Forward:</strong> f′(1.05) ≈ [f(1.10) − f(1.05)]/0.05 = (1.04881 − 1.02470)/0.05 = <strong>0.4822</strong>",
          "<strong>Backward:</strong> f′(1.05) ≈ [f(1.05) − f(1.00)]/0.05 = (1.02470 − 1.00000)/0.05 = <strong>0.4940</strong>",
          "<strong>Exact:</strong> f′(x) = 1/(2√x) → f′(1.05) = 1/(2·1.02470) ≈ <strong>0.4879</strong>",
          "<strong>Errors:</strong> forward −0.0057, backward +0.0061 — opposite signs, similar size. (Their average, 0.4881, is the central difference — next section.)"
        ],
        note: "Forward under-estimates and backward over-estimates here because √x is concave — the sign of f″ controls which side each formula errs on."
      },
      quiz: [
        {
          id: "q-math9-001",
          type: "calc",
          question: "f(2.0) = 0.693 and f(2.1) = 0.742 (h = 0.1). Estimate f′(2.0) with the 2-point FORWARD difference (3 decimal places).",
          setup: "f′(2.0) ≈ [f(2.1) − f(2.0)] / h = (0.742 − 0.693) / 0.1",
          hint: "Difference of f-values divided by h",
          answer: 0.49,
          tolerance: 0.005,
          unit: "≈",
          calcType: "numeric",
          explanation: "(0.742 − 0.693)/0.1 = 0.049/0.1 = 0.490. The data is f(x) = ln(x); the exact derivative is 1/2 = 0.500, so the O(h) forward formula errs by 0.010 with h = 0.1. Forward is the right choice here IF x = 2.0 is the left edge of the data — no earlier point exists to look back at.",
          xpReward: 35
        },
        {
          id: "q-math9-002",
          type: "calc",
          question: "f(2.1) = 0.742 and f(2.2) = 0.788. Estimate f′(2.2) using the 2-point BACKWARD difference (3 decimal places).",
          setup: "f′(2.2) ≈ [f(2.2) − f(2.1)] / h = (0.788 − 0.742) / 0.1",
          hint: "Current minus previous, divided by h",
          answer: 0.46,
          tolerance: 0.005,
          unit: "≈",
          calcType: "numeric",
          explanation: "(0.788 − 0.742)/0.1 = 0.460. Exact: 1/2.2 ≈ 0.4545 — error ≈ 0.0055. Backward is forced at the RIGHT boundary (x = 2.2 is the last sample; there is no f(2.3) to look forward to). Boundary position dictates formula choice — a recurring exam theme.",
          xpReward: 35
        },
        {
          id: "q-math9-003",
          type: "mcq",
          question: "The finite-difference formulas for f′(x) are derived from:",
          options: [
            "The quadratic formula",
            "Truncating Taylor series expansions of f around x",
            "Integrating f between two samples",
            "The characteristic polynomial of a matrix"
          ],
          answer: 1,
          explanation: "Taylor series. Expand f(x+h) about x, solve for f′(x), discard higher-order terms — the discarded remainder IS the truncation error, and how fast it shrinks with h sets the accuracy order (O(h) for 2-point, O(h²) for central). Knowing the derivation lets you reconstruct any formula you forget.",
          xpReward: 25
        },
        {
          id: "q-math9-004",
          type: "truefalse",
          question: "The 2-point forward difference has error O(h), meaning halving the step size h halves the truncation error.",
          answer: 0,
          explanation: "True. First-order accuracy: error ∝ h, so h → h/2 gives error/2. Compare with the central difference's O(h²), where halving h QUARTERS the error — the reason central is preferred whenever both neighbours are available. Order-of-accuracy bookkeeping is the connective tissue of chapters 9 and 10.",
          xpReward: 25
        },
        {
          id: "q-math9-005",
          type: "mcq",
          question: "At the very first data point of a table (no earlier samples exist), which derivative formula must be used?",
          options: [
            "Central difference — it is always the most accurate",
            "Backward difference — it looks at the previous point",
            "Forward difference — only the next point is available",
            "None — the derivative cannot be estimated at a boundary"
          ],
          answer: 2,
          explanation: "Forward difference. The central formula needs f(x−h) and f(x+h) — but there IS no x−h at the left boundary; backward has the same problem. One-sided formulas exist precisely for boundaries: forward at the left edge, backward at the right edge, central everywhere in between.",
          xpReward: 25
        },
        {
          id: "q-math9-006",
          type: "fillblank",
          question: "Geometrically, the 2-point difference formulas approximate the tangent slope by the slope of a ______ line through two nearby samples.",
          answer: "secant",
          explanation: "Secant line. The derivative is the tangent's slope; with only discrete samples we settle for the average slope between two of them. As h shrinks the secant swings toward the tangent — the derivative definition made computational, error and all.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Central Difference & Optimal h ───────────────── */
    {
      id: "math9-central",
      title: "Central Difference & the Optimal h",
      subtitle: "f′ ≈ [f(x+h) − f(x−h)]/(2h) · O(h²) · Truncation vs rounding — smaller h isn't always better",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "Averaging the forward and backward Taylor expansions cancels the O(h) terms, giving the 3-point " +
          "<strong>central difference</strong> f′(x) ≈ [f(x+h) − f(x−h)]/(2h) with error <strong>O(h²)</strong> — halving h " +
          "quarters the error, at the same cost of two function values. It is the default for interior points. " +
          "But h cannot shrink forever: subtracting nearly equal f-values amplifies <strong>rounding error</strong> " +
          "(∝ 1/h), while truncation error shrinks (∝ h²). Total error is U-shaped in h — an <strong>optimal step size</strong> exists.",
        formula: "Central:  f′(xᵢ) ≈ [f(xᵢ+h) − f(xᵢ−h)] / (2h)   — error O(h²)",
        bullets: [
          "Derivation: subtract the Taylor expansions of f(x+h) and f(x−h) — the even-order terms cancel",
          "O(h²): halving h reduces truncation error by factor 4 (vs 2 for one-sided formulas)",
          "Note the denominator is 2h, not h — the points straddle xᵢ symmetrically",
          "Default choice for interior points; one-sided formulas only at boundaries",
          "Too-small h: f(x+h) ≈ f(x−h) → catastrophic cancellation, rounding noise amplified by 1/(2h)",
          "Total error = truncation (∝ h²) + rounding (∝ 1/h) → U-shaped curve → optimal h in between",
          "5-point formulas push accuracy to O(h⁴) using the same central-cancellation idea"
        ],
        analogy: "Measuring a hill's slope by looking one stride ahead AND one stride behind, then averaging. The look-ahead error and look-behind error lean opposite ways (one over, one under), so averaging cancels most of both — that's the O(h) → O(h²) upgrade. But shrink your strides too far and your boot-level altimeter noise dominates the tiny height differences: at some stride length, precision peaks. Smaller steps are NOT always better."
      },
      workedExample: {
        problem: "f(x) = √x with f(1.00) = 1.00000, f(1.10) = 1.04881 (h = 0.05 around x = 1.05). Estimate f′(1.05) with the central difference and compare all three formulas.",
        steps: [
          "<strong>Central:</strong> f′(1.05) ≈ [f(1.10) − f(1.00)]/(2×0.05) = (1.04881 − 1.00000)/0.10 = <strong>0.4881</strong>",
          "<strong>Exact:</strong> f′(1.05) = 1/(2√1.05) ≈ <strong>0.4879</strong>",
          "<strong>Compare errors:</strong> forward 0.4822 (err −0.0057) · backward 0.4940 (err +0.0061) · central 0.4881 (err <strong>+0.0002</strong>)",
          "<strong>Conclusion:</strong> central is ~30× more accurate here at identical cost (two f-values) — the O(h²) cancellation at work"
        ],
        note: "Central is also the average of the forward and backward estimates: (0.4822 + 0.4940)/2 = 0.4881 — the opposite-sign errors cancel."
      },
      quiz: [
        {
          id: "q-math9-007",
          type: "calc",
          question: "f(2.0) = 0.693, f(2.1) = 0.742, f(2.2) = 0.788. Estimate f′(2.1) with the 3-point CENTRAL difference (3 decimal places).",
          setup: "f′(2.1) ≈ [f(2.2) − f(2.0)] / (2h) = (0.788 − 0.693) / (2 × 0.1)",
          hint: "Denominator is 2h = 0.2, and f(2.1) itself is not used",
          answer: 0.475,
          tolerance: 0.005,
          unit: "≈",
          calcType: "numeric",
          explanation: "(0.788 − 0.693)/0.2 = 0.095/0.2 = 0.475. Exact (f = ln x): 1/2.1 ≈ 0.4762 — error only 0.0012, versus ~0.01 for the one-sided formulas on the same data. Two details examiners test: the denominator is 2h, and the middle value f(2.1) does not appear in the formula.",
          xpReward: 35
        },
        {
          id: "q-math9-008",
          type: "mcq",
          question: "Why is the central difference O(h²) while forward/backward are only O(h)?",
          options: [
            "It uses three times as many function evaluations",
            "Subtracting the two symmetric Taylor expansions cancels the first-order error terms",
            "It divides by 2h, which halves any error",
            "It requires the function to be linear"
          ],
          answer: 1,
          explanation: "Symmetric cancellation. f(x+h) and f(x−h) have identical O(h) error terms with opposite signs; subtracting annihilates them, leaving O(h²) as the leading error. Same two function values as a one-sided formula — the accuracy is free, coming purely from symmetric placement. (Dividing by 2h is bookkeeping, not magic.)",
          xpReward: 25
        },
        {
          id: "q-math9-009",
          type: "mcq",
          question: "As h is made smaller and smaller in the central difference (with fixed floating-point precision), the TOTAL error:",
          options: [
            "Decreases monotonically to zero — smaller h is always better",
            "First decreases (truncation shrinks) then INCREASES (rounding noise amplified by 1/h) — a U-shaped curve with an optimal h",
            "Stays constant — h has no effect on error",
            "Increases monotonically from the start"
          ],
          answer: 1,
          explanation: "U-shaped. Truncation error falls as h² but the subtraction f(x+h) − f(x−h) of nearly equal numbers loses significant digits, and dividing by 2h amplifies that noise as 1/h. Below the optimal h, rounding dominates and answers get WORSE. This truncation-vs-rounding trade-off (from Chapter 5) is the single most important concept of this chapter.",
          xpReward: 25
        },
        {
          id: "q-math9-010",
          type: "truefalse",
          question: "The central difference formula for f′(xᵢ) uses the function value f(xᵢ) itself.",
          answer: 1,
          explanation: "False. Central uses only the two NEIGHBOURS: [f(xᵢ+h) − f(xᵢ−h)]/(2h) — the centre value cancels out of the subtracted Taylor expansions. Writing f(xᵢ) into the formula (or using h instead of 2h in the denominator) are the two standard slip-ups.",
          xpReward: 25
        },
        {
          id: "q-math9-011",
          type: "calc",
          question: "The central difference has error O(h²). If the error is 0.008 at h = 0.2, roughly what error is expected at h = 0.1?",
          setup: "O(h²): halving h divides the error by 2² = 4\nExpected error ≈ 0.008 / 4",
          hint: "Quarter the error",
          answer: 0.002,
          tolerance: 0.0005,
          unit: "≈",
          calcType: "numeric",
          explanation: "0.008/4 = 0.002. Order-of-accuracy arithmetic: O(h²) → halving h quarters the error (a one-sided O(h) formula would only halve it to 0.004). This 'predict the error after refining h' calculation is a staple exam question — and the same logic returns for integration rules in Chapter 10.",
          xpReward: 35
        },
        {
          id: "q-math9-012",
          type: "match",
          question: "Match each formula to its properties.",
          pairs: [
            { term: "Forward [f(x+h) − f(x)]/h",        definition: "O(h) — use at the LEFT data boundary" },
            { term: "Backward [f(x) − f(x−h)]/h",       definition: "O(h) — use at the RIGHT data boundary" },
            { term: "Central [f(x+h) − f(x−h)]/(2h)",   definition: "O(h²) — preferred for interior points" },
            { term: "5-point formulas",                  definition: "O(h⁴) — higher accuracy from more samples" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The formula-selection table: position dictates the choice (boundaries force one-sided; interiors deserve central), and more symmetric points buy higher error order. Reproduce this table and the U-curve story and you have the whole chapter.",
          xpReward: 25
        }
      ]
    }
  ]
};
