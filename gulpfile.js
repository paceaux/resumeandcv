/**
  gulpfile.js
  ===========
  Individual Gulp tasks go in the tasks folder.
  New tasks go there. Each task should start with this:
        'use strict';

        const config = require('../config').assemble;
        const gulp = require('gulp');


  Use  gulp/tasks/default.js to specify default tasks

*/

const requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });
