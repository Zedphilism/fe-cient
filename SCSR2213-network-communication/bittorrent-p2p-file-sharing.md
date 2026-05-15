---
title: "BitTorrent: P2P File Sharing"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# BitTorrent: P2P File Sharing

BitTorrent is a P2P file distribution protocol where a file is divided into 256 KB chunks that peers exchange directly with each other, using rarest-first requesting and tit-for-tat upload incentives to maximise swarm efficiency.

## Explanation

BitTorrent solves the problem of distributing large files to many peers without overloading a single server. The key insight is that as peers download chunks, they simultaneously upload to others, creating a cooperative network.

**Core components:**
- **Torrent:** A group of peers participating in exchanging chunks of a specific file
- **Tracker:** A server that tracks which peers are in the torrent (not a bottleneck — it only provides peer lists, not file data)
- **Chunks:** The file is divided into 256 KB pieces; each peer accumulates chunks over time

**Joining the swarm:**
1. New peer contacts the tracker, receives a list of current peers
2. Peer connects to a subset of those peers ("neighbors")
3. Downloads and uploads chunks simultaneously

**Requesting chunks — Rarest First:**
At any time, different peers have different subsets of chunks. A peer periodically asks each neighbor which chunks they have, then requests the chunks it is missing, prioritizing the **rarest** ones first. This ensures rare chunks are replicated quickly, preventing any chunk from becoming a bottleneck that slows the whole swarm.

**Sending chunks — Tit-for-Tat:**
A peer uploads to the 4 neighbors who are currently sending it data at the highest rates ("unchoked"). All other peers are "choked" (receive nothing). Every 10 seconds, the top-4 list is re-evaluated. Every 30 seconds, one random peer is "optimistically unchoked" — this gives new peers a chance to enter the exchange and discover better trading partners.

This creates a self-reinforcing incentive: peers that contribute get the best download rates; free-riders (who download but never upload) are choked by everyone.

## Key Points

- File divided into 256 KB chunks; peers exchange chunks directly
- Tracker only provides peer list — it does not serve file data
- Rarest-first: request the least common chunks first to ensure swarm health
- Tit-for-tat: upload to top-4 uploaders; optimistically unchoke 1 random peer every 30 sec
- Self-scaling: each new peer adds capacity as well as demand
- Churn: peers can leave and rejoin at any time

## Example

Alice joins a torrent for a 1 GB file (4096 chunks of 256 KB):
- She gets a peer list from the tracker → connects to 50 neighbors
- She has no chunks yet → starts downloading random chunks
- After accumulating some chunks, she checks which chunks are rarest among her neighbors and requests those first
- She uploads to the 4 peers sending her the most data (e.g., Bob, Carol, Dave, Eve)
- Every 30 sec she tries a random new peer; if that peer is a good uploader, they join her top-4

## See Also

- [[client-server-vs-p2p-architecture|Application Architectures Are Either Client-Server or P2P]] — BitTorrent is the canonical P2P example
- [[dash-adaptive-video-streaming|DASH Adapts Video Quality Based on Available Bandwidth]] — another content distribution strategy
