---
title: "Web Caching and Proxy Servers"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Web Caching and Proxy Servers

A web cache (proxy server) stores copies of recently requested objects close to clients, satisfying future requests for those objects locally without contacting the origin server, thereby reducing response time and traffic on the institutional access link.

## Explanation

A web cache sits between clients and the origin server. When a browser is configured to use a proxy, all HTTP requests go to the cache first:
- If the cache **has** the requested object (cache hit): it returns the copy immediately — very fast (LAN delay only)
- If the cache **does not have** it (cache miss): it forwards the request to the origin server, caches the response, then returns it to the client

Web caches act as both client (requesting from origin) and server (serving clients). They are typically installed by ISPs at the edge of their network.

**Why web caching matters — quantitative example:**
- Access link rate: 15 Mbps; average object size: 1 Mbit; request rate: 15 requests/sec
- Traffic intensity on access link = (15 req/s × 1 Mbit) / 15 Mbps = **1.0** → severe congestion → minutes of delay

Options:
1. **Upgrade the access link to 100 Mbps:** Traffic intensity drops to 15%, delay ≈ 2 sec (internet RTT). Works but is **expensive**.
2. **Install a local web cache with 40% hit rate:**
   - Only 60% of requests reach the access link → utilization = 60% × 15/15 = **60%**
   - Average delay = 0.6 × (2 sec internet delay) + 0.4 × (~milliseconds LAN) ≈ **1.2 sec**
   - **Cheaper** than upgrading the link, with lower delay

**Conditional GET:** To prevent caches from serving stale content, HTTP supports `If-Modified-Since:` headers. The cache sends a GET with the date it cached the object. If the object hasn't changed, the server replies `304 Not Modified` (no body) — saving bandwidth. If it has changed, the server replies `200 OK` with the new object.

## Key Points

- Web cache stores objects locally; serves hits without contacting origin server
- Reduces: response time for clients, traffic on access links
- Installed by ISPs, universities, companies
- Hit rate: fraction of requests served from cache
- Conditional GET (304 Not Modified): validates cached copy without re-downloading

## Example

Institution: access link 1.5 Mbps, average request rate = 15 req/s × 100 Kbits = 1.5 Mbps

Without cache: utilization = 1.5/1.5 = 100% → congestion → minutes of delay

With cache (40% hit rate):
- Requests to internet = 60% × 1.5 Mbps = 0.9 Mbps
- Utilization = 0.9 / 1.54 = **58%**
- Average delay = 0.6 × 2.01 s + 0.4 × ~0 ≈ **1.2 seconds**

## See Also

- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol for Web Object Transfer]] — HTTP fundamentals
- [[throughput-and-bottleneck-links|Throughput Is Constrained by the Bottleneck Link]] — access link utilization is a throughput concept
