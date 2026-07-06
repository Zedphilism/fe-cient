/**
 * data/math-chapter7-data.js
 * Chapter 7 — Eigenvalues & Eigenvectors (SECI1113)
 * Global: window.mathChapter7Data · Rendered by js/chapter-page.js
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.mathChapter7Data = {
  id: "math-chapter7",
  key: "math7",
  title: "Chapter 7: Eigenvalues & Eigenvectors",
  heroTitle: "Eigenvalues & Eigenvectors",
  heroDesc: "Av = λv: the directions a matrix only stretches, never rotates. Find eigenvalues exactly via the " +
    "characteristic polynomial det(A − λI) = 0, bound them with Gerschgorin disks, and approximate the dominant " +
    "one numerically with the Power Method — all three are exam staples.",
  statusLabel: "CHAPTER 7 — EIGENVALUES & EIGENVECTORS",
  nextChapter: { label: "Chapter 8: Interpolation", href: "math-chapter8.html" },
  completeText: "You can find eigenvalues/eigenvectors by hand for 2×2 and 3×3 matrices, bound them with Gerschgorin disks, and run Power Method iterations.",

  sections: [

    /* ───────────────── SECTION 1 — Definition ───────────────── */
    {
      id: "math7-definition",
      title: "The Eigenvalue Equation Av = λv",
      subtitle: "Natural axes of a transformation · Eigenspaces · λ = 0 and invertibility",
      xpReward: 10,
      accent: "green",
      content: {
        summary: "An eigenvector <strong>v ≠ 0</strong> of a square matrix A satisfies <strong>Av = λv</strong>: applying A " +
          "merely scales v by the eigenvalue λ — no rotation, no direction change. λ = 2 doubles the vector; λ = −1 flips it. " +
          "Rearranging gives (A − λI)v = 0, a homogeneous system that has nonzero solutions only when (A − λI) is singular — " +
          "which is the doorway to computing eigenvalues via determinants. For each found λᵢ, solving (A − λᵢI)v = 0 " +
          "yields its eigenvectors; all solutions together (with 0) form the <strong>eigenspace</strong>.",
        formula: "Av = λv  (v ≠ 0)   ⟺   (A − λI)v = 0 has nontrivial solutions",
        bullets: [
          "Eigenvector: direction A does not tilt — only stretches (λ > 1), compresses (0 < λ < 1), or flips (λ < 0)",
          "v = 0 is excluded by definition (it trivially satisfies the equation for every λ)",
          "Rearrangement: Av − λv = 0 → (A − λI)v = 0 — the singularity form",
          "Eigenvectors of λᵢ: nonzero solutions of (A − λᵢI)v = 0 (Gaussian elimination)",
          "Eigenspace of λᵢ = all solutions including 0 — a subspace of ℝⁿ",
          "Any nonzero scalar multiple of an eigenvector is also an eigenvector (same λ)",
          "λ = 0 is an eigenvalue ⟺ Av = 0 has nonzero solutions ⟺ A is <strong>singular</strong> (not invertible)"
        ],
        analogy: "A rubber sheet being stretched. Most drawn arrows tilt and swing as the sheet deforms — but a few special directions stay perfectly aligned, only growing or shrinking. Those unmoving directions are the eigenvectors; the growth factor of each is its eigenvalue. Eigen-analysis is finding the 'grain' of the transformation — the axes along which the distortion is pure scaling."
      },
      workedExample: {
        problem: "Verify that v = (2, 1) is an eigenvector of A = [[3, 6], [1, 4]] and find its eigenvalue.",
        steps: [
          "<strong>Compute Av:</strong> A(2,1) = (3·2 + 6·1, 1·2 + 4·1) = (12, 6)",
          "<strong>Compare with v:</strong> is (12, 6) a scalar multiple of (2, 1)? Yes: (12, 6) = 6·(2, 1)",
          "<strong>Conclusion:</strong> Av = 6v, so v = (2, 1) is an eigenvector with eigenvalue <strong>λ = 6</strong>",
          "<strong>Sanity check on scaling:</strong> 5v = (10, 5) gives A(10,5) = (60, 30) = 6·(10, 5) — any multiple of v is an eigenvector for the same λ"
        ],
        note: "The verification recipe — multiply, then test proportionality — is the fastest way to answer 'is v an eigenvector?' exam parts."
      },
      quiz: [
        {
          id: "q-math7-001",
          type: "calc",
          question: "v = (1, 1) is an eigenvector of A = [[2, 1], [1, 2]]. Compute its eigenvalue λ.",
          setup: "Av = ( 2·1 + 1·1 ,  1·1 + 2·1 ) = (3, 3)\n\nAv = λv  →  (3, 3) = λ·(1, 1)",
          hint: "What scalar times (1,1) gives (3,3)?",
          answer: 3,
          tolerance: 0.01,
          unit: "λ =",
          calcType: "numeric",
          explanation: "Av = (3, 3) = 3·(1, 1), so λ = 3. The matrix stretched the vector by factor 3 without tilting it — the definition of an eigenpair. (This symmetric matrix's other eigenvalue is 1, with eigenvector (1, −1).)",
          xpReward: 35
        },
        {
          id: "q-math7-002",
          type: "mcq",
          question: "Why is the zero vector v = 0 excluded from being an eigenvector?",
          options: [
            "Because A·0 is undefined for most matrices",
            "Because 0 satisfies Av = λv for EVERY λ, making the concept meaningless",
            "Because the zero vector cannot be stored numerically",
            "Because eigenvalues must always be nonzero"
          ],
          answer: 1,
          explanation: "A·0 = 0 = λ·0 holds trivially for every scalar λ — if 0 counted, every number would be an eigenvalue of every matrix and the concept would carry no information. Excluding v = 0 is what makes 'λ is an eigenvalue' a meaningful, restrictive statement. (Note: λ = 0 IS allowed — it's the VECTOR that must be nonzero.)",
          xpReward: 25
        },
        {
          id: "q-math7-003",
          type: "mcq",
          question: "A matrix A has eigenvalue λ = 0. What does this reveal about A?",
          options: [
            "A is the zero matrix",
            "A is singular (not invertible) — it squashes its λ=0 eigenvector to the origin",
            "A is invertible with determinant 1",
            "A must be symmetric"
          ],
          answer: 1,
          explanation: "λ = 0 means Av = 0 for some v ≠ 0 — a nonzero vector is crushed to the origin, so A collapses a whole direction and cannot be undone: A is singular, det(A) = 0. Geometrically the transformation flattens space along that eigenvector. Conversely, invertible ⟺ no zero eigenvalue. A favourite exam link between chapters.",
          xpReward: 25
        },
        {
          id: "q-math7-004",
          type: "truefalse",
          question: "If v is an eigenvector of A with eigenvalue λ, then 5v is also an eigenvector of A with eigenvalue 5λ.",
          answer: 1,
          explanation: "False — 5v IS an eigenvector, but with the SAME eigenvalue λ, not 5λ: A(5v) = 5(Av) = 5(λv) = λ(5v). Scaling an eigenvector never changes its eigenvalue — that's why eigenvectors are reported 'up to scale' and why the eigenspace (all multiples plus 0) is the real object.",
          xpReward: 25
        },
        {
          id: "q-math7-005",
          type: "fillblank",
          question: "The set of ALL solutions of (A − λᵢI)v = 0, including the zero vector, is called the ______ of λᵢ.",
          answer: "eigenspace",
          explanation: "Eigenspace — a subspace of ℝⁿ containing every eigenvector of λᵢ plus the zero vector. A single eigenvalue can have a multi-dimensional eigenspace (several independent eigenvectors). The eigenvectors are exactly the NONZERO elements of the eigenspace.",
          xpReward: 25
        },
        {
          id: "q-math7-006",
          type: "match",
          question: "Match each eigenvalue λ to the geometric action of A on its eigenvector.",
          pairs: [
            { term: "λ = 2",   definition: "Stretches the eigenvector to double length, same direction" },
            { term: "λ = 0.5", definition: "Compresses the eigenvector to half length, same direction" },
            { term: "λ = −1",  definition: "Flips the eigenvector to the opposite direction, same length" },
            { term: "λ = 0",   definition: "Crushes the eigenvector to the zero vector (A is singular)" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The eigenvalue IS the scaling factor: magnitude |λ| controls stretch/compress, the sign controls flip, and zero means annihilation (singularity). Reading geometry from λ is a quick-win exam skill.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 2 — Characteristic Polynomial ───────────────── */
    {
      id: "math7-characteristic",
      title: "Characteristic Polynomial & Gerschgorin Disks",
      subtitle: "det(A − λI) = 0 · Degree n → n eigenvalues · Disk bounds without computation",
      xpReward: 10,
      accent: "cyan",
      content: {
        summary: "For (A − λI)v = 0 to have a nonzero solution, (A − λI) must be <strong>singular</strong>: " +
          "<strong>det(A − λI) = 0</strong>. Expanding this determinant gives the <strong>characteristic polynomial</strong> p(λ) — " +
          "degree n for an n×n matrix, so there are exactly n eigenvalues counting multiplicity (possibly repeated or complex). " +
          "For each root λᵢ, back-substitute into (A − λᵢI)v = 0 to find eigenvectors. When expanding the determinant is too " +
          "expensive, <strong>Gerschgorin's Circle Theorem</strong> bounds all eigenvalues inside disks centred at the diagonal " +
          "entries with radius = sum of absolute off-diagonal entries in that row.",
        formula: "p(λ) = det(A − λI) = 0   ·   Gerschgorin: |λ − aᵢᵢ| ≤ rᵢ = Σⱼ≠ᵢ |aᵢⱼ|",
        bullets: [
          "2×2 shortcut: det([[a−λ, b], [c, d−λ]]) = λ² − (a+d)λ + (ad − bc) = λ² − trace·λ + det",
          "Degree n polynomial → exactly n eigenvalues (counting multiplicity; may be complex)",
          "Eigenvectors: substitute each λᵢ into (A − λᵢI)v = 0 and row-reduce",
          "Gerschgorin disk for row i: centre aᵢᵢ, radius rᵢ = sum of |off-diagonal| entries in row i",
          "ALL eigenvalues lie inside the union of the n disks — a free sanity bound",
          "Product of eigenvalues = det(A); sum of eigenvalues = trace(A) — powerful checks"
        ],
        analogy: "The characteristic polynomial is the matrix's fingerprint: one compact expression that encodes every eigenvalue as a root. And Gerschgorin disks are like knowing which neighbourhoods a suspect frequents before the detailed search — the diagonal entries say where eigenvalues live, and the off-diagonal row sums say how far they can wander from home."
      },
      workedExample: [
        {
          problem: "Find the eigenvalues of A = [[3, 6], [1, 4]] via the characteristic polynomial.",
          steps: [
            "<strong>Form A − λI:</strong> [[3−λ, 6], [1, 4−λ]]",
            "<strong>Determinant:</strong> (3−λ)(4−λ) − 6·1 = 12 − 7λ + λ² − 6 = λ² − 7λ + 6",
            "<strong>Solve p(λ) = 0:</strong> λ² − 7λ + 6 = (λ − 6)(λ − 1) = 0 → <strong>λ₁ = 6, λ₂ = 1</strong>",
            "<strong>Check:</strong> sum = 7 = trace(3+4) ✓ · product = 6 = det(12−6) ✓",
            "<strong>Eigenvector for λ = 6:</strong> (A − 6I)v = [[−3, 6], [1, −2]]v = 0 → row-reduce → v = t(2, 1)"
          ],
          note: "Always verify with trace and determinant — two seconds of checking catches most algebra slips."
        },
        {
          problem: "Bound the eigenvalues of B = [[3, −2, 1], [−1, 3, 1], [1, −2, −4]] using Gerschgorin disks.",
          steps: [
            "<strong>Row 1:</strong> centre 3, radius |−2| + |1| = 3 → disk [0, 6]",
            "<strong>Row 2:</strong> centre 3, radius |−1| + |1| = 2 → disk [1, 5]",
            "<strong>Row 3:</strong> centre −4, radius |1| + |−2| = 3 → disk [−7, −1]",
            "<strong>Conclusion:</strong> every eigenvalue of B lies in [−7, −1] ∪ [0, 6] — no polynomial expansion needed"
          ],
          note: "Radius uses OFF-diagonal entries of the row only — including the diagonal entry in the sum is the classic mistake."
        }
      ],
      quiz: [
        {
          id: "q-math7-007",
          type: "calc",
          question: "For A = [[2, 1], [4, 2]], the characteristic polynomial is λ² − 4λ + 0. Compute the LARGER eigenvalue.",
          setup: "p(λ) = λ² − (trace)λ + det = λ² − 4λ + (2·2 − 1·4) = λ² − 4λ + 0\nFactor: λ(λ − 4) = 0",
          hint: "Roots of λ(λ − 4) = 0",
          answer: 4,
          tolerance: 0.01,
          unit: "λ =",
          calcType: "numeric",
          explanation: "λ(λ − 4) = 0 gives λ = 0 and λ = 4; the larger is 4. Note the zero eigenvalue: det(A) = 0, so A is singular — row 2 is exactly twice row 1. The 2×2 shortcut p(λ) = λ² − trace·λ + det turns every 2×2 eigenvalue problem into one quadratic.",
          xpReward: 35
        },
        {
          id: "q-math7-008",
          type: "calc",
          question: "Compute the Gerschgorin radius r₁ for row 1 of B = [[3, −2, 1], [−1, 3, 1], [1, −2, −4]].",
          setup: "Row 1: [3, −2, 1]\nRadius = sum of |off-diagonal| entries = |−2| + |1|",
          hint: "Exclude the diagonal entry (3); sum absolute values of the rest",
          answer: 3,
          tolerance: 0.01,
          unit: "r₁ =",
          calcType: "numeric",
          explanation: "r₁ = |−2| + |1| = 3, giving the disk centred at 3 with radius 3 → interval [0, 6]. The diagonal entry is the CENTRE, never part of the radius. All three disks together ([0,6], [1,5], [−7,−1]) trap every eigenvalue of B.",
          xpReward: 35
        },
        {
          id: "q-math7-009",
          type: "mcq",
          question: "Why must det(A − λI) = 0 for λ to be an eigenvalue?",
          options: [
            "Because determinants are always zero for square matrices",
            "Because (A − λI)v = 0 needs a NONZERO solution v, which exists only when (A − λI) is singular",
            "Because the determinant equals the trace at eigenvalues",
            "Because λI must be invertible"
          ],
          answer: 1,
          explanation: "A homogeneous system Mv = 0 has only v = 0 when M is invertible; nonzero solutions (eigenvectors!) require M = A − λI to be singular, and singular ⟺ zero determinant. The whole eigenvalue machinery flows from this single logical step: eigenvector exists → singular → det = 0 → polynomial in λ.",
          xpReward: 25
        },
        {
          id: "q-math7-010",
          type: "mcq",
          question: "An n × n matrix has how many eigenvalues?",
          options: [
            "At most n/2",
            "Exactly n, counting multiplicity (some may be repeated or complex)",
            "Always exactly n distinct real values",
            "It depends on the rank of the matrix"
          ],
          answer: 1,
          explanation: "The characteristic polynomial has degree n, and a degree-n polynomial has exactly n roots counting multiplicity (fundamental theorem of algebra) — repeats and complex pairs allowed. 'n DISTINCT REAL eigenvalues' is the trap: [[0,1],[−1,0]] (rotation) has complex ones, and [[1,1],[0,1]] has λ = 1 twice.",
          xpReward: 25
        },
        {
          id: "q-math7-011",
          type: "truefalse",
          question: "Gerschgorin's theorem gives the exact eigenvalues of a matrix without computing the characteristic polynomial.",
          answer: 1,
          explanation: "False — Gerschgorin gives BOUNDS, not values: every eigenvalue lies somewhere inside the union of the disks, but the theorem doesn't say where. Its value is cheap sanity-checking (does my computed λ fall inside the disks?) and bounding the search region for numerical methods like the Power Method.",
          xpReward: 25
        },
        {
          id: "q-math7-012",
          type: "mcq",
          question: "A 2×2 matrix has trace 7 and determinant 6. Its eigenvalues are:",
          options: [
            "λ = 7 and λ = 6",
            "λ = 6 and λ = 1 — they must sum to 7 and multiply to 6",
            "λ = 3 and λ = 4 — they must sum to 7",
            "Cannot be determined from trace and determinant"
          ],
          answer: 1,
          explanation: "Sum of eigenvalues = trace = 7 and product = det = 6 → solve λ² − 7λ + 6 = 0 → λ = 6, 1. (Option C sums to 7 but multiplies to 12 ✗.) For 2×2 matrices, trace + det fully determine the characteristic polynomial — the fastest route to eigenvalues in an exam.",
          xpReward: 25
        }
      ]
    },

    /* ───────────────── SECTION 3 — Power Method ───────────────── */
    {
      id: "math7-power-method",
      title: "The Power Method",
      subtitle: "Iterate, normalise, repeat · Converges to the DOMINANT eigenvalue · Requirements & stopping",
      xpReward: 10,
      accent: "purple",
      content: {
        summary: "The Power Method finds the <strong>dominant eigenvalue</strong> (largest |λ|) and its eigenvector by " +
          "repeated multiplication: u⁽ᵏ⁺¹⁾ = Av⁽ᵏ⁾, take m<sub>k+1</sub> = the component of largest absolute value " +
          "(the eigenvalue estimate), normalise v⁽ᵏ⁺¹⁾ = u⁽ᵏ⁺¹⁾/m<sub>k+1</sub>, repeat. Any starting vector contains " +
          "a mix of eigenvector directions; multiplying by A scales the dominant direction by λ₁ each time while the others " +
          "grow slower — after enough iterations only the dominant survives. Requirements: A diagonalisable and a " +
          "<em>unique</em> largest-magnitude eigenvalue.",
        formula: "u⁽ᵏ⁺¹⁾ = A v⁽ᵏ⁾   ·   mₖ₊₁ = largest-|·| component   ·   v⁽ᵏ⁺¹⁾ = u⁽ᵏ⁺¹⁾ / mₖ₊₁",
        bullets: [
          "Finds ONLY the dominant eigenvalue (largest absolute value) and its eigenvector",
          "mₖ → λ₁ and v⁽ᵏ⁾ → dominant eigenvector as k → ∞",
          "Normalisation prevents overflow AND extracts the eigenvalue estimate — two jobs in one step",
          "Requirement 1: A diagonalisable (n independent eigenvectors)",
          "Requirement 2: unique dominant eigenvalue — a tie for largest |λ| breaks convergence",
          "Stop when |mₖ₊₁ − mₖ| < ε or ‖v⁽ᵏ⁺¹⁾ − v⁽ᵏ⁾‖ < ε",
          "vs characteristic polynomial: Power Method scales to large matrices but yields one eigenvalue; the polynomial yields all but is impractical for large n"
        ],
        analogy: "Drop a leaf anywhere in a river. Weak eddies (small eigenvalues) tug it briefly, but the main current (dominant eigenvalue) compounds its advantage with every metre — eventually the leaf traces the main flow exactly, regardless of where it was dropped. Repeated multiplication by A is the river; normalisation just keeps the leaf from washing over the waterfall (numeric overflow) while you measure the current's strength."
      },
      workedExample: {
        problem: "Run one Power Method iteration for A = [[1, 2, −1], [1, 0, 1], [4, −4, 5]] starting from v⁽⁰⁾ = (0, 0, 1)ᵀ.",
        steps: [
          "<strong>Multiply:</strong> u⁽¹⁾ = A·(0, 0, 1)ᵀ = (−1, 1, 5)ᵀ  (each row dotted with v⁽⁰⁾ picks out its 3rd column entry)",
          "<strong>Eigenvalue estimate:</strong> the largest-magnitude component of (−1, 1, 5) is m₁ = <strong>5</strong>",
          "<strong>Normalise:</strong> v⁽¹⁾ = (−1/5, 1/5, 5/5) = (−0.2, 0.2, 1.0)",
          "<strong>Convergence check:</strong> ‖v⁽¹⁾ − v⁽⁰⁾‖ = ‖(−0.2, 0.2, 0)‖ = √0.08 ≈ 0.283 > ε → continue",
          "<strong>Repeat:</strong> u⁽²⁾ = Av⁽¹⁾, take its largest component as m₂, normalise, … until the m-values stabilise at λ₁"
        ],
        note: "The sequence m₁, m₂, m₃, … IS the running eigenvalue estimate — exam answers usually ask for the m value after each iteration."
      },
      quiz: [
        {
          id: "q-math7-013",
          type: "calc",
          question: "Power Method on A = [[2, 1], [1, 2]] with v⁽⁰⁾ = (1, 0)ᵀ: compute u⁽¹⁾ = Av⁽⁰⁾ and report the eigenvalue estimate m₁ (largest-magnitude component).",
          setup: "u⁽¹⁾ = A·(1, 0)ᵀ = ( 2·1 + 1·0 ,  1·1 + 2·0 ) = (2, 1)\n\nm₁ = component with largest absolute value",
          hint: "Compare |2| and |1|",
          answer: 2,
          tolerance: 0.01,
          unit: "m₁ =",
          calcType: "numeric",
          explanation: "u⁽¹⁾ = (2, 1), so m₁ = 2. Normalising: v⁽¹⁾ = (1, 0.5). The next iteration gives u⁽²⁾ = (2.5, 2) → m₂ = 2.5, then 2.8, 2.929… converging to the true dominant eigenvalue λ₁ = 3 (eigenvector direction (1,1)). Watch the estimates climb toward 3 — the river current taking over.",
          xpReward: 35
        },
        {
          id: "q-math7-014",
          type: "mcq",
          question: "The Power Method converges to which eigenvalue?",
          options: [
            "The smallest eigenvalue",
            "The eigenvalue closest to zero",
            "The dominant eigenvalue — the one with the largest ABSOLUTE value",
            "All eigenvalues simultaneously"
          ],
          answer: 2,
          explanation: "The dominant (largest |λ|) — because Aᵏ scales each eigencomponent by λᵢᵏ, and the biggest |λᵢ| compounds fastest, eventually drowning out the rest. Note it's absolute value: λ = −5 dominates λ = 3. One eigenvalue only — for all of them, you need the characteristic polynomial (or repeated deflation).",
          xpReward: 25
        },
        {
          id: "q-math7-015",
          type: "mcq",
          question: "A matrix has eigenvalues λ = 4 and λ = −4. What happens when the Power Method is applied?",
          options: [
            "It converges to 4, the positive one",
            "It converges to −4, encountered first",
            "It fails to converge to a single eigenvector — the dominant eigenvalue is not unique (|4| = |−4|)",
            "It converges to 0, the average"
          ],
          answer: 2,
          explanation: "Convergence requires a UNIQUE largest-magnitude eigenvalue. With |4| = |−4|, the two components never separate — the iterates oscillate between mixtures instead of settling on one direction. This is requirement #2 of the method (the other being diagonalisability); a favourite conceptual exam trap.",
          xpReward: 25
        },
        {
          id: "q-math7-016",
          type: "mcq",
          question: "The normalisation step (dividing u⁽ᵏ⁾ by its largest component) serves what TWO purposes?",
          options: [
            "It makes the matrix symmetric and speeds convergence",
            "It prevents numerical overflow AND the divisor itself is the running eigenvalue estimate",
            "It guarantees convergence even with tied eigenvalues",
            "It orthogonalises the iterates against previous eigenvectors"
          ],
          answer: 1,
          explanation: "Two jobs in one: (1) without normalisation the vector's entries would grow like λ₁ᵏ and overflow; (2) the scale factor mₖ you divide by is exactly the current estimate of λ₁ — because once v is (nearly) the dominant eigenvector, Av ≈ λ₁v, so the factor that renormalises is ≈ λ₁. Elegant bookkeeping, standard exam explanation point.",
          xpReward: 25
        },
        {
          id: "q-math7-017",
          type: "truefalse",
          question: "For a very large sparse matrix where only the single largest eigenvalue is needed, the Power Method is preferable to expanding the characteristic polynomial.",
          answer: 0,
          explanation: "True. Expanding det(A − λI) for large n is computationally hopeless and numerically unstable, while each Power Method step is just one cheap matrix–vector multiply — and it delivers exactly what's needed (the dominant pair). The trade-off table: polynomial = all eigenvalues, small matrices only; Power Method = one eigenvalue, any size.",
          xpReward: 25
        },
        {
          id: "q-math7-018",
          type: "fillblank",
          question: "The Power Method stops when |mₖ₊₁ − mₖ| < ε — that is, when successive ______ estimates nearly agree.",
          answer: "eigenvalue",
          explanation: "Eigenvalue estimates. The same successive-difference stopping logic as Newton/secant in Chapter 6: iterate until the answers stop changing. Equivalently one can test the vector difference ‖v⁽ᵏ⁺¹⁾ − v⁽ᵏ⁾‖ < ε — both criteria appear in exam mark schemes.",
          xpReward: 25
        }
      ]
    }
  ]
};
