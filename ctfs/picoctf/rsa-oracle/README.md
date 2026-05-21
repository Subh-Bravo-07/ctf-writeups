# picoCTF: rsa_oracle

## Overview

**Platform:** picoCTF  
**Challenge:** rsa_oracle  
**Difficulty:** Medium  
**Category:** Cryptography  
**Date Completed:** May 15, 2026  
**File/URL:** secret.enc, password.enc, remote oracle service  
**Repo Path:** `ctfs/picoctf/rsa-oracle/README.md`

## Report Content

### Objective

Exploit the bank's encryption oracle to recover the encrypted password, then use the decrypted password to decrypt the intercepted ciphertext message.

### Lab Setup

- Target Oracle Service: remote oracle service
- Scenario: An attacker intercepted an encrypted message and the encrypted password used to encrypt it.
- Oracle Behavior: The bank exposes an oracle capable of decrypting arbitrary ciphertexts except the encrypted password directly.

### Challenge Overview

The challenge material was reviewed for RSA encryption behavior, oracle restrictions, ciphertext malleability, and known weaknesses. The oracle could decrypt arbitrary ciphertexts except the target password ciphertext, making it vulnerable to an RSA blinding attack.

### Cipher / Algorithm Identification

The challenge material was reviewed for RSA encryption behavior, oracle restrictions, ciphertext malleability, and known weaknesses. The oracle could decrypt arbitrary ciphertexts except the target password ciphertext, making it vulnerable to an RSA blinding attack.

### Encoding / Encryption Analysis

The challenge material was reviewed for RSA encryption behavior, oracle restrictions, ciphertext malleability, and known weaknesses. The oracle could decrypt arbitrary ciphertexts except the target password ciphertext, making it vulnerable to an RSA blinding attack.

### Key Analysis

The challenge material was reviewed for RSA encryption behavior, oracle restrictions, ciphertext malleability, and known weaknesses. The oracle could decrypt arbitrary ciphertexts except the target password ciphertext, making it vulnerable to an RSA blinding attack.

### Decryption Process

RSA blinding was used by multiplying the target ciphertext with a blinded value before submitting it to the oracle. The oracle decrypted the modified ciphertext, and the blinding factor was then removed mathematically to recover the original password. The recovered password was used to decrypt the intercepted message and verify the final flag.

### Commands And Evidence

```bash
cat password.enc
cat secret.enc
xxd -p secret.enc

nc <oracle-host> <oracle-port>
python rsa_blind.py

# RSA modulus recovery
from math import gcd

e = 65537

pairs = [
    (0x32, 4707619883686427763240856106433203231481313994680729548861877810439954027216515481620077982254465432294427487895036699854948548980054737181231034760249505),
    (0x33, 1998517197048216725617978890728205902760633363770165103499700157925986170022682604311921651991344892635565706489644418147980643978563559991322776155635395),
    (0x34, 3993239489061277327472930109138093827255646312769901312414509207541733524779884801267968848884701166599834406248783129646083261476137481855550108336137485),
]

g = 0
for m, c in pairs:
    g = gcd(g, pow(m, e) - c)

print(g)

# RSA blinding
e = 65537
n = 5507598452356422225755194020880876452588463543445995226287547479009566151786764261801368190219042978883834809435145954028371516656752643743433517325277971

password_enc = 3567252736412634555920569398403787395170577668834666742330267390011828943495692402033350307843527370186546259265692029368644049938630024394169760506488003

r = 2
c_blind = password_enc * pow(r, e, n) % n
print(c_blind)

# Oracle decrypted blinded ciphertext:
# 66666272c6

m_blind = int("66666272c6", 16)
m = m_blind * pow(2, -1, n) % n

print(bytes.fromhex(hex(m)[2:]).decode())

# Recovered password:
# [redacted]

xxd -p secret.enc
# 53616c7465645f5f75b7d8976fc13361...
binwalk secret.enc
# OpenSSL structure:
# Salted__ | 75b7d8976fc13361 | ciphertext

openssl enc -d -aes-256-cbc -md md5 -in secret.enc -out secret.dec -pass pass:'[redacted]'
cat secret.dec
```

### Scripts / Tools Used

```bash
cat password.enc
cat secret.enc
xxd -p secret.enc

nc <oracle-host> <oracle-port>
python rsa_blind.py

# RSA modulus recovery
from math import gcd

e = 65537

pairs = [
    (0x32, 4707619883686427763240856106433203231481313994680729548861877810439954027216515481620077982254465432294427487895036699854948548980054737181231034760249505),
    (0x33, 1998517197048216725617978890728205902760633363770165103499700157925986170022682604311921651991344892635565706489644418147980643978563559991322776155635395),
    (0x34, 3993239489061277327472930109138093827255646312769901312414509207541733524779884801267968848884701166599834406248783129646083261476137481855550108336137485),
]

g = 0
for m, c in pairs:
    g = gcd(g, pow(m, e) - c)

print(g)

# RSA blinding
e = 65537
n = 5507598452356422225755194020880876452588463543445995226287547479009566151786764261801368190219042978883834809435145954028371516656752643743433517325277971

password_enc = 3567252736412634555920569398403787395170577668834666742330267390011828943495692402033350307843527370186546259265692029368644049938630024394169760506488003

r = 2
c_blind = password_enc * pow(r, e, n) % n
print(c_blind)

# Oracle decrypted blinded ciphertext:
# 66666272c6

m_blind = int("66666272c6", 16)
m = m_blind * pow(2, -1, n) % n

print(bytes.fromhex(hex(m)[2:]).decode())

# Recovered password:
# [redacted]

xxd -p secret.enc
# 53616c7465645f5f75b7d8976fc13361...
binwalk secret.enc
# OpenSSL structure:
# Salted__ | 75b7d8976fc13361 | ciphertext

openssl enc -d -aes-256-cbc -md md5 -in secret.enc -out secret.dec -pass pass:'[redacted]'
cat secret.dec
```

### Cryptographic Findings

- password.enc contained an RSA ciphertext.
- The oracle allowed encrypting chosen plaintexts and decrypting arbitrary ciphertexts.
- By encrypting known plaintexts "2", "3", and "4", the RSA modulus n was recovered using gcd(m^e - c).
- RSA blinding was used to bypass direct decryption restrictions.
- Random blinding value used: r = 2.
- The blinded ciphertext decrypted to 0x66666272c6.
- After multiplying by 2^-1 mod n, the recovered plaintext password was `[redacted]`.
- binwalk was used to inspect secret.enc and identify the OpenSSL salted structure.
- secret.enc contained an OpenSSL Salted__ header.
- xxd confirmed the file began with the hex bytes for Salted__.
- Salt value was 0x75B7D8976FC13361.

### Flag Recovery

```text
[redacted]
```

### Conclusion

- Check whether an RSA oracle allows chosen plaintext encryption.
- Known plaintext/ciphertext pairs can leak the modulus using gcd(m^e - c).
- RSA's multiplicative property enables blinding attacks.
- OpenSSL salted files can be recognized by the Salted__ header.
- Preserve intermediate values such as modulus, blinded ciphertext, oracle output, salt, and recovered password for reproducibility.

## Tools Used

| Tool | Purpose |
|---|---|
| nc | Interact with the RSA oracle |
| Python | Recover RSA modulus and perform RSA blinding |
| gcd | Recover modulus from known plaintext/ciphertext pairs |
| binwalk | Inspect secret.enc and identify the OpenSSL salted structure |
| xxd | Inspect secret.enc bytes and identify OpenSSL salted header |
| OpenSSL | Decrypt secret.enc using recovered password |

## Screenshots

Add screenshot files to the `screenshots/` folder, then reference them here.

## Lessons Learned

- Check whether an RSA oracle allows chosen plaintext encryption.
- Known plaintext and ciphertext pairs can leak the modulus using `gcd(m^e - c)`.
- RSA's multiplicative property enables blinding attacks when textbook RSA is exposed.

## Mitigation Advice

- Do not expose unrestricted RSA encryption or decryption oracles.
- Use padding schemes such as OAEP for RSA encryption.
- Use authenticated encryption for protected file contents.

## References

- https://ctf101.org/cryptography/what-is-rsa/
- https://en.wikipedia.org/wiki/RSA_blinding
- https://docs.openssl.org/master/man1/openssl-enc/
