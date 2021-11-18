const doNothingValues = new Set([
	'inherit',
	'initial',
	'revert',
	'unset',
]);

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => ({
	postcssPlugin: 'postcss-opacity-percentage',
	Declaration: {
		opacity: decl => {
			if (!decl.value || decl.value.startsWith('var(') || !decl.value.endsWith('%') || doNothingValues.has(decl.value)) {
				return;
			}

			decl.value = String(Number.parseFloat(decl.value) / 100);
		},
	},
});

module.exports.postcss = true;
