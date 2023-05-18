import { createUser } from "../../../dto/authController.js"

export const usersMutations = {
    addUser: async (_, { user }) => await createUser(user)
}