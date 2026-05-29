# picoCTF: Packets Primer

## Overview

**Platform:** picoCTF  
**Challenge:** Packets Primer  
**Difficulty:** Medium  
**Category:** Forensics / Packet Analysis  
**Date Completed:** May 16, 2026  
**File/URL:** packet capture file  
**Repo Path:** `ctfs/picoctf/packets-primer/README.md`

## Report Content

### Objective

Download the provided packet capture and analyze the captured traffic to recover the hidden picoCTF flag.

### Lab Setup

- Environment: Kali Linux / local terminal
- Artifact: CTF-provided packet capture file
- Network: Local-only analysis of the downloaded capture

### Evidence Overview

The challenge provided a packet capture instead of a live target. Because packet captures often contain readable protocol data, strings, or cleartext application payloads, the first pass focused on quickly searching the artifact for recognizable flag patterns.

The solve used the local `picog` helper from the aliases collection. This helper performs a binary-safe recursive grep for normal picoCTF flags and also checks for spaced or lightly obfuscated variants.

### Analysis Process

The packet capture was downloaded and kept as the original forensic artifact. Rather than modifying or extracting the capture first, the file was searched directly for the picoCTF flag format.

The `picog` helper scanned the capture bytes and found the flag pattern inside the packet data. This confirmed that the flag was present in plaintext within the traffic and did not require decryption, carving, or protocol reconstruction.

For a fully manual packet-analysis workflow, the same result can be reproduced by opening the capture in Wireshark, using packet search for `picoCTF`, and following the matching packet's stream to view the payload in context.

### Commands And Evidence

```bash
file capture.pcap
picog capture.pcap
```

Equivalent manual checks:

```bash
strings -a capture.pcap | grep -E "picoCTF\{[^}]+\}"
tshark -r capture.pcap -Y "frame contains picoCTF"
```

### Forensic Findings

- The challenge artifact was a packet capture containing readable packet payload data.
- The flag format was present directly in the capture bytes.
- `picog` recovered the flag by searching for the standard `picoCTF{...}` pattern.
- No password cracking, protocol decryption, or file carving was required.

### Flag Recovery

```text
[redacted]
```

### Conclusion

Packets Primer reinforced a simple but important packet-forensics habit: search for obvious indicators before moving into deeper protocol analysis. A binary-safe flag search quickly identified the useful payload, while Wireshark or tshark can be used to verify the packet and stream context.

## Tools Used

| Tool | Purpose |
|---|---|
| picog | Binary-safe recursive search for normal and spaced picoCTF flag patterns |
| grep | Pattern matching against packet capture bytes |
| strings | Optional plaintext extraction from the capture |
| Wireshark / tshark | Optional packet inspection and stream verification |

## Screenshots

Add screenshot files to the `screenshots/` folder, then reference them here.

## Lessons Learned

- Start packet challenges with quick plaintext and flag-format checks.
- Use binary-safe search when scanning captures directly.
- Confirm any shortcut result with packet context when writing a reproducible report.
- Keep the original capture unchanged during analysis.

## Mitigation Advice

- Avoid transmitting secrets in plaintext protocols.
- Use encryption for sensitive application data in transit.
- Review packet captures before public release to ensure they do not expose unintended secrets.

## References

- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [tshark Manual Page](https://www.wireshark.org/docs/man-pages/tshark.html)
