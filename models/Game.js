const { Schema, model, Types } = require('mongoose')
const { validateTurn } = require('../helpers/turnValidator')

const schema = new Schema({
   date: { type: Date, default: Date.now },
   playerX: { type: Types.ObjectId, ref: 'User' },
   playerO: { type: Types.ObjectId, ref: 'User' },
   winner: { type: String, default: 'IN_PROGRESS' },
   lastTurnCoords: { type: String, default: 'NONE' },
   nextTurn: { type: String, default: 'x' },
   boardState: [[[[String]]]],
   bigField: [[String]]
})

schema.methods.initNewGame = function(id1, id2) {
   if (Math.random() > 0.5) {
      this.playerX = id1
      this.playerO = id2
   } else {
      this.playerX = id2
      this.playerO = id1
   }
   this.bigField.push(['a', 'a', 'a'], ['a', 'a', 'a'], ['a', 'a', 'a'])
   this.boardState.push(
      [
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ]
      ],
      [
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ]
      ],
      [
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ],
         [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ]
      ]
   )
}

schema.methods.turn = function(turner, coords) {
   const allowedTurner = (this.nextTurn = 'x' ? this.playerX : this.playerO)
   const turnValid = turnValidator(turner, allowedTurner, coords, this.boardState, this.bigField)

   //TODO if true: change turner, newBoardState, newBigField (with 'a' for allowed)
   //TODO winValidator logic should include 'a'
}


//TODO shcema methods:
//? validate win -> assign winner
//? validate next turn
//? system messages (keep only last?)
//? assign XO and frist turner
//? change turner

//TODO system messages:
//? Player (XO) made his move, now turn belogns to (XO)
//? (XO) won. Game ended
//? game started


module.exports = model('Game', schema)

//TODO for ava pics
// const root = 'https://s3.amazonaws.com/mybucket';

// const userSchema = new Schema({
//   name: String,
//   picture: {
//     type: String,
//     get: v => `${root}${v}`
//   }
// });

// const User = mongoose.model('User', userSchema);

// const doc = new User({ name: 'Val', picture: '/123.png' });
// doc.picture; // 'https://s3.amazonaws.com/mybucket/123.png'
// doc.toObject({ getters: false }).picture; // '123.png'
