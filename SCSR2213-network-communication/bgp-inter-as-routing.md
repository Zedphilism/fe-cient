---
title: "BGP: Inter-AS Routing"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# BGP: Inter-AS Routing

BGP (Border Gateway Protocol) is the policy-driven path-vector routing protocol used between Autonomous Systems (ASes) — it advertises IP prefixes reachable through each AS and selects routes based on business relationships and policy rather than purely on cost.

> [!concept] Core Claim
> BGP is the "glue of the Internet" — it connects thousands of independently administered ASes into a single reachable network, with each AS controlling which routes it accepts, uses, and re-advertises based on commercial policy.

## Explanation

The Internet is divided into **Autonomous Systems (ASes)** — networks under a single administrative authority (an ISP, university, or enterprise), each with a globally unique AS Number (ASN). Within an AS, intra-AS protocols like OSPF handle routing. BGP handles routing between ASes.

BGP uses **eBGP (external BGP)** sessions between border routers of neighbouring ASes to exchange reachability information — specifically, which IP prefixes are reachable through each AS and the **AS path** (sequence of AS numbers the advertisement has traversed). eBGP sessions run over TCP port 179. Once a border router learns a route via eBGP, it uses **iBGP (internal BGP)** sessions to distribute that route to all other routers within the same AS.

BGP advertises **path attributes** alongside each prefix. The most important are: **AS-PATH** (the list of ASes the advertisement has passed through — used for loop detection and route selection); **NEXT-HOP** (the IP address of the border router from which the path begins — used for iBGP to BGP interaction); and **LOCAL-PREF** (an intra-AS preference value, not exported, used to choose among multiple BGP-learned routes within the AS).

Route selection follows a priority order: highest LOCAL-PREF → shortest AS-PATH → closest NEXT-HOP (hot-potato routing) → tie-breaking rules. This lets each AS implement **routing policy** — preferring customers over peers over providers, or blocking traffic from certain ASes entirely. No cost-optimal algorithm runs here; policy dominates.

## Key Points

- BGP: inter-AS (EGP), path-vector protocol, TCP port 179
- eBGP: between border routers of different ASes — exchange prefix reachability
- iBGP: within an AS — distribute externally learned routes to all routers
- AS-PATH: list of ASes traversed; loop detection + route selection
- LOCAL-PREF: policy attribute; determines preferred exit point within AS
- NEXT-HOP: border router IP; links BGP route to intra-AS forwarding
- Hot-potato routing: prefer the closest (lowest IGP cost) exit point for a prefix

## Example

AS1 (a customer ISP) connects to AS2 (a provider) and AS3 (another provider). AS1 sets LOCAL-PREF = 200 for routes learned from AS2 and LOCAL-PREF = 100 for AS3. All traffic is routed through AS2 by default. If AS2's link fails, BGP reconverges and AS1 routes through AS3 (LOCAL-PREF = 100 now wins). The business reason: AS2 gives AS1 a cheaper rate, so AS1 prefers it.

> [!recall] What is the difference between eBGP and iBGP, and why does BGP use policy rather than cost as its primary routing criterion?

## See Also

- [[ospf-intra-as-routing|OSPF Is a Link-State Intra-AS Routing Protocol with Hierarchical Areas]]
- [[distance-vector-routing-bellman-ford|Distance-Vector Routing Uses the Bellman-Ford Equation to Compute Paths Iteratively]]
- [[internet-isp-hierarchy|The Internet Has a Hierarchical ISP Structure with Tier-1 ISPs at the Core]]
