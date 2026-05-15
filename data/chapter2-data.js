/**
 * data/chapter2-data.js
 * Chapter 2 topic content and quiz questions (Application Layer — up to Email).
 * Consumed by chapter2.html via <script src="data/chapter2-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match
 */

window.chapter2Data = {
  id: "chapter2",
  title: "Chapter 2: Application Layer",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — Client-Server Architecture
    ───────────────────────────────────────────── */
    {
      id: "ch2-client-server",
      title: "Client-Server Architecture",
      xpReward: 10,
      content: {
        summary: "In client-server architecture, there is an always-on host called the server that services requests from many clients. Clients do not communicate directly with each other. The server has a permanent, well-known IP address so clients can always reach it.",
        bullets: [
          "Server: always-on host with a fixed, well-known IP address; waits for and responds to requests",
          "Client: initiates contact with the server to request a service; can have dynamic IP addresses",
          "Clients do NOT communicate directly with each other in pure client-server",
          "A single server cannot keep up with all client requests — data centers with thousands of servers are used",
          "Data centers act as powerful virtual servers, handling millions of simultaneous connections",
          "Examples: web (HTTP), email (SMTP), file transfer (FTP), remote login (SSH)",
          "Easily scalable by adding more servers, but server infrastructure is costly and centralised"
        ],
        analogy: "Think of a restaurant. The kitchen (server) is always open and accepts orders (requests) from diners (clients). Diners never cook for each other — all service flows through the kitchen. If demand grows, the restaurant opens more kitchens (data centers).",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch2-001",
          type: "mcq",
          question: "Which statement best describes the server role in client-server architecture?",
          options: [
            "It initiates communication whenever it needs a resource",
            "It is an always-on host with a permanent, well-known IP address that services client requests",
            "It communicates only with other servers, never with clients directly",
            "It dynamically changes its IP address to avoid overload"
          ],
          answer: 1,
          explanation: "A server is always-on, has a fixed well-known IP address (so clients can always find it), and passively waits for and responds to incoming requests from clients.",
          xpReward: 25
        },
        {
          id: "q-ch2-002",
          type: "truefalse",
          question: "In a pure client-server architecture, clients communicate directly with each other to share data.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. In client-server, all communication flows through the server. Clients request services from the server; they do not talk to each other directly. This distinguishes it from peer-to-peer (P2P) architecture.",
          xpReward: 25
        },
        {
          id: "q-ch2-003",
          type: "mcq",
          question: "Why do large web services (Google, Netflix) use data centers instead of a single server?",
          options: [
            "A single server cannot handle millions of simultaneous client requests",
            "Data centers are required by Internet standards for commercial services",
            "Data centers use a different protocol stack than single servers",
            "A single server cannot be assigned a permanent IP address"
          ],
          answer: 0,
          explanation: "A single host cannot handle millions of concurrent connections. Data centers aggregate thousands of servers behind virtual server infrastructure to share load, provide redundancy, and meet demand at scale.",
          xpReward: 25
        },
        {
          id: "q-ch2-004",
          type: "match",
          question: "Match each application to its architecture model.",
          pairs: [
            { term: "Web browsing (HTTP)",  definition: "Client-server — browser requests pages from web server" },
            { term: "BitTorrent",           definition: "Peer-to-peer — peers upload/download directly to each other" },
            { term: "Email (SMTP)",         definition: "Client-server — mail client sends to mail server" },
            { term: "Skype (original)",     definition: "Hybrid P2P — uses directory server but direct peer streams" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "HTTP and SMTP are classic client-server applications. BitTorrent is a pure P2P application. Skype originally used a hybrid model with a central index and direct peer-to-peer media streams.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Peer-to-Peer Architecture
    ───────────────────────────────────────────── */
    {
      id: "ch2-p2p",
      title: "Peer-to-Peer (P2P) Architecture",
      xpReward: 10,
      content: {
        summary: "In peer-to-peer (P2P) architecture, end systems called peers communicate directly with each other without routing through a dedicated server. Each peer acts as both a client and a server. P2P is highly scalable because adding more peers adds both demand and supply capacity.",
        bullets: [
          "No always-on dedicated server — peers communicate directly with each other",
          "Each peer is both a client (requests resources) and a server (provides resources to others)",
          "Self-scalability: every new peer adds capacity to the system as well as demand",
          "Examples: BitTorrent (file sharing), Gnutella, original Skype, blockchain networks",
          "Challenge: peers have dynamic IP addresses and are intermittently online",
          "Security, reliability, and performance are harder to manage than client-server",
          "Distribution time for a file decreases as more peers join (unlike client-server where server bandwidth is the bottleneck)"
        ],
        analogy: "P2P is like a neighborhood library exchange. Instead of one central library (server), every household has books and anyone can borrow from any neighbor. The more households that join, the more books are available — the system gets better as it grows, not worse.",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch2-005",
          type: "mcq",
          question: "What is the key advantage of P2P architecture over client-server for large file distribution?",
          options: [
            "P2P uses less bandwidth overall because files are compressed",
            "P2P is self-scaling — each new peer adds upload capacity, reducing distribution time",
            "P2P guarantees faster delivery because it skips the network core",
            "P2P servers are always-on and have higher bandwidth than regular servers"
          ],
          answer: 1,
          explanation: "P2P is self-scaling. In client-server, the server must upload to every peer — bandwidth is a fixed bottleneck. In P2P, every new peer that downloads also uploads to others, so total capacity grows with the number of peers.",
          xpReward: 25
        },
        {
          id: "q-ch2-006",
          type: "truefalse",
          question: "In a P2P network, a peer can act as both a client and a server simultaneously.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. This is a defining characteristic of P2P. A peer downloads (acting as client) while simultaneously uploading pieces to other peers (acting as server). BitTorrent clients do exactly this.",
          xpReward: 25
        },
        {
          id: "q-ch2-007",
          type: "fillblank",
          question: "The property of P2P systems where adding more peers increases both demand AND capacity is called ______-scalability.",
          answer: "self",
          explanation: "Self-scalability means the system scales itself — new peers bring new service capacity in proportion to their new demand. This is the fundamental advantage of P2P over centralized client-server architecture for large-scale distribution.",
          xpReward: 25
        },
        {
          id: "q-ch2-008",
          type: "mcq",
          question: "Which of the following is NOT a challenge associated with P2P architecture?",
          options: [
            "Peers have intermittent connectivity and dynamic IP addresses",
            "Security and content integrity are harder to enforce",
            "The server becomes a bandwidth bottleneck as users increase",
            "Coordination and discovery of peers is complex"
          ],
          answer: 2,
          explanation: "The server bandwidth bottleneck is a problem with CLIENT-SERVER architecture, not P2P. P2P's challenges are intermittent peer availability, dynamic IPs, security/trust, and complex peer discovery.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — Processes and Sockets
    ───────────────────────────────────────────── */
    {
      id: "ch2-processes",
      title: "Processes and Sockets",
      xpReward: 10,
      content: {
        summary: "Network communication happens between processes (running programs), not between computers. Processes on different hosts communicate by exchanging messages through sockets — the interface between the application layer and the transport layer. A socket is the 'door' through which a process sends and receives messages.",
        bullets: [
          "A process is a program running within an end system",
          "Two processes communicate by exchanging messages across a network",
          "Within a host, processes use inter-process communication (IPC) — an OS mechanism",
          "Across hosts, processes exchange messages through the network",
          "A socket is the API between the application layer and the transport layer",
          "A process sends/receives messages through its socket — like a door to the network",
          "The sending process pushes a message out its socket; the network delivers it to the receiving process's socket",
          "The application developer controls the socket on the application side but has limited control below the socket (transport layer and below is OS-controlled)",
          "In client-server: the process that initiates contact is the client; the one that waits for contact is the server"
        ],
        analogy: "A socket is like a mailbox slot in your front door. Your application (process) writes letters (messages) and drops them in the slot (socket). The postal system (transport/network layer) handles delivery. Letters arriving at the destination fall through the recipient's mailbox slot (socket) into their home (process).",
        visual: "sim-socket"
      },
      quiz: [
        {
          id: "q-ch2-009",
          type: "mcq",
          question: "What is a socket in the context of network communication?",
          options: [
            "A physical port on a network switch that connects Ethernet cables",
            "The software interface between the application layer and the transport layer through which a process sends/receives messages",
            "A reserved IP address used by servers to accept incoming connections",
            "A data structure in the operating system that stores routing tables"
          ],
          answer: 1,
          explanation: "A socket is the API (application programming interface) between the application and the transport layer. It is the 'door' through which a process sends messages into and receives messages from the network.",
          xpReward: 25
        },
        {
          id: "q-ch2-010",
          type: "truefalse",
          question: "The application developer has full control over both sides of the socket — the application layer above the socket and the transport layer below the socket.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. The developer controls the application-layer side of the socket (what messages to send, when to send them). The transport layer and below (OS-controlled) are not directly controlled by the application developer — they only choose the transport protocol (TCP/UDP) and configure a few parameters.",
          xpReward: 25
        },
        {
          id: "q-ch2-011",
          type: "mcq",
          question: "In a client-server interaction, which process is defined as the client?",
          options: [
            "The process that has a permanent, well-known address",
            "The process that waits passively for incoming connections",
            "The process that initiates contact with the other process",
            "The process running on the higher-powered machine"
          ],
          answer: 2,
          explanation: "By definition, the client process initiates communication — it is the one that 'dials'. The server process waits for contact. This distinction holds even in P2P: the peer that initiates a session is acting as the client in that exchange.",
          xpReward: 25
        },
        {
          id: "q-ch2-012",
          type: "fillblank",
          question: "Within a single host, two processes can communicate using the operating system's ______ (IPC) mechanisms.",
          answer: "inter-process communication",
          explanation: "When two processes run on the same host, the OS provides IPC mechanisms (shared memory, pipes, message queues) for communication. When processes run on different hosts, they must use network sockets to exchange messages.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — Addressing Processes
    ───────────────────────────────────────────── */
    {
      id: "ch2-addressing",
      title: "Addressing Processes",
      xpReward: 10,
      content: {
        summary: "To send a message to a process on another host, you need two pieces of information: the IP address of the destination host, and a port number that identifies the specific process on that host. Together, (IP address, port number) uniquely identifies a process's socket on the Internet.",
        bullets: [
          "IP address: 32-bit identifier (IPv4) that identifies the host machine on the network",
          "Port number: 16-bit identifier (0–65535) that identifies which process/socket on the host",
          "Well-known ports: HTTP = 80, HTTPS = 443, SMTP = 25, FTP = 21, SSH = 22, DNS = 53",
          "A host can run many networked processes simultaneously — port numbers distinguish them",
          "Together (IP address + port) form a socket address that uniquely identifies one endpoint",
          "A connection is identified by a 4-tuple: (source IP, source port, dest IP, dest port)",
          "Client ports are typically assigned ephemerally (randomly) by the OS; server ports are well-known and fixed",
          "Ports 0–1023 are reserved for well-known services; 1024–49151 are registered; 49152–65535 are dynamic/private"
        ],
        analogy: "An IP address is like the street address of an apartment building — it gets you to the right building. The port number is the apartment number — it identifies the exact unit (process) within that building. You need both to deliver a message to the right person.",
        visual: "sim-socket"
      },
      quiz: [
        {
          id: "q-ch2-013",
          type: "mcq",
          question: "Why is an IP address alone not sufficient to identify a communication endpoint?",
          options: [
            "IP addresses can change dynamically and are unreliable identifiers",
            "A host can run multiple networked processes simultaneously; the port number identifies which one",
            "IP addresses only identify networks, not individual hosts",
            "The transport layer does not have access to IP addresses"
          ],
          answer: 1,
          explanation: "A host can run a web server, an email server, and an FTP server simultaneously. The IP address identifies the machine, but the port number (80, 25, 21 respectively) tells the OS which process should receive incoming packets.",
          xpReward: 25
        },
        {
          id: "q-ch2-014",
          type: "mcq",
          question: "A web server is contacted using HTTP. What is the standard (well-known) port number for HTTP?",
          options: ["21", "25", "80", "443"],
          answer: 2,
          explanation: "Port 80 is the well-known port for HTTP. Port 443 is for HTTPS (HTTP over TLS). Port 25 is SMTP (email). Port 21 is FTP. These well-known ports are standardized so clients know which port to contact without prior negotiation.",
          xpReward: 25
        },
        {
          id: "q-ch2-015",
          type: "truefalse",
          question: "A TCP connection is uniquely identified by the combination of source IP, source port, destination IP, and destination port.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. This 4-tuple uniquely identifies each TCP connection. Two clients can connect to the same server port (e.g., port 80) simultaneously because they have different source IP/port combinations, making each 4-tuple unique.",
          xpReward: 25
        },
        {
          id: "q-ch2-016",
          type: "fillblank",
          question: "The well-known port number for HTTPS (HTTP Secure) is ______.",
          answer: "443",
          explanation: "HTTPS runs HTTP over TLS/SSL on port 443. Standard HTTP uses port 80. When you navigate to a URL starting with 'https://', your browser connects to port 443 by default.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — Application-Layer Protocols
    ───────────────────────────────────────────── */
    {
      id: "ch2-app-protocols",
      title: "Application-Layer Protocols",
      xpReward: 10,
      content: {
        summary: "An application-layer protocol defines how an application's processes on different hosts pass messages to each other. It specifies message types (request/response), syntax (fields and how they are delineated), semantics (meaning of fields), and rules for when/how to send and respond. Application protocols are distinct from the applications themselves.",
        bullets: [
          "An application-layer protocol defines: types of messages, syntax, semantics, and rules",
          "Message types: e.g., HTTP defines request messages and response messages",
          "Syntax: the fields in the message and how they are structured (e.g., HTTP headers)",
          "Semantics: the meaning of the information in the fields",
          "Rules: when and how a process sends messages and responds to messages",
          "Open protocols (defined in RFCs) allow interoperability: e.g., HTTP, SMTP, FTP, DNS",
          "Proprietary protocols are specific to one vendor/application: e.g., Skype's original protocol",
          "Network applications vs application-layer protocols: email is the application; SMTP is one of its protocols"
        ],
        analogy: "An application protocol is like the rules of a formal business letter. There are standard sections (To, From, Subject, Body), agreed-upon language conventions, and rules about when to reply. If everyone follows the same letter format, any company can send and receive letters from any other company — that's interoperability.",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch2-017",
          type: "mcq",
          question: "Which of the following is NOT something that an application-layer protocol defines?",
          options: [
            "The types of messages exchanged (e.g., request, response)",
            "The syntax and fields within each message type",
            "The physical transmission medium used to carry the messages",
            "The rules for when and how a process sends or responds to messages"
          ],
          answer: 2,
          explanation: "Application-layer protocols define message types, syntax, semantics, and communication rules. Physical transmission media (copper, fiber, radio) are concerns of the physical layer — far below the application layer.",
          xpReward: 25
        },
        {
          id: "q-ch2-018",
          type: "truefalse",
          question: "The web application and the HTTP protocol are the same thing.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. The web is an application. HTTP is one of the protocols the web application uses. The web also relies on DNS (to resolve domain names), TCP (transport), and HTML/CSS/JS (content format). The application is not the same as its protocol.",
          xpReward: 25
        },
        {
          id: "q-ch2-019",
          type: "mcq",
          question: "An open protocol, such as HTTP defined in an RFC, provides which key benefit?",
          options: [
            "Better performance than proprietary protocols",
            "Interoperability — any compliant implementation can communicate with any other",
            "Encryption and security by default",
            "Guaranteed delivery of all messages without retransmission"
          ],
          answer: 1,
          explanation: "Open protocols allow interoperability. Because HTTP is publicly documented, a Firefox browser can communicate with an Apache server, an Nginx server, or a Microsoft IIS server. Proprietary protocols lock users into a single vendor's ecosystem.",
          xpReward: 25
        },
        {
          id: "q-ch2-020",
          type: "match",
          question: "Match each application to its primary application-layer protocol.",
          pairs: [
            { term: "Web browsing",      definition: "HTTP / HTTPS" },
            { term: "Email sending",     definition: "SMTP" },
            { term: "Domain name lookup",definition: "DNS" },
            { term: "File transfer",     definition: "FTP" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "HTTP serves web content. SMTP sends email. DNS resolves hostnames to IP addresses. FTP transfers files. Each is an application-layer protocol defined in IETF RFCs that enables a specific application.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 6 — Transport Service Requirements
    ───────────────────────────────────────────── */
    {
      id: "ch2-transport-req",
      title: "Transport Service Requirements",
      xpReward: 10,
      content: {
        summary: "Different applications have different needs from the transport layer. The four key dimensions applications care about are: data integrity (no data loss), throughput (minimum bandwidth needed), timing (low latency requirements), and security (encryption, authentication). Applications choose TCP or UDP based on which requirements matter most.",
        bullets: [
          "Data integrity: some apps (file transfer, email) require 100% reliable delivery; others (audio/video streaming) tolerate loss",
          "Throughput: bandwidth-sensitive apps (video conferencing) need a minimum guaranteed rate; elastic apps (email) use whatever is available",
          "Timing: interactive apps (gaming, VoIP) require low delay (< 100–150 ms); non-real-time apps can tolerate delay",
          "Security: some apps need encryption (e-commerce), data integrity checks, and end-point authentication",
          "TCP provides: reliable data transfer, flow control, congestion control — but NO timing/throughput guarantees",
          "UDP provides: unreliable, connectionless transfer with minimal overhead — no guarantees at all",
          "Applications needing timing/throughput guarantees (VoIP, video) often choose UDP and handle issues in the app layer"
        ],
        analogy: "Choosing a transport service is like shipping a package. For rare documents (financial data), you use certified mail (TCP) — expensive but reliable. For live radio (VoIP), you use a phone call (UDP) — if a word is cut off, it doesn't matter; you'd rather have immediacy than wait for a retry.",
        visual: "sim-tcp-vs-udp"
      },
      quiz: [
        {
          id: "q-ch2-021",
          type: "mcq",
          question: "A video-conferencing application prioritises low delay over perfect data delivery. Which transport dimension is most critical for this application?",
          options: [
            "Data integrity (loss-free delivery)",
            "Security (encryption and authentication)",
            "Timing (low end-to-end delay)",
            "High minimum throughput guarantee"
          ],
          answer: 2,
          explanation: "Video conferencing is a real-time interactive application. A 500ms delay makes conversation impossible. A lost packet causes a brief visual artifact — tolerable. Timing (latency) is the critical requirement, which is why VoIP/video often uses UDP.",
          xpReward: 25
        },
        {
          id: "q-ch2-022",
          type: "mcq",
          question: "Which of the following applications would be MOST negatively affected by packet loss?",
          options: [
            "Online multiplayer game (position updates)",
            "Live audio streaming (radio broadcast)",
            "File download (software update)",
            "Video call (webcam feed)"
          ],
          answer: 2,
          explanation: "A file download requires 100% data integrity — a single lost bit can corrupt an executable or archive. Games and audio/video streaming can tolerate occasional loss because slightly degraded quality is better than stalling to retransmit.",
          xpReward: 25
        },
        {
          id: "q-ch2-023",
          type: "truefalse",
          question: "TCP provides timing guarantees (maximum delay bounds) to ensure real-time applications get low latency.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. TCP provides reliable, ordered, error-checked delivery with flow and congestion control — but NO timing or throughput guarantees. This is why real-time applications (VoIP, video games) often prefer UDP despite its unreliability.",
          xpReward: 25
        },
        {
          id: "q-ch2-024",
          type: "match",
          question: "Match each application to its most critical transport requirement.",
          pairs: [
            { term: "Email",              definition: "Data integrity — no data loss acceptable" },
            { term: "VoIP (phone call)",  definition: "Timing — low latency; some loss tolerable" },
            { term: "Video streaming",    definition: "Minimum throughput — needs enough bandwidth for smooth playback" },
            { term: "Online banking",     definition: "Security — encryption and authentication required" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Email must arrive intact (data integrity). VoIP needs immediacy (timing). Video needs enough bandwidth (throughput). Banking needs confidentiality and authenticity (security). Real applications often need multiple requirements, but each has a dominant one.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 7 — TCP vs UDP
    ───────────────────────────────────────────── */
    {
      id: "ch2-tcp-udp",
      title: "TCP vs UDP",
      xpReward: 10,
      content: {
        summary: "The Internet's transport layer offers two main protocols: TCP (Transmission Control Protocol) — reliable, connection-oriented, with flow and congestion control — and UDP (User Datagram Protocol) — unreliable, connectionless, with minimal overhead. Applications choose based on their requirements.",
        bullets: [
          "TCP: connection-oriented — requires a 3-way handshake before data transfer begins",
          "TCP: reliable delivery — guarantees all data arrives, in order, without corruption",
          "TCP: flow control — sender won't overwhelm receiver's buffer",
          "TCP: congestion control — sender throttles rate when network is congested",
          "TCP: NO bandwidth or latency guarantees — just reliability mechanisms",
          "UDP: connectionless — no handshake; just send the datagram",
          "UDP: unreliable — no guarantee of delivery, ordering, or integrity",
          "UDP: no flow/congestion control — sends at whatever rate the app specifies",
          "UDP advantages: lower overhead, lower latency, works for broadcast/multicast",
          "DNS, video streaming, VoIP, online gaming often use UDP; HTTP, email, FTP use TCP"
        ],
        analogy: "TCP is a registered letter with tracking and signature confirmation — reliable but with overhead. UDP is dropping a postcard in a public mailbox — fast and cheap, but no guarantee it arrives, and you'd never know if it didn't. Use registered mail for your tax return; use postcards to quickly tell someone you're on the way.",
        visual: "sim-tcp-vs-udp"
      },
      quiz: [
        {
          id: "q-ch2-025",
          type: "mcq",
          question: "Which TCP mechanism prevents a fast sender from overwhelming a slow receiver's buffer?",
          options: [
            "Congestion control",
            "Flow control",
            "Error detection",
            "Sequence numbering"
          ],
          answer: 1,
          explanation: "Flow control ensures the sender does not send faster than the receiver can process. The receiver advertises a receive window size (rwnd) telling the sender how much buffer space is available. Congestion control is about network congestion, not receiver capacity.",
          xpReward: 25
        },
        {
          id: "q-ch2-026",
          type: "truefalse",
          question: "UDP provides guaranteed delivery of datagrams but with higher latency than TCP.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. UDP provides NO delivery guarantees at all. It is unreliable and connectionless. The advantage of UDP is precisely that it has low overhead and low latency — it does not wait for acknowledgments or retransmit lost data.",
          xpReward: 25
        },
        {
          id: "q-ch2-027",
          type: "mcq",
          question: "A DNS query is typically sent using UDP rather than TCP. Which reason best explains this choice?",
          options: [
            "DNS data is too large to fit in a TCP segment",
            "DNS queries are short request-response exchanges where speed matters and a single retry is acceptable if the datagram is lost",
            "TCP does not support the IP addresses that DNS uses",
            "DNS servers are not capable of accepting TCP connections"
          ],
          answer: 1,
          explanation: "DNS queries are tiny (usually < 512 bytes) and latency matters. If a UDP DNS query is lost, the client simply retransmits after a timeout. The 3-way TCP handshake overhead would roughly double the time for a simple query-response — not worth it.",
          xpReward: 25
        },
        {
          id: "q-ch2-028",
          type: "match",
          question: "Match each protocol feature to TCP or UDP.",
          pairs: [
            { term: "3-way handshake before data transfer",    definition: "TCP — connection-oriented setup" },
            { term: "No delivery guarantees; fire-and-forget", definition: "UDP — unreliable, connectionless" },
            { term: "Congestion control to avoid flooding network", definition: "TCP — built-in congestion control" },
            { term: "Minimal overhead; used for DNS and VoIP",  definition: "UDP — low-overhead transport" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "TCP's handshake, reliability, flow/congestion control come at the cost of overhead and latency. UDP's minimal design enables high-speed, low-latency applications that tolerate imperfection — or implement their own reliability at the application layer.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 8 — Web and HTTP Basics
    ───────────────────────────────────────────── */
    {
      id: "ch2-http-intro",
      title: "Web and HTTP — Basics",
      xpReward: 10,
      content: {
        summary: "The World Wide Web is an application that uses HTTP (HyperText Transfer Protocol) as its application-layer protocol. A web page consists of a base HTML file and referenced objects (images, CSS, scripts). HTTP defines how web clients (browsers) request objects and how web servers respond.",
        bullets: [
          "HTTP is the Web's application-layer protocol; defined in RFC 1945 (HTTP/1.0) and RFC 2616 (HTTP/1.1)",
          "A web page consists of objects — each is a file (HTML, JPEG, JavaScript, CSS) addressable by a URL",
          "URL structure: protocol://hostname/path (e.g., http://www.school.edu/dept/photo.jpg)",
          "HTTP uses a client-server model: browser (client) sends requests; web server sends responses",
          "HTTP runs over TCP: client opens TCP connection to server port 80; sends request; gets response",
          "HTTP is a stateless protocol — the server does not retain any information about past client requests",
          "Statelessness simplifies server design but requires cookies/sessions for persistent state in applications"
        ],
        analogy: "HTTP is like ordering at a fast-food counter. You (client) step up and say 'GET me one burger' (HTTP request). The server hands you the burger (HTTP response). The cashier remembers nothing about you after you step away — no memory of your last visit (stateless). If you want a loyalty card (persistent state), that's handled by a separate system (cookies).",
        visual: "sim-http-request"
      },
      quiz: [
        {
          id: "q-ch2-029",
          type: "mcq",
          question: "Which transport-layer protocol does HTTP use, and on which port does a standard web server listen?",
          options: [
            "UDP on port 53",
            "TCP on port 80",
            "TCP on port 443",
            "UDP on port 80"
          ],
          answer: 1,
          explanation: "HTTP uses TCP (not UDP) because web page transfers require reliable, ordered delivery. The standard HTTP port is 80. HTTPS (HTTP over TLS) uses port 443.",
          xpReward: 25
        },
        {
          id: "q-ch2-030",
          type: "truefalse",
          question: "HTTP is a stateful protocol — the server maintains session information between successive requests from the same client.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. HTTP is explicitly stateless. The server retains no information about past client requests. Each request is independent. This simplifies server design. Web applications that need state (login sessions, shopping carts) implement it using cookies and server-side session storage built on top of stateless HTTP.",
          xpReward: 25
        },
        {
          id: "q-ch2-031",
          type: "fillblank",
          question: "A web page that contains a base HTML file referencing 5 images and 2 CSS files consists of ______ objects total.",
          answer: "8",
          explanation: "The base HTML file is 1 object. Each image (5) and each CSS file (2) is a separate object. Total = 1 + 5 + 2 = 8 objects. Each object has its own URL and can be fetched independently. This matters when calculating RTTs for non-persistent HTTP.",
          xpReward: 25
        },
        {
          id: "q-ch2-032",
          type: "mcq",
          question: "In a URL like http://www.example.com/images/logo.png, what does 'www.example.com' represent?",
          options: [
            "The path to the object on the server",
            "The hostname of the server holding the object",
            "The name of the protocol used",
            "The port number the server listens on"
          ],
          answer: 1,
          explanation: "A URL consists of the protocol (http://), the hostname (www.example.com), and the path (/images/logo.png). The hostname is resolved to an IP address by DNS. The protocol tells the client which application-layer protocol to use.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 9 — HTTP Characteristics
    ───────────────────────────────────────────── */
    {
      id: "ch2-http-char",
      title: "HTTP Characteristics",
      xpReward: 10,
      content: {
        summary: "HTTP has several defining characteristics: it is stateless, it can operate in non-persistent or persistent mode, it uses ASCII text-based messages (request and response), and HTTP/1.1 introduced persistent connections with pipelining. Understanding these characteristics is key to understanding web performance.",
        bullets: [
          "Stateless: server keeps no memory of past requests — each request is fresh",
          "HTTP uses ASCII text messages — human-readable request and response headers",
          "HTTP request methods: GET (retrieve), POST (submit data), PUT (upload), HEAD (headers only), DELETE",
          "HTTP response status codes: 1xx informational, 2xx success (200 OK), 3xx redirect (301 Moved), 4xx client error (404 Not Found), 5xx server error (500 Internal Server Error)",
          "HTTP headers carry metadata: Host, Connection, Content-Type, Content-Length, Date, Last-Modified",
          "Cookies: 4-component mechanism to add state on top of stateless HTTP (header, cookie file, server DB, back-header)",
          "Cookies allow user tracking, session management, personalization — but raise privacy concerns",
          "Web caches (proxy servers) store copies of recently requested objects to reduce latency and server load"
        ],
        analogy: "HTTP status codes are like restaurant responses. 200 OK = 'Here is your order'. 301 Moved Permanently = 'We've moved locations, here's the new address'. 404 Not Found = 'We don't have that dish'. 500 Internal Server Error = 'Our kitchen just caught fire, sorry'. Each code tells the client exactly what happened.",
        visual: "sim-http-request"
      },
      quiz: [
        {
          id: "q-ch2-033",
          type: "mcq",
          question: "What does an HTTP 404 status code indicate?",
          options: [
            "The server encountered an internal error processing the request",
            "The request was redirected to a different URL permanently",
            "The requested object was not found on the server",
            "The request succeeded and the object is included in the response"
          ],
          answer: 2,
          explanation: "404 Not Found means the server could not locate the requested object at the given URL. It is a 4xx client error — the error is on the client side (wrong URL). 200 OK = success; 301 = permanent redirect; 500 = server error.",
          xpReward: 25
        },
        {
          id: "q-ch2-034",
          type: "truefalse",
          question: "Cookies allow web servers to maintain a form of user state on top of the stateless HTTP protocol.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Cookies are a mechanism to layer state on top of HTTP's statelessness. A server sends a Set-Cookie header; the browser stores it; future requests include the Cookie header. This lets servers track sessions, shopping carts, login status, and preferences.",
          xpReward: 25
        },
        {
          id: "q-ch2-035",
          type: "mcq",
          question: "Which HTTP request method is used when a browser retrieves a web page?",
          options: [
            "POST",
            "PUT",
            "GET",
            "DELETE"
          ],
          answer: 2,
          explanation: "GET is used to request (retrieve) an object from a server. POST is used to submit data (e.g., a form). PUT uploads a resource. DELETE removes a resource. GET is the most common HTTP method — every web page load starts with a GET request.",
          xpReward: 25
        },
        {
          id: "q-ch2-036",
          type: "fillblank",
          question: "A web proxy server that stores copies of recently requested objects to serve them to clients without contacting the origin server is called a Web ______.",
          answer: "cache",
          explanation: "A Web cache (or proxy server) intercepts requests and serves locally stored copies if available, reducing latency for the client and load on the origin server. It also reduces traffic on access links, benefiting ISPs. CDNs (Content Delivery Networks) operate on this principle at massive scale.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 10 — Persistent vs Non-Persistent HTTP
    ───────────────────────────────────────────── */
    {
      id: "ch2-http-persistent",
      title: "Persistent vs Non-Persistent HTTP",
      xpReward: 10,
      content: {
        summary: "Non-persistent HTTP opens a new TCP connection for each object requested — costly in RTTs and OS resources. Persistent HTTP (default in HTTP/1.1) keeps the TCP connection open across multiple requests, dramatically reducing latency. Pipelining (HTTP/1.1) further allows multiple requests without waiting for responses.",
        bullets: [
          "RTT (Round-Trip Time): the time for a small packet to travel from client to server and back",
          "Non-persistent HTTP: 2 RTTs + file transmission time per object (1 RTT for TCP handshake + 1 RTT for HTTP request/response)",
          "For a page with N objects (1 base HTML + N-1 others): non-persistent requires 2(N) RTTs total",
          "Each TCP connection requires OS resources (buffers, variables) — opening many connections is expensive",
          "Persistent HTTP: server leaves TCP connection open after response; subsequent requests use the same connection",
          "Persistent without pipelining: 1 RTT per object after the initial connection (still sequential)",
          "Persistent with pipelining (HTTP/1.1): all requests sent back-to-back; all responses received in sequence — as little as 1 RTT for all objects",
          "HTTP/2 introduces multiplexing (multiple requests truly parallel on one connection) and header compression"
        ],
        analogy: "Non-persistent HTTP is like making a separate phone call to order each item at a restaurant — hang up, call again. Persistent HTTP without pipelining is one phone call where you order one item, wait for confirmation, then order the next. Persistent HTTP with pipelining is one call where you rattle off your entire order at once — much faster.",
        visual: "sim-persistent-http"
      },
      quiz: [
        {
          id: "q-ch2-037",
          type: "mcq",
          question: "How many RTTs does non-persistent HTTP require to fetch one object after a fresh TCP connection?",
          options: [
            "0 RTTs — the connection is always pre-established",
            "1 RTT — just the HTTP request and response",
            "2 RTTs — one for TCP handshake and one for HTTP request/response",
            "3 RTTs — TCP handshake, HTTP request, and acknowledgment"
          ],
          answer: 2,
          explanation: "Non-persistent HTTP needs: (1) 1 RTT for the TCP 3-way handshake (SYN + SYN-ACK, then ACK piggy-backed with HTTP request), and (2) 1 RTT for the HTTP request and response. Plus the actual file transmission time. Total = 2 RTTs + transmission time per object.",
          xpReward: 25
        },
        {
          id: "q-ch2-038",
          type: "truefalse",
          question: "HTTP/1.1 uses persistent connections with pipelining by default, allowing all objects on a page to be requested in parallel over a single TCP connection.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. HTTP/1.1 made persistent connections the default. With pipelining, a client can send multiple requests back-to-back without waiting for responses, significantly reducing total page load time compared to non-persistent HTTP.",
          xpReward: 25
        },
        {
          id: "q-ch2-039",
          type: "mcq",
          question: "A web page has 1 base HTML file and 9 image objects. Using non-persistent HTTP with no parallel connections, how many RTTs are needed to fetch all objects (ignoring transmission time)?",
          options: [
            "2 RTTs total",
            "10 RTTs total",
            "20 RTTs total",
            "11 RTTs total"
          ],
          answer: 2,
          explanation: "Non-persistent HTTP requires 2 RTTs per object (1 for TCP handshake + 1 for HTTP request/response). With 10 objects total (1 HTML + 9 images): 10 × 2 = 20 RTTs. This is why non-persistent HTTP has terrible performance for modern web pages with dozens of resources.",
          xpReward: 25
        },
        {
          id: "q-ch2-040",
          type: "fillblank",
          question: "HTTP/1.1's feature that allows a client to send multiple requests back-to-back on the same TCP connection without waiting for each response is called ______.",
          answer: "pipelining",
          explanation: "Pipelining (HTTP/1.1) allows the client to issue requests for all objects without waiting for prior responses. Responses arrive in order. This reduces total page load time dramatically. HTTP/2 extends this with true multiplexing — responses can arrive out of order.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 11 — HTTP Request-Response Flow
    ───────────────────────────────────────────── */
    {
      id: "ch2-http-flow",
      title: "HTTP Request-Response Flow",
      xpReward: 10,
      content: {
        summary: "An HTTP transaction follows a clear request-response pattern over TCP. The client sends an HTTP request message with a method, URL, headers, and optional body. The server processes the request and returns a response with a status code, headers, and the requested object. Understanding this flow is fundamental to debugging and web development.",
        bullets: [
          "Step 1: Client initiates TCP connection to server (port 80)",
          "Step 2: Server accepts TCP connection from client",
          "Step 3: Client sends HTTP request message (e.g., GET /index.html HTTP/1.1)",
          "Step 4: Server receives request, retrieves object, wraps in HTTP response",
          "Step 5: Server sends HTTP response (e.g., HTTP/1.1 200 OK + object)",
          "Step 6: (Non-persistent) Server closes TCP connection; (Persistent) connection stays open",
          "HTTP request line format: method SP URL SP version CRLF",
          "HTTP response status line format: version SP status-code SP phrase CRLF",
          "Common request headers: Host, Connection, User-Agent, Accept-Language",
          "Common response headers: Content-Type, Content-Length, Date, Last-Modified, Server"
        ],
        analogy: "HTTP request-response is like a drive-through order. You pull up (TCP connect), speak into the microphone 'GET large fries' (HTTP GET request). The server repeats your order back and hands it through the window with a receipt '200 OK — here are your fries and the nutritional info' (HTTP response with headers + body). Then you drive off (connection closed or kept open for next order).",
        visual: "sim-http-request"
      },
      quiz: [
        {
          id: "q-ch2-041",
          type: "mcq",
          question: "In the correct order, what are the first three steps of an HTTP transaction?",
          options: [
            "Send HTTP request → Open TCP connection → Receive HTTP response",
            "DNS lookup → Send HTTP request → Open TCP connection",
            "Open TCP connection → Server accepts → Client sends HTTP request",
            "Send HTTP request → Server sends response → TCP connection closed"
          ],
          answer: 2,
          explanation: "The correct order: (1) Client opens TCP connection to server port 80 (3-way handshake). (2) Server accepts the connection. (3) Client sends an HTTP request message. Then the server processes and sends a response. TCP must be established before any HTTP messages can be exchanged.",
          xpReward: 25
        },
        {
          id: "q-ch2-042",
          type: "mcq",
          question: "What does the HTTP response header 'Content-Type: text/html' communicate to the client?",
          options: [
            "The server's operating system type",
            "The format/media type of the response body so the client knows how to render it",
            "The maximum number of concurrent connections the server accepts",
            "The encoding used to compress the response body"
          ],
          answer: 1,
          explanation: "Content-Type tells the client what MIME type the response body is. 'text/html' means the body is an HTML document — the browser should render it as a web page. Other examples: 'image/jpeg', 'application/json', 'text/css'. Without this header, browsers would not know how to display the content.",
          xpReward: 25
        },
        {
          id: "q-ch2-043",
          type: "truefalse",
          question: "An HTTP GET request can include a message body to send data to the server.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. GET requests have no message body by convention. GET parameters are passed in the URL query string (e.g., ?search=networking). POST requests are used when data must be sent in the request body (e.g., form submissions, file uploads).",
          xpReward: 25
        },
        {
          id: "q-ch2-044",
          type: "match",
          question: "Match each HTTP component to its description.",
          pairs: [
            { term: "Request line",       definition: "Method + URL + HTTP version (first line of request)" },
            { term: "Status line",        definition: "HTTP version + status code + phrase (first line of response)" },
            { term: "Content-Length",     definition: "Response header indicating the size of the body in bytes" },
            { term: "Host header",        definition: "Request header specifying the server's domain name" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "Request line: 'GET /index.html HTTP/1.1'. Status line: 'HTTP/1.1 200 OK'. Content-Length tells the client how many bytes to read. Host is mandatory in HTTP/1.1 requests since multiple websites can share one IP address (virtual hosting).",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 12 — Email (SMTP, IMAP, POP3)
    ───────────────────────────────────────────── */
    {
      id: "ch2-email",
      title: "Electronic Mail (SMTP, IMAP, POP3)",
      xpReward: 10,
      content: {
        summary: "Electronic mail has three major components: user agents (email clients), mail servers, and SMTP (Simple Mail Transfer Protocol). SMTP pushes mail between servers. When you receive mail, you pull it from your mail server using IMAP or POP3. Email uses a store-and-forward architecture.",
        bullets: [
          "User agent: the mail client (Outlook, Gmail browser, Thunderbird) used to compose, read, and send email",
          "Mail server: holds the user's mailbox (incoming messages) and a message queue (outgoing messages)",
          "SMTP (Simple Mail Transfer Protocol): the protocol used to SEND email between mail servers (and from client to server)",
          "SMTP uses TCP port 25; it is a push protocol — the sender pushes mail to the recipient's server",
          "SMTP is ASCII text-based; messages use 7-bit ASCII; binary attachments are Base64-encoded (MIME)",
          "Mail access protocols: IMAP (Internet Message Access Protocol) and POP3 (Post Office Protocol v3)",
          "POP3: simple, downloads messages to client, typically deletes from server — 3 phases: authorization, transaction, update",
          "IMAP: more feature-rich, keeps messages on server, supports folders, partial fetch — preferred for multi-device access",
          "Sending path: user agent → sender's mail server (SMTP) → recipient's mail server (SMTP) → recipient retrieves via IMAP/POP3"
        ],
        analogy: "Email is like physical mail with two services. SMTP is the postal delivery driver — it picks up your outgoing letter and delivers it to the recipient's post office box (mail server). IMAP/POP3 is you checking your post office box — IMAP leaves copies at the post office (for multi-device access), POP3 lets you take everything home (to one device).",
        visual: "sim-client-server"
      },
      quiz: [
        {
          id: "q-ch2-045",
          type: "mcq",
          question: "What is the primary role of SMTP in the email system?",
          options: [
            "Retrieving email from a mail server to a user's client",
            "Encrypting email messages before transmission",
            "Pushing email messages from a sending mail server to a receiving mail server",
            "Storing email messages in a user's mailbox on the server"
          ],
          answer: 2,
          explanation: "SMTP is a push protocol used to transfer (push) email from a sender's mail server to the recipient's mail server. It runs over TCP port 25. SMTP is NOT used for retrieving mail — that's done by IMAP or POP3.",
          xpReward: 25
        },
        {
          id: "q-ch2-046",
          type: "truefalse",
          question: "IMAP is preferred over POP3 for users who access their email from multiple devices (phone, laptop, tablet).",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. IMAP keeps messages on the server and synchronizes state (read/unread, folders) across all devices. POP3 typically downloads and deletes messages to a single client, making multi-device access awkward. Modern email clients and webmail use IMAP.",
          xpReward: 25
        },
        {
          id: "q-ch2-047",
          type: "mcq",
          question: "Alice sends an email to Bob. Both use different mail servers. What is the correct sequence of events?",
          options: [
            "Alice's client → Bob's mail server (SMTP) → Bob's client (IMAP)",
            "Alice's client → Alice's mail server (SMTP) → Bob's mail server (SMTP) → Bob's client (IMAP)",
            "Alice's client (IMAP) → Alice's mail server → Bob's client (SMTP)",
            "Alice's mail server → Alice's client (SMTP) → Bob's mail server (IMAP)"
          ],
          answer: 1,
          explanation: "The correct email path: Alice's user agent sends to Alice's mail server via SMTP. Alice's mail server uses SMTP to push the message to Bob's mail server. Bob's user agent retrieves the message from Bob's mail server using IMAP or POP3. Two SMTP hops, then one pull (IMAP/POP3).",
          xpReward: 25
        },
        {
          id: "q-ch2-048",
          type: "match",
          question: "Match each email protocol or component to its role.",
          pairs: [
            { term: "SMTP",          definition: "Pushes email between mail servers (TCP port 25)" },
            { term: "IMAP",          definition: "Retrieves email from server; keeps messages on server for multi-device sync" },
            { term: "POP3",          definition: "Retrieves email by downloading to local client; typically removes from server" },
            { term: "User Agent",    definition: "Email client application (Outlook, Thunderbird, Gmail) used to compose and read email" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "SMTP pushes mail (server-to-server). IMAP pulls and syncs (multi-device). POP3 pulls and downloads (single device). The user agent is the human-facing interface. Together these components form the complete email infrastructure.",
          xpReward: 25
        }
      ]
    }

  ] // end sections
}; // end window.chapter2Data
