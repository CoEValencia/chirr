Ext.define('Devon.view.main.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [],

    xtype: 'main-viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        this.items = Devon.Array.defineIf([{
            defineIf: Devon.Class.isDefined('widget.main-header'),
            region: 'north',
            xtype: 'main-header'
        }, {
            defineIf: Devon.Class.isDefined('widget.main-menu'),
            region: 'north',
            xtype: 'main-menu'
        }, {
            region: 'center',
            xtype: 'main-content'
        }, {
            defineIf: Devon.Class.isDefined('widget.main-leftsidepanel'),
            region: 'west',
            xtype: 'main-leftsidepanel'
        }]);
        this.callParent();
    }

});
