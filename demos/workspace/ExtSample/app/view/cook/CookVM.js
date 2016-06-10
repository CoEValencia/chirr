Ext.define('Sample.view.cook.CookVM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Sample.model.Offer'
    ],
    alias: 'viewmodel.cook-model',

    data: {
        selectedItem: false,
        name: 'Sample',
        order: null
    },

    stores: {
        available: {
            model: 'Sample.model.position.Position',
            filters: [
                function(item) {
                    return item.data.cookId === null;
                }
            ]

        },
        assigned: {
            model: 'Sample.model.position.Position',
            filters: [
                function(item) {
                    return item.data.cookId !== null;
                }
            ]
        }
    }

});
