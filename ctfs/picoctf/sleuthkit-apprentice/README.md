# picoCTF: sleuthkit-apprentice

## Overview

**Platform:** picoCTF  
**Challenge:** sleuthkit-apprentice  
**Difficulty:** Medium  
**Category:** Forensics  
**Date Completed:** May 15, 2026  
**File/URL:** disk.flag.img.gz  
**Repo Path:** `ctfs/picoctf/sleuthkit-apprentice/README.md`

## Report Content

### Objective

Recover the hidden flag from the provided forensic disk image (disk.flag.img).

### Lab Setup

- Kali Linux environment
- The Sleuth Kit (mmls, fls, icat)

### Evidence Overview

Artifact: disk.flag.img (raw disk image)
File system: Linux (EXT)

### Analysis Process

1. Partition table analysis

```bash
mmls disk.flag.img
```

Output summary:

```text
DOS Partition Table
Slot 002: Linux partition (offset 2048, length 204800 sectors)
Slot 003: Linux Swap (offset 206848)
Slot 004: Linux partition (offset 360448, length 253952 sectors)
```

2. File system exploration

Used fls to list files in each Linux partition:

```bash
# Primary Linux partition (offset 2048)
fls -r -o 2048 disk.flag.img | grep -i flag   # (no results)

# Swap partition (offset 206848) - not useful

# Second Linux partition (offset 360448)
fls -r -o 360448 disk.flag.img | grep -i flag
```

Key findings:

```text
++ r/r * 2082(realloc): flag.txt
++ r/r 2371: flag.uni.txt
```

3. Flag recovery

```bash
icat -o 360448 disk.flag.img 2371
```

### Commands And Evidence

```bash
# 1. Analyze partition table
mmls disk.flag.img

# 2. Check first Linux partition (offset 2048) for flag files
fls -r -o 2048 disk.flag.img | grep -i flag

# 3. Check second Linux partition (offset 360448) for flag files
fls -r -o 360448 disk.flag.img | grep -i flag

# 4. Extract the flag file using inode 2371
icat -o 360448 disk.flag.img 2371
```

Output:

```text
++ r/r * 2082(realloc): flag.txt
++ r/r 2371: flag.uni.txt
```

### Forensic Findings

- The flag was stored in the second Linux partition (starting at sector 360448) in the file flag.uni.txt (inode 2371).
- The file was successfully carved using icat.

### Flag Recovery

```text
[redacted]
```

### Conclusion

The challenge was completed and the key steps were documented for future reference.

## Tools Used

| Tool | Purpose |
|---|---|
| mmls | Inspect the disk image partition table |
| fls | Recursively list files from the target filesystem |
| icat | Extract the recovered flag file by inode |

## Screenshots

Add screenshot files to the `screenshots/` folder, then reference them here.

## Lessons Learned

- Always analyze all partitions found by mmls, not just the first one.
- Use fls -r recursively and filter with grep for quick flag hunting.
- icat is very effective for direct file extraction when inode is known.

## Mitigation Advice

- Always use secure wipe tools (e.g., shred, wipe, or blkdiscard) instead of simple delete to prevent file recovery from unallocated space.
- Enable full-disk encryption (LUKS/BitLocker) to protect data even if an attacker obtains the disk image.
- Regularly audit partition tables and run filesystem integrity checks to detect hidden or unexpected partitions.

## References

- [The Sleuth Kit Documentation](https://sleuthkit.org/sleuthkit/docs.php)
- [CTF101 - Forensics](https://ctf101.org/forensics/introduction/)
