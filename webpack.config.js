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
		host: '192.168.0.105',
	},
};
