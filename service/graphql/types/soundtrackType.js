module.exports = `
    type SoundTrack {
        _id: ID!
        title: String!
    }

    type Query {
        soundtracks: [SoundTrack]
    }
`