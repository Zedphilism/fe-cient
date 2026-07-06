---
title: "Analog vs Digital Signals"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Analog vs Digital Signals

Analog signals vary continuously over an infinite range of values, while digital signals exist only at defined discrete levels — in binary systems, either HIGH (1) or LOW (0).

> [!concept] Core Claim
> An analog signal can take any value at any instant; a digital signal snaps to one of only two valid states, making it far more resistant to noise and degradation.

## Explanation

Think of an analog signal as water filling a container — the level can be anywhere between empty and full, changing smoothly and continuously. A digital signal is like a light switch: it is either fully ON or fully OFF, with no valid middle position.

The mechanism behind an analog signal is direct physical correspondence: a microphone converts air pressure into voltage, and that voltage rises and falls in exact proportion to the sound wave. At any moment the signal can take any value within its range — there is no jump, only a smooth continuous curve.

A digital signal, by contrast, is constrained by threshold comparators in the hardware. Any voltage above a defined HIGH threshold is interpreted as logic 1; any voltage below the LOW threshold is logic 0; anything between is an illegal transitional state that the circuit exits as quickly as possible. Because the circuit only cares about which side of the threshold a voltage is on — not its exact value — small noise fluctuations below the threshold margin are completely ignored. This threshold-based noise immunity is why digital systems can store, copy, and transmit information across long distances without accumulated error.

The consequence is fundamental to computing: real-world quantities (sound, temperature, light) are analog, but processors operate entirely on digital values. This is why ADC (analog-to-digital conversion) exists as a dedicated circuit boundary.

## Key Points

- Analog: continuous, infinite possible values, smooth waveform
- Digital: discrete, two valid levels (HIGH/LOW), step-like waveform
- Digital noise immunity: small deviations do not change the interpreted logic level
- Real-world quantities are inherently analog; ADC bridges the gap to digital processing

## Example

A room thermometer outputs an analog voltage proportional to temperature — at 25 °C it outputs 2.5 V, at 26 °C it outputs 2.6 V, varying smoothly in between.

A digital thermostat reads that same sensor and outputs either 1 (heating on) or 0 (heating off) — the continuous range collapses to two states.

```
Analog signal (temperature sensor):
Voltage |  .-.     .-.
        | /   \   /   \
        |/     '-'     \
        +-----------------> time

Digital signal (threshold applied):
HIGH  --+  ___     ___
LOW   --+      ___     ___
        +-----------------> time
```

> [!recall] A technician measures 1.2 V on a TTL line where HIGH = 2.4–5 V and LOW = 0–0.8 V. What does this mean for circuit behavior, and how does this situation differ between analog and digital systems?

## See Also

- [[binary-digits-and-logic-levels|Binary Digits and Logic Levels]] — how HIGH/LOW voltage ranges map to 0 and 1
- [[analog-digital-conversion|Analog-to-Digital and Digital-to-Analog Conversion]] — how real-world signals enter digital systems
