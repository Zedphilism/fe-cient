---
title: "DNS: Hierarchy and Resolution"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# DNS: Hierarchy and Resolution

DNS (Domain Name System) is a distributed database implemented across a hierarchy of name servers that translates human-readable hostnames (like www.utm.my) to machine-usable 32-bit IP addresses.

## Explanation

Humans prefer to remember hostnames; routers require IP addresses. DNS bridges this gap. It is implemented as an **application-layer protocol** running on top of UDP (port 53), but its effect is used by virtually every other Internet application.

A single centralised DNS would not scale (single point of failure, too much traffic, maintenance nightmare). Instead, DNS uses a **distributed hierarchical database** with three levels:

**Root DNS Servers:** 13 logical root servers (each replicated many times, ~200+ physical servers worldwide). They are the last resort — they know the authoritative TLD servers for every top-level domain.

**Top-Level Domain (TLD) Servers:** Handle .com, .org, .net, .edu, country codes (.my, .uk, .jp). For example, VeriSign manages .com and .net TLD servers.

**Authoritative DNS Servers:** An organisation's own DNS server(s) that provide the definitive hostname-to-IP mappings for that organisation's hosts (e.g., dns.utm.my knows the IP of www.utm.my).

**Local DNS Server (Default Name Server):** Every ISP and institution has a local DNS server. When a host queries DNS, the query goes to the local DNS server first. The local server either answers from cache or queries the hierarchy on behalf of the client.

**Iterated vs Recursive Resolution:**
- **Iterated:** The local DNS server contacts each level (root → TLD → authoritative) independently. Each server responds with the address of the next server to contact. Less burden on upper servers.
- **Recursive:** Each server contacts the next level on behalf of the client, returning the final answer up the chain. Places heavy load on upper-level servers.

**Caching:** Any name server that learns a mapping caches it for a TTL (time-to-live) period. This drastically reduces DNS traffic — root servers are rarely contacted because TLD server addresses are cached everywhere.

## Key Points

- DNS: distributed database, application-layer protocol, UDP port 53
- Hierarchy: root → TLD → authoritative name servers
- Local DNS server: first stop for every client query; caches results
- Iterated query: local server contacts each level; authoritative gives final answer
- Recursive query: each server resolves the full query before responding
- TTL: cached records expire after TTL seconds to allow updates to propagate

## Example

Browser needs IP for `gaia.cs.umass.edu` (iterated query from `engineering.nyu.edu`):
1. Host queries **local DNS** (dns.nyu.edu)
2. Local DNS queries **root DNS** → "Ask .edu TLD server"
3. Local DNS queries **.edu TLD server** → "Ask dns.umass.edu"
4. Local DNS queries **dns.umass.edu** (authoritative) → returns IP address
5. Local DNS caches result and returns IP to the host
6. Host connects to gaia.cs.umass.edu using the IP

## See Also

- [[dns-resource-records|DNS Stores Four Types of Resource Records for Name Resolution]] — what's actually stored in DNS
- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol]] — HTTP relies on DNS to resolve server hostnames
- [[smtp-email-protocol|SMTP Pushes Email Between Mail Servers]] — DNS MX records locate mail servers
