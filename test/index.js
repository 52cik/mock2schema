import test from 'ava';
import mock2schema from '..';

function testcase(name) {
  const simple = require(`./fixtures/${name}.json`); // eslint-disable-line
  const schema = require(`./fixtures/${name}-schema.json`); // eslint-disable-line
  const str1 = JSON.stringify(schema);
  const str2 = JSON.stringify(mock2schema(simple));
  return str1 === str2;
}

test('empty', (t) => {
  t.true(testcase('empty'));
});

test('simple', (t) => {
  t.true(testcase('simple'));
});

test('user', (t) => {
  t.true(testcase('user'));
});

test('other', (t) => {
  t.true(testcase('other'));
});

test('not json-schema types', (t) => {
  t.deepEqual(mock2schema(/x/), { title: '接口描述', type: 'object' });
});
