Ext.define("Sample.view.table.TableEdit", {
    extend: "Ext.panel.Panel",
    alias: 'widget.tableedit',

    requires: [
        'Sample.view.table.TableEditVM',
        'Sample.view.table.TableEditVC'
    ],

    controller: "table-edit-controller",

    viewModel: {
        type: "table-edit-model"
    },

    closable: true,

    bind: {
        loading: '{!orderInfo}'
    },

    tbar: {
        items: [
            '->', {
                text: i18n.tableEdit.submit,
                handler: 'tableEditSubmit'
            }, {
                text: i18n.tableEdit.cancel,
                handler: 'tableEditCancel'
            }
        ]
    },

    items: [{
        padding: 10,
        bind: {
            html: i18n.tableEdit.html + '{tableId}'
        },
        border: false
    }, {
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'middle'
        },
        padding: 10,
        border: false,
        items: [{
            xtype: 'combo',
            fieldLabel: i18n.tableEdit.orderPos,
            reference: 'offerCombo',
            valueField: 'id',
            displayField: 'description',
            bind: {
                store: '{offers}',
                value: '{positionSelected}'
            }
        }, {
            xtype: 'button',
            text: i18n.tableEdit.add,
            handler: 'addPositionClick',
            bind: {
                disabled: '{!positionSelected}'
            }
        }]
    }, {
        xtype: 'grid',
        reference: 'menugrid',
        allowDeselect: true,

        columns: [{
            text: i18n.tableEdit.grid.number,
            dataIndex: 'id'
        }, {
            text: i18n.tableEdit.grid.title,
            dataIndex: 'offerName',
            flex: 1
        }, {
            text: i18n.tableEdit.grid.status,
            dataIndex: 'state'
        }, {
            text: i18n.tableEdit.grid.price,
            dataIndex: 'price'
        }, {
            text: i18n.tableEdit.grid.comment,
            dataIndex: 'comment',
            flex: 1
        }],
        bind: {
            store: '{positions}',
            selection: '{selectedItem}'
        },
        bbar: {
            items: [{
                    text: i18n.tableEdit.remove,
                    bind: {
                        disabled: '{!selectedItem}'
                    },
                    handler: 'positionRemove'
                },
                '->', {
                    text: i18n.tableEdit.submit,
                    handler: 'tableEditSubmit'
                }, {
                    text: i18n.tableEdit.cancel,
                    handler: 'tableEditCancel'
                }
            ]
        }
    }]
});
