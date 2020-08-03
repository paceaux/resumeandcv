/**
 * @class Footer
 * @description This updates the year in the footer
 *
 */
// I'm not going to use Babel for a tiny static site
// eslint-disable-next-line no-unused-vars
class Footer {
    static get selectors() {
        return {
            time: '.js-copyright-time',
        };
    }

    static getYearString() {
        const date = new Date();

        return date.getFullYear();
    }

    static updateCopyrightYear(element) {
        if (!element) return;
        const year = Footer.getYearString();

        element.setAttribute('datetime', year);
        // this isn't an object. it's a Node
        // eslint-disable-next-line no-param-reassign
        element.innerText = year;
    }

    static initialize() {
        const copyRightYearElement = document.querySelector(Footer.selectors.time);

        Footer.updateCopyrightYear(copyRightYearElement);
    }
}
