import passport from 'passport'
import { hashSync, compareSync} from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local';
import { usersMongo } from '../../daos/index.js'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (username, done) => {
  const users = await usersMongo.readAllData()
  const user = users.find(user => user.email === username.email)
  done(null, user)
})

passport.use('login', new LocalStrategy(async (username, password, done) => {
  const user = await usersMongo.readOneData({ email: username })
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
  const userExist = await usersMongo.readOneData({ email: username })
  if(userExist) {
    done(null, false, { message: 'user already exists' })
    return
  }
  const user = { email: username, password: hashSync(password, 10), admin: false}
  done(null, user)
}))