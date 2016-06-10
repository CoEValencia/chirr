/* jshint devel: true */
/**
 * Logging system.
 *
 * Allows logging to the browser's console in a browser-independent way.
 *
 * Allows to use different log levels and to configure the minimum log level to be shown.
 *
 * Usage:
 *
 *      Fwk.Log.setLevel(Fwk.Log.levels.warn);
 * 
 *      Fwk.Log.debug("Un mensaje de depurar"); // Not shown, as log level is higher than debug.
 *
 *      Fwk.Log.warn("Un mensaje de aviso"); // Visible in console.
 */
Ext.define('Devon.Log', {
    singleton: true,

    logMethods: [
        /**
         * @method trace
         *
         * For messages visible with a {@link #level} equal or less than {@link Fwk.Log.levels#trace}
         */
        'trace',
        /**
         * @method debug
         *
         * For messages visible with a {@link #level} equal or less than {@link Fwk.Log.levels#debug}
         */
        'debug',
        /**
         * @method info
         *
         * For messages visible with a {@link #level} equal or less than {@link Fwk.Log.levels#info}
         */
        'info',
        /**
         * @method warn
         *
         * For messages visible with a {@link #level} equal or less than {@link Fwk.Log.levels#warn}
         */
        'warn',
        /**
         * @method error
         *
         * For messages visible with a {@link #level} equal or less than {@link Fwk.Log.levels#error}
         */
        'error'
    ],

    /**
     * The available log levels.
     * @enum Fwk.Log.levels
     */
    levels: {
        /** trace */
        trace: 0,
        /** debug */
        debug: 1,
        /** info */
        info: 2,
        /** warn */
        warn: 3,
        /** error */
        error: 4
    },

    config: {
        /**
         * @member Fwk.Log
         * @cfg {Fwk.Log.levels} [level=Fwk.Log.levels.debug]
         * 
         * The current log level.
         */
        level: 1
    },

    updateLevel: function() {
        this.setupLogMethods();
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    setupLogMethods: function() {
        if (typeof(console) !== "undefined" && console.log) {
            this.logger = console;
        } else {
            this.logger = null;
        }

        Ext.each(this.logMethods, this._createLogMethod, this);
    },

    _createLogMethod: function(name) {
        if (this.levels[name] >= this.getLevel()) {
            this[name] = this._boundToConsole(name);
        } else {
            this[name] = Ext.emptyFn;
        }
    },

    _boundToConsole: function(name) {
        if (!this.logger) {
            return Ext.emptyFn;
        }

        var loggingFunction = this.logger[name] || this.logger.log;

        if (Ext.isFunction(Function.prototype.bind)) {
            // Using native bind, we preserve line numbers in console output
            return Function.prototype.bind.call(loggingFunction, this.logger);
        } else {
            var canApply;
            try {
                canApply = !!loggingFunction.apply;
            } catch (e) {}

            if (canApply) {
                return Ext.Function.bind(loggingFunction, this.logger);
            } else {
                // IE8's console.log is not a real function (it does not have an apply method), so we have
                // to handle it separately.
                return loggingFunction;
            }
        }
    }
});
