# Building Scalably with Gulp
 1. Each function is moved to its own function file.
 2. Each function file exports an object, so it can export multiple functions
 3. Each task is moved to its own task file
 4. Each task file exports an object so it can export multiple tasks

## Why are there functions and tasks?
[Gulp 4 discourages the use of tasks](https://gulpjs.com/docs/en/api/task) and recommends exporting _functions_ instead. Gulp doesn't want things labelled as "tasks" and instead just wants functions. 

Some tasks do the same things (default, watch, build). In order to make it easy to create multiple tasks that do the same stuff, I separate the work (functions) from the _name of the work_ (tasks). 


## Adding/ Modifying the build


### index.js files
**This should _not_ be renamed or modified**. Node.js' default behavior is to export an `index.js` file, if one exists, when a folder is imported. 

In this directory, the `index.js` files'  jobs are to merge all of the individual exports of each file into a single object. 

This file means that a new function or task is "automatically" added to the build. 

### Configuration
Configuration is in the `config.js` file. It contains all of the directory paths. It exports configurations on a per-function basis. The goal is to keep the tasks and functions as agnostic as possible regarding details about the build setup. 

### Functions
Consider adding a new function if you think multiple tasks will need it or if you have a very large task containing multiple steps for a single stream. 

1. Crack open that functions folder.
2. `npm install gulp-whatever --save-dev` to your heart's content
3. Create `myFunction.function.js`.
4. Require the config if you need to: `const { copyConfig } = require('../config');`
5. Export an object that contains a function that returns a stream. 

#### Naming Tip
* Don't use the name of the plugin or language or preprocessor _in the file name_
* Do use the name of the plugin/language/preprocessor _in the name of the exported function_
    * That way `styles.functions.js` could have SCSS, SASS, Less, or even Stylus in it.

#### Example: Use Gulp to copy files from one place to another
```
const {src, dest } = require('gulp');

const { copyConfig } = require('../config');

function copy() {
  return src(copyConfig.source, copyConfig.sourceOpts)
    .pipe(dest(copyConfig.dest));
}

module.exports = {
  copy,
};

```


### Tasks
Remember: In Gulp's eyes, functions and tasks are the same. So most of the time, it's fine just to create a task with your code in it. You only need a function if many tasks will use it. 

1. Crack open that tasks folder.
2. Create `myTask.task.js`.
3. Import a function and/or a config if you need to. 
4. Export a function, a `series`, or a `parallel`


#### Helpful hints:
* Property names in the exported objects are the task names
* use `gulp.series` if things need to go in a sequence
* use `gulp.parallel` if things can be executed simultaneously

#### Example: Make an existing function a task 
This is handy if you want to debug a single function.

```
const {
  clean,
} = require('../functions');

module.exports = {
  clean,
  killBuild: clean
};

```
#### Example: A task that runs tasks
```
const { series } = require('gulp');

const {
  server,
} = require('../functions');

const { watch } = require('./watch.task');
const { build } = require('./build.task');

module.exports = {
  default: series(build, server, watch),
};
```

