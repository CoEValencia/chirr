Ext.define('Sample.view.main.Recent', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.main-recent',

    requires: [
        'Sample.view.main.RecentVM',
        'Sample.view.main.RecentVC'
    ],

    title: i18n.recent.title,
    collapsible:true,
    margin: 0,

    viewModel: {
        type: 'main-recent'
    },

    controller: 'main-recent',

    listeners: {
        rowdblclick: 'rowdblclick'
    },

    columns: [{
        text: i18n.recent.type,
        dataIndex: 'xtype'
    }, {
        text: i18n.recent.id,
        dataIndex: 'id'
    }],

    bind: {
        store: '{recent}'
    }

});
