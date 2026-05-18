/**
 * data/chapter3-data.js
 * Chapter 3 topic content and quiz questions (Transport Layer).
 * Consumed by chapter3.html via <script src="data/chapter3-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | calc
 */

window.chapter3Data = {
  id: "chapter3",
  title: "Chapter 3: Transport Layer",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — Transport Layer Fundamentals
    ───────────────────────────────────────────── */
    {
      id: "ch3-transport-fundamentals",
      title: "Transport Layer Fundamentals",
      xpReward: 10,
      content: {
        summary: "The transport layer provides logical communication between application processes running on different hosts. Unlike the network layer — which handles host-to-host delivery — the transport layer extends this to process-to-process delivery. It runs only on end systems, never inside routers, and offers two distinct services: TCP (reliable, ordered, congestion-controlled) and UDP (unreliable, connectionless).",
        bullets: [
          "Transport layer provides logical communication between APPLICATION PROCESSES, not between hosts",
          "Network layer: host-to-host delivery. Transport layer: process-to-process delivery",
          "Transport layer runs on END SYSTEMS only — routers do not implement it",
          "TCP: reliable, in-order delivery, congestion control, flow control, connection-oriented",
          "UDP: unreliable, unordered, connectionless — adds only multiplexing and basic error checking",
          "The transport layer takes application messages, breaks them into segments, adds a header, and passes them down to the network layer",
          "'Logical communication' means processes behave as if directly connected, even when separated by thousands of routers"
        ],
        analogy: "Imagine two families exchanging letters between cousins (processes) rather than between houses (hosts). The postal system (network layer) delivers mail house-to-house; but inside each house, a family member (transport layer) sorts mail and hands each letter to the right cousin. The cousins feel like they are writing directly to each other, even though the letters travel through the postal system.",
        visual: "sim-transport-layer"
      },
      quiz: [
        {
          id: "q-ch3-001",
          type: "mcq",
          question: "What is the key distinction between the network layer and the transport layer in terms of communication scope?",
          options: [
            "The network layer provides process-to-process delivery; the transport layer provides host-to-host delivery",
            "The transport layer provides process-to-process delivery; the network layer provides host-to-host delivery",
            "Both layers provide identical end-to-end delivery but at different speeds",
            "The transport layer runs inside routers; the network layer runs on end systems"
          ],
          answer: 1,
          explanation: "The network layer (IP) delivers packets from one host to another. The transport layer extends this by demultiplexing packets to the correct process on the destination host using port numbers, providing process-to-process logical communication.",
          xpReward: 25
        },
        {
          id: "q-ch3-002",
          type: "mcq",
          question: "On which devices does the transport layer protocol execute?",
          options: [
            "On all routers and switches in the network core",
            "On end systems (hosts) only",
            "On the first and last router in any path",
            "On both end systems and core routers simultaneously"
          ],
          answer: 1,
          explanation: "The transport layer runs exclusively on end systems. Routers operate only up to the network layer (IP). This is why the transport layer provides logical — not physical — end-to-end communication: routers along the path are unaware of TCP/UDP.",
          xpReward: 25
        },
        {
          id: "q-ch3-003",
          type: "truefalse",
          question: "TCP provides a reliable, ordered delivery service, whereas UDP provides an unreliable, connectionless delivery service.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. TCP guarantees that data arrives in order, without corruption, and without loss by using acknowledgements, retransmission, sequence numbers, and congestion control. UDP makes none of these guarantees — it simply sends segments and hopes they arrive.",
          xpReward: 25
        },
        {
          id: "q-ch3-004",
          type: "fillblank",
          question: "The transport layer breaks application messages into smaller units called ______ before passing them to the network layer.",
          answer: "segments",
          explanation: "The transport layer creates segments by taking an application message and prepending a transport-layer header (containing port numbers, sequence numbers, etc.). The network layer then encapsulates each segment into a packet (datagram) for delivery.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Multiplexing & Demultiplexing
    ───────────────────────────────────────────── */
    {
      id: "ch3-mux-demux",
      title: "Multiplexing & Demultiplexing",
      xpReward: 10,
      content: {
        summary: "Multiplexing and demultiplexing allow a single network-layer channel to be shared by many application-layer sockets. At the sender, multiplexing gathers data from multiple sockets and routes it into one stream. At the receiver, demultiplexing uses port numbers in the segment header to deliver each segment to the correct socket.",
        bullets: [
          "Multiplexing (sender side): gather data from multiple sockets, encapsulate with headers, send as one stream",
          "Demultiplexing (receiver side): deliver incoming segments to the correct socket based on port numbers",
          "Port numbers are 16-bit integers ranging from 0 to 65535",
          "Well-known ports (0–1023): HTTP = 80, HTTPS = 443, SMTP = 25, DNS = 53",
          "UDP demultiplexing: uses only destination IP address + destination port number",
          "TCP demultiplexing: uses a 4-tuple (source IP, source port, destination IP, destination port)",
          "TCP's 4-tuple demux allows many simultaneous connections to the same server port (e.g., port 80) from different clients"
        ],
        analogy: "Demultiplexing is like a mail room in a large office building. All letters arrive at one loading dock (the network interface) addressed to '123 Main St'. The mail room (transport layer) reads the room number (port number) on each envelope and delivers it to the correct office (socket). TCP's 4-tuple is like also reading both the sender's return address and the recipient's room number to handle letters from many senders at once.",
        visual: "sim-mux-demux"
      },
      quiz: [
        {
          id: "q-ch3-005",
          type: "mcq",
          question: "How does UDP demultiplexing differ from TCP demultiplexing?",
          options: [
            "UDP uses a 4-tuple (src IP, src port, dst IP, dst port); TCP uses only the destination port",
            "UDP uses only the destination IP and destination port; TCP uses the full 4-tuple",
            "Both UDP and TCP use only the destination port number for demultiplexing",
            "UDP uses the source port only; TCP uses the destination port only"
          ],
          answer: 1,
          explanation: "UDP demultiplexing identifies the socket using only the destination IP and destination port. TCP uses all four fields — source IP, source port, destination IP, destination port — so multiple TCP connections can share the same destination port (e.g., all going to port 80) and still be delivered to separate sockets.",
          xpReward: 25
        },
        {
          id: "q-ch3-006",
          type: "mcq",
          question: "Which well-known port number is assigned to HTTP?",
          options: [
            "25",
            "53",
            "80",
            "443"
          ],
          answer: 2,
          explanation: "HTTP uses well-known port 80. HTTPS (HTTP over TLS) uses port 443. SMTP uses port 25. DNS uses port 53. Well-known ports are in the range 0–1023 and are assigned by IANA.",
          xpReward: 25
        },
        {
          id: "q-ch3-007",
          type: "truefalse",
          question: "Two TCP segments arriving at a server on port 80 but from different source IP addresses will be directed to the same socket.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. TCP demultiplexing uses the full 4-tuple: (source IP, source port, destination IP, destination port). Two connections from different source IPs — even to the same destination port — produce distinct 4-tuples and are therefore directed to separate sockets (separate TCP connections).",
          xpReward: 25
        },
        {
          id: "q-ch3-008",
          type: "fillblank",
          question: "Port numbers are ______-bit integers, giving a range of 0 to 65535.",
          answer: "16",
          explanation: "Port numbers occupy 16 bits in both TCP and UDP headers, giving 2^16 = 65536 possible values (0–65535). Ports 0–1023 are well-known ports controlled by IANA. Ports 1024–49151 are registered ports. Ports 49152–65535 are dynamic/ephemeral ports.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — UDP: Connectionless Transport
    ───────────────────────────────────────────── */
    {
      id: "ch3-udp",
      title: "UDP: Connectionless Transport",
      xpReward: 10,
      content: {
        summary: "UDP (User Datagram Protocol) is the 'bare-bones' transport protocol. It adds only two services on top of IP: multiplexing/demultiplexing and a simple error-checking checksum. There is no connection setup, no reliability guarantees, no congestion control, and no flow control. Despite this, UDP is widely used where speed, low overhead, or application-level control matters more than guaranteed delivery.",
        bullets: [
          "UDP adds only multiplexing/demultiplexing and a checksum on top of IP",
          "No connection establishment — no handshake, zero added delay before sending",
          "No connection state — a UDP server can support many more active clients than TCP",
          "UDP header is just 8 bytes: Source Port (16b), Destination Port (16b), Length (16b), Checksum (16b)",
          "Applications that use UDP: DNS, SNMP, multimedia streaming, online games, QUIC",
          "No congestion control: UDP can transmit at any rate, regardless of network load",
          "Reliability can be added at the application layer if required — QUIC (used by HTTP/3) does exactly this"
        ],
        analogy: "UDP is like dropping a postcard in a mailbox. You write the address and drop it — no receipt, no tracking, no guarantee it arrives. If speed and simplicity matter more than certainty (think: live sports score updates), the postcard model is perfect. TCP is the registered mail with delivery confirmation, which is slower and costlier but reliable.",
        visual: "sim-udp"
      },
      quiz: [
        {
          id: "q-ch3-009",
          type: "mcq",
          question: "What is the total size of a UDP header?",
          options: [
            "4 bytes",
            "8 bytes",
            "20 bytes",
            "32 bytes"
          ],
          answer: 1,
          explanation: "A UDP header contains exactly four 16-bit (2-byte) fields: Source Port, Destination Port, Length, and Checksum. That is 4 × 2 = 8 bytes total. Compare this to TCP's minimum 20-byte header, which reflects its many additional services.",
          xpReward: 25
        },
        {
          id: "q-ch3-010",
          type: "mcq",
          question: "Why do applications like DNS and online games typically use UDP rather than TCP?",
          options: [
            "UDP provides stronger reliability guarantees than TCP",
            "UDP has no connection setup delay and no congestion control, offering lower latency and higher throughput potential",
            "DNS requires ordered delivery, which only UDP supports",
            "UDP is supported by more routers than TCP"
          ],
          answer: 1,
          explanation: "DNS queries are short and time-sensitive — a connection setup handshake would double or triple latency. Games need the lowest possible delay and can tolerate occasional lost frames. UDP's lack of connection setup and congestion control gives it an edge when speed matters more than guaranteed delivery.",
          xpReward: 25
        },
        {
          id: "q-ch3-011",
          type: "truefalse",
          question: "UDP has no congestion control, which means a UDP sender can transmit at any rate regardless of network conditions.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. UDP imposes no rate limits on the sender. This is useful for real-time applications that cannot afford slowdowns, but it can also cause congestion and crowd out TCP flows — which is why application-layer protocols like QUIC add their own congestion control on top of UDP.",
          xpReward: 25
        },
        {
          id: "q-ch3-012",
          type: "fillblank",
          question: "The modern protocol QUIC, which powers HTTP/3, is built on top of ______ rather than TCP.",
          answer: "UDP",
          explanation: "QUIC (Quick UDP Internet Connections) runs over UDP and implements its own reliable delivery, congestion control, and security (TLS 1.3). By using UDP, QUIC avoids TCP's head-of-line blocking and allows faster connection establishment, which is why Google and many major services have adopted it for HTTP/3.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — Internet Checksum
    ───────────────────────────────────────────── */
    {
      id: "ch3-checksum",
      title: "Internet Checksum",
      xpReward: 10,
      content: {
        summary: "The Internet checksum is a simple 16-bit error-detection mechanism used by UDP, TCP, and IP. The sender computes the 1's complement sum of all 16-bit words in the segment, then complements the result and stores it in the checksum field. The receiver sums all words including the checksum — a result of all 1s (0xFFFF) indicates no error was detected.",
        bullets: [
          "Internet checksum: 16-bit 1's complement sum of all 16-bit words in the segment",
          "1's complement addition: if a carry propagates out of bit 15, it wraps around and is added to bit 0 (end-around carry)",
          "Sender: sets checksum field to 0, sums all 16-bit words, complements the total, stores result",
          "Receiver: sums all 16-bit words including the checksum field — the result should be 0xFFFF (all ones) if no error",
          "Checksum = bitwise NOT (complement) of the sum of all words",
          "Used by UDP (over the entire datagram), TCP (over the entire segment), and IP (header only)",
          "Detects single-bit and many multi-bit errors, but is not foolproof — some error patterns cancel out"
        ],
        analogy: "Think of the checksum like a balancing ledger. The sender adds up all the numbers in a message, writes the 'opposite' of that total in a special box, and sends it along. The receiver adds everything up including that special box number. If everything balanced perfectly, the total will always come out to the same magic number (all 1s). If it does not, something changed in transit.",
        visual: "sim-checksum"
      },
      quiz: [
        {
          id: "q-ch3-013",
          type: "mcq",
          question: "When computing the Internet checksum, what does the sender do with the checksum field before summing all 16-bit words?",
          options: [
            "Sets it to 0xFFFF",
            "Sets it to 0x0000 (zero)",
            "Copies the first data word into it",
            "Leaves it unchanged from the previous packet"
          ],
          answer: 1,
          explanation: "Before computing the checksum, the sender initialises the checksum field to all zeros. This ensures the field itself does not corrupt the sum. After summing all 16-bit words and applying the end-around carry, the sender complements the result and places it in the checksum field.",
          xpReward: 25
        },
        {
          id: "q-ch3-014",
          type: "truefalse",
          question: "At the receiver, summing all 16-bit words of an error-free UDP segment (including the checksum field) produces a result of 0xFFFF (all ones).",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. The sender stores the 1's complement of the sum. When the receiver adds all words including this complement, the sum of any value and its 1's complement is all 1s. A result of 0xFFFF therefore indicates no error was detected (though undetected errors are still possible).",
          xpReward: 25
        },
        {
          id: "q-ch3-calc-015",
          type: "calc",
          question: "Two 16-bit words are to be sent: 0110 0110 0110 0000 and 0101 0101 0101 0101. Compute the Internet checksum (1's complement of their sum). Enter your answer as a 16-bit binary string with spaces between each group of 4 bits.",
          setup: "Word 1:  0110 0110 0110 0000  (= 0x6660)\nWord 2:  0101 0101 0101 0101  (= 0x5555)\n\nStep 1: Add the two words using binary addition\nStep 2: Handle end-around carry if any bit carries out of bit 15\nStep 3: Complement all bits — the result is the checksum",
          answer: "0100 0100 0100 1010",
          acceptedAnswers: ["0100010001001010", "444a", "0x444a", "0X444A", "444A"],
          calcType: "binary",
          explanation: "Sum: 0x6660 + 0x5555 = 0xBBB5 (1011 1011 1011 0101). No carry out of bit 15. Complement (flip all bits): 0100 0100 0100 1010 = 0x444A. This value is placed in the checksum field of the UDP/TCP header.",
          xpReward: 35
        },
        {
          id: "q-ch3-calc-016",
          type: "calc",
          question: "A receiver gets three 16-bit values: Word 1 = 0110 0110 0110 0000, Word 2 = 0101 0101 0101 0101, and Checksum = 0100 0100 0100 1010. What is the 1's complement sum of all three words? Enter as a 16-bit binary string (no spaces).",
          setup: "Word 1:   0110 0110 0110 0000  (= 0x6660)\nWord 2:   0101 0101 0101 0101  (= 0x5555)\nChecksum: 0100 0100 0100 1010  (= 0x444A)\n\nAdd all three values using 1's complement arithmetic.\nA result of all 1s (0xFFFF) confirms no error was detected.",
          answer: "1111111111111111",
          acceptedAnswers: ["1111 1111 1111 1111", "ffff", "0xffff", "FFFF", "0xFFFF"],
          calcType: "binary",
          explanation: "Sum of Word1 + Word2 = 0xBBB5 (1011 1011 1011 0101). Add Checksum 0x444A: 0xBBB5 + 0x444A = 0xFFFF = 1111 1111 1111 1111. This all-ones result confirms no error was detected in transmission.",
          xpReward: 35
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — Reliable Data Transfer
    ───────────────────────────────────────────── */
    {
      id: "ch3-rdt",
      title: "Reliable Data Transfer",
      xpReward: 10,
      content: {
        summary: "Reliable data transfer (RDT) principles explain how to build a reliable channel on top of an unreliable one. The RDT protocol series progresses from a perfect-channel model (RDT 1.0) through handling bit errors (RDT 2.x) and finally packet loss (RDT 3.0). Each version adds mechanisms — checksums, ACK/NAK, sequence numbers, timers — to address new failure modes. Stop-and-wait, the simplest approach, has very low link utilisation, motivating pipelined protocols.",
        bullets: [
          "RDT 1.0: assumes perfectly reliable channel — sender sends, receiver receives, no error handling needed",
          "RDT 2.0: channel may flip bits — adds checksum, ACK (acknowledgement) and NAK (negative ACK). Stop-and-wait",
          "RDT 2.1: handles corrupted ACK/NAK — adds 0/1 sequence numbers so receiver can detect duplicates",
          "RDT 2.2: NAK-free — replaces NAKs with duplicate ACKs (ACK for last correctly received packet)",
          "RDT 3.0: channel may lose packets AND have bit errors — adds a countdown timer; sender retransmits on timeout",
          "Stop-and-wait utilisation: U = (L/R) / (RTT + L/R) — extremely low for high-bandwidth, long-delay links",
          "Pipelined protocols (Go-Back-N, Selective Repeat) send multiple packets before waiting for ACKs"
        ],
        analogy: "Building RDT is like designing a courier service for a noisy, unreliable road. First you assume perfect roads (RDT 1.0). Then you discover packages sometimes arrive damaged, so you add inspection cards and feedback notes (RDT 2.0). Then the feedback notes get damaged too, so you number the packages (RDT 2.1). Then packages vanish entirely, so you set a timer and resend if no receipt arrives (RDT 3.0). Each real-world problem leads to a new mechanism.",
        visual: "sim-rdt"
      },
      quiz: [
        {
          id: "q-ch3-017",
          type: "mcq",
          question: "What mechanism does RDT 3.0 add compared to RDT 2.2 to handle packet loss?",
          options: [
            "Sequence numbers (0 and 1) to detect duplicates",
            "A countdown timer that triggers retransmission if no ACK is received",
            "Negative acknowledgements (NAKs) to signal missing packets",
            "Checksums to detect bit errors"
          ],
          answer: 1,
          explanation: "RDT 2.x handles bit errors via checksums and ACK/NAK feedback. RDT 3.0 adds a timer: the sender starts a timer after transmitting each packet. If the timer expires before an ACK arrives, the sender retransmits. This handles packet loss, which earlier versions could not.",
          xpReward: 25
        },
        {
          id: "q-ch3-018",
          type: "mcq",
          question: "Why are sequence numbers (0 and 1) needed in RDT 2.1?",
          options: [
            "To allow multiple packets to be in flight at the same time",
            "To let the receiver distinguish a retransmitted packet from a new one when an ACK/NAK is corrupted",
            "To number each bit within a packet for error correction",
            "To inform the sender how much buffer space the receiver has"
          ],
          answer: 1,
          explanation: "If an ACK or NAK is corrupted in RDT 2.0, the sender does not know whether to retransmit. It retransmits to be safe, but the receiver cannot tell if this is a new packet or a duplicate. Sequence numbers 0 and 1 solve this: the receiver checks the sequence number against the one it expects and discards duplicates.",
          xpReward: 25
        },
        {
          id: "q-ch3-019",
          type: "truefalse",
          question: "A stop-and-wait protocol achieves high link utilisation on high-bandwidth, long-distance links.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Stop-and-wait is highly inefficient on high-bandwidth long-delay links. Utilisation U = (L/R) / (RTT + L/R). For example, with a 1 Gbps link, 1 KB packets, and 30 ms RTT, U ≈ 0.027% — the sender is idle 99.97% of the time. Pipelining solves this by keeping multiple packets in flight simultaneously.",
          xpReward: 25
        },
        {
          id: "q-ch3-020",
          type: "fillblank",
          question: "In RDT 2.2, instead of sending a NAK, the receiver sends a duplicate ______ for the last correctly received packet.",
          answer: "ACK",
          explanation: "RDT 2.2 eliminates NAKs. When a packet arrives corrupted or out of order, the receiver re-sends an ACK for the last packet it received correctly (a duplicate ACK). The sender interprets a duplicate ACK as a signal to retransmit the current packet — the same mechanism TCP uses for fast retransmit.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 6 — Go-Back-N & Selective Repeat
    ───────────────────────────────────────────── */
    {
      id: "ch3-sliding-window",
      title: "Go-Back-N & Selective Repeat",
      xpReward: 10,
      content: {
        summary: "Pipelined protocols keep multiple unacknowledged packets in flight to fully utilise high-bandwidth links. Go-Back-N (GBN) and Selective Repeat (SR) differ in how they handle losses. GBN retransmits the entire window on any loss; SR retransmits only the specific lost packet. Both use sliding windows and require careful sizing to prevent sequence number ambiguity.",
        bullets: [
          "GBN (Go-Back-N): uses cumulative ACKs — one ACK acknowledges all packets up to and including that sequence number",
          "GBN: receiver discards all out-of-order packets and does not buffer them",
          "GBN: on timeout or NAK, retransmits ALL unacknowledged packets in the window (up to N packets)",
          "SR (Selective Repeat): individual ACKs per packet; receiver buffers out-of-order packets",
          "SR: on timeout, retransmits ONLY the specific unacknowledged packet — much more efficient",
          "GBN window size constraint: N ≤ 2^n − 1 (n = number of sequence number bits)",
          "SR window size constraint: N ≤ 2^(n−1) — must be at most half the sequence number space to prevent ambiguity",
          "TCP is a hybrid: buffers out-of-order segments (like SR) and uses fast retransmit on 3 duplicate ACKs"
        ],
        analogy: "GBN is like a strict teacher who, if any student in a row answers incorrectly, makes the entire row redo the exercise from that student onward. SR is like a tutor who only re-explains to the one student who got it wrong while everyone else moves ahead. SR is more efficient but requires the tutor to track each student individually.",
        visual: "sim-go-back-n"
      },
      quiz: [
        {
          id: "q-ch3-021",
          type: "mcq",
          question: "What is the maximum window size for Go-Back-N when sequence numbers are represented with n = 3 bits?",
          options: [
            "4",
            "7",
            "8",
            "3"
          ],
          answer: 1,
          explanation: "GBN window size N ≤ 2^n − 1. With n = 3 bits, 2^3 = 8 sequence numbers (0–7). Maximum window = 8 − 1 = 7. One sequence number must be reserved to distinguish a new window from the previous one, preventing the receiver from confusing retransmissions with new packets.",
          xpReward: 25
        },
        {
          id: "q-ch3-022",
          type: "mcq",
          question: "How does Selective Repeat differ from Go-Back-N in handling a lost packet?",
          options: [
            "SR retransmits all packets from the lost one to the end of the window; GBN retransmits only the lost packet",
            "SR retransmits only the lost packet and buffers correctly received out-of-order packets; GBN retransmits the entire window",
            "SR and GBN both retransmit only the lost packet, but SR uses cumulative ACKs",
            "SR discards all out-of-order packets; GBN buffers them"
          ],
          answer: 1,
          explanation: "SR retransmits only the specific lost/corrupted packet. The receiver buffers correctly received but out-of-order packets and delivers them in order once the gap is filled. GBN discards out-of-order packets and forces the sender to retransmit the entire unacknowledged window, which wastes bandwidth.",
          xpReward: 25
        },
        {
          id: "q-ch3-023",
          type: "truefalse",
          question: "For Selective Repeat with n-bit sequence numbers, the maximum window size is 2^n − 1 (same as Go-Back-N).",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. SR requires a stricter constraint: window size N ≤ 2^(n−1) — at most half the sequence number space. This is because SR buffers out-of-order packets, and a larger window would cause the receiver to be unable to distinguish whether a packet belongs to the current window or a previous one that is being retransmitted.",
          xpReward: 25
        },
        {
          id: "q-ch3-024",
          type: "fillblank",
          question: "Go-Back-N uses ______ ACKs, meaning a single ACK confirms all packets up to and including the acknowledged sequence number.",
          answer: "cumulative",
          explanation: "GBN's cumulative ACKs simplify the receiver: it only needs to track the next expected sequence number. An ACK(n) tells the sender that all packets through sequence number n were received correctly. This contrasts with SR's per-packet individual ACKs.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 7 — TCP Segment Structure
    ───────────────────────────────────────────── */
    {
      id: "ch3-tcp-segment",
      title: "TCP Segment Structure",
      xpReward: 10,
      content: {
        summary: "A TCP segment consists of a header (minimum 20 bytes) and a data payload. The header carries all the information TCP needs to provide reliable, ordered, full-duplex byte-stream delivery: port numbers for multiplexing, sequence and acknowledgement numbers for ordering and reliability, flags for connection control, a receive window for flow control, and a checksum for error detection.",
        bullets: [
          "TCP header is a minimum of 20 bytes (same as IP header minimum)",
          "Source Port and Destination Port: 16 bits each — identify sending and receiving processes",
          "Sequence Number: 32 bits — byte-stream number of the first byte of data in this segment",
          "Acknowledgement Number: 32 bits — next expected byte from the other side (cumulative ACK)",
          "Header Length: 4 bits — specifies header size in 32-bit words (needed because of options)",
          "Flags: 6 bits — URG, ACK, PSH, RST, SYN, FIN control connection setup, teardown, and data handling",
          "Receive Window: 16 bits — advertises the receiver's free buffer space (used for flow control)",
          "Checksum: 16 bits — Internet checksum covering header and data",
          "MSS (Maximum Segment Size): typically 1460 bytes over Ethernet (1500 byte MTU minus 40 bytes of TCP+IP headers)",
          "TCP is full-duplex: both sides maintain independent sequence numbers and send ACKs"
        ],
        analogy: "A TCP segment header is like the outer envelope and routing slip on a business letter. It contains the sender's and recipient's 'room numbers' (ports), a serial number so the letter fits into the right order in a sequence, a confirmation of the last letter received from the other side, and special check boxes (flags) that say things like 'this starts a new conversation' (SYN) or 'I am done talking' (FIN).",
        visual: "sim-tcp-segment"
      },
      quiz: [
        {
          id: "q-ch3-025",
          type: "mcq",
          question: "What does the Acknowledgement Number field in a TCP header represent?",
          options: [
            "The sequence number of the segment just received",
            "The number of segments successfully received in this connection",
            "The next byte the receiver expects to receive from the sender",
            "The total number of bytes sent so far in this connection"
          ],
          answer: 2,
          explanation: "The ACK number is a cumulative acknowledgement: it tells the sender the sequence number of the next byte the receiver is expecting. For example, if the receiver has successfully received bytes 0–999, it sets ACK = 1000. Every byte up to 999 is implicitly acknowledged.",
          xpReward: 25
        },
        {
          id: "q-ch3-026",
          type: "mcq",
          question: "Which TCP header flag is set during the initial connection request (first message of the three-way handshake)?",
          options: [
            "ACK",
            "FIN",
            "RST",
            "SYN"
          ],
          answer: 3,
          explanation: "The SYN (synchronise) flag is set in the first segment of the TCP three-way handshake (the connection request from client to server). The server responds with SYN+ACK. The client completes the handshake with ACK. FIN is used to close connections; RST aborts them.",
          xpReward: 25
        },
        {
          id: "q-ch3-027",
          type: "truefalse",
          question: "TCP sequence numbers count packets rather than bytes — each new segment increments the sequence number by 1.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. TCP sequence numbers are byte-stream numbers. Each byte in the data stream has its own sequence number. A segment carrying 500 bytes of data starting at sequence number 1000 advances the sequence number to 1500. This byte-level numbering enables TCP to handle partial delivery and reordering precisely.",
          xpReward: 25
        },
        {
          id: "q-ch3-028",
          type: "fillblank",
          question: "The TCP header field that tells the sender how much free buffer space the receiver has available is called the receive ______.",
          answer: "window",
          explanation: "The Receive Window (rwnd) field is a 16-bit value the receiver places in each ACK segment to advertise how many bytes it can currently accept. The sender must not have more unacknowledged bytes in flight than rwnd allows — this is TCP's flow control mechanism.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 8 — TCP RTT Estimation & Timeout
    ───────────────────────────────────────────── */
    {
      id: "ch3-tcp-rtt",
      title: "TCP RTT Estimation & Timeout",
      xpReward: 10,
      content: {
        summary: "TCP dynamically estimates the round-trip time (RTT) to set its retransmission timeout. It uses an exponential weighted moving average (EWMA) for EstimatedRTT and tracks variability with DevRTT. The timeout interval is set to EstimatedRTT plus a safety margin of 4×DevRTT. When a timeout does occur, TCP doubles the interval (exponential backoff). Fast retransmit can recover from loss faster by acting on three duplicate ACKs.",
        bullets: [
          "SampleRTT: time from segment transmission to ACK receipt — measured for one unretransmitted segment at a time",
          "EstimatedRTT = (1 − α) × EstimatedRTT + α × SampleRTT, where α = 0.125 (1/8)",
          "DevRTT = (1 − β) × DevRTT + β × |SampleRTT − EstimatedRTT|, where β = 0.25 (1/4)",
          "TimeoutInterval = EstimatedRTT + 4 × DevRTT",
          "On timeout: TCP doubles TimeoutInterval (exponential backoff) to avoid flooding a congested network",
          "Fast retransmit: receiving 3 duplicate ACKs triggers immediate retransmission before the timeout fires",
          "Karn's algorithm: EstimatedRTT must NOT be updated using SampleRTT from retransmitted segments (ambiguity)"
        ],
        analogy: "TCP's RTT estimation is like learning how long your commute takes. You keep a running average (EstimatedRTT) weighted toward recent trips. You also track how variable the commute is (DevRTT). Your alarm (timeout) is set to the average plus extra time for bad-traffic days (4×DevRTT). If you seriously misjudge and are very late (timeout), you double your alarm buffer for next time (exponential backoff).",
        visual: "sim-tcp-rtt"
      },
      quiz: [
        {
          id: "q-ch3-029",
          type: "mcq",
          question: "What is the purpose of exponential backoff in TCP's timeout mechanism?",
          options: [
            "To quickly detect packet loss before the estimated RTT has expired",
            "To progressively increase the timeout interval after consecutive timeouts, avoiding further congestion",
            "To decrease the timeout interval when the network is idle",
            "To synchronise timeout intervals between sender and receiver"
          ],
          answer: 1,
          explanation: "When TCP experiences a timeout, it doubles its timeout interval. Each subsequent timeout doubles it again. This exponential backoff prevents TCP from aggressively retransmitting into an already congested network, giving the network time to recover. Once a successful ACK is received, the interval is recalculated from EstimatedRTT.",
          xpReward: 25
        },
        {
          id: "q-ch3-030",
          type: "truefalse",
          question: "TCP's fast retransmit mechanism retransmits a lost segment immediately upon receiving 3 duplicate ACKs, without waiting for the timeout.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Three duplicate ACKs strongly suggest that a specific segment was lost (later segments arrived and triggered the duplicate ACKs). TCP Reno retransmits that segment immediately — well before the retransmission timer would expire. This recovers from loss faster than waiting for a full timeout.",
          xpReward: 25
        },
        {
          id: "q-ch3-calc-031",
          type: "calc",
          question: "TCP has EstimatedRTT = 80 ms and DevRTT = 5 ms. A new SampleRTT = 100 ms arrives. Using α = 0.125 and β = 0.25, what is the new TimeoutInterval?",
          setup: "EstimatedRTT_old = 80 ms\nDevRTT_old       = 5 ms\nSampleRTT        = 100 ms\nα = 0.125  (1/8)\nβ = 0.25   (1/4)\n\nEstimatedRTT = (1 - α) × EstimatedRTT_old + α × SampleRTT\nDevRTT       = (1 - β) × DevRTT_old + β × |SampleRTT - EstimatedRTT_old|\nTimeoutInterval = EstimatedRTT + 4 × DevRTT",
          answer: "107.5",
          unit: "ms",
          tolerance: 0.5,
          calcType: "numeric",
          hint: "Compute EstimatedRTT first, then DevRTT using the OLD EstimatedRTT in the absolute difference, then TimeoutInterval.",
          explanation: "EstimatedRTT = 0.875 × 80 + 0.125 × 100 = 70 + 12.5 = 82.5 ms. DevRTT = 0.75 × 5 + 0.25 × |100 − 80| = 3.75 + 5.0 = 8.75 ms. TimeoutInterval = 82.5 + 4 × 8.75 = 82.5 + 35 = 107.5 ms.",
          xpReward: 35
        },
        {
          id: "q-ch3-calc-032",
          type: "calc",
          question: "Given EstimatedRTT = 100 ms and DevRTT = 10 ms, what is the TCP TimeoutInterval?",
          setup: "EstimatedRTT = 100 ms\nDevRTT       = 10 ms\n\nTimeoutInterval = EstimatedRTT + 4 × DevRTT",
          answer: "140",
          unit: "ms",
          tolerance: 0.1,
          calcType: "numeric",
          explanation: "TimeoutInterval = 100 + 4 × 10 = 100 + 40 = 140 ms. The factor of 4 provides a generous safety margin above the mean, accounting for variability. If DevRTT were larger (more variable network), the timeout would be proportionally longer.",
          xpReward: 35
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 9 — TCP Flow Control & Handshake
    ───────────────────────────────────────────── */
    {
      id: "ch3-tcp-flow",
      title: "TCP Flow Control & Handshake",
      xpReward: 10,
      content: {
        summary: "TCP flow control prevents the sender from overwhelming the receiver's buffer by having the receiver continuously advertise its available buffer space (rwnd) in every ACK. Connection management uses the three-way handshake (SYN, SYN-ACK, ACK) to establish state before data flows, and a four-step FIN exchange to gracefully close the connection. TCP's state machine — LISTEN, SYN_SENT, ESTABLISHED, TIME_WAIT, CLOSED — governs these transitions.",
        bullets: [
          "Flow control: receiver advertises rwnd (receive window) in every ACK — tells sender how much space is left in the receive buffer",
          "Sender constraint: amount of unacknowledged in-flight data must not exceed rwnd",
          "rwnd = RcvBuffer − [bytes received but not yet read by application]",
          "If rwnd = 0: sender stops but sends 1-byte probe segments periodically to detect when buffer clears",
          "Three-way handshake: (1) Client sends SYN, (2) Server replies SYN-ACK, (3) Client sends ACK — connection established",
          "Connection close: four-step exchange — FIN → ACK → FIN → ACK (each side independently closes its half)",
          "TIME_WAIT state: client waits 2×MSL after sending final ACK to ensure the server received it before fully closing"
        ],
        analogy: "Flow control is like filling a glass from a tap. The glass (receiver buffer) has a finite size. You tell the person holding the tap (sender) how much space is left (rwnd). They slow down or stop as the glass fills and resume when you drink some (application reads data). The three-way handshake is like a formal phone greeting before a business call: 'Hello?' (SYN) — 'Hello, I can hear you' (SYN-ACK) — 'Great, let's talk' (ACK).",
        visual: "sim-tcp-handshake"
      },
      quiz: [
        {
          id: "q-ch3-033",
          type: "mcq",
          question: "What happens in TCP when the receiver's advertised window (rwnd) drops to zero?",
          options: [
            "The connection is immediately closed by the sender",
            "The sender stops transmitting new data and periodically sends 1-byte probe segments",
            "The sender doubles its sending rate to clear the buffer faster",
            "The sender switches to UDP until the window reopens"
          ],
          answer: 1,
          explanation: "When rwnd = 0, the sender halts new data transmission. However, it continues to send tiny 1-byte probe segments at intervals. This keeps the connection alive and allows the sender to discover when the receiver's buffer has freed up (the receiver will ACK the probe with an updated, non-zero rwnd).",
          xpReward: 25
        },
        {
          id: "q-ch3-034",
          type: "mcq",
          question: "How many messages are exchanged during the TCP three-way handshake before data transfer can begin?",
          options: [
            "2 (SYN and ACK)",
            "3 (SYN, SYN-ACK, ACK)",
            "4 (SYN, SYN-ACK, ACK, DATA)",
            "1 (SYN only)"
          ],
          answer: 1,
          explanation: "TCP requires exactly three messages to establish a connection: (1) Client sends SYN to start the connection and declare its initial sequence number. (2) Server responds with SYN-ACK, acknowledging the client's SYN and advertising its own initial sequence number. (3) Client sends ACK to confirm the server's SYN. After this, both sides are ESTABLISHED and data can flow.",
          xpReward: 25
        },
        {
          id: "q-ch3-035",
          type: "truefalse",
          question: "TCP's flow control and congestion control both limit the sender's transmission rate, but they address different problems.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Flow control (governed by rwnd) protects the receiver's buffer from overflow — it is an end-to-end concern between sender and receiver. Congestion control (governed by cwnd) protects the network from overload — it responds to signals of network congestion such as packet loss and delay. The sender uses min(rwnd, cwnd) as its effective limit.",
          xpReward: 25
        },
        {
          id: "q-ch3-036",
          type: "fillblank",
          question: "After the client sends its final ACK to close a TCP connection, it enters the ______ state and waits for 2×MSL before fully closing.",
          answer: "TIME_WAIT",
          explanation: "TIME_WAIT ensures the final ACK sent by the client actually reaches the server. If the ACK was lost, the server would retransmit its FIN, and the client — still in TIME_WAIT — can re-send the ACK. MSL (Maximum Segment Lifetime) is typically 60 seconds, so TIME_WAIT lasts up to 2 minutes.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 10 — TCP Congestion Control
    ───────────────────────────────────────────── */
    {
      id: "ch3-congestion",
      title: "TCP Congestion Control",
      xpReward: 10,
      content: {
        summary: "TCP congestion control prevents a single sender from overwhelming the network by dynamically adjusting its congestion window (cwnd). It uses three phases: Slow Start (exponential growth), Congestion Avoidance (linear growth), and reacts to loss events by cutting cwnd. The AIMD (Additive Increase Multiplicative Decrease) pattern produces the characteristic TCP saw-tooth throughput curve and ensures fairness among competing flows.",
        bullets: [
          "cwnd (congestion window): the sender-side limit on unacknowledged bytes in flight",
          "Effective window = min(cwnd, rwnd) — both congestion and flow control apply simultaneously",
          "Slow Start: cwnd begins at 1 MSS and doubles each RTT (exponential growth) until it reaches ssthresh",
          "Congestion Avoidance: above ssthresh, cwnd grows by 1 MSS per RTT (linear / additive increase)",
          "On TIMEOUT: ssthresh = cwnd / 2, cwnd = 1 MSS — TCP restarts Slow Start from scratch",
          "On 3 duplicate ACKs (TCP Reno): ssthresh = cwnd / 2, cwnd = ssthresh — enter Congestion Avoidance directly (Fast Recovery)",
          "AIMD: Additive Increase (grow by 1 MSS/RTT), Multiplicative Decrease (halve on loss) — produces fair bandwidth sharing",
          "TCP Tahoe: on any loss, cwnd → 1 MSS. TCP Reno: distinguishes timeout (cwnd → 1) from 3 dup ACKs (cwnd → ssthresh)"
        ],
        analogy: "Congestion control is like merging onto a freeway. You start slow (Slow Start — accelerate quickly but cautiously), then cruise at the speed limit (Congestion Avoidance — steady pace). If you see brake lights ahead (3 dup ACKs), you slow down moderately (halve speed, resume carefully). If there is a full accident and cars stop (timeout), you come to a complete stop and restart from zero. All cars doing this together keeps traffic flowing smoothly — the AIMD fairness property.",
        visual: "sim-tcp-congestion"
      },
      quiz: [
        {
          id: "q-ch3-037",
          type: "mcq",
          question: "During TCP Slow Start, how does the congestion window (cwnd) grow with each passing RTT?",
          options: [
            "It grows by 1 MSS per RTT (linear/additive)",
            "It doubles each RTT (exponential)",
            "It grows by a fixed number of bytes per ACK received",
            "It stays constant until the first loss event"
          ],
          answer: 1,
          explanation: "Despite its name, Slow Start grows cwnd exponentially — it doubles each RTT (or equivalently, increases by 1 MSS for each ACK received). It starts slow (cwnd = 1 MSS) but ramps up rapidly. Growth continues until cwnd reaches ssthresh, at which point TCP switches to the linear growth of Congestion Avoidance.",
          xpReward: 25
        },
        {
          id: "q-ch3-038",
          type: "truefalse",
          question: "In TCP Reno, receiving 3 duplicate ACKs causes cwnd to be reset to 1 MSS, just like a timeout.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. TCP Reno treats 3 duplicate ACKs less severely than a timeout. On 3 dup ACKs: ssthresh = cwnd / 2, cwnd = ssthresh — TCP enters Congestion Avoidance directly (Fast Recovery). On TIMEOUT: ssthresh = cwnd / 2, cwnd = 1 MSS — TCP restarts Slow Start. TCP Tahoe resets to 1 MSS for both events.",
          xpReward: 25
        },
        {
          id: "q-ch3-calc-039",
          type: "calc",
          question: "TCP is in congestion avoidance with cwnd = 16 MSS. Three duplicate ACKs are received (TCP Reno). What is the new value of cwnd?",
          setup: "cwnd = 16 MSS  (congestion avoidance phase)\nEvent: 3 duplicate ACKs received\n\nTCP Reno rules for 3 duplicate ACKs:\n  ssthresh = cwnd / 2\n  cwnd     = ssthresh  (enter Fast Recovery → Congestion Avoidance)",
          answer: "8",
          unit: "MSS",
          tolerance: 0,
          calcType: "numeric",
          hint: "Both ssthresh and cwnd become cwnd / 2 on 3 dup ACKs (TCP Reno).",
          explanation: "On 3 duplicate ACKs (TCP Reno): ssthresh = 16 / 2 = 8 MSS. cwnd = ssthresh = 8 MSS. TCP skips Slow Start and enters Congestion Avoidance immediately at cwnd = 8 MSS. Compare with a TIMEOUT event, which would set cwnd = 1 MSS instead — a far more drastic reduction.",
          xpReward: 35
        },
        {
          id: "q-ch3-calc-040",
          type: "calc",
          question: "TCP is in slow start with cwnd = 12 MSS and ssthresh = 16 MSS. A timeout occurs. What is cwnd immediately after the timeout?",
          setup: "cwnd     = 12 MSS  (slow start, because cwnd < ssthresh)\nssthresh = 16 MSS\nEvent: TIMEOUT\n\nTimeout rules:\n  ssthresh = cwnd / 2\n  cwnd     = 1 MSS   (restart slow start)",
          answer: "1",
          unit: "MSS",
          tolerance: 0,
          calcType: "numeric",
          hint: "A timeout always resets cwnd to 1 MSS regardless of the current phase.",
          explanation: "On TIMEOUT: ssthresh = 12 / 2 = 6 MSS. cwnd = 1 MSS. TCP restarts from Slow Start. This is more severe than receiving 3 duplicate ACKs (which would set cwnd to 6 MSS and enter Congestion Avoidance directly) because a timeout signals a more severe congestion event — the segment was lost and no ACKs arrived at all.",
          xpReward: 35
        }
      ]
    }

  ] // end sections
}; // end window.chapter3Data
