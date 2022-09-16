import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

data = '123'

key = 'AAAAAAAAAAAAAAAA'

def encrypt(raw):
    raw = pad(raw.encode(), 16)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    result = base64.b64encode(cipher.encrypt(raw))
    return result.decode("utf-8", "ignore")


def decrypt(enc):
    print(enc)
    enc = base64.b64decode(enc)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    result =  unpad(cipher.decrypt(enc), 16)
    return result.decode("utf-8", "ignore")

print(encrypt(data))