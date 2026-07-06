---
title: "Duty Cycle"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Duty Cycle

Duty cycle is the fraction of one period during which a digital signal is HIGH (ON), expressed as a percentage — it measures how much of the time a signal is active relative to its total cycle time.

> [!concept] Core Claim
> Duty cycle controls the average energy delivered by a periodic signal: a 25% duty cycle means the load receives energy for only one-quarter of each cycle, making duty cycle the tuning knob for PWM-based power control without changing frequency.

## Explanation

Think of duty cycle like a dimmer switch that works by rapid blinking: a 10% duty cycle blinks the light on for only 10% of every second — so fast you don't see the flicker, but your eye averages it as a dim glow. A 90% duty cycle blinks it off for only 10% of each second, so it looks nearly fully bright. The mechanism is time-averaging: even though the signal is always either full ON or full OFF, the proportion of on-time controls the perceived or delivered power.

The formula is: Duty Cycle (%) = (t_on / T) × 100, where t_on is the HIGH time per cycle and T is the period. A 50% duty cycle means t_on = t_off = T/2, producing a symmetric square wave. The duty cycle and the frequency are completely independent parameters — you can have a 25% duty cycle at 1 Hz or at 1 MHz, and both describe the same proportion of on-time relative to the period.

The engineering consequence is Pulse Width Modulation (PWM): by rapidly toggling a digital output at a fixed frequency while varying the duty cycle, a microcontroller can deliver precisely controlled average power to a motor, LED, heater, or switching power supply. No analog voltage regulation is needed — the digital signal itself becomes the power control mechanism.

## Key Points

- Formula: Duty Cycle (%) = (t_on / T) × 100
- t_on = HIGH time per cycle, T = total period, t_off = T − t_on
- 50% duty cycle = equal HIGH and LOW (symmetric square wave)
- Duty cycle controls average power in PWM without changing frequency
- Duty cycle and frequency are independent — changing one does not affect the other

## Example

A PWM motor control signal: T = 1,000 ms, duty cycle = 25%:

```
t_on  = 0.25 × 1,000 ms = 250 ms
t_off = 0.75 × 1,000 ms = 750 ms

HIGH --|‾‾‾‾|         |‾‾‾‾|
       |    |         |    |
LOW  --|    |_________|    |_________
       0   250       1000 1250      (ms)
```

Comparing duty cycles at the same frequency (T = 1,000 ms):

| Duty Cycle | t_on  | t_off | Effect on motor/LED       |
|------------|-------|-------|---------------------------|
| 25%        | 250ms | 750ms | Low power / dim           |
| 50%        | 500ms | 500ms | Half power / medium       |
| 75%        | 750ms | 250ms | High power / bright       |

> [!recall] A PWM signal drives an LED at 5 V. The current frequency is 1 kHz with a 30% duty cycle. You want to double the LED brightness without changing the supply voltage or the frequency. What single parameter do you adjust, and what is its new value? Will the LED flicker?

## See Also

- [[digital-waveforms-and-signal-behavior|Digital Waveforms and Signal Behavior]] — the waveform properties that duty cycle modifies
