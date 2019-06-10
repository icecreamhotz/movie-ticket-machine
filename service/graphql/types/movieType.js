module.exports = `
    type Movie {
        _id: ID!,
        name: String!,
        logo: String!,
        description: String!,
        price: Int!,
        soundtrack: SoundTrack!
    }

    type Query {
        movies: [Movie]
    }
`