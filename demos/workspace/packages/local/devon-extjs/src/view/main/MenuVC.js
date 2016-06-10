Ext.define('Devon.view.main.MenuVC', {
    extend: 'Ext.app.ViewController',

    requires: [],

    alias: 'controller.main-menu',

    control: {
        'button, menuitem': {
            click: 'menuClick'
        }
    },

    menuClick: function(menuItem) {
        if(menuItem && menuItem.eventName){
            Ext.GlobalEvents.fireEvent(menuItem.eventName, {});
        }
    }
});
