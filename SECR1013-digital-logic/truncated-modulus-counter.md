---
title: "Truncated-Modulus Counter"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Truncated-Modulus Counter

A truncated-modulus counter is a binary counter modified to recycle before completing its full 2ⁿ count sequence, achieved by decoding the target state with a NAND gate and immediately clearing all flip-flops back to zero.

> [!concept] Core Claim
> Decoding the unwanted reset state with a NAND gate wired to all flip-flop CLR inputs forces the counter to skip from the target state back to 0, creating any desired modulus less than 2ⁿ.

## Explanation

A natural n-bit counter always counts through all 2ⁿ states. To make it count through only M states (MOD-M where M < 2ⁿ), you need to detect state M and immediately reset the counter to 0. The standard technique: connect the Q outputs that are HIGH in state M to a NAND gate; wire the NAND output to the active-LOW CLR input of every flip-flop.

When the counter reaches state M, the NAND gate output goes LOW, which asserts CLR and forces all FFs to reset asynchronously to 0 — often within nanoseconds. This produces a brief glitch: state M appears momentarily before the reset takes hold. The glitch is typically too short to affect downstream logic but is visible on an oscilloscope. For MOD-10 (decade counter): detect state 10 (binary 1010) with a NAND on Q₃ and Q₁.

The design rule: identify which bits are HIGH in the target reset state; AND (using NAND) only those bits; feed back to CLR. You do NOT need to decode all bits — only the bits that distinguish the target state from all lower states in the sequence.

## Key Points

- Use n-bit counter where 2ⁿ⁻¹ < M ≤ 2ⁿ
- Decode state M: NAND the Q outputs that are HIGH in binary M
- NAND output → CLR (active-LOW) of all FFs
- Counter visits states 0 to M−1, then resets on state M
- Brief glitch at state M is normal and expected
- Decade counter (MOD-10): decode 1010₂ using Q₃ and Q₁

## Example

MOD-10 asynchronous counter from a 4-bit (MOD-16) base:
- Target reset state: 10 = 1010₂ (Q₃=1, Q₂=0, Q₁=1, Q₀=0)
- Decode: NAND(Q₃, Q₁) — output goes LOW when Q₃=1 AND Q₁=1
- Connect NAND output → CLR of all four FFs
- Sequence: 0→1→2→...→9→(10 appears for ~ns)→0

> [!recall] Design a MOD-12 counter from a 4-bit asynchronous counter. Which state triggers the reset, what is its binary representation, and which Q outputs must be fed to the NAND decoder?

## See Also

- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]] — the base circuit this modifies
- [[counter-types-and-modulus|Counter Types and Modulus]] — defines modulus and truncation
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — the decode gate used for CLR feedback
