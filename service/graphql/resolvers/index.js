const {
    mergeResolvers
} = require('merge-graphql-schemas');
const movieResolver = require('./movieResolver');
const soundtrackResolver = require('./soundtrackResolver');

const resolvers = [
    movieResolver,
    soundtrackResolver,
];

module.exports = mergeResolvers(resolvers);