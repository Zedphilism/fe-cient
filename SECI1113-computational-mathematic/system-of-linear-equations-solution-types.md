---
title: "System of Linear Equations: Solution Types"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# System of Linear Equations: Solution Types

A system of linear equations always falls into exactly one of three categories — unique solution, infinitely many solutions, or no solution — and the augmented matrix reveals which category applies.

> [!concept] Core Claim
> The three solution types are a consequence of flat-object geometry: lines and planes can intersect at a single point, overlap completely, or run parallel without ever meeting — no other configurations are possible, so no fourth case exists.

## Explanation

Think of each equation as a flat sheet of glass in space: a line in 2D, a plane in 3D. The solution to a system is the physical intersection of all those sheets. Sheets in a room can only do three things — cross at one precise point, lie exactly on top of each other, or sit parallel with a gap between them. The three solution types map directly to these three physical outcomes.

The mechanism that produces each outcome is the relationship between the equations. A unique solution (consistent, independent) occurs when no equation is redundant and the constraints are compatible — the sheets cross at exactly one point. Infinitely many solutions (consistent, dependent) occur when at least one equation is a scalar multiple of another — two sheets are the same sheet, so every point on the overlap satisfies all equations. No solution (inconsistent) occurs when two equations contradict each other — the sheets are parallel and never meet, so no point can satisfy all equations simultaneously.

The augmented matrix reveals the solution type automatically during Gaussian elimination. A row of the form [0 0 … 0 | c] where c ≠ 0 is a contradiction (0 = c) and signals no solution. A row of all zeros signals a redundant equation and, together with free variables, produces infinitely many solutions. When every variable has a pivot and no contradiction appears, the solution is unique.

## Key Points

- Unique: consistent and independent; one intersection point; every variable is a leading variable
- Infinite: consistent and dependent; redundant equation(s); at least one free variable; all-zero row(s) in RREF
- None: inconsistent; row [0 0 … 0 | c ≠ 0] appears during elimination
- Exactly three cases — no other outcome is possible for a linear system

## Example

System 1 — unique solution: y = 3x − 2 and y = −x − 6 intersect at (−1, −5).
- Verify: 3(−1) − 2 = −5 ✓ and −(−1) − 6 = −5 ✓

System 2 — infinitely many solutions: x + y = 3 and 2x + 2y = 6.
- Second equation = 2 × first. Any (t, 3 − t) satisfies both. General solution: x₁ = t, x₂ = 3 − t.

System 3 — no solution: x + y = 3 and x + y = 5.
- Same left side, different right sides → 3 = 5, a contradiction. No ordered pair works.

Augmented matrix signature:
```
No solution:         [0  0  |  5]    ← 0 = 5, impossible
Infinite solutions:  [0  0  |  0]    ← redundant equation, free variable remains
Unique solution:     [1  0  |  3]    ← every variable has a leading 1
                     [0  1  | -2]
```

> [!recall] A 3×3 system produces this RREF augmented matrix: row 1 = [1 0 2 | 4], row 2 = [0 1 -1 | 3], row 3 = [0 0 0 | 0]. Identify the solution type, state which variable is free, and write the general solution in parametric form.

## See Also

- [[linear-equation-definition|Linear Equation]] — what constitutes a single linear equation
- [[augmented-matrix|Augmented Matrix]] — how to represent a system in matrix form
- [[gaussian-elimination|Gaussian Elimination]] — the standard algorithm that reveals the solution type
