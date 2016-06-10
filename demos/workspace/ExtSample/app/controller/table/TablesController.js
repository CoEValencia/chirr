Ext.define('Sample.controller.table.TablesController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Sample.view.table.i18n.Table_en_EN',
        'Sample.view.table.i18n.Table_es_ES',
        'Sample.view.table.TableList',
        'Sample.view.table.TableCrud',
        'Sample.view.table.TableEdit'
    ],

    config: {
        listen: {
            global: {
                eventOpenTableList: 'onMenuOpenTables',
                eventTableAdd: 'onTableAdd',
                eventTableEdit: 'onTableEdit',
                eventTableEditOrder: 'onTableEditOrder'
            }
        }
    },

    init: function() {
        Devon.Ajax.define({
            'tablemanagement.table': {
                url: 'tablemanagement/v1/table/{id}'
            },
            'tablemanagement.search': {
                url: 'tablemanagement/v1/table/search',
                pagination: true
            },
            'salesmanagement.order': {
                url: 'salesmanagement/v1/order/{id}'
            },
            'tablemanagement.offer': {
                url: 'offermanagement/v1/offer'
            }
        });
    },

    onMenuOpenTables: function(options) {
        var tables = new Sample.view.table.TableList(options);

        Devon.App.openInContentPanel(tables);

    },

    //We use window for add case to show an example of how to work with window
    onTableAdd: function() {
        var window = Ext.create('Ext.window.Window', {
            title: i18n.tableEdit.newTitle,
            width: 400,
            layout: 'fit',
            closable:false,
            resizable:false,
            modal:true,
            items: [{
                xtype:'tablecrud'
            }],
            listeners: {
                scope: this,
                eventDone: 'closeWindow'
            }
        }).show();
    },

    //We use tab for edit case to show an example of how to edit multiple tables in different tabs
    onTableEdit: function(tableSelected) {
        var id = tableSelected.id;
        var panel = new Sample.view.table.TableCrud({
            title: i18n.tableEdit.title + id,
            closable:true,
            viewModel: {
                data: {
                    tableId: id
                }
            }
        });
        
        Devon.App.openInContentPanel(panel, {id: id});
        
        Ext.GlobalEvents.fireEvent('openedInContentPanel', panel, {id:id});
    },

    onTableEditOrder: function(tableSelected) {
        var id = tableSelected.id;
        var panel = new Sample.view.table.TableEdit({
            title: i18n.tableEdit.title + id,
            viewModel: {
                data: {
                    tableId: id
                }
            }
        });
        Devon.App.openInContentPanel(panel, {
            id: id
        });
    },

    closeWindow: function(window){
        window.close();
    }
});
