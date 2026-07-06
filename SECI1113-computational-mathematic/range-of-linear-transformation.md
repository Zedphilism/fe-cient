---
title: "Range of a Linear Transformation"
date: 2026-04-26
tags: [semester-3, seci1113, discrete-math]
---

# Range of a Linear Transformation

The range (image) of a linear transformation T: V → W is the set of all vectors in the codomain W that are the image of at least one vector in V — it is always a subspace of W and captures exactly how much of W the transformation can "reach."

> [!concept] Core Claim
> R(T) = {T(v) | v ∈ V}; equivalently, R(T) = span{T(v₁), T(v₂), …, T(vₙ)} where {v₁,…,vₙ} is any basis of V — the range is spanned by the images of the basis vectors.

## Explanation

Think of the range as the shadow cast by V when light shines through T. V might be three-dimensional, but if T maps everything onto a plane in W, the range is only two-dimensional. The range tells you the "output space" of the transformation — which vectors in W can actually be produced.

The key theorem: for a basis B = {v₁, v₂, …, vₙ} of V, the range equals the span of {T(v₁), T(v₂), …, T(vₙ)}. This means you only need to transform the basis vectors, then find which of those images are linearly independent — those independent images form a basis for the range.

For T(x) = Ax (matrix transformation), the range is the column space of A: every output Ax is a linear combination of the columns of A, so the range is spanned by A's columns. The dimension of the range is called the rank of T (or rank of A), and it counts how many linearly independent output directions T can produce.

## Key Points

- R(T) = {T(v) | v ∈ V} — a subspace of W
- R(T) = span{T(v₁), …, T(vₙ)} for any basis {v₁,…,vₙ} of V
- dim(R(T)) = rank(T)
- For T(x) = Ax: range = column space of A
- T is surjective (onto) ⟺ R(T) = W
- Rank-Nullity: rank(T) + nullity(T) = dim(V)

## Example

T: R³ → R³ is a linear operator with basis images:
T(v₁) = (1,1,0), T(v₂) = (1,0,−1), T(v₃) = (2,1,−1)

Note T(v₃) = T(v₁) + T(v₂), so T(v₃) is linearly dependent on T(v₁) and T(v₂).
R(T) = span{(1,1,0), (1,0,−1)}, dim(R(T)) = 2 (rank = 2)

Check if w = (1,2,1) ∈ R(T): solve c₁(1,1,0) + c₂(1,0,−1) = (1,2,1).
c₁+c₂=1, c₁=2, −c₂=1 → c₂=−1, c₁=2. Consistent → w ∈ R(T). ✓

> [!recall] For T: R⁴ → R³ from the Kernel example above (T(a,b,c,d) = (a+b, b−c, a+d)), the kernel has dimension 1. Use Rank-Nullity to find dim(R(T)). Is T surjective? Justify.

## See Also

- [[linear-transformation|Linear Transformation]] — the function whose range we study
- [[kernel-of-linear-transformation|Kernel]] — the complementary concept; rank-nullity links them
- [[linear-independence-and-dependence|Linear Independence]] — determines which image vectors span the range
- [[vector-subspace|Subspace]] — the range is always a subspace of the codomain W
