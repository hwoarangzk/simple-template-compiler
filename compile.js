//util reg express
var expressionReg = /<%=([\s\S]+?)%>/g,
	executeReg = /<%([\s\S]+?)%>/g,
	trimReg = /^\s*|\s*$/;

//util function
var trim = function(str) {
	return str.replace(trimReg, '');
};

var compile = function(str) {
	
	str = str.replace(/\r\n/g, '')//important!new line in windows is \r\n
			.replace(expressionReg, function(match, code) {
				return '" + ' + trim(code) + ' + "';
			}).replace(executeReg, function(match, code) {
				return '"\n;' + code + '\ntpl+="';
			});

	str = 'var tpl="";\nwith(obj) {\ntpl+="' + str + '"\n}\nreturn tpl;';

	return new Function('obj', str);
};

module.exports = compile;

//the following code is for testing
/*
//test data
var str = "Hello, <%= name%>" +
		"<% if (1) {%>1<%}else{%>2<%}%>";
var obj = {
		name: 'vergil'
	};

console.log(compile(str));
var fs = require('fs');
str = fs.readFileSync('./test.html', 'utf8');
var render = compile(str);
console.log(render(obj));
*/
