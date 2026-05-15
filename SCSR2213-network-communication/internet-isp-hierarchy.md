---
title: "Internet ISP Hierarchy"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Internet ISP Hierarchy

The Internet evolved into a multi-tier hierarchy of ISPs — access ISPs connect customers to regional ISPs, which connect to tier-1 ISPs at the core — all interconnected through commercial peering agreements and Internet Exchange Points (IXPs).

## Explanation

End systems connect to the Internet via **access ISPs** (residential, university, or corporate). But for any two hosts anywhere in the world to communicate, every access ISP must somehow be reachable from every other. This can't be solved by directly connecting every ISP to every other ISP — that would require O(N²) connections, which doesn't scale.

Instead, the Internet evolved a hierarchical structure:

**Tier-1 ISPs** (e.g., AT&T, Sprint, NTT, Level 3): Large national and international networks with global coverage. They peer with each other directly (often for free), forming the backbone of the Internet. There are only a small number of these.

**Regional ISPs** connect clusters of access ISPs to tier-1 ISPs, typically within a country or region. They pay tier-1 ISPs for transit.

**Access ISPs** (residential broadband, university networks, company intranets) connect end users and pay regional ISPs for connectivity.

**Internet Exchange Points (IXPs)** are physical locations where ISPs can peer directly with each other rather than routing traffic through a tier-1 ISP. This saves cost and reduces latency.

**Content Provider Networks** (e.g., Google, Akamai) build their own private global networks and connect directly to ISPs at multiple tiers, bypassing tier-1 ISPs for their own traffic to reduce cost and latency.

## Key Points

- Tier-1 ISPs: global backbone, peer for free with each other
- Regional ISPs: intermediate layer, pay tier-1 for transit
- Access ISPs: connect end users, pay regional ISPs
- IXPs: allow ISPs to peer directly, reducing cost and hops
- Content provider networks (Google, Akamai) bypass hierarchy for efficiency

## Example

When you in UTM (access ISP: university network) load a Google search:
1. Your packet goes from your device → campus router → regional ISP (e.g., TMNet) → Google's private network (which peers directly with TMNet at an IXP in Malaysia)
2. Google replies via the same path in reverse

Google avoids sending your result through a tier-1 ISP by maintaining its own global network with direct peering to regional ISPs.

## See Also

- [[internet-nuts-and-bolts-view|The Internet Is a Network of Networks]] — ISPs are the "networks of networks"
- [[packet-switching-store-and-forward|Packet Switching Forwards Data Across the Network Core]] — how data moves through these ISPs
