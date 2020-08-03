/**
* DO NOT MODIFY. See Readme for details.
*/
const taskFiles = require('require-dir')();

const tasks = {};

Object.values(taskFiles).forEach((exportedObject) => {
    Object.assign(tasks, exportedObject);
});

module.exports = tasks;
