module.exports = {
	templateRenamer: function (prefix) {
		return function (file) {
			file.basename = file.basename.split('.');
			file.extname = '.' + file.basename.pop();
			file.basename = file.basename.join('.');
			file.basename = prefix + file.basename;
		}
	}
};
