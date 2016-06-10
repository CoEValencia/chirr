Ext.define('Sample.view.cook.CookVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cook-controller',

    requires: [
        'Ext.grid.Panel',
        'Sample.model.position.Position',
        'Sample.view.cook.CookVM'
    ],

    loadData: function() {
        var vm = this.getViewModel();
        var view = this.getView();
        var available = vm.get('available');
        var assigned = vm.get('assigned');
        
        available.removeAll();
        assigned.removeAll();
        
        Devon.rest.salesmanagement.orderposition.get({
            scope: this,
            params: {
                mealOrSideDish: true,
                state: 'ORDERED'
            },
            masked:true,
            success: function(orders) {
                if (!orders || !orders.length) {
                    return;
                }
                available.loadData(orders);
                assigned.loadData(orders);
                vm.set("order", orders[0].orderId);
            }
        });

    },

    addPositionClick: function() {
        var vm = this.getViewModel();
        var offers = vm.get("offers");
        var positionValue = vm.get("positionSelected");

        var position = offers.findRecord('id', positionValue);

        var order = vm.get("order");

        vm.get("positions").add({
            id: null,
            orderId: order.id,
            offerId: position.get("id"),
            offerName: position.get("description"),
            state: Sample.model.table.Table.state.ORDERED,
            price: position.get("price")
        });
        //var newPosition = new Sample.model.Position(
    },

    positionAssignClick: function() {
        var currentUser = Devon.Security.currentUser;
        this.positionChangeAssignement("availableSelectedItem", currentUser.id);
    },
    
    positionDoneClick: function() {
        var me = this;
        var vm = me.getViewModel();
        var order = vm.get("assignedSelectedItem").data;
        order.state = Sample.model.table.Table.state.PREPARED;
        
        Devon.rest.salesmanagement.orderposition.post({
            scope: me,
            jsonData: order,
            masked:true,
            success: function(orders) {
                me.loadData();
            }
        });

    },

    positionRejectClick: function() {
        this.positionChangeAssignement("assignedSelectedItem", null);
    },


    positionChangeAssignement: function(selectedItemKey, cookId) {
        var me = this;
        var vm = this.getViewModel();
        var selectedItem = vm.get(selectedItemKey);

        var data = Ext.clone(selectedItem.data);
        data.cookId = cookId;

        Devon.rest.salesmanagement.orderposition.post({
            scope: this,
            jsonData: data,
            masked:true,
            success: function(orders) {
                 me.loadData();
            }
        });
    }

});
