import { getCartById } from "../../../dto/cartControllers.js";

export const cartQueries = {
    oneCart: async (_, { id }) => await getCartById(id)
}