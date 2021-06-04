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

    static unlock() {
        document.body.classList.add('is-unlocked');
        window.sessionStorage.setItem('locker-unlocked', new Date());
    }

    static lock() {
        document.body.classList.remove('is-unlocked');
        window.sessionStorage.removeItem('locker-unlocked');
    }

    trackerCallback(event) {
        const currentKey = this.keys[this.keyIndex];
        if (event.keyCode === currentKey) {
            this.keyIndex += 1;
            if (this.keyIndex === this.keys.length) {
                document.removeEventListener('keydown', this.trackerCallback);
                Locker.unlock();
            }
        }
    }

    bindEvents() {
        document.addEventListener('keydown', this.trackerCallback.bind(this));
    }

    initialize() {
        this.bindEvents();
    }
}
