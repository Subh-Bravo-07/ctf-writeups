# picoCTF: St3g0

## Overview

**Platform:** picoCTF  
**Challenge:** St3g0  
**Difficulty:** Medium  
**Category:** Forensics  
**Date Completed:** May 15, 2026  
**File/URL:** pico.flag.png  
**Repo Path:** `ctfs/picoctf/st3g0/README.md`

## Report Content

### Objective

Download the provided image file and identify the hidden flag concealed within it.

### Lab Setup

- No additional setup was required. The investigation was performed using standard forensic and steganography analysis tools on the provided PNG artifact.

### Evidence Overview

The downloaded image was examined to determine its true file structure and identify any hidden or embedded content. Initial analysis focused on:

File type validation
Metadata inspection
Embedded or appended data detection
Steganography analysis techniques

### Analysis Process

Multiple forensic utilities were used to inspect the image and uncover concealed data. During the investigation, evidence of hidden content embedded through steganographic methods was identified.

### Commands And Evidence

```bash
exiftool pico.flag.png
binwalk pico.flag.png
zsteg pico.flag.png
```

### Forensic Findings

- The challenge artifact was a PNG image containing hidden embedded data.
- binwalk revealed compressed ZLIB-related content within the file structure.
- zsteg successfully identified hidden data stored using LSB (Least Significant Bit) steganography techniques.
- The concealed flag was extracted through steganographic analysis.

### Flag Recovery

```text
[redacted]
```

### Conclusion

- Always verify the actual file structure before selecting analysis tools.
- Inspect metadata, embedded files, appended content, and steganographic channels during forensic investigations.
- PNG files commonly conceal information using LSB-based techniques.

## Tools Used

| Tool | Purpose |
|---|---|
| binwalk | Detect embedded files and compressed data |
| ExifTool | Inspect metadata |
| zsteg | Extract hidden image data |

## Screenshots

Add screenshot files to the `screenshots/` folder, then reference them here.

## Lessons Learned

- Verify the actual file structure before selecting analysis tools.
- Inspect metadata, embedded files, appended content, and steganographic channels during image forensics.
- Use tools such as `binwalk` and `zsteg` when PNG content appears suspicious.

## Mitigation Advice

- Remove unnecessary metadata before publishing media files.
- Avoid storing sensitive information inside downloadable assets.
- Scan distributed files for hidden or embedded content prior to release.

## References

- [zsteg GitHub Repository](https://github.com/zed-0xff/zsteg)
- [CTF101 – Steganography Overview](https://ctf101.org/forensics/what-is-stegonagraphy/)
