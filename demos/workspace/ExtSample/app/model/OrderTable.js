Ext.define('Sample.model.OrderTable', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'id',
            persist: false
        },
        //this field creates the internal orderId needed to reference the Order
        {
            name: 'orderId',
            reference: 'Sample.model.Order',
            unique: true,
            persist: false
        }
    ],
    hasMany: [{
        name: 'positions',
        model: 'Sample.model.position.Position'
    }],

    proxy: {
        type: 'rest',
        url: Devon.Url.build('salesmanagement/v1/order/'),
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        noCache: false,
        appendId: false,
        reader: {
            type: 'json'
        },
        writer: {
            writeAllFields: true, //save not only modified/deleted records
            allDataOptions: {
                associated: true, //save associated models
                serialize: true // avoid sending ExtJS generated id to server

            }
        }
    }


});
