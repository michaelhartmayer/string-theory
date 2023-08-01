const StringTheory = () => {
  const string = []

  const context = {
    add,
    render,
    if: _if,
    each,
    clear,
    json,
    n,
  }

  const mainContext = () => context

  const fakeContext = () => {
    const keys = Object.keys(mainContext())
    const mock = keys.reduce((a, b) => {
      a[b] = fake
      return a
    }, {})
    
    return mock
  }

  function fake () {
    return fakeContext()
  }

  function json (o = {}, spaces = 2) {
    string.push(JSON.stringify(o, null, spaces))
    return mainContext()
  }

  function n (n = 1) {
    const s = Array(n).map(Boolean).join('\n')
    string.push(s)
    return mainContext()
  }

  function clear () {
    string = []
  }
  
  function _if (condition) {
    if (condition) return mainContext()
    return fakeContext()
  }

  function add (s) {
   if (typeof s === 'function') 
     s = s(mainContext())
    
    string.push(s)
    return mainContext()
  }

  function each (...args) {
    let prefix = ''
    let lines = []
    let suffix = ''
    let delimeter = '\n'

    const [a, b, c, d] = args
    
    if (typeof a === 'string') {
      prefix = a || prefix
      lines = b || lines
      suffix = c || suffix
      delimeter = d || delimeter
    }

    else {
      lines = a || lines
      suffix = b || suffix
      delimeter = c || delimeter
    }

    const result = lines.map(line => prefix + line + suffix).join(delimeter)

    string.push(result)
    
    return mainContext()
  }
  
  function render () {
    return string.join('\n')
  }

  return {
    ...mainContext()
  }
}

module.exports = StringTheory
