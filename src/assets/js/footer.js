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
        element.innerText = year;
    }

    static initialize() {
        const copyRightYearElement = document.querySelector(Footer.selectors.time);

        Footer.updateCopyrightYear(copyRightYearElement);
    }
}
