const express = require('express');
const app = express();

let port = process.env.PORT || 8000

const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const typeDefs = require('./graphql/types/index');
const rootValue = require('./graphql/resolvers/index');

const schema = buildSchema(typeDefs)

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + "/public"))

require('./config/database')

app.use(require('./routes/routes'))
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}))

app.listen(port, () => {
    console.log("http://localhost:" + port + '/');
})