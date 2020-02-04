const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   players: [{ type: Types.ObjectId, ref: 'User' }],
   gameState: [{ type: String }], //TODO set default game state(state of game field)
   date: { type: Date, default: Date.now },
   inProgress: { type: Boolean, default: true },
   winner: { type: String, default: 'IN_PROGRESS' } //TODO do I use type: Types.ObjectId, ref: 'User' here?
})

//TODO shcema methods:
//? validate win -> assign winner
//? validate next turn
//? system messages
//? assign XO and frist turner
//? change turner
// schema.methods.getAt = function(x,y){
//    return this.gameState[y*9 + x]
// }
// game.getAt(4,4)
module.exports = model('Game', schema)
