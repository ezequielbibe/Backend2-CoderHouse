import * as dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

dotenv.config()
const yarg = yargs(hideBin(process.argv)).alias({
    p: 'port',
}).default({
    port: 8080,
}).argv

export const mongoAtlas = process.env.MONGO_ATLAS
export const mongoLocal = process.env.MONGO_LOCAL

export const PORT = yarg.port
export const MODE = yarg.mode
export const PRIVATE_KEY = process.env.PRIVATE_KEY

export const EMAIL = process.env.EMAIL
export const PASS = process.env.PASS
export const HOST_EMAIL = process.env.HOST_EMAIL
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const ACCOUNT_SID = process.env.ACCOUNT_SID
export const AUTH_TOKEN = process.env.AUTH_TOKEN
export const ADMIN_NUMBER = process.env.ADMIN_NUMBER
export const PHONE_NUMBER_WP = process.env.PHONE_NUMBER_WP
export const PHONE_NUMBER_SMS = process.env.PHONE_NUMBER_SMS