import test from 'ava';
import fn from './';

test('v b t', t => {
  t.is(fn([1, [3, 4]], ['v', 'b', 't']), '[ \n number, \n [ \n  number, \n  number \n ] \n] \n');
});

test('v b', t => {
  t.is(fn([1, [3, 4]], ['v', 'b']), '[ \n 1, \n [ \n  3, \n  4 \n ] \n] \n');
});

test('v t', t => {
  t.is(fn([1, [3, 4]], ['v', 't']), 'number, \nnumber, \nnumber\n');
});

test('b t', t => {
  t.is(fn([1, [3, 4]], ['b', 't']), '[ number, [ number, number ] ] ');
});

test('v', t => {
  t.is(fn([1, [3, 4]], ['v']), '1, \n3, \n4\n');
});

test('b', t => {
  t.is(fn([1, [3, 4]], ['b']), '[ 1, [ 3, 4 ] ] ');
});

test('t', t => {
  t.is(fn([1, [3, 4]], ['t']), 'number, number, number');
});

test('no flags', t => {
  t.is(fn([1, [3, 4]]), '1, 3, 4');
});

test('wrong input', t => {
  t.throws(() => {
    fn(5, []);
  }, TypeError);
});

test('wrong flags', t => {
  t.throws(() => {
    fn([1, 2], 88);
  }, TypeError);
});

test('zero length array', t => {
  t.throws(() => {
    fn([], 88);
  }, Error);
});
