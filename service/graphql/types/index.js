const { mergeTypes } = require("merge-graphql-schemas");
const movieType = require("./movieType");
const soundtrackType = require("./soundtrackType");
const reserveType = require("./reserveType");
const userType = require("./userType");

const types = [movieType, soundtrackType, reserveType, userType];

module.exports = mergeTypes(types);
