Ext.define('Sample.model.table.Table', {
    extend: 'Ext.data.Model',

    statics: {
        state: {
            OCCUPIED: 'OCCUPIED',
            FREE: 'FREE',
            RESERVED: 'RESERVED',
            ORDERER: 'ORDERER',
            PREPARED: 'PREPARED',            
            DELIVERED: 'DELIVERED'            
        }
    },

    fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'modificationCounter',
            type: 'int'
        }, {
            name: 'revision',
            type: 'int'
        }, {
            name: 'waiterId',
            type: 'int',
            allowNull: true
        }, {
            name: 'number',
            type: 'int'
        }, {
            name: 'state',
            type: 'auto'
        }

    ],

    proxy: {
        type: 'rest',
        url: Devon.Url.build('tablemanagement/v1/table')
    }
});
