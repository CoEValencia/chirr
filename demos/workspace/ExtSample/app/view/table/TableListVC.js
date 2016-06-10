Ext.define('Sample.view.table.TableListVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.table-tables',

    requires: [
        'Ext.grid.Panel',
        'Sample.model.table.Table'
    ],

    listen: {
        global: {
            eventTablesChanged: 'onTablesChanged'
        },
        component: {
            'tables': {
                'afterrender':'onAfterRender'
            }
        }
    },

    onAfterRender: function(panel){
        var stateFilter=this.getView().stateFilter;
        if(stateFilter) this.getViewModel().set('stateFilter',{state:stateFilter});
    },

    markSelectedAs: function(status) {
        var me = this;
        var table = me.getViewModel().get('selectedItem').data;
        table.state = status;

        Devon.rest.tablemanagement.table.post({
            scope: me,
            jsonData: table,
            success: function(){
                Ext.GlobalEvents.fireEvent('eventTablesChanged');
            }
        });

    },

    onMarkAsOccupied: function() {
        this.markSelectedAs(Sample.model.table.Table.state.OCCUPIED);
    },

    onMarkAsFree: function() {
        this.markSelectedAs(Sample.model.table.Table.state.FREE);
    },

    onMarkAsReserved: function() {
        this.markSelectedAs(Sample.model.table.Table.state.RESERVED);
    },

    onCancelReserve: function() {
        this.markSelectedAs(Sample.model.table.Table.state.FREE);
    },

    onAddClick: function() {
        Ext.GlobalEvents.fireEvent('eventTableAdd');
    },

    onEditClick: function() {
        var rec = this.getViewModel().get('selectedItem');
        Ext.GlobalEvents.fireEvent('eventTableEdit', {
            id: rec.id
        });
    },

    onEditOrderClick: function() {
        var rec = this.getViewModel().get('selectedItem');
        Ext.GlobalEvents.fireEvent('eventTableEditOrder', {
            id: rec.id
        });
    },

    onEditDblclick: function(view, record, item, index, e, eOpts) {
        Ext.GlobalEvents.fireEvent('eventTableEdit', {
            id: record.get('id')
        });

    },

    onDeleteClick: function() {
        var me = this;

        Ext.MessageBox.confirm('Confirmar', i18n.main.deleteConfirmMsg,
            function(buttonPressed) {
                if (buttonPressed == 'no' || buttonPressed == 'cancel') {
                    return;
                }

                var rec = me.getViewModel().get('selectedItem');

                Devon.rest.tablemanagement.table.del({
                    scope: me,
                    uriParams: {
                        id: rec.get('id')
                    },
                    success: me.refreshGrid
                });

            });

    },

    refreshGrid: function() {
        var grid = this.lookupReference('tablesgrid');
        grid.getStore().reload();
    },

    onTablesChanged: function() {
        this.refreshGrid();
    }

});
