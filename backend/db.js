const { MongoClient } = require('mongodb');
const config = require('config');
const mongodbUrl = config.get('mongodb.url');

const client = new MongoClient(mongodbUrl);
const connectionResponse = client.connect();
connectionResponse ? console.log('Connected...') : console.log('Not Connected...');

module.exports = client;