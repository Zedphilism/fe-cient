/**
 * data/chapter6-data.js
 * Chapter 6 topic content and quiz questions (The Link Layer and LANs).
 * Consumed by chapter6.html via <script src="data/chapter6-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.chapter6Data = {
  id: "chapter6",
  title: "Chapter 6: The Link Layer and LANs",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — Link Layer Introduction & Services
    ───────────────────────────────────────────── */
    {
      id: "ch6-intro",
      title: "Link Layer: Introduction & Services",
      xpReward: 10,
      content: {
        summary: "The link layer moves frames between directly connected nodes — two devices connected by a single physical link (wire, fiber, or wireless channel). Unlike the network layer that handles end-to-end routing across many hops, the link layer deals with one hop at a time. Every frame travels a new link-layer path at each hop, even though the IP datagram inside is the same end-to-end.",
        bullets: [
          "Link layer unit of data: FRAME (wraps the IP datagram with a header and trailer)",
          "Services vary by link type: not every link offers all services",
          "Framing: encapsulate datagram into a frame, adding header and trailer fields",
          "Link access: MAC (Medium Access Control) protocol governs when a node may transmit on a shared medium",
          "Reliable delivery: some links (e.g. WiFi) guarantee error-free delivery per hop; wired links often skip this since bit errors are rare",
          "Error detection: receiver detects bit errors introduced by noise; more powerful than network-layer checksum",
          "Error correction: receiver corrects errors without retransmission (used on high-error links)",
          "Half-duplex: nodes on both ends of the link can transmit but not simultaneously",
          "Full-duplex: both ends can transmit simultaneously",
          "Link layer is implemented in the Network Interface Card (NIC) — part hardware, part software"
        ],
        analogy: "Think of a cross-country trip by plane with layovers. The airline boarding pass (IP datagram) is the same the whole journey, but each individual flight segment (link) has its own boarding procedures, gate agent, and rules. The link layer is each individual flight segment, not the whole trip.",
        visual: "sim-link-layer-intro"
      },
      quiz: [
        {
          id: "q-ch6-001",
          type: "mcq",
          question: "What is the unit of data at the link layer?",
          options: ["Datagram", "Segment", "Frame", "Packet"],
          answer: 2,
          explanation: "The link layer encapsulates the IP datagram into a FRAME by adding a link-layer header and trailer. The network layer uses datagrams, the transport layer uses segments, and 'packet' is an informal term. At the link layer, the formal term is frame.",
          xpReward: 25
        },
        {
          id: "q-ch6-002",
          type: "truefalse",
          question: "The link layer is responsible for delivering a frame from the source host all the way to the destination host across multiple hops.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. The link layer only moves a frame across ONE hop — a single link between two directly connected nodes. End-to-end delivery across multiple hops is the job of the network layer (IP). Each hop uses a fresh link-layer frame.",
          xpReward: 25
        },
        {
          id: "q-ch6-003",
          type: "mcq",
          question: "Where is the link layer primarily implemented?",
          options: [
            "In the operating system kernel's IP stack",
            "In the application layer software",
            "In the Network Interface Card (NIC)",
            "In the DNS resolver"
          ],
          answer: 2,
          explanation: "The link layer is implemented largely in the Network Interface Card (NIC), also called a network adapter. The NIC handles framing, error detection, and MAC protocols in hardware and firmware, with some link-layer functions handled by device-driver software in the OS.",
          xpReward: 25
        },
        {
          id: "q-ch6-004",
          type: "fillblank",
          question: "A link where both ends can transmit data simultaneously is called ______-duplex.",
          answer: "full",
          explanation: "Full-duplex links allow simultaneous two-way transmission. Half-duplex links allow transmission in both directions but not at the same time — both sides share the same medium and must take turns.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Error Detection & Correction
    ───────────────────────────────────────────── */
    {
      id: "ch6-error-detection",
      title: "Error Detection & Correction (Parity, CRC)",
      xpReward: 10,
      content: {
        summary: "Bit errors on a link are introduced by noise, signal attenuation, and interference. The sender appends Error Detection and Correction (EDC) bits to the data before transmission. The receiver recomputes the check on the received bits and compares it to the received EDC bits — a mismatch signals an error. Cyclic Redundancy Check (CRC) is the dominant technique in modern NICs.",
        bullets: [
          "Parity bit (1-D): add a bit so total number of 1s is even (even parity) or odd (odd parity). Detects single-bit errors only.",
          "2-D parity: arrange bits in a grid; compute parity for each row AND column. Can detect AND correct single-bit errors.",
          "Internet checksum (recall): sum of 16-bit words, used by TCP/UDP/IP — lightweight but weaker than CRC",
          "CRC (Cyclic Redundancy Check): treat data as a polynomial, divide by agreed generator polynomial G, remainder R is appended",
          "CRC transmits D·2^r XOR R so that the received bits are exactly divisible by G; any remainder ≠ 0 means error detected",
          "CRC can detect all burst errors of length ≤ r bits (where r = degree of G)",
          "CRC-32 (r=32) is standard in Ethernet, WiFi, USB — 32 check bits appended to every frame",
          "Error correction (FEC — Forward Error Correction): used on links where retransmission is too costly (satellite, optical)"
        ],
        analogy: "CRC is like a secret checksum word at the end of a message. If I send you 'HELLO5' and you receive 'HELO5', you recompute the check digit and get something different from 5, so you know an error occurred. CRC is a much more powerful version of this idea — it can catch entire burst of flipped bits.",
        visual: "sim-crc"
      },
      quiz: [
        {
          id: "q-ch6-005",
          type: "mcq",
          question: "Which error detection technique is used in Ethernet and WiFi NICs for link-layer frames?",
          options: [
            "Internet checksum (16-bit ones-complement sum)",
            "Single-bit parity",
            "2-D parity",
            "Cyclic Redundancy Check (CRC-32)"
          ],
          answer: 3,
          explanation: "Ethernet and WiFi use CRC-32 — a 32-bit Cyclic Redundancy Check — appended to every frame. The Internet checksum is used by TCP/UDP/IP headers (a faster but weaker check). CRC is far more powerful and can detect all burst errors up to 32 bits long.",
          xpReward: 25
        },
        {
          id: "q-ch6-006",
          type: "truefalse",
          question: "A single-bit parity scheme can detect any odd number of bit errors in a transmitted data unit.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. A single-bit parity check detects any odd number of flipped bits. However, if an even number of bits flip, the parity bit is unchanged and the error goes undetected. That is why stronger techniques like CRC are used in practice.",
          xpReward: 25
        },
        {
          id: "q-ch6-calc-001",
          type: "calc",
          question: "Given data D = 101110 and generator G = 1001 (degree r=3), what are the CRC remainder bits R appended to the frame? Enter as a binary string (3 bits).",
          setup: "CRC procedure:\n1. Append r=3 zero bits to D: 101110 000\n2. Divide 101110000 by G=1001 using XOR (modulo-2) division\n3. The 3-bit remainder R is the CRC\n\nHint: Perform long division using XOR at each step:\n  101110000\n÷      1001\n-----------",
          answer: "011",
          unit: "",
          tolerance: 0,
          calcType: "binary",
          hint: "XOR each step: 1011 XOR 1001 = 0010, bring down next bit, repeat. The 3-bit remainder after all bits processed is R.",
          explanation: "XOR long division of 101110000 by 1001:\n1. 1011 XOR 1001 = 0010, bring down 1 → 0101\n2. 0101 < 1001, quotient bit = 0, bring down 0 → 01010\n3. 1010 XOR 1001 = 0011, bring down 0 → 00110\n4. 0110 < 1001, bring down 0 → 01100 → too short\nFinal steps yield remainder R = 011.\nTransmitted frame: 101110 011",
          xpReward: 35
        },
        {
          id: "q-ch6-007",
          type: "mcq",
          question: "What is Forward Error Correction (FEC) and when is it preferred over retransmission?",
          options: [
            "FEC asks the sender to retransmit; preferred on high-bandwidth links",
            "FEC allows the receiver to correct errors without retransmission; preferred on high-latency links like satellite",
            "FEC is another name for CRC-32; used in all Ethernet frames",
            "FEC detects errors but cannot correct them; used in combination with ARQ"
          ],
          answer: 1,
          explanation: "FEC (Forward Error Correction) embeds enough redundancy that the receiver can reconstruct the original data without asking for a retransmission. It is preferred on satellite or deep-space links where the round-trip delay makes ARQ (Automatic Repeat Request) impractical — a retransmission would take seconds or longer.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — Multiple Access Protocols
    ───────────────────────────────────────────── */
    {
      id: "ch6-mac-protocols",
      title: "Multiple Access Protocols (ALOHA, CSMA/CD, CSMA/CA)",
      xpReward: 10,
      content: {
        summary: "A multiple access protocol determines how nodes share a single broadcast channel. Collisions occur when two or more nodes transmit simultaneously — their signals interfere and both frames are garbled. Multiple access protocols coordinate transmissions to avoid or recover from collisions. Three families: channel partitioning (TDMA/FDMA), random access (ALOHA, CSMA), and taking-turns (polling, token ring).",
        bullets: [
          "Broadcast channel: a single shared medium (e.g. coaxial cable segment, WiFi airspace) heard by all attached nodes",
          "Collision: two or more simultaneous transmissions — signals overlap and both are destroyed",
          "TDMA (Time Division Multiple Access): divide time into slots, each node gets dedicated slot — no collisions but idle slots waste bandwidth",
          "FDMA (Frequency Division Multiple Access): divide spectrum into bands, each node gets dedicated frequency — no collisions, same waste problem",
          "Pure ALOHA: transmit immediately when frame arrives; on collision, retransmit after random back-off. Max efficiency ≈ 18%",
          "Slotted ALOHA: time is slotted; nodes transmit only at slot boundaries. Max efficiency ≈ 37% (1/e)",
          "CSMA (Carrier Sense Multiple Access): listen before transmit — if channel busy, defer. Reduces but does not eliminate collisions (propagation delay means two nodes may both sense idle and start simultaneously)",
          "CSMA/CD (Collision Detection): after starting transmission, listen for collision; if detected, abort and send jam signal, then exponential back-off. Used by Ethernet (wired)",
          "CSMA/CA (Collision Avoidance): cannot detect collision while transmitting (on wireless); instead defer for random time before transmitting. Used by 802.11 WiFi",
          "Binary exponential back-off (Ethernet): after nth collision, wait K×512 bit-times where K is random in [0, 2^min(n,10)-1]"
        ],
        analogy: "Imagine a group conversation at a dinner table. TDMA is like an assigned speaking order. ALOHA is everyone blurting out whenever they want — chaos. CSMA is politely waiting for silence before speaking. CSMA/CD is like a wired conversation where you can hear yourself talk over someone and immediately stop. CSMA/CA is like raising your hand and waiting a random count before speaking, since in WiFi you can't tell if you're talking over someone.",
        visual: "sim-mac-protocols"
      },
      quiz: [
        {
          id: "q-ch6-008",
          type: "mcq",
          question: "What is the maximum theoretical efficiency of Slotted ALOHA?",
          options: ["18% (1/2e)", "37% (1/e)", "50%", "100% under light load"],
          answer: 1,
          explanation: "Slotted ALOHA achieves a maximum efficiency of 1/e ≈ 37% when there are many active nodes. Pure ALOHA is even lower at 1/(2e) ≈ 18%. The waste comes from idle slots and collisions. CSMA-based protocols achieve higher efficiency in practice by sensing the channel before transmitting.",
          xpReward: 25
        },
        {
          id: "q-ch6-009",
          type: "mcq",
          question: "Why does CSMA/CA (used in WiFi) use collision avoidance instead of CSMA/CD (collision detection)?",
          options: [
            "WiFi hardware cannot support the faster processing needed for collision detection",
            "Wireless nodes cannot hear their own transmission while transmitting, making collision detection impossible",
            "Collision avoidance is always more efficient than collision detection",
            "WiFi uses TDMA, not CSMA at all"
          ],
          answer: 1,
          explanation: "In wired Ethernet, a node can listen to the channel while transmitting and detect when its signal is garbled by a collision (CSMA/CD). Wireless nodes cannot do this — a transmitting WiFi card's own strong signal overwhelms any incoming signal, making it impossible to hear a simultaneous transmission from another node. CSMA/CA works around this by trying to avoid collisions in the first place through random back-off before transmitting.",
          xpReward: 25
        },
        {
          id: "q-ch6-010",
          type: "truefalse",
          question: "CSMA (Carrier Sense Multiple Access) completely eliminates collisions because nodes always listen before transmitting.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. CSMA reduces but does not eliminate collisions. Propagation delay is the culprit: if Node A starts transmitting and Node B checks the channel a moment later (before A's signal has propagated to B), B will sense the channel as idle and also start transmitting — causing a collision. The further apart two nodes are, the larger the collision window.",
          xpReward: 25
        },
        {
          id: "q-ch6-011",
          type: "mcq",
          question: "After the 3rd collision in Ethernet's binary exponential back-off, a node waits K × 512 bit-times. What is the range of K?",
          options: ["K ∈ {0, 1}", "K ∈ {0, 1, 2, 3, 4, 5, 6, 7}", "K ∈ {0, 1, 2, ..., 15}", "K ∈ {0, 1, 2}"],
          answer: 1,
          explanation: "After the nth collision, Ethernet chooses K randomly from {0, 1, 2, ..., 2^min(n,10) − 1}. After n=3 collisions, K ∈ {0, 1, 2, ..., 2³−1} = {0,...,7}. The range doubles with each collision (up to n=10), spreading nodes further apart in time to reduce the probability of repeated collisions.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — Ethernet & ARP
    ───────────────────────────────────────────── */
    {
      id: "ch6-ethernet-arp",
      title: "Ethernet & ARP",
      xpReward: 10,
      content: {
        summary: "Ethernet is the dominant wired LAN technology. It uses a 48-bit MAC address burned into every NIC, framing with preamble + destination MAC + source MAC + type + payload + CRC. ARP (Address Resolution Protocol) dynamically maps a known IP address to the corresponding MAC address on the same subnet — it is the glue between the network layer and the link layer.",
        bullets: [
          "Ethernet frame structure: 8-byte preamble | 6-byte dest MAC | 6-byte src MAC | 2-byte type | 0–1500 byte data | 4-byte CRC",
          "Preamble: 7 bytes of 10101010 + 1 byte 10101011 (SFD) — used to synchronize receiver clock",
          "MAC address (48-bit / 6-byte): written as XX:XX:XX:XX:XX:XX in hex; first 3 bytes = OUI (manufacturer); burned into NIC ROM",
          "Broadcast MAC: FF:FF:FF:FF:FF:FF — all nodes on the LAN receive and process the frame",
          "Type field: identifies the network-layer protocol (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP)",
          "Ethernet is connectionless and unreliable at the link layer — no handshaking, no ACKs",
          "ARP: given destination IP, find its MAC. Each host maintains an ARP table (IP → MAC mapping with TTL)",
          "ARP query: broadcast ARP request 'Who has IP X? Tell IP Y'. Host with IP X unicasts ARP reply with its MAC",
          "ARP is within-subnet only — cross-subnet frames go to the default gateway's MAC, not the final destination's MAC",
          "Gratuitous ARP: a node announces its own IP→MAC mapping proactively (used to detect IP conflicts, update caches)"
        ],
        analogy: "ARP is like shouting in a room 'Who here goes by the name 192.168.1.5?' and waiting for that person to raise their hand and tell you their seat number (MAC). Once you know the seat number, you hand your message directly to that seat without shouting again (until the ARP cache entry expires).",
        visual: "sim-arp"
      },
      quiz: [
        {
          id: "q-ch6-012",
          type: "mcq",
          question: "A host wants to send a datagram to a node in the same subnet but does not know its MAC address. What protocol does it use to resolve this?",
          options: ["DNS", "DHCP", "ARP", "ICMP"],
          answer: 2,
          explanation: "ARP (Address Resolution Protocol) resolves an IP address to a MAC address within the same subnet. The host broadcasts an ARP request asking who owns the target IP. The target responds with its MAC. DNS resolves names to IPs; DHCP assigns IPs; ICMP carries error messages.",
          xpReward: 25
        },
        {
          id: "q-ch6-013",
          type: "fillblank",
          question: "An Ethernet frame destined for all nodes on the LAN uses the broadcast MAC address ______:______:______:______:______:______.",
          answer: "FF:FF:FF:FF:FF:FF",
          explanation: "The Ethernet broadcast address is FF:FF:FF:FF:FF:FF (all 48 bits set to 1). Every NIC on the LAN accepts and processes a frame with this destination address. ARP requests use this broadcast address since the sender doesn't yet know which NIC owns the target IP.",
          xpReward: 25
        },
        {
          id: "q-ch6-014",
          type: "mcq",
          question: "Host A (IP: 10.0.0.1) wants to send a datagram to Host B (IP: 10.0.0.2) which is in the SAME subnet. What does Host A put in the Ethernet frame's destination MAC address field?",
          options: [
            "The MAC address of the default gateway router",
            "The MAC address of Host B, obtained via ARP",
            "FF:FF:FF:FF:FF:FF (broadcast)",
            "Host B's IP address converted to hex"
          ],
          answer: 1,
          explanation: "For same-subnet communication, Host A uses ARP to resolve Host B's IP (10.0.0.2) to Host B's MAC address, then places that MAC in the frame's destination field. If sending to a host in a DIFFERENT subnet, A would put the router (default gateway) MAC in the destination field instead — but the destination IP in the datagram still points to the final target.",
          xpReward: 25
        },
        {
          id: "q-ch6-015",
          type: "truefalse",
          question: "Ethernet provides reliable delivery: it retransmits frames if an error is detected by the CRC check.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Ethernet is connectionless and unreliable — it performs error detection (CRC) but not error correction or retransmission. If the CRC fails, the frame is simply dropped. Any reliability guarantee must come from higher layers (e.g. TCP at the transport layer).",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — Link-Layer Switches & VLANs
    ───────────────────────────────────────────── */
    {
      id: "ch6-switches-vlan",
      title: "Link-Layer Switches & VLANs",
      xpReward: 10,
      content: {
        summary: "A link-layer switch forwards Ethernet frames based on MAC addresses, interconnecting hosts within a LAN without the IP-level routing a router performs. Switches are self-learning: they build a switch table by observing source MAC addresses on incoming frames. VLANs (Virtual LANs) logically partition a single physical switch into multiple isolated broadcast domains without needing separate hardware.",
        bullets: [
          "Switch (Layer-2 switch): forwards frames based on destination MAC, not IP. Transparent to hosts — plug-and-play",
          "Switch table: maps MAC address → port → TTL. Built dynamically by observing source MACs on incoming frames (self-learning)",
          "Self-learning: when frame arrives on port X with source MAC Y, switch records (Y → port X) in the switch table",
          "Forwarding logic: if dest MAC in table → forward to that port only (unicast); if not in table → flood all ports except incoming",
          "Switches eliminate collisions: each link is a full-duplex point-to-point segment — no shared medium",
          "Switch vs Router: switch uses MAC addresses, operates at Layer 2, no TTL decrement, no IP needed; router uses IPs, operates at Layer 3",
          "VLAN (Virtual LAN): logically segments a physical switch into multiple broadcast domains using VLAN IDs (802.1Q tag)",
          "802.1Q tag: 4-byte tag inserted into Ethernet frame between source MAC and type field; contains 12-bit VLAN ID (up to 4094 VLANs)",
          "Inter-VLAN routing: traffic between VLANs must pass through a router (or Layer-3 switch); they are isolated at Layer 2",
          "Trunk port: carries frames from multiple VLANs between switches; uses 802.1Q tags to distinguish VLAN membership"
        ],
        analogy: "A switch is like a smart mail sorter in an office building who learns which mail slot belongs to which person by reading return addresses. After seeing a few messages, it can deliver directly to the right slot instead of pushing copies into every slot. VLANs are like putting up invisible walls inside the building so departments can't overhear each other's mail, even though they share the same physical room.",
        visual: "sim-switch-learning"
      },
      quiz: [
        {
          id: "q-ch6-016",
          type: "mcq",
          question: "A link-layer switch receives a frame with a destination MAC address it does not have in its switch table. What does it do?",
          options: [
            "Drops the frame and sends an ICMP error to the sender",
            "Forwards the frame to all ports except the one it arrived on (floods)",
            "Sends an ARP request to find the correct port",
            "Forwards the frame to the default gateway port"
          ],
          answer: 1,
          explanation: "When a switch does not know which port a destination MAC is on (no entry in the switch table), it floods the frame out every port except the one it arrived on. This ensures the frame reaches the intended host, who will respond — allowing the switch to learn its port mapping.",
          xpReward: 25
        },
        {
          id: "q-ch6-017",
          type: "truefalse",
          question: "A link-layer switch must be manually configured with its switch table by a network administrator.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Switches are self-learning and plug-and-play. They build their switch table automatically by examining the source MAC address of every incoming frame and recording which port it arrived on. No manual configuration of the switch table is required.",
          xpReward: 25
        },
        {
          id: "q-ch6-018",
          type: "mcq",
          question: "What is the primary purpose of a VLAN (Virtual LAN)?",
          options: [
            "To increase the physical cable length of a LAN segment",
            "To partition a single physical switch into multiple isolated broadcast domains",
            "To replace IP routing between subnets with MAC-based routing",
            "To encrypt traffic between hosts on the same switch"
          ],
          answer: 1,
          explanation: "VLANs logically partition a single physical switch into multiple independent broadcast domains. Broadcast frames are confined within each VLAN — they don't cross to other VLANs. This improves security (departments can't sniff each other's broadcasts), reduces broadcast traffic, and allows flexible grouping of hosts by function rather than physical location.",
          xpReward: 25
        },
        {
          id: "q-ch6-019",
          type: "mcq",
          question: "What is the key difference between a link-layer switch and a router?",
          options: [
            "Switches forward frames based on MAC addresses (Layer 2); routers forward datagrams based on IP addresses (Layer 3)",
            "Switches are faster than routers in every case",
            "Routers can connect hosts on the same subnet; switches cannot",
            "Switches use IP routing tables; routers use MAC switch tables"
          ],
          answer: 0,
          explanation: "The fundamental distinction: a switch operates at Layer 2 and makes forwarding decisions based on destination MAC addresses. A router operates at Layer 3 and makes forwarding decisions based on destination IP addresses, also decrementing the IP TTL and potentially running routing protocols. A switch is transparent to IP — it doesn't need to know anything about IP addresses.",
          xpReward: 25
        }
      ]
    }

  ]
};
