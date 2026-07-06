---
title: "Python Numerical Methods: NumPy and SciPy"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Python Numerical Methods: NumPy and SciPy

NumPy and SciPy provide ready-made implementations for every major numerical method in SECI1113 — linear systems, eigenvalues, root-finding, interpolation, and integration — replacing manual iterations with single function calls while using the same underlying algorithms.

> [!concept] Core Claim
> NumPy and SciPy are verified, optimised implementations of the same algorithms studied by hand: `numpy.linalg.solve` uses LU decomposition (the same elimination process as Gaussian), `numpy.linalg.eig` solves the characteristic polynomial, and `scipy.integrate.quad` performs adaptive integration — knowing the manual method tells you exactly what the library function is doing inside.

## Explanation

Think of NumPy and SciPy as a professional workshop where every tool you learned to use by hand (a hand saw, a hand plane) has an industrial equivalent (a table saw, a thickness planer). The industrial versions are faster and more precise, but you need to understand the manual tools first to know when to use each machine, what settings to choose, and how to interpret the output when it looks wrong.

NumPy is the foundation library: it provides the `ndarray` (n-dimensional array) as the universal data structure for vectors and matrices, and `numpy.linalg` for core linear algebra operations. Every matrix you set up by hand with pen and paper is a `np.array([...])` in code. SciPy is built on top of NumPy and adds higher-level algorithms: `scipy.integrate.quad` for numerical integration (using adaptive Gaussian quadrature, far more accurate than trapezoidal rule), `scipy.interpolate.interp1d` for interpolation, and `scipy.optimize` for root-finding (including bisection).

The relationship between hand methods and library functions is direct: `numpy.linalg.solve(A, b)` performs LU decomposition (a form of Gaussian elimination) internally; `numpy.linalg.eig(A)` returns both the eigenvalue array and the eigenvector matrix simultaneously; `scipy.integrate.quad(f, a, b)` adaptively refines the step size until the error estimate meets tolerance. Bisection and secant methods are typically implemented manually using a `while` loop in coursework, which replicates the exact iteration process studied in the notes.

## Key Points

- `import numpy as np`; define matrices as `np.array([[...]])`
- `np.linalg.solve(A, b)` — solves AX = b using LU decomposition
- `np.linalg.inv(A)` — matrix inverse; `np.linalg.det(A)` — determinant
- `np.linalg.eig(A)` — returns (eigenvalues array, eigenvectors matrix)
- `scipy.integrate.quad(f, a, b)` — adaptive integration (much more accurate than trapezoid)
- Root-finding and iterative methods (bisection, Newton, secant) are implemented manually

## Example

Solve 2x₁ + x₂ + x₃ = 7; 3x₁ + 2x₂ − x₃ = 4; x₁ − 4x₂ + 2x₃ = −1:

```python
import numpy as np

A = np.array([[2, 1, 1], [3, 2, -1], [1, -4, 2]])
b = np.array([7, 4, -1])
x = np.linalg.solve(A, b)
print("x1 =", round(x[0], 2), "; x2 =", round(x[1], 2), "; x3 =", round(x[2], 2))
# Output: x1 = 1.0 ; x2 = 2.0 ; x3 = 3.0
```

Bisection method — manual implementation for f(x) = x³ − 3x² + 8x − 5 on [0, 1], ε = 0.001:

```python
def f(x):
    return x**3 - 3*x**2 + 8*x - 5

def bisection(a, b, eps):
    while abs(b - a) > eps:
        c = (a + b) / 2
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    return (a + b) / 2

print(bisection(0, 1, 0.001))
```

Eigenvalues of A = [[3, 6], [1, 4]]:
```python
vals, vecs = np.linalg.eig(np.array([[3, 6], [1, 4]]))
print("Eigenvalues:", vals)      # [6. 1.]
print("Eigenvectors:\n", vecs)  # columns are eigenvectors
```

> [!recall] Write a Python function `newton(f, df, x0, eps)` that implements the Newton-Raphson method, stopping when |xₙ₊₁ − xₙ| < eps. Test it on f(x) = x³ − 2x² − 5 with x₀ = 2 and ε = 0.0001. Then call `np.linalg.solve` on the same 3×3 system shown in the example above and verify that the library result matches the hand-computed solution x₁ = 1, x₂ = 2, x₃ = 3.

## See Also

- [[gaussian-elimination|Gaussian Elimination]] — the manual algorithm that `numpy.linalg.solve` implements
- [[bisection-method|Bisection Method]] — the algorithm being coded as a manual `while` loop
- [[eigenvalue-eigenvector-definition|Eigenvalues and Eigenvectors]] — `np.linalg.eig(A)` computes these
- [[trapezoidal-rule|Trapezoidal Rule]] — `scipy.integrate.quad` is a more accurate adaptive alternative
