const StringTheory = require('./index')

const prompt = new StringTheory()
const people = ['peter', 'paul', 'mary']
const places = {
  state: 'california',
  city: 'escondido'
}

const smile = cx => {
  cx.n().add(';(')
  cx.add(';)').n()
}

prompt.add('hello')
prompt.add('how are you')
prompt.if(true).add('nice').n()

prompt.if(false).add('shouldnt be here')
prompt.json(places).n()

prompt.each('- ', people, ',')
prompt.add(smile)

const r = prompt.render()
console.log(r)

module.exports = StringTheory
