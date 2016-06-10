Ext.define('Sample.view.table.TableListVM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.table-tables',
    requires: ['Sample.model.table.Table'],

    data: {
        selectedItem: false,
        name: 'Sample',
        stateFilter:null
    },

    stores: {
        tables: {
            model: 'Sample.model.table.Table',
            pageSize: 3,
            proxy: {
                type: 'tablemanagement.search',
                extraParams:'{stateFilter}'
            },
            autoLoad: true,
            remoteSort:true,
            remoteFilter:true,
            sorters: {property:'number', direction:'ASC'}
        }
    },

    formulas: {
        canReserve: function(get) {
            var table = get('selectedItem');
            if (!table) {
                return false;
            }
            return table.get("state") == Sample.model.table.Table.state.FREE;
        },
        canCancel: function(get) {
            var table = get('selectedItem');
            if (!table) {
                return false;
            }

            return table.get("state") == Sample.model.table.Table.state.RESERVED;
        },
        canOcuppy: function(get) {
            var table = get('selectedItem');
            if (!table) {
                return false;
            }
            var state = table.get("state");
            return state == Sample.model.table.Table.state.RESERVED || state == Sample.model.table.Table.state.FREE;
        },
        canFree: function(get) {
            var table = get('selectedItem');
            if (!table) {
                return false;
            }
            return table.get("state") == Sample.model.table.Table.state.OCCUPIED;
        }

    }

});
