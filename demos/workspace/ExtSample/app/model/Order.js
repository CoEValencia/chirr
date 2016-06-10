Ext.define('Sample.model.Order', {
    extend: 'Ext.data.Model',

    statics: {
        state: {
            OPEN: 'OPEN'
        }
    },
    fields: [{
            name: 'id',
            type: 'int',
            serialize: Devon.Data.serializeNull
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
        }
    ],

    proxy: {
        type: 'ajax',
        url: Devon.Url.build('security/v1/currentuser/'),
        noCache: false
    },

    getData: function(options) {
        options.serialize = true;
        return this.callParent([options]);
    }


});
