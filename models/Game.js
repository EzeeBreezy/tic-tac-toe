const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   date: { type: Date, default: Date.now },
   playerX: { type: Types.ObjectId, ref: 'User' },
   playerO: { type: Types.ObjectId, ref: 'User' },
   winner: { type: String, default: 'IN_PROGRESS' },
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
