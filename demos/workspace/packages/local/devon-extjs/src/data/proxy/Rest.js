/**
 * Custom REST proxy to manage pagination params. This proxy converts sort and pagination params in the format that server expects:
 *     pagination : {
 *         page: X,
 *         size: X,
 *         total :true
 *     },
 *     sort: [
 *         {
 *             name:"X",
 *             direction:"ASC/DESC" 
 *         }
 *     ]
 * 
 */
Ext.define('Devon.data.proxy.Rest', {
    extend: 'Ext.data.proxy.Rest',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.Ajax'
    ],

    xtype: 'proxy.devon-rest',

    /**
     * @cfg {String} limitParam
     * Pagination limit param name
     * @accessor
     */
    limitParam: 'size',

    constructor: function(cfg) {
        if (this.pagination) {
            cfg.actionMethods = {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'DELETE'
            };
            cfg.paramsAsJson = true;
            cfg.reader = {
                type: 'json',
                rootProperty: 'result',
                totalProperty: 'pagination.total'
            };
        }

        this.callParent([cfg]);
    },

    /**
     * Override method sendRequest from {Ext.data.proxy.Ajax}
     * @param {Ext.data.Request} The request
     * @return {Ext.data.Request} The request
     * @private
     */
    sendRequest: function(request) {
         var me = this,
             params = request.getJsonData();
        
        if (params && params[me.sortParam]) {
            this.transformSortParams(request);
        }
        if (this.pagination) {
            this.transformPaginationParams(request);
        }

        this.callParent(arguments);
    },
    
    /**
     * Transform string sort param to object format
     * @param {Ext.data.Request} The request
     * @private
     */
    transformSortParams: function(request) {
        var me = this,
            params = request.getJsonData();
            
        if (params && params[me.sortParam]) {
            params[me.sortParam] = params[me.sortParam].replace('property','name');
            params[me.sortParam] = Ext.decode(params[me.sortParam]);
        }

    },

    /**
     * Transform pagination params to Devon pagination format
     * @param {Ext.data.Request} The request
     * @private
     */
    transformPaginationParams: function(request) {
        var me = this,
            params = request.getJsonData(),
            pagination = {
                'total': true
            };

        if (params) {
            if (typeof params[me.pageParam] != "undefined") {
                pagination[me.pageParam] = params[me.pageParam];
                delete params[me.pageParam];
            }

            //We do not want to send start param
            if (typeof params[me.startParam] != "undefined") {
                delete params[me.startParam];
            }

            if (typeof params[me.limitParam] != "undefined") {
                pagination[me.limitParam] = params[me.limitParam];
                delete params[me.limitParam];
            }

            params.pagination = pagination;
        }

    }
});
