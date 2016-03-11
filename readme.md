# parr

[![npm version](https://img.shields.io/npm/v/parr.svg)](https://www.npmjs.com/package/parr)
[![Build Status](https://travis-ci.org/abrelsfo/parr.svg?branch=master)](https://travis-ci.org/abrelsfo/parr)
[![npm download count](http://img.shields.io/npm/dm/parr.svg?style=flat)](http://npmjs.org/parr)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> npm module to turn an array into a string for easier, more versatile, printing and debugging

<br>

## Install

```
$ npm install --save parr
```


## Usage

```js
const parr = require('parr');

console.log(parr([1, 2, [3, 4, [5, 6], 7], [8, 9]], ['v', 'b', 't']));
//=> [
//=>  number,
//=>  number,
//=>  [
//=>   number,
//=>   [
//=>    number,
//=>    number
//=>   ],
//=>   number
//=>  ],
//=>  [
//=>   number,
//=>   number
//=>  ]
//=> ]

console.log(parr([1, 2, [3, 4, [5, 6], 7], [8, 9]], ['b', 't']));
//=> [ number, number, [ number, [ number, number ], number ], [ number, number ] ]

console.log(parr([1, 2, [3, 4, [5, 6], 7], [8, 9]]));
//=> 1, 2, 3, 4, 5, 6, 7, 8
```

<br>

## API

### parr(array, flags)

##### array

Type: `Array`

##### flags

Type: `Array`

> v --> print array vertically<br>
> b --> print brackets<br>
> t --> print type of inner values

Turn an into a string for easier, more versatile, printing and debugging

<br>

## Coming Updates

As it stands now it does not have support for anything other than arrays so it cannot handle objects in arrays. That will change.

There will also be some major logic changes as to how to prints


## License

MIT © [Alex Brelsford](abrelsfo.github.io)
