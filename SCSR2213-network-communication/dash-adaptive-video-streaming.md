---
title: "DASH: Adaptive Video Streaming"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# DASH: Adaptive Video Streaming

DASH (Dynamic Adaptive Streaming over HTTP) is a video streaming technique where the server stores a video encoded at multiple quality levels, and the client intelligently selects which quality chunk to request next based on measured available bandwidth.

## Explanation

Streaming video is the dominant use of Internet bandwidth (Netflix, YouTube, Amazon Prime account for ~80% of residential ISP traffic as of 2020). The core challenge is **heterogeneity**: different users have vastly different bandwidth — a wired gigabit user vs. a mobile 4G user. A fixed-bitrate video stream either buffers (if too high) or looks poor (if too low).

**DASH solves this by:**

**Server side:**
- The video is encoded at multiple bitrates (e.g., 250 kbps, 500 kbps, 1 Mbps, 4 Mbps)
- Each encoding is divided into small chunks (typically 2–10 seconds long)
- A **manifest file** lists the available qualities and the URLs for each chunk at each quality

**Client side:**
- The client downloads the manifest file first
- It periodically measures the download bandwidth from the server
- It requests the next chunk at the highest quality that can be downloaded fast enough to maintain smooth playback
- If bandwidth drops (congestion), it switches to a lower-quality chunk to avoid stalling
- If bandwidth improves, it switches up to a higher-quality chunk

This client-side intelligence is what makes DASH "adaptive." The client has complete control; the server just stores chunks and responds to HTTP GET requests. DASH runs entirely over standard HTTP, making it compatible with web caches and CDNs.

The **continuous playout constraint** drives DASH design: once playback starts, it must continue at the original frame rate. A client-side buffer absorbs network jitter — as long as data arrives faster than playback drains the buffer, video plays smoothly.

## Key Points

- DASH: Dynamic Adaptive Streaming over HTTP
- Server stores multiple encodings (bitrates) of the same video, divided into chunks
- Manifest file: tells client the URLs and bitrates of all available chunk versions
- Client measures bandwidth and chooses quality level per chunk
- Runs over HTTP — compatible with caches and CDNs
- Client-side buffer smooths out network delay jitter

## Example

Netflix encodes a movie at 5 quality levels (350 kbps, 750 kbps, 1.5 Mbps, 3 Mbps, 5 Mbps). Your phone measures 2 Mbps available bandwidth and downloads 1.5 Mbps chunks. If you move into a weak signal area and bandwidth drops to 400 kbps, the client automatically switches to 350 kbps chunks to avoid buffering. When you return to WiFi (10 Mbps), it ramps up to 5 Mbps — all seamless and automatic.

## See Also

- [[bittorrent-p2p-file-sharing|BitTorrent Uses Rarest-First Chunk Exchange and Tit-for-Tat Incentives]] — another approach to large content distribution
- [[web-caching-proxy-servers|Web Caches Reduce Latency by Serving Cached Copies Locally]] — DASH chunks are HTTP objects cacheable by proxies
- [[throughput-and-bottleneck-links|Throughput Is Constrained by the Bottleneck Link]] — DASH adapts to available throughput
