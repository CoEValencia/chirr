Ext.define('Sample.view.main.RestaurantStatusVC', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.main-res-status',

    listen: {
        global: {
            eventTablesChanged: 'onTablesChanged'
        }
    },

    control: {
        '#': {
            afterrender: 'onAfterRender'
        }
    },

    onTablesChanged: function(){
        this.refreshTree();
    },

    onAfterRender: function() {
        this.refreshTree();
    },

    refreshTree: function(){
        var store=this.getView().getStore();
        Devon.rest.tablemanagement.search.post({
            jsonData:{},
            success:function(data){
                var res=data.result, free=0, occupied=0, reserved=0;
                Ext.Array.each(res,function(item){
                    if(item.state==Sample.model.table.Table.state.FREE) free++;
                    if(item.state==Sample.model.table.Table.state.OCCUPIED) occupied++;
                    if(item.state==Sample.model.table.Table.state.RESERVED) reserved++;
                });
                store.getNodeById('tables-free').set('text',i18n.restaurantStatus.free+' ('+free+')');
                store.getNodeById('tables-reserved').set('text',i18n.restaurantStatus.reserved+' ('+reserved+')');
                store.getNodeById('tables-occupied').set('text',i18n.restaurantStatus.occupied+' ('+occupied+')');
            }
        });

        Devon.rest.salesmanagement.orderposition.get({
            scope: this,
            params: {
                mealOrSideDish: true
            },
            success: function(orders) {
                if (!orders || !orders.length) {
                    return;
                }
                var assigned=0;
                Ext.Array.each(orders,function(item){
                   if(item.state=='ASSIGNED')  assigned++;
                });
                store.getNodeById('positions-assigned').set('text',i18n.restaurantStatus.assigned+' ('+assigned+')');
                store.getNodeById('positions-total').set('text',i18n.restaurantStatus.total+' ('+orders.length+')');
            }
        });
    },

    onSelect : function(tree, record){
    	if(record.isLeaf()){
    	    var nodeId=record.getId();
    	    if(Ext.String.startsWith(nodeId,'table')){
    	        var state=nodeId.split('-')[1];
    	        var title=i18n.tables.title+' '+i18n.restaurantStatus[state];
    	        state=Sample.model.table.Table.state[state.toUpperCase()];
    	        Ext.GlobalEvents.fireEvent('eventOpenTableList',{title:title,stateFilter:state});
    	    }else{
    	        //TODO: Add the same functionality to positions
    	    }
    	}
    }

});
