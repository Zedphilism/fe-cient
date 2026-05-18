/**
 * data/chapter5-data.js
 * Chapter 5 topic content and quiz questions (Network Layer — Control Plane).
 * Consumed by chapter5.html via <script src="data/chapter5-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.chapter5Data = {
  id: "chapter5",
  title: "Chapter 5: Network Layer — Control Plane",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — Link-State Routing & Dijkstra's Algorithm
    ───────────────────────────────────────────── */
    {
      id: "ch5-link-state",
      title: "Link-State Routing & Dijkstra's Algorithm",
      xpReward: 10,
      content: {
        summary: "Link-state routing gives every router a complete, identical map of the entire network topology. Each router floods the network with Link-State Advertisements (LSAs) describing its directly connected links. Once all routers hold the same link-state database, each independently runs Dijkstra's shortest-path algorithm to compute the least-cost path to every destination and builds its forwarding table from the result.",
        bullets: [
          "Each router floods the network with LSAs (Link-State Advertisements) describing its links and costs",
          "All routers end up with identical complete topology map — the link-state database",
          "Each router independently runs Dijkstra's shortest-path algorithm on that database",
          "Dijkstra: iteratively settle the unsettled node with minimum known distance, then update its neighbors",
          "Complexity: O(n²) with basic implementation, O(E log n) with a priority queue (binary heap)",
          "The forwarding table is derived directly from the resulting shortest-path tree",
          "OSPF (Open Shortest Path First) uses link-state routing for intra-AS routing",
          "Oscillation problem: if link costs reflect current traffic load, all routers may simultaneously reroute, causing traffic to swing back and forth"
        ],
        analogy: "Imagine every intersection in a city posts a sign listing its road connections and current travel times. Copies of every sign reach every other intersection. Each intersection then runs its own GPS calculation from scratch. That is link-state routing — full information, independent computation.",
        visual: "sim-dijkstra"
      },
      quiz: [
        {
          id: "q-ch5-001",
          type: "mcq",
          question: "In link-state routing, how does each router obtain knowledge of the complete network topology?",
          options: [
            "It contacts a central server that maintains the global topology",
            "Each router floods the network with LSAs describing its own directly connected links",
            "Each router exchanges distance vectors with its immediate neighbors only",
            "The ISP pre-configures each router with a static topology table"
          ],
          answer: 1,
          explanation: "In link-state routing every router broadcasts (floods) Link-State Advertisements across the entire network. Because every router receives every other router's LSA, all routers end up with an identical, complete link-state database from which they each run Dijkstra independently.",
          xpReward: 25
        },
        {
          id: "q-ch5-002",
          type: "truefalse",
          question: "In link-state routing, different routers may compute different shortest-path trees because each router uses a slightly different version of the topology database.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. A key property of link-state routing is that flooding ensures all routers hold an identical link-state database. Because every router runs the same algorithm on the same input, they all compute identical shortest-path trees (and therefore consistent forwarding tables).",
          xpReward: 25
        },
        {
          id: "q-ch5-calc-001",
          type: "calc",
          question: "Using Dijkstra's algorithm starting from node u, what is the minimum cost path to node z? Enter the total path cost as an integer.",
          setup: "Network edges and costs:\nu-v: 2    u-x: 1\nv-w: 3    v-x: 2\nx-y: 3    x-w: 5\nw-z: 5    y-w: 1\ny-z: 2\n\nRun Dijkstra from u. Find min-cost path u → z.",
          answer: "6",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "Try paths: u→x→y→z or u→x→y→w→z etc. Track costs step by step.",
          explanation: "Dijkstra from u:\n1. Settle u(0). Neighbors: v(2), x(1).\n2. Settle x(1). Update: y=1+3=4, w=1+5=6, v=min(2,1+2)=2 (no change).\n3. Settle v(2). Update: w=min(6,2+3)=5.\n4. Settle y(4). Update: w=min(5,4+1)=5, z=4+2=6.\n5. Settle w(5). Update: z=min(6,5+5)=6 (no change).\n6. Settle z(6).\nPath: u→x→y→z, cost = 1+3+2 = 6.",
          xpReward: 35
        },
        {
          id: "q-ch5-calc-002",
          type: "calc",
          question: "In the network above, after Dijkstra settles nodes u and x, what is the current known distance to node y?",
          setup: "Network edges and costs:\nu-v: 2    u-x: 1\nv-w: 3    v-x: 2\nx-y: 3    x-w: 5\n\nAfter settling u(cost=0) and x(cost=1):\nFrom x, update all x's neighbors.",
          answer: "4",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "Distance to y via u→x = cost(u→x) + cost(x→y) = 1 + 3",
          explanation: "After settling u(0): tentative distances v=2, x=1. After settling x(1): update x's neighbors: y = 1+3 = 4, w = 1+5 = 6, v = min(2, 1+2) = 2 (no improvement). Distance to y = 4.",
          xpReward: 35
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Distance-Vector Routing & Bellman-Ford
    ───────────────────────────────────────────── */
    {
      id: "ch5-distance-vector",
      title: "Distance-Vector Routing & Bellman-Ford",
      xpReward: 10,
      content: {
        summary: "Distance-vector (DV) routing is a distributed, iterative algorithm. Each router knows only the costs to its immediate neighbors and the distance vectors reported by those neighbors. Using the Bellman-Ford equation, each router computes its own minimum-cost estimate to every destination. Routers exchange updated vectors asynchronously until the algorithm converges — but bad news (link failures, cost increases) can travel very slowly, leading to the count-to-infinity problem.",
        bullets: [
          "DV routing: each router maintains a distance vector — its best current estimate of cost to every destination",
          "Bellman-Ford equation: d_x(y) = min_v { c(x,v) + d_v(y) } — minimum over all neighbors v",
          "Iterative and asynchronous: each node updates when it receives a new DV from any neighbor",
          "Self-terminating: the algorithm converges when no node's distance vector changes",
          "Good news travels fast: a decrease in link cost propagates to the whole network quickly",
          "BAD NEWS TRAVELS SLOWLY — count-to-infinity problem: when a link cost increases or breaks, nodes can count up in small increments through routing loops",
          "Poisoned reverse: if x routes to z via y, x advertises d_x(z) = ∞ back to y — prevents two-node loops but not three-node loops",
          "RIP (Routing Information Protocol) uses DV routing; BGP uses a related path-vector approach"
        ],
        analogy: "Imagine asking friends for directions. Each friend knows how long it takes to reach nearby spots, and they relay what they've heard from their own friends. The network converges as everyone updates their estimates. But if a road suddenly closes, it can take many rounds of updates before everyone stops claiming they can still reach the destination quickly.",
        visual: "sim-bellman-ford"
      },
      quiz: [
        {
          id: "q-ch5-003",
          type: "mcq",
          question: "The Bellman-Ford equation used in distance-vector routing is: d_x(y) = min_v { c(x,v) + d_v(y) }. What does each term represent?",
          options: [
            "c(x,v) is the flooding cost; d_v(y) is the link-state advertisement delay",
            "c(x,v) is the direct link cost from x to neighbor v; d_v(y) is v's current best distance estimate to destination y",
            "c(x,v) is the congestion window; d_v(y) is the RTT from v to y",
            "c(x,v) is the AS path length; d_v(y) is the BGP policy weight"
          ],
          answer: 1,
          explanation: "c(x,v) is the known direct cost of the link from router x to its neighbor v. d_v(y) is the distance estimate that neighbor v has reported for reaching destination y. The Bellman-Ford equation says: try every neighbor as the first hop and pick the one that gives the lowest total cost.",
          xpReward: 25
        },
        {
          id: "q-ch5-004",
          type: "truefalse",
          question: "Poisoned reverse completely solves the count-to-infinity problem in distance-vector routing, including loops involving three or more nodes.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Poisoned reverse eliminates two-node routing loops by having a router advertise infinite distance back toward its next-hop for a given destination. However, it does not prevent count-to-infinity loops that involve three or more nodes, which still require the full infinite count (or a maximum-hop limit) to resolve.",
          xpReward: 25
        },
        {
          id: "q-ch5-calc-003",
          type: "calc",
          question: "Node x has neighbors y (cost 1) and z (cost 5). y reports d_y(w) = 2 and z reports d_z(w) = 1. Using Bellman-Ford, what is x's new distance estimate to w, d_x(w)?",
          setup: "d_x(y) = c(x,y) = 1   (direct link x→y)\nd_x(z) = c(x,z) = 5   (direct link x→z)\n\nd_y(w) = 2  (y reports)\nd_z(w) = 1  (z reports)\n\nBellman-Ford: d_x(w) = min { c(x,v) + d_v(w) } for all neighbors v",
          answer: "3",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "Compute via y: 1+2=3. Compute via z: 5+1=6. Take the minimum.",
          explanation: "Via y: c(x,y) + d_y(w) = 1 + 2 = 3.\nVia z: c(x,z) + d_z(w) = 5 + 1 = 6.\nd_x(w) = min{3, 6} = 3.",
          xpReward: 35
        },
        {
          id: "q-ch5-calc-004",
          type: "calc",
          question: "Initially d_y(x) = 4 and d_z(x) = 5, with c(y,z) = 1. The direct link from y to x breaks (cost becomes ∞). y then updates using z. What does y's new (incorrect) estimate of d_y(x) become?",
          setup: "Before link break:\n  d_y(x) = 4 (via direct link, cost 4)\n  d_z(x) = 5 (z reported)\n  c(y,z) = 1\n\nDirect y-x link breaks → c(y,x) = ∞\ny recalculates: d_y(x) = min over neighbors",
          answer: "6",
          unit: "",
          tolerance: 0,
          calcType: "numeric",
          hint: "y's only remaining neighbor is z. d_y(x) = c(y,z) + d_z(x) = 1 + 5",
          explanation: "When the y-x link breaks, y can only route via z. y computes: d_y(x) = c(y,z) + d_z(x) = 1 + 5 = 6. But d_z(x) = 5 was computed via y (d_z(x) = c(z,y) + d_y(x) = 1 + 4 = 5). Since y-x is now broken, this 5 is invalid — the true distance is ∞. This creates the count-to-infinity loop.",
          xpReward: 35
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — OSPF & BGP
    ───────────────────────────────────────────── */
    {
      id: "ch5-ospf-bgp",
      title: "OSPF & BGP",
      xpReward: 10,
      content: {
        summary: "The Internet is divided into Autonomous Systems (ASes) — independently administered networks. Intra-AS routing uses protocols like OSPF to find efficient paths within a single organization's network. Inter-AS routing uses BGP, the single routing protocol that connects all ASes and keeps the global Internet working. OSPF optimizes for cost; BGP routes according to policy and business relationships.",
        bullets: [
          "OSPF (Open Shortest Path First): intra-AS routing protocol, used within a single autonomous system",
          "OSPF uses link-state flooding and Dijkstra's algorithm at every router",
          "OSPF messages are carried directly over IP (protocol number 89) — not encapsulated in TCP or UDP",
          "OSPF features: all messages authenticated, multiple equal-cost paths supported, hierarchical areas",
          "OSPF area: routers within an area share full topology; only summary info crosses area boundaries",
          "Backbone area (Area 0) interconnects all other OSPF areas within an AS",
          "BGP (Border Gateway Protocol): THE inter-AS routing protocol — 'the glue that holds the Internet together'",
          "BGP is a path-vector protocol: it advertises complete AS-level paths to destinations, not just distances",
          "Two BGP session types: eBGP (between routers in different ASes) and iBGP (between routers within the same AS)",
          "Key BGP attributes: AS-PATH (list of AS numbers traversed) and NEXT-HOP (border router to use as first hop)",
          "BGP is policy-driven: ISPs can prefer or filter routes based on business agreements, not just shortest path",
          "BGP hot potato routing: a router sends traffic out of its own AS as early as possible (least-cost intra-AS path to exit point)"
        ],
        analogy: "OSPF is like the GPS inside a delivery company's warehouse — optimizing routes within the building. BGP is the global shipping network connecting warehouses in different countries. A package (IP datagram) uses BGP to choose which country border to cross, then OSPF to navigate inside each facility.",
        visual: "sim-bgp"
      },
      quiz: [
        {
          id: "q-ch5-005",
          type: "mcq",
          question: "Which transport protocol does OSPF use to carry its routing messages?",
          options: [
            "TCP (for reliability)",
            "UDP (for low overhead)",
            "OSPF messages are carried directly in IP datagrams — no TCP or UDP",
            "OSPF uses its own dedicated link-layer frame type"
          ],
          answer: 2,
          explanation: "OSPF messages are encapsulated directly in IP datagrams with IP protocol number 89. OSPF implements its own reliability mechanisms (acknowledgements and retransmissions) rather than relying on TCP, which keeps overhead low and allows faster convergence.",
          xpReward: 25
        },
        {
          id: "q-ch5-006",
          type: "mcq",
          question: "What is 'hot potato routing' in BGP?",
          options: [
            "Sending traffic along the path with the fewest AS hops regardless of internal cost",
            "Routing traffic out of the local AS as quickly as possible via the nearest exit point",
            "Choosing the BGP path with the highest MED (Multi-Exit Discriminator) value",
            "Flooding route advertisements to all neighbors as fast as possible to speed convergence"
          ],
          answer: 1,
          explanation: "Hot potato routing means a router chooses the exit point from its own AS that minimises intra-AS cost, essentially 'getting rid of' the packet (hot potato) as quickly as possible. It may not produce the globally optimal end-to-end path, but it reduces the load a router's AS must carry.",
          xpReward: 25
        },
        {
          id: "q-ch5-007",
          type: "truefalse",
          question: "iBGP sessions are established between routers in different autonomous systems, while eBGP sessions run between routers within the same AS.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. It is the other way around. eBGP (external BGP) runs between border routers in different ASes to exchange reachability information across AS boundaries. iBGP (internal BGP) runs between routers inside the same AS to distribute BGP-learned routes throughout that AS.",
          xpReward: 25
        },
        {
          id: "q-ch5-008",
          type: "match",
          question: "Match each routing concept to its correct description.",
          pairs: [
            { term: "OSPF",             definition: "Intra-AS link-state routing protocol" },
            { term: "BGP",              definition: "Inter-AS path-vector routing protocol" },
            { term: "AS-PATH",          definition: "BGP attribute listing the sequence of ASes to destination" },
            { term: "Hot potato routing", definition: "Route to next AS at the closest egress point" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "OSPF operates within a single AS using link-state and Dijkstra. BGP operates between ASes using path vectors and policy. AS-PATH is the key BGP attribute used to detect loops and implement policy. Hot potato routing minimises the distance a packet travels inside its home AS before being handed off.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — SDN Control Plane
    ───────────────────────────────────────────── */
    {
      id: "ch5-sdn",
      title: "SDN Control Plane",
      xpReward: 10,
      content: {
        summary: "Software-Defined Networking (SDN) separates the control plane (deciding where traffic goes) from the data plane (actually forwarding packets). A logically centralised SDN controller maintains a global view of the network and pushes flow-table rules into switches via protocols like OpenFlow. This gives operators programmable, flexible control over traffic without reconfiguring each device individually.",
        bullets: [
          "SDN separates the data plane (packet forwarding in switches) from the control plane (routing logic in controller)",
          "A logically centralised SDN controller computes forwarding tables for all switches in the network",
          "OpenFlow: the open standard protocol between an SDN controller and its managed switches",
          "Flow table: each entry has match fields (header values to test) and action fields (forward, drop, modify, send to controller)",
          "Match-action paradigm generalises routing: any header field can be matched, many actions are possible",
          "SDN controller maintains network-wide state, runs routing algorithms, installs flow entries on demand",
          "Benefits: flexible traffic engineering, easier network management, rapid innovation in control logic",
          "Challenges: scalability of a centralised controller, fault tolerance and reliability, security of the controller itself"
        ],
        analogy: "Traditional networking is like every traffic light making its own independent timing decisions. SDN is like a city-wide traffic management centre that monitors all intersections and remotely programs every light in real time. The lights (switches) still forward cars (packets) — but the intelligence lives in the centre.",
        visual: "sim-sdn"
      },
      quiz: [
        {
          id: "q-ch5-009",
          type: "mcq",
          question: "What is the fundamental architectural principle of Software-Defined Networking (SDN)?",
          options: [
            "Replacing IP with a faster proprietary addressing scheme",
            "Separating the control plane (routing logic) from the data plane (packet forwarding)",
            "Distributing routing tables to every end host rather than to routers",
            "Encrypting all forwarding decisions to prevent topology discovery"
          ],
          answer: 1,
          explanation: "SDN's defining principle is the separation of control and data planes. The data plane (switches, routers) handles fast, hardware-level packet forwarding. The control plane (SDN controller software) handles all routing decisions centrally and pushes forwarding rules down to the data plane devices.",
          xpReward: 25
        },
        {
          id: "q-ch5-010",
          type: "mcq",
          question: "In an OpenFlow flow table, what does a 'match + action' entry specify?",
          options: [
            "A cryptographic key to authenticate each incoming packet",
            "A pattern of header field values to match against incoming packets and an action to apply when matched",
            "A list of next-hop IP addresses ranked by BGP preference",
            "A time-to-live (TTL) decrement value for packets traversing this switch"
          ],
          answer: 1,
          explanation: "Each OpenFlow flow-table entry has match fields (e.g., incoming port, Ethernet MAC, IP address, TCP port) and action fields (forward out a specific port, drop the packet, modify a header field, or send to the controller). This match-action model generalises beyond simple destination-based forwarding.",
          xpReward: 25
        },
        {
          id: "q-ch5-011",
          type: "truefalse",
          question: "A key challenge of SDN is that the logically centralised controller introduces a potential single point of failure and a scalability bottleneck.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Because all control-plane decisions pass through the SDN controller, a controller failure can take down the whole network. Similarly, as the network grows, the controller must handle state and computation for every switch and every flow. Real deployments address this with replicated, distributed controller implementations (e.g., ONOS, OpenDaylight).",
          xpReward: 25
        },
        {
          id: "q-ch5-012",
          type: "fillblank",
          question: "The open standard protocol that an SDN controller uses to install and query flow-table entries on switches is called ______.",
          answer: "OpenFlow",
          explanation: "OpenFlow is the seminal southbound API (controller-to-switch protocol) in SDN. It defines messages for the controller to add, modify, or delete flow entries and for switches to send unmatched packets up to the controller. It enabled the SDN research and commercial ecosystem to develop around vendor-neutral programmable forwarding.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — ICMP
    ───────────────────────────────────────────── */
    {
      id: "ch5-icmp",
      title: "ICMP",
      xpReward: 10,
      content: {
        summary: "ICMP (Internet Control Message Protocol) is the network layer's error-reporting and diagnostic mechanism. When a router or host encounters a problem handling an IP datagram — unreachable destination, expired TTL, bad header — it sends an ICMP message back to the source. Two essential network tools, ping and traceroute, are built entirely on ICMP.",
        bullets: [
          "ICMP is used by hosts and routers to communicate network-layer error and informational messages",
          "ICMP lives above IP: ICMP messages are encapsulated in IP datagrams (IP Protocol field = 1)",
          "Each ICMP message has a Type field and a Code field that together specify the exact meaning",
          "ICMP Type 0 (code 0): Echo Reply — sent in response to a ping",
          "ICMP Type 3: Destination Unreachable — various codes indicate why (host unreachable, port unreachable, etc.)",
          "ICMP Type 8 (code 0): Echo Request — sent by ping to probe a host",
          "ICMP Type 11 (code 0): Time Exceeded — sent by a router when it discards a datagram with TTL = 0",
          "ping: sends ICMP Echo Request (type 8) and measures round-trip time to the Echo Reply (type 0)",
          "traceroute: sends a series of UDP segments with TTL = 1, 2, 3, …; each router along the path discards the datagram (TTL expires) and sends back ICMP Time Exceeded (type 11); the destination sends ICMP Port Unreachable (type 3, code 3) when it receives the probe",
          "ICMPv6: the ICMP equivalent for IPv6, extended to include Neighbor Discovery (replacing ARP) and Path MTU Discovery"
        ],
        analogy: "ICMP is like the postal service's notification cards. When a letter can't be delivered (wrong address, mailbox full, recipient moved), the post office sends a notification back to the sender explaining what went wrong. ping is asking 'are you there?' and waiting for 'yes, here!'; traceroute is sending letters that intentionally expire at each post office so each one sends back a notification, mapping the full route.",
        visual: "sim-icmp"
      },
      quiz: [
        {
          id: "q-ch5-013",
          type: "mcq",
          question: "How are ICMP messages transported across the network?",
          options: [
            "Directly in Ethernet frames, bypassing the IP layer",
            "Encapsulated inside IP datagrams as the payload, with IP Protocol field set to 1",
            "Encapsulated inside TCP segments to guarantee reliable delivery",
            "Sent as UDP datagrams on well-known port 7 (echo)"
          ],
          answer: 1,
          explanation: "ICMP is considered part of the network layer but sits logically above IP in that ICMP messages are the payload of IP datagrams. The IP Protocol field is set to 1 to indicate ICMP. This means ICMP inherits IP's best-effort, unreliable delivery — there is no guarantee that an ICMP error message itself will arrive.",
          xpReward: 25
        },
        {
          id: "q-ch5-014",
          type: "mcq",
          question: "How does traceroute use ICMP to discover each hop along a path to a destination?",
          options: [
            "It sends ICMP Echo Requests with progressively larger payloads until fragmentation occurs at each hop",
            "It sends datagrams with TTL=1, 2, 3, … — each router that discards an expired-TTL datagram sends back an ICMP Time Exceeded message revealing its address",
            "It queries each router's SNMP MIB to extract its forwarding table entries",
            "It sends ICMP Redirect messages that cause each router to report its identity back to the source"
          ],
          answer: 1,
          explanation: "traceroute exploits TTL expiry. A datagram with TTL=1 is discarded by the first router, which returns an ICMP Time Exceeded (type 11, code 0) — revealing that router's IP. TTL=2 reaches the second router before expiring, and so on. When the probe finally reaches the destination, the destination returns ICMP Port Unreachable (type 3, code 3) because the UDP port is intentionally invalid, signalling the end of the route.",
          xpReward: 25
        },
        {
          id: "q-ch5-015",
          type: "truefalse",
          question: "The ping utility sends ICMP Echo Request messages (Type 8) and expects ICMP Echo Reply messages (Type 0) in return.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. ping works entirely within ICMP. The sender transmits ICMP Type 8 (Echo Request) packets. If the destination host is reachable and not filtering ICMP, it responds with ICMP Type 0 (Echo Reply) packets. The round-trip time and packet loss statistics ping reports come from timing these exchanges.",
          xpReward: 25
        },
        {
          id: "q-ch5-016",
          type: "fillblank",
          question: "When a router discards a datagram because its TTL field has reached zero, it sends an ICMP message of type ______ back to the source.",
          answer: "11",
          explanation: "ICMP Type 11 is 'Time Exceeded'. Code 0 (TTL Exceeded in Transit) is generated by routers when the TTL reaches zero before the datagram reaches its destination. traceroute relies on this behaviour: by sending probes with incrementing TTL values, it collects a Time Exceeded reply from each successive router, mapping out the path.",
          xpReward: 25
        }
      ]
    }

  ] // end sections
}; // end window.chapter5Data
