const { mergeResolvers } = require("merge-graphql-schemas");
const movieResolver = require("./movieResolver");
const soundtrackResolver = require("./soundtrackResolver");
const reserveResolver = require("./reserveResolver");

const resolvers = [movieResolver, soundtrackResolver, reserveResolver];

module.exports = mergeResolvers(resolvers);
