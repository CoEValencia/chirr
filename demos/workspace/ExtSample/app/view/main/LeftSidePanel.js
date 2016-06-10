Ext.define('Sample.view.main.LeftSidePanel', {
    extend: 'Ext.Panel',

    alias: 'widget.main-leftsidepanel',

    requires: [
        'Sample.view.main.Recent'
    ],

    cls:'main-leftsidepanel',
    width: 220,
    bodyPadding:0,
    resizable: {
        handles: 'e',
        pinned: true
    },

    layout: {
        type:'vbox',
    	align:'stretch'
    },

    items: [{
        xtype: 'main-res-status',
        height:220
    },{
        xtype: 'main-recent',
        flex:1
    }]
});
