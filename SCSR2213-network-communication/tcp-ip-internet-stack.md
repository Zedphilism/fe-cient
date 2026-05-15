---
title: "TCP/IP Internet Stack"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# TCP/IP Internet Stack

The Internet protocol stack is a five-layer architecture — Application, Transport, Network, Link, and Physical — where each layer performs a distinct function and communicates with its peer layer on the remote host through protocol rules.

## Explanation

TCP/IP was developed by ARPA in the 1960s to build a resilient packet-switched network. Today it is the definitive protocol suite governing all Internet communication. Unlike the OSI model's seven layers, the Internet stack collapses Presentation and Session into the Application layer, resulting in five layers:

**Layer 5 — Application:** Where network applications and their protocols live. HTTP (web), FTP (file transfer), SMTP (email), DNS (name resolution). The application layer is where developers write software; it exchanges **messages**.

**Layer 4 — Transport:** Provides process-to-process data delivery between applications on different hosts. TCP (reliable, connection-oriented, flow and congestion control) and UDP (unreliable, connectionless, fast). Operates on **segments**.

**Layer 3 — Network:** Routes **datagrams** (packets) from source to destination across multiple networks. The primary protocol is IP. Routing protocols (OSPF, BGP) determine paths. Every datagram carries source and destination IP addresses.

**Layer 2 — Data Link:** Transfers a **frame** between two adjacent nodes on the same link (e.g., one Ethernet segment or one WiFi hop). Protocols: Ethernet, 802.11 (WiFi), PPP. Handles MAC addressing.

**Layer 1 — Physical:** Moves individual **bits** over the physical medium. Defines electrical/optical/radio signals, voltages, and connectors. No addressing — just raw bit streams.

Each layer adds its own **header** to the data it receives from above, a process called **encapsulation**. At the receiver, headers are stripped off layer by layer.

## Key Points

- 5 layers: Application, Transport, Network, Link, Physical
- Application: HTTP, FTP, SMTP, DNS — messages
- Transport: TCP, UDP — segments
- Network: IP, routing protocols — datagrams
- Link: Ethernet, WiFi — frames
- Physical: bits on the wire

## Example

When you send an HTTP GET request:
1. **Application layer** creates an HTTP message
2. **Transport layer (TCP)** encapsulates it into a TCP segment (adds TCP header with port numbers)
3. **Network layer (IP)** encapsulates into an IP datagram (adds source/destination IP addresses)
4. **Link layer** encapsulates into a frame (adds MAC addresses for next hop)
5. **Physical layer** converts frame bits to electrical/optical/radio signals on the wire

At the receiving server, each layer strips its header and passes the payload up.

## See Also

- [[osi-model-seven-layers|The OSI Model Organises Network Communication into Seven Layers]] — the 7-layer reference model
- [[encapsulation-in-protocol-layers|Each Layer Wraps Data with Its Own Header During Encapsulation]] — how headers are added/removed
- [[network-protocols-defined|Protocols Govern All Network Communication]] — protocols at each layer
