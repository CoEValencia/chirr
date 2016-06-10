Ext.define("Sample.view.table.TableCrud", {
    extend: "Ext.panel.Panel",
    alias: 'widget.tablecrud',

    requires: [
        'Ext.panel.Panel',
        'Ext.form.Panel',
        'Sample.model.position.Position',
        'Sample.view.table.TableCrudVM',
        'Sample.view.table.TableCrudVC',
        'Devon.plugin.PreventDataLoss'
    ],

    controller: "table-crud-controller",

    viewModel: {
        type: "table-crud-model"
    },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'fieldset',
                title: i18n.tableCrud.title,
                margin: 10,
                items: [
                    this.formPanel
                ]
            }]
        });
        this.callParent(arguments);

    },

    formPanel:  {
        xtype: 'form',
        plugins: [{
            ptype: 'preventdataloss'
        }],
        reference: 'panel',
        defaults: {
            margin: 5
        },
        bind:{
            values : '{table}'
        },
        items: [{
            xtype: 'hiddenfield',
            reference: 'id',
            name: 'id',
            bind: {
                value: '{table.id}'
            }
        }, {
            xtype: 'numberfield',
            reference: 'number',
            name: 'number',
            fieldLabel: i18n.tableCrud.number,
            bind: {
                value: '{table.number}'
            },
            tabIndex: 1,
            minValue: 1
        }, {
            xtype: 'combo',
            name: 'state',
            reference: 'state',
            fieldLabel: i18n.tableCrud.state,
            tabIndex: 2,
            queryMode: 'local',
            displayField: 'code',
            valueField: 'code',
            bind: {
                store: '{states}',
                value: '{table.state}'
            }
        }]
        
    },
    
    bbar: [
        '->', {
            text: i18n.tableCrud.submit,
            handler: 'onTableCrudSubmit'
        }, {
            text: i18n.tableCrud.cancel,
            handler: 'onTableCrudDone'
        }
    ]
});
