module.exports = `
    type Reserve {
        _id: ID!,
        email: User,
        price_total: Int!,
        money: Int!,
        change_total: Int!,
        people_total: Int!,
        createdAt: String!,
        movie: Movie!
    }

    type Query {
        reserveMovieById(_id: ID!): Reserve!
    }

    type Mutation {
        reserveMovie(email: String, price_total: Int!, money: Int!, change_total: Int!,people_total: Int!,createdAt: String!, movie: String!): Reserve!
    }
`;
