/**
 * data/math-chapter8-data.js
 * Chapter 8 — Interpolation & Approximation (SECI1113)
 * Global: window.mathChapter8Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.mathChapter8Data = {
  id: "math-chapter8",
  key: "math8",
  title: "Chapter 8: Interpolation",
  heroTitle: "Interpolation & Approximation",
  heroDesc: "Fit the unique polynomial through n+1 data points and estimate values between them. " +
    "Build difference tables, choose forward vs backward formulas by position in the table, " +
    "and compute Newton interpolation estimates by hand — the exact skills exam questions test.",
  statusLabel: "CHAPTER 8 — INTERPOLATION",
  nextChapter: { label: "Chapter 9: Numerical Differentiation", href: "math-chapter9.html" },
  completeText: "You can build difference tables, pick the right Newton formula for any target point, and compute interpolated estimates by hand.",

  sections: [

    /* ───────────────── SECTION 1 — Concept ───────────────── */
    {
      id: "math8-concept",
      title: "The Interpolation Problem",
      subtitle: "Unique degree ≤ n polynomial · Forward vs backward selection · Interpolation vs least squares",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "Given n+1 data pairs (x₀,y₀), …, (xₙ,yₙ) with distinct x-values, there exists <strong>exactly one</strong> " +
          "polynomial of degree ≤ n passing through all of them. That polynomial is a stand-in for the unknown function " +
          "between measured points — evaluate it anywhere in the data range to estimate intermediate values. " +
          "Newton's forward- and backward-difference formulas both produce this same polynomial (for equally spaced data); " +
          "they differ only in <em>which end of the table they anchor to</em>, which controls how quickly the terms shrink.",
        formula: "n+1 distinct points  ⟹  unique interpolating polynomial pₙ(x), degree ≤ n",
        bullets: [
          "x-values must be distinct; Newton forward/backward additionally require equal spacing h",
          "The polynomial passes EXACTLY through every data point: pₙ(xₖ) = yₖ",
          "Forward difference → target x near the BEGINNING of the table (anchor x₀)",
          "Backward difference → target x near the END of the table (anchor xₙ)",
          "Middle targets: either formula works; anchor at the closer end",
          "Same polynomial either way — the wrong choice just needs more terms for the same accuracy",
          "Interpolation (exact fit through every point) ≠ least-squares (minimises overall error, hits no point exactly)"
        ],
        analogy: "Filling in missing pages of a novel using the surrounding pages. Knowing what happened on pages 1, 10, 20 and 30, you can fit a smooth narrative arc through those checkpoints and guess page 15 quite well. More checkpoints → a richer (higher-degree) arc → better guesses. And where you clip your bookmark matters: to reconstruct page 3, anchor your reading at page 1 (forward); for page 28, anchor at page 30 (backward)."
      },
      workedExample: {
        problem: "Data at x ∈ {1.0, 1.2, 1.4, 1.6, 1.8, 2.0} (h = 0.2). Which Newton formula should estimate y(1.1), y(1.9), and y(1.5)?",
        steps: [
          "<strong>y(1.1):</strong> target near the table start (between x₀ = 1.0 and x₁ = 1.2) → <strong>forward difference</strong>, anchored at x₀ = 1.0",
          "<strong>y(1.9):</strong> target near the table end (between x₄ = 1.8 and x₅ = 2.0) → <strong>backward difference</strong>, anchored at x₅ = 2.0",
          "<strong>y(1.5):</strong> mid-table → either formula; choose the anchor closer to 1.5 for fastest term decay",
          "<strong>Why it matters:</strong> both formulas give the SAME unique polynomial — but anchoring near the target keeps |r| small so early terms dominate and truncating the series loses little accuracy"
        ],
        note: "Exam rubric: state the choice AND the reason ('target near table start → forward difference from x₀')."
      },
      quiz: [
        {
          id: "q-math8-001",
          type: "mcq",
          question: "How many polynomials of degree ≤ 3 pass through 4 data points with distinct x-values?",
          options: [
            "None in general",
            "Exactly one",
            "Infinitely many",
            "Exactly four"
          ],
          answer: 1,
          explanation: "Exactly one — the fundamental uniqueness theorem of interpolation: n+1 distinct points determine a unique polynomial of degree ≤ n (here 4 points → unique cubic or lower). Every method (Newton forward, backward, Lagrange) computes this SAME polynomial by different arithmetic routes.",
          xpReward: 25
        },
        {
          id: "q-math8-002",
          type: "mcq",
          question: "You must estimate y(0.5) from an equally spaced table running x = 0, 1, 2, …, 10. Which formula is most appropriate?",
          options: [
            "Backward difference anchored at x = 10",
            "Forward difference anchored at x₀ = 0 — the target is near the table start",
            "Either — position in the table is irrelevant",
            "Least-squares regression"
          ],
          answer: 1,
          explanation: "Forward difference from x₀ = 0: the target 0.5 sits between x₀ and x₁, giving r = 0.5 ∈ [0, 1] — the sweet spot where the forward formula's terms shrink fastest. Backward from x = 10 would 'work' (same polynomial) but with r = −9.5, needing every term for accuracy. Anchor near the target.",
          xpReward: 25
        },
        {
          id: "q-math8-003",
          type: "truefalse",
          question: "A least-squares fitted line is guaranteed to pass through at least one of the data points exactly.",
          answer: 1,
          explanation: "False. Least-squares minimises the OVERALL squared error and may hit no data point at all — that's the defining contrast with interpolation, which passes exactly through every point. Choose interpolation for precise tabulated values; least-squares for noisy measurements where exact fitting would chase the noise.",
          xpReward: 25
        },
        {
          id: "q-math8-004",
          type: "fillblank",
          question: "Newton forward- and backward-difference interpolation formulas both require the x-values to be ______ spaced.",
          answer: "equally",
          explanation: "Equally spaced (constant step h = xₖ₊₁ − xₖ). The difference-table machinery and the r-variable substitution both assume constant h. For unequally spaced data, use Lagrange interpolation or divided differences instead.",
          xpReward: 25
        },
        {
          id: "q-math8-005",
          type: "match",
          question: "Match each estimation scenario to the appropriate tool.",
          pairs: [
            { term: "Target near table start",        definition: "Newton forward difference, anchored at x₀" },
            { term: "Target near table end",          definition: "Newton backward difference, anchored at xₙ" },
            { term: "Noisy experimental data",        definition: "Least-squares approximation, not interpolation" },
            { term: "Unequally spaced x-values",      definition: "Lagrange / divided differences, not Newton Δ formulas" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The method-selection table for this chapter. Newton Δ/∇ formulas need equal spacing and an anchor near the target; noisy data calls for least-squares (exact fitting would model the noise); irregular spacing rules out the difference-table formulas entirely.",
          xpReward: 25
        },
        {
          id: "q-math8-006",
          type: "mcq",
          question: "Data (0,1), (1,4), (2,9), (3,16) follows y = (x+1)². Will the degree-3 interpolating polynomial reproduce this pattern exactly at ALL x, not just the data points?",
          options: [
            "No — interpolation only matches at the data points in general",
            "Yes — (x+1)² is a degree-2 polynomial, and the unique degree ≤ 3 interpolant of polynomial data IS that polynomial",
            "Only between x = 0 and x = 3",
            "Only if least-squares is used instead"
          ],
          answer: 1,
          explanation: "Yes. The underlying function is itself a polynomial of degree 2 ≤ 3, and by uniqueness the interpolating polynomial of degree ≤ 3 through its points must BE (x+1)² everywhere. Signature clue: the 3rd-order differences of this data are all zero — constant k-th differences reveal degree-k polynomial data.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Forward Difference ───────────────── */
    {
      id: "math8-forward",
      title: "Newton Forward-Difference Formula",
      subtitle: "Δ table · r = (x − x₀)/h · First row of the table · Best for r ∈ [0, 1]",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "Build the forward-difference table: Δyₖ = yₖ₊₁ − yₖ, then Δ²yₖ = Δyₖ₊₁ − Δyₖ, and so on — each column " +
          "differences the one before. The formula uses the <strong>first row</strong> (y₀, Δy₀, Δ²y₀, …) with " +
          "r = (x − x₀)/h: each added term corrects the estimate with higher-order curvature information. " +
          "Accuracy is best for r ∈ [0, 1], i.e. targets between x₀ and x₁.",
        formula: "pₙ(x) = y₀ + rΔy₀ + [r(r−1)/2!]Δ²y₀ + [r(r−1)(r−2)/3!]Δ³y₀ + …   where r = (x − x₀)/h",
        bullets: [
          "Forward difference: Δyₖ = yₖ₊₁ − yₖ (next minus current)",
          "Higher orders recursively: Δʲyₖ = Δʲ⁻¹yₖ₊₁ − Δʲ⁻¹yₖ",
          "r = (x − x₀)/h rescales the target: r = 0 at x₀, r = 1 at x₁, r = 2 at x₂ …",
          "Term coefficients: 1, r, r(r−1)/2!, r(r−1)(r−2)/3!, … (binomial-style)",
          "Uses the TOP diagonal row of the table: y₀, Δy₀, Δ²y₀, Δ³y₀ …",
          "Zeroth term = constant estimate · first adds slope · second adds curvature · each term is a finer zoom",
          "If k-th differences are constant (and higher ones zero), the data comes from a degree-k polynomial"
        ],
        analogy: "Zooming in on a map. The first term y₀ is a coarse dot ('the city'). Adding rΔy₀ zooms to the district (linear slope). The Δ²y₀ term zooms to the street (curvature), Δ³y₀ to the building. Each difference order is one more zoom level — and if you're already standing near x₀ (small r), a couple of zooms pinpoint the location almost exactly."
      },
      workedExample: {
        problem: "Given y-data 0.5000, 0.4545, 0.4167, 0.3846, 0.3571, 0.3333 at x = 1.0, 1.2, …, 2.0 (h = 0.2), estimate y(1.1) using the forward-difference formula.",
        steps: [
          "<strong>Difference table, first row:</strong> y₀ = 0.5000 · Δy₀ = 0.4545 − 0.5000 = −0.0455 · Δ²y₀ = 0.0077 · Δ³y₀ = −0.0020 (higher terms tiny)",
          "<strong>Compute r:</strong> r = (1.1 − 1.0)/0.2 = <strong>0.5</strong>",
          "<strong>Term 0 + 1:</strong> 0.5000 + (0.5)(−0.0455) = 0.5000 − 0.02275 = 0.47725",
          "<strong>Term 2:</strong> [r(r−1)/2!]Δ²y₀ = [(0.5)(−0.5)/2](0.0077) = −0.00096 → running total 0.47629",
          "<strong>Term 3:</strong> [(0.5)(−0.5)(−1.5)/6](−0.0020) = −0.000125 → total ≈ <strong>0.4761</strong>",
          "<strong>Check:</strong> underlying function is 1/(1+x): true y(1.1) = 1/2.1 ≈ 0.4762 ✓ (3-decimal agreement with just 4 terms)"
        ],
        note: "Notice each successive term is ~10× smaller — the signature of a well-anchored interpolation (|r| ≤ 1)."
      },
      quiz: [
        {
          id: "q-math8-007",
          type: "calc",
          question: "Data: y-values 1, 8, 27, 64 at x = 0, 1, 2, 3 (h = 1). Build the forward-difference table and report Δ²y₀ (the second-order difference in the first row).",
          setup: "First differences:  Δy₀ = 8−1 = 7,  Δy₁ = 27−8 = 19,  Δy₂ = 64−27 = 37\nSecond differences: Δ²y₀ = Δy₁ − Δy₀ = ?",
          hint: "Δ²y₀ = 19 − 7",
          answer: 12,
          tolerance: 0.01,
          unit: "Δ²y₀ =",
          calcType: "numeric",
          explanation: "Δ²y₀ = 19 − 7 = 12. Continuing: Δ²y₁ = 37 − 19 = 18, Δ³y₀ = 18 − 12 = 6, and all 4th differences would be 0 — constant third differences reveal the data is a cubic (indeed y = x³… wait, 1, 8, 27, 64 = (x+1)³). Building the table column by column is pure bookkeeping — and worth many exam marks.",
          xpReward: 35
        },
        {
          id: "q-math8-008",
          type: "calc",
          question: "For a table starting at x₀ = 2.0 with step h = 0.25, compute the value of r used to estimate y at x = 2.1.",
          setup: "r = (x − x₀) / h = (2.1 − 2.0) / 0.25",
          hint: "0.1 / 0.25",
          answer: 0.4,
          tolerance: 0.01,
          unit: "r =",
          calcType: "numeric",
          explanation: "r = 0.1/0.25 = 0.4. Since r ∈ [0, 1], the target lies between x₀ and x₁ — precisely the forward formula's accuracy sweet spot. The r-variable measures 'how many steps past the anchor' the target sits; every coefficient in the formula is built from it.",
          xpReward: 35
        },
        {
          id: "q-math8-009",
          type: "calc",
          question: "With y₀ = 0.5000, Δy₀ = −0.0455 and r = 0.5, compute the two-term forward estimate y ≈ y₀ + rΔy₀ (4 decimal places).",
          setup: "y ≈ y₀ + r·Δy₀ = 0.5000 + (0.5)(−0.0455)",
          hint: "0.5 × −0.0455 = −0.02275",
          answer: 0.4773,
          tolerance: 0.001,
          unit: "≈",
          calcType: "numeric",
          explanation: "0.5000 − 0.02275 = 0.47725 ≈ 0.4773. This linear (two-term) estimate is already within 0.0011 of the true 0.4762 — adding the Δ²y₀ term refines it to 0.4763, and Δ³y₀ to 0.4761. Each term is one more 'zoom level' of correction.",
          xpReward: 35
        },
        {
          id: "q-math8-010",
          type: "mcq",
          question: "In the forward-difference formula, the coefficient of Δ²y₀ is:",
          options: [
            "r²/2",
            "r(r−1)/2!",
            "r(r+1)/2!",
            "(r−1)(r−2)/2!"
          ],
          answer: 1,
          explanation: "r(r−1)/2! — the binomial-style pattern continues r(r−1)(r−2)/3! for the third term, etc. Distinguish carefully: the BACKWARD formula uses r(r+1)/2! (plus signs). Sign confusion between the two formulas is the most common exam error in this chapter.",
          xpReward: 25
        },
        {
          id: "q-math8-011",
          type: "mcq",
          question: "In a difference table, the third-order differences are all equal and the fourth-order differences are all zero. The underlying data comes from:",
          options: [
            "An exponential function",
            "A polynomial of degree exactly 3",
            "A polynomial of degree 4",
            "A function with a discontinuity"
          ],
          answer: 1,
          explanation: "Degree exactly 3. Differencing a polynomial drops its degree by one (like differentiating), so a cubic yields constant 3rd differences and zero 4th differences — the discrete fingerprint of polynomial degree. Exam questions often ask you to 'determine the degree of the underlying polynomial from the table'.",
          xpReward: 25
        },
        {
          id: "q-math8-012",
          type: "truefalse",
          question: "The forward-difference formula uses the entries along the first (top) row of the difference table: y₀, Δy₀, Δ²y₀, ….",
          answer: 0,
          explanation: "True. The forward formula anchors everything at index 0 and reads the top diagonal of the table. The backward formula is the mirror image: anchored at index n, reading the BOTTOM row (yₙ, ∇yₙ, ∇²yₙ, …). Which row you harvest is the practical difference between the two formulas.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Backward Difference ───────────────── */
    {
      id: "math8-backward",
      title: "Newton Backward-Difference Formula",
      subtitle: "∇ table · r = (x − xₙ)/h (negative) · Bottom row of the table · Best for r ∈ [−1, 0]",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "The mirror of the forward formula: backward differences ∇yₖ = yₖ − yₖ₋₁ (current minus previous), " +
          "anchored at the <strong>last</strong> point xₙ with r = (x − xₙ)/h — typically <em>negative</em> since targets sit " +
          "below xₙ. The formula reads the <strong>bottom row</strong> of the table (yₙ, ∇yₙ, ∇²yₙ, …) and its coefficients " +
          "flip sign pattern: r(r+1)/2!, r(r+1)(r+2)/3!, … Best accuracy for r ∈ [−1, 0], i.e. targets between xₙ₋₁ and xₙ.",
        formula: "pₙ(x) = yₙ + r∇yₙ + [r(r+1)/2!]∇²yₙ + [r(r+1)(r+2)/3!]∇³yₙ + …   where r = (x − xₙ)/h",
        bullets: [
          "Backward difference: ∇yₖ = yₖ − yₖ₋₁ (current minus PREVIOUS)",
          "Anchor at the LAST point: r = (x − xₙ)/h — negative when x < xₙ",
          "Uses the BOTTOM row of the table: yₙ, ∇yₙ, ∇²yₙ, …",
          "Coefficient pattern r(r+1)/2!, r(r+1)(r+2)/3! — note (r+1), (r+2): PLUS signs (forward uses minus)",
          "Best accuracy for r ∈ [−1, 0] — targets in the last interval",
          "Numerically, the bottom-row ∇ values equal the top-row Δ values of the same column shifted — the same table, read from opposite corners"
        ],
        analogy: "Choosing which end of a measuring tape to anchor. Measuring near a wall's right edge? Clip the tape at the right end — least slack, most precision. The backward formula is exactly this: clip at xₙ when the target is near the table's end, so the distance r stays small and the correction terms stay tiny. Same tape (same polynomial), smarter anchoring."
      },
      workedExample: {
        problem: "Same table as before (x = 1.0 … 2.0, h = 0.2, yₙ = y(2.0) = 0.3333). Estimate y(1.9) with the backward-difference formula, given ∇y₅ = −0.0238, ∇²y₅ = 0.0037, ∇³y₅ = −0.0009.",
        steps: [
          "<strong>Compute r:</strong> r = (1.9 − 2.0)/0.2 = <strong>−0.5</strong>  (negative — target below the anchor xₙ)",
          "<strong>Terms 0 + 1:</strong> 0.3333 + (−0.5)(−0.0238) = 0.3333 + 0.0119 = 0.3452",
          "<strong>Term 2:</strong> [r(r+1)/2!]∇²y₅ = [(−0.5)(0.5)/2](0.0037) = −0.00046 → 0.34474",
          "<strong>Term 3:</strong> [(−0.5)(0.5)(1.5)/6](−0.0009) = +0.00006 → total ≈ <strong>0.3447</strong>",
          "<strong>Check:</strong> true value 1/(1+1.9) = 1/2.9 ≈ 0.3448 ✓"
        ],
        note: "Same unique polynomial as the forward formula would give — but anchored at 2.0 the terms decay immediately, so three terms suffice."
      },
      quiz: [
        {
          id: "q-math8-013",
          type: "calc",
          question: "A table ends at xₙ = 2.0 with h = 0.2. Compute r for estimating y(1.9) with the backward formula.",
          setup: "r = (x − xₙ) / h = (1.9 − 2.0) / 0.2",
          hint: "Negative numerator — the target is below the anchor",
          answer: -0.5,
          tolerance: 0.01,
          unit: "r =",
          calcType: "numeric",
          explanation: "r = −0.1/0.2 = −0.5. Negative r is normal and expected for the backward formula: it measures how far BELOW the anchor xₙ the target sits. r ∈ [−1, 0] means the target is in the final interval [xₙ₋₁, xₙ] — the backward formula's accuracy sweet spot.",
          xpReward: 35
        },
        {
          id: "q-math8-014",
          type: "calc",
          question: "With yₙ = 0.3333, ∇yₙ = −0.0238 and r = −0.5, compute the two-term backward estimate yₙ + r∇yₙ (4 decimal places).",
          setup: "y ≈ yₙ + r·∇yₙ = 0.3333 + (−0.5)(−0.0238)",
          hint: "Two negatives multiply to a positive",
          answer: 0.3452,
          tolerance: 0.001,
          unit: "≈",
          calcType: "numeric",
          explanation: "(−0.5)(−0.0238) = +0.0119, so y ≈ 0.3333 + 0.0119 = 0.3452. Note the correction is POSITIVE: moving left from x = 2.0, the (decreasing) function increases. The two-term estimate is already within 0.0004 of the true 0.3448.",
          xpReward: 35
        },
        {
          id: "q-math8-015",
          type: "calc",
          question: "Given y-values 5, 12, 22, 35 at equally spaced points, compute ∇y₃ — the first-order backward difference at the LAST point.",
          setup: "∇y₃ = y₃ − y₂ = 35 − 22",
          hint: "Current minus previous",
          answer: 13,
          tolerance: 0.01,
          unit: "∇y₃ =",
          calcType: "numeric",
          explanation: "∇y₃ = 35 − 22 = 13. 'Current minus previous' — compare with the forward Δy₂ = y₃ − y₂ = 13: numerically identical, but ∇ indexes it at position 3 (bottom row) while Δ indexes it at position 2 (leading to the top row). Same table entries, different reading direction.",
          xpReward: 35
        },
        {
          id: "q-math8-016",
          type: "mcq",
          question: "The coefficient pattern of the backward-difference formula differs from the forward one how?",
          options: [
            "It uses r(r+1), r(r+1)(r+2), … — plus signs instead of the forward's r(r−1), r(r−1)(r−2)…",
            "It has no factorials in the denominators",
            "It uses only even-order differences",
            "There is no difference — the coefficients are identical"
          ],
          answer: 0,
          explanation: "Plus signs: r(r+1)/2!, r(r+1)(r+2)/3! versus forward's r(r−1)/2!, r(r−1)(r−2)/3!. The flip happens because the backward formula counts differences in the reverse direction from the anchor xₙ. Mixing the two sign patterns is THE classic mark-losing error — write the anchor and formula before substituting numbers.",
          xpReward: 25
        },
        {
          id: "q-math8-017",
          type: "mcq",
          question: "For a 5-point table, you must estimate y in the second-to-last interval and you compute r = (x − x₄)/h = −0.3. What does this r tell you?",
          options: [
            "The target is 0.3 steps ABOVE x₄ — outside the table",
            "The target is 0.3 steps BELOW the anchor x₄, i.e. 30% of the way from x₄ down to x₃",
            "The calculation is wrong — r cannot be negative",
            "The target coincides with x₃"
          ],
          answer: 1,
          explanation: "r = −0.3 places the target 30% of one step below the anchor x₄ (between x₃ and x₄, closer to x₄). Negative r is the natural regime of the backward formula; r = −1 would be exactly x₃. Reading position from r — sign gives direction, magnitude gives fraction of a step — is a quick exam check that your setup is right.",
          xpReward: 25
        },
        {
          id: "q-math8-018",
          type: "match",
          question: "Match each formula element to the correct variant.",
          pairs: [
            { term: "Δyₖ = yₖ₊₁ − yₖ",           definition: "Forward difference — next minus current" },
            { term: "∇yₖ = yₖ − yₖ₋₁",           definition: "Backward difference — current minus previous" },
            { term: "r = (x − x₀)/h, top row",    definition: "Forward formula setup, best for r ∈ [0, 1]" },
            { term: "r = (x − xₙ)/h, bottom row", definition: "Backward formula setup, best for r ∈ [−1, 0]" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The complete forward-vs-backward contrast card: operator direction, anchor point, table row harvested, and accuracy window. Both produce the same unique polynomial — the choice is purely about which anchor keeps |r| ≤ 1 so the series can be truncated early.",
          xpReward: 25
        }
      ]
    }
  ]
};
