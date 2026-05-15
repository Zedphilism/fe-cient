---
title: "The Internet: Service View"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# The Internet: Service View

From a services perspective, the Internet is an infrastructure that provides communication services to distributed applications, exposing a programming interface (API) through which those applications send and receive data.

## Explanation

While the "nuts and bolts" view describes the Internet's hardware, the **service view** describes what the Internet does for applications. Email, web browsing, video streaming, VoIP, social networks, and peer-to-peer file sharing all exist because the Internet provides a reliable delivery service between communicating end systems.

Applications that use the Internet are called **distributed applications** because they involve multiple end systems exchanging data — a web browser on your laptop and a web server in a data center are both part of the same application. These applications don't run inside the network core (routers, switches); they run only on end systems.

Developers access the Internet through a **socket API** (Application Programming Interface), which defines how an application program can ask the Internet infrastructure to deliver data to another application running on a remote end system. This is analogous to a postal service API: you provide the address and payload, the service takes care of the delivery.

## Key Points

- Internet = infrastructure providing services to distributed apps
- Distributed apps involve multiple end systems exchanging data
- Apps run on end systems only, never inside network-core routers
- Socket API is the programming interface between app and network

## Example

Netflix is a distributed application. The Netflix server stores video; your smart TV or browser is the other endpoint. Both communicate over the Internet's infrastructure. Netflix developers used the socket API to write code that sends encoded video chunks from servers to clients — they didn't need to know how routers inside the Internet actually forward data.

## See Also

- [[internet-nuts-and-bolts-view|The Internet Is a Network of Networks]] — the hardware/software perspective
- [[network-protocols-defined|Protocols Govern All Network Communication]] — how communication rules are defined
- [[client-server-vs-p2p-architecture|Application Architectures Are Either Client-Server or P2P]] — how distributed apps are structured
