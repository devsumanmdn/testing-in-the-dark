const { Mongoose } = require("mongoose");

const databaseUri = process.env.MONGODB_ATLAS_DB_URI;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const primaryDB = new Mongoose();
primaryDB.connect(databaseUri, options);

// Exporting the connection so we can use on the models;
module.exports = { primaryDB };
