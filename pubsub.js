
(function(){
	'use strict';
	
	var pubsub = (function pubsub(){
		var subscribers = {};
		
		function EventObject(){}
		EventObject.prototype = {}
		EventObject.prototype.constructor = EventObject;
		
		function subscribe(event,funcName, callback){
			if(callback == null || callback == undefined){
				callback = funcName;
				funcName = makeid();
			}
			console.log("subscribed",event,funcName,callback);
			if(!subscribers[event]){
				var subscriberArray = [{'id':funcName,'method':callback}];
				subscribers[event] = subscriberArray;
			}else{
				subscribers.push({'id':funcName,'method':callback});
			}
		}
		
		function unsubscribe(event,id){
			if(subscribers[event]){
				subscribers[event] = subscribers[event].filter(function(el){
					return el.id != id;
				});
			}
		}
		
		function publish(event,data){
			var eventObject = new EventObject();
				eventObject.type = event;
				if(data){
					eventObject.data = data;
				}
				
			if(subscribers[event]){
				subscribers[event].forEach(function(callback){
					callback.method(eventObject);
				});
			}
		}
		
		
		function makeid(){
			var text = "";
			var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 5; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}
		
		return { 
			pub:publish,
			sub:subscribe,
			unsub:unsubscribe
			};
		
	}());
	
	pubsub.sub('eventName','myName',function(e){
		console.log("`it works",e);
	});
	//pubsub.unsub('eventName','myName');
	pubsub.pub('eventName',["myData"]);

})();




