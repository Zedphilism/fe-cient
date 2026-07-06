---
title: "Sampling and Nyquist Theorem"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Sampling and Nyquist Theorem

The Nyquist theorem states that a signal can be perfectly reconstructed from its samples only if the sampling frequency is at least twice the highest frequency present in the original signal.

> [!concept] Core Claim
> Sampling below the Nyquist rate causes aliasing — high-frequency components fold back and appear as false lower frequencies in the reconstructed signal — a distortion that is permanently baked in and cannot be corrected after the fact.

## Explanation

Think of sampling like a strobe light photographing a spinning wheel: if the strobe flashes fast enough, you see the wheel spinning correctly. But if the strobe is too slow — fewer than two flashes per revolution — the wheel appears to spin backwards or more slowly than it actually is. The "false rotation" you see is the alias: a misrepresented version of the real motion, and the camera data alone cannot tell you the truth.

The mechanism behind the Nyquist theorem is geometric: to unambiguously capture a sine wave, you need at least two sample points per cycle — one captures the peak region and one captures the trough region. With exactly two samples per cycle (at the Nyquist rate), the waveform shape is identifiable. With fewer, the waveform becomes ambiguous — it could be consistent with a lower-frequency sine wave, and that lower-frequency impostor (the alias) is what the DAC reconstructs.

The engineering consequence has two parts. First, the sampling rate f_sample must satisfy: f_sample ≥ 2 × f_max, where f_max is the highest frequency in the signal. This minimum is the Nyquist rate. Second, an anti-aliasing low-pass filter must be placed before the ADC input to remove any frequency components above f_sample/2 before sampling occurs. If aliasing frequencies reach the ADC, no post-processing can remove them — they are indistinguishable from legitimate low-frequency content in the sampled data.

## Key Points

- Nyquist theorem: f_sample ≥ 2 × f_max
- Nyquist rate = 2 × f_max (minimum acceptable sampling frequency)
- Aliasing: sampling below Nyquist rate causes high frequencies to appear as false lower frequencies
- Anti-aliasing filter: low-pass filter placed before the ADC to eliminate frequencies above f_sample/2
- Aliasing is irreversible — it cannot be removed from already-sampled data

## Example

Human hearing: 20 Hz to 20 kHz (f_max = 20,000 Hz)

```
Nyquist rate = 2 × 20,000 = 40,000 Hz (40 kHz minimum)

CD audio: 44,100 Hz  →  44,100 ≥ 40,000 ✓ (extra margin for filter roll-off)
DVD audio: 48,000 Hz →  48,000 ≥ 40,000 ✓

Under-sampling example:
  15 kHz tone sampled at 20 kHz (below Nyquist of 30 kHz)
  Alias frequency = 20,000 − 15,000 = 5,000 Hz
  Result: a false 5 kHz tone appears in the recording — never in the original!
```

> [!recall] An ECG sensor captures heart signals up to 150 Hz. You sample at 250 Hz. Determine whether this meets the Nyquist criterion. If not, calculate the alias frequency that would appear for a 130 Hz component, and explain what sampling rate you should use and why.

## See Also

- [[analog-digital-conversion|Analog-to-Digital and Digital-to-Analog Conversion]] — the sampling step where Nyquist applies
- [[analog-vs-digital|Analog vs Digital Signals]] — why the continuous signal must be sampled at all
