---
title: "Row Echelon Form"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Row Echelon Form

A matrix is in row echelon form (REF) when it has a staircase pattern of leading nonzero entries descending left-to-right, with all-zero rows at the bottom; reduced row echelon form (RREF) further requires each pivot to equal 1 and be the only nonzero entry in its column.

> [!concept] Core Claim
> REF and RREF are target shapes, not algorithms: they define what "solved" looks like, with REF enabling back-substitution and RREF enabling direct reading of the solution — the difference is how much work remains after reaching the form.

## Explanation

Think of row echelon form as a staircase in a building: each step (pivot) is strictly to the right of and below the step before it, and everything below each step is empty (zero). REF enforces that staircase — the entries to the lower-left of every pivot are all zero. RREF adds a second rule: not only must the staircase go left-to-right-and-down, but each step must be exactly height 1 (pivot = 1) and the space above each step must also be cleared (zeros above each pivot too).

The mechanism is the position of pivots. A **pivot** is the leading nonzero entry in each nonzero row. In REF, each pivot sits strictly to the right of the pivot in the row above — this is the staircase condition. Variables whose columns contain a pivot are **leading variables** (they are determined); all other variables are **free variables** (they can take any value and are assigned as parameters). The number of free variables equals the number of non-pivot columns in the variable portion of the matrix.

The consequence is algorithmic: REF is the output of Gaussian elimination, after which back-substitution recovers the solution by working upward from the last equation. RREF is the output of Gauss-Jordan elimination, which continues zeroing above the pivots so the solution can be read directly from the matrix without any further arithmetic. Both forms expose the solution type: a row [0 0 … 0 | c ≠ 0] means no solution; a row of all zeros means infinitely many solutions.

## Key Points

- REF conditions: (1) all-zero rows below nonzero rows; (2) each pivot is strictly right of the pivot above; (3) entries below each pivot are zero
- RREF adds: (4) each pivot = 1; (5) entries above each pivot are also zero
- Leading variable: corresponds to a pivot column; free variable: corresponds to a non-pivot column
- REF → back-substitution needed; RREF → solution readable directly

## Example

REF (valid — staircase, zeros below pivots, any pivot value):
```
[2  1  1 | 7]
[0  2 -1 | 1]
[0  0  3 | 9]
```
Pivots: 2, 2, 3. All leading variables. Back-substitute from row 3 upward.

RREF (valid — pivots are 1, zeros above and below each pivot):
```
[1  0  0 | 3]
[0  1  0 | 2]
[0  0  1 | 1]
```
Solution reads directly: x₁ = 3, x₂ = 2, x₃ = 1.

Not REF (invalid — row 3's leading entry is not strictly right of row 2's):
```
[3  2  1]
[0  0  1]   ← pivot at column 3
[0  2  0]   ← pivot at column 2 (not further right than row above)
```

Visual summary (# = pivot, * = any value, 0 = zero):
```
REF:  # * * *     RREF:  1 0 0 *
      0 # * *             0 1 0 *
      0 0 # *             0 0 1 *
      0 0 0 0             0 0 0 0
```

> [!recall] A 3×4 augmented matrix is in REF with pivots in columns 1, 2, and 4. Column 3 has no pivot. (a) Which variables are free? (b) How many parameters will the general solution have? (c) Is the system consistent? Explain how you know from the REF alone.

## See Also

- [[elementary-row-operations|Elementary Row Operations]] — the tools used to reach REF/RREF
- [[gaussian-elimination|Gaussian Elimination]] — produces REF, then applies back-substitution
- [[gauss-jordan-elimination|Gauss-Jordan Elimination]] — produces RREF directly
