---
title: "Link-State Routing: Dijkstra's Algorithm"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Link-State Routing: Dijkstra's Algorithm

In link-state routing, every router floods the entire network with its local link-state advertisements (LSAs), so each router builds a complete topology map and independently runs Dijkstra's shortest-path algorithm to compute the minimum-cost path to every destination.

> [!concept] Core Claim
> Link-state routing achieves consistent, loop-free paths by giving every router identical, complete network knowledge — the cost is O(n²) computation and O(n·E) message overhead to flood the topology.

## Explanation

Each router periodically (and on topology change) broadcasts a **Link-State Advertisement (LSA)** containing its identity and the cost of each of its directly attached links. All routers flood these LSAs throughout the network, so after the flooding converges, every router has an identical **link-state database** representing the complete network graph.

Each router then runs **Dijkstra's algorithm** on this graph. Dijkstra iteratively selects the not-yet-settled node with the minimum known distance, updates distances to its neighbors, and repeats until all nodes are settled. The result is the **shortest-path tree** rooted at this router, from which the forwarding table is derived.

**Complexity:** Dijkstra's algorithm with a simple implementation runs in O(n²) time for n nodes. With a priority-queue implementation it is O(E log n). The flooding requires each router to send O(n) LSAs and receive O(n·E) messages network-wide.

**Oscillation problem:** if link costs are based on traffic load, all routers may simultaneously reroute to the same low-load path, creating a new high-load path, then reroute again — a routing oscillation. Solutions include randomising LSA send times.

OSPF (Open Shortest Path First) is the standard link-state intra-AS protocol used in the Internet.

## Key Points

- Each router broadcasts LSAs describing its local links and costs
- All routers build an identical complete topology database (link-state database)
- Dijkstra's algorithm: O(n²) basic, O(E log n) with priority queue
- Produces a shortest-path tree → forwarding table
- Messages: O(n) LSAs per router, O(n·E) total flooding overhead
- Oscillation risk when link costs reflect current traffic load

## Example

A 4-node network: A-B cost 1, A-C cost 3, B-C cost 1, B-D cost 2, C-D cost 1. Running Dijkstra from A: settle A(0), then B(1), then C(2 via B), then D(3 via C). Shortest path A→D: A→B→C→D cost 3, not A→B→D cost 3 (tie) or A→C→D cost 4. The forwarding table at A says: send to D via B.

> [!recall] What information does each router flood in link-state routing, and what does every router do with this information?

## See Also

- [[distance-vector-routing-bellman-ford|Distance-Vector Routing Uses the Bellman-Ford Equation to Compute Paths Iteratively]]
- [[ospf-intra-as-routing|OSPF Is a Link-State Intra-AS Routing Protocol with Hierarchical Areas]]
- [[network-layer-data-vs-control-plane|The Network Layer Has Two Planes — Data Plane Forwards, Control Plane Routes]]
