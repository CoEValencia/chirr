Ext.define('Devon.Security', {
    singleton: true,

    alias: 'app-security',

    requires: [
        'Devon.model.User'
    ],

    currentUser: null,

    constructor: function() {
        Devon.Log.debug("Devon.Security constructor");
        Devon.Ajax.define({
            'security.currentUser': {
                url: 'security/v1/currentuser'
            },
            'security.logout': {
                url: 'logout'
            },
            'security.login': {
                url: 'login'
            },
            'security.csrftoken': {
                url: 'security/v1/csrftoken/'
            }
        });
    },

    checkExistingSession: function(options) {
        Devon.rest.security.currentUser.get({
            scope: this,
            failure: Ext.emptyFn, // override Devon failure processing
            success: function(data) {
                this.currentUser = data;
                this.updateUserRoles();
                if (data) {
                    this.getCSRF(options);
                }
            },
            callback: function() {
                if (!this.currentUser) {
                    if (options.failure) {
                        options.failure.call(options.scope);
                    }
                }
            }
        });
    },

    updateUserRoles: function() {
        var user = this.currentUser;
        if (user.role) {
            user.roles = {};
            user.roles[user.role] = true;
            delete user.role;
        } else if (user.roles && Ext.isArray(user.roles)) {
            var roles = {};
            Ext.Array.each(user.roles, function(rol) {
                roles[rol] = true;
            });
            user.roles = roles;
        }
    },

    getCSRF: function(options) {
        Devon.Log.trace("->onUserLoaded");
        Devon.rest.security.csrftoken.get({
            scope: this,
            failure: Ext.emptyFn,
            success: function(csrf, response, opts) {
                if (csrf && csrf.headerName && csrf.token) {
                    this.csrf = csrf;
                    var headers = {};
                    headers[csrf.headerName] = csrf.token;
                    Ext.Ajax.setDefaultHeaders(headers);
                    if (options.success) {
                        options.success.call(options.scope, this.currentUser);
                    }
                }
            },
            callback: function() {
                if (!this.csrf) {
                    if (options.failure) {
                        options.failure.call(options.scope);
                    }

                }
            }
        });
    },


    loginOperation: function(options) {
        Devon.rest.security.login.post({
            jsonData: {
                j_username: options.user,
                j_password: options.password
            },
            success: options.success,
            failure: options.failure,
            scope: options.scope
        });
    },

    logoutOperation: function() {
        Devon.rest.security.logout.get({
            callback: function() {
                document.location.reload();

            }
        });
    }

});
