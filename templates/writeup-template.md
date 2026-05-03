# Platform: Room / Machine Name

## Overview

**Platform:** TryHackMe / Hack The Box / picoCTF  
**Room/Machine:** Name  
**Difficulty:** Easy / Medium / Hard  
**Category:** Web / Linux / Windows / AD / Forensics / Crypto  
**Date Completed:** DD Month YYYY  

## Objective

Briefly explain what the challenge required.

Example:

The goal was to enumerate exposed services, identify a vulnerable web application, gain initial access, and escalate privileges to root.

## Lab Setup

- Attacker Machine: Kali Linux
- Target: CTF-provided machine
- Network: VPN / browser-based lab

## Reconnaissance

### Port Scanning

Command used:

```bash
nmap -sC -sV -oN nmap.txt <target-ip>
```

Key findings:

```text
22/tcp open  ssh
80/tcp open  http
```

Summary:

The scan revealed SSH and HTTP services. Since port 80 was open, I started web enumeration.

### Web Enumeration

Tools used:

```bash
whatweb http://<target-ip>
gobuster dir -u http://<target-ip> -w /usr/share/wordlists/dirb/common.txt
```

Interesting findings:

- `/admin`
- `/uploads`
- outdated CMS version
- login page exposed

## Exploitation

Explain the vulnerability clearly.

Example:

The web application allowed file uploads without validating the file extension properly. I uploaded a PHP reverse shell by bypassing the extension filter.

Command or payload:

```bash
nc -lvnp 4444
```

Result:

Initial shell was obtained as the `www-data` user.

## Initial Access

```bash
whoami
id
hostname
```

Finding:

```text
www-data
```

At this stage, I had a low-privileged shell and began local enumeration.

## Privilege Escalation

Enumeration commands:

```bash
sudo -l
find / -perm -4000 2>/dev/null
cat /etc/crontab
```

Key finding:

The user had permission to run a specific binary as root without a password.

Exploitation:

```bash
sudo /path/to/binary
```

Result:

Root access was obtained.

## Flags

Avoid exposing active platform flags if the platform does not allow it.

```text
user.txt: [redacted]
root.txt: [redacted]
```

## Tools Used

| Tool | Purpose |
|---|---|
| Nmap | Port scanning and service detection |
| Gobuster | Directory brute forcing |
| Burp Suite | Web request analysis |
| Netcat | Reverse shell listener |
| LinPEAS | Linux privilege escalation enumeration |

## Lessons Learned

- Always enumerate web directories after finding HTTP services.
- File upload validation should check content, extension, and MIME type.
- `sudo -l` is one of the first checks after getting shell access.
- Misconfigured sudo permissions can lead to full system compromise.

## Mitigation Advice

For defenders, the issue could be prevented by:

- Restricting dangerous sudo permissions
- Validating uploaded files server-side
- Disabling execution inside upload directories
- Keeping CMS/software versions updated
- Monitoring suspicious reverse shell behavior
- Reviewing exposed admin panels

## References

- https://gtfobins.github.io/
- https://book.hacktricks.xyz/
- https://tryhackme.com/
