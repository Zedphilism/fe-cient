---
title: "What Is a Protocol?"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# What Is a Protocol?

A network protocol is a set of rules that governs how two or more communicating entities exchange messages, specifying message format, message order, and the actions taken upon sending or receiving messages.

## Explanation

All communication in the Internet is governed by protocols. The concept is analogous to human social protocols: when you greet someone, you say "Hi," they say "Hi" back, then a conversation follows. Each side knows what message to send next based on what was received. If the other person responds unexpectedly, the protocol breaks down.

Network protocols work the same way, but between machines. A protocol specifies:

1. **The types of messages** that can be exchanged (e.g., request, response, acknowledgment)
2. **The message syntax**: what fields exist and how they are delimited
3. **The message semantics**: the meaning of the information in each field
4. **The rules**: when and how a process sends or responds to messages

For example, when a browser connects to a web server using HTTP, the browser sends a GET request, the server responds with the requested content and a status code, and the connection may then close. Both sides follow the HTTP protocol precisely.

Protocols operate at every layer of the network stack — from how electrical signals are encoded on a wire (physical layer protocols) to how web pages are transferred (application layer protocols like HTTP).

## Key Points

- Protocols define: message format, message order, and actions on send/receive
- All Internet activity — every bit sent — is governed by protocols
- Examples: TCP, IP, HTTP, SMTP, 802.11 (WiFi), DNS
- Standards are published as RFCs by the IETF

## Example

**TCP connection protocol:**
1. Client sends a TCP SYN (connection request) to server
2. Server replies with TCP SYN-ACK (connection accepted)
3. Client sends ACK (acknowledgment)
4. Connection established — data can now flow

This three-step handshake is a protocol: the exact messages, their order, and the actions taken on receipt are all precisely defined.

## See Also

- [[internet-nuts-and-bolts-view|The Internet Is a Network of Networks]] — protocols are one of three Internet building blocks
- [[osi-model-seven-layers|The OSI Model Organises Network Functions into Seven Layers]] — layered protocol organization
- [[tcp-ip-internet-stack|The TCP/IP Stack Is the Internet's Five-Layer Protocol Architecture]] — actual Internet protocol layers
