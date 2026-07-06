---
title: "Analog-to-Digital and Digital-to-Analog Conversion"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Analog-to-Digital and Digital-to-Analog Conversion

An ADC translates a continuous analog signal into binary numbers a processor can work with; a DAC reverses this, reconstructing an analog output from stored digital values.

> [!concept] Core Claim
> ADC and DAC are the mandatory boundary crossings between the continuous physical world and the discrete digital world — without them, microprocessors could neither sense real-world inputs nor control real-world actuators.

## Explanation

Think of the ADC as a translator who listens to a continuous speech stream (the analog signal) and writes down discrete words at regular intervals (the digital samples). The DAC is the reverse translator who reads those written words aloud to recreate something close to the original speech. Neither translation is perfectly lossless, but with enough samples and enough vocabulary (bit depth), the recreation is indistinguishable to the listener.

The ADC converts in three sequential steps. First, sampling: the analog signal is measured at regular time intervals (the sampling rate), producing a sequence of instantaneous values. Second, quantization: each measured value is rounded to the nearest level in the ADC's finite set of output levels. An n-bit ADC has 2ⁿ possible levels — 256 for 8-bit, 65,536 for 16-bit. Third, encoding: the selected level number is expressed as an n-bit binary pattern and handed to the processor. Quantization introduces unavoidable error called quantization noise, because rounding a continuous value to a discrete step always discards some information. Higher bit depth reduces the step size and thus reduces quantization noise.

The DAC reverses this pipeline: it receives a binary number, converts it to a proportional voltage (a staircase approximation), and then a low-pass filter smooths the staircase into a continuous waveform. The output is not a perfect copy of the original — it is band-limited and has quantization artifacts — but within the sampled frequency range it is a faithful reconstruction.

## Key Points

- ADC pipeline: Sampling → Quantization → Encoding
- DAC pipeline: Binary input → proportional voltage → low-pass filter smoothing
- Resolution: n bits = 2ⁿ quantization levels
- Quantization noise = rounding error inherent in converting continuous to discrete
- Higher bit depth = smaller steps = more faithful reproduction, more data per sample

## Example

Recording and playing back voice on a phone:

```
[Microphone] → continuous analog voltage
       ↓
[ADC] 8,000 samples/sec, 16-bit resolution
       data rate = 8,000 × 16 = 128,000 bits/sec
       ↓
[Storage] .wav or compressed audio file
       ↓
[DAC] each 16-bit value → proportional voltage
       ↓
[Low-pass filter] → smooth continuous waveform
       ↓
[Speaker] → reconstructed sound
```

A 16-bit ADC: 2¹⁶ = 65,536 levels. Step size = (V_max − V_min) / 65,536. Any analog value between two steps is rounded to the nearest step — that rounding is the quantization noise.

> [!recall] An 8-bit ADC covers an input range of 0 V to 5 V. Calculate the voltage step size between adjacent quantization levels. If a sensor reads 2.73 V, what binary code will the ADC output? What is the quantization error?

## See Also

- [[analog-vs-digital|Analog vs Digital Signals]] — why the conversion between domains is necessary
- [[sampling-and-nyquist-theorem-concept|Sampling and Nyquist Theorem]] — determines the correct sampling rate for the ADC step
