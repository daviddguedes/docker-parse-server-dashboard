const express = require('express');
const ParseDashboard = require('parse-dashboard');

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "appId",
            "masterKey": "masterKey",
            "appName": "Go Parse!"
        }
    ],
    "users": [
        {
            "user": "admin",
            "pass": "admin"
        }
    ]
}, options);

const app = express();

app.use('/dashboard', dashboard);

const httpServer = require('http').createServer(app);
httpServer.listen(4040);