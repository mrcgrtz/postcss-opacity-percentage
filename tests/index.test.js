const fs = require('fs');
const postcss = require('postcss');
const test = require('ava');
const plugin = require('../index.js');

const getFixturePath = name => `tests/fixtures/${name}.css`;

const readFixture = async name => fs.promises.readFile(getFixturePath(name), 'utf8');

const testFixture = async (name, pluginOptions = {}, postcssOptions = {}) => {
	postcssOptions.from = getFixturePath(name);
	const test = await readFixture(name);
	const expected = await readFixture(`${name}-expected`);
	const result = await postcss([plugin(pluginOptions)]).process(test, postcssOptions);

	return {expected, result};
};

test('Transforms opacity with a percentage-based value', async t => {
	const {expected, result} = await testFixture('opacity-percentage');
	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
});

test('Does not transform opacity with a floating point value', async t => {
	const {expected, result} = await testFixture('opacity-float');
	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
});

test('Opacity value with custom property keeps unchanged', async t => {
	const {expected, result} = await testFixture('opacity-custom-property');
	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
});

test('Textual opacity value keeps unchanged', async t => {
	const {expected, result} = await testFixture('do-nothing-value');
	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
});

test('Empty opacity value does not stop the plugin', async t => {
	const {expected, result} = await testFixture('empty-value');
	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
});
