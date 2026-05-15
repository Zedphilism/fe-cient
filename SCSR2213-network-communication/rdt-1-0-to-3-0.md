---
title: "rdt 1.0 to rdt 3.0: Detailed Process"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# rdt 1.0 to rdt 3.0: Detailed Process

The rdt (reliable data transfer) protocol series is a progressive sequence of protocol designs — rdt 1.0 through rdt 3.0 — each adding one new mechanism to handle a new type of channel impairment, building up to a protocol that handles both bit errors and packet loss.

> [!concept] Core Claim
> Each version of rdt addresses a specific new problem: 1.0 ignores problems, 2.0 handles corruption, 2.1 handles corrupted ACKs/NAKs, 2.2 eliminates NAKs, and 3.0 adds loss handling via timeouts.

## Explanation

### rdt 1.0 — Reliable channel (baseline)

**Assumption:** the underlying channel is perfectly reliable — no bit errors, no packet loss.

**Sender FSM:** wait for call from above → send packet → go back to waiting.
**Receiver FSM:** wait for packet → receive packet → deliver to application → go back to waiting.

No ACKs needed. No error detection. No retransmission. This is the ideal but unrealistic baseline.

---

### rdt 2.0 — Channel with bit errors (stop-and-wait + ACK/NAK)

**New problem:** the channel may flip bits in a packet (but does not lose packets).

**New mechanisms added:**
- **Checksum:** detect bit errors
- **ACK (Acknowledgement):** receiver confirms correct receipt
- **NAK (Negative Acknowledgement):** receiver signals a corrupted packet
- **Retransmission:** sender retransmits if it receives a NAK

**Sender FSM:** send packet + checksum → wait for ACK/NAK → if ACK: send next; if NAK: retransmit.
**Receiver FSM:** receive packet → check checksum → if OK: send ACK + deliver; if error: send NAK.

**Fatal flaw:** what if the ACK or NAK itself is corrupted? The sender cannot tell whether the receiver got the data correctly. If the sender retransmits (assuming the ACK was corrupted), the receiver doesn't know if it's a new packet or a duplicate.

---

### rdt 2.1 — Handles corrupted ACK/NAK (adds sequence numbers)

**New problem (from rdt 2.0):** corrupted ACKs/NAKs leave the sender uncertain.

**New mechanism added:**
- **1-bit sequence number (0 or 1):** sender tags every packet with a sequence number. If the ACK/NAK is garbled, the sender retransmits. If the receiver sees a packet with the same sequence number it already acknowledged, it knows it's a duplicate → silently re-send the ACK and discard the data.

**Sender:** if ACK/NAK garbled or NAK received → retransmit packet with same seq#. If ACK received → advance to next packet (flip seq# between 0 and 1).

**Receiver:** if seq# matches expected → deliver + send ACK. If seq# is a duplicate → discard + re-send ACK.

---

### rdt 2.2 — NAK-free protocol (duplicate ACKs replace NAKs)

**Observation:** a NAK for packet n is equivalent to a duplicate ACK for packet n−1.

**New mechanism:** eliminate NAKs. Instead, on receiving a corrupted packet, the receiver sends an **ACK for the last correctly received packet** (a duplicate ACK). The sender detects the duplicate ACK and retransmits.

**Result:** the same behaviour as rdt 2.1 but with only ACKs — no NAK message type needed. This simplifies the protocol and is the design used by TCP.

---

### rdt 3.0 — Channel with errors AND loss (adds timer/timeout)

**New problem:** the channel can now also lose packets entirely (both data packets and ACKs).

**New mechanism added:**
- **Countdown timer:** the sender starts a timer when it sends a packet. If the timer expires before an ACK is received → retransmit.

**Sender FSM (new):** send packet + start timer → if ACK received before timeout: cancel timer, advance; if timeout: retransmit packet, restart timer; if duplicate ACK (out-of-order): ignore.

**Receiver FSM:** same as rdt 2.2.

**Three scenarios rdt 3.0 handles correctly:**
1. No loss: normal ACK → advance.
2. Data packet lost: timeout → retransmit → receiver gets it → ACK.
3. ACK lost: timeout → sender retransmits → receiver gets duplicate (seq# matches), re-sends ACK, discards duplicate data.
4. Premature timeout (ACK was delayed, not lost): sender retransmits; receiver gets duplicate, discards, re-sends ACK; sender receives duplicate ACK, ignores it (already moved on via first ACK eventually).

rdt 3.0 is correct but still **stop-and-wait** — one packet in flight at a time. Pipelining (GBN, SR) resolves the efficiency problem.

## Key Points

| Version | Channel assumption | New mechanism |
|---|---|---|
| rdt 1.0 | Perfect | None |
| rdt 2.0 | Bit errors | Checksum + ACK/NAK + retransmit |
| rdt 2.1 | Bit errors + garbled ACK/NAK | 1-bit sequence number |
| rdt 2.2 | Bit errors + garbled ACK | Duplicate ACK replaces NAK |
| rdt 3.0 | Bit errors + packet loss | Countdown timer + timeout retransmit |

## Example

**rdt 3.0 ACK lost scenario:**

1. Sender sends PKT 0, starts timer.
2. Receiver gets PKT 0, sends ACK 0.
3. ACK 0 lost in network.
4. Sender timer expires → retransmits PKT 0.
5. Receiver gets PKT 0 again — sequence number 0 matches already-acknowledged packet → discard data, re-send ACK 0.
6. Sender gets ACK 0, cancels timer, sends PKT 1.

No data is lost or duplicated. Correct delivery achieved.

> [!recall] Why does rdt 2.0 fail, and what specific mechanism does rdt 2.1 add to fix it?

## See Also

- [[reliable-data-transfer-principles|Principles of Reliable Data Transfer]]
- [[stop-and-wait-protocol|Stop-and-Wait Protocol]]
- [[go-back-n-vs-selective-repeat|Go-Back-N and Selective Repeat]]
- [[ack-nak|ACK and NAK]]
