require('dotenv').config();
const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');
const PORT = process.env.PORT;

const app = express();

const parseServer = new ParseServer({
    databaseURI: process.env.MONGO_DATABASE_URI,
    cloud: 'cloud/main.js',
    appId: 'appId',
    masterKey: 'masterKey',
    serverURL: `https://nameless-caverns-38675.herokuapp.com/parse`,
    publicServerURL: `https://nameless-caverns-38675.herokuapp.com/parse`,
    liveQuery: {
        classNames: ['Event']
    }
});

const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: '/graphql',
        playgroundPath: '/playground'
    }
);

app.get('/', (req, res) => res.send('Running...'));

app.use('/parse', parseServer.app);
parseGraphQLServer.applyGraphQL(app);
parseGraphQLServer.applyPlayground(app);

let httpServer = require('http').createServer(app);
httpServer.listen(PORT);
ParseServer.createLiveQueryServer(httpServer);