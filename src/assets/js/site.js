/* eslint-disable no-console */
class Site {
    constructor(globals, modules = new Set()) {
        this.globals = new Set(globals);
        this.modules = modules;

        this.initializeGlobals();
    }

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

const fmt = new Site([Footer, Navigation]);
fmt.initialize([Messenger, Locker]);
window.fmt = fmt;
