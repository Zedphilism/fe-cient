/**
 * data/chapter1-data.js
 * Chapter 1 topic content and quiz questions.
 * Consumed by chapter1.html via <script src="data/chapter1-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match
 */

window.chapter1Data = {
  id: "chapter1",
  title: "Chapter 1: Introduction to Networking",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — What is the Internet?
    ───────────────────────────────────────────── */
    {
      id: "ch1-internet",
      title: "What is the Internet?",
      xpReward: 10,
      content: {
        summary: "The Internet is a global network of billions of interconnected devices — computers, phones, servers, sensors — that exchange data using shared protocols. It can be viewed from two angles: the nuts-and-bolts view (physical hardware and links) and the service view (an infrastructure that delivers services to applications).",
        bullets: [
          "Nuts-and-bolts view: end systems (hosts) connected by communication links and packet switches",
          "Communication links include fiber optics, copper wire, radio, and satellite",
          "Packet switches (routers + link-layer switches) forward packets toward their destination",
          "End systems connect via Internet Service Providers (ISPs)",
          "Service view: the Internet is a platform that provides services to distributed applications (email, video streaming, online games)",
          "Distributed applications run on end systems — NOT on packet switches in the network core",
          "The Internet provides two socket programming interfaces to applications: a reliable, connection-oriented service and an unreliable, connectionless service",
          "Protocols define the format and order of messages exchanged between communicating entities"
        ],
        analogy: "Think of the Internet like a postal system. Your home is an end system, roads and highways are communication links, and sorting facilities are packet switches. The postal service (ISP) connects everyone. Your letter (data) gets broken into parcels (packets) that travel independently and get reassembled at the destination.",
        visual: "sim-packet-flow"
      },
      quiz: [
        {
          id: "q-ch1-001",
          type: "mcq",
          question: "In the nuts-and-bolts view of the Internet, which devices are responsible for forwarding packets toward their destination?",
          options: [
            "End systems (hosts)",
            "Packet switches (routers and link-layer switches)",
            "Internet Service Providers (ISPs)",
            "Application servers"
          ],
          answer: 1,
          explanation: "Packet switches — routers in the network core and link-layer switches in access networks — inspect incoming packets and forward them along the correct outgoing link toward the destination.",
          xpReward: 25
        },
        {
          id: "q-ch1-002",
          type: "truefalse",
          question: "In the service view, distributed Internet applications (like email or video streaming) run on packet switches inside the network core.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Distributed applications run on end systems (hosts) at the edge of the network. Packet switches in the core only forward data — they do not run user applications.",
          xpReward: 25
        },
        {
          id: "q-ch1-003",
          type: "mcq",
          question: "What is the role of an Internet Service Provider (ISP)?",
          options: [
            "To manufacture network hardware such as routers and switches",
            "To provide end systems with access to the Internet via a network of packet switches and links",
            "To run application-layer services like HTTP servers for end users",
            "To assign MAC addresses to every device on the network"
          ],
          answer: 1,
          explanation: "ISPs give end systems — homes, universities, corporations — access to the Internet. Each ISP is itself a network of packet switches and communication links. Higher-tier (tier-1) ISPs interconnect with each other to form the global Internet.",
          xpReward: 25
        },
        {
          id: "q-ch1-004",
          type: "fillblank",
          question: "A unit of data sent across the Internet that has been broken into smaller chunks is called a ______.",
          answer: "packet",
          explanation: "Data is broken into packets before being sent. Each packet travels independently through the network and is reassembled at the destination. This technique is called packet switching.",
          xpReward: 25
        },
        {
          id: "q-ch1-005",
          type: "match",
          question: "Match each Internet term to its correct description.",
          pairs: [
            { term: "Host / End System",      definition: "A device at the edge of the network running applications" },
            { term: "Packet Switch",           definition: "A device that forwards packets toward their destination" },
            { term: "Communication Link",      definition: "Physical medium (fiber, copper, radio) carrying data" },
            { term: "ISP",                     definition: "Provider that connects end systems to the Internet" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "These four components form the nuts-and-bolts view of the Internet. Hosts produce/consume data; packet switches route it; communication links carry it; ISPs interconnect everything.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Protocols
    ───────────────────────────────────────────── */
    {
      id: "ch1-protocols",
      title: "Protocols",
      xpReward: 10,
      content: {
        summary: "A protocol defines the rules that govern communication between two or more entities — the format and order of messages exchanged, and the actions taken when messages are sent or received. All activity on the Internet is governed by protocols. Without agreed-upon protocols, devices from different vendors could not communicate.",
        bullets: [
          "A protocol specifies: message format, message order, and actions taken on send/receive",
          "Protocols exist at every layer of the network — application, transport, network, link, physical",
          "Key examples: HTTP (web browsing), SMTP (email), TCP (reliable data transfer), IP (addressing and routing), 802.11 (WiFi)",
          "TCP/IP is the foundational protocol suite of the Internet",
          "Human analogy: protocols are like social rules — a handshake before a conversation sets the communication context",
          "The Internet Engineering Task Force (IETF) standardizes Internet protocols via RFC documents",
          "Protocols enable interoperability: a Chrome browser on Windows can request a page from an Apache server on Linux"
        ],
        analogy: "Protocols are like the rules of a formal meeting. Before speaking, you raise your hand (SYN). The chairperson acknowledges you (SYN-ACK). You confirm and begin talking (ACK). Everyone follows the same rules so communication doesn't descend into chaos. Imagine if some people spoke in French and others in Morse code with no agreed translator — that is a network without protocols.",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch1-006",
          type: "mcq",
          question: "Which of the following best defines a network protocol?",
          options: [
            "A physical cable standard that defines maximum transmission speed",
            "A set of rules defining the format, order of messages, and actions taken during communication",
            "A software library used by applications to connect to the Internet",
            "A routing algorithm that determines the shortest path between two routers"
          ],
          answer: 1,
          explanation: "A protocol defines: (1) the syntax and semantics of messages, (2) the order in which messages are sent and received, and (3) the actions taken on transmission or receipt. This applies whether it is a human handshake or a TCP connection setup.",
          xpReward: 25
        },
        {
          id: "q-ch1-007",
          type: "truefalse",
          question: "The Internet Engineering Task Force (IETF) publishes Internet standards as RFC (Request for Comments) documents.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. The IETF is the main Internet standards body. Its standards are documented in RFCs. For example, HTTP/1.1 is defined in RFC 2616 and TCP is defined in RFC 793.",
          xpReward: 25
        },
        {
          id: "q-ch1-008",
          type: "mcq",
          question: "Which protocol is primarily responsible for routing packets across the Internet from source to destination?",
          options: [
            "HTTP",
            "SMTP",
            "IP (Internet Protocol)",
            "FTP"
          ],
          answer: 2,
          explanation: "IP (Internet Protocol) handles logical addressing and routing. Every packet carries a source and destination IP address. Routers use these addresses to forward packets hop-by-hop to the final destination.",
          xpReward: 25
        },
        {
          id: "q-ch1-009",
          type: "fillblank",
          question: "The two main protocols in the core Internet protocol suite are TCP and ______.",
          answer: "IP",
          explanation: "The Internet's foundational suite is TCP/IP. TCP provides reliable, ordered, error-checked delivery. IP handles logical addressing and routing. Together they form the basis on which all other Internet protocols operate.",
          xpReward: 25
        },
        {
          id: "q-ch1-010",
          type: "match",
          question: "Match each protocol to its primary purpose.",
          pairs: [
            { term: "HTTP",  definition: "Web page transfer between browser and server" },
            { term: "SMTP",  definition: "Sending email messages between mail servers" },
            { term: "TCP",   definition: "Reliable, ordered delivery of a byte stream" },
            { term: "IP",    definition: "Logical addressing and routing of packets" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "HTTP operates at the application layer for the web. SMTP also operates at the application layer for email. TCP at the transport layer ensures reliability. IP at the network layer handles routing.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — Network Structure
    ───────────────────────────────────────────── */
    {
      id: "ch1-structure",
      title: "Network Structure",
      xpReward: 10,
      content: {
        summary: "The Internet's structure has three key parts: the network edge (end systems and applications), the access network (the link that connects end systems to the first router), and the network core (the mesh of interconnected routers that forwards packets globally). Understanding this layered geography helps explain why latency, bandwidth, and reliability vary across the Internet.",
        bullets: [
          "Network edge: end systems (hosts) — clients and servers — where applications live",
          "Servers are often housed in large data centers (e.g., Google, AWS, Meta)",
          "Access network: the physical link connecting an end system to its first ('edge') router — also called the 'last mile'",
          "Network core: a mesh of high-speed routers interconnected by high-bandwidth fiber links",
          "Packet switching is used in the core — store-and-forward transmission; no dedicated path",
          "Circuit switching (used in phone networks) reserves a dedicated path for the duration of the call",
          "Packet switching is more efficient for bursty traffic; circuit switching guarantees bandwidth",
          "Statistical multiplexing allows many users to share links efficiently in a packet-switched network"
        ],
        analogy: "Picture a city (the Internet). Your home is the edge — where you live and send letters. The post office entrance is the access network — the path from your door to the post office. The highway and sorting system is the core — high-speed routes between cities. Your letter (packet) doesn't reserve a lane on the highway; it travels whenever space is available (statistical multiplexing).",
        visual: "sim-packet-flow"
      },
      quiz: [
        {
          id: "q-ch1-011",
          type: "mcq",
          question: "Which part of the Internet structure connects an end system to its first router?",
          options: [
            "Network core",
            "Access network",
            "Network edge",
            "Internet Exchange Point (IXP)"
          ],
          answer: 1,
          explanation: "The access network (also called 'last mile') is the physical link and infrastructure that connects an end system to the edge router. Examples include DSL, cable modem, fiber-to-the-home, and WiFi.",
          xpReward: 25
        },
        {
          id: "q-ch1-012",
          type: "mcq",
          question: "In packet switching, what happens if a router is busy transmitting another packet when a new packet arrives?",
          options: [
            "The new packet is immediately dropped",
            "The new packet waits in a queue (output buffer) until the link is free",
            "The new packet creates a dedicated circuit to bypass the router",
            "Transmission is halted on all links until the router is free"
          ],
          answer: 1,
          explanation: "Packet switching uses store-and-forward: a router stores a complete packet before forwarding it. If the output link is busy, packets queue in the output buffer. If the buffer overflows, packets are dropped — this is packet loss.",
          xpReward: 25
        },
        {
          id: "q-ch1-013",
          type: "truefalse",
          question: "Circuit switching is more efficient than packet switching for handling bursty internet traffic (e.g., web browsing).",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Circuit switching reserves bandwidth for the entire duration of a call, leaving that capacity unused during silence or idle periods. Packet switching shares link capacity dynamically — making it far more efficient for the bursty, variable traffic patterns of web browsing and most Internet applications.",
          xpReward: 25
        },
        {
          id: "q-ch1-014",
          type: "fillblank",
          question: "The technique that allows multiple packet flows to share a single link by interleaving packets is called statistical ______.",
          answer: "multiplexing",
          explanation: "Statistical multiplexing means that link capacity is shared on demand. Packets from different sources are interleaved on a link. This is far more efficient than TDM (time-division multiplexing) for bursty data traffic.",
          xpReward: 25
        },
        {
          id: "q-ch1-015",
          type: "match",
          question: "Match each network structure component to its correct description.",
          pairs: [
            { term: "Network Edge",   definition: "End systems (clients and servers) where applications run" },
            { term: "Access Network", definition: "Last-mile link from home/office to the first router" },
            { term: "Network Core",   definition: "Mesh of high-speed routers interconnected by fiber" },
            { term: "Data Center",    definition: "Facility housing thousands of servers for cloud/web services" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "The edge is where users and applications live. The access network is their on-ramp. The core is the highway system. Data centers at the edge or core house the servers that deliver services.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — Access Networks
    ───────────────────────────────────────────── */
    {
      id: "ch1-access",
      title: "Access Networks",
      xpReward: 10,
      content: {
        summary: "Access networks are the last-mile technologies that connect homes, businesses, and mobile devices to the first router in the Internet. They vary significantly in speed, medium, and topology. Common types include DSL (telephone lines), cable (coaxial TV lines), fiber-to-the-home (FTTH), 4G/5G cellular, and enterprise Ethernet/WiFi.",
        bullets: [
          "DSL (Digital Subscriber Line): uses existing telephone copper wire; asymmetric — download faster than upload; typical speeds 1–100 Mbps",
          "DSL uses frequency division multiplexing — voice and data share the same line on different frequency bands",
          "Cable Internet: uses coaxial TV cable; shared medium (HFC — Hybrid Fiber-Coaxial); downstream up to 1.2 Gbps, upstream up to 100 Mbps",
          "Cable is a shared broadcast medium — all households on a segment share bandwidth (unlike DSL which is dedicated)",
          "FTTH (Fiber to the Home): fiber optic all the way to the premises; gigabit speeds; lowest latency of all access types",
          "Two FTTH distribution architectures: AON (Active Optical Network) and PON (Passive Optical Network)",
          "Wireless LANs (WiFi): IEEE 802.11 standards; devices share a wireless access point; typically 10–100 Mbps within range",
          "4G/5G cellular: wide-area wireless access; 4G up to ~60 Mbps, 5G potentially >1 Gbps",
          "Enterprise networks: typically Ethernet (wired, up to 10 Gbps) connected to a campus router, then to the ISP"
        ],
        analogy: "Access networks are like different types of roads leading to the same highway (the Internet core). DSL is a narrow country road repurposed from an old telephone path. Cable is a shared lane on a suburban road — faster, but you share it with neighbors. Fiber is a private express lane with no congestion. Cellular is a helicopter — wireless, flexible, but subject to interference.",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch1-016",
          type: "mcq",
          question: "Which access network technology uses existing telephone copper lines and provides asymmetric bandwidth (faster download than upload)?",
          options: [
            "Cable Internet (HFC)",
            "FTTH (Fiber to the Home)",
            "DSL (Digital Subscriber Line)",
            "Enterprise Ethernet"
          ],
          answer: 2,
          explanation: "DSL (Digital Subscriber Line) leverages existing copper telephone infrastructure. It is asymmetric — the downstream channel (to customer) gets more bandwidth than the upstream channel. The DSLAM at the telephone central office splits voice and data traffic.",
          xpReward: 25
        },
        {
          id: "q-ch1-017",
          type: "mcq",
          question: "In a cable Internet (HFC) network, what does it mean that the medium is 'shared'?",
          options: [
            "All users in a neighborhood are assigned the same IP address",
            "The physical cable segment carries traffic for all households on that segment simultaneously",
            "The ISP shares its network equipment with multiple competing providers",
            "Both upload and download use the same frequency band"
          ],
          answer: 1,
          explanation: "HFC (Hybrid Fiber-Coaxial) is a broadcast shared medium. Every packet sent by the cable headend reaches every house on the segment. Downstream packets are filtered by cable modems by address. This shared nature means actual bandwidth per user decreases as more neighbors use the network simultaneously.",
          xpReward: 25
        },
        {
          id: "q-ch1-018",
          type: "truefalse",
          question: "FTTH (Fiber to the Home) provides the highest potential bandwidth among residential access network technologies.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Fiber optic cables carry data as pulses of light, giving them enormous bandwidth capacity — easily reaching symmetric gigabit speeds. FTTH eliminates the copper bottleneck of DSL and the shared-medium limitation of cable.",
          xpReward: 25
        },
        {
          id: "q-ch1-019",
          type: "fillblank",
          question: "The wireless access standard commonly used in home and campus WiFi networks is IEEE ______.",
          answer: "802.11",
          explanation: "IEEE 802.11 is the family of wireless LAN standards (including 802.11a/b/g/n/ac/ax). Devices communicate with a wireless access point (AP) over radio frequencies. The latest generation, 802.11ax (WiFi 6), can exceed 9 Gbps in ideal conditions.",
          xpReward: 25
        },
        {
          id: "q-ch1-020",
          type: "match",
          question: "Match each access technology to its defining characteristic.",
          pairs: [
            { term: "DSL",              definition: "Uses existing telephone copper wire; asymmetric speeds" },
            { term: "Cable (HFC)",      definition: "Shared coaxial medium; hybrid fiber-coax topology" },
            { term: "FTTH",             definition: "Fiber optic to the premises; gigabit symmetric speeds" },
            { term: "4G/5G Cellular",   definition: "Wide-area wireless access via base stations and mobile networks" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Each technology has a distinct physical medium and topology. DSL = copper phone lines. HFC = shared coax. FTTH = dedicated fiber. Cellular = radio spectrum through towers. Enterprise Ethernet (Gigabit copper or fiber) is also common but campus-specific.",
          xpReward: 25
        }
      ]
    }

  ] // end sections
}; // end window.chapter1Data
