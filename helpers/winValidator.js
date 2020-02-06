function winValidator(field, turner) {
   console.log('WW',typeof field, typeof turner)
   const innerCheck = field => {
      for (let row of field) {
         if (row[0] != 'e' && row[0] == row[1] && row[1] == row[2]) return row[0]
      }

      for (let i = 0; i <= 2; i++) {
         if (field[0][i] != 'e' && field[0][i] == field[1][i] && field[1][i] == field[2][i]) return field[0][i]
      }

      if (field[0][0] != 'e' && field[0][0] == field[1][1] && field[1][1] == field[2][2]) return field[0][0]

      if (field[0][2] != 'e' && field[0][2] == field[1][1] && field[1][1] == field[2][0]) return field[0][2]

      for (let i = 0; i <= 2; i++) {
         for (let j = 0; j <= 2; j++) if (field[i][j] == 'e') return 'e'
      }

      return 't'
   }

   if (turner) {
      
      const replacedT = [[], [], []]
      for (let i = 0; i <= 2; i++) {
         for (let j = 0; j <= 2; j++) {
            if (field[i][j] == 't') replacedT[i][j] = turner
            else replacedT[i][j] = field[i][j]
         }
      }
      return innerCheck(replacedT)

   } else return innerCheck(field)
}

module.exports.validateWin = winValidator
