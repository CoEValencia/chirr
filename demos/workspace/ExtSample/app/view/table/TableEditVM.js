Ext.define('Sample.view.table.TableEditVM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Sample.model.Offer',
        'Sample.model.Order',
        'Sample.model.OrderTable'
    ],
    alias: 'viewmodel.table-edit-model',

    data: {
        selectedItem: false,
        orderInfo: null
    },

    stores: {
        positions: {
            model: 'Sample.model.position.Position',
            autoLoad: false
        },
        offers: {
            model: 'Sample.model.Offer',
            proxy: {
                type: 'tablemanagement.offer'
            },
            autoLoad: true
        }
    }

});
