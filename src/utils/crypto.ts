import crypto from 'crypto-js'

const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

export function encrypto (buffer): any {
   return crypto.AES.encrypt(buffer, secretKey).toString()
};

export function decrypt (hash): any {
   const bytes = crypto.AES.decrypt(hash, secretKey)
   const originalText = bytes.toString(crypto.enc.Utf8)
   return originalText
}
