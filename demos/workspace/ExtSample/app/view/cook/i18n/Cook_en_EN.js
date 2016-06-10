Ext.define('Sample.view.cook.i18n.Cook_en_EN', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        cook: {
            title: 'Positions',
            submit: 'Submit',
            cancel: 'Cancel',
            availableOrder: 'Orders availables',
            assignedeOrder: 'Assigned orders',
            grid: {
                columns: {
                    id: 'id',
                    order: 'Order id',
                    offer: 'Offer name',
                    meal: 'Meal name',
                    dish: 'Side dish name'
                },
                assign: 'Assign',
                done: 'Done',
                reject: 'Reject'
            }
        }
    }
});
