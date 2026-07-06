/**
 * data/math-chapter5-data.js
 * Chapter 5 — Accuracy & Error (SECI1113 Computational Mathematics)
 * Global: window.mathChapter5Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.mathChapter5Data = {
  id: "math-chapter5",
  key: "math5",
  title: "Chapter 5: Accuracy & Error",
  heroTitle: "Accuracy & Error",
  heroDesc: "Every numerical answer carries error. Learn where error comes from (data, truncation, rounding), " +
    "how to measure it (absolute vs relative), and how it accumulates through arithmetic — " +
    "the foundation for judging every numerical method in this course.",
  statusLabel: "CHAPTER 5 — ACCURACY & ERROR",
  nextChapter: { label: "Chapter 6: Non-Linear Equations", href: "math-chapter6.html" },
  completeText: "You can classify error sources, compute absolute/relative error, and bound accumulated error. These skills appear in nearly every exam question of this course.",

  sections: [

    /* ───────────────── SECTION 1 — Error Types ───────────────── */
    {
      id: "math5-error-types",
      title: "Sources of Numerical Error",
      subtitle: "Mistakes vs errors · Data error · Truncation error · Rounding error · Stability & convergence",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "The gap between a computed answer and the true mathematical answer is <strong>error</strong>. " +
          "A <em>mistake</em> (human blunder, machine fault) is avoidable — the three inherent error types are not: " +
          "<strong>data error</strong> enters with imprecise measurements, <strong>truncation error</strong> comes from cutting an " +
          "infinite process short (e.g. finitely many integration strips), and <strong>rounding error</strong> comes from finite " +
          "floating-point storage. These can only be bounded and managed, never eliminated.",
        bullets: [
          "<strong>Mistake</strong> — human blunder or machine fault; avoidable and correctable (NOT a numerical error type)",
          "<strong>Data error</strong> — input measurements are inherently approximate; propagates through every calculation",
          "<strong>Truncation error</strong> — stopping an infinite process after finitely many terms; the discarded remainder",
          "<strong>Rounding error</strong> — finite floating-point representation cuts off infinite decimals (e.g. 1/3, π)",
          "Reducing truncation error (more terms) usually adds more arithmetic → more rounding error: a central design tension",
          "<strong>Stable</strong> method: small input change → proportionally small output change",
          "<strong>Convergent</strong> method: iterating drives the error toward zero"
        ],
        analogy: "Measuring a room with a tape measure that only reads to the nearest centimetre. The tape's markings are the <strong>rounding error</strong> (finite precision tool), measuring only twice instead of averaging many readings is the <strong>truncation error</strong> (method cut short), and the room's walls not being perfectly straight is the <strong>data error</strong> (the input itself is imprecise). Better tools, better methods, better data — you can improve each, but never make any of them perfect."
      },
      workedExample: {
        problem: "Classify the error in each scenario: (a) ∫ 1/(1+sin²x) dx computed with 10 trapezoid strips, (b) storing π as 3.14159, (c) a sensor reporting 23.5 °C for a true temperature of 23.514 °C, (d) typing 3.41 instead of 3.14.",
        steps: [
          "<strong>(a) Truncation error:</strong> the exact integral needs infinitely many strips; using 10 strips discards the remainder — the classic truncation situation.",
          "<strong>(b) Rounding error:</strong> π has infinitely many decimals; a 5-decimal representation cuts them off. Error = 3.1415926… − 3.14159 ≈ 0.0000026.",
          "<strong>(c) Data error:</strong> the input measurement itself is imprecise — every later calculation inherits the 0.014 °C gap.",
          "<strong>(d) Mistake:</strong> a transposition blunder. Unlike the other three, this is avoidable and is NOT counted as a numerical error type."
        ],
        note: "Exam questions frequently ask you to classify errors — memorise: infinite process cut short = truncation · finite storage = rounding · imprecise input = data · blunder = mistake."
      },
      quiz: [
        {
          id: "q-math5-001",
          type: "mcq",
          question: "A Taylor series for eˣ is summed using only its first 6 terms. The error introduced is classified as:",
          options: [
            "Rounding error — the computer stores each term imprecisely",
            "Truncation error — an infinite process was stopped after finitely many terms",
            "Data error — the input x was measured imprecisely",
            "A mistake — the programmer should have used all terms"
          ],
          answer: 1,
          explanation: "Truncation error. The Taylor series has infinitely many terms; using 6 discards the (infinite) remainder — exactly the definition of truncation. Rounding would be the finite-precision storage of each computed term; data error would be imprecision in x itself. Think of it as 'cutting the tape measure process short'.",
          xpReward: 25
        },
        {
          id: "q-math5-002",
          type: "mcq",
          question: "Storing the value 1/3 in a computer as 0.333333 introduces which type of error?",
          options: [
            "Data error",
            "Truncation error",
            "Rounding error",
            "No error — 0.333333 is exact"
          ],
          answer: 2,
          explanation: "Rounding error. 1/3 = 0.3333… has an infinite decimal expansion; finite floating-point storage cuts it off. The stored value differs from the true value by ≈ 3.3×10⁻⁷. This is the 'finite tape-measure markings' — a property of the storage, not the method or the data.",
          xpReward: 25
        },
        {
          id: "q-math5-003",
          type: "match",
          question: "Match each error source to its defining characteristic.",
          pairs: [
            { term: "Data error",       definition: "Input measurement is inherently imprecise" },
            { term: "Truncation error", definition: "Infinite process stopped after finitely many steps" },
            { term: "Rounding error",   definition: "Finite floating-point storage cuts off decimals" },
            { term: "Mistake",          definition: "Human blunder — avoidable, not an inherent error type" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The three inherent error types (data, truncation, rounding) can only be bounded and managed. A mistake is categorically different — it can and must be eliminated. This four-way classification is a standard exam question.",
          xpReward: 25
        },
        {
          id: "q-math5-004",
          type: "truefalse",
          question: "Increasing the number of terms used in a series approximation always reduces the total error of the final computed result.",
          answer: 1,
          explanation: "False. More terms reduce truncation error but require more arithmetic operations, each adding rounding error. Beyond some point the accumulated rounding error outweighs the truncation gain — total error can increase. This truncation-vs-rounding tension is the central trade-off in numerical method design.",
          xpReward: 25
        },
        {
          id: "q-math5-005",
          type: "fillblank",
          question: "A numerical method is called ______ if small changes in the input produce proportionally small changes in the output.",
          answer: "stable",
          explanation: "Stable. Stability is about sensitivity to perturbation; convergence (the related property) is about the error approaching zero as iterations increase. A method can be convergent in exact arithmetic yet unstable under rounding — both properties matter.",
          xpReward: 25
        },
        {
          id: "q-math5-006",
          type: "mcq",
          question: "∫ 2x³ dx can be solved analytically as x⁴/2 + C, but ∫ 1/(1+sin²x) dx has no closed form. What does this imply about numerically integrating the second function?",
          options: [
            "The numerical result will contain truncation error from the finite approximation of the area",
            "The numerical result will be exact if enough decimal places are used",
            "Numerical integration cannot be applied to functions without closed forms",
            "Only data error can occur since the integrand is known exactly"
          ],
          answer: 0,
          explanation: "Any numerical integration method approximates the exact area using finitely many pieces, so truncation error is unavoidable — regardless of decimal precision (that only controls rounding error). Numerical methods exist precisely FOR functions without closed forms; you trade an exact symbolic answer for a bounded-error numerical one.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Absolute & Relative Error ───────────────── */
    {
      id: "math5-abs-rel-error",
      title: "Absolute & Relative Error",
      subtitle: "|e| = |N − n| · Relative = |N − n|/|N| · Percentage error · Rounding bound 0.5 × 10⁻ⁿ",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "Given true value <strong>N</strong> and approximation <strong>n</strong>: the <strong>absolute error</strong> " +
          "|e| = |N − n| is the raw gap, while the <strong>relative error</strong> |N − n| / |N| scales the gap by the value's size — " +
          "making it the meaningful measure when values are very large or very small. An error of 4 is negligible against 10 million " +
          "but catastrophic against 0.000012. When N is unknown, divide by |n| instead.",
        formula: "|e| = |N − n|   ·   e_rel = |N − n| / |N|   ·   e% = e_rel × 100%",
        bullets: [
          "Absolute error |e| = |N − n| — always ≥ 0, same units as the value",
          "Relative error e_rel = |N − n| / |N| — dimensionless, scale-free",
          "Percentage relative error = e_rel × 100%",
          "If the true value N is unknown, use the approximation: e_rel ≈ |N − n| / |n|",
          "<strong>Rounding bound:</strong> rounding to n decimal places guarantees |e| ≤ 0.5 × 10⁻ⁿ",
          "Rounding to 2 d.p. → |e| ≤ 0.005 · to 3 d.p. → |e| ≤ 0.0005 · to 4 d.p. → |e| ≤ 0.00005",
          "Relative error is the standard quality measure for comparing approximations of different magnitudes"
        ],
        analogy: "A train that is 5 minutes late (absolute error). Does it matter? On a 2-hour journey, 5 minutes is nothing — but if your connection window is 4 minutes, it's a disaster. Relative error is the 'fraction of the journey lost' — the context-aware measure. Absolute error alone is blind to context, which is why numerical analysts quote relative error."
      },
      workedExample: {
        problem: "The true value is π = 3.1415926…; the approximation used is n = 3.14. Compute the absolute error, the relative error, and the percentage error. Then state the maximum rounding error when a value is rounded to 3 decimal places.",
        steps: [
          "<strong>Absolute error:</strong> |e| = |3.1415926 − 3.14| = 0.0015926 ≈ <strong>0.0016</strong>",
          "<strong>Relative error:</strong> e_rel = 0.0015926 / 3.1415926 ≈ <strong>0.000507</strong>",
          "<strong>Percentage error:</strong> 0.000507 × 100% ≈ <strong>0.05%</strong>",
          "<strong>Rounding bound for 3 d.p.:</strong> |e| ≤ 0.5 × 10⁻³ = <strong>0.0005</strong> — the round-half-up rule can shift a value by at most half of the last kept digit."
        ],
        note: "Contrast: N = 1,000,000 with n = 999,996 has |e| = 4 but e_rel = 0.000004 (excellent). N = 0.000012 with n = 0.000009 has |e| = 0.000003 (tiny!) but e_rel = 0.25 = 25% (terrible)."
      },
      quiz: [
        {
          id: "q-math5-007",
          type: "calc",
          question: "A computation approximates the true value N = 2.7182818 with n = 2.718. Compute the absolute error to 4 significant figures.",
          setup: "True value:      N = 2.7182818\nApproximation:  n = 2.718\n\nAbsolute error = |N − n|",
          hint: "|e| = |N − n| — subtract and take the positive value",
          answer: 0.0002818,
          tolerance: 0.00001,
          unit: "≈",
          calcType: "numeric",
          explanation: "|e| = |2.7182818 − 2.718| = 0.0002818. The absolute error is simply the raw gap between true value and approximation — no scaling. (This is e truncated to 3 d.p.; note the error is below the 0.0005 bound that rounding to 3 d.p. would guarantee.)",
          xpReward: 35
        },
        {
          id: "q-math5-008",
          type: "calc",
          question: "Using the values from the previous question (N = 2.7182818, n = 2.718), compute the PERCENTAGE relative error. Give your answer in % to 3 decimal places.",
          setup: "N = 2.7182818,  n = 2.718\nAbsolute error |e| = 0.0002818\n\nPercentage error = (|e| / |N|) × 100%",
          hint: "e% = (|N − n| / |N|) × 100",
          answer: 0.0104,
          tolerance: 0.001,
          unit: "%",
          calcType: "numeric",
          explanation: "e_rel = 0.0002818 / 2.7182818 ≈ 0.0001037. Percentage: 0.0001037 × 100 ≈ 0.0104%. Dividing by the true value converts the raw gap into a scale-free measure — about one part in ten thousand, an excellent approximation.",
          xpReward: 35
        },
        {
          id: "q-math5-009",
          type: "mcq",
          question: "Device A reads 101,324 Pa when the truth is 101,325 Pa. Device B reads 0.98 atm when the truth is 1.00 atm. Which device is more accurate, and by which measure?",
          options: [
            "Device B — its absolute error (0.02) is smaller than Device A's (1)",
            "Device A — its relative error (≈10⁻⁵) is far smaller than Device B's (0.02)",
            "Both are equally accurate since both errors are small",
            "Cannot be compared because the units differ"
          ],
          answer: 1,
          explanation: "Device A: e_rel = 1/101325 ≈ 0.00001 (0.001%). Device B: e_rel = 0.02/1.00 = 0.02 (2%) — two thousand times worse. Comparing raw absolute errors across different units/magnitudes is meaningless; relative error is dimensionless and comparable. This is exactly why relative error exists.",
          xpReward: 25
        },
        {
          id: "q-math5-010",
          type: "truefalse",
          question: "Rounding a number to 2 decimal places guarantees the absolute rounding error is at most 0.005.",
          answer: 0,
          explanation: "True. The bound is |e| ≤ 0.5 × 10⁻ⁿ for n decimal places: with n = 2, |e| ≤ 0.5 × 10⁻² = 0.005. The round-half-up rule can move a value by at most half of the last retained digit position. This bound is exact and heavily used in error-propagation questions.",
          xpReward: 25
        },
        {
          id: "q-math5-011",
          type: "fillblank",
          question: "When the true value N is unknown in practice, the relative error is computed by dividing the absolute error by the ______ instead.",
          answer: "approximation",
          explanation: "The approximation |n|. Since e_rel = |N − n|/|N| needs the unknown true value, practitioners substitute the best available value — the approximation itself: e_rel ≈ |N − n|/|n|. For good approximations the difference between the two denominators is negligible.",
          xpReward: 25
        },
        {
          id: "q-math5-012",
          type: "calc",
          question: "A length is rounded to 4 decimal places. What is the maximum possible absolute rounding error?",
          setup: "Rounding to n decimal places → |e| ≤ 0.5 × 10⁻ⁿ\nHere n = 4",
          hint: "|e| ≤ 0.5 × 10⁻⁴",
          answer: 0.00005,
          tolerance: 0.000001,
          unit: "max",
          calcType: "numeric",
          explanation: "|e| ≤ 0.5 × 10⁻⁴ = 0.00005. Each decimal place tightens the bound by a factor of 10: 2 d.p. → 0.005, 3 d.p. → 0.0005, 4 d.p. → 0.00005. Remember it as 'half of the last kept digit'.",
          xpReward: 35
        },
        {
          id: "q-math5-013",
          type: "mcq",
          question: "Two approximations have the same absolute error of 0.000003. The first approximates N₁ = 1,000,000; the second approximates N₂ = 0.000012. Which statement is correct?",
          options: [
            "Both approximations are equally good because the absolute errors match",
            "The first is far better: its relative error is ~3×10⁻¹² versus 0.25 (25%) for the second",
            "The second is better because 0.000003 is closer to 0.000012 than to 1,000,000",
            "Neither can be evaluated without knowing the units"
          ],
          answer: 1,
          explanation: "e_rel(first) = 0.000003/1,000,000 = 3×10⁻¹² — astonishingly accurate. e_rel(second) = 0.000003/0.000012 = 0.25 — a quarter of the value is missing! Identical absolute errors, wildly different quality. This is the canonical demonstration of why relative error is the standard quality measure.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Error Propagation ───────────────── */
    {
      id: "math5-propagation",
      title: "Rounding Error Propagation",
      subtitle: "|e_result| ≤ |e₁| + |e₂| · Worst-case bounds · Honest reporting of decimal places",
      xpReward: 10,
      accent: "orange",
      content: {
        summary: "When approximate numbers are added or subtracted, their individual errors combine. If n₁ and n₂ carry " +
          "errors e₁ and e₂, the error of n₁ ± n₂ is bounded by <strong>|e| ≤ |e₁| + |e₂|</strong> (the triangle inequality). " +
          "Every term in a long calculation contributes to the final uncertainty, so the result should only be reported " +
          "to the decimal place that survives the total error bound — the final precision is limited by the least precise input.",
        formula: "|e_sum| ≤ |e₁| + |e₂| + … + |eₖ|   (each term: |eᵢ| ≤ 0.5 × 10⁻ⁿⁱ)",
        bullets: [
          "Error bound for sums/differences: |e_result| ≤ Σ|eᵢ| — the triangle inequality",
          "Each term rounded to nᵢ decimal places contributes at most 0.5 × 10⁻ⁿⁱ",
          "More terms → more accumulated worst-case error",
          "Report the result only to the decimal place where (sum) and (sum ± bound) still agree",
          "The bound is conservative (worst case) — the actual error is usually smaller",
          "A single low-precision term (e.g. 2 d.p.) dominates the bound even if others have 4 d.p."
        ],
        analogy: "Carrying water in several leaky buckets. Each bucket (approximate number) loses at most a known amount (its rounding bound). Pour them all into one basin (addition) and the total possible loss is the sum of all individual leaks. You don't know exactly how much leaked — but you can guarantee it's no more than the sum of the worst cases, so you know how much water you can honestly claim to have."
      },
      workedExample: {
        problem: "Compute 3.69 + 5.432 − 2.37 − 3.5214, bound the total rounding error, and state the result to an honest number of decimal places.",
        steps: [
          "<strong>Arithmetic result:</strong> 3.69 + 5.432 − 2.37 − 3.5214 = <strong>3.2306</strong>",
          "<strong>Per-term bounds:</strong> 3.69 (2 d.p.) → 0.005 · 5.432 (3 d.p.) → 0.0005 · 2.37 (2 d.p.) → 0.005 · 3.5214 (4 d.p.) → 0.00005",
          "<strong>Total bound:</strong> |e| ≤ 0.005 + 0.0005 + 0.005 + 0.00005 = <strong>0.01055</strong>",
          "<strong>Result range:</strong> 3.2306 ± 0.01055 → between 3.22005 and 3.24115",
          "<strong>Honest answer:</strong> both bounds agree at 1 d.p. (3.2) but disagree at 2 d.p. (3.22 vs 3.24) → report <strong>3.2</strong>"
        ],
        note: "Note how the two 2-d.p. terms (0.005 each) contribute 95% of the total bound — the least precise inputs dominate the final precision."
      },
      quiz: [
        {
          id: "q-math5-014",
          type: "calc",
          question: "Compute the arithmetic result of 12.3 + 0.456 − 7.89 (exact arithmetic, no rounding).",
          setup: "12.3 + 0.456 − 7.89 = ?",
          hint: "Straight arithmetic: add then subtract",
          answer: 4.866,
          tolerance: 0.001,
          unit: "=",
          calcType: "numeric",
          explanation: "12.3 + 0.456 = 12.756; 12.756 − 7.89 = 4.866. This raw result is step one — but as the next question shows, not all of its digits deserve to be reported.",
          xpReward: 35
        },
        {
          id: "q-math5-015",
          type: "calc",
          question: "For the expression 12.3 + 0.456 − 7.89, compute the total worst-case rounding error bound (each term is rounded to the decimal places shown).",
          setup: "Term bounds (0.5 × 10⁻ⁿ each):\n  12.3   → 1 d.p. → |e₁| ≤ 0.05\n  0.456  → 3 d.p. → |e₂| ≤ 0.0005\n  7.89   → 2 d.p. → |e₃| ≤ 0.005\n\nTotal bound = |e₁| + |e₂| + |e₃|",
          hint: "Sum the three individual bounds",
          answer: 0.0555,
          tolerance: 0.0005,
          unit: "≤",
          calcType: "numeric",
          explanation: "0.05 + 0.0005 + 0.005 = 0.0555. The 1-d.p. term (12.3) alone contributes 90% of the bound — the final answer 4.866 ± 0.0555 ranges from 4.8105 to 4.9215, so only 4.9 (1 d.p.) is honestly reportable. The least precise input limits everything.",
          xpReward: 35
        },
        {
          id: "q-math5-016",
          type: "mcq",
          question: "A sum is computed as 3.2306 with a total error bound of ±0.01055, giving the range [3.22005, 3.24115]. To how many decimal places can the result be honestly reported?",
          options: [
            "4 decimal places (3.2306) — that's what the arithmetic produced",
            "2 decimal places (3.23) — the bound is smaller than 0.05",
            "1 decimal place (3.2) — both range endpoints agree only at the first decimal",
            "0 decimal places (3) — error bounds always cost all decimals"
          ],
          answer: 2,
          explanation: "1 decimal place. The rule: report only digits on which the entire range agrees. 3.22005 and 3.24115 both round to 3.2 at 1 d.p. but differ at 2 d.p. (3.22 vs 3.24). Reporting 3.2306 would claim precision the calculation cannot justify — the numerical equivalent of false advertising.",
          xpReward: 25
        },
        {
          id: "q-math5-017",
          type: "truefalse",
          question: "When two approximate numbers are subtracted, their error bounds partially cancel, so the result's error bound is |e₁| − |e₂|.",
          answer: 1,
          explanation: "False. Errors do NOT reliably cancel — their signs are unknown. The worst case for both addition AND subtraction is |e_result| ≤ |e₁| + |e₂| (triangle inequality). You must always assume the leaks add up; assuming cancellation is how calculations silently go wrong.",
          xpReward: 25
        },
        {
          id: "q-math5-018",
          type: "mcq",
          question: "A calculation sums ten values, nine known to 4 d.p. (bound 0.00005 each) and one known to 1 d.p. (bound 0.05). What dominates the total error bound?",
          options: [
            "The nine high-precision terms, because there are more of them",
            "The single 1 d.p. term — its bound (0.05) is over 100× the other nine combined (0.00045)",
            "All terms contribute equally by definition",
            "Nothing — bounds only apply to subtraction"
          ],
          answer: 1,
          explanation: "The single low-precision term contributes 0.05 while the other nine together contribute 9 × 0.00005 = 0.00045 — a 111:1 ratio. Total ≈ 0.0505, essentially all from one term. Practical lesson: a chain's precision is set by its weakest link; adding high-precision terms cannot repair one imprecise input.",
          xpReward: 25
        },
        {
          id: "q-math5-019",
          type: "match",
          question: "Match each concept to its correct statement.",
          pairs: [
            { term: "Triangle inequality",  definition: "|e_result| ≤ |e₁| + |e₂| for sums and differences" },
            { term: "Per-term bound",       definition: "0.5 × 10⁻ⁿ for a value rounded to n decimal places" },
            { term: "Honest reporting",     definition: "Quote only decimals where sum ± bound still agree" },
            { term: "Worst-case nature",    definition: "Actual error is usually smaller than the bound" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "These four ideas form the complete error-propagation workflow: bound each input (0.5 × 10⁻ⁿ), add the bounds (triangle inequality), test which decimals survive (honest reporting), and remember the bound is conservative (worst case). Exam questions walk through exactly this sequence.",
          xpReward: 25
        }
      ]
    }
  ]
};
