const regMsgStyle = 'font-family: Helvetica; font-weight: bold; color: #333;';
const bigMsgStyle = `${regMsgStyle} font-size: 4em;`;

class Message {
    constructor(text, style = regMsgStyle) {
        this.text = text;
        this.style = style;
    }

    get message() {
        return `%c ${this.text}`;
    }
}

class Messenger {
    constructor() {
        this.messages = new Map();
    }

    /**
     *
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
     *
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
