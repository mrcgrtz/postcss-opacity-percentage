module.exports = () => ({
	postcssPlugin: 'postcss-opacity-percentage',
	Once(root) {
		root.walkDecls(decl => {
			/* istanbul ignore if */
			if (decl.prop !== 'opacity' || !decl.value || !decl.value.endsWith('%')) {
				return;
			}

			decl.value = Number.parseFloat(decl.value) / 100;
		});
	},
});

module.exports.postcss = true;
