Ext.define('Devon.Ajax', {
    singleton: true,

    constructor: function() {
        Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers.CorrelationId = Devon.Util.getUUID();
        });

        Ext.Ajax.on('requestexception', function(conn, options, eOpts) {
            Devon.Log.error("Caught Ajax exception while requesting", eOpts.url);
        });
    },


    define: function(routes) {
        Ext.Object.each(routes, function(route, routeConf) {

            var rest = function(method) {
                return function(options) {

                    options = options || {};
                    options.method = method;

                    //default failure control
                    options.failure = options.failure || Devon.Ajax.failureFn;

                    //url rewriting
                    var url = routeConf.url;
                    var uriParams = options.uriParams || {};

                    if (Config.CORSEnabled) {
                        options.withCredentials = true;
                    }

                    options.url = Devon.Url.build(url, uriParams);

                    options.success_original = options.success || Ext.emptyFn;
                    options.success = Devon.Ajax.successFn;

                    //Check if we have to mask the component
                    Devon.Ajax.applyMask(options,false);

                    return Ext.Ajax.request(options);
                };
            };

            Ext.define('Devon.restproxy.' + route, {
                extend: 'Devon.data.proxy.Rest',
                alias: 'proxy.' + route,
                url: Devon.Url.build(routeConf.url, {}),
                appendId: false,
                withCredentials: Config.CORSEnabled ? Config.CORSEnabled : false,
                pagination: routeConf.pagination ? true : false,
                defaultActionMethods: {
                    create: 'POST',
                    read: 'GET',
                    update: 'POST',
                    destroy: 'DELETE'
                }
            });

            // define Rest object for each route
            var namespace = 'Devon.rest.';
            Ext.define(namespace + route, {
                singleton: true,
                get: rest('GET'),
                post: rest('POST'),
                del: rest('DELETE'),
                put: rest('PUT'),
                proxy: route + '.proxy'
            });
        });
    },

    successFn: function(response, options) {
        var data;

        //Check if we have to unmask the component
        Devon.Ajax.applyMask(options,true);
        
        try {
            data = Ext.decode(response.responseText);
        } catch (e) {
            Devon.Log.error("Err decoding", e);
        }

        var parentView = Devon.Ajax.getReferenceView(this, options);
        if (parentView) {
            if (parentView.getXType() == 'form' && parentView.getPlugin('preventdataloss')) {
                parentView.fireEvent('preventDataLossResetForm');
            }
            Ext.Array.each(Ext.ComponentQuery.query('form', parentView), function(item, index) {
                if (item.getPlugin('preventdataloss')) {
                    item.fireEvent('preventDataLossResetForm');
                }
            });
        }

        options.success_original.call(options.scope, data, response, options);
    },

    failureFn: function(response, options) {
        var tmpl = new Ext.Template('<b>' + i18n.devon.ajax.error.message + '</b> {message}<br><b>' + i18n.devon.ajax.error.code + '</b> {code}<br/><b>' + i18n.devon.ajax.error.uuid + '</b> {uuid}');
        var err = {};
        var showErrorsMsg = true;
        
        //Check if we have to unmask the component
        Devon.Ajax.applyMask(options,true);

        if (response.responseText === "") {
            if (response.status === 403) {
                err = {
                    code: 403,
                    message: i18n.devon.ajax.error.forbidden
                };
            }

        } else {
            try {
                var res = Ext.decode(response.responseText);
                if (res.message) {
                    err = res;
                }
            } catch (e) {
                Devon.Log.error(e);
                err = {
                    message: i18n.devon.ajax.error.decoding
                };
            }
        }

        if (err && err.errors) {
            var errors = err.errors;
            var parentView = Devon.Ajax.getReferenceView(this, options);

            if (parentView) {
                Devon.Ajax.markReferenceWithError(parentView, errors);
                showErrorsMsg = false;
            }

        }

        if (showErrorsMsg) {
            Ext.MessageBox.alert(i18n.devon.ajax.error.title, tmpl.apply(err));
        }

    },

    getReferenceView: function(scope, options) {
        if (options.referenceView) {
            return scope.lookupReference(options.referenceView);
        } else {
            return scope.getView && scope.getView();
        }
    },

    markReferenceWithError: function(me, errors) {
        var value;

        function mark(fieldReference, msg) {
            var field = me.lookupReference && me.lookupReference(fieldReference);
            if (field) {
                field.markInvalid(msg);
            }
        }

        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                value = errors[key];
                mark(key, value);
            }
        }
    },
    
    /**
     * Mask/Unmask a component
     * @param {Object} Config options
     * @param {Boolean} flag to mask/unmask a component
     * @private
     */
    applyMask : function(options, unmask){
        if(options.masked){

            var cmp = options.masked.target || (options.scope && options.scope.getView ? options.scope.getView() : null);
            var msg = options.masked.msg || i18n.devon.ajax.maskMsg;
            
            if(!cmp){
                Devon.Log.error('No masked component specified');
                return;
            }

            if(unmask){
                cmp.unmask();
            }else{
                cmp.mask(msg);
            }
        }
    }
    
    
});
