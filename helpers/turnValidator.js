function turnValidator(turner, allowedTurner, coords, board, bigField) {

   if (turner !== allowedTurner) return false

   if (bigField[coords[0]][coords[1]] !== 'a') return false

   if (board[coords[0]][coords[1]][coords[2]][coords[3]] !== 'e') return false

   return true
}

module.exports.turnValidator = turnValidator