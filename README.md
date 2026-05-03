# CTF Writeups

Polished cybersecurity writeups from TryHackMe, Hack The Box, picoCTF, and other CTF platforms.

Each writeup focuses on methodology, enumeration, exploitation flow, privilege escalation, and defensive takeaways.

## Platforms

| Platform | Category | Writeups |
|---|---|---|
| TryHackMe | Beginner to Intermediate | Coming soon |
| Hack The Box | Intermediate | Coming soon |
| picoCTF | Web, Crypto, Forensics | Coming soon |

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

## Admin Panel

Use [admin/index.html](admin/index.html) to draft writeups through a local admin panel. It stores drafts in your browser, generates a polished `README.md`, supports screenshot references, and keeps the report tone consistent.

## Repository Structure

```text
ctf-writeups/
├── README.md
├── admin/
│   └── index.html
├── templates/
│   └── writeup-template.md
├── tryhackme/
│   └── room-name/
│       ├── README.md
│       └── screenshots/
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
