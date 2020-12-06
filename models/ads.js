const mongoose = require('mongoose')

// Ads schema to store data of advertisement to the mongoDb
const AdsSchema = new mongoose.Schema({
    item: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    condition: {
        type: String
    }
});

const Adds = mongoose.model("Ads", AdsSchema);
module.exports = Adds;