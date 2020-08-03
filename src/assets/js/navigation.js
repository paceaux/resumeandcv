
class Navigation {
    static get selectors() {
        return {
            navItems: '.g-nav, .nav--sub',
        };
    }

    static activateNavLink(navContainer, urlPath) {
        const navLink = navContainer.querySelector(`[href*="${urlPath}"]`);

        if (navLink != null) navLink.classList.add('is-active');
    }

    static setActiveNav() {
        const navEls = [...document.querySelectorAll(Navigation.selectors.navItems)];
        const urlPaths = window.location.pathname.split(/\/|\.html/).filter((el) => el.length > 0);

        urlPaths.forEach((urlPath, i) => {
            if (navEls[i]) Navigation.activateNavLink(navEls[i], urlPath);
        });
    }

    static bindEvents() {
        window.addEventListener('load', Navigation.setActiveNav);
    }

    static initialize() {
        Navigation.bindEvents();
    }
}
