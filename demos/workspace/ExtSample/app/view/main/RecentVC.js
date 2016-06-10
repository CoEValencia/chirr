Ext.define('Sample.view.main.RecentVC', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main-recent',

    config: {
        listen: {
            global: {
                openedInContentPanel: 'onOpenedInContentPanel'
            }
        }
    },


    /* For each xtype Recent must know which event to fire in order to open again
    the panel.

    This is not DRY but it decouples the application from the "Recent" functionality
    */
    recentDictionary: {
        tableedit: {
            description: i18n.recent.dictionary.order,
            event: 'eventTableEditOrder'
        },
        tablecrud: {
            description: i18n.recent.dictionary.tableedit,
            event: 'eventTableEdit'

        }

    },

    onOpenedInContentPanel: function(panel, eventInfo) {
        
        if (this.openingRecent) {
            this.openingRecent = false;
            return;
        }


        if (!eventInfo || !eventInfo.id) {
            return; //event has no data to add to recent
        }

        this.openingRecent = true;

        var store = this.getViewModel().getStore('recent');

        var dict = this.recentDictionary[panel.xtype];

        eventInfo.__event = dict.event;
        store.add({
            xtype: dict.description,
            date: new Date(),
            id: dict.description + eventInfo.id,
            eventInfo: JSON.stringify(eventInfo)
        });

        this.openingRecent = false;
    },

    rowdblclick: function(grid, record) {
        var eventInfo = JSON.parse(record.get("eventInfo"));
        Ext.GlobalEvents.fireEvent(eventInfo.__event, eventInfo);
    }


});
