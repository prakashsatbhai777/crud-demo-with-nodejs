const config = require('config');
const port = config.get('server.port');
const host = config.get('server.host');

const express = require('express');
const app = express();
console.log("App listen at port 5000");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const quote_routes = require('./routes/quote');

app.get('/', function (req, res) {
    console.log('App is working');
    res.send({ status: "success", message: "App is working" });
});

app.use('/quote', quote_routes);

app.get('/*', function (req, res) {
    res.status(404).send({ status: "error", message: "Route not found." });
});

app.listen(port);