export const typeDefs = `#graphql

    type User { 
        _id: ID!
        email: String!
        password: String!
        name: String!
        age: Int!
        address: String!
        phone: String!
        avatar: String!
        admin: Boolean!
    }

    input UserToAdd {
        email: String!
        password: String!
        name: String!
        age: Int!
        address: String!
        phone: String!
        avatar: String!
    }

    type Product {
        _id: ID!
        timeStamp: String!
        prodName: String!
        description: String!
        code: Int!
        price: Int!
        photo: String!
        stock: Int!
    }

    input ProductToAdd {
        timeStamp: String!
        prodName: String!
        description: String!
        code: Int!
        price: Int!
        photo: String!
        stock: Int!
    }

    type Cart {
        _id: ID!
        id: ID!
        timeStamp: String!
        products: [Product]!
    }

    input CartToAdd {
        id: ID!
        timeStamp: String!
        products: [ProductCart]
    }
    
    input ProductCart {
        _id: ID!
        timeStamp: String!
        prodName: String!
        description: String!
        code: Int!
        price: Int!
        photo: String!
        stock: Int!
    }

    type Query {
        allUsers: [User]!
        oneUser(email: String!): User!

        oneProduct(id: String!): Product!
        allProducts: [Product]!

        oneCart(id: ID!): Cart
        productsInCart(id: ID!): [Product]!
    }

    type Mutation {
        addUser(user: UserToAdd!): User!

        addProduct(product: ProductToAdd): Product!
        updateProduct(id: ID!, product: ProductToAdd!): Product!
        removeProduct(id: ID!): Product!

        addCart(cart: CartToAdd!): Cart
        addProductInCart(id: ID!, product: ProductCart!): Cart
        clearCart(id: ID!): String
        removeOneProduct(id: ID!, _id: ID!): String
    }
`