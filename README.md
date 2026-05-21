# CTF Writeups

A curated CTF writeup collection with a public dashboard for tracking platforms, categories, techniques, and solve history.

Dashboard: [Open CTF Dashboard](https://subh-bravo-07.github.io/ctf-writeups/dashboard/)

Each writeup focuses on methodology, enumeration, exploitation flow, privilege escalation, and defensive takeaways. Public dashboard data is sanitized and derived from the writeups in `ctfs/`.

## Platforms

| Platform | Category | Writeups |
|---|---|---|
| TryHackMe | Beginner to Intermediate | [Basic Pentesting](ctfs/tryhackme/basic-pentesting/README.md), [RootMe](ctfs/tryhackme/rootme/README.md) |
| Hack The Box | Intermediate | Coming soon |
| picoCTF | Cryptography, Forensics | [rsa_oracle](ctfs/picoctf/rsa-oracle/README.md), [sleuthkit intro](ctfs/picoctf/sleuthkit-intro/README.md), [sleuthkit-apprentice](ctfs/picoctf/sleuthkit-apprentice/README.md), [St3g0](ctfs/picoctf/st3g0/README.md) |
| Other | Mixed | Coming soon |

## Public Dashboard

The static dashboard lives in [`dashboard/`](dashboard/) and provides a read-only portfolio view of the public writeups.

It includes:

1. Overview cards for writeups, platforms, categories, latest completion, and strongest category.
2. Platform, category, difficulty, tool, skill, and timeline analytics.
3. Searchable and filterable writeup browser.
4. Detail views with objective, analysis path, findings, lessons learned, and mitigation advice.
5. Progress tracking for published, draft, and coming soon states.

The dashboard uses plain HTML, CSS, and JavaScript. No backend, login system, or private admin dependency is required.

## Featured Writeups

- [Basic Pentesting](ctfs/tryhackme/basic-pentesting/README.md) - TryHackMe writeup for Basic Pentesting.
- [RootMe](ctfs/tryhackme/rootme/README.md) - TryHackMe writeup for RootMe.
- [rsa_oracle](ctfs/picoctf/rsa-oracle/README.md) - Exploit the bank's encryption oracle to recover the encrypted password, then use the decrypted password to decrypt the intercepted ciphertext message.
- [sleuthkit intro](ctfs/picoctf/sleuthkit-intro/README.md) - Download the disk image, identify the size of the Linux partition using mmls, then submit the answer to the remote checker service to obtain the flag.
- [sleuthkit-apprentice](ctfs/picoctf/sleuthkit-apprentice/README.md) - Recover the hidden flag from the provided forensic disk image.
- [St3g0](ctfs/picoctf/st3g0/README.md) - Download the provided image file and identify the hidden flag concealed within it.

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

## Dashboard Data

Dashboard records live in [`dashboard/data/writeups.json`](dashboard/data/writeups.json). This file is the sanitized public index used by the frontend.

Each record can include title, slug, platform, categories, difficulty, completion date, status, summary, objective, analysis path, findings, lessons learned, mitigation advice, tools, skills, and a link back to the Markdown writeup.

Published analytics intentionally count only records marked `Published`. Draft and coming soon placeholders remain visible in the browser but do not inflate published progress metrics.

## Publishing Policy

This repository is public-facing and should contain only sanitized educational material.

- Flags must be redacted as `[redacted]`.
- Do not publish secrets, keys, VPN configs, tokens, passwords, hashes, credentials, loot, dumps, extracted files, packet captures, scanner XML, archives, or challenge binaries.
- Do not add challenge-provided files unless redistribution is clearly allowed.
- Do not publish active CTF writeups before the platform or event allows public disclosure.
- Do not expose sensitive target IPs from personal, private, or active infrastructure.
- Keep admin or editor functionality private and outside the published dashboard.

## Local Dashboard Preview

Because the dashboard loads `dashboard/data/writeups.json` with `fetch`, run it from a local static server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/dashboard/
```

For GitHub Pages, Netlify, or Vercel, publish the repository root so dashboard links can reach both `dashboard/` and `ctfs/`.

## Repository Structure

```text
ctf-writeups/
├── README.md
├── dashboard/
│   ├── index.html
│   ├── data/
│   │   └── writeups.json
│   └── src/
│       ├── app.js
│       └── styles.css
├── templates/
│   └── writeup-template.md
├── ctfs/
│   ├── tryhackme/
│   │   ├── basic-pentesting/
│   │   │   └── README.md
│   │   └── rootme/
│   │       └── README.md
│   ├── hackthebox/
│   ├── picoctf/
│   │   ├── rsa-oracle/
│   │   │   └── README.md
│   │   ├── sleuthkit-intro/
│   │   │   └── README.md
│   │   ├── sleuthkit-apprentice/
│   │   │   └── README.md
│   │   └── st3g0/
│   │       └── README.md
│   └── others/
└── assets/
    └── banner.png
```

## Writing Style

Each CTF should read like a mini security report, not a diary.

Example:

> Service enumeration identified an exposed HTTP application. Directory brute forcing revealed an admin panel, which became the primary attack surface.

## Disclaimer

All writeups are for educational purposes only and are based on legal CTF environments.
