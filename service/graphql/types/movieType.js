module.exports = `
    type Movie {
        _id: ID!,
        name: String!,
        logo: String!,
        description: String!,
        price: Int!,
        release_date: String!,
        soundtrack: SoundTrack!
    }

    type Query {
        movies: [Movie]
        movie(id: ID!): Movie
    }


`;
