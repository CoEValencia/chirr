/**
 * This is a plugin to add a pagination toolbar in a grid.
 * This plugin needs to work with a binding store.
 *
 * To use this plugin you should to include it in grid plugins config property
 *    {
 *        xtype: 'grid',
 *        bind: {
 *           store: '{mystore}'
 *        },
 *        plugins:['pagination'],
 *        ...
 *     }
 * 
 */
Ext.define('Devon.grid.plugin.Pagination', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.pagination',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging'
    ],

    init: function(grid) {
        var me = this;

        // If we do not find a binding store, we throw an error
        if (!grid || !grid.getInitialConfig() || !grid.getInitialConfig().bind || !grid.getInitialConfig().bind.store) {
            Devon.Log.error("Not found binding for store");
            throw ("Not found binding for store");
        }

        var pagingCfg = {
            bind: {
                store: grid.getInitialConfig().bind.store
            },
            dock: 'bottom'
        };

        grid.addDocked(Ext.create('Ext.toolbar.Paging', pagingCfg));

        me.callParent(arguments);
    }

});
