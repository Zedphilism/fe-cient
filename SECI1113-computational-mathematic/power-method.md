---
title: "Power Method"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Power Method

The power method is an iterative algorithm that finds the dominant eigenvalue (the one with the largest absolute value) and its eigenvector by repeatedly multiplying A by a normalised vector until the result stabilises.

> [!concept] Core Claim
> The power method exploits the fact that repeated multiplication by A amplifies the dominant eigenvector direction at the expense of all others: any starting vector has components in all eigenvector directions, but Aᵏ scales the dominant direction by λ₁ᵏ while others scale by smaller λᵢᵏ — after enough iterations, only the dominant component survives and the scale factor converges to λ₁.

## Explanation

Think of the power method like a river's current: drop a leaf (starting vector) anywhere in the river, and regardless of where you drop it, the strongest current (dominant eigenvalue direction) will eventually carry it to the main flow. Weak eddies (smaller eigenvalues) lose their influence over time because they grow slower than the main current. After many steps, the leaf traces the dominant flow path.

The algorithm is iterative: start with any nonzero vector v⁽⁰⁾. Multiply by A to get u⁽¹⁾ = Av⁽⁰⁾. Find the component mₖ of u⁽¹⁾ with the largest absolute value — this is the current eigenvalue estimate. Normalise: v⁽¹⁾ = u⁽¹⁾/m₁. Repeat: u⁽ᵏ⁺¹⁾ = Av⁽ᵏ⁾, mₖ₊₁ = largest-magnitude component, v⁽ᵏ⁺¹⁾ = u⁽ᵏ⁺¹⁾/mₖ₊₁. The normalisation step does two things simultaneously: it prevents numerical overflow (the vector stays scaled near 1) and it extracts the eigenvalue estimate from the scale factor.

As k → ∞, mₖ converges to the dominant eigenvalue λ₁ and v⁽ᵏ⁾ converges to the corresponding eigenvector. Convergence requires that A is diagonalisable (has n linearly independent eigenvectors) and that there is exactly one eigenvalue with the largest absolute value — if two eigenvalues tie for largest magnitude, the method fails to converge to a single eigenvector. The trade-off versus the characteristic polynomial method is clear: the power method is numerically stable and efficient for large matrices but gives only one eigenvalue; the characteristic polynomial gives all eigenvalues but becomes impractical for large n.

## Key Points

- Finds the dominant eigenvalue (largest |λ|) and its eigenvector only
- Requires: A diagonalisable and unique dominant eigenvalue (no tie for largest |λ|)
- Each step: u⁽ᵏ⁺¹⁾ = Av⁽ᵏ⁾; mₖ₊₁ = largest absolute component; v⁽ᵏ⁺¹⁾ = u/mₖ₊₁
- mₖ → λ₁ (dominant eigenvalue); v⁽ᵏ⁾ → dominant eigenvector
- Stop when ‖v⁽ᵏ⁺¹⁾ − v⁽ᵏ⁾‖ < ε or |mₖ₊₁ − mₖ| < ε

## Example

A = [[1, 2, −1], [1, 0, 1], [4, −4, 5]], v⁽⁰⁾ = (0, 0, 1)ᵀ, ε = 0.001.

Iteration 1:
u⁽¹⁾ = A·(0, 0, 1)ᵀ = (−1, 1, 5)ᵀ
m₁ = 5 (largest absolute component)
v⁽¹⁾ = (−1/5, 1/5, 1) = (−0.2, 0.2, 1.0)

Check convergence: ‖v⁽¹⁾ − v⁽⁰⁾‖ = ‖(−0.2, 0.2, 0)‖ = √(0.04+0.04) ≈ 0.283 > 0.001 → continue.

Continue iterating. The scale factors m₁, m₂, m₃, … converge to the dominant eigenvalue; the vectors v⁽ᵏ⁾ converge to the dominant eigenvector.

> [!recall] Apply two iterations of the power method to A = [[2, 1], [1, 2]] starting with v⁽⁰⁾ = (1, 0)ᵀ. After each iteration, state your current estimate of the dominant eigenvalue. The true eigenvalues of this matrix are 3 and 1 — verify that your iteration is converging toward 3. Why does the method converge to 3 rather than 1?

## See Also

- [[eigenvalue-eigenvector-definition|Eigenvalues and Eigenvectors]] — defines what the power method is approximating
- [[characteristic-polynomial|Characteristic Polynomial]] — exact analytical method; power method is the numerical alternative
- [[convergence-criteria|Convergence Criteria]] — stopping condition ε applied to iterate differences
