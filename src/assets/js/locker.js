/**
 * @class Locker
 * @description who doesn't like Konami?
 *
 */
// I'm not going to use Babel for a tiny static site
// eslint-disable-next-line no-unused-vars
class Locker {
    /**
     * @param  {array} keys=[up up down down...]
     */
    constructor(keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]) {
        this.keys = keys;
        this.keyIndex = 0;
    }

    trackerCallback(event) {
        const nextKey = this.keys[this.keyIndex += 1];

        if (event.keyCode === nextKey) {
            if (this.keyIndex === this.keys.length) {
                document.removeEventListener('keydown', this.trackerCallback);
                document.body.classList.add('is-unlocked');
            }
        }
    }

    bindEvents() {
        document.addEventListener('keydown', this.trackerCallback);
    }

    initialize() {
        this.bindEvents();
    }
}
