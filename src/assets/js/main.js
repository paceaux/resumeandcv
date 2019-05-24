
/**
 * FMT is the container IIFE that contains all of my modules
 * my modules are also IIFEs
 */
const fmt = (function fmtIIFE() {
    const modules = new Map();

    /** adds a module to a private Map of modules
    * @param {function} module function is an iife but could also just be a vanilla object
    */
    function addModule(module) {
        // eslint-disable-next-line no-prototype-builtins
        if (!module.hasOwnProperty('moduleName')) throw new Error('Dude you gotta name your module');

        modules.set(module.moduleName, module);
    }

    /** gets a modules from a private map of modules
    * @param {string} moduleName The name of the module
    * @return {object} The module requested, or throws an error
    */
    function getModule(moduleName) {
        if (moduleName === null || moduleName === undefined) {
            throw new Error('Dude, why would I name a module that?');
        }

        if (!modules.has(moduleName)) {
            throw new Error(`${moduleName} got noped pretty hard. Were you looking for undefined, null, or NaN?`);
        }

        return modules.get(moduleName);
    }

    /** initializes all of the modules
     * @return voids
     */
    function initialize() {
        modules.forEach((module) => {
            // eslint-disable-next-line no-prototype-builtins
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
fmt.addModule( (function moduleIIFE() {

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


fmt.addModule((function navigationIIFE() {
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

fmt.addModule((function messagesIIFE() {
    const regMsgStyle = 'font-family: Helvetica; font-weight: bold; color: #333;';
    const bigMsgStyle = `${regMsgStyle} font-size: 4em;`;
    const messages = new Map();

    /**
     *  Message class
     * @param {string} text message text to display
     * @param {string} style css styles for message in the console
     */
    function Message(text, style = regMsgStyle) {
        this.text = text;
        this.style = style;

        this.message = `%c ${text}`;

        return this;
    }

    /**
     *
     * @param {string} messageName Displays the name of a saved message
     */
    function showMessage(messageName) {
        if (!messages.has(messageName)) {
            throw new Error(`${messageName} not in approved set of messages. Were you trying to send a message?`);
        } else {
            const message = messages.get(messageName);
            // eslint-disable-next-line no-console
            console.info(message.message, message.style);
        }
    }

    /**
     *
     * @param {string} messageText text being sent into the consoleMessenger
     * @returns {string} could depend based on the message
     */
    function receiveMessage(messageText) {
        showMessage('receiveMessage');
        // eslint-disable-next-line no-console
        console.info(`%c ${messageText}`, `${regMsgStyle} margin-left: 2em; font-style: italic`);

        // logic goes here for sending messages back and forth to .... ¿one really bored person?
    }

    function initialize() {
        messages.set('unlocked', new Message('Website: Unlocked', bigMsgStyle));
        messages.set('receiveMessage', new Message('Message Received:', regMsgStyle));
    }

    initialize();

    return {
        moduleName: 'consoleMessenger',
        showMessage,
        sendMessage: receiveMessage,
    };
})());

fmt.addModule((function lockerIIFE() {
    const keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let index = 0;

    const evtCbs = {
        tracker: (evt) => {
            const nextKey = keys[index += 1];

            if (evt.keyCode === nextKey) {
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

fmt.addModule((function footerIIFE() {
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
