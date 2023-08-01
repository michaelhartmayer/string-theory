/**
 * StringTheory is a utility to manipulate strings
 */
class StringTheory {
  constructor() {
    this.string = [];
  }

  /**
   * Adds a string or the result of a function to the string array
   * @param {string|Function} s - string or function to add
   * @returns {StringTheory}
   */
  add(s) {
    if (typeof s === 'function') {
      s = s(this) || '';
    }
    this.string.push(s);
    return this;
  }

  /**
   * Renders the string array joined by newlines
   * @returns {string}
   */
  render() {
    return this.string.join('\n');
  }

  /**
   * Adds a JSON string to the string array
   * @param {Object} o - object to stringify
   * @param {number} spaces - number of spaces for indentation
   * @returns {StringTheory}
   */
  json(o = {}, spaces = 2) {
    this.string.push(JSON.stringify(o, null, spaces));
    return this;
  }

  /**
   * Adds newlines to the string array
   * @param {number} n - number of newlines
   * @returns {StringTheory}
   */
  n(n = 1) {
    const s = Array(n).map(Boolean).join('\n');
    this.string.push(s);
    return this;
  }

  /**
   * Clears the string array
   */
  clear() {
    this.string = [];
  }

  /**
   * Returns the main context if the condition is true, otherwise returns a mock context
   * @param {boolean} condition - condition to check
   * @returns {StringTheory|Object}
   */
  if(condition) {
    if (condition) return this;
    return this.mockContext();
  }

  /**
   * Iterates over an array of lines and adds them to the string array
   * @param {Array} args - array of arguments
   * @returns {StringTheory}
   */
  each(...args) {
    let prefix = '';
    let lines = [];
    let suffix = '';
    let delimiter = '\n';

    const [a, b, c, d] = args;

    if (typeof a === 'string') {
      prefix = a || prefix;
      lines = b || lines;
      suffix = c || suffix;
      delimiter = d || delimiter;
    } else {
      lines = a || lines;
      suffix = b || suffix;
      delimiter = c || delimiter;
    }

    const result = lines.map(line => prefix + line + suffix).join(delimiter);

    this.string.push(result);

    return this;
  }

  /**
   * Creates a mock context
   * @returns {Object}
   */
  mockContext() {
    const self = this;
    return new Proxy({}, {
      get: function() {
        return () => self.mockContext();
      }
    });
  }
}

module.exports = StringTheory;
