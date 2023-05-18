import { addProductCartById, clearCart, createCart, removeProductCart } from "../../../dto/cartControllers.js";

export const cartMutations = {
    addCart: async (_, { newCart }) => await createCart(newCart),

    addProductInCart: async (_, { id, product }) => await addProductCartById(id, product),

    clearCart: async (_, { id }) => await clearCart(id),

    removeOneProduct: async (_, { id, _id}) => await removeProductCart(id, _id),
}