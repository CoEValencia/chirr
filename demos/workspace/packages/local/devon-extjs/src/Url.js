Ext.define('Devon.Url', {
    singleton: true,

    build: function(URITemplate, data) {
        var serverBaseUrl = Config.server;
        if (arguments.length == 1) {
            return serverBaseUrl + URITemplate;
        }
        if (Ext.isObject(arguments[1])) {
            return serverBaseUrl + new Ext.Template(URITemplate).apply(arguments[1]);
        }

        return serverBaseUrl + new Ext.Template(URITemplate).apply(Array.prototype.splice.call(arguments, 1));
    }
});
