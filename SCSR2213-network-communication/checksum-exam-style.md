---
title: "Checksum: Exam-Style Worked Example"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Checksum: Exam-Style Worked Example

To compute the Internet checksum in an exam: sum all 16-bit data words using 1's complement (wrap any carry back into the sum), then take the bitwise complement of the total — the result is the checksum. To verify: add the checksum to the sum; the result must be all 1s (0xFFFF).

> [!concept] Core Claim
> Internet checksum = bitwise NOT of the 1's complement sum of all 16-bit words; verification passes when the sum of all words including the checksum equals 0xFFFF.

## Explanation

**Step-by-step method (exam ready):**

1. Write all data as 16-bit binary words (pad with zeros on the left if needed).
2. Add the words together in binary. If the addition produces a carry out of bit 15 (the 17th bit), wrap that carry around and add it to bit 0. This is "end-around carry."
3. Repeat step 2 for any subsequent carries.
4. Take the 1's complement (bitwise NOT / flip every bit) of the final sum → this is the checksum.
5. The sender places this checksum in the protocol header.

**To verify at receiver:**
Add all data words AND the checksum together using the same 1's complement method. If the result is `1111111111111111` (all 1s, or 0xFFFF), the data is error-free. If any bit is 0, the data was corrupted.

**Common exam trap:** if the numbers given are in decimal, convert each to 16-bit binary first. If the sum exceeds 16 bits, don't discard the carry — wrap it back to bit 0.

**Why this works:** flipping all bits of the sum and then adding the original data + checksum gives all 1s by the property of 1's complement arithmetic: `X + ~X = 0xFFFF`.

## Key Points

- Add all 16-bit words using 1's complement (carry wraps around to bit 0)
- Checksum = bitwise NOT of the final sum
- Receiver check: sum of all words + checksum = 0xFFFF (all 1s) → no error
- Always pad short values to 16 bits
- Carry wrapping can happen more than once — keep adding until no carry remains

## Example

**Given:** three 16-bit words: `0110 0110 0110 0000`, `0101 0101 0101 0101`, `1000 1111 0000 1100`

Step 1 — add words 1 and 2:
```
  0110 0110 0110 0000
+ 0101 0101 0101 0101
= 1011 1011 1011 0101   (no carry)
```
Step 2 — add word 3:
```
  1011 1011 1011 0101
+ 1000 1111 0000 1100
= 1 0100 1010 1100 0001  (carry = 1)
```
Wrap carry: `0100 1010 1100 0001 + 1 = 0100 1010 1100 0010`

Step 3 — complement: flip all bits:
```
Checksum = 1011 0101 0011 1101
```

Receiver: adds all 3 data words + checksum → should get `1111 1111 1111 1111`.

> [!recall] You are given two 16-bit data words. Describe the full step-by-step procedure to compute the Internet checksum and state what value the receiver should see when it verifies the checksum.

## See Also

- [[checksum-process|Checksum Process]]
- [[udp-connectionless-transport|UDP: Connectionless Transport]]
- [[ip-datagram-format|IP Datagram Format]]
