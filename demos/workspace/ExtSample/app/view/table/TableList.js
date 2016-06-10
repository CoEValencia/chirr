Ext.define("Sample.view.table.TableList", {
    extend: "Ext.panel.Panel",
    alias: 'widget.tables',

    requires: [
        'Ext.grid.Panel',
        'Devon.grid.plugin.Pagination',
        'Sample.view.table.TableListVM',
        'Sample.view.table.TableListVC'
    ],

    closable: true,
    controller: "table-tables",

    title: i18n.tables.title,

    viewModel: {
        type: "table-tables"
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'label',
        padding: 10,
        html: i18n.tables.html
    }, {
        xtype: 'grid',
        reference: 'tablesgrid',
        flex: 1,
        padding: '0 10 10 10',
        allowDeselect: true,
        columns: [{
            text: 'NUMBER',
            dataIndex: 'number'
        }, {
            text: i18n.tables.grid.state,
            dataIndex: 'state',
            flex: 1
        }],

        bind: {
            store: '{tables}',
            selection: '{selectedItem}'
        },
        plugins: ['pagination'],
        tbar: {
            items: [{
                text: i18n.tables.buttons.add,
                handler: 'onAddClick'
            }, {
                text: i18n.tables.buttons.edit,
                bind: {
                    disabled: '{!selectedItem}'
                },
                handler: 'onEditClick'
            }, {
                text: i18n.tables.buttons.del,
                bind: {
                    disabled: '{!selectedItem}'
                },
                handler: 'onDeleteClick'
            }, '-', {
                text: i18n.tables.buttons.editOrder,
                bind: {
                    disabled: '{!selectedItem}'
                },
                handler: 'onEditOrderClick'
            }, {
                text: i18n.tables.buttons.reserve,
                handler: 'onMarkAsReserved',
                bind: {
                    disabled: '{!canReserve}'
                }
            }, {
                text: i18n.tables.buttons.cancel,
                handler: 'onCancelReserve',
                bind: {
                    disabled: '{!canCancel}'
                }

            }, {
                text: i18n.tables.buttons.occupy,
                handler: 'onMarkAsOccupied',
                bind: {
                    disabled: '{!canOcuppy}'
                }

            }, {
                text: i18n.tables.buttons.free,
                handler: 'onMarkAsFree',
                bind: {
                    disabled: '{!canFree}'
                }

            }]
        },

        listeners: {
            beforeitemdblclick: 'onEditDblclick'
        }
    }]
});
