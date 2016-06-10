Ext.define('Sample.model.Offer', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'id',
            type: 'int'
        },
        'state',
        'description',
        'name',
        'price', {
            name: 'modificationCounter',
            type: 'int'
        }, {
            name: 'drinkId',
            type: 'int'
        }, {
            name: 'number',
            type: 'int'
        }, {
            name: 'mealId',
            type: 'int'
        }, {
            name: 'sideDishId',
            type: 'int'
        }, {
            name: 'revision',
            type: 'int'
        }
    ]

});
