Ext.define('Sample.view.table.TableCrudVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.table-crud-controller',

    control: {
        '#': {
            afterrender: 'onAfterRender'
        }
    },

    onAfterRender: function() {
        var vm = this.getViewModel();
        var id = vm.get("tableId");

        if (id) {
            Devon.rest.tablemanagement.table.get({
                scope: this,
                uriParams: {
                    id: id
                },
                success: function(table) {
                    vm.set('table', table);
                }
            });
        }
    },

    onTableCrudDone: function() {
        //Fire close event
        var parent =  this.getView().up();
        
        //If window we fire event
        if(parent.xtype=='window'){
            parent.fireEvent('eventDone', parent);
        }
        //If tabpanel, we close the tab
        else{
            this.getView().close();
        }
    },
    
    tableCrudSubmit: function() {
        //Fire event table changed
        Ext.GlobalEvents.fireEvent('eventTablesChanged');
        
        //Fire close window event
        this.onTableCrudDone();
    },

    onTableCrudSubmit: function() {
        var form = this.getView().down('form');

        if (form.isValid()) {
            Devon.rest.tablemanagement.table.post({
                scope: this,
                jsonData: this.getViewModel().get('table'),
                referenceView: 'panel',
                success: this.tableCrudSubmit
            });
        }
    }

});
