Ext.define('Devon.I18n', {
    singleton: true,

    defaultLocale: 'en_EN',
    cookieName: 'DEVON-LOCALE',
    currentLocale: null,
    bundles: {},

    constructor: function() {
        this.defaultLocale = Config.defaultLocale || this.defaultLocale;

        Ext.each(Config.supportedLocales, function(item) {
            this.bundles[item] = {};
        }, this);

        this.setCurrentLocale();
    },


    addBundle: function(bundle) {
        var className = bundle.$className,
            locale = className.substring(className.indexOf('_') + 1);

        if (!this.bundles[locale]) {
            this.bundles[locale] = {};
        }

        if (locale == this.defaultLocale) {
            Ext.Object.each(this.bundles, function(name, value) {
                if (name != this.defaultLocale) {
                    Ext.Object.mergeIf(value, this.bundles[this.defaultLocale]);
                }
            }, this);
        } else {
            Ext.Object.mergeIf(this.bundles[locale], this.bundles[this.defaultLocale]);
        }

        Ext.apply(this.bundles[locale], bundle.i18n);
    },

    setCurrentLocale: function(locale) {
        if (!locale) {
            var cookieValue = Ext.util.Cookies.get(this.cookieName);
            if (!cookieValue) {
                var navLocale = navigator.language || navigator.userLanguage;
                locale = navLocale.replace("-", "_", "gi");
            } else {
                locale = cookieValue;
            }
        }

        if (!this.bundles[locale]) {
            locale = this.defaultLocale;
        }

        Ext.util.Cookies.set(this.cookieName, locale);

        window.i18n = this.bundles[locale];
        this.currentLocale = locale;
    }
});
