/**
* DO NOT MODIFY. See Readme for details.
*/
const files = require('require-dir')();

const functions = {};

Object.values(files).forEach((exportedObject) => {
    Object.assign(functions, exportedObject);
});

module.exports = functions;
