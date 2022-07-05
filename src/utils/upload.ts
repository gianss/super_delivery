import multer from 'multer'
import crypto from 'crypto'
import * as dotenv from 'dotenv'
dotenv.config()

export function upload (caminho): any {
   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${process.env.BASE_IMAGE}${caminho}`)
      },
      filename: function (req, file, cb) {
        cb(null, `${crypto.randomBytes(32).toString('hex')}-${file.originalname}`)
      }
  })
  return multer({ storage: storage })
}
