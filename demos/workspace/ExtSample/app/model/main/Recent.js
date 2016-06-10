Ext.define('Sample.model.main.Recent', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'xtype'
    }, {
        name: 'date',
        type: 'date'
    }, {
        name: 'description'
    }, {
        name: 'eventInfo'
    }]

});
