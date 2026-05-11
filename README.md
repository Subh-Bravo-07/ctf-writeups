# CTF Writeups

Polished cybersecurity writeups from TryHackMe, Hack The Box, picoCTF, and other CTF platforms.

Each writeup focuses on methodology, enumeration, exploitation flow, privilege escalation, and defensive takeaways.

## Platforms

| Platform | Category | Writeups |
|---|---|---|
| TryHackMe | Beginner to Intermediate | [Basic Pentesting](tryhackme/basic-pentesting/README.md), [RootMe](tryhackme/rootme/README.md) |
| Hack The Box | Intermediate | Coming soon |
| picoCTF | Web, Crypto, Forensics | Coming soon |

## Featured Writeups

- [Basic Pentesting](tryhackme/basic-pentesting/README.md) - TryHackMe room covering enumeration, SMB misconfiguration, SSH brute forcing, and Linux privilege escalation.
- [RootMe](tryhackme/rootme/README.md) - TryHackMe room covering file upload exploitation, reverse shell access, and SUID-based privilege escalation.

## Skills Demonstrated

- Network enumeration
- Web application testing
- Linux privilege escalation
- Windows privilege escalation
- Active Directory basics
- Password attacks
- Log analysis
- Report writing

## Writeup Format

Each writeup includes:

1. Platform and challenge name
2. Objective
3. Reconnaissance
4. Exploitation
5. Privilege escalation
6. Tools used
7. Lessons learned
8. Mitigation advice

## Repository Structure

```text
ctf-writeups/
├── README.md
├── templates/
│   └── writeup-template.md
├── tryhackme/
│   ├── basic-pentesting/
│   │   └── README.md
│   └── rootme/
│       └── README.md
├── hackthebox/
│   └── machine-name/
│       ├── README.md
│       └── screenshots/
├── picoctf/
│   └── challenge-name/
│       └── README.md
└── assets/
    └── banner.png
```

## Writing Style

Each CTF should read like a mini security report, not a diary.

Example:

> Service enumeration identified an exposed HTTP application. Directory brute forcing revealed an admin panel, which became the primary attack surface.

## Disclaimer

All writeups are for educational purposes only and are based on legal CTF environments.
