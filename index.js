const doNothingValues = new Set([
	'inherit',
	'initial',
	'revert',
	'unset',
]);

module.exports = () => ({
	postcssPlugin: 'postcss-opacity-percentage',
	Once(root) {
		root.walkDecls(decl => {
			if (decl.prop !== 'opacity' || !decl.value || !decl.value.endsWith('%') || doNothingValues.has(decl.value)) {
				return;
			}

			decl.value = Number.parseFloat(decl.value) / 100;
		});
	},
});

module.exports.postcss = true;
