---
title: "OR Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# OR Gate

An OR gate performs logical addition and outputs HIGH whenever any one (or more) of its inputs is HIGH; the output is LOW only when every input is simultaneously LOW.

> [!concept] Core Claim
> The OR gate acts as a parallel switch: any single closed switch (HIGH input) completes the circuit and drives the output HIGH — all switches must be open (all inputs LOW) to produce a LOW output.

## Explanation

Think of the OR gate as a hotel room keycard scanner where multiple staff members each have their own card: if any one card is swiped (any input HIGH), the door opens (output HIGH). Every card must be absent for the door to stay locked.

The mechanism is Boolean addition with saturation: 0+0=0, but 1+0=1 and 1+1=1 (not 2). In hardware, any single HIGH input activates the output transistor and pulls the output to HIGH. The other inputs cannot override this — once one input fires, the output is committed to HIGH. Only when every input is LOW does the output remain LOW.

This asymmetry makes OR the natural choice for aggregating multiple trigger sources into one response. An alarm system uses OR gates to combine smoke detector, motion sensor, and door sensor signals — any one of them going HIGH trips the alarm. The OR gate does not distinguish which source fired; it only reports that at least one did.

Note that in Boolean algebra 1+1=1, not 2. This surprises beginners because it looks like arithmetic addition, but the + symbol here means "either/or," not "sum." Output is a logic level, not a count.

## Key Points

- Boolean expression: F = A+B (also written A OR B)
- Output = 0 only if ALL inputs = 0
- Output = 1 if ANY input = 1
- Boolean addition: 1+1 = 1 (not 2); result saturates at 1
- Symbol: curved body pointing right with a concave input side

## Example

2-input OR truth table:

| A | B | F = A+B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    1    |

Alarm system: A = smoke detector, B = motion sensor. F = A+B means the alarm triggers if smoke OR motion is detected.

> [!recall] A 3-input OR gate has inputs A, B, C. At one moment A=1, B=0, C=0. Then A drops to 0. Without changing B or C, what must you do to keep the output at 1? Explain using the OR mechanism, not just the truth table.

## See Also

- [[and-gate-outputs-high-only-when-all-inputs-are-high|AND Gate]] — requires ALL inputs HIGH; much stricter condition
- [[nor-gate-is-a-universal-gate-built-from-or-and-not|NOR Gate]] — OR followed by NOT; a universal gate
- [[xor-gate-outputs-high-when-inputs-are-different|XOR Gate]] — like OR but excludes the all-HIGH case
