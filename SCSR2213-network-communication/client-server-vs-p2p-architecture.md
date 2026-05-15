---
title: "Client-Server vs P2P Architecture"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Client-Server vs P2P Architecture

The two dominant paradigms for structuring distributed network applications are client-server, where an always-on server handles requests from many clients, and peer-to-peer (P2P), where end systems communicate directly with each other without a dedicated server.

## Explanation

When building a network application, a developer must choose how to structure communication between the end systems involved. The two main paradigms are:

**Client-Server Architecture:** There is one (or a cluster of) always-on host(s) called the **server** with a permanent, well-known IP address. Many **clients** contact the server to request services. Clients do not communicate directly with each other — all traffic goes through the server. This model is simple and easy to manage, but the server is a single point of bottleneck and failure. Popular Internet applications: HTTP (web), IMAP (email), FTP (file transfer). For scale, companies run **data centers** housing hundreds of thousands of servers that collectively act as one powerful virtual server.

**Peer-to-Peer (P2P) Architecture:** There is no always-on dedicated server. Arbitrary end systems (**peers**) communicate directly with each other. Each peer both requests services from others and provides services in return. P2P is **self-scaling**: as more peers join, they bring not only more demand but also more capacity to serve that demand. This makes P2P extremely efficient for large-scale file distribution. The trade-off is complex management and dynamic IP addressing. Examples: BitTorrent (file sharing), Skype (VoIP), KanKan (streaming).

Note that some applications are hybrid: they use a server for peer discovery but then communicate P2P.

## Key Points

- Client-server: always-on server with permanent IP; clients do not talk to each other
- P2P: no dedicated server; peers communicate directly and self-scale
- Data centers: clusters of servers providing horizontal scalability for client-server apps
- P2P advantage: self-scaling; P2P challenge: complex management, intermittent peers
- Hybrid: server assists in peer discovery, then P2P communication

## Example

| | Client-Server | P2P |
|--|----------------|-----|
| Web browsing (HTTP) | ✓ Your browser → web server | ✗ |
| Email (IMAP) | ✓ Mail client → mail server | ✗ |
| BitTorrent | ✗ | ✓ Peers exchange file chunks directly |
| Skype (legacy) | Partial (login server) | ✓ Voice calls go P2P |

## See Also

- [[internet-service-view|The Internet Provides a Programmable Infrastructure for Distributed Applications]] — apps use the Internet as infrastructure
- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol for Web Object Transfer]] — classic client-server example
- [[bittorrent-p2p-file-sharing|BitTorrent Uses Rarest-First Chunk Exchange and Tit-for-Tat Incentives]] — classic P2P example
