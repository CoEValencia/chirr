Ext.define('Sample.view.table.i18n.Table_es_ES', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        tables: {
            title: 'Mesas',
            html: 'Lista de mesas para el restaurante de ejemplo',
            grid: {
                id: 'ID',
                state: 'ESTADO'
            },
            buttons: {
                add: 'Añadir',
                edit: 'Editar',
                editOrder: 'Editar Pedido',
                del: 'Borrar',
                refresh: 'Refrescar',
                reserve: 'Reservar',
                cancel: 'Cancelar Reserva',
                occupy: 'Ocupar',
                free: 'Libre'
            }
        },

        tableEdit: {
            title: 'Mesa: ',
            newTitle: 'Nueva mesa',
            status: 'ESTADO',
            orderPos: 'Línea de pedido:',
            add: 'Añadir',
            remove: 'Eliminar',
            submit: 'Enviar',
            cancel: 'Cancelar',
            html: 'Detalles de la mesa #',
            grid: {
                number: 'Número',
                title: 'Título',
                status: ' ESTADO',
                price: 'Precio',
                comment: 'Comentario'
            }
        },

        tableCrud: {
            title: 'Complete los datos',
            number: 'Número',
            state: 'Estado',
            submit: 'Guardar',
            cancel: 'Cancelar'
        }
    }
});
