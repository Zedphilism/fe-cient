---
title: "Logic Circuits and Boolean Expressions"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Logic Circuits and Boolean Expressions

A logic circuit is the physical realisation of a Boolean expression — each operation in the expression is one gate, and the gates are connected in the same structure as the expression's evaluation order.

> [!concept] Core Claim
> Boolean expression and logic circuit are two representations of the same function: converting between them is mechanical — every operation becomes a gate, every parenthesised sub-expression becomes a gate whose output feeds the next.

## Explanation

Think of a Boolean expression as a recipe and the logic circuit as the kitchen equipment needed to execute it: each step in the recipe (AND this, OR that) is one piece of equipment (one gate), and the output of each step becomes the input to the next. The recipe and the kitchen are different descriptions of the same meal.

The mechanism of expression-to-circuit conversion flows outward from the innermost sub-expressions. Identify the deepest set of parentheses first — that sub-expression is the first gate to resolve. Its output becomes a wire that feeds into the gate for the next level of parentheses, working outward until the final gate produces the output signal. This left-to-right, inside-out evaluation order is exactly how a digital circuit propagates a signal from inputs to output.

The reverse — circuit-to-expression — is equally mechanical: trace each gate's output as an algebraic expression, propagating it forward. The first gate's output is its Boolean expression. Its label feeds into the next gate's expression, and so on, until the final output wire carries the complete expression. This is how engineers analyze circuits they did not design.

The consequence is that simplification and circuit design are the same activity. A simpler expression — fewer terms, fewer literals — maps directly to fewer gates, fewer connections, and lower cost. This is why Boolean algebra and DeMorgan's theorems are engineering tools, not just math exercises.

## Key Points

- Each Boolean operation → one gate in the circuit
- Parentheses → gates whose output feeds the next level
- Depth of circuit = nesting depth of the expression
- Expression → circuit: resolve innermost first, work outward
- Circuit → expression: label each gate output, propagate forward

## Example

Expression: Z = A·(B + C·D)

Step 1: C·D → AND gate on C, D → intermediate wire X
Step 2: B + X → OR gate on B and X → intermediate wire Y
Step 3: A·Y → AND gate on A and Y → output Z

Circuit: 2 AND gates + 1 OR gate, 3 levels deep.

Reverse check: trace Z backward: Z = A·Y, Y = B+X, X = C·D → substitute: Z = A·(B + C·D) ✓

> [!recall] Convert Z = (A+B)'·C + D to a gate circuit. Draw the connections (or describe them precisely). Then determine the output for A=0, B=1, C=1, D=0 by tracing the circuit.

## See Also

- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — simplifies the expression before the circuit is built
- [[boolean-expression-to-truth-table-maps-all-inputs-to-output|Boolean Expressions to Truth Tables]] — verifies circuit correctness after building
- [[combinational-logic-circuits-depend-only-on-current-inputs|Combinational Logic Circuits]] — the class of circuits this translation process applies to
