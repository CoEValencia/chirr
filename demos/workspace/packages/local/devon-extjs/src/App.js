/*
  Define core Devon dependencies here, application should not deal (require) with this dependencies
*/
Ext.define('Devon.App', {
    extend: 'Ext.app.Application',

    statics: {
        viewport: null,
        currentUser: null,
        /* Displays the provided panel on the main content panel of the application
         */
        openInContentPanel: function(panel, options) {
            try {
                var content = Ext.getCmp('main-content');
                content.add(panel);
                content.setActiveItem(panel);
                Ext.GlobalEvents.fireEvent('openedInContentPanel', panel, options);
            } catch (e) {
                Devon.Log.error("Couldn't open panel", e);
            }
        }
    },

    requires: [
        'Devon.I18n',
        'Devon.I18nBundle',
        'Devon.i18n.Devon_en_EN',
        'Devon.Array',
        'Devon.Object',
        'Devon.Log',
        'Devon.Url',
        'Devon.Util',
        'Devon.Data',
        'Devon.data.proxy.Rest',
        'Devon.Ajax',
        'Devon.Security',
        'Devon.Class',


        // select the default Devon Security mechanism
        'Devon.Security',
        //'Sample.Security'

        'Devon.view.login.LoginVC',
        'Devon.view.main.Viewport'
    ],

    onBeforeLaunch: function() {
        this.callParent(arguments);
        Devon.Log.trace("App launch");
        if (Ext.isIE8) {
            Ext.Msg.alert('Not Supported', 'This example is not supported on Internet Explorer 8. Please use a different browser.');
            return;
        }

        this.checkExistingSession();

    },

    checkExistingSession: function() {
        Ext.ClassManager.getByAlias('app-security').checkExistingSession({
            scope: this,
            success: this.checkSessionOK,
            failure: this.checkSessionNotOK
        });
    },

    /**
     * Called when the login controller fires the "login" event.
     *
     * @param loginController
     * @param user
     */
    onLogin: function() {
        this.login.destroy();
        this.checkExistingSession();
    },

    checkSessionNotOK: function() {
        Devon.Log.trace("AppController::onExistingSessionNotValid");
        if (this.login) {
            Devon.Log.debug("already showing login window");
            return;
        }
        this.login = Ext.widget('main-login', {
            session: this.session,
            autoShow: true,
            listeners: {
                scope: this,
                eventLoginSuccess: 'onLogin'
            }
        });
    },

    checkSessionOK: function(currentUser) {
        this.currentUser = currentUser;
        this.viewport = Ext.widget('main-viewport', {
            session: this.session,
            viewModel: {
                data: {
                    currentUser: currentUser
                }
            }
        });
    }
});
