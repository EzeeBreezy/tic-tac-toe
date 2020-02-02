function winValidator(field) {

   for (let row of field) {
      if (row[0] != 'e' && row[0] === row[1] && row[1] === row[2]) return row[0]
   }

   for (let i = 0; i <= 2; i++) {
      if (field[0][i] != 'e' && field[0][i] === field[1][i] && field[1][i] === field[2][i]) return field[0][i]
   }

   if (field[0][0] != 'e' && field[0][0] === field[1][1] && field[1][1] === field[2][2]) return field[0][0]

   if (field[0][2] != 'e' && field[0][2] === field[1][1] && field[1][1] === field[2][0]) return field[0][2]

   for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) if (field[i][j] === 'e') return 'e'
   }

   return 't'
}

export default winValidator
