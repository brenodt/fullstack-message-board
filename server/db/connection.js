const monk = require('monk');

const connectionString = 'db:27017'

const db = monk(connectionString);

module.exports = db;