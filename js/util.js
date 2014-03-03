
(function(){
  var Zero, bindMethod, unbindMethod, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };


  Zero = {
    binders: {},
    components: {},
    formatters: {},
    adapters: {},
    config: {
      prefix: 'rv',
      templateDelimiters: ['{', '}'],
      rootInterface: '.',
      preloadData: true,
      handler: function(context, ev, binding) {
        return this.call(context, ev, binding.view.models);
      }
    }
  };

  if ('jQuery' in window) {
    _ref = 'on' in jQuery ? ['on', 'off'] : ['bind', 'unbind'], bindMethod = _ref[0], unbindMethod = _ref[1];
    Zero.Util = {
      bindEvent: function(el, event, handler) {
        return jQuery(el)[bindMethod](event, handler);
      },
      unbindEvent: function(el, event, handler) {
        return jQuery(el)[unbindMethod](event, handler);
      },
      getInputValue: function(el) {
        var $el;
        $el = jQuery(el);
        if ($el.attr('type') === 'checkbox') {
          return $el.is(':checked');
        } else {
          return $el.val();
        }
      }
    };
  } else {
    Zero.Util = {
      bindEvent: (function() {
        if ('addEventListener' in window) {
          return function(el, event, handler) {
            return el.addEventListener(event, handler, false);
          };
        }
        return function(el, event, handler) {
          return el.attachEvent('on' + event, handler);
        };
      })(),
      unbindEvent: (function() {
        if ('removeEventListener' in window) {
          return function(el, event, handler) {
            return el.removeEventListener(event, handler, false);
          };
        }
        return function(el, event, handler) {
          return el.detachEvent('on' + event, handler);
        };
      })(),
      getInputValue: function(el) {
        var o, _i, _len, _results;
        if (el.type === 'checkbox') {
          return el.checked;
        } else if (el.type === 'select-multiple') {
          _results = [];
          for (_i = 0, _len = el.length; _i < _len; _i++) {
            o = el[_i];
            if (o.selected) {
              _results.push(o.value);
            }
          }
          return _results;
        } else {
          return el.value;
        }
      }
    };
  }

  Zero.View = (function(){
    console.info('Zero.View!')
    function View(els, models, options) {
      console.info('Zero.View constructor!',els,models,options)
    }

    View.prototype.bindingRegExp = function() {
      console.info('View.prototype.bindingRegExp');
    };

    return View;

  })();

  // Zero.Init = (function(){
  //   var zero = new Zero.Veiw('a','b','c');
  //     conosle.info(333)
  // })();

  Zero.factory = function(exports) {
    exports._ = Zero;
    exports.binders = Zero.binders;
    exports.components = Zero.components;
    exports.formatters = Zero.formatters;
    exports.adapters = Zero.adapters;
    exports.config = Zero.config;
    exports.configure = function(options) {
      var property, value;
      if (options == null) {
        options = {};
      }
      for (property in options) {
        value = options[property];
        Zero.config[property] = value;
      }
    };
    console.info(1111)
    return exports.bind = function(el, models, options) {
      var view;
      if (models == null) {
        models = {};
      }
      if (options == null) {
        options = {};
      }
      console.info(2222)
      view = new Zero.View(el, models, options);
      view.bind();
      return view;
    };
  };

  if (typeof exports === 'object') {
    Zero.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Zero.factory(this.rivets = exports);
      return exports;
    });
  } else {
    Zero.factory(this.rivets = {});
  }

  console.info('11 ',this);
}).call(this);
