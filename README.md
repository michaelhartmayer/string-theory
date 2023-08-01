# StringTheory

StringTheory is a JavaScript library for building strings dynamically. It provides a fluent interface to add, modify, and manipulate strings in a more readable and maintainable way. It supports conditional addition, iteration over arrays, and more.

## Installation

You can include StringTheory in your project by copying the provided function into your code.

## Usage

StringTheory provides a context that contains several methods to manipulate strings:

- `add(s)`: Adds a string or a function that returns a string to the current context.
- `render()`: Returns the final string.
- `if(condition)`: If the condition is true, returns the main context, otherwise returns a fake context that ignores all method calls until the next `if` statement.
- `each(prefix, lines, suffix, delimiter)`: Iterates over the `lines` array, adding a `prefix` and `suffix` to each line, and joining them with the `delimiter`.
- `clear()`: Clears the current string.
- `json(o, spaces)`: Converts an object to a JSON string and adds it to the current context.
- `n(n)`: Adds `n` new lines to the current context.

Here is an example of how to use StringTheory:

```javascript
const prompt = StringTheory()
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
prompt.json(places).n(1)

prompt.each('- ', people, ',')
prompt.add(smile)

const r = await prompt.render()

console.log(r)
```

This will output:

```
hello
how are you
nice

{
  "state": "california",
  "city": "escondido"
}

- peter,
- paul,
- mary,

;(
;)

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
