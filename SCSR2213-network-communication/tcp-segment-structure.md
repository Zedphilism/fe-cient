---
title: "TCP Segment Structure"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP Segment Structure

A TCP segment consists of a 20-byte minimum header containing source/destination ports, sequence number, acknowledgement number, receive window, flags, and checksum, followed by optional fields and the data payload.

> [!concept] Core Claim
> The TCP header encodes all the information needed for reliability (seq/ACK numbers), flow control (rwnd), and connection management (SYN/FIN/ACK flags) in a compact 20-byte structure.

## Explanation

The most important TCP header fields and their roles:

**Source port / Destination port (2 bytes each):** identify the sending and receiving processes on each host, used by the OS for demultiplexing (the 4-tuple).

**Sequence number (4 bytes):** the byte-stream number of the first data byte in this segment. TCP numbers individual bytes, not segments. On connection setup, both sides choose a random Initial Sequence Number (ISN) to reduce the chance of stale segment confusion.

**Acknowledgement number (4 bytes):** the byte-stream number of the *next* byte the receiver expects from the other side. TCP uses cumulative acknowledgements — ACK number 1001 means "I've received bytes up to 1000, please send 1001 next."

**Receive window (rwnd, 2 bytes):** how many bytes the receiver is currently willing to accept. This is the flow control mechanism — the sender must never have more unacknowledged bytes outstanding than rwnd allows.

**Header length (4 bits):** the length of the TCP header in 32-bit words (needed because the Options field makes the header variable-length).

**Flags (6 bits in common use):** ACK (acknowledgement number valid), SYN (connection initiation), FIN (connection teardown), RST (reset/abort), PSH (push data to app immediately), URG (urgent pointer valid).

**Checksum (2 bytes):** error detection over header and data (mandatory in TCP, unlike UDP where it is optional).

## Key Points

- Minimum header: 20 bytes (no options)
- Sequence number: byte offset of first data byte (not segment number)
- ACK number: byte offset of next expected byte (cumulative)
- rwnd: receiver-advertised flow control window in bytes
- SYN flag: set only during connection establishment
- FIN flag: set to signal connection teardown
- Checksum: mandatory error detection

## Example

Host A sends a segment with Seq=1000, ACK=500, data=100 bytes. This means: "My data starts at byte 1000 in my stream; I've received bytes up to 499 of your stream; I'm now expecting your byte 500." Host B replies with Seq=500, ACK=1100 — acknowledging all 100 bytes (bytes 1000–1099) of A's data.

> [!recall] What does an ACK number of 5001 mean in a TCP byte stream?

## See Also

- [[multiplexing-and-demultiplexing|Multiplexing Uses Port Numbers to Direct Segments to the Right Process]]
- [[tcp-flow-control|TCP Flow Control Uses the Receive Window to Prevent Buffer Overflow]]
- [[tcp-three-way-handshake|TCP Uses a Three-Way Handshake to Establish a Connection]]
- [[tcp-rtt-estimation-and-timeout|TCP Estimates RTT with EWMA to Set a Dynamic Retransmission Timeout]]
