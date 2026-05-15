---
title: "The Internet: Nuts and Bolts View"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# The Internet: Nuts and Bolts View

The Internet is a global system of billions of interconnected computing devices that communicate using a shared set of rules called protocols.

## Explanation

From a hardware and software ("nuts and bolts") perspective, the Internet consists of three fundamental building blocks. First, **end systems** (also called hosts) are the devices at the edges — PCs, smartphones, servers, IoT devices — that run network applications. Second, **communication links** carry bits between devices; these include fiber-optic cable, copper wire, radio, and satellite, each with a rated transmission speed called bandwidth. Third, **packet switches** (routers and link-layer switches) forward chunks of data called packets toward their destinations.

The Internet is called a "network of networks" because no single organization owns it all. Instead, billions of devices connect through access networks, which connect to regional ISPs, which connect to global (tier-1) ISPs, all interconnected at Internet Exchange Points (IXPs). Every piece of the Internet runs **protocols** — most importantly TCP and IP — that define how data is formatted, addressed, transmitted, and received.

Standards that govern these protocols are published as **RFCs** (Requests for Comments) by the **IETF** (Internet Engineering Task Force), ensuring that devices from different manufacturers can communicate.

## Key Points

- Hosts = end systems (clients and servers running apps)
- Communication links have a transmission rate measured in bits per second (bps)
- Routers and switches forward packets from input to output
- TCP/IP are the two most important protocols
- RFCs and the IETF define Internet standards

## Example

A smartphone (host) sends an HTTP request over a WiFi link (communication link) to a home router (packet switch), which forwards it over a cable modem link to the ISP, which routes it through tier-1 ISPs until it reaches the destination web server (another host). Every device along this path uses TCP/IP protocols to interpret and forward the packet.

## See Also

- [[internet-service-view|The Internet as a Service Platform]] — the other way to define the Internet
- [[network-protocols-defined|Protocols Govern All Network Communication]] — what protocols are
- [[internet-isp-hierarchy|The Internet Has a Hierarchical ISP Structure]] — how ISPs interconnect
