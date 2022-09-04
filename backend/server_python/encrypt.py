import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

data = 'Hello World'

key = 'AAAAAAAAAAAAAAAA'

def encrypt(raw):
    raw = pad(raw.encode(),16)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    return base64.b64encode(cipher.encrypt(raw))

def decrypt(enc):
    enc = base64.b64decode(enc)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    return unpad (cipher.decrypt(enc), 16)

def binarystring_to_bytes(s):
    v = int(s,2)
    b = bytearray()
    while v:
        b.append(v & 0xff)
        v >>= 8
    return bytes(b[::-1])