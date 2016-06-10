Ext.define('Sample.model.OrderTableOrder', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'id',
            type: 'int'
        },
        'state', {
            name: 'modificationCounter',
            type: 'int'
        }, {
            name: 'revision',
            type: 'int'
        }, {
            name: 'tableId',
            type: 'int'
        }, {
            name: 'orderTableId',
            reference: 'Sample.model.OrderTable'
        }
    ]
});
