---
title: "DNS Resource Records"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# DNS Resource Records

DNS stores information as Resource Records (RRs) in the format (name, value, type, TTL), where the type field determines what kind of mapping the record provides — address, name server, canonical name, or mail server.

## Explanation

The DNS distributed database stores **Resource Records (RRs)**. Every RR has the format:
`(name, value, type, ttl)`

The **TTL** (Time To Live) field specifies how long (in seconds) a resolver may cache this record before it must be re-fetched from an authoritative server.

The four most important record types are:

**Type A — Address:**
- `name` = hostname
- `value` = IPv4 address
- Example: `(gaia.cs.umass.edu, 128.119.245.12, A, 300)`
- This is the most fundamental record — it maps a hostname to an IP address.

**Type NS — Name Server:**
- `name` = domain (e.g., umass.edu)
- `value` = hostname of the authoritative name server for this domain
- Example: `(umass.edu, dns.umass.edu, NS, 172800)`
- Used to delegate a domain to its authoritative server.

**Type CNAME — Canonical Name:**
- `name` = alias hostname
- `value` = canonical (real) hostname
- Example: `(www.ibm.com, servereast.backup2.ibm.com, CNAME, 300)`
- Allows a host to have multiple names (aliases) that all resolve to one canonical hostname. The canonical hostname then has an A record.

**Type MX — Mail Exchange:**
- `name` = domain
- `value` = hostname of the mail server for that domain
- Example: `(utm.my, mail.utm.my, MX, 3600)`
- Allows email for `user@utm.my` to be delivered to the correct mail server. Combined with an A record for `mail.utm.my`.

**DNS protocol messages:** Both queries and replies use the same message format with fields: identification (16-bit ID shared by query and reply), flags (query/reply, recursion desired/available, authoritative reply), and sections for questions, answers, authority, and additional info.

## Key Points

- RR format: (name, value, type, ttl)
- Type A: hostname → IP address
- Type NS: domain → authoritative name server hostname
- Type CNAME: alias → canonical hostname
- Type MX: domain → mail server hostname
- TTL: how long to cache the record (seconds)

## Example

To register `networkutopia.com`, you insert into the .com TLD server:
```
(networkutopia.com, dns1.networkutopia.com, NS)    ← NS record
(dns1.networkutopia.com, 212.212.212.1, A)         ← A record for the NS server
```

Then on your own authoritative server at 212.212.212.1:
```
(www.networkutopia.com, 212.212.212.1, A)          ← A record for web server
(networkutopia.com, mail.networkutopia.com, MX)    ← MX record for email
(mail.networkutopia.com, 212.212.212.2, A)         ← A record for mail server
```

## See Also

- [[dns-hierarchy-and-resolution|DNS Translates Hostnames to IP Addresses via a Distributed Hierarchy]] — how DNS queries traverse these records
- [[smtp-email-protocol|SMTP Pushes Email Between Mail Servers]] — MX records enable email routing
