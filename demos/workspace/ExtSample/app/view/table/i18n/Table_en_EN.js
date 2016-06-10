Ext.define('Sample.view.table.i18n.Table_en_EN', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        tables: {
            title: 'Tables',
            html: 'List of tables for the restaurant demo',
            grid: {
                id: 'ID',
                state: 'STATE'
            },
            buttons: {
                add: 'Add',
                edit: 'Edit',
                editOrder: 'Edit Order',
                del: 'Delete',
                refresh: 'Refresh',
                reserve: 'Reserve',
                cancel: 'Cancel Reservation',
                occupy: 'Occupy',
                free: 'Free'
            }
        },

        tableEdit: {
            title: 'Table: ',
            newTitle: 'New table',
            status: 'STATUS',
            orderPos: 'Order Positions:',
            add: 'Add',
            remove: 'Remove',
            submit: 'Submit',
            cancel: 'Cancel',
            html: 'Details for table #',
            grid: {
                number: 'Number',
                title: 'Title',
                status: ' STATUS',
                price: 'Price',
                comment: 'Comment'
            }
        },

        tableCrud: {
            title: 'Fill data',
            number: 'Number',
            state: 'State',
            submit: 'Submit',
            cancel: 'Cancel'
        }
    }
});
