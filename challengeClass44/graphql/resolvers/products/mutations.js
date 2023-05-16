import { createProduct } from "../../../dto/productsControllers.js";

export const productMutations = {
    addProduct: async (_, { product }) => await createProduct(product)
}