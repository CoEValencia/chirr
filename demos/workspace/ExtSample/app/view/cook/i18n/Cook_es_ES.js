Ext.define('Sample.view.cook.i18n.Cook_es_ES', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        cook: {
            title: 'Posiciones',
            submit: 'Guardar',
            cancel: 'Cancelar',
            availableOrder: 'Pedidos disponibles',
            assignedeOrder: 'Pedidos asignados',
            grid: {
                columns: {
                    id: 'id',
                    order: 'Pedido id',
                    offer: 'Nombre oferta',
                    meal: 'Nombre menú',
                    dish: 'Nombre plato'
                },
                assign: 'Asignar',
                done: 'Hecho',
                reject: 'Rechazar'
            }
        }
    }
});
