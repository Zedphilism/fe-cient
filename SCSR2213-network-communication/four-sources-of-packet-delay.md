---
title: "Four Sources of Packet Delay"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Four Sources of Packet Delay

Total nodal delay at a router is the sum of four components: processing delay, queuing delay, transmission delay, and propagation delay — each arising from a different physical cause.

## Explanation

As a packet travels from source to destination, it passes through a series of routers. At each router (node), it experiences **nodal delay**:

d_nodal = d_proc + d_queue + d_trans + d_prop

**1. Processing Delay (d_proc):** Time to examine the packet header, check for bit errors, and determine the output link. Typically less than a millisecond in modern routers.

**2. Queuing Delay (d_queue):** Time the packet waits in the output buffer before it can be transmitted. Depends entirely on the level of congestion. If no other packets are ahead, d_queue = 0. Under heavy load, it can dominate total delay. When traffic intensity (La/R) approaches 1, queuing delay grows very large; above 1, delay is theoretically infinite because packets arrive faster than they can be served.

**3. Transmission Delay (d_trans):** Time to push all L bits of the packet onto the link at rate R.
d_trans = L / R

This is NOT the time for the first bit to reach the destination — it's the time to "push" all bits into the wire.

**4. Propagation Delay (d_prop):** Time for the first bit to travel from one router to the next across the physical link.
d_prop = d / s, where d = link length, s ≈ 2×10⁸ m/s (speed of light in fiber/copper)

**Critical distinction:** Transmission delay depends on packet size and link bandwidth. Propagation delay depends only on the physical distance and speed of the medium — it is completely independent of packet size.

## Key Points

- d_nodal = d_proc + d_queue + d_trans + d_prop
- d_trans = L (bits) / R (bps) — time to put all bits on the link
- d_prop = d (meters) / s (m/s) — time for signal to travel the link
- d_queue depends on congestion; most variable component
- Traffic intensity = La/R; if ≥ 1, queue grows unboundedly

## Example

Link between two routers: L = 1500 bytes = 12,000 bits, R = 100 Mbps, d = 2000 km, s = 2×10⁸ m/s

- d_trans = 12,000 / 100,000,000 = **0.12 ms**
- d_prop = 2,000,000 / 200,000,000 = **10 ms**
- d_proc ≈ **< 1 ms** (assume 0.5 ms)
- d_queue depends on load (assume **2 ms** at moderate load)
- **Total ≈ 12.62 ms**

For this long-distance link, propagation delay dominates.

## See Also

- [[throughput-and-bottleneck-links|Throughput Is Limited by the Slowest Link on the Path]] — another key performance metric
- [[packet-switching-store-and-forward|Packet Switching Forwards Data in Chunks Using Store-and-Forward]] — store-and-forward contributes transmission delay
