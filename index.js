'use strict';
var totype = require('to-type');
var extendString = require('strip_character');
var i;

extendString();

function fixFlags(flags) {
  for (i = 0; i < flags.length; i++) {
    flags[i] = flags[i].strip('-').toLowerCase();
  }
  return flags;
}

function flattenB(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].constructor === Array) {
      flattenB(arr[i]);
      Array.prototype.splice.apply(arr, [i, 1].concat(['['], arr[i], [']']));
    }
  }
}

function flatten(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].constructor === Array) {
      flattenB(arr[i]);
      Array.prototype.splice.apply(arr, [i, 1].concat(arr[i]));
    }
  }
}

function buildArr(arr, flags) {
  var s = '';
  var depth = '';
  var val;

  if (flags.indexOf('b') === -1) {
    var tmp = [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i] !== '[' && arr[i] !== ']') {
        tmp.push(arr[i]);
      }
    }
    arr = tmp;
  }
  for (i = 0; i < arr.length; i++) {
    if (flags.indexOf('t') !== -1 && arr[i] !== '[' && arr[i] !== ']') {
      val = totype(arr[i]);
    } else {
      val = arr[i];
    }

    if (flags.indexOf('b') !== -1 && arr[i] === '[') { // open bracket
      s += depth + arr[i] + ' ';
      if (flags.indexOf('v') !== -1) {
        depth += ' ';
      }
    } else if (arr[i] !== '[' && arr[i] !== ']') {  // value
      if (arr[i + 1] === ']') {
        s += depth + val + ' ';
      } else {
        s += depth + val + ', ';
      }
    } else if (flags.indexOf('b') !== -1 && arr[i] === ']') {  // closing bracket
      if (flags.indexOf('v') !== 'v') {
        depth = depth.slice(0, -1);
      }
      if (i !== arr.length - 1 && arr[i + 1] !== ']') {
        s += depth + arr[i] + ', ';
      } else {
        s += depth + arr[i] + ' ';
      }
    }
    if (arr[i + 1] === undefined && flags.indexOf('b') === -1) {
      s = s.slice(0, -2);
    }

    if (flags.indexOf('v') !== -1) {
      s += '\n';
    }
  }
  return s;
}

module.exports = function (arr, flags) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Parr expected array to be type Array, got ' + (totype(arr)));
  }

  if (arr.length === 0) {
    throw new Error('Parr expected an array with values, got empty array');
  }

  if (!Array.isArray(flags) && flags !== undefined) {
    throw new TypeError('Parr expected flags to be type Array, got ' + (totype(flags)));
  }

  if (flags === undefined) {
    flags = [];
  }

  if (flags.length !== 0) {
    flags = fixFlags(flags);
  }

  if (flags.indexOf('b') === -1) {
    flatten(arr);
  } else {
    arr = ['['].concat(arr);
    flattenB(arr);
    arr = arr.concat([']']);
  }

  return buildArr(arr, flags);
};
