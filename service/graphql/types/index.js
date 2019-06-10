const {
    mergeTypes
} = require('merge-graphql-schemas')
const movieType = require('./movieType')
const soundtrackType = require('./soundtrackType')

const types = [
    movieType,
    soundtrackType
]

module.exports = mergeTypes(types)