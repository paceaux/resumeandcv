/* eslint-disable no-console */

/**
 * @class Site
 * @description This is the manager for all features of the static site
 *
 */
class Site {
    /**
     * @param  {Array|Set} globals classes with only static methods
     * @param  {Array|Set} [modules=new set()] modules that aren't static
     */
    constructor(globals, modules) {
        this.globals = new Set(globals);
        this.modules = new Set(modules);

        this.initializeGlobals();
    }

    /** @description initializes the global parts of the site
     * @method
     */
    initializeGlobals() {
        this.globals.forEach((global) => {
            try {
                global.initialize();
            } catch (globalErr) {
                console.info('error initializing a global');
                console.error(globalErr);
            }
        });
    }

    /** Initializes individual modules
     * @param  {Array|Set} modules
     */
    initialize(modules) {
        modules.forEach((ModuleClass) => {
            try {
                const module = new ModuleClass();
                module.initialize();
                this.modules.add(module);
            } catch (moduleErr) {
                console.info('error initializing a module');
                console.error(moduleErr);
            }
        });
    }
}

// if I used Webpack or babel I could properly do imports.
// I won't. I'm lazy.
// eslint-disable-next-line no-undef
const fmt = new Site([Footer, Navigation]);
// eslint-disable-next-line no-undef
fmt.initialize([Messenger, Locker]);
window.fmt = fmt;
