/**
 * data/chapter7-data.js
 * Chapter 7 topic content and quiz questions (Wireless and Mobile Networks).
 * Consumed by chapter7.html via <script src="data/chapter7-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.chapter7Data = {
  id: "chapter7",
  title: "Chapter 7: Wireless and Mobile Networks",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — Wireless Links & Network Characteristics
    ───────────────────────────────────────────── */
    {
      id: "ch7-wireless-intro",
      title: "Wireless Links & Network Characteristics",
      xpReward: 10,
      content: {
        summary: "Wireless links differ fundamentally from wired links: signals weaken with distance (path loss), bounce off objects (multipath propagation), and face interference from other radio sources. These physical realities make wireless links harder to manage than wired links — a higher bit error rate is expected and protocols must cope with it. Understanding these characteristics is essential before studying WiFi and cellular.",
        bullets: [
          "Path loss: signal strength decreases with distance squared (free space) or faster in cluttered environments",
          "Multipath propagation: radio waves reflect off buildings, ground, objects — multiple delayed copies of the signal arrive at receiver, causing intersymbol interference",
          "Interference: other wireless devices transmitting on the same or nearby frequency band (e.g. Bluetooth vs WiFi 2.4 GHz both use ISM band)",
          "SNR (Signal-to-Noise Ratio): higher SNR → fewer bit errors; can be increased by boosting transmit power or moving closer",
          "Higher SNR → can use higher-order modulation (more bits per symbol) → higher bit rate, but needs better SNR",
          "Hidden terminal problem: nodes A and C both in range of B but not each other — A and C cannot sense each other's transmission and collide at B",
          "Fading: signal strength fluctuates over time due to movement and changing multipath patterns",
          "Infrastructure mode: wireless hosts connect to a base station (access point or cell tower) which connects to the wired Internet",
          "Ad hoc mode: wireless hosts communicate directly with each other, no base station (e.g. Bluetooth devices)",
          "Handoff (handover): as a mobile host moves, it transitions from one base station to another"
        ],
        analogy: "Wireless communication is like shouting across a crowded party. The further away someone is, the harder they are to hear (path loss). Your voice bounces off walls creating echo (multipath). Other conversations interfere (interference). You might not hear someone starting to talk because a wall blocks them from you but not from the person you're both trying to reach (hidden terminal problem).",
        visual: "sim-wireless-characteristics"
      },
      quiz: [
        {
          id: "q-ch7-001",
          type: "mcq",
          question: "What is the 'hidden terminal problem' in wireless networks?",
          options: [
            "A mobile host moves out of range of all access points and cannot connect",
            "Two nodes cannot sense each other's transmissions but both reach a common receiver, causing collisions at that receiver",
            "A wireless signal is hidden by encryption so the receiver cannot decode it",
            "A node uses a hidden SSID so other devices cannot discover the network"
          ],
          answer: 1,
          explanation: "The hidden terminal problem: nodes A and C are both in range of base station B but out of range of each other. When A is transmitting to B, C cannot sense A's signal (A is 'hidden' from C), so C also starts transmitting — both signals collide at B. This problem can be addressed by RTS/CTS (Request-to-Send/Clear-to-Send) control frames in 802.11.",
          xpReward: 25
        },
        {
          id: "q-ch7-002",
          type: "truefalse",
          question: "Increasing the transmit power of a wireless node always increases the SNR at the receiver, making the link more reliable.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False — while increasing power generally improves SNR at the intended receiver, it also increases interference for OTHER nodes sharing the same frequency. In practice there are regulatory limits on transmit power, and simply 'cranking up the power' creates interference problems on shared spectrum. Better antenna design, beamforming, or moving closer are more targeted solutions.",
          xpReward: 25
        },
        {
          id: "q-ch7-003",
          type: "mcq",
          question: "In infrastructure mode wireless networking, what role does the Access Point (AP) play?",
          options: [
            "It routes IP datagrams between subnets using routing protocols like OSPF",
            "It connects wireless hosts to a wired network, acting as the base station for the BSS",
            "It encrypts all traffic between wireless hosts end-to-end",
            "It assigns IP addresses to wireless hosts using DHCP directly"
          ],
          answer: 1,
          explanation: "In infrastructure mode, the Access Point (AP) is the base station for a Basic Service Set (BSS). Wireless hosts associate with an AP, which connects them to the wired distribution system (typically an Ethernet LAN that leads to a router and the Internet). The AP operates at the link layer — it bridges the wireless 802.11 medium to the wired 802.3 Ethernet. A separate DHCP server (often in the router) assigns IPs.",
          xpReward: 25
        },
        {
          id: "q-ch7-004",
          type: "fillblank",
          question: "The process of a mobile host switching from one base station (AP or cell tower) to another as it moves is called a ______.",
          answer: "handoff",
          explanation: "A handoff (or handover) occurs when a mobile host moves from the coverage area of one base station to another. In cellular networks this must be managed carefully to avoid dropping ongoing calls or connections. The mobile host must re-associate or re-register with the new base station while maintaining any active sessions.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — 802.11 WiFi: Architecture & Channels
    ───────────────────────────────────────────── */
    {
      id: "ch7-wifi-arch",
      title: "802.11 WiFi: Architecture & Channels",
      xpReward: 10,
      content: {
        summary: "The IEEE 802.11 (WiFi) standard defines wireless LAN operation. Multiple versions exist (802.11a/b/g/n/ac/ax) differing in frequency band, modulation scheme, and peak data rate. All use the same CSMA/CA MAC protocol. A Basic Service Set (BSS) consists of one AP and the wireless stations associated with it. Stations discover and join a network by scanning for Beacon frames containing the SSID.",
        bullets: [
          "BSS (Basic Service Set): one AP + associated wireless hosts. Also called a 'cell'",
          "SSID (Service Set Identifier): the network name (e.g. 'HomeWifi') broadcast in AP Beacon frames every ~100ms",
          "BSSID: the AP's MAC address, uniquely identifies the BSS",
          "Passive scanning: host listens for Beacon frames from nearby APs, picks one to associate with",
          "Active scanning: host broadcasts Probe Request frame; APs reply with Probe Response",
          "Association: host sends Association Request to chosen AP; AP replies with Association Response and assigns Association ID (AID)",
          "802.11b: 2.4 GHz, up to 11 Mbps (older, crowded band shared with Bluetooth, microwaves)",
          "802.11g/n: 2.4 GHz + 5 GHz, up to 54 Mbps / 600 Mbps respectively",
          "802.11ac (WiFi 5): 5 GHz only, up to several Gbps with MU-MIMO",
          "802.11ax (WiFi 6): 2.4+5+6 GHz, OFDMA for multi-user efficiency; designed for dense environments",
          "Channels: 2.4 GHz band has 11 overlapping channels in US; only 3 non-overlapping (1, 6, 11)"
        ],
        analogy: "Associating with a WiFi AP is like tuning a radio to a specific station. You scan the dial (passive/active scanning) to see what stations are broadcasting (Beacon frames with SSID), pick the one with the strongest/preferred signal, and tune in (association). You are now on that station's channel and can communicate through it.",
        visual: "sim-wifi-association"
      },
      quiz: [
        {
          id: "q-ch7-005",
          type: "mcq",
          question: "What information does an 802.11 AP broadcast in Beacon frames?",
          options: [
            "A list of all currently connected client MAC addresses",
            "The SSID (network name) and BSSID (AP's MAC address), among other parameters",
            "The IP addresses available for DHCP assignment",
            "The AP's routing table for forwarding datagrams"
          ],
          answer: 1,
          explanation: "Beacon frames are broadcast by APs every ~100ms and contain the SSID (network name), BSSID (AP's MAC address), supported data rates, channel number, and security capabilities. Hosts use this information to discover and evaluate available networks before choosing one to associate with. DHCP assignment happens after association.",
          xpReward: 25
        },
        {
          id: "q-ch7-006",
          type: "mcq",
          question: "In the 2.4 GHz band, which set of 802.11 channels are non-overlapping (in the US)?",
          options: [
            "Channels 1, 2, and 3",
            "Channels 1, 6, and 11",
            "Channels 1, 7, and 13",
            "All 11 channels are non-overlapping"
          ],
          answer: 1,
          explanation: "In the 2.4 GHz band, 802.11 defines 11 channels in the US but they are each 22 MHz wide and spaced only 5 MHz apart, so they heavily overlap. Only channels 1, 6, and 11 are sufficiently separated (25 MHz apart) to be non-overlapping. Adjacent APs should use these three channels to minimize interference between them.",
          xpReward: 25
        },
        {
          id: "q-ch7-007",
          type: "truefalse",
          question: "After a wireless host passively discovers an AP through Beacon frames, it can immediately send data frames without any further association step.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. After discovering an AP, a host must complete the association process: it sends an Association Request frame, the AP responds with an Association Response (assigning an Association ID), and only then is the host a member of the BSS and able to exchange data frames through that AP. Authentication may also occur before association if the network is secured (WPA2/WPA3).",
          xpReward: 25
        },
        {
          id: "q-ch7-008",
          type: "fillblank",
          question: "The 802.11ax standard, also marketed as WiFi ______, introduces OFDMA for better multi-user efficiency in dense environments.",
          answer: "6",
          explanation: "802.11ax is marketed as WiFi 6 (and the extended version as WiFi 6E, adding the 6 GHz band). It introduces OFDMA (Orthogonal Frequency Division Multiple Access) which divides each channel into sub-channels called Resource Units, allowing the AP to serve multiple clients simultaneously within a single transmission opportunity — a major improvement for crowded environments like stadiums or apartment buildings.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — 802.11 MAC: CSMA/CA & RTS/CTS
    ───────────────────────────────────────────── */
    {
      id: "ch7-wifi-mac",
      title: "802.11 MAC: CSMA/CA & RTS/CTS",
      xpReward: 10,
      content: {
        summary: "802.11 uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). Unlike Ethernet's CSMA/CD, WiFi stations cannot detect collisions while transmitting. Instead, they try to avoid collisions through random back-off timers before transmitting, and use explicit ACKs for every frame. The optional RTS/CTS (Request-to-Send / Clear-to-Send) mechanism addresses the hidden terminal problem.",
        bullets: [
          "DIFS (Distributed Inter-Frame Space): if channel idle, sender waits DIFS before transmitting",
          "Random back-off: if channel is busy when node wants to send, it picks random back-off interval; only counts down when channel is idle",
          "After successful frame+ACK: if more to send, wait DIFS again plus new random back-off",
          "SIFS (Short Inter-Frame Space): shorter gap; used before ACKs, CTS, and data frames in RTS/CTS exchange — allows reply without contention",
          "ACK: receiver sends ACK after SIFS; if sender doesn't receive ACK → collision assumed → retransmit with larger back-off window (binary exponential back-off)",
          "Why ACKs? Wireless links have high bit error rate — ACK confirms frame arrived without corruption",
          "RTS (Request-to-Send): sender first sends short RTS frame to AP stating how long it will use the channel",
          "CTS (Clear-to-Send): AP broadcasts CTS after SIFS; all nodes in AP's range see CTS and defer for the stated duration (NAV — Network Allocation Vector)",
          "RTS/CTS solves hidden terminal: even if C cannot hear A's RTS, C will hear AP's CTS and defer",
          "RTS/CTS overhead is worthwhile for large frames only; for short frames, the overhead outweighs the benefit"
        ],
        analogy: "CSMA/CA is polite turn-taking: wait for silence, then wait a little more (DIFS) to be sure, then wait a random extra time (back-off) so not everyone rushes at once. RTS/CTS is like raising your hand and waiting for the teacher to say 'okay go ahead' — the teacher's reply is heard by everyone so they all know to stay quiet while you speak.",
        visual: "sim-csma-ca"
      },
      quiz: [
        {
          id: "q-ch7-009",
          type: "mcq",
          question: "In 802.11 CSMA/CA, why does the sender wait a DIFS period even when the channel appears idle?",
          options: [
            "To allow the AP time to update its switch table before receiving the frame",
            "To ensure the channel is truly idle after any recent transmission completes and to add spacing between frames",
            "DIFS is not used when the channel is idle — only during back-off",
            "DIFS gives higher-priority traffic time to preempt the channel"
          ],
          answer: 1,
          explanation: "DIFS (Distributed Inter-Frame Space) is a mandatory idle-channel wait period before transmitting a data frame. It ensures any other transmission has fully completed and there is a gap between frames to allow the channel to settle. It also creates a priority system — higher-priority frames (like ACKs and CTS) use the shorter SIFS wait, so they can 'cut in' before new data frames during the DIFS window.",
          xpReward: 25
        },
        {
          id: "q-ch7-010",
          type: "truefalse",
          question: "In 802.11, link-layer ACKs are sent for every successfully received data frame.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Unlike Ethernet which provides no link-layer acknowledgment, 802.11 uses explicit ACK frames for every data frame. The receiver sends an ACK after SIFS. If the sender does not receive an ACK within the timeout, it assumes the frame was lost (due to collision or bit error) and retransmits with an expanded back-off window.",
          xpReward: 25
        },
        {
          id: "q-ch7-011",
          type: "mcq",
          question: "How does RTS/CTS solve the hidden terminal problem?",
          options: [
            "RTS frames are transmitted at double power so all nodes can hear them regardless of position",
            "The AP's CTS is heard by all nodes in the AP's range, telling them all to defer — even those that couldn't hear the original RTS sender",
            "Hidden terminals are assigned a separate frequency channel so they don't interfere",
            "The RTS frame travels around obstacles using multi-hop relay"
          ],
          answer: 1,
          explanation: "The key insight: the AP broadcasts the CTS frame, and the AP is in range of ALL nodes in the BSS. So even node C which cannot hear node A's RTS can still hear the AP's CTS response. The CTS includes a duration field (NAV), telling all listeners to defer for that period. This effectively reserves the channel against interference from any node in the BSS, including hidden terminals.",
          xpReward: 25
        },
        {
          id: "q-ch7-012",
          type: "mcq",
          question: "Under what condition is RTS/CTS overhead justified in 802.11?",
          options: [
            "Always — RTS/CTS should be used for all frames to maximize reliability",
            "Never — CSMA/CA alone is sufficient and RTS/CTS is deprecated in modern WiFi",
            "For large frames where the overhead of RTS/CTS is small compared to the benefit of avoiding collision",
            "Only when transmitting to nodes that are hidden terminals, which the AP knows in advance"
          ],
          answer: 2,
          explanation: "RTS/CTS involves extra frame exchanges (RTS + CTS + SIFS delays) before every data transmission. For small frames, this overhead can exceed the actual data transmission time, reducing efficiency. For large frames (e.g. maximum-length 2304-byte 802.11 data frames), the collision avoidance benefit outweighs the overhead. Most implementations set an RTS threshold (e.g. 2347 bytes) — RTS/CTS is only used for frames above this size.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — Cellular Networks: 4G LTE & 5G
    ───────────────────────────────────────────── */
    {
      id: "ch7-cellular",
      title: "Cellular Networks: 4G LTE & 5G",
      xpReward: 10,
      content: {
        summary: "Cellular networks provide wireless Internet access to mobile devices across wide geographic areas. The coverage area is divided into cells, each served by a base station (eNodeB in LTE, gNodeB in 5G). The cellular core network (EPC in 4G, 5GC in 5G) connects base stations to the Internet and manages mobility, authentication, and billing. 4G LTE uses OFDM and can deliver 10s–100s Mbps; 5G extends this with mmWave, massive MIMO, and network slicing.",
        bullets: [
          "Cell: geographic coverage area served by one base station. Cells overlap slightly for seamless handoff",
          "eNodeB (4G) / gNodeB (5G): the radio base station; connects UE (User Equipment) over the air and to the core network via backhaul",
          "Frequency reuse: same frequency channels reused in non-adjacent cells to avoid co-channel interference",
          "4G LTE air interface: uses OFDM (Orthogonal Frequency Division Multiplexing) downlink and SC-FDMA uplink",
          "EPC (Evolved Packet Core) — 4G core network components:",
          "  • MME (Mobility Management Entity): authentication, handoff management, paging",
          "  • S-GW (Serving Gateway): routes data packets between eNodeB and P-GW",
          "  • P-GW (PDN Gateway): connects to the Internet; assigns IP to UE; NAT/firewall",
          "  • HSS (Home Subscriber Server): subscriber database (IMSI, SIM keys, service profile)",
          "LTE data path: UE ↔ eNodeB ↔ S-GW ↔ P-GW ↔ Internet",
          "5G NR (New Radio): sub-6GHz for coverage + mmWave (24–100 GHz) for massive throughput in dense areas",
          "5G improvements over 4G: higher peak rates (20 Gbps), lower latency (1ms target), massive MIMO, network slicing (virtual private networks per service type)",
          "Network slicing: logically partition the 5G network into isolated virtual networks for different use cases (eMBB, URLLC, mMTC)"
        ],
        analogy: "Think of cellular coverage like a country divided into hexagonal counties (cells), each with its own local government (base station). You carry a universal ID card (SIM). When you cross into a new county (handoff), your new local government contacts the national identity database (HSS) to verify who you are, and your calls/data are now routed through the new county's infrastructure. The 5G upgrade is like adding high-speed train stations (mmWave small cells) in cities on top of the existing road network.",
        visual: "sim-cellular-architecture"
      },
      quiz: [
        {
          id: "q-ch7-013",
          type: "mcq",
          question: "In a 4G LTE network, which core network component is responsible for assigning an IP address to a mobile device (UE) when it connects?",
          options: [
            "MME (Mobility Management Entity)",
            "eNodeB (base station)",
            "P-GW (Packet Data Network Gateway)",
            "HSS (Home Subscriber Server)"
          ],
          answer: 2,
          explanation: "The P-GW (PDN Gateway) is the UE's connection point to the external packet data network (Internet). It assigns an IP address to the UE using DHCP or a similar mechanism, enforces QoS policies, and performs NAT/firewall functions. The MME handles control-plane signaling (authentication, handoff); the HSS stores subscriber profiles; the eNodeB is the radio access point.",
          xpReward: 25
        },
        {
          id: "q-ch7-014",
          type: "truefalse",
          question: "5G networks use only millimeter wave (mmWave) frequencies to achieve their high data rates.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. 5G uses a combination of frequency bands: sub-6 GHz bands provide broad coverage (similar range to 4G) and are the backbone of initial 5G deployments; mmWave frequencies (24–100 GHz) provide extremely high throughput but have very limited range (tens to hundreds of meters) and cannot penetrate walls. Deployments use both: sub-6 GHz for coverage, mmWave for high-capacity hotspots.",
          xpReward: 25
        },
        {
          id: "q-ch7-015",
          type: "mcq",
          question: "What is 'network slicing' in 5G?",
          options: [
            "Physically cutting a fiber cable into multiple segments for different customers",
            "Creating logically isolated virtual networks on shared 5G infrastructure to meet different service requirements",
            "Dividing the frequency spectrum into slices assigned to each connected device",
            "Splitting packet data across multiple base stations simultaneously for higher throughput"
          ],
          answer: 1,
          explanation: "Network slicing allows a single physical 5G infrastructure to be partitioned into multiple isolated virtual networks (slices), each tailored to a specific service type. For example: eMBB (enhanced Mobile Broadband) slice for video streaming, URLLC (Ultra-Reliable Low-Latency) slice for autonomous vehicles or remote surgery, and mMTC (massive Machine-Type Communications) slice for IoT sensor networks — each with different QoS guarantees.",
          xpReward: 25
        },
        {
          id: "q-ch7-016",
          type: "mcq",
          question: "What is the role of the MME (Mobility Management Entity) in a 4G LTE network?",
          options: [
            "It routes user data packets between base stations and the Internet",
            "It handles control-plane functions: authentication, handoff coordination, and paging",
            "It stores subscriber SIM keys and service profiles",
            "It assigns IP addresses and performs NAT for mobile devices"
          ],
          answer: 1,
          explanation: "The MME is the control-plane hub of the 4G EPC. It authenticates the UE (using credentials from the HSS), manages handoff signaling when the UE moves between eNodeBs, pages idle devices when incoming data arrives, and establishes bearer paths for data. It does NOT carry user data — that flows through the S-GW and P-GW (the data plane).",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — Mobility Management
    ───────────────────────────────────────────── */
    {
      id: "ch7-mobility",
      title: "Mobility Management: Handoff & Mobile IP",
      xpReward: 10,
      content: {
        summary: "Mobility management solves two challenges: how to locate a mobile host (routing datagrams to wherever it currently is) and how to maintain ongoing connections as the host moves between networks. Mobile IP provides a network-layer solution that allows a device to keep its home IP address while roaming. The home agent intercepts packets for the mobile and tunnels them to the mobile's current location (care-of address).",
        bullets: [
          "Challenge 1: Location — how does the network find a mobile host if its IP changes as it roams?",
          "Challenge 2: Handoff — how do ongoing flows (TCP connections) survive as the host moves to a new base station?",
          "Mobile IP approach: mobile keeps permanent home address; home agent on home network intercepts and redirects",
          "Care-of address (CoA): temporary address at the visited network; assigned via DHCP when mobile attaches to a foreign network",
          "Registration: mobile sends CoA to home agent; home agent updates its mobility binding table (home addr → CoA)",
          "Triangle routing: correspondent → home agent (intercept) → tunnel to CoA → mobile. Return path can be direct",
          "Route optimization: mobile can inform correspondent directly of CoA; correspondent tunnels directly (avoids triangle)",
          "4G LTE handoff procedure (same MME): 1) source eNodeB signals target eNodeB, 2) resources allocated at target, 3) data forwarded from source to target, 4) UE switches and sends RRC Reconfiguration Complete, 5) path updated at S-GW",
          "Soft handoff vs hard handoff: CDMA systems allow soft handoff (connected to multiple base stations simultaneously); GSM/LTE use hard handoff (one base station at a time)",
          "DNS and anycast: used by CDNs to route users to closest server — a different approach to managing 'mobility' of content"
        ],
        analogy: "Mobile IP is like having a permanent home address but traveling frequently. Your home post office (home agent) catches all your mail. When you check into a hotel (visited network), you send the post office your room number (care-of address). They then forward your mail to wherever you are. Triangle routing is the inefficiency: a letter from a friend across town still goes to your hometown first, then gets forwarded to your hotel.",
        visual: "sim-mobile-ip"
      },
      quiz: [
        {
          id: "q-ch7-017",
          type: "mcq",
          question: "In Mobile IP, what is a 'care-of address' (CoA)?",
          options: [
            "The mobile host's permanent home IP address that never changes",
            "The IP address of the home agent on the mobile's home network",
            "A temporary IP address assigned to the mobile at its current visited network",
            "The MAC address of the base station the mobile is currently associated with"
          ],
          answer: 2,
          explanation: "The care-of address (CoA) is the temporary IP address the mobile node obtains when it attaches to a visited (foreign) network — typically via DHCP. The mobile registers this CoA with its home agent. The home agent then tunnels (encapsulates) incoming datagrams addressed to the mobile's permanent home address and forwards them to the CoA, so the mobile can receive them at its current location.",
          xpReward: 25
        },
        {
          id: "q-ch7-018",
          type: "truefalse",
          question: "In Mobile IP triangle routing, a correspondent host communicates directly with the mobile's current care-of address, bypassing the home agent.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False — that describes route optimization, not triangle routing. In basic Mobile IP triangle routing, the correspondent sends datagrams to the mobile's permanent home address. The home agent intercepts them and tunnels them to the CoA. This is 'triangle' routing because traffic goes correspondent → home agent → mobile, even if the mobile is physically close to the correspondent. Route optimization lets the correspondent tunnel directly to the CoA.",
          xpReward: 25
        },
        {
          id: "q-ch7-019",
          type: "mcq",
          question: "During a 4G LTE handoff, what mechanism ensures that in-flight data packets are not lost during the transition from the source to the target eNodeB?",
          options: [
            "The UE re-sends all recent packets to the new base station after completing handoff",
            "The source eNodeB forwards buffered packets to the target eNodeB via an X2 interface during the handoff",
            "The P-GW holds all packets in a buffer until the handoff completes",
            "TCP retransmission at the transport layer recovers any lost packets"
          ],
          answer: 1,
          explanation: "In LTE handoff, the source eNodeB continues to forward buffered/in-flight data packets directly to the target eNodeB over the X2 interface (a direct link between adjacent base stations) during the brief switchover period. This prevents packet loss. The data path is later switched at the S-GW to go directly to the target eNodeB, at which point the X2 forwarding stops.",
          xpReward: 25
        },
        {
          id: "q-ch7-020",
          type: "mcq",
          question: "What is the fundamental limitation of Mobile IP 'triangle routing' that route optimization addresses?",
          options: [
            "Triangle routing requires the mobile to update its IP address on every move, breaking TCP connections",
            "Traffic always traverses the home network even when mobile and correspondent are geographically close, wasting bandwidth and adding latency",
            "The home agent becomes a single point of failure for all communications to the mobile",
            "Triangle routing only works for UDP traffic; TCP connections cannot use it"
          ],
          answer: 1,
          explanation: "Triangle routing is inefficient because all traffic from any correspondent must first travel to the mobile's home network (home agent), then be tunneled to wherever the mobile currently is — even if the mobile is physically very close to the correspondent. This wastes bandwidth on the home network link and adds unnecessary latency. Route optimization solves this by allowing the home agent to inform the correspondent of the CoA so they can tunnel directly.",
          xpReward: 25
        }
      ]
    }

  ]
};
