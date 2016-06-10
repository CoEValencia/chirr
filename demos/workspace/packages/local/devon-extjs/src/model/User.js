Ext.define('Devon.model.User', {
    extend: 'Ext.data.Model',

    alias: 'model-user',

    fields: [{
            name: 'id',
            reference: 'id'
        },
        'firstName',
        'lastName',
        'name',
        'role'
    ],

    proxy: {
        type: 'ajax',
        url: Devon.Url.build('security/v1/currentuser/'),
        noCache: false
    }


});
