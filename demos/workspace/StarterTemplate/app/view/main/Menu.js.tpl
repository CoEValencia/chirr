Ext.define('{appName}.view.main.Menu', {
    extend: 'Ext.Panel',

    alias: 'widget.main-menu',

    requires: [
        'Ext.toolbar.Toolbar',

        //by default use the Devon VC for this menu
        'Devon.view.main.MenuVC'
    ],

    controller: 'main-menu',
    cls:'main-menu',
    buttonAlign:'left',
    buttons: [{
            text: 'page1', //i18n
            eventName: 'eventOpenPage1'
    }]
});
