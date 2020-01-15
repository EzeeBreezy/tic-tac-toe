const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   login: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   nickname: { type: String, default: 'NewPlayer' },
   avatar: { type: String, default: '//default-ava-link' }, //TODO change default ava link
   status: { type: String, default: 'READY' }, //READY PLAYING OFFLINE or READY PLAYING + keep online-offline in backend Redux?
   currentGame: { type: Types.ObjectId, ref: 'Game' }
})

module.exports = model('User', schema)
