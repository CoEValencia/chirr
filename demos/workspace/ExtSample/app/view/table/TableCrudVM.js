Ext.define('Sample.view.table.TableCrudVM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.table-crud-model',

    data:{
        table: {
            id : null,
            number: null,
            state:null
        }
    },

    tableId: null,

    stores: {
        states: {
            fields: ['code'],
            data: [{
                'code': 'FREE'
            }, {
                'code': 'OCCUPIED'
            }, {
                'code': 'RESERVED'
            }]
        }
    }

});
