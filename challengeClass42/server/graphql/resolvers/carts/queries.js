import { getCartById, getProductsCartById } from "../../../dto/cartControllers.js";

export const cartQueries = {
    oneCart: async (_, { id }) => await getCartById(id),

    productsInCart: async (_, { id }) => await getProductsCartById(id)
}