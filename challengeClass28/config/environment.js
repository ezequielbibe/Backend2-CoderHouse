import * as dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

dotenv.config()
const yarg = yargs(hideBin(process.argv)).alias({
    p: 'puerto',
}).default({
    puerto: 8080,
}).argv

export const mongoAtlas = process.env.MONGO_ATLAS
export const mongoLocal = process.env.MONGO_LOCAL
export const mariaDB = process.env.MARIA_DB
export const PORT = yarg.puerto

export const arg = process.argv
export const plataformVersion = process.env.OS
export const nodeVersion = process.versions.node
export const memoryUsage = process.memoryUsage.rss()
export const exePath = process.execPath
export const pid = process.pid
export const fileProyect = process.env.PWD