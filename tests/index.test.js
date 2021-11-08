const fs = require('fs');
const postcss = require('postcss');
const test = require('ava');
const plugin = require('../index.js');

const getFixturePath = name => `tests/fixtures/${name}.css`;

const readFixture = async name => fs.promises.readFile(getFixturePath(name), 'utf8');

const testFixture = async (t, name, pluginOptions = {}, postcssOptions = {}) => {
	postcssOptions.from = getFixturePath(name);
	const actual = await readFixture(name);
	const expected = await readFixture(`${name}-expected`);
	const result = await postcss([plugin(pluginOptions)]).process(actual, postcssOptions);

	t.is(result.warnings().length, 0);
	t.deepEqual(result.css, expected);
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
}
