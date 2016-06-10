Ext.define("Sample.view.cook.Cook", {
    extend: "Ext.panel.Panel",
    alias: 'widget.cook',

    requires: [
        'Ext.grid.Panel',
        'Sample.view.cook.CookVC'
    ],

    controller: "cook-controller",
    title: i18n.cook.title,
    viewModel: {
        type: "cook-model"
    },

    layout:{
        type:'vbox',
        align:'stretch'
    },

    closable: true,

    listeners: {
        render: 'loadData'
    },

    items: [{
        xtype:'label',
        padding: 10,
        text: i18n.cook.availableOrder,
        border: false
    }, {
        xtype: 'grid',
        reference: 'availablegrid',
        allowDeselect: true,
        flex:1,

        columns: [{
            text: i18n.cook.grid.columns.id,
            dataIndex: 'id'
        }, {
            text: i18n.cook.grid.columns.order,
            dataIndex: 'orderId'
        }, {
            text: i18n.cook.grid.columns.offer,
            dataIndex: 'offerName',
            flex: 1
        }, {
            text: i18n.cook.grid.columns.meal,
            dataIndex: 'XXmealName',
            flex: 1
        }, {
            text: i18n.cook.grid.columns.dish,
            dataIndex: 'XXdishName',
            flex: 1
        }],
        bind: {
            store: '{available}',
            selection: '{availableSelectedItem}'
        }
    }, 
    {
        xtype:'panel',
        layout:{
            type:'hbox',
            align:'stretch',
            pack:'center'
        },
        items:[{
            xtype:'button',
            text: i18n.cook.grid.assign,
            handler: 'positionAssignClick',
            cls:'x-btn-default-toolbar-small button-toolbar-style',
            iconCls:'icon_arrow_down',
            bind: {
                disabled: '{!availableSelectedItem}'
            }
        },{
            xtype:'button',
            text: i18n.cook.grid.reject,
            cls:'x-btn-default-toolbar-small button-toolbar-style',
            iconCls:'icon_arrow_up',
            margin: '0 10 0 20',
            handler: 'positionRejectClick',
            bind: {
                disabled: '{!assignedSelectedItem}'
            }
        }]
    },
    {
        xtype:'label',
        padding: 10,
        text: i18n.cook.assignedeOrder,
        border: false
    },{
        xtype: 'grid',
        reference: 'assignedgrid',
        allowDeselect: true,
        flex:1,

        columns: [{
            text: i18n.cook.grid.columns.id,
            dataIndex: 'id'
        }, {
            text: i18n.cook.grid.columns.order,
            dataIndex: 'orderId'
        }, {
            text: i18n.cook.grid.columns.offer,
            dataIndex: 'offerName',
            flex: 1
        }, {
            text: i18n.cook.grid.columns.meal,
            dataIndex: 'XXmealName',
            flex: 1
        }, {
            text: i18n.cook.grid.columns.dish,
            dataIndex: 'XXdishName',
            flex: 1
        }],
        bind: {
            store: '{assigned}',
            selection: '{assignedSelectedItem}'
        },
        
        bbar: {
            items: [
                '->',{
                text: i18n.cook.grid.done,              
                handler: 'positionDoneClick',
                bind: {
                    disabled: '{!assignedSelectedItem}'
                }
            }]
        }
    }]
});
