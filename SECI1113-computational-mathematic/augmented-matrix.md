---
title: "Augmented Matrix"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Augmented Matrix

An augmented matrix [A|b] combines the coefficient matrix A and the constant vector b into a single grid, allowing row operations to be performed on the full system without rewriting the equations at every step.

> [!concept] Core Claim
> The augmented matrix is a notational compression: it strips away variable names (which carry no information during elimination) and keeps only the numbers that change, turning equation manipulation into pure arithmetic on rows.

## Explanation

Think of the augmented matrix as a luggage tag for a system of equations: instead of carrying the full address (variable names, equals signs, all the algebraic ceremony) at every step, you record just the essential numbers — coefficients on the left, constants on the right — in a compact grid. Everything you legally do to the equations, you do to the rows of the grid instead.

Any system of m equations in n unknowns can be written as AX = b, where A is the m × n coefficient matrix, X is the n × 1 column of unknowns, and b is the m × 1 column of constants. The augmented matrix [A|b] appends b as column n+1, separated visually by a vertical bar. The bar is just a reminder that this last column came from the right-hand side of the equations.

The power of the augmented matrix is that every legal algebraic step (swapping equations, scaling an equation, adding a multiple of one equation to another) corresponds exactly to the same operation on rows. This equivalence is what guarantees that solving [A|b] by row operations gives the correct solution to the original system. Two key row signatures reveal the solution type without further work: a row [0 0 … 0 | c] with c ≠ 0 encodes the impossible statement 0 = c, meaning no solution exists; a row of all zeros means one equation is redundant, and free variables will produce infinitely many solutions.

## Key Points

- [A|b] has m rows and n+1 columns; the last column holds the right-hand side constants
- Row operations on [A|b] correspond exactly to legal algebraic steps on the original system
- Row [0 0 … 0 | c ≠ 0]: inconsistent system — no solution
- Row [0 0 … 0 | 0]: redundant equation — infinite solutions possible

## Example

System:
```
 x₁ +  x₂ + 5x₃ =  5
3x₁ − 2x₂ +  x₃ = 10
2x₁ − 4x₂ +  x₃ =  8
```

Augmented matrix:
```
[1   1   5 |  5]
[3  -2   1 | 10]
[2  -4   1 |  8]
```

After one row operation R2 ← R2 − 3R1:
```
[1   1   5 |  5]
[0  -5 -14 | -5]
[2  -4   1 |  8]
```

The entry in position (2,1) is now 0 — exactly as if we had subtracted 3 × (equation 1) from equation 2 algebraically.

> [!recall] Write the augmented matrix for this system: 2x − y + z = 3; x + 3y − 2z = 1; −x + y + 4z = 7. After writing it, perform R2 ← R2 − (1/2)R1 and R3 ← R3 + (1/2)R1. What pattern are you creating, and what is the goal of these steps?

## See Also

- [[system-of-linear-equations-solution-types|System of Linear Equations: Solution Types]] — what the row signatures mean for solutions
- [[elementary-row-operations|Elementary Row Operations]] — the operations applied to augmented matrices
- [[gaussian-elimination|Gaussian Elimination]] — uses the augmented matrix as its workspace
