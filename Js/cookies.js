class CookieManager {
    constructor() {
        this.banner = document.querySelector('.cookie-banner');
        this.settings = document.querySelector('.cookie-settings');
        this.acceptBtn = document.querySelector('.cookie-btn.accept');
        this.settingsBtn = document.querySelector('.cookie-btn.settings');
        this.saveBtn = document.querySelector('.cookie-btn.save-settings');
        this.cookieToggles = document.querySelectorAll('.cookie-toggle input');
        this.cookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false
        };
        this.init();
    }

    init() {
        if (!this.getCookie('cookieConsent')) {
            setTimeout(() => this.showBanner(), 1000);
        }

        this.acceptBtn.addEventListener('click', () => this.acceptAll());
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.saveBtn.addEventListener('click', () => this.saveCookieConsent());

        // Añadir efectos hover a los botones
        [this.acceptBtn, this.settingsBtn, this.saveBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });

        // Añadir efectos a los toggles
        this.cookieToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const type = e.target.name;
                this.cookiePreferences[type] = e.target.checked;
                
                // Efecto de ripple al cambiar
                const ripple = document.createElement('div');
                ripple.className = 'toggle-ripple';
                e.target.parentElement.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    showBanner() {
        this.banner.classList.add('active');
        // Añadir efecto de entrada
        this.banner.style.transform = 'translateX(-50%) translateY(0)';
        this.banner.style.opacity = '1';
    }

    hideBanner() {
        this.banner.classList.remove('active');
        // Añadir efecto de salida
        this.banner.style.transform = 'translateX(-50%) translateY(100%)';
        this.banner.style.opacity = '0';
    }

    toggleSettings() {
        this.settings.classList.toggle('active');
        if (this.settings.classList.contains('active')) {
            this.settings.style.display = 'block';
            // Añadir efecto de entrada
            setTimeout(() => {
                this.settings.style.opacity = '1';
                this.settings.style.transform = 'translateY(0)';
            }, 10);
        } else {
            this.settings.style.opacity = '0';
            this.settings.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                this.settings.style.display = 'none';
            }, 300);
        }
    }

    acceptAll() {
        this.cookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        this.saveCookieConsent();
    }

    saveCookieConsent() {
        const consentData = {
            preferences: this.cookiePreferences,
            timestamp: new Date().toISOString()
        };
        this.setCookie('cookieConsent', JSON.stringify(consentData), 365);
        this.hideBanner();
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CookieManager();
}); 