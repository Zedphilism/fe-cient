---
title: "Circuit Switching: FDM and TDM"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Circuit Switching: FDM and TDM

In circuit switching, end-to-end resources (bandwidth, buffers) are reserved and dedicated to a call for its entire duration, guaranteeing performance but wasting capacity when the circuit is idle.

## Explanation

Circuit switching is the technology used in traditional telephone networks. Before data can be sent, a **circuit** (a dedicated path with reserved resources) must first be established between the sender and receiver. Once established, the circuit provides a **guaranteed constant transmission rate** for the duration of the call.

The resources on each link that a circuit uses are divided and allocated using one of two multiplexing techniques:

**FDM (Frequency Division Multiplexing):** The link's bandwidth is divided into frequency bands, and each circuit gets one band continuously. Users share the medium at the same time but at different frequencies. For example, cable TV channels each occupy a different frequency band.

**TDM (Time Division Multiplexing):** Time is divided into frames, each frame is divided into slots, and each circuit gets a fixed slot in every frame. A circuit gets all the bandwidth during its time slot. For example, if a link has 1 Mbps and uses TDM with 4 slots, each circuit gets 250 kbps in a repeating pattern.

Circuit switching has key trade-offs: it **guarantees quality of service** (fixed bandwidth, no sharing mid-call) but is **inefficient** when a user is not actively talking — the reserved bandwidth sits idle. It also requires call setup time before data can flow.

## Key Points

- Resources are reserved before communication begins
- Guaranteed bandwidth and QoS for the duration of the call
- Idle circuits waste capacity ("no sharing" = inefficiency)
- FDM: divide link by frequency; each circuit gets a slice of spectrum
- TDM: divide link by time slots; each circuit gets the full bandwidth periodically
- Common in traditional telephone networks (PSTN)

## Example

A link with transmission rate **1 Mbps** using **TDM with 4 circuits**:
- Each circuit gets: 1 Mbps / 4 = **250 kbps** of dedicated bandwidth
- That circuit receives its 250 kbps every frame, regardless of whether it has data to send

With FDM on the same link, each of the 4 circuits would be assigned a dedicated 250 kHz frequency band permanently.

## See Also

- [[packet-vs-circuit-switching|Packet Switching Supports More Users Than Circuit Switching on Bursty Traffic]] — why packet switching dominates the Internet
- [[packet-switching-store-and-forward|Packet Switching Forwards Data in Chunks Using Store-and-Forward]] — the Internet's approach
