Ext.define('Devon.view.login.LoginVM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main-login',

    // Just some data to seed the process. This might be pulled from a cookie or other
    // in a real app.
    data: {
        defaultOrg: 1,
        username: 'waiter'
    },

    stores: {}
});
