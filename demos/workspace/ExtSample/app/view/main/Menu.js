Ext.define('Sample.view.main.Menu', {
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
        text: i18n.main.menu.tables,
        menu:[{
            text: i18n.main.menu.manageTables,
            eventName: 'eventOpenTableList'
        },{
            text: i18n.main.menu.newTables,
            eventName: 'eventTableAdd'
        }]   
    },{
        text: i18n.main.menu.positions,
        eventName: 'event_menuOpenPositions'
    }]

});
