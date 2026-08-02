const doNothingValues = new Set([
	'inherit',
	'initial',
	'revert',
	'unset',
]);

/** @type {import('postcss').PluginCreator} */
module.exports = ({preserve = false} = {}) => ({
	postcssPlugin: 'postcss-opacity-percentage',
	Declaration: {
		opacity(decl) {
			if (!decl.value || decl.value.startsWith('var(') || !decl.value.endsWith('%') || doNothingValues.has(decl.value)) {
				return;
			}

			// eslint-disable-next-line unicorn/prefer-number-coercion -- We want to parse the value as a float, not coerce it to a number.
			decl.cloneBefore({value: String(Number.parseFloat(decl.value) / 100)});
			if (!preserve) {
				decl.remove();
			}
		},
	},
});

module.exports.postcss = true;
