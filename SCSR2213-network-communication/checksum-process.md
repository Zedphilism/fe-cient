---
title: "Checksum Process"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Checksum Process

A checksum is an error-detection value computed by the sender and verified by the receiver — if the recomputed checksum at the receiver does not match the received one, the data was corrupted in transit.

> [!concept] Core Claim
> Checksums detect errors introduced by the network by summing data words and comparing the result at both ends; they cannot correct errors, only flag them.

## Explanation

The Internet checksum is used by UDP, TCP, and IP (for the header only). The algorithm treats data as a sequence of 16-bit integers, adds them all together using 1's complement arithmetic, and takes the 1's complement of the result. This produces the checksum value, which the sender places in the segment or datagram header.

**1's complement arithmetic:** when you add two 16-bit numbers and a carry comes out of the high-order bit, that carry is wrapped around and added back to the low-order bit. This is sometimes called "end-around carry." The benefit is that the same addition circuit works regardless of byte order (big-endian or little-endian).

**At the receiver:** the receiver performs the same sum over the received data plus the received checksum. In 1's complement arithmetic, if no errors occurred, this sum will be all 1s (0xFFFF). If any bit is 0, an error was detected and the segment is discarded.

**Why UDP uses a checksum even though it is "unreliable":** even though UDP makes no delivery guarantees, it still needs error *detection*. A corrupted segment delivered to the application is worse than a dropped segment. RFC 768 originally made the UDP checksum optional; in IPv4 over some links it may be 0 (disabled); in IPv6 it is mandatory.

**Limitations:** the checksum can detect single-bit and most multi-bit errors, but it cannot detect all errors — for example, two errors that cancel each other out will not be detected. More robust codes (CRC, used at the link layer) catch more error patterns.

## Key Points

- 16-bit 1's complement sum of all 16-bit words in the header (and data for TCP/UDP)
- Sender: compute checksum, place in header
- Receiver: recompute sum including checksum field → result should be 0xFFFF
- Error detected: segment/datagram discarded (UDP) or flagged (TCP triggers retransmit)
- Detects bit flips; cannot correct; cannot catch all error patterns
- UDP checksum: optional in IPv4, mandatory in IPv6 (RFC 768)

## Example

Two 16-bit words: `0110011001100000` and `0101010101010101`. Sum = `1011101110110101`. Add carry if any. Complement: flip all bits → checksum sent in header. Receiver adds all three 16-bit values; result = `1111111111111111` (0xFFFF) → no error.

> [!recall] What does the receiver compute to verify a UDP checksum, and what result indicates no error?

## See Also

- [[checksum-exam-style|Checksum: Exam-Style Worked Example]]
- [[udp-connectionless-transport|UDP: Connectionless Transport]]
- [[reliable-data-transfer-principles|Principles of Reliable Data Transfer]]
