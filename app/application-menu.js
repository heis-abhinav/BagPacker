const { Menu, shell} = require('electron');
const mainProcess = require('./main');

const template = exports.template = [
	/*for future use*/
];

module.exports = Menu.buildFromTemplate(template);