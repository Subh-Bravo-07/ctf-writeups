# CTF Writeups

Polished cybersecurity writeups from TryHackMe, Hack The Box, picoCTF, and other CTF platforms.

Each writeup focuses on methodology, enumeration, exploitation flow, privilege escalation, and defensive takeaways.

## Platforms

| Platform | Category | Writeups |
|---|---|---|
| TryHackMe | Beginner to Intermediate | [Basic Pentesting](ctfs/tryhackme/basic-pentesting/README.md), [RootMe](ctfs/tryhackme/rootme/README.md) |
| Hack The Box | Intermediate | Coming soon |
| picoCTF | Cryptography, Forensics | [rsa_oracle](ctfs/picoctf/rsa-oracle/README.md), [sleuthkit intro](ctfs/picoctf/sleuthkit-intro/README.md), [sleuthkit-apprentice](ctfs/picoctf/sleuthkit-apprentice/README.md), [St3g0](ctfs/picoctf/st3g0/README.md) |
| Other | Mixed | Coming soon |

## Featured Writeups

- [Basic Pentesting](ctfs/tryhackme/basic-pentesting/README.md) - TryHackMe writeup for Basic Pentesting.
- [RootMe](ctfs/tryhackme/rootme/README.md) - TryHackMe writeup for RootMe.
- [rsa_oracle](ctfs/picoctf/rsa-oracle/README.md) - Exploit the bank's encryption oracle to recover the encrypted password, then use the decrypted password to decrypt the intercepted ciphertext message.
- [sleuthkit intro](ctfs/picoctf/sleuthkit-intro/README.md) - Download the disk image, identify the size of the Linux partition using mmls, then submit the answer to the remote checker service to obtain the flag.
- [sleuthkit-apprentice](ctfs/picoctf/sleuthkit-apprentice/README.md) - Recover the hidden flag from the provided forensic disk image (disk.flag.img).
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

## Repository Structure

```text
ctf-writeups/
├── README.md
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
