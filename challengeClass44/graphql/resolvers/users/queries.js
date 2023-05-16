import { getAllUsers, getUserByEmail } from "../../../dto/authController.js"

export const userQueries = {
    allUsers: async () => await getAllUsers(),

    oneUser: async (_, { email }) => await getUserByEmail(email),
}