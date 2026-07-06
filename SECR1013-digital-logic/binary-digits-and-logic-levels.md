---
title: "Binary Digits and Logic Levels"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Binary Digits and Logic Levels

A binary digit (bit) is not just an abstract 0 or 1 — in a physical circuit it corresponds to a defined voltage range, and any voltage outside the valid ranges is treated as undefined and dangerous.

> [!concept] Core Claim
> The bit values 0 and 1 are physical voltage regions, not exact voltages; the gaps between regions give circuits a built-in noise margin that prevents small fluctuations from flipping the interpreted logic level.

## Explanation

Think of a bit's voltage ranges like traffic light zones on a road: there is a green zone (HIGH = logic 1), a red zone (LOW = logic 0), and an illegal yellow zone (forbidden region) that vehicles — signals — must never park in. If a signal rests in the yellow zone, the circuit has no reliable way to decide which zone it belongs to.

The mechanism works through voltage comparators in the gate's input circuitry. Any input voltage above the HIGH threshold is registered as 1; any input below the LOW threshold is registered as 0. The gap between the thresholds is the noise margin — it absorbs voltage spikes, temperature drift, and wire resistance without flipping the logic level. This is why a 3.8 V signal and a 4.9 V signal are both read as logic 1 with identical results, even though their voltages differ by over a volt.

The consequence is that a bit represents a logic state, not a quantity. HIGH does not mean "one unit of something" — it means "the circuit is in the asserted condition." This matters especially when active-low signals are used, where the asserted condition (logic TRUE) is physically represented by LOW voltage.

## Key Points

- Bit = smallest unit of digital information; value is 0 or 1
- HIGH voltage range = logic 1 | LOW voltage range = logic 0
- Forbidden zone between HIGH and LOW — signals must not rest here
- TTL reference: HIGH = 2.4–5 V, LOW = 0–0.8 V, forbidden = 0.8–2.4 V
- Noise margin = range a signal can deviate without flipping the logic level

## Example

In a 5 V TTL system:

```
5.0 V ---|
         |  HIGH region (logic 1)    e.g. 4.2 V → read as 1
2.4 V ---|
         |  FORBIDDEN region          e.g. 1.5 V → undefined behavior!
0.8 V ---|
         |  LOW region (logic 0)     e.g. 0.3 V → read as 0
0.0 V ---|
```

4.2 V → reliably logic 1 ✓
0.3 V → reliably logic 0 ✓
1.5 V → undefined — the gate may output 0 or 1 unpredictably ✗

> [!recall] A gate output is measured at 1.0 V in a TTL system (HIGH threshold = 2.4 V, LOW threshold = 0.8 V). Explain what region this voltage is in and predict what will happen when this is connected to a downstream gate's input.

## See Also

- [[analog-vs-digital|Analog vs Digital Signals]] — why only two valid logic levels exist
- [[active-high-vs-active-low|Active-High vs Active-Low]] — how HIGH/LOW maps to true/false depending on signal polarity
