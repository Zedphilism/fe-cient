---
title: "Active-High vs Active-Low"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Active-High vs Active-Low

Active-high and active-low describe whether a signal is asserted (enabled/true) when its voltage is HIGH or when it is LOW — the same physical voltage carries the opposite logical meaning depending on which convention the circuit uses.

> [!concept] Core Claim
> "Active" means "doing its job"; active-high asserts on HIGH voltage, active-low asserts on LOW voltage. Knowing which convention a pin uses determines whether driving it to 5 V turns something on or off.

## Explanation

Think of a doorbell button as an active-high signal: when you press it (push to HIGH), the bell rings (function is asserted). An active-low signal is like a deadbolt lock: when the bolt is down (LOW), the door is secure (lock is engaged); when released to HIGH, the door is open and the lock is idle.

In an active-high circuit, a HIGH voltage means the signal is asserted — the condition is true, the device is enabled, the action triggers. This matches the intuitive convention where HIGH equals ON. Most basic enable and clock pins on simple logic chips operate this way.

In an active-low circuit, a LOW voltage means the signal is asserted. Driving the pin to 0 V activates the device; pulling it HIGH puts the device to sleep. The hardware reason for this design is fail-safe behavior: when a wire breaks, a pull-up resistor holds the disconnected input HIGH, keeping the device inactive by default. An active-high design with a broken wire would leave the pin floating, potentially triggering the device accidentally. Active-low signals are therefore the standard choice in safety-critical, industrial, and power-sensitive circuits.

Active-low signals are conventionally marked with an overline in schematics (e.g., **CE** with a bar above), or with a tilde in text (~CE, ~RESET, ~CS). When you see that notation, read it as: "this function activates when this pin is LOW."

## Key Points

- Active-high: HIGH voltage = asserted (ON / enabled / true)
- Active-low: LOW voltage = asserted (ON / enabled / true)
- Active-low notation: overline symbol or tilde prefix (~EN, ~RESET, ~CS)
- Active-low is preferred for fail-safe behavior: broken wire → pull-up holds HIGH → device stays off

## Example

An LED circuit illustrates the difference in safety behavior:

```
Active-HIGH wiring:
  MCU pin --[R]--[LED]-- GND
  Pin = HIGH (5V) → current flows → LED ON
  Pin = LOW  (0V) → no current   → LED OFF
  Wire breaks: pin floats → LED may flicker unpredictably (unsafe)

Active-LOW wiring:
  VCC --[R]--[LED]-- MCU pin
  Pin = LOW  (0V) → current flows → LED ON
  Pin = HIGH (5V) → no current   → LED OFF
  Wire breaks: pull-up holds HIGH → LED stays OFF (safe, predictable)
```

> [!recall] A chip's ~RESET pin is active-low. A designer accidentally leaves ~RESET unconnected (floating). Explain what will likely happen and why, then describe how a pull-up resistor fixes the problem.

## See Also

- [[binary-digits-and-logic-levels|Binary Digits and Logic Levels]] — the voltage levels that HIGH and LOW refer to
- [[active-low-signals-provide-fail-safe-behavior|Active-Low Signals and Fail-Safe Behavior]] — deeper analysis of fail-safe design
