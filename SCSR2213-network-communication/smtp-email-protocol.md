---
title: "SMTP, POP3, and IMAP"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# SMTP, POP3, and IMAP

The Internet email system has three components — user agents, mail servers, and SMTP — where SMTP (port 25) is used to push messages from sender to receiver's mail server, and POP3 or IMAP is used by the recipient to pull messages from their mail server.

## Explanation

The email system separates **sending** (SMTP) from **retrieval** (POP3/IMAP), with mail servers acting as intermediaries.

**System components:**
- **User Agent (UA):** Email client software (Outlook, Gmail in browser, iOS Mail). Composes, reads, and sends email.
- **Mail Server:** The core of the email system. Each user has a **mailbox** (incoming messages) and each server has an **outgoing message queue**. Mail servers communicate with each other via SMTP.
- **SMTP (Simple Mail Transfer Protocol, RFC 5321):** Uses TCP, port 25. A "push" protocol — the sending server initiates and pushes the message to the receiving server. Three phases: handshaking (HELO), message transfer (DATA), closure (QUIT). Messages must be in 7-bit ASCII.

**Sending an email (Alice → Bob):**
1. Alice composes email in her UA, addressed to bob@school.edu
2. Alice's UA sends to her mail server; message enters the outgoing queue
3. Alice's mail server opens a TCP connection to Bob's mail server on port 25
4. SMTP handshake, then Alice's message is transferred
5. Bob's mail server stores the message in Bob's mailbox
6. Bob uses his UA to retrieve the message via POP3 or IMAP

**Retrieval protocols:**
- **POP3 (Post Office Protocol v3, RFC 1939):** Download-and-delete or download-and-keep. Simple, stateless across sessions. Once downloaded, messages are typically on only one device.
- **IMAP (Internet Mail Access Protocol, RFC 3501):** Keeps all messages on the server, organised in server-side folders. Stateful across sessions. Syncs across multiple devices — the modern standard.
- **HTTP:** Webmail services (Gmail, Hotmail) use HTTP between browser and mail server, with SMTP between mail servers.

## Key Points

- Three components: user agent, mail server, SMTP protocol
- SMTP: TCP port 25, push (sender → receiver's server), 7-bit ASCII, persistent connections
- SMTP is like HTTP but push instead of pull
- POP3: download to client, simple, stateless, single-device oriented
- IMAP: server-side storage, folders, syncs across devices, stateful
- Webmail: HTTP to mail server, SMTP between servers

## Example

SMTP dialogue between Alice's server (crepes.fr) and Bob's server (hamburger.edu):
```
S: 220 hamburger.edu
C: HELO crepes.fr
S: 250 Hello crepes.fr, pleased to meet you
C: MAIL FROM: <alice@crepes.fr>
S: 250 alice@crepes.fr... Sender ok
C: RCPT TO: <bob@hamburger.edu>
S: 250 bob@hamburger.edu... Recipient ok
C: DATA
C: Do you like ketchup?
C: .
S: 250 Message accepted for delivery
C: QUIT
S: 221 hamburger.edu closing connection
```

## See Also

- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol]] — SMTP and HTTP both use ASCII command/response, but SMTP pushes while HTTP pulls
- [[dns-hierarchy-and-resolution|DNS Translates Hostnames to IP Addresses via a Distributed Hierarchy]] — DNS MX records locate mail servers
