'use strict'
import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
require('dotenv/config')

export function generateToken (data: any): string {
   return jwt.sign({ data }, process.env.SALT_KEY)
}

export function decodeToken (data: any): any {
   try {
      return jwt.verify(data, process.env.SALT_KEY)
   } catch {
      return null
   }
}

export function authorize (req: Request, res: Response, next: NextFunction): any {
   const token: any = req.headers['x-access-token']
   if (!token) {
      res.status(401).json({
         mensagem: 'Acesso negado!'
      })
   } else {
      jwt.verify(token, process.env.SALT_KEY, function (error: any, decoded: any) {
         if (error) {
            res.status(401).json({
               mensagem: 'Acesso negado! Faça o login'
            })
         } else {
            next()
         }
      })
   }
}
