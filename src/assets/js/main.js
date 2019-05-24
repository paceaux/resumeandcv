

const fmt = (function () {
    const modules = [];

    /**
 * @param {function} module. It's an IIFE. But, functions are technically objects. So...
 */
    function addModule(module) {
        modules.push(module);
    }

    /**
 * @param {string} moduleName The name of the module
 * @return {object} The module requested, or throws an error
 */
    function getModule(moduleName) {
        let module;

        modules.forEach((mod) => {
            if (mod.hasOwnProperty('moduleName') && mod.moduleName === moduleName) module = mod;
        });

        try {
            if (typeof module === 'undefined') throw new Error(`${moduleName} got noped pretty hard. Were you looking for ${(moduleName === 'undefined' ? 'null' : moduleName === 'null' ? 'more nopes' : 'null')}?`);
            return module;
        } catch (err) {
            console.error(err);
        }
    }

    function initialize() {
        modules.forEach((module) => {
            if (module.hasOwnProperty('init')) module.init();
        });
    }

    return {
        addModule,
        getModule,
        init: initialize,
    };
}());


/*
fmt.addModule( (function () {

    const selectors = {

    }

    const evtCbs = {

    }

    function bindEvts () {

    }

    function initialize() {
        bindEvts();
    }

    return {
        init: initialize,
        moduleName: 'moduleName'
    }
})() );

*/


fmt.addModule((function () {
    const selectors = {
        navItems: '.g-nav, .nav--sub',
    };

    function activateNavLink(navContainer, urlPath) {
        const navLink = navContainer.querySelector(`[href*="${urlPath}"]`);

        if (navLink != null) navLink.classList.add('is-active');
    }

    const evtCbs = {
        setActiveNav: () => {
            const navEls = [...document.querySelectorAll(selectors.navItems)];
            const urlPaths = window.location.pathname.split(/\/|\.html/).filter((el) => el.length > 0);

            urlPaths.forEach((urlPath, i) => {
                if (navEls[i]) activateNavLink(navEls[i], urlPath);
            });
        },
    };

    function bindEvts() {
        window.addEventListener('load', evtCbs.setActiveNav);
    }

    function initialize() {
        bindEvts();
    }

    return {
        init: initialize,
        moduleName: 'updateNavigation',
    };
})());

fmt.addModule((function () {
    const regMsgStyle = 'font-family: Helvetica; font-weight: bold; color: #333;';
    const bigMsgStyle = `${regMsgStyle} font-size: 4em;`;
    const messages = {
        unlocked: {
            message: 'Website: Unlocked',
            styles: bigMsgStyle,
        },
        receiveMessage: {
            message: 'Message Received:',
            styles: regMsgStyle,
        },
    };

    function addStyleParamToMessages() {
        for (const message in messages) {
            const msgObj = messages[message];

            if (msgObj.hasOwnProperty('styles')) msgObj.message = `%c ${msgObj.message}`;
        }
    }
    /**
 *
 * @param {string} messageName Displays the name of a saved message
 */
    function showMessage(messageName) {
        try {
            const message = Object.keys(messages[messageName]).map((k) => messages[messageName][k]);

            console.info(...message);
        } catch (err) {
            console.error(`${messageName} not in approved set of messages. Were you trying to send a message?`);
        }
    }

    /**
 *
 * @param {string} messageText text being sent into the consoleMessenger
 * @returns {string} could depend based on the message (but someone looking at this code may find my email address)
 */
    function receiveMessage(messageText) {
        showMessage('receiveMessage');
        console.info(`%c ${messageText}`, `${regMsgStyle} margin-left: 2em; font-style: italic`);

        // logic goes here for sending messages back and forth to .... ¿one really bored person?
    }

    function initialize() {
        addStyleParamToMessages();
    }

    initialize();

    return {
        moduleName: 'consoleMessenger',
        showMessage,
        sendMessage: receiveMessage,
    };
})());

fmt.addModule((function () {
    const keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let index = 0;

    const evtCbs = {
        tracker: (evt) => {
            if (evt.keyCode === keys[index++]) {
                if (index === keys.length) {
                    document.removeEventListener('keydown', evtCbs.tracker);
                    document.body.classList.add('is-unlocked');
                    fmt.getModule('consoleMessenger').showMessage('unlocked');
                }
            }
        },
    };

    function bindEvts() {
        document.addEventListener('keydown', evtCbs.tracker);
    }

    function initialize() {
        bindEvts();
    }

    return {
        init: initialize,
        moduleName: 'unlockr',
    };
})());

fmt.addModule((function () {
    const selectors = {
        time: '.js-copyright-time',
    };

    function getYearString() {
        const date = new Date();

        return date.getFullYear();
    }

    function updateCopyrightYear(element) {
        if (!element) return;
        const year = getYearString();

        element.setAttribute('datetime', year);
    }

    function initialize() {
        const copyRightYearElement = document.querySelector(selectors.time);

        updateCopyrightYear(copyRightYearElement);
    }

    return {
        init: initialize,
        moduleName: 'footer',
    };
})());

fmt.init();
