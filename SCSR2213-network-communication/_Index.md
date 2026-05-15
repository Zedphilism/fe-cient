---
title: "SCSR2213 — Network Communication"
date: 2026-04-18
tags: [hub, semester-3, networking, scsr2213]
---

# SCSR2213 — Network Communication

Topics: Protocols, OSI model, TCP/IP, HTTP, DNS, email, packet switching, network architecture.

Source: *Computer Networking: A Top-Down Approach*, Kurose & Ross (7th/8th Ed.)

---

## Chapter 1 — Introduction to Computer Networks

### The Internet

- [[internet-nuts-and-bolts-view|The Internet: Nuts and Bolts View]]
- [[internet-service-view|The Internet: Service View]]
- [[network-protocols-defined|What Is a Protocol?]]
- [[internet-isp-hierarchy|Internet ISP Hierarchy]]

### Access Networks & Physical Media

- [[access-networks-overview|Access Networks]]
- [[physical-media-types|Physical Media Types]]

### Network Core

- [[packet-switching-store-and-forward|Packet Switching: Store and Forward]]
- [[circuit-switching-fdm-tdm|Circuit Switching: FDM and TDM]]
- [[packet-vs-circuit-switching|Packet Switching vs Circuit Switching]]

### Performance

- [[four-sources-of-packet-delay|Four Sources of Packet Delay]]
- [[throughput-and-bottleneck-links|Throughput and Bottleneck Links]]

### Protocol Layers

- [[osi-model-seven-layers|OSI Model: Seven Layers]]
- [[tcp-ip-internet-stack|TCP/IP Internet Stack]]
- [[encapsulation-in-protocol-layers|Encapsulation in Protocol Layers]]

### Security

- [[network-security-threats|Network Security Threats]]

---

## Chapter 2 — Application Layer

### Application Architecture

- [[client-server-vs-p2p-architecture|Client-Server vs P2P Architecture]]

### HTTP & The Web

- [[http-stateless-protocol|HTTP: Stateless Protocol]]
- [[http-persistent-vs-non-persistent|HTTP: Persistent vs Non-Persistent Connections]]
- [[http-cookies-for-state|HTTP Cookies]]
- [[web-caching-proxy-servers|Web Caching and Proxy Servers]]

### Email

- [[smtp-email-protocol|SMTP, POP3, and IMAP]]

### DNS

- [[dns-hierarchy-and-resolution|DNS: Hierarchy and Resolution]]
- [[dns-resource-records|DNS Resource Records]]

### P2P & Video Streaming

- [[bittorrent-p2p-file-sharing|BitTorrent: P2P File Sharing]]
- [[dash-adaptive-video-streaming|DASH: Adaptive Video Streaming]]

---

## Chapter 3 — Transport Layer

### Transport Layer Fundamentals

- [[transport-layer-vs-network-layer|Transport Layer vs Network Layer]]
- [[multiplexing-and-demultiplexing|Multiplexing and Demultiplexing]]

### UDP

- [[udp-connectionless-transport|UDP: Connectionless Transport]]
- [[checksum-process|Checksum Process]]
- [[checksum-exam-style|Checksum: Exam-Style Worked Example]]

### Reliable Data Transfer

- [[reliable-data-transfer-principles|Principles of Reliable Data Transfer]]
- [[rdt-1-0-to-3-0|rdt 1.0 to rdt 3.0: Detailed Process]]
- [[stop-and-wait-protocol|Stop-and-Wait Protocol]]
- [[go-back-n-vs-selective-repeat|Go-Back-N and Selective Repeat]]

### TCP

- [[tcp-connection-oriented-transport|TCP: Connection-Oriented Transport]]
- [[tcp-segment-structure|TCP Segment Structure]]
- [[tcp-rtt-estimation-and-timeout|TCP RTT Estimation and Timeout]]
- [[tcp-fast-retransmit|TCP Fast Retransmit]]
- [[tcp-flow-control|TCP Flow Control]]
- [[tcp-three-way-handshake|TCP: Three-Way Handshake and Close]]

### Congestion Control

- [[congestion-control-principles|Principles of Congestion Control]]
- [[tcp-congestion-control|TCP Congestion Control]]

### Evolution

- [[transport-layer-evolution|Evolution of Transport Layer Functionality]]

---

## Chapter 4 — Network Layer: Data Plane

### Forwarding and Router Architecture

- [[network-layer-data-vs-control-plane|Data Plane vs Control Plane]]
- [[router-architecture-overview|Router Architecture]]

### IP: The Internet Protocol

- [[ip-datagram-format|IP Datagram Format]]
- [[ip-fragmentation-and-reassembly|IP Fragmentation and Reassembly]]
- [[ipv4-addressing-and-subnets|IPv4 Addressing and Subnets]]
- [[subnetting-cidr-vs-classful|CIDR vs Classful Addressing]]

### Network Configuration

- [[dhcp-dynamic-host-configuration|DHCP: Dynamic Host Configuration]]
- [[nat-network-address-translation|NAT: Network Address Translation]]
- [[ipv6-addressing-and-format|IPv6: Addressing and Format]]

---

## Chapter 5 — Network Layer: Control Plane

### Routing Algorithms

- [[link-state-routing-dijkstra|Link-State Routing: Dijkstra's Algorithm]]
- [[distance-vector-routing-bellman-ford|Distance-Vector Routing: Bellman-Ford]]

### Internet Routing Protocols

- [[ospf-intra-as-routing|OSPF: Intra-AS Routing]]
- [[bgp-inter-as-routing|BGP: Inter-AS Routing]]

### SDN and ICMP

- [[sdn-control-plane|SDN: Software-Defined Networking]]
- [[icmp-internet-control-message-protocol|ICMP: Internet Control Message Protocol]]

---

## See Also

- [[Glossary/_Index|Glossary]]
- [[semester-03/SECR1013-digital-logic/_Index|Digital Logic]] — hardware layer underpins network hardware
- [[semester-03/SECI1113-computational-mathematic/_Index|Computational Mathematics]] — binary/hex used in addressing
