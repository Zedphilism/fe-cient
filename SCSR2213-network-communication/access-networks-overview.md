---
title: "Access Networks"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Access Networks

An access network is the network that physically connects an end system (host) to the first router on the path toward any other distant end system — also called the "edge router."

## Explanation

The Internet has three structural regions: the network edge (where hosts live), the access network (the "last mile" connecting hosts to the network core), and the network core (interconnected routers). Access networks are what most people think of as their "Internet connection."

There are several major types of access network:

**DSL (Digital Subscriber Line):** Uses existing telephone copper wire from homes to the telephone company's central office. A DSLAM at the central office separates voice and data. DSL offers asymmetric speeds: typically under 2.5 Mbps upstream and under 24 Mbps downstream. It is a **dedicated** link (not shared with neighbors).

**Cable Network (HFC — Hybrid Fiber Coax):** Uses a shared coaxial cable network from the cable headend to homes. The medium is **shared** among many users. It provides asymmetric speeds: up to 30 Mbps downstream, 2 Mbps upstream. Frequency Division Multiplexing (FDM) separates TV, data, and voice channels.

**Ethernet (Enterprise):** Wired LANs in companies and universities connecting end systems to institutional switches at 10 Mbps to 10 Gbps.

**Wireless (WiFi / Cellular):** WiFi (802.11) provides access within a building (~100 ft), typically at 11–450 Mbps. 4G/LTE cellular provides wide-area wireless access via base stations across tens of kilometers at 1–10 Mbps.

Key questions about any access network: What is its **bandwidth** (bits per second)? Is it **shared** or **dedicated**?

## Key Points

- DSL: uses phone line, dedicated, asymmetric (<24 Mbps down / <2.5 Mbps up)
- Cable/HFC: shared medium, asymmetric (up to 30 Mbps down / 2 Mbps up)
- Ethernet: enterprise wired, 10 Mbps – 10 Gbps
- WiFi (802.11b/g/n): 11/54/450 Mbps, within building
- 4G LTE: 1–10 Mbps, wide-area cellular

## Example

At UTM, the campus Ethernet connects your laptop to the institutional switch at 1 Gbps (dedicated). That switch connects to the ISP via the institutional router — this router is your "edge router." The cabling from your device to that first router is the access network.

## See Also

- [[internet-nuts-and-bolts-view|The Internet Is a Network of Networks]] — access networks connect to the network core
- [[physical-media-types|Physical Media Carry Bits as Guided or Unguided Signals]] — what the wires/wireless actually are
- [[packet-switching-store-and-forward|Packet Switching Uses Store-and-Forward Across the Network Core]] — what happens after the access network
