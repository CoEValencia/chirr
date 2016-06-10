Ext.define('Sample.model.position.Position', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'id',
            type: 'int',
            allowNull: true,
            serialize: Devon.Data.serializeNull
        }, {
            name: 'orderId',
            type: 'int',
            allowNull: true
        }, {
            name: 'offerId',
            type: 'int',
            allowNull: true
        }, {
            name: 'cookId',
            type: 'int',
            allowNull: true
        },
        'offerName',
        'state',
        'price',
        'comment', {
            name: 'modificationCounter',
            type: 'int'
        }, {
            name: 'revision',
            type: 'int'
        }
    ],


    /*
      need to overwrite this function to pass serialize true when saving from
      a parent nested model. In this case we are saving position associated data
      from orderTable model
    */
    getData: function(options) {
        options.serialize = true;
        return this.callParent([options]);
    }

});
