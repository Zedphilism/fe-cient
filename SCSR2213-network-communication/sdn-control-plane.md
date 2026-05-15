---
title: "SDN: Software-Defined Networking"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# SDN: Software-Defined Networking

Software-Defined Networking (SDN) physically separates the routing control plane from forwarding hardware by moving routing logic to a logically centralised remote controller, which computes flow tables and installs them in switches via a standardised protocol such as OpenFlow.

> [!concept] Core Claim
> SDN makes networks programmable by removing intelligence from individual routers — a central controller has a global view, computes optimal forwarding rules, and pushes them to dumb but fast forwarding devices.

## Explanation

Traditional IP routing is **distributed**: each router runs its own routing algorithm (OSPF, BGP), computes its own forwarding table, and makes independent decisions. This is resilient but inflexible — changing routing policy requires touching every router's configuration.

In SDN, the network is divided into a **data plane** (forwarding switches with no routing intelligence) and a **control plane** (a remote SDN controller with a network-wide view). Switches communicate with the controller via a **southbound API** — OpenFlow is the standard protocol, running over TCP. The controller computes flow tables (match-action rules: "if destination = 10.0.0.1, forward to port 3") and installs them in each switch.

The controller itself is accessed by network management applications (traffic engineering, firewalls, load balancers) via a **northbound API** (typically REST/gRPC). Applications call the controller's API to express high-level policies, which the controller translates into flow table entries.

OpenFlow rules can match on many header fields (IP src/dst, TCP/UDP ports, MAC addresses, VLAN tags) and perform actions (forward, drop, modify headers, flood). This generality makes SDN flow tables more powerful than traditional forwarding tables.

To survive controller failure, production SDN deployments run **multiple distributed controllers** that maintain consistency using distributed state protocols (like ONOS's Raft-based store). Each switch has a **Control Agent (CA)** that maintains the controller connection and locally applies the installed flow table even if the controller is temporarily unreachable.

## Key Points

- SDN: logically centralized control plane (remote controller) + dumb forwarding switches
- Data plane: switches execute match-action flow tables, no routing intelligence
- Southbound API (OpenFlow): controller installs flow entries in switches via TCP
- Northbound API: network apps (TE, firewall, LB) program the controller
- OpenFlow match fields: IP, TCP/UDP, MAC, VLAN — more flexible than IP forwarding tables
- Controller failure: handled by distributed multi-controller architecture

## Example

A campus SDN network uses an ONOS controller. A network admin writes a Python script that calls the northbound REST API: "block all traffic from VLAN 30 to subnet 10.5.0.0/24." The controller translates this into OpenFlow rules and installs "match: src-vlan=30, dst=10.5.0.0/24 → action: drop" on every switch in the path — in seconds, without logging into any individual switch.

> [!recall] What are the southbound and northbound APIs in an SDN architecture, and what communicates through each?

## See Also

- [[network-layer-data-vs-control-plane|The Network Layer Has Two Planes — Data Plane Forwards, Control Plane Routes]]
- [[link-state-routing-dijkstra|Link-State Routing Uses Dijkstra's Algorithm on a Global Topology Map]]
- [[router-architecture-overview|A Router Has Input Ports, a Switching Fabric, and Output Ports]]
