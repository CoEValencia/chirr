Ext.define('Sample.view.main.i18n.Main_es_ES', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        main: {
            loggedInAs: 'Identificado como:',
            logOffButton: 'Salir',
            header: {
                title: 'Ejemplo aplicación de restaurante'
            },
            menu: {
                tables: 'Mesas',
                manageTables: 'Gestión de mesas',
                newTables: 'Nueva mesa',
                positions: 'Posiciones'
            },
            home: {
                tabTitle: 'Inicio',
                content: 'Bienvenido al ejemplo de cliente para OASP con Sencha'
            },
            deleteConfirmMsg: 'Estás seguro de borrar el registro?'
        },
        restaurantStatus:{
            title:'Restaurante',
            tables: 'Mesas',
            positions: 'Posiciones',
            free : 'Libres',
            occupied : 'Ocupadas',
            reserved : 'Reservadas',
            assigned : 'Asignadas',
            total : 'Total'
        },
        recent: {
            title: 'Elementos recientes',
            type: 'Tipo',
            id: 'Id',
            dictionary: {
                tableedit: 'Mesa'
            }
        }
    }
});
