const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: {type: Number} }],
    },
    {timestamps:true}
)

const URL = mongoose.model('url',urlSchema); // url is the name of the model
//now the model is created so now we can use it to create, read, update and delete documents in the database

module.exports = URL;

