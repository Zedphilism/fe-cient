/**
 * data/chapter8-data.js
 * Chapter 8 topic content and quiz questions (Security in Computer Networks).
 * Consumed by chapter8.html via <script src="data/chapter8-data.js">
 * Schema mirrors CLAUDE.md Data Schema spec.
 * Question types: mcq | truefalse | fillblank | match | calc
 */

window.chapter8Data = {
  id: "chapter8",
  title: "Chapter 8: Security in Computer Networks",
  sections: [

    /* ─────────────────────────────────────────────
       SECTION 1 — What is Network Security?
    ───────────────────────────────────────────── */
    {
      id: "ch8-intro",
      title: "Network Security: Goals & Threat Model",
      xpReward: 10,
      content: {
        summary: "Network security is about ensuring that communication between parties achieves confidentiality, authentication, message integrity, and access/availability. Real security must be designed against a concrete threat model — who is the attacker, what can they observe or modify, what resources do they have? Understanding these foundational goals and attacker capabilities drives every protocol and mechanism in this chapter.",
        bullets: [
          "Confidentiality: only sender and intended receiver should understand message content → requires encryption",
          "Authentication: sender and receiver must confirm each other's identity — is Alice really talking to Bob?",
          "Message integrity: content must not be altered in transit (accidentally or maliciously) → requires MACs or digital signatures",
          "Access and availability: services must remain accessible to legitimate users → defend against DoS attacks",
          "Non-repudiation: sender cannot deny having sent a message → requires digital signatures",
          "Attacker capabilities (Dolev-Yao threat model): attacker (Trudy) can intercept messages, inject new messages, replay old ones, impersonate parties",
          "Eavesdropping: passive listening on the channel; defeats confidentiality if traffic is unencrypted",
          "Man-in-the-Middle (MitM): attacker intercepts and possibly modifies traffic between two parties",
          "Replay attack: attacker records a valid message and re-sends it later to produce an unauthorized effect",
          "Denial of Service (DoS): flood a host or network with traffic to exhaust resources and deny legitimate access"
        ],
        analogy: "Think of sending a letter. Confidentiality is putting the letter in a locked box. Authentication is the wax seal proving who sent it. Integrity is tamper-evident tape showing if anyone opened it. Availability is making sure the mail truck isn't blocked. Trudy is a spy who can copy, forge, delay, or replace letters — your security mechanisms need to defeat all of these.",
        visual: "sim-threat-model"
      },
      quiz: [
        {
          id: "q-ch8-001",
          type: "match",
          question: "Match each security goal to its correct definition.",
          pairs: [
            { term: "Confidentiality",   definition: "Only the intended parties can understand the message content" },
            { term: "Authentication",    definition: "Verify that the communicating party is who they claim to be" },
            { term: "Message Integrity", definition: "Ensure the message has not been altered in transit" },
            { term: "Availability",      definition: "Ensure services remain accessible to legitimate users" }
          ],
          answer: [0, 1, 2, 3],
          explanation: "These four properties form the classic CIAA security model (Confidentiality, Integrity, Authentication, Availability). Every cryptographic protocol and security mechanism in this chapter addresses one or more of these goals. Non-repudiation (proving authorship) is a fifth goal, achieved through digital signatures.",
          xpReward: 25
        },
        {
          id: "q-ch8-002",
          type: "mcq",
          question: "In a Man-in-the-Middle (MitM) attack, what does the attacker do?",
          options: [
            "Sends enormous volumes of traffic to exhaust the victim's resources",
            "Passively listens to network traffic without modifying anything",
            "Intercepts communications between two parties, potentially reading or modifying messages, while each party believes they are talking directly to the other",
            "Guesses a user's password through repeated login attempts"
          ],
          answer: 2,
          explanation: "In a MitM attack, Trudy positions herself between Alice and Bob. Alice thinks she is talking to Bob; Bob thinks he is talking to Alice. Trudy can read all traffic (breaking confidentiality) and also modify messages (breaking integrity). This is why authentication alone isn't enough — you also need integrity protection. TLS prevents MitM by combining authentication (certificates) with integrity (MAC).",
          xpReward: 25
        },
        {
          id: "q-ch8-003",
          type: "truefalse",
          question: "A replay attack can be prevented solely by encrypting the message, since the attacker cannot read the message content.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. Encryption prevents the attacker from reading the message, but does NOT prevent replaying it. In a replay attack, Trudy records an encrypted authentication message from Alice and resends it later. The server receives a perfectly valid-looking encrypted message and may accept it. Defenses include nonces (random one-time values), sequence numbers, or timestamps — these make replayed messages detectable even without decrypting them.",
          xpReward: 25
        },
        {
          id: "q-ch8-004",
          type: "mcq",
          question: "What distinguishes a passive attack from an active attack in network security?",
          options: [
            "Passive attacks use software; active attacks use hardware",
            "Passive attacks only observe/eavesdrop without modifying traffic; active attacks inject, modify, or replay messages",
            "Passive attacks target individual hosts; active attacks target the entire network",
            "Passive attacks are impossible to defend against; active attacks can be prevented"
          ],
          answer: 1,
          explanation: "A passive attack (e.g. eavesdropping) is purely observational — the attacker listens and records traffic but does not modify it. Passive attacks threaten confidentiality. Active attacks (e.g. MitM, message injection, replay, DoS) involve the attacker modifying, creating, or replaying messages. Active attacks threaten integrity, authentication, and availability. Encryption defends against passive attacks; MACs, digital signatures, and nonces defend against active attacks.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 2 — Symmetric Key Cryptography
    ───────────────────────────────────────────── */
    {
      id: "ch8-symmetric",
      title: "Symmetric Key Cryptography (DES, AES)",
      xpReward: 10,
      content: {
        summary: "Symmetric key cryptography uses the same secret key for both encryption and decryption. Both Alice and Bob must share a secret key K_AB before communicating. Modern symmetric ciphers are efficient and can encrypt gigabits per second in hardware. The core challenge is key distribution — how do Alice and Bob securely agree on a shared key without already having one? This is solved by public key cryptography (next section).",
        bullets: [
          "Symmetric key: K_A = K_B = K_AB — same key encrypts and decrypts",
          "m = D(K, E(K, m)) — encrypt then decrypt with same key recovers original message m",
          "Block cipher: encrypts fixed-size blocks (e.g. 64-bit or 128-bit). DES: 64-bit blocks, 56-bit key; AES: 128-bit blocks, 128/192/256-bit key",
          "DES (Data Encryption Standard): obsolete — 56-bit key is exhaustively breakable in hours with modern hardware",
          "3DES: apply DES three times with different keys → 168-bit effective key; still used in legacy banking systems",
          "AES (Advanced Encryption Standard): current standard (NIST 2001); 128-bit block, 10/12/14 rounds of substitution-permutation; considered secure",
          "Stream cipher: encrypts one bit/byte at a time; used in TLS (RC4 was common, now deprecated); examples: ChaCha20",
          "CBC (Cipher Block Chaining) mode: each plaintext block is XORed with previous ciphertext block before encryption. Requires IV (Initialization Vector) to make first block non-deterministic",
          "CTR (Counter) mode: turns block cipher into stream cipher by encrypting successive counter values; parallelizable",
          "Key distribution problem: Alice and Bob need a shared key but cannot securely send it over an insecure channel without some prior setup"
        ],
        analogy: "Symmetric key is like a padlock where Alice and Bob both have a copy of the same key. It's fast and secure — but how did they both get a copy of the key without anyone else seeing? They'd have to meet in person first. Public key cryptography solves this by using a combination lock that anyone can lock but only Bob can open.",
        visual: "sim-symmetric-cipher"
      },
      quiz: [
        {
          id: "q-ch8-005",
          type: "mcq",
          question: "Why is DES (Data Encryption Standard) considered insecure for use in modern systems?",
          options: [
            "DES has a fundamental mathematical flaw that allows decryption without the key",
            "DES uses a 56-bit key which can be exhaustively searched in hours using modern hardware",
            "DES only supports 32-bit blocks, which is too small for modern data",
            "DES was never standardized and only used experimentally"
          ],
          answer: 1,
          explanation: "DES's weakness is its 56-bit key length. A dedicated brute-force machine (like EFF's Deep Crack in 1998) can try all 2^56 ≈ 72 quadrillion possible keys. In 1998, this took 22 hours; modern hardware and cloud computing make it much faster. AES with 128-bit keys has 2^128 possible keys — effectively unbreakable by brute force with any foreseeable technology.",
          xpReward: 25
        },
        {
          id: "q-ch8-006",
          type: "truefalse",
          question: "In CBC (Cipher Block Chaining) mode, encrypting the same plaintext twice with the same key always produces the same ciphertext.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. CBC mode uses a random Initialization Vector (IV) that is XORed with the first plaintext block before encryption. A new random IV is chosen for each encryption session. Since the IV differs each time, encrypting the same plaintext with the same key produces different ciphertext — making CBC non-deterministic and resistant to pattern analysis attacks. The IV is transmitted in plaintext alongside the ciphertext (it doesn't need to be secret).",
          xpReward: 25
        },
        {
          id: "q-ch8-007",
          type: "mcq",
          question: "What is the key distribution problem in symmetric key cryptography?",
          options: [
            "Symmetric keys are too short to be distributed securely over the Internet",
            "Alice and Bob need a shared secret key, but cannot securely exchange it over an insecure channel without already sharing some prior secret",
            "Symmetric encryption is too slow to distribute keys in real time",
            "Modern key distribution centers (KDC) are a solved problem with no remaining challenges"
          ],
          answer: 1,
          explanation: "The fundamental chicken-and-egg problem: to share a key securely, you need a secure channel — but you're trying to create a secure channel in the first place. This is why TLS uses public key cryptography (asymmetric crypto) to securely exchange a symmetric session key, then switches to the faster symmetric cipher for the actual data. The two approaches complement each other: public key for key exchange, symmetric for bulk encryption.",
          xpReward: 25
        },
        {
          id: "q-ch8-calc-001",
          type: "calc",
          question: "AES uses 128-bit keys. How many times more possible keys does AES-128 have compared to DES (56-bit keys)? Express as a power of 2.",
          setup: "DES key space: 2^56 keys\nAES-128 key space: 2^128 keys\n\nRatio = 2^128 / 2^56 = 2^?",
          answer: "72",
          unit: "(exponent, i.e. 2^72 times more keys)",
          tolerance: 0,
          calcType: "numeric",
          hint: "Divide by subtracting exponents: 2^128 ÷ 2^56 = 2^(128-56)",
          explanation: "2^128 / 2^56 = 2^(128−56) = 2^72. AES-128 has 2^72 ≈ 4.7 sextillion times more possible keys than DES. This is why DES is breakable by brute force in hours while AES-128 is considered computationally infeasible to brute-force with any technology available or foreseeable.",
          xpReward: 35
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 3 — Public Key Cryptography & Digital Signatures
    ───────────────────────────────────────────── */
    {
      id: "ch8-public-key",
      title: "Public Key Cryptography & Digital Signatures",
      xpReward: 10,
      content: {
        summary: "Public key cryptography uses a mathematically linked key pair: a public key K+ (shared openly) and a private key K− (kept secret). What one key encrypts, only the other can decrypt. This enables two powerful operations: encryption for confidentiality (encrypt with recipient's public key; only they can decrypt) and digital signatures for authentication and integrity (sign with your private key; anyone can verify with your public key).",
        bullets: [
          "Key pair: K+ (public, shareable) and K− (private, secret) — mathematically related",
          "Encryption for confidentiality: E(K+_Bob, m) — only Bob can decrypt with K−_Bob",
          "Digital signature: S = E(K−_Alice, m) — anyone can verify with K+_Alice; proves Alice created it",
          "RSA: most widely used public key algorithm. Security based on difficulty of factoring large integers (n = p×q). Key size: 2048 or 4096 bits",
          "RSA encryption: c = m^e mod n; decryption: m = c^d mod n (where e,d are related via Euler's theorem)",
          "Diffie-Hellman key exchange: allows two parties to establish a shared secret over a public channel without any prior shared secret. Basis of modern key exchange in TLS",
          "Digital signature scheme: Alice computes hash H(m), then signs: S = E(K−_Alice, H(m)). Bob verifies: D(K+_Alice, S) == H(m)?",
          "Message Authentication Code (MAC): symmetric equivalent of digital signature. MAC = H(K_s || m) — requires shared secret K_s, faster than asymmetric signing",
          "Certificate Authority (CA): trusted third party that signs a certificate binding a public key to an identity (e.g. Verisign signs cert for google.com)",
          "X.509 certificate: contains entity's public key, entity name, CA's digital signature, validity period — used in TLS/HTTPS",
          "Certificate chain: your browser trusts root CAs (pre-installed); root CA can sign intermediate CAs which sign end-entity certs (chain of trust)"
        ],
        analogy: "A public/private key pair is like a padlock (public key) and its unique key (private key). Anyone can lock a message in your padlock (encrypt with your public key), but only you have the key to open it (private key). A digital signature is the reverse: you lock something with YOUR private key. Anyone with your padlock can open it and confirm it must have been you who locked it.",
        visual: "sim-public-key"
      },
      quiz: [
        {
          id: "q-ch8-008",
          type: "mcq",
          question: "Alice wants to send an encrypted message to Bob so that only Bob can read it. Which key does she use to encrypt the message?",
          options: [
            "Alice's private key (K−_Alice)",
            "Alice's public key (K+_Alice)",
            "Bob's private key (K−_Bob)",
            "Bob's public key (K+_Bob)"
          ],
          answer: 3,
          explanation: "For confidentiality (so only Bob can read it), Alice encrypts with Bob's PUBLIC key (K+_Bob). Only Bob has the corresponding private key (K−_Bob) to decrypt it. This is the fundamental asymmetry: lock with the recipient's public key (anyone can do this), unlock with the recipient's private key (only they can).",
          xpReward: 25
        },
        {
          id: "q-ch8-009",
          type: "mcq",
          question: "In a digital signature scheme, why does Alice sign a hash of the message H(m) rather than the full message m?",
          options: [
            "Hashing is required by law for digital signatures",
            "RSA can only sign data up to the key size; hashing compresses large messages to a fixed small size suitable for signing",
            "The hash prevents eavesdroppers from reading the signature",
            "Hashing makes the message unreadable, providing confidentiality"
          ],
          answer: 1,
          explanation: "RSA can only directly encrypt/sign data that is smaller than the key modulus (e.g. 2048 bits = 256 bytes). A document or email is typically much larger. By hashing the message first with SHA-256 (producing a 256-bit digest), Alice can sign the compact hash instead. The hash function's collision resistance ensures that if H(m) matches, m itself is authentic — any forgery would require finding a different m' with the same hash.",
          xpReward: 25
        },
        {
          id: "q-ch8-010",
          type: "truefalse",
          question: "Diffie-Hellman key exchange allows Alice and Bob to agree on a shared secret even if an attacker can observe all of their exchanged messages.",
          options: ["True", "False"],
          answer: 0,
          explanation: "True. Diffie-Hellman's elegance is that Alice and Bob exchange public values (g^a mod p and g^b mod p) over an open channel. An eavesdropper sees these public values but cannot compute the shared secret g^(ab) mod p without solving the discrete logarithm problem — which is computationally infeasible for large p. Both Alice and Bob can independently compute g^(ab) mod p using their own private exponents. Note: DH is vulnerable to MitM if authentication is not added.",
          xpReward: 25
        },
        {
          id: "q-ch8-011",
          type: "mcq",
          question: "What is the role of a Certificate Authority (CA) in public key infrastructure (PKI)?",
          options: [
            "The CA generates and stores everyone's private keys for recovery",
            "The CA is a trusted third party that digitally signs certificates binding public keys to identities, so parties can trust that a public key really belongs to who claims it",
            "The CA encrypts all traffic between clients and servers",
            "The CA resolves domain names to IP addresses, similar to DNS"
          ],
          answer: 1,
          explanation: "Without a CA, how would Bob know that a public key really belongs to Alice and not to Trudy (MitM)? A CA like DigiCert or Let's Encrypt verifies an entity's identity and then signs an X.509 certificate containing: the entity's public key + identity + CA's digital signature. When Bob's browser receives Alice's certificate, it verifies the CA's signature using the CA's public key (pre-installed as a trusted root). This breaks the MitM attack.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 4 — TLS / SSL and HTTPS
    ───────────────────────────────────────────── */
    {
      id: "ch8-tls",
      title: "TLS/SSL & HTTPS",
      xpReward: 10,
      content: {
        summary: "TLS (Transport Layer Security) is the cryptographic protocol that secures HTTPS and most modern Internet communications. It provides confidentiality (encryption), server authentication (X.509 certificates), and message integrity (MAC) in a layered protocol sitting between TCP and the application. TLS 1.3 (2018) is the current standard, simplifying the handshake and removing outdated cipher suites.",
        bullets: [
          "TLS provides: confidentiality (AES-GCM encryption), authentication (X.509 cert + CA verification), integrity (AEAD — Authenticated Encryption with Associated Data)",
          "TLS operates between TCP and the application layer — TCP provides reliable byte-stream, TLS adds security on top",
          "TLS 1.3 handshake (simplified): 1) ClientHello (versions, ciphers, key_share), 2) ServerHello + Certificate + Finished (1 RTT!), 3) Client Finished — data can start flowing in 1.5 RTT",
          "TLS 1.3 vs 1.2: 1.3 is faster (1-RTT vs 2-RTT), removes RSA key exchange, mandates forward secrecy (ECDHE), removes old weak ciphers (RC4, CBC-mode AES, SHA-1)",
          "Forward secrecy: compromise of long-term private key does NOT expose past session keys. Achieved by ephemeral Diffie-Hellman (ECDHE) — new key pair per session",
          "Session resumption: TLS 1.3 supports 0-RTT resumption for repeat connections — client sends encrypted data with first packet (but NOT forward-secret for that early data)",
          "Certificate verification: browser checks cert chain up to trusted root CA, expiry date, hostname match, revocation status (OCSP/CRL)",
          "HTTPS = HTTP over TLS. URL starts with https://, uses port 443 by default",
          "HSTS (HTTP Strict Transport Security): tells browser to always use HTTPS for this domain; prevents downgrade attacks",
          "Certificate pinning: application hard-codes expected certificate or CA, rejecting any other cert even if valid — used in mobile apps"
        ],
        analogy: "TLS is like sending a letter in a bank vault that gets assembled around the letter in front of you. The bank (CA) verified who the vault belongs to. The combination to the lock is mathematically derived during a brief conversation you have with the vault owner (handshake). Even if someone recorded your whole conversation, they can't figure out the combination (forward secrecy).",
        visual: "sim-tls-handshake"
      },
      quiz: [
        {
          id: "q-ch8-012",
          type: "mcq",
          question: "What three security properties does TLS provide?",
          options: [
            "Compression, routing, and error detection",
            "Confidentiality (encryption), server authentication (certificates), and message integrity (MAC)",
            "Authentication, authorization, and accounting (AAA)",
            "Non-repudiation, anonymity, and availability"
          ],
          answer: 1,
          explanation: "TLS provides three core security guarantees: (1) Confidentiality — traffic is encrypted (AES-GCM in TLS 1.3) so eavesdroppers cannot read it; (2) Authentication — the server proves its identity via an X.509 certificate signed by a trusted CA, preventing MitM; (3) Message Integrity — AEAD (Authenticated Encryption with Associated Data) ensures any tampering with the ciphertext is detected.",
          xpReward: 25
        },
        {
          id: "q-ch8-013",
          type: "mcq",
          question: "What is 'forward secrecy' in TLS, and why does TLS 1.3 mandate it?",
          options: [
            "Forward secrecy means session keys are reused across connections for efficiency",
            "Forward secrecy means compromise of the server's long-term private key does not expose past recorded sessions, because ephemeral keys were used",
            "Forward secrecy refers to sending data before the TLS handshake completes (0-RTT)",
            "Forward secrecy is the ability to verify certificates before they are issued"
          ],
          answer: 1,
          explanation: "Without forward secrecy (like older RSA key exchange in TLS 1.2): if an attacker records encrypted sessions today and later obtains the server's private key, they can decrypt all recorded past sessions retroactively. With forward secrecy (ECDHE in TLS 1.3): ephemeral key pairs are generated per session and discarded after use. Past session keys cannot be derived from the long-term private key — even if the private key is compromised later, past sessions remain protected.",
          xpReward: 25
        },
        {
          id: "q-ch8-014",
          type: "truefalse",
          question: "In TLS 1.3, the full handshake requires 2 round trips (2-RTT) before encrypted application data can be sent.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False. TLS 1.3 reduced the handshake to 1-RTT (one round trip): the client sends ClientHello with key_share in the first message; the server responds with ServerHello, its certificate, Finished, and can immediately send encrypted application data; the client sends its Finished and can also start sending data. TLS 1.2 required 2-RTT. TLS 1.3 also supports 0-RTT resumption for repeat connections.",
          xpReward: 25
        },
        {
          id: "q-ch8-015",
          type: "mcq",
          question: "When your browser connects to https://bank.com, what specifically does it verify in the server's TLS certificate?",
          options: [
            "That the server's IP address matches the certificate",
            "That the certificate was issued by a CA in the browser's trusted root store, the hostname matches, and the certificate has not expired or been revoked",
            "That the server's private key matches the certificate's public key",
            "That the certificate uses at least 4096-bit RSA keys"
          ],
          answer: 1,
          explanation: "Certificate verification checks: (1) Hostname — does the cert's Subject/SAN match 'bank.com'? (2) Validity period — is today between NotBefore and NotAfter? (3) Chain of trust — does the cert chain up to a trusted root CA pre-installed in the browser? (4) Revocation — has the cert been revoked via OCSP or CRL? All four must pass. The browser never has access to the server's private key to compare — it only sees and verifies the public key in the cert.",
          xpReward: 25
        }
      ]
    },

    /* ─────────────────────────────────────────────
       SECTION 5 — Firewalls & Intrusion Detection Systems
    ───────────────────────────────────────────── */
    {
      id: "ch8-firewalls",
      title: "Firewalls & Intrusion Detection Systems (IDS)",
      xpReward: 10,
      content: {
        summary: "Firewalls and IDS are perimeter defenses that protect networks from external threats. A firewall controls traffic entering and leaving a network based on configured rules (ACLs). A stateful firewall tracks connection state so it can allow reply traffic without permitting arbitrary inbound connections. An IDS (Intrusion Detection System) monitors traffic patterns to detect attacks that firewalls miss. An IPS (Intrusion Prevention System) can actively block detected threats.",
        bullets: [
          "Firewall goal: allow legitimate traffic, block malicious or unauthorized traffic, sitting between the internal network and the Internet",
          "Packet filtering (stateless): examine each packet independently — filter on: source/dest IP, source/dest port, protocol (TCP/UDP/ICMP), TCP flags",
          "Stateful packet filtering: track TCP connection state table; only allow inbound packets that belong to an established outbound connection. Blocks unsolicited inbound connections",
          "Application gateway (proxy firewall): understand application-layer protocols (HTTP, FTP, DNS); can inspect content, not just headers. Slower but more powerful",
          "ACL (Access Control List): ordered list of rules; first matching rule wins. Implicit deny-all at the end",
          "DMZ (Demilitarized Zone): a subnet between the Internet and internal network where public servers (web, mail) are placed — accessible from outside but isolated from internal network",
          "IDS (Intrusion Detection System): passive monitoring — alerts on suspicious traffic but does NOT block. Can detect: port scans, known malware signatures, anomalous behavior",
          "IPS (Intrusion Prevention System): active — can block or rate-limit suspicious traffic inline. Higher risk of false positives blocking legitimate traffic",
          "Signature-based detection: match traffic against known attack patterns (e.g. Snort rules). Fast but misses novel (zero-day) attacks",
          "Anomaly-based detection: learn baseline of normal traffic, alert on deviations. Can detect new attacks but higher false positive rate",
          "Firewall limitations: cannot stop attacks that appear as legitimate traffic (insider threats, encrypted malware C2, application-layer attacks)"
        ],
        analogy: "A stateless firewall is like a bouncer who checks everyone's ID but doesn't remember who already went in. A stateful firewall is a smarter bouncer who keeps a guest list — if you called ahead (sent an outbound connection), you can come in; random visitors without an invitation are turned away. An IDS is a security camera that records suspicious behavior and alerts staff. An IPS is a security camera with an automatic door lock.",
        visual: "sim-firewall"
      },
      quiz: [
        {
          id: "q-ch8-016",
          type: "mcq",
          question: "What is the key advantage of a stateful packet filter over a stateless packet filter?",
          options: [
            "Stateful filters are faster because they skip the IP header entirely",
            "Stateful filters track TCP connection state, allowing reply traffic for outbound connections while blocking unsolicited inbound connections",
            "Stateful filters can decrypt and inspect TLS-encrypted traffic",
            "Stateful filters use machine learning to detect new attack patterns"
          ],
          answer: 1,
          explanation: "A stateless filter must either allow all traffic on a port (including unsolicited inbound) or block all of it. A stateful filter maintains a connection table: when an internal host initiates a TCP connection outbound, the firewall records the connection. Inbound packets are only allowed through if they match an existing outbound connection in the table. This blocks port scans and unsolicited inbound connections without blocking reply traffic.",
          xpReward: 25
        },
        {
          id: "q-ch8-017",
          type: "truefalse",
          question: "An IDS (Intrusion Detection System) can actively block malicious traffic by dropping packets inline.",
          options: ["True", "False"],
          answer: 1,
          explanation: "False — that describes an IPS (Intrusion Prevention System). An IDS is passive: it copies and analyzes traffic (or reads logs) and generates alerts when it detects suspicious activity, but does NOT block or modify traffic. The advantage of IDS is zero impact on traffic flow; the disadvantage is that attacks continue while analysts review alerts. An IPS sits inline and can drop packets immediately but risks blocking legitimate traffic on false positives.",
          xpReward: 25
        },
        {
          id: "q-ch8-018",
          type: "mcq",
          question: "What is a DMZ (Demilitarized Zone) in network security architecture?",
          options: [
            "A range of IP addresses that are permanently blocked by the firewall",
            "A subnet between the Internet and the internal network where public-facing servers are isolated",
            "A wireless network segment that is unencrypted for guest access",
            "A backup network segment used when the primary network is under attack"
          ],
          answer: 1,
          explanation: "A DMZ is a network segment sandwiched between the Internet-facing firewall and the internal corporate network. Public servers (web server, mail server, DNS server) are placed in the DMZ — they need to be reachable from the Internet, but if they are compromised, an attacker only reaches the DMZ, not the sensitive internal network. A second firewall between the DMZ and the internal network provides a second layer of defense.",
          xpReward: 25
        },
        {
          id: "q-ch8-019",
          type: "mcq",
          question: "An ACL rule says: 'DENY TCP any any 23'. What traffic does this block, and why would an administrator add this rule?",
          options: [
            "Blocks all TCP traffic; used to completely shut down the network in an emergency",
            "Blocks all traffic to port 23 (Telnet) from any source to any destination; Telnet sends passwords in plaintext so it is a security risk",
            "Blocks ICMP ping traffic; used to prevent network mapping by attackers",
            "Blocks DNS traffic on port 23; used to prevent DNS amplification attacks"
          ],
          answer: 1,
          explanation: "Port 23 is Telnet — a legacy remote administration protocol that transmits all data including usernames and passwords in cleartext. Any eavesdropper on the path can capture credentials. Modern practice replaces Telnet with SSH (port 22) which encrypts the session. Blocking port 23 in the firewall ACL prevents Telnet sessions, forcing administrators to use the secure SSH alternative.",
          xpReward: 25
        },
        {
          id: "q-ch8-020",
          type: "mcq",
          question: "Signature-based IDS can detect known attacks reliably. What is its main weakness?",
          options: [
            "Signature-based IDS is too slow to analyze traffic in real time",
            "It cannot detect novel (zero-day) attacks that do not match any known signature",
            "It requires decrypting all HTTPS traffic, which is illegal in most jurisdictions",
            "Signature databases cannot be updated after the IDS is deployed"
          ],
          answer: 1,
          explanation: "Signature-based detection matches traffic against a library of known attack patterns (e.g. specific byte sequences in exploit code). It works well for known attacks but is blind to zero-day exploits — attacks that have never been seen before and have no signature. This is why organizations layer signature-based IDS with anomaly-based detection (which can spot unusual behavior even without a signature) and threat intelligence feeds (to get new signatures quickly).",
          xpReward: 25
        }
      ]
    }

  ]
};
