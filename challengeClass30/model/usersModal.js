import { Schema, model } from "mongoose"

const usersSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
})

const Users = model('User', usersSchema)

export default Users