require('dotenv').config();
const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();

const parseServer = new ParseServer({
    databaseURI: process.env.MONGO_DATABASE_URI,
    cloud: 'cloud/main.js',
    appId: 'appId',
    masterKey: 'masterKey',
    serverURL: 'https://0.0.0.0:8080/parse',
    publicServerURL: 'https://0.0.0.0:8080/parse'
});

const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: '/graphql',
        playgroundPath: '/playground'
    }
);

app.use('/parse', parseServer.app); 
parseGraphQLServer.applyGraphQL(app); 
parseGraphQLServer.applyPlayground(app); 

app.listen(8080, function () {
    console.log(`parse-server running on port ${process.env.PORT}.`);
});