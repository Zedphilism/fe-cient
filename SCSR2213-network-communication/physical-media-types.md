---
title: "Physical Media Types"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Physical Media Types

Physical media are the actual physical substances through which bits propagate between a transmitter and a receiver, classified as guided (signals travel through a solid medium) or unguided (signals propagate freely through the air).

## Explanation

Between any transmitter-receiver pair lies a **physical link** — the medium that carries bits. There are two categories:

**Guided media** — signals travel through a constrained physical path:

- **Twisted Pair (TP):** Two insulated copper wires twisted together. Category 5 supports 100 Mbps and 1 Gbps Ethernet; Category 6 supports 10 Gbps. The cheapest and most common wired medium.
- **Coaxial Cable:** Two concentric copper conductors. Bidirectional and broadband, supports multiple frequency channels simultaneously (HFC cable networks). More shielding than twisted pair.
- **Fiber Optic Cable:** Carries light pulses, each pulse representing one bit. Extremely high-speed (tens to hundreds of Gbps), very low error rate (immune to electromagnetic interference), and repeaters can be spaced far apart. Used in long-haul links (trans-oceanic cables, backbone networks).

**Unguided media** — signals propagate freely through the atmosphere or space:

- **Terrestrial Microwave:** Line-of-sight microwave beams, up to ~45 Mbps per channel.
- **WiFi (802.11 LAN):** ~54 Mbps within a building.
- **4G Cellular:** ~10 Mbps over wide areas.
- **Satellite:** Kbps to 45 Mbps channels, but with ~270 ms end-to-end propagation delay (geostationary orbit). Low Earth orbit (LEO) satellites have much lower latency.

## Key Points

- Guided: twisted pair, coaxial cable, fiber optic
- Unguided: microwave, WiFi, cellular, satellite
- Fiber: highest speed, lowest error, immune to EM noise
- Satellite: wide coverage but high latency (~270 ms)
- Bandwidth = transmission rate (bits/second) of a link

## Example

| Medium | Typical Speed | Key Property |
|--------|--------------|--------------|
| Cat 5e twisted pair | 1 Gbps | Cheap, common in LANs |
| HFC coaxial | 30 Mbps down | Shared, broadband |
| Fiber optic | 100+ Gbps | Long haul, low error |
| WiFi (802.11n) | 450 Mbps | Wireless, within building |
| 4G LTE | ~10 Mbps | Wide-area mobile |

## See Also

- [[access-networks-overview|Access Networks Connect End Systems to the Edge Router]] — which media are used in which access types
- [[internet-nuts-and-bolts-view|The Internet Is a Network of Networks]] — communication links are a core Internet component
