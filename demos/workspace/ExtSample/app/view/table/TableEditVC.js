Ext.define('Sample.view.table.TableEditVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.table-edit-controller',

    control: {
        'tableedit': {
            afterrender: 'onAfterRender'
        }
    },

    onAfterRender: function() {  
        var vm = this.getViewModel();

        this.getTable(vm.get("tableId"));
    },

    getTable: function(id) {
        Devon.rest.tablemanagement.table.get({
            scope: this,
            uriParams: {
                id: id
            },
            success: this.loadOrder
        });
    },

    loadOrder: function(table) {
        Devon.rest.salesmanagement.order.get({
            scope: this,
            params: {
                state: Sample.model.Order.state.OPEN,
                tableId: table.id
            },
            success: function(orderInfo) {
                orderInfo = orderInfo.result[0] || {
                    positions: []
                };

                var vm = this.getViewModel();
                vm.set("orderInfo", {
                    table: table,
                    order: orderInfo.order || {
                        tableId: table.id,
                        state: Sample.model.Order.state.OPEN
                    },
                    positions: orderInfo.positions || []
                });
                vm.get("positions").loadData(orderInfo.positions);
            }
        });
    },

    tableEditCancel: function() {
        this.tableEditClose();
    },


    tableEditClose: function() {
        this.getView().destroy();
    },

    tableEditSubmit: function() {

        var vm = this.getViewModel();
        var orderInfo = vm.get("orderInfo");
        var positions = vm.get("positions");

        var jsonData = {
            order: orderInfo.order,
            positions: Ext.Array.map(positions.getRange(),
                function(record) {
                    return record.getData({
                        serialize: true
                    });
                })
        };

        Devon.rest.salesmanagement.order.post({
            scope: this,
            jsonData: jsonData,
            success: this.tableEditClose
        });
    },

    positionRemove: function() {
        var model = this.getViewModel();
        var positions = model.get("positions");
        var selectedItem = model.get("selectedItem");

        positions.remove(selectedItem);
    },

    addPositionClick: function() {
        var vm = this.getViewModel();
        var offers = vm.get("offers");
        var positionValue = vm.get("positionSelected");

        var position = offers.findRecord('id', positionValue);

        var orderInfo = vm.get("orderInfo");

        vm.get("positions").add({
            id: null,
            orderId: orderInfo.order.id,
            offerId: position.get("id"),
            offerName: position.get("description"),
            state: Sample.model.table.Table.state.ORDERED,
            price: position.get("price")
        });
    }

});
