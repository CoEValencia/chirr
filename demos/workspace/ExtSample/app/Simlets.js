Ext.define('Sample.Simlets', {
  singleton: true,
    requires:[
      'Ext.ux.ajax.SimManager', 'Ext.ux.ajax.JsonSimlet'
      ],

    useSimlets : function(){
        Ext.ux.ajax.SimManager.init({
            defaultSimlet: 404,
            defaultType: 'json'
        });
        Ext.ux.ajax.SimManager.register({
          url:/currentuser/,
          data:  {"id":2,"name":"waiter","firstName":"Willy","lastName":"Waiter","role":"WAITER"}
        });
        Ext.ux.ajax.SimManager.register({
          url:/csrftoken/,
          data:  { headerName: 'FAKE-CSRF', token: '1234-fake' }
        });
        Ext.ux.ajax.SimManager.register({
          url:/login/,
          data:  { headerName: 'FAKE-CSRF', csrf: '1234-fake' }
        });        
        Ext.ux.ajax.SimManager.register({
          url:/tablemanagement.v1.table.search/,
          data: function(request){
            console.log(Ext.decode(request.xhr.body));

            return {"pagination":{"size":500,"page":1,"total":null},"result":[{"id":101,"modificationCounter":1,"revision":null,"waiterId":null,"number":1,"state":"OCCUPIED"},{"id":102,"modificationCounter":2,"revision":null,"waiterId":null,"number":2,"state":"OCCUPIED"},{"id":103,"modificationCounter":1,"revision":null,"waiterId":null,"number":3,"state":"FREE"},{"id":104,"modificationCounter":1,"revision":null,"waiterId":null,"number":4,"state":"FREE"},{"id":105,"modificationCounter":1,"revision":null,"waiterId":null,"number":5,"state":"FREE"}]};
          }
        });
        Ext.ux.ajax.SimManager.register({
          url:/tablemanagement\/v1\/table\//,
          data:  function(request){
            console.log(Ext.decode(request.xhr.body));
            console.log("simlet used");
            return {"id":101,"modificationCounter":1,"revision":null,"waiterId":null,"number":1,"state":"OCCUPIED"}
          }
        });        
        Ext.ux.ajax.SimManager.register({
          url:/salesmanagement.v1.orderposition/,
          data: function(request){
            console.log(Ext.decode(request.xhr.body));

            return [{"id":1,"modificationCounter":1,"revision":null,"orderId":1,"cookId":null,"offerId":1,"offerName":"Schnitzel-Menü","state":"DELIVERED","drinkState":"DELIVERED","price":"6.99","comment":"mit Ketschup"},{"id":2,"modificationCounter":1,"revision":null,"orderId":1,"cookId":null,"offerId":2,"offerName":"Goulasch-Menü","state":"DELIVERED","drinkState":"DELIVERED","price":"7.99","comment":""},{"id":3,"modificationCounter":1,"revision":null,"orderId":1,"cookId":null,"offerId":3,"offerName":"Pfifferlinge-Menü","state":"DELIVERED","drinkState":"DELIVERED","price":"8.99","comment":""},{"id":4,"modificationCounter":1,"revision":null,"orderId":1,"cookId":null,"offerId":4,"offerName":"Salat-Menü","state":"DELIVERED","drinkState":"DELIVERED","price":"5.99","comment":""}];
          }
        });
    }
});
