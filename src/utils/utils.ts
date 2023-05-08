import crypto from "crypto-js";

export const decryptMessage = (key, message, iv) => {
    let _key = crypto.enc.Hex.parse(key);
    const result = crypto.AES.decrypt(message, _key, {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      format: crypto.format.Hex,
    }).toString(crypto.enc.Utf8);
    return result;
  };
  
 