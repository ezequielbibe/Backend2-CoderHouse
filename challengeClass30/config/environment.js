import * as dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cpus } from 'os' 

dotenv.config()
const yarg = yargs(hideBin(process.argv)).alias({
    p: 'port',
    m: 'mode'
}).default({
    port: 8080,
    mode: 'fork'
}).argv

export const mongoAtlas = process.env.MONGO_ATLAS
export const mongoLocal = process.env.MONGO_LOCAL
export const mariaDB = process.env.MARIA_DB
export const PORT = yarg.port
export const MODE = yarg.mode

export const arg = process.argv
export const plataformVersion = process.env.OS
export const nodeVersion = process.versions.node
export const memoryUsage = process.memoryUsage.rss()
export const exePath = process.execPath
export const pid = process.pid
export const fileProyect = process.env.PWD
export const processors = cpus()