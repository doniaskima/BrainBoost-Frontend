import CryptoJS from 'crypto-js';

export const decryptMessage = (
  key: string,
  message: string,
  iv: string
): string => {
  const decrypted = CryptoJS.AES.decrypt(message, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
  });
  const result = decrypted.toString(CryptoJS.enc.Utf8);
  return result;
};


export function emailValidate(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}
