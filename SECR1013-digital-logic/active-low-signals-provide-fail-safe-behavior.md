---
title: "Active-Low Signals and Fail-Safe Behavior"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic, supplemental, thomas-floyd]
---

# Active-Low Signals and Fail-Safe Behavior

An active-low signal does its job (is "asserted") when its voltage is LOW — this means a broken wire defaults the signal to HIGH (de-asserted), producing a safe inactive state rather than an accidental activation.

> [!concept] Core Claim
> Active-low design embeds fault safety into the circuit's physics: because broken wires float HIGH and active-low signals are inactive when HIGH, the most common hardware failure mode automatically pushes the system to its safe default state.

## Explanation

Think of an active-low signal like a deadman switch on a train: the driver must actively hold the handle (hold the signal LOW) to keep the train running. If the driver releases — or if anything goes wrong with the handle (wire breaks, connection fails, pull-up resistor holds HIGH) — the train automatically stops. Safety is the default, not the exception.

The mechanism exploits the physics of pull-up resistors: when a wire is disconnected, a pull-up resistor connected to the supply voltage holds the pin at HIGH by default. In an active-high circuit, this floating-to-HIGH behavior accidentally asserts the signal, potentially activating whatever the signal controls. In an active-low circuit, floating-to-HIGH de-asserts the signal — the device stays inactive. A faulty connection literally cannot cause an accidental activation.

The electromagnetic consequence also favors active-low: noise from adjacent wires, capacitive coupling, and electromagnetic interference more easily injects spurious HIGH pulses than spurious LOW pulses (it is physically harder to pull a signal below ground than to push it above the logic threshold). Active-low signals are therefore more resistant to noise-induced false triggering in industrial and automotive environments.

Active-low signals are identified by an overbar on the name (RESET̄), a forward slash (/RESET or ~RESET in text), or a small bubble on the gate input or output pin in a schematic.

## Key Points

- Active-low: signal is asserted (active/ON) when LOW (logic 0)
- Fault default: broken wire or lost connection → floats HIGH → signal de-asserted (safe)
- More noise-immune: high-noise environments inject fewer spurious LOW states than HIGH states
- Notation: RESET̄, /RESET, ~RESET, or bubble symbol on schematics

## Example

Emergency stop design comparison:

```
Active-HIGH /STOP:
  Wire intact, button released → STOP = LOW → no stop → machine runs
  Button pressed                → STOP = HIGH → machine halts ✓
  Wire cut or fault             → STOP floats HIGH → machine halts ✓ (safe in this case)

But for an ENABLE signal (machine runs only when ENABLE = HIGH):
  Wire cut → ENABLE floats HIGH → machine unexpectedly activates ✗

Active-LOW ~ENABLE:
  Wire intact, button held      → ~ENABLE = LOW → machine enabled ✓
  Button released               → ~ENABLE = HIGH → machine stops ✓
  Wire cut → ~ENABLE floats HIGH → machine stops ✓ (safe by default)
```

Active-low ~ENABLE is fail-safe: any fault deactivates the machine.

> [!recall] A nuclear plant uses an active-high "PUMP_ON" signal. An active-low alternative "~PUMP_OFF" is proposed. A cable fault causes the control wire to disconnect. Compare the behavior of both designs under this fault, and argue which is safer for this application. What role does the pull-up resistor play in each scenario?

## See Also

- [[active-high-vs-active-low|Active-High vs Active-Low]] — overview of both polarity conventions
- [[not-gate-inverts-the-input-logic-level|NOT Gate]] — used to convert between active-high and active-low signals
