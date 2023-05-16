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

    type Query {
        allUsers: [User]!
        oneUser(email: String!): User!

        oneProduct(id: String!): Product!
        allProducts: [Product]!
    }

    type Mutation {
        addUser(user: UserToAdd!): User!
        addProduct(product: ProductToAdd): Product!
    }
`