Ext.define('Sample.view.main.i18n.Main_en_EN', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        main: {
            loggedInAs: 'Logged in as:',
            logOffButton: 'Log off',
            header: {
                title: 'Restaurant Sample Application '
            },
            menu: {
                tables: 'Tables',
                manageTables: 'Manage Tables',
                newTables: 'New Table',
                positions: 'Positions'
            },
            home: {
                tabTitle: 'Home',
                content: 'Welcome to the OASP Sencha sample client'
            },
            deleteConfirmMsg: 'Are you sure to delete this record?'
        },
        restaurantStatus:{
        	title:'Restaurant',
        	tables: 'Tables',
            positions: 'Positions',
            free : 'Free',
            occupied : 'Occupied',
            reserved : 'Reserved',
            assigned : 'Assigned',
            total : 'Total'
        },
        recent: {
            title: 'Recent items',
            type: 'Type',
            id: 'Id',
            dictionary: {
                tableedit: 'Table'
            }
        }
    }
});
