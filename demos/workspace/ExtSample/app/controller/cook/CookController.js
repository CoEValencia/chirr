Ext.define('Sample.controller.cook.CookController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Sample.view.cook.i18n.Cook_en_EN',
        'Sample.view.cook.i18n.Cook_es_ES',
        'Sample.view.cook.Cook'
    ],

    config: {
        listen: {
            global: {
                event_menuOpenPositions: 'onMenuOpenPositions'
            }
        }
    },
    
    init: function() {
        Devon.Ajax.define({
            /*'salesmanagement.order': {
                url: 'salesmanagement/v1/order/{id}'
            },*/
            'salesmanagement.orderposition': {
                url: 'salesmanagement/v1/orderposition'
            }
        });
    },

    onMenuOpenPositions: function(data) {
        var positions = new Sample.view.cook.Cook({
            viewModel: {
                data: data
            }
        });
        Devon.App.openInContentPanel(positions);
    }
});
