import { getAllProducts, getProductById } from "../../../dto/productsControllers.js"

export const productQueries = {
    oneProduct: async (_, { id }) => await getProductById(id),

    allProducts: async () => await getAllProducts(),
}