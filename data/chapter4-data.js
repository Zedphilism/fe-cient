/**
 * data/chapter4-data.js
 * Chapter 4 topic content and quiz questions (Network Layer — Data Plane).
 * Consumed by chapter4.html via <script src="data/chapter4-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.chapter4Data = {
  id: "chapter4",
  title: "Chapter 4: Network Layer \u2014 Data Plane",
  sections: [

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 1 \u2014 Data Plane vs Control Plane
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-planes",
      title: "Data Plane vs Control Plane",
      xpReward: 10,
      content: {
        summary: "The network layer is responsible for moving packets from a sending host to a receiving host across the Internet. It is split into two distinct functions: the data plane, which handles per-router forwarding of each arriving packet, and the control plane, which determines the network-wide routes that forwarding tables are built from.",
        bullets: [
          "Network layer goal: host-to-host delivery of packets across one or more routers",
          "DATA PLANE: local, per-router function — determines how a packet arriving on an input port is forwarded to an output port using the forwarding table",
          "CONTROL PLANE: network-wide logic — determines how forwarding tables are computed across all routers",
          "Traditional control plane: routing algorithms run inside each router; routers exchange routing messages (OSPF, BGP)",
          "SDN control plane: a logically centralised remote controller computes and installs forwarding tables in each router",
          "Forwarding: moving a packet from an input link to an output link (data plane, microseconds)",
          "Routing: computing the end-to-end path a packet should take (control plane, milliseconds to seconds)",
          "Router architecture: input ports \u2192 switching fabric \u2192 output ports, plus a routing processor",
          "Input port processing: line termination \u2192 link-layer decapsulation \u2192 forwarding-table lookup \u2192 queuing",
          "Output port processing: queuing \u2192 link-layer encapsulation \u2192 line termination",
          "Head-of-line (HOL) blocking: a packet at the front of an input queue that cannot be forwarded prevents packets behind it from advancing, even if their output ports are free"
        ],
        analogy: "Think of a highway interchange. The data plane is the physical road: cars (packets) arrive at an on-ramp (input port) and the interchange signs (forwarding table) direct each car to the correct exit (output port) in microseconds. The control plane is the traffic-management centre that studies road usage and decides which signs to put up — a slower, network-wide planning function.",
        visual: "sim-router-arch"
      },
      quiz: [
        {
          id: "q-ch4-001",
          type: "mcq",
          question: "Which of the following best describes the DATA PLANE function in a router?",
          options: [
            "Computing end-to-end paths using routing algorithms such as OSPF or BGP",
            "Forwarding each arriving packet from an input port to the correct output port using the forwarding table",
            "Exchanging routing messages with neighbouring routers to build a topology map",
            "Managing the logically centralised SDN controller that programs all routers"
          ],
          answer: 1,
          explanation: "The data plane is the local, per-router forwarding function. When a packet arrives, its destination address is matched against the forwarding table and the packet is sent to the appropriate output port \u2014 all in the order of microseconds. Computing how that forwarding table was built is the job of the control plane.",
          xpReward: 25
        },
        {
          id: "q-ch4-002",
          type: "mcq",
          question: "In the Software-Defined Networking (SDN) approach to the control plane, where do routing algorithms execute?",
          options: [
            "Distributed across all routers, each running its own routing algorithm independently",
            "On a logically centralised remote controller that computes and installs forwarding tables in routers",
            "On end-host systems, which send path instructions to the routers they use",
            "On specialised line cards inside each router's switching fabric"
          ],
          answer: 1,
          explanation: "SDN separates the control plane from the data plane by moving routing logic to a logically centralised (though physically redundant) remote controller. The controller computes forwarding tables and installs them in each router via a protocol such as OpenFlow, rather than having each router run its own routing algorithm.",
          xpReward: 25
        },
        {
          id: "q-ch4-003",
          type: "truefalse",
          question: "Head-of-line (HOL) blocking occurs when a packet at the front of an input queue is waiting for a busy output port, preventing packets behind it from being forwarded even if their output ports are free.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. HOL blocking is a real performance problem in input-queued switches. The head-of-line packet stalls, and all packets behind it in the same queue are blocked regardless of whether their respective output ports are available. Virtual Output Queuing (VOQ) is one technique used to mitigate HOL blocking.",
          xpReward: 25
        },
        {
          id: "q-ch4-004",
          type: "fillblank",
          question: "Moving a packet from an input link to an output link inside a single router is called ______; determining the end-to-end path across the network is called routing.",
          answer: "forwarding",
          explanation: "Forwarding is the data-plane action that happens inside a single router in microseconds: look up the destination in the forwarding table and switch the packet to the correct output port. Routing is the control-plane process (milliseconds to seconds) that populates those forwarding tables across the whole network.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw01",
          type: "mcq",
          question: "[Homework 4] Name the layer-3 device discussed in this chapter, and the reason it is called a layer-3 device.",
          options: [
            "Switch — it operates on MAC addresses at layer 3",
            "Router — it makes forwarding decisions using layer-3 (IP) header information such as the destination IP address",
            "Hub — it repeats signals at the network layer",
            "Firewall — it blocks traffic at every layer"
          ],
          answer: 1,
          explanation: "The router. It is called a layer-3 device because it processes packets up to the NETWORK layer: it examines the IP header (destination address, TTL, etc.) to decide the output port. A switch is layer-2 (MAC addresses), a hub is layer-1 (raw bits). Device-to-layer mapping is a guaranteed exam warm-up question.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw02",
          type: "match",
          question: "[Homework 4] Match the two main functions of the network layer (plus their planes and timescales).",
          pairs: [
            { term: "Forwarding",         definition: "Move a packet from input link to output link inside ONE router" },
            { term: "Routing",            definition: "Determine the end-to-end path packets take from source to destination" },
            { term: "Forwarding plane",   definition: "Data plane — hardware, nanoseconds/microseconds" },
            { term: "Routing plane",      definition: "Control plane — algorithms/software, seconds" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The two main functions of the network layer: FORWARDING (local, per-router, data plane, very fast) and ROUTING (global, network-wide path computation, control plane, slower). Routing computes the tables; forwarding uses them. This is Homework 4 Q3 — and reliably an exam question.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw03",
          type: "calc",
          question: "[Homework 4] Router buffer sizing by the classic RULE OF THUMB: with RTT = 150 ms and link capacity C = 5 Gbps, how many Megabits of buffering are needed? (B = RTT × C)",
          setup: "Rule of thumb: B = RTT × C\nRTT = 150 ms = 0.15 s\nC = 5 Gbps = 5000 Mbps\n\nB = 0.15 × 5000 Mbps",
          answer: 750,
          tolerance: 5,
          unit: "Mbits",
          calcType: "numeric",
          hint: "B = 0.15 s × 5000 Mbps",
          explanation: "B = RTT × C = 0.15 s × 5000 Mbps = 750 Mbits (≈ 94 MB). The classic rule: one full round-trip worth of data can be 'in flight' and may need buffering when the link stalls. The follow-up question shows why this over-provisions when many flows share the link.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw04",
          type: "calc",
          question: "[Homework 4] Same link (RTT = 150 ms, C = 5 Gbps) but now with the RECENT recommendation for N = 5000 flows: B = RTT × C / √N. How many Megabits? (2 d.p. tolerance)",
          setup: "Recent recommendation: B = RTT × C / √N\nRTT × C = 750 Mbits (from previous question)\nN = 5000  →  √5000 ≈ 70.71",
          answer: 10.61,
          tolerance: 0.3,
          unit: "Mbits",
          calcType: "numeric",
          hint: "750 / 70.71",
          explanation: "B = 750 Mbits / √5000 = 750 / 70.71 ≈ 10.61 Mbits (≈ 1.3 MB) — about 70× less than the rule of thumb. With many independent TCP flows, their bursts de-synchronise and statistically smooth out, so far less buffering is needed. Both formulas (and when each applies) are exam material.",
          xpReward: 35
        }
      ]
    },

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 2 \u2014 IP Datagram Format
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-ip-format",
      title: "IP Datagram Format",
      xpReward: 10,
      content: {
        summary: "An IPv4 datagram consists of a 20-byte header (with no options) followed by the payload data. The header contains all the information routers and end systems need to deliver, fragment, and reassemble the datagram. Understanding each field is essential for diagnosing network behaviour and understanding higher-layer protocols.",
        bullets: [
          "Minimum IP header size: 20 bytes (no options); maximum: 60 bytes (with options)",
          "Version (4 bits): IP version number; 4 = IPv4",
          "Header Length / IHL (4 bits): header size in 32-bit words; typical value 5 = 20 bytes",
          "Type of Service / DSCP (8 bits): quality-of-service marking for differentiated services",
          "Total Length (16 bits): total datagram size in bytes (header + data); max 65,535 bytes",
          "Identification (16 bits): same value in all fragments of the same original datagram",
          "Flags (3 bits): bit 1 = DF (Don\u2019t Fragment); bit 2 = MF (More Fragments follow)",
          "Fragment Offset (13 bits): position of this fragment\u2019s data within the original datagram, in units of 8 bytes",
          "TTL (8 bits): decremented by 1 at each router; when it reaches 0 the datagram is dropped and an ICMP Time Exceeded message is sent back",
          "Protocol (8 bits): identifies the upper-layer protocol \u2014 6 = TCP, 17 = UDP, 1 = ICMP",
          "Header Checksum (16 bits): covers the IP header only (not the data payload); recomputed at every hop because TTL changes",
          "Source and Destination IP addresses (32 bits each): identify the sending and receiving interfaces"
        ],
        analogy: "An IP header is like the label on a postal parcel. It carries the sender\u2019s and recipient\u2019s addresses (source/destination IP), a sequence number for multi-parcel shipments (Identification/Fragment Offset), a maximum number of post offices the parcel can pass through before being discarded (TTL), and information about what\u2019s inside (Protocol). Post offices (routers) read only the label, not the contents.",
        visual: "sim-ip-datagram"
      },
      quiz: [
        {
          id: "q-ch4-005",
          type: "mcq",
          question: "An IP datagram arrives at a router with TTL = 1. What does the router do?",
          options: [
            "Forwards the datagram normally after decrementing TTL to 0",
            "Drops the datagram and sends an ICMP Time Exceeded message back to the source",
            "Sends the datagram directly to the destination, bypassing further routers",
            "Stores the datagram and retransmits it after 1 second"
          ],
          answer: 1,
          explanation: "A router decrements the TTL field before forwarding. If the result is 0 (i.e., the incoming value was 1), the datagram is dropped and the router sends an ICMP Time Exceeded message to the source. TTL prevents packets from circulating forever in routing loops.",
          xpReward: 25
        },
        {
          id: "q-ch4-006",
          type: "mcq",
          question: "Which IP header field identifies the upper-layer protocol that should receive the datagram's payload at the destination?",
          options: [
            "Version",
            "Total Length",
            "Protocol",
            "Header Checksum"
          ],
          answer: 2,
          explanation: "The Protocol field (8 bits) tells the destination host which transport-layer (or other) protocol should process the payload. Common values: 6 = TCP, 17 = UDP, 1 = ICMP. This is analogous to the port number concept one layer up.",
          xpReward: 25
        },
        {
          id: "q-ch4-007",
          type: "truefalse",
          question: "The IP Header Checksum field covers both the IP header and the entire data payload to detect any corruption in the datagram.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. The IP Header Checksum covers ONLY the IP header, not the data payload. This is why it must be recomputed at every hop (because TTL changes). Payload integrity is left to upper-layer protocols such as TCP or UDP, which have their own checksums covering the data.",
          xpReward: 25
        },
        {
          id: "q-ch4-008",
          type: "fillblank",
          question: "The IP header field that specifies the total size of the datagram (header plus data) in bytes, with a maximum value of 65,535 bytes, is called the ______ field.",
          answer: "Total Length",
          explanation: "The Total Length field (16 bits) gives the complete datagram size in bytes. Its maximum value is 2^16 \u2212 1 = 65,535 bytes. Routers and hosts use this field to know exactly where the datagram ends, and it is used alongside the Fragment Offset during reassembly.",
          xpReward: 25
        }
      ]
    },

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 3 \u2014 IP Fragmentation & Reassembly
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-fragmentation",
      title: "IP Fragmentation & Reassembly",
      xpReward: 10,
      content: {
        summary: "Different link-layer technologies impose different Maximum Transmission Unit (MTU) limits on datagram size. When an IP datagram is larger than the MTU of an outgoing link, the router must fragment it into smaller datagrams. Fragments are reassembled only at the final destination host, not at intermediate routers.",
        bullets: [
          "MTU (Maximum Transmission Unit): largest datagram a link can carry; Ethernet MTU = 1500 bytes",
          "If a datagram exceeds the outgoing link\u2019s MTU, the router fragments it (unless DF bit is set \u2014 then it drops and sends ICMP Fragmentation Needed)",
          "Max data per fragment = MTU \u2212 20 bytes (for the 20-byte IP header added to each fragment)",
          "All fragments share the same Identification field so the destination can group them",
          "MF (More Fragments) flag: 1 = more fragments follow; 0 = this is the last (or only) fragment",
          "Fragment Offset: byte position of this fragment\u2019s first data byte within the original datagram, divided by 8",
          "All fragment data sizes (except the last) must be a multiple of 8 bytes to keep offsets integer",
          "Reassembly is performed ONLY at the destination host, never at intermediate routers",
          "IPv6 does NOT support router fragmentation; senders use Path MTU Discovery (PMTUD) to find the minimum MTU along a path"
        ],
        analogy: "Fragmentation is like shipping furniture that is too large for the delivery van. The warehouse (router) disassembles the wardrobe (datagram) into pieces (fragments) that fit. Each piece is labelled with the same order number (Identification), a position tag (Fragment Offset), and a \u2018more pieces coming\u2019 sticker (MF flag). Only at your home (destination host) are the pieces reassembled \u2014 the delivery depots along the way just pass them through.",
        visual: "sim-fragmentation"
      },
      quiz: [
        {
          id: "q-ch4-009",
          type: "mcq",
          question: "Where in the network does IPv4 datagram reassembly take place?",
          options: [
            "At every intermediate router that receives a fragment",
            "Only at the destination host",
            "At the first router that detects all fragments have arrived",
            "At the source host before retransmitting"
          ],
          answer: 1,
          explanation: "IPv4 reassembly happens only at the final destination host. Intermediate routers simply forward individual fragments toward the destination using normal forwarding. This design keeps routers simple and stateless. IPv6 goes further by forbidding router fragmentation entirely.",
          xpReward: 25
        },
        {
          id: "q-ch4-010",
          type: "truefalse",
          question: "IPv6 routers can fragment datagrams when they exceed a link's MTU, just like IPv4 routers.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. IPv6 does NOT allow routers to fragment datagrams. If an IPv6 datagram is too large for a link, the router drops it and sends an ICMPv6 Packet Too Big message back to the source. The source then uses Path MTU Discovery (PMTUD) to determine the smallest MTU on the path and fragments at the source if necessary.",
          xpReward: 25
        },
        {
          id: "q-ch4-calc-001",
          type: "calc",
          question: "A 4000-byte IP datagram (20-byte header + 3980 bytes of data) must traverse a link with MTU = 1500 bytes. What is the fragment offset (in 8-byte units) of the SECOND fragment?",
          setup: "Datagram: 20-byte header + 3980 bytes data = 4000 bytes total\nMTU = 1500 bytes\nMax data per fragment = MTU \u2212 20 = 1480 bytes\n\nFragment offset = (byte position of fragment\u2019s first data byte) \u00f7 8",
          answer: "185",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "First fragment carries bytes 0\u20131479. Second fragment starts at byte 1480. Offset = 1480 \u00f7 8",
          explanation: "Max data per fragment = 1500 \u2212 20 = 1480 bytes.\nFragment 1: bytes 0\u20131479, offset = 0/8 = 0, MF = 1.\nFragment 2: bytes 1480\u20132959, offset = 1480/8 = 185, MF = 1.\nFragment 3: bytes 2960\u20133979 (1020 bytes of data), offset = 2960/8 = 370, MF = 0.\nTotal: 3 fragments. The second fragment\u2019s offset = 185.",
          xpReward: 35
        },
        {
          id: "q-ch4-calc-002",
          type: "calc",
          question: "A 3000-byte IP datagram (20-byte header + 2980 bytes of data) is fragmented across a 1500-byte MTU link. What is the fragment offset of the THIRD fragment? Enter 0 if no third fragment exists.",
          setup: "Datagram: 20-byte header + 2980 bytes data = 3000 bytes total\nMTU = 1500 bytes\nMax data per fragment = 1480 bytes\n\nFragment 1: bytes 0\u20131479 (offset 0)\nFragment 2: bytes 1480\u20132959 (offset 185)\nFragment 3: bytes 2960\u20132979 = 20 bytes remaining",
          answer: "370",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "2980 bytes of data \u00f7 1480 = 2 full fragments + 20 bytes remainder \u2192 3 fragments total",
          explanation: "Fragment 1: 1480 bytes data, offset = 0/8 = 0, MF = 1.\nFragment 2: 1480 bytes data, offset = 1480/8 = 185, MF = 1.\nFragment 3: 2980 \u2212 2960 = 20 bytes data, offset = 2960/8 = 370, MF = 0.\nThree fragments total; the third fragment\u2019s offset = 370.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw05",
          type: "calc",
          question: "[Homework 4] A 6000-byte datagram (20-byte header + 5980 bytes of data) is sent over a link with MTU = 1500 bytes. Into how many fragments is it split?",
          setup: "Total datagram: 6000 bytes (20 header + 5980 data)\nMTU = 1500 \u2192 max data per fragment = 1500 \u2212 20 = 1480 bytes\n\nFragments = \u23085980 / 1480\u2309",
          answer: 5,
          tolerance: 0,
          unit: "fragments",
          calcType: "numeric",
          hint: "4 \u00d7 1480 = 5920 < 5980 \u2014 the remainder needs one more fragment",
          explanation: "5980 / 1480 = 4.04 \u2192 5 fragments. Fragmentation table:\nFrag 1: 1480 bytes, offset 0, MF=1\nFrag 2: 1480 bytes, offset 185, MF=1\nFrag 3: 1480 bytes, offset 370, MF=1\nFrag 4: 1480 bytes, offset 555, MF=1\nFrag 5: 60 bytes, offset 740, MF=0\nEach fragment gets its own 20-byte IP header; offsets count 8-byte units. Reassembly happens only at the destination.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw06",
          type: "calc",
          question: "[Homework 4] In the previous 6000-byte / MTU-1500 scenario, what is the fragment OFFSET value of the FIFTH (last) fragment?",
          setup: "Fragment 5 carries data bytes starting at byte 4 \u00d7 1480 = 5920\nOffset field = starting byte \u00f7 8",
          answer: 740,
          tolerance: 0,
          unit: "offset",
          calcType: "numeric",
          hint: "5920 / 8",
          explanation: "Offset = 5920/8 = 740. The offset field counts 8-byte blocks (13 bits couldn't address 65,535 bytes directly). The last fragment carries the 60 remaining data bytes and has MF = 0 (no more fragments). Building the full fragmentation table \u2014 lengths, offsets, MF flags \u2014 is exactly Homework 4 Q10 and a standard exam table question.",
          xpReward: 35
        }
      ]
    },

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 4 \u2014 IPv4 Addressing & CIDR
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-addressing",
      title: "IPv4 Addressing & CIDR",
      xpReward: 10,
      content: {
        summary: "An IPv4 address is a 32-bit number that identifies an interface (not a device). Classless Inter-Domain Routing (CIDR) replaced the old classful system and lets any prefix length be used, enabling efficient address allocation and route aggregation. Routers use longest-prefix matching to select the best forwarding-table entry.",
        bullets: [
          "IP address: 32-bit value written in dotted-decimal notation (e.g. 192.168.1.1), identifies an INTERFACE",
          "A device with multiple interfaces (e.g. a router) has one IP address per interface",
          "Subnet: a group of interfaces sharing the same IP prefix; they can communicate without a router",
          "CIDR notation: a.b.c.d/x \u2014 the first x bits form the network prefix; the remaining 32\u2212x bits are the host part",
          "Usable host addresses in a /x subnet: 2^(32\u2212x) \u2212 2 (subtract network address and broadcast address)",
          "Classful addressing (deprecated): Class A = /8 (\u224816 M hosts), Class B = /16 (\u224865 K), Class C = /24 (254 hosts)",
          "CIDR benefits: precise address block allocation; route aggregation (one /x entry covers many prefixes)",
          "Longest-prefix match: when multiple forwarding entries match a destination, the most specific (longest prefix) wins",
          "Subnetting: borrow bits from the host portion to create more subnets with fewer hosts each",
          "Special addresses: 0.0.0.0/0 = default route; 127.0.0.1 = loopback; 255.255.255.255 = limited broadcast"
        ],
        analogy: "CIDR is like postal zip codes. A /16 block is a large city-region code; a /24 is a specific neighbourhood; a /30 is a single street. Route aggregation is like a delivery company saying \u201ceverything in zip codes 90000\u201390999 goes to the Los Angeles depot\u201d instead of listing every address individually.",
        visual: "sim-cidr"
      },
      quiz: [
        {
          id: "q-ch4-011",
          type: "mcq",
          question: "When a router has multiple forwarding-table entries that match a packet's destination IP address, which entry is selected?",
          options: [
            "The entry with the shortest (least specific) prefix",
            "The entry with the longest (most specific) matching prefix",
            "The first matching entry in the order the table was built",
            "A randomly chosen matching entry for load balancing"
          ],
          answer: 1,
          explanation: "Routers use longest-prefix matching: the entry whose prefix has the most bits matching the destination address wins. This allows both specific routes (e.g. /30 for a point-to-point link) and aggregate routes (e.g. /16 for a whole organisation) to coexist, with the specific route taking precedence.",
          xpReward: 25
        },
        {
          id: "q-ch4-012",
          type: "truefalse",
          question: "An IP address identifies a device (host or router) rather than a specific network interface on that device.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. An IP address identifies an INTERFACE, not a device. A router with three outgoing links has three different IP addresses \u2014 one per interface. Similarly, a multihomed host connected to two networks has two IP addresses. This distinction matters when reasoning about routing and subnets.",
          xpReward: 25
        },
        {
          id: "q-ch4-calc-003",
          type: "calc",
          question: "How many usable host addresses are in a /26 subnet?",
          setup: "CIDR prefix length: /26\nHost bits = 32 \u2212 26 = 6\nTotal addresses = 2^6 = 64\nUsable hosts = total \u2212 2 (network address + broadcast address)",
          answer: "62",
          unit: "hosts",
          tolerance: 0,
          calcType: "numeric",
          hint: "Usable hosts = 2^(32 \u2212 prefix length) \u2212 2",
          explanation: "Host bits = 32 \u2212 26 = 6. Total addresses = 2^6 = 64. Subtract 2 for the network address (e.g. 192.168.1.0) and the broadcast address (e.g. 192.168.1.63). Usable hosts = 64 \u2212 2 = 62 (addresses .1 through .62).",
          xpReward: 35
        },
        {
          id: "q-ch4-calc-004",
          type: "calc",
          question: "A university is allocated the block 200.23.16.0/20. It subdivides this block into equal /23 subnets. How many /23 subnets can it create?",
          setup: "Block: 200.23.16.0/20\nOriginal prefix length: /20\nDesired subnet prefix length: /23\nBits borrowed = 23 \u2212 20 = 3\nNumber of subnets = 2^(bits borrowed)",
          answer: "8",
          unit: "subnets",
          tolerance: 0,
          calcType: "numeric",
          hint: "Additional bits borrowed = new prefix length \u2212 original prefix length. Subnets = 2^(borrowed bits).",
          explanation: "Going from /20 to /23 borrows 3 bits from the host portion (23 \u2212 20 = 3). Number of subnets = 2^3 = 8. Each /23 subnet provides 2^9 = 512 total addresses (510 usable hosts), and the 8 subnets together exactly fill the original /20 block.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw07",
          type: "mcq",
          question: "[Homework 4] A router's forwarding table contains several prefixes. A packet's destination matches BOTH 172.16.224.0/19 and 172.16.226.0/23. Which entry is used, and by what rule?",
          options: [
            "172.16.224.0/19 \u2014 the shortest prefix is preferred",
            "172.16.226.0/23 \u2014 the LONGEST-PREFIX-MATCH rule picks the most specific entry",
            "Whichever entry appears first in the table",
            "Both \u2014 the packet is duplicated to both output ports"
          ],
          answer: 1,
          explanation: "Longest prefix match: when multiple table entries match a destination, the router uses the one with the MOST prefix bits (most specific route). /23 (23 matching bits) beats /19. This is the algorithm behind Homework 4 Q4 \u2014 given a forwarding table, always match destination addresses against the longest prefix first.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw08",
          type: "calc",
          question: "[Homework 4] For the address 200.20.226.5/21, find the NETWORK address. Enter the value of the THIRD octet of the network address (200.20.X.0).",
          setup: "/21 \u2192 subnet mask 255.255.248.0 (5 network bits in the 3rd octet, block size 8)\n3rd octet: 226 = 11100010\u2082\nMask 3rd octet: 248 = 11111000\u2082\nNetwork 3rd octet = 226 AND 248 = ?",
          answer: 224,
          tolerance: 0,
          unit: "octet 3",
          calcType: "numeric",
          hint: "Block size 8 in the 3rd octet: multiples of 8 \u2014 which multiple contains 226?",
          explanation: "226 AND 248 = 224 (block size 8: 224 \u2264 226 < 232). Network address = 200.20.224.0/21. Working shown Homework-style: /21 leaves 3 host bits in octet 3 \u2192 blocks of 8 \u2192 226 falls in the 224\u2013231 block. This AND-with-mask (or block-size) method solves every 'find the network address' exam question.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw09",
          type: "calc",
          question: "[Homework 4] Same subnet (200.20.226.5/21, network 200.20.224.0). Find the BROADCAST address. Enter the value of its THIRD octet (200.20.X.255).",
          setup: "Network: 200.20.224.0/21, block size 8 in the 3rd octet\nBroadcast = last address of the block\n3rd octet = 224 + 8 \u2212 1 = ?",
          answer: 231,
          tolerance: 0,
          unit: "octet 3",
          calcType: "numeric",
          hint: "Top of the 224-block: 224 + 7",
          explanation: "Broadcast = 200.20.231.255 (3rd octet 231 = 224 + 8 \u2212 1, 4th octet all-ones = 255). Usable host range: 200.20.224.1 \u2013 200.20.231.254 (2\u00b9\u00b9 \u2212 2 = 2046 hosts). Network address + broadcast address bracket every subnet \u2014 compute both for full marks in Homework 4 Q5-style questions.",
          xpReward: 35
        },
        {
          id: "q-ch4-hw10",
          type: "mcq",
          question: "[Homework 4] VLSM subnetting of 188.192.192.0/22 for departments A(100), B(210), C(80), D(40), E(10 usable hosts). Which prefix length must department B (210 hosts) receive?",
          options: [
            "/23 \u2014 510 usable hosts",
            "/24 \u2014 254 usable hosts, the smallest block that fits 210",
            "/25 \u2014 126 usable hosts",
            "/26 \u2014 62 usable hosts"
          ],
          answer: 1,
          explanation: "B needs 210 usable hosts: 2\u02b0 \u2212 2 \u2265 210 \u2192 h = 8 host bits \u2192 /24 (254 usable, 44 unused). VLSM always allocates LARGEST department first: B /24, then A(100) /25 (126 usable), C(80) /25, D(40) /26 (62 usable), E(10) /28 (14 usable). Unused hosts per subnet = usable \u2212 needed \u2014 exactly the Homework 4 Q6 table.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw11",
          type: "calc",
          question: "[Homework 4] In the VLSM plan, department D (40 hosts) is allocated a /26 subnet. How many UNUSED usable host addresses remain in D's subnet?",
          setup: "/26 \u2192 host bits = 32 \u2212 26 = 6\nUsable hosts = 2\u2076 \u2212 2 = 62\nUnused = usable \u2212 needed = 62 \u2212 40",
          answer: 22,
          tolerance: 0,
          unit: "hosts",
          calcType: "numeric",
          hint: "62 \u2212 40",
          explanation: "62 \u2212 40 = 22 unused hosts. The 'unused hosts' column of the VLSM table quantifies allocation waste: 2\u02b0 \u2212 2 usable minus what the department actually needs. Repeat for all: B 44, A 26, C 46, D 22, E 4 unused. Homework 4 Q6(b) asks for exactly this per-subnet calculation.",
          xpReward: 35
        }
      ]
    },

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 5 \u2014 DHCP & NAT
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-dhcp-nat",
      title: "DHCP & NAT",
      xpReward: 10,
      content: {
        summary: "DHCP (Dynamic Host Configuration Protocol) allows a host to automatically obtain an IP address and other network configuration when it joins a network. NAT (Network Address Translation) lets an entire private network share a single public IP address, conserving the IPv4 address space while introducing a translation layer between private and public addresses.",
        bullets: [
          "DHCP DORA exchange: Discover \u2192 Offer \u2192 Request \u2192 Acknowledge (all four initial messages are broadcast)",
          "DHCP provides: IP address, subnet mask, default gateway IP, DNS server IP",
          "DHCP addresses are leased (temporary); hosts must renew before the lease expires",
          "Plug-and-play: a host joining any DHCP-enabled network gets full configuration automatically, with no manual setup",
          "NAT: a NAT router holds one public IP address; internal hosts use private address ranges (10.x.x.x, 172.16\u201331.x.x, 192.168.x.x)",
          "NAT translation table: maps (private IP, private port) \u2194 (public IP, public port) for each active connection",
          "Outgoing NAT: replace source IP:port with the NAT router\u2019s public IP:new port; record mapping in table",
          "Incoming NAT: look up destination port in translation table; replace destination IP:port with private IP:port",
          "NAT controversy: violates the end-to-end principle; complicates inbound connections (requires port forwarding or hole-punching)",
          "NAT traversal problem: P2P applications behind NAT require techniques like hole-punching or STUN to establish direct connections"
        ],
        analogy: "DHCP is like checking into a hotel. When you arrive (join the network), the front desk (DHCP server) assigns you a room number (IP address) and hands you the building map (subnet mask), the main exit (default gateway), and the concierge\u2019s extension (DNS server). NAT is like a company\u2019s reception: all external calls appear to come from the main company number (public IP), but the receptionist (NAT router) routes incoming calls to the right extension (private IP:port) using an internal directory (translation table).",
        visual: "sim-dhcp"
      },
      quiz: [
        {
          id: "q-ch4-013",
          type: "mcq",
          question: "Which four pieces of information does a DHCP server typically provide to a newly joined client?",
          options: [
            "IP address, MAC address, routing table, and DNS server",
            "IP address, subnet mask, default gateway, and DNS server address",
            "IP address, TTL value, MTU size, and SMTP server address",
            "IP address, subnet mask, ARP table, and default gateway"
          ],
          answer: 1,
          explanation: "DHCP provides the four essentials for network operation: (1) the client\u2019s IP address, (2) the subnet mask (so the client knows its subnet), (3) the default gateway IP (so the client can reach outside its subnet), and (4) the DNS server address (so the client can resolve domain names). MAC addresses are burned into hardware; routing tables and ARP tables are built dynamically.",
          xpReward: 25
        },
        {
          id: "q-ch4-014",
          type: "mcq",
          question: "A host inside a NAT network sends a TCP packet. The NAT router rewrites the packet before forwarding it to the Internet. What does it change?",
          options: [
            "The destination IP address and destination port number",
            "The source IP address and source port number",
            "Both source and destination IP addresses and port numbers",
            "Only the source IP address, leaving the port number unchanged"
          ],
          answer: 1,
          explanation: "On outgoing packets, the NAT router replaces the source IP address (private) with its own public IP address, and replaces the source port number with a new port number it chooses. The mapping is recorded in the NAT translation table so the reverse translation can be applied to any incoming reply.",
          xpReward: 25
        },
        {
          id: "q-ch4-015",
          type: "truefalse",
          question: "The DHCP Discover message sent by a newly joining host is transmitted as a unicast packet directly to the DHCP server's known IP address.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. The DHCP Discover message is broadcast (destination IP 255.255.255.255, destination MAC FF:FF:FF:FF:FF:FF) because the host does not yet know the DHCP server\u2019s address \u2014 or even its own IP address. All four DORA messages are initially broadcast; only after the client has an address can it communicate with the server via unicast.",
          xpReward: 25
        },
        {
          id: "q-ch4-016",
          type: "fillblank",
          question: "The acronym that describes the four-step DHCP address-assignment process is ______ (Discover, Offer, Request, Acknowledge).",
          answer: "DORA",
          explanation: "DORA stands for Discover \u2192 Offer \u2192 Request \u2192 Acknowledge. The client broadcasts a Discover; one or more DHCP servers respond with an Offer; the client broadcasts a Request to accept one offer; the chosen server sends an Acknowledge confirming the lease. All four messages initially use broadcast addressing.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw12",
          type: "mcq",
          question: "[Homework 4] When configuring DHCP, what portion of the subnetwork's address space is used for distribution to clients?",
          options: [
            "The network portion of the address",
            "The HOST portion \u2014 a configured pool/range of host addresses within the subnet (excluding network, broadcast, and reserved static addresses)",
            "The subnet mask bits",
            "The MAC address range of the clients"
          ],
          answer: 1,
          explanation: "DHCP hands out addresses from the HOST portion of the subnet \u2014 an administrator-defined pool (e.g. .100\u2013.200) that excludes the network address, the broadcast address, and statically assigned addresses (gateway, servers, printers). The network prefix is fixed for everyone on the subnet; only host bits vary. Homework 4 Q7(d).",
          xpReward: 25
        },
        {
          id: "q-ch4-hw13",
          type: "mcq",
          question: "[Homework 4] What happens when a DHCP lease expires \u2014 and what if it expires while the host is still actively using the address?",
          options: [
            "The address is permanent once assigned; leases never expire",
            "The address returns to the pool; an active host normally RENEWS before expiry (at ~50% lease time) \u2014 if renewal fails, it must stop using the address and restart discovery",
            "The host keeps the address forever as long as it stays powered on",
            "The DHCP server immediately assigns the host a new MAC address"
          ],
          answer: 1,
          explanation: "The lease is a timed rental. On expiry the address returns to the pool for reuse. Active hosts don't wait: at ~T/2 they unicast a renewal Request to the server, extending the lease invisibly. If renewal (and rebinding) fail and the lease truly lapses, the host must cease using the IP and restart DORA \u2014 otherwise it risks an address conflict. Homework 4 Q7(e), and a classic exam explanation question.",
          xpReward: 25
        },
        {
          id: "q-ch4-hw14",
          type: "match",
          question: "[Homework 4] NAT summary \u2014 match each aspect of Network Address Translation to its description.",
          pairs: [
            { term: "What NAT is",       definition: "Translation of private IP:port pairs to one public IP with unique ports" },
            { term: "Purpose",           definition: "Conserve public IPv4 addresses; whole network shares one public IP" },
            { term: "Outgoing packet",   definition: "Source private IP:port replaced by public IP:new port; mapping recorded" },
            { term: "Incoming packet",   definition: "Destination port looked up in the NAT table; rewritten to private IP:port" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Homework 4 Q8 in one table: NAT is address+port translation at the border router; its purpose is IPv4 conservation (plus hiding internal topology); mechanically, the translation table maps (private IP, port) \u2194 (public IP, port) per connection \u2014 rewrite on the way out, look up and rewrite back on the way in.",
          xpReward: 25
        }
      ]
    },

    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       SECTION 6 \u2014 IPv6
    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    {
      id: "ch4-ipv6",
      title: "IPv6",
      xpReward: 10,
      content: {
        summary: "IPv6 was developed to replace IPv4 as the 32-bit address space neared exhaustion. It uses 128-bit addresses (3.4 \u00d7 10^38 possible addresses), a simplified fixed-length 40-byte header, and eliminates router fragmentation and header checksums. Transition from IPv4 to IPv6 uses dual-stack operation and tunnelling.",
        bullets: [
          "IPv6 addresses: 128 bits written in colon-hexadecimal notation (8 groups of 16 bits each)",
          "Address shorthand: leading zeros in each group can be omitted; one run of consecutive all-zero groups can be replaced with :: (used at most once per address)",
          "Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334 \u2192 2001:db8:85a3::8a2e:370:7334",
          "IPv6 header: fixed 40 bytes \u2014 Version (4b), Traffic Class (8b), Flow Label (20b), Payload Length (16b), Next Header (8b), Hop Limit (8b), Src/Dst addresses (128b each)",
          "No fragmentation at routers: IPv6 routers drop oversized datagrams and send ICMPv6 Packet Too Big; source uses Path MTU Discovery",
          "No header checksum: removed to speed up per-hop processing (transport-layer checksums cover the data)",
          "No options field: options handled via extension headers chained through the Next Header field",
          "Hop Limit: same purpose as IPv4 TTL \u2014 decremented at each router; 0 \u2192 discard",
          "Transition mechanisms: dual-stack (node runs both IPv4 and IPv6); tunnelling (encapsulate IPv6 datagram inside an IPv4 datagram to cross IPv4-only regions)",
          "IPv4 is not disappearing soon: dual-stack and NAT keep IPv4 alive while IPv6 adoption grows"
        ],
        analogy: "IPv6 addresses are like expanded postal codes for an entire planet. IPv4\u2019s 32-bit address space is like a four-digit zip code that has run out of combinations for a huge country. IPv6\u2019s 128-bit space is like giving every grain of sand on Earth its own unique address \u2014 exhaustion is not a concern. Tunnelling is like shipping an international parcel inside a domestic-only envelope: the outer label (IPv4) gets it through the domestic system; the receiver removes the outer envelope to find the international contents (IPv6).",
        visual: "sim-ipv6"
      },
      quiz: [
        {
          id: "q-ch4-017",
          type: "mcq",
          question: "What is the size of an IPv6 header (with no extension headers)?",
          options: [
            "20 bytes, the same as a minimal IPv4 header",
            "32 bytes",
            "40 bytes",
            "128 bytes"
          ],
          answer: 2,
          explanation: "The IPv6 base header is always exactly 40 bytes. Unlike IPv4, the header length is fixed, which simplifies and speeds up router processing. The fields are: Version (4b), Traffic Class (8b), Flow Label (20b), Payload Length (16b), Next Header (8b), Hop Limit (8b), and two 128-bit addresses = 32 bytes for addresses alone.",
          xpReward: 25
        },
        {
          id: "q-ch4-018",
          type: "mcq",
          question: "Which transition mechanism encapsulates an IPv6 datagram inside an IPv4 datagram to allow it to cross an IPv4-only network segment?",
          options: [
            "Dual stack",
            "NAT64",
            "Tunnelling",
            "Anycast routing"
          ],
          answer: 2,
          explanation: "Tunnelling wraps an IPv6 datagram as the payload of an IPv4 datagram. The IPv4 source and destination are the tunnel endpoints (dual-stack routers). The IPv4 network sees only normal IPv4 traffic; at the far end, the IPv6 datagram is extracted and forwarded natively. Dual stack means a node runs both protocols simultaneously but does not involve encapsulation.",
          xpReward: 25
        },
        {
          id: "q-ch4-019",
          type: "truefalse",
          question: "IPv6 routers can fragment a datagram when it is too large for the outgoing link's MTU.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. IPv6 routers cannot fragment datagrams. If a datagram is too large, the router drops it and sends an ICMPv6 Packet Too Big message back to the source. The source is responsible for performing fragmentation using extension headers, after learning the path MTU via Path MTU Discovery (PMTUD).",
          xpReward: 25
        },
        {
          id: "q-ch4-020",
          type: "fillblank",
          question: "In IPv6 address notation, a consecutive sequence of all-zero 16-bit groups can be replaced by the abbreviation ______.",
          answer: "::",
          explanation: "The double-colon :: abbreviation replaces one or more consecutive groups of all zeros in an IPv6 address. It may appear only ONCE in an address to avoid ambiguity. For example, the loopback address 0000:0000:0000:0000:0000:0000:0000:0001 is written as ::1.",
          xpReward: 25
        }
      ]
    }

  ]
};
