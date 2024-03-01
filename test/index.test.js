const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const postcss = require('postcss');
const plugin = require('../index.js');

const getFixturePath = name => `test/fixtures/${name}.css`;

const readFixture = async name => fs.promises.readFile(getFixturePath(name), 'utf8');

const testFixture = async (t, name, pluginOptions = {}, postcssOptions = {}) => {
	postcssOptions.from = getFixturePath(name);
	const actual = await readFixture(name);
	const expected = await readFixture(`${name}-${Object.keys(pluginOptions).map(key => `${key}-`)}expected`);
	const result = await postcss([plugin(pluginOptions)]).process(actual, postcssOptions);

	assert.strictEqual(result.warnings().length, 0);
	assert.deepEqual(result.css, expected);
};

const tests = {
	'opacity-percentage': 'Transforms opacity with a percentage-based value',
	'opacity-float': 'Does not transform opacity with a floating point value',
	'opacity-custom-property': 'Opacity value with custom property keeps unchanged',
	'do-nothing-value': 'Textual opacity value keeps unchanged',
	'empty-value': 'Empty opacity value does not stop the plugin',
};

for (const [fixture, description] of Object.entries(tests)) {
	test(description, async t => {
		await testFixture(t, fixture);
	});

	test(`${description} (with preserve option)`, async t => {
		await testFixture(t, fixture, {preserve: true});
	});
}
