import { Schema, model } from "mongoose"

const usersSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    age: { type: Number, required: true},
    address: { type: String, required: true},
    phone: { type: String, required: true},
    avatar: { type: String, required: true},
    admin: { type: Boolean, required: false}
})

const Users = model('User', usersSchema)

export default Users