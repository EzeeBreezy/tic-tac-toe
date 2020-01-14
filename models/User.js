const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   login: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   status: { type: String, required: true },
   game: { type: String,  }
//    links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema)