const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    message: { type: String, required: true }
})

module.exports = model('Message', schema)