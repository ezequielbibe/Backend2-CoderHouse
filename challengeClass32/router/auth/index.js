import passport from 'passport'
import mongoose from 'mongoose'
import { connectToMongoDB } from '../../config/index.js'
import { hashSync, compareSync} from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local';
import { usersMongo } from '../../daos/index.js'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (username, done) => {
  await connectToMongoDB()
  const users = await usersMongo.getData()
  await mongoose.disconnect()
  const user = users.find(user => user.email === username.email)
  done(null, user)
})

passport.use('login', new LocalStrategy(async (username, password, done) => {
  await connectToMongoDB()
  const user = await usersMongo.getOneData({ email: username })
  await mongoose.disconnect()
  if(!user) {
    done(null, false, { message: 'Invalid credentials' })
    return
  }
  if(compareSync(password, user.password)) {
    done(null, user)
    return
  }
  done(null, false, { message: 'Invalid credentials' })
}))

passport.use('register', new LocalStrategy(async (username, password, done) => {
  await connectToMongoDB()
  const userExist = await usersMongo.getOneData({ email: username })
  if(userExist) {
    done(null, false, { message: 'user already exists' })
    return
  }
  const user = { email: username, password: hashSync(password, 10) }
  await usersMongo.createData(user)
  mongoose.disconnect()
  done(null, user)
}))