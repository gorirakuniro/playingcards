module.exports = {
	mode: 'development',
	entry: `${__dirname}/src/js/script.js`,
	output: {
		path: `${__dirname}/public`,
		filename: 'js/script.js',
	},

	devServer: {
		contentBase: 'public',
		open: true,
		host: '0.0.0.0',
	},
};
