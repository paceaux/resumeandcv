const regMsgStyle = 'font-family: Helvetica; font-weight: bold; color: #333;';
const bigMsgStyle = `${regMsgStyle} font-size: 4em;`;

/**
 * @class Message
 * @description a messages sent to/from the console
 *
 * @property {String} text
 * @property {String} style
 * @property {String} message
 */
class Message {
    /**
     * @param  {String} text
     * @param  {String} style=regMsgStyle
     */
    constructor(text, style = regMsgStyle) {
        this.text = text;
        this.style = style;
    }

    get message() {
        return `%c ${this.text}`;
    }
}

// I'm not going to use Babel for a tiny static site
// eslint-disable-next-line no-unused-vars
class Messenger {
    constructor() {
        this.messages = new Map();
    }

    /**
     * Shows a pre-set message in console
     * @param {string} messageName Displays the name of a saved message
     */
    static showMessage(messageName) {
        if (!this.messages.has(messageName)) {
            throw new Error(`${messageName} not in approved set of messages. Were you trying to send a message?`);
        } else {
            const message = this.messages.get(messageName);
            // eslint-disable-next-line no-console
            console.info(message.message, message.style);
        }
    }

    /**
     * gets a message from console?
     * @param {string} messageText text being sent into the consoleMessenger
     * @returns {string} could depend based on the message
     */
    static receiveMessage(messageText) {
        Messenger.showMessage('receiveMessage');
        // eslint-disable-next-line no-console
        console.info(`%c ${messageText}`, `${regMsgStyle} margin-left: 2em; font-style: italic`);

        // logic goes here for sending messages back and forth to .... ¿one really bored person?
    }

    initialize() {
        this.messages.set('unlocked', new Message('Website: Unlocked', bigMsgStyle));
        this.messages.set('receiveMessage', new Message('Message Received:', regMsgStyle));
    }
}
