Ext.define('Sample.view.main.RecentVM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main-recent',

    data: {
        name: 'Sample'
    },

    stores: {
        recent: {
            model: 'Sample.model.main.Recent'
        }
    }

});
