function turnValidator(player, allowedTurner, coords, board, bigField) {
console.log('got in')
   if (player !== allowedTurner) return false
console.log('passed play')
   if (`${bigField[coords[0]][coords[1]]}` != 'a') return false
   console.log('passed bigfield')
   if (board[coords[0]][coords[1]][coords[2]][coords[3]] != 'e') return false

   return true
}

module.exports.validateTurn = turnValidator