define(function(require, exports, module){
    // require('jquery');
    // require('jqueryui');
    // require('underscore');
    // require('rivets');
    // require('backbone');
    var $ = require('jquery');
    var _ = require('underscore');
    var rivets = require('rivets'); 
    var Backbone = require('backbone');
    console.info(1,$('.fb-main'))
    // console.info(2,_)
    // console.info(3,rivets)
    // console.info(4,Backbone)

    var _root = window;

    
    (function(){

      rivets.binders.input = {
        publishes: true,
        routine: rivets.binders.value.routine,
        //TODO here event binding and remove used to be [add/removeEventListener],and target used to be [input],witch now dubble '/' comment !
        bind: function(el) {
      console.info(99,this)
          addEvent(el,"keyup",this.publish);
          //return el.addEventListener('input', this.publish);  
        },
        unbind: function(el) {
          removeEvent(el,"keyup",this.publish);  
          //return el.removeEventListener('input', this.publish);
        }
      };

      rivets.configure({
        prefix: "rv",
        adapter: {
          subscribe: function(obj, keypath, callback) {
            callback.wrapped = function(m, v) {
              return callback(v);
            };
            return obj.on('change:' + keypath, callback.wrapped);
          },
          unsubscribe: function(obj, keypath, callback) {
            return obj.off('change:' + keypath, callback.wrapped);
          },
          read: function(obj, keypath) {
            if (keypath === "cid") {
              return obj.cid;
            }
            return obj.get(keypath);
          },
          publish: function(obj, keypath, value) {
            if (obj.cid) {
              return obj.set(keypath, value);
            } else {
              return obj[keypath] = value;
            }
          }
        }
      });
      console.info(5,this)
    })();
})