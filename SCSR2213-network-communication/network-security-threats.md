---
title: "Network Security Threats"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Network Security Threats

The Internet was not originally designed with security in mind, making it vulnerable to four primary attack categories: malware infections, denial-of-service attacks, packet sniffing, and IP address spoofing.

## Explanation

The original Internet was designed for a "group of mutually trusting users on a transparent network" — security was an afterthought. As the Internet became critical infrastructure, adversaries exploited its openness. The field of network security studies how attacks work in order to design defenses.

**Malware (Malicious Software):** Programs that infect end hosts and cause harm. Key types:
- **Virus:** Requires user action to activate (e.g., opening an email attachment)
- **Worm:** Self-replicating; spreads automatically across the network without user action
- **Spyware:** Silently records keystrokes and browsing activity
- **Botnet:** A network of infected ("compromised") hosts controlled remotely; used for spam or DDoS attacks

**Denial of Service (DoS):** Attackers flood a server or network resource with bogus traffic, exhausting its bandwidth or processing capacity so legitimate users cannot be served. A **Distributed DoS (DDoS)** uses a botnet — thousands of compromised hosts — to amplify the attack.

**Packet Sniffing:** On shared media (WiFi, Ethernet hub), a device in "promiscuous mode" can read all packets passing by, not just those addressed to it. Sensitive data (passwords, emails) sent in plaintext is exposed. Wireshark is a well-known packet sniffer used for both legitimate network analysis and attack.

**IP Spoofing:** Sending a packet with a forged source IP address. The receiver believes the packet came from a trusted host. Used in DoS amplification attacks (the reply goes to the spoofed victim) and to bypass IP-based authentication.

## Key Points

- Malware types: virus (user-activated), worm (self-replicating), spyware, botnet
- DoS/DDoS: overwhelm a resource with bogus traffic; DDoS uses a botnet
- Packet sniffing: reads all traffic on shared medium in promiscuous mode
- IP spoofing: forged source address deceives receivers
- Security must be built into all layers — not just one

## Example

**DDoS attack lifecycle:**
1. Attacker sends malware to thousands of hosts → builds a botnet
2. Attacker commands all botnet hosts to simultaneously send traffic to the target (e.g., a bank server)
3. Target server is overwhelmed with millions of requests per second → legitimate users cannot connect

**Packet sniffing scenario:** You connect to a public WiFi (shared medium). Another user runs Wireshark in promiscuous mode. If you log in to a website that sends your password in plaintext (no HTTPS), the attacker captures your credentials.

## See Also

- [[network-protocols-defined|Protocols Govern All Network Communication]] — security is built into protocol design
- [[tcp-ip-internet-stack|The TCP/IP Internet Stack]] — security must be added at multiple layers (e.g., TLS at transport)
