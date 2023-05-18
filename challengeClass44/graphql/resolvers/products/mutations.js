import { createProduct, deleteProductById, updateProduct } from "../../../dto/productsControllers.js";

export const productMutations = {
    addProduct: async (_, { product }) => await createProduct(product),

    updateProduct: async (_, { id, product }) => await updateProduct(id, product),

    removeProduct: async (_, { id }) => await deleteProductById(id)
}