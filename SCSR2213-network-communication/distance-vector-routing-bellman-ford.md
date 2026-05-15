---
title: "Distance-Vector Routing: Bellman-Ford"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Distance-Vector Routing: Bellman-Ford

In distance-vector routing, each router maintains a table of estimated costs to all destinations, shares this table only with direct neighbors, and iteratively updates its estimates using the Bellman-Ford equation until the network converges — without any router having global topology knowledge.

> [!concept] Core Claim
> Distance-vector routing is decentralized — each router knows only its neighbor costs and its neighbors' distance vectors — but converges to correct shortest paths through iterative local updates.

## Explanation

Each router x maintains a **distance vector (DV)**: a table `D_x(y)` for every destination y, representing x's current best estimate of the cost to reach y. Initially, `D_x(x) = 0` and `D_x(y) = ∞` for all non-neighbors; `D_x(v) = c(x,v)` for each directly connected neighbor v.

Routers periodically send their DV to all direct neighbors. When router x receives a DV from neighbor v, it applies the **Bellman-Ford equation**:

**D_x(y) = min_v { c(x,v) + D_v(y) }** for all destinations y

If any `D_x(y)` decreases, x sends its updated DV to neighbors. This continues until no router has any updates — **convergence**. At convergence, the distance vectors contain the true shortest-path costs.

**Count-to-infinity problem:** when a link cost increases or a node fails, bad news propagates slowly. Suppose A→B→C and A-B link fails. B still thinks it can reach A via C (which thinks it can reach A via B). B sets D_B(A) = D_C(A) + 1 = 3, C updates to 4, B to 5… This loop increments indefinitely until it exceeds ∞ (some max value). Mitigations include **split horizon** (don't advertise a route back to the neighbor you learned it from) and **poison reverse** (advertise the route back with cost ∞).

RIP (Routing Information Protocol) is the classic distance-vector intra-AS protocol, using hop count as the metric and max 15 hops (16 = ∞).

## Key Points

- Distance vector: estimated cost from this router to every destination
- Bellman-Ford: D_x(y) = min_v { c(x,v) + D_v(y) }
- Only shares DV with direct neighbors (not global broadcast)
- Converges through iterative asynchronous updates
- Count-to-infinity: slow convergence on bad news; fix with split horizon / poison reverse
- RIP: DV protocol, hop count metric, max 15 hops

## Example

Three routers A-B-C in a line: A-B cost 1, B-C cost 2. Initially: D_A(C)=∞, D_B(C)=2. After A receives B's DV: D_A(C) = min{c(A,B) + D_B(C)} = min{1+2} = 3. A updates its DV and sends to B. B sees no improvement. Converged: D_A(C)=3, D_B(C)=2, D_C(C)=0.

> [!recall] What is the count-to-infinity problem and what does poison reverse do to mitigate it?

## See Also

- [[link-state-routing-dijkstra|Link-State Routing Uses Dijkstra's Algorithm on a Global Topology Map]]
- [[ospf-intra-as-routing|OSPF Is a Link-State Intra-AS Routing Protocol with Hierarchical Areas]]
- [[bgp-inter-as-routing|BGP Is the Inter-AS Routing Protocol That Connects the Internet's Autonomous Systems]]
