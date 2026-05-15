---
title: "OSI Model: Seven Layers"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# OSI Model: Seven Layers

The OSI (Open Systems Interconnection) reference model is a conceptual framework that divides network communication into seven layers, each responsible for a specific function and each relying only on services provided by the layer below it.

## Explanation

The OSI model was developed by ISO (International Organization for Standardization) to provide a universal framework for how different network systems can interoperate. Networks are complex; layering is the engineering response to this complexity. Each layer provides a service to the layer above it and consumes a service from the layer below. A change in one layer's implementation does not affect the others — this is the principle of **modularity**.

The seven layers (from highest to lowest):

| # | Layer | Data Unit | Function |
|---|-------|-----------|----------|
| 7 | Application | Data | Network process to application (HTTP, FTP, SMTP, DNS) |
| 6 | Presentation | Data | Data translation, encryption/decryption, compression |
| 5 | Session | Data | Establish, manage, and terminate sessions between applications |
| 4 | Transport | Segment | Reliable end-to-end delivery (TCP) or fast delivery (UDP) |
| 3 | Network | Packet/Datagram | Logical addressing and routing (IP) |
| 2 | Data Link | Frame | Reliable point-to-point delivery over one link (Ethernet, WiFi) |
| 1 | Physical | Bit | Transmit raw bits over a physical medium |

The top three layers (Application, Presentation, Session) are **host layers** — implemented only in end systems. The bottom two (Physical, Data Link) are **media layers** — implemented in network hardware. The Transport and Network layers bridge host and media.

The **Internet's TCP/IP model** does not implement separate Presentation and Session layers; those functions, if needed, are handled within the Application layer itself.

## Key Points

- 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application
- Each layer serves the layer above and uses the layer below
- Modularity: change one layer without affecting others
- OSI is a conceptual model; the Internet uses the simpler TCP/IP 5-layer model
- Session and Presentation are absent from the Internet stack

## Example

The bicycle shipping analogy: sending a bicycle from Tokyo to UTM Johor Bahru.
- **Application (7):** You decide to send the bicycle (the "application" using the service)
- **Presentation (6):** You get instructions on how to disassemble and reassemble it
- **Session (5):** You call your friend to confirm the address and agree on the exchange
- **Transport (4):** You disassemble the bike into 3 boxes labeled "1 of 3", "2 of 3", "3 of 3"
- **Network (3):** You label each box with destination (UTM) and return address (Tokyo)
- **Data Link (2):** The Tokyo post office takes possession and handles local delivery
- **Physical (1):** The boxes are physically flown from Tokyo to JB

## See Also

- [[tcp-ip-internet-stack|The TCP/IP Stack Is the Internet's Five-Layer Protocol Architecture]] — the practical model used on the Internet
- [[network-protocols-defined|Protocols Govern All Network Communication]] — each layer has its own protocols
- [[encapsulation-in-protocol-layers|Each Layer Wraps Data with Its Own Header During Encapsulation]] — how layers communicate
