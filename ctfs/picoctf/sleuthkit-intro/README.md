# picoCTF: sleuthkit intro

## Overview

**Platform:** picoCTF  
**Challenge:** sleuthkit intro  
**Difficulty:** Medium  
**Category:** Forensics  
**Date Completed:** May 16, 2026  
**File/URL:** disk.img.gz, remote checker service  
**Repo Path:** `ctfs/picoctf/sleuthkit-intro/README.md`

## Report Content

### Objective

Download the disk image, identify the size of the Linux partition using mmls, then submit the answer to the remote checker service to obtain the flag.

### Lab Setup

- Environment: Kali Linux
- Artifact: disk.img.gz
- Remote Service: remote checker service

### Evidence Overview

Initial file inspection:
file disk.img.gz
Output:
disk.img.gz: gzip compressed data, was "disk.img"

Extracted the image:
gzip -d disk.img.gz

Verified the extracted file:
file disk.img
Output:
disk.img: DOS/MBR boot sector; partition 1 : ID=0x83, active, startsector 2048, 202752 sectors

### Analysis Process

The extracted disk image was examined with Sleuth Kit's `mmls` utility to inspect the partition table.
Command:
mmls disk.img
Finding

The Linux partition size was identified as:
202752 sectors
This value was submitted to the remote checker service to retrieve the flag.

### Commands And Evidence

```bash
file disk.img.gz
gzip -d disk.img.gz
file disk.img
mmls disk.img
```

### Forensic Findings

- The provided artifact was a compressed disk image.
- The disk used an MBR partition scheme.
- A Linux partition (0x83) was identified within the image.
- mmls successfully revealed the partition layout and sector size information.
- The recovered partition size was submitted to the remote checker service to obtain the flag.

### Flag Recovery

```text
[redacted]
```

### Conclusion

Always verify the true file type before beginning analysis.
Disk images should be examined with partition analysis tools such as Sleuth Kit.
Metadata and partition structures often contain the key information required in forensic challenges.

## Tools Used

| Tool | Purpose |
|---|---|
| file | Identify file type |
| gzip | Extract compressed image |
| mmls | Display partition layout |

## Screenshots

Add screenshot files to the `screenshots/` folder, then reference them here.

## Lessons Learned

- Verify the true file type before beginning deeper forensic analysis.
- Use partition analysis tools such as `mmls` when working with raw disk images.
- Record sector counts exactly when a challenge asks for partition size.

## Mitigation Advice

- Sanitize distributed disk images before publication.
- Avoid storing sensitive data in downloadable forensic artifacts.
- Validate release files for unintended embedded information.

## References

- [The Sleuth Kit Documentation](https://www.sleuthkit.org/sleuthkit/)
- [CTF101 Forensics Guide](https://ctf101.org/forensics/overview/)
