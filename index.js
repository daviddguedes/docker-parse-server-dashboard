const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();

const parseServer = new ParseServer({
    databaseURI: 'mongodb://mongo:27017/dev',
    cloud: 'cloud/main.js',
    appId: 'appId',
    masterKey: 'masterKey',
    serverURL: 'http://app:1337/parse',
    publicServerURL: 'http://app:1337/parse'
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

app.listen(1337, function () {
    console.log('parse-server running on port 1337.');
});