import { cartQueries } from "./carts/queries.js";
import { productQueries } from "./products/queries.js";
import { userQueries } from "./users/queries.js";
import { usersMutations } from "./users/mutations.js";
import { productMutations } from "./products/mutations.js";
import { cartMutations } from "./carts/mutations.js";

export const resolvers = {
    Query: {
        ...userQueries, ...productQueries, ...cartQueries,
    },

    Mutation: {
        ...usersMutations, ...productMutations, ...cartMutations,
    }
}