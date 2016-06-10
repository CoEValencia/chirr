Ext.define('Sample.view.main.RestaurantStatus', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.main-res-status',
    requires:['Sample.view.main.RestaurantStatusVC'],
    title: i18n.restaurantStatus.title,
    collapsible:true,
    controller: 'main-res-status',
    rootVisible: false,
    root: {
    	expanded: true,
    	id:'root',
        children: [{
            text: i18n.restaurantStatus.tables,
            id:'tables',
            expanded: true,
            children: [{
                text: i18n.restaurantStatus.free,
                id:'tables-free',
                iconCls:'treenode-no-icon',
                leaf: true
            },{
            	text: i18n.restaurantStatus.reserved,
            	id:'tables-reserved',
            	iconCls:'treenode-no-icon',
                leaf: true
            },{
            	text: i18n.restaurantStatus.occupied,
            	id:'tables-occupied',
            	iconCls:'treenode-no-icon',
                leaf: true
            }]
        }, {
            text: i18n.restaurantStatus.positions,
            id:'positions',
            expanded: true,
            children: [{
                text: i18n.restaurantStatus.assigned,
                id:'positions-assigned',
                iconCls:'treenode-no-icon',
                leaf: true
            },{
            	text: i18n.restaurantStatus.total,
            	id:'positions-total',
            	iconCls:'treenode-no-icon',
                leaf: true
            }]
        }]
    },

    listeners: {
        select: 'onSelect'
    }

});