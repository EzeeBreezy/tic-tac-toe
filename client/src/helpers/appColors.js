const colors = [
   'amber darken-4',
   'light-blue darken-3',
   'deep-purple darken-2',
   'cyan darken-3',
   'teal darken-3',
   'green darken-2',
   'orange darken-2',

]

const randomColor = colors => colors[Math.floor(Math.random() * 7)]
let randomAppColor = randomColor(colors)
export { randomAppColor }
