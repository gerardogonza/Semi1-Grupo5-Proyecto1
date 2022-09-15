var CryptoJS = require("crypto-js");

var message = "USAC 2022";
var key = "AAAAAAAAAAAAAAAA"; //key used in Python
key = CryptoJS.enc.Utf8.parse(key);

function encrypt(raw) {
  var encrypted = CryptoJS.AES.encrypt(raw, key, {
    mode: CryptoJS.mode.ECB,
  });
  return (encrypted = encrypted.toString());
}

function decrypt(enc) {
  var decrypted = CryptoJS.AES.decrypt(enc, key, { mode: CryptoJS.mode.ECB });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;