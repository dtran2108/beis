/*! tether 1.3.3 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(factory);
  } else if (typeof exports === 'object') {
      module.exports = factory(require, exports, module);
  } else {
      root.Tether = factory();
  }
}(this, function(require, exports, module) {

  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var TetherBase = undefined;
  if (typeof TetherBase === 'undefined') {
      TetherBase = { modules: [] };
  }

  var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
  function getActualBoundingClientRect(node) {
      var boundingRect = node.getBoundingClientRect();

      // The original object returned by getBoundingClientRect is immutable, so we clone it
      // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
      var rect = {};
      for (var k in boundingRect) {
          rect[k] = boundingRect[k];
      }

      if (node.ownerDocument !== document) {
          var _frameElement = node.ownerDocument.defaultView.frameElement;
          if (_frameElement) {
              var frameRect = getActualBoundingClientRect(_frameElement);
              rect.top += frameRect.top;
              rect.bottom += frameRect.top;
              rect.left += frameRect.left;
              rect.right += frameRect.left;
          }
      }

      return rect;
  }

  function getScrollParents(el) {
      // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
      // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      var computedStyle = getComputedStyle(el) || {};
      var position = computedStyle.position;
      var parents = [];

      if (position === 'fixed') {
          return [el];
      }

      var parent = el;
      while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
          var style = undefined;
          try {
              style = getComputedStyle(parent);
          } catch (err) {}

          if (typeof style === 'undefined' || style === null) {
              parents.push(parent);
              return parents;
          }

          var _style = style;
          var overflow = _style.overflow;
          var overflowX = _style.overflowX;
          var overflowY = _style.overflowY;

          if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
              if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
                  parents.push(parent);
              }
          }
      }

      parents.push(el.ownerDocument.body);

      // If the node is within a frame, account for the parent window scroll
      if (el.ownerDocument !== document) {
          parents.push(el.ownerDocument.defaultView);
      }

      return parents;
  }

  var uniqueId = (function () {
      var id = 0;
      return function () {
          return ++id;
      };
  })();

  var zeroPosCache = {};
  var getOrigin = function getOrigin() {
      // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
      // jitter as the user scrolls that messes with our ability to detect if two positions
      // are equivilant or not.  We place an element at the top left of the page that will
      // get the same jitter, so we can cancel the two out.
      var node = zeroElement;
      if (!node) {
          node = document.createElement('div');
          node.setAttribute('data-tether-id', uniqueId());
          extend(node.style, {
              top: 0,
              left: 0,
              position: 'absolute'
          });

          document.body.appendChild(node);

          zeroElement = node;
      }

      var id = node.getAttribute('data-tether-id');
      if (typeof zeroPosCache[id] === 'undefined') {
          zeroPosCache[id] = getActualBoundingClientRect(node);

          // Clear the cache when this position call is done
          defer(function () {
              delete zeroPosCache[id];
          });
      }

      return zeroPosCache[id];
  };

  function removeUtilElements() {
      if (zeroElement) {
          document.body.removeChild(zeroElement);
      }
      zeroElement = null;
  };

  function getBounds(el) {
      var doc = undefined;
      if (el === document) {
          doc = document;
          el = document.documentElement;
      } else {
          doc = el.ownerDocument;
      }

      var docEl = doc.documentElement;

      var box = getActualBoundingClientRect(el);

      var origin = getOrigin();

      box.top -= origin.top;
      box.left -= origin.left;

      if (typeof box.width === 'undefined') {
          box.width = document.body.scrollWidth - box.left - box.right;
      }
      if (typeof box.height === 'undefined') {
          box.height = document.body.scrollHeight - box.top - box.bottom;
      }

      box.top = box.top - docEl.clientTop;
      box.left = box.left - docEl.clientLeft;
      box.right = doc.body.clientWidth - box.width - box.left;
      box.bottom = doc.body.clientHeight - box.height - box.top;

      return box;
  }

  function getOffsetParent(el) {
      return el.offsetParent || document.documentElement;
  }

  function getScrollBarSize() {
      var inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '200px';

      var outer = document.createElement('div');
      extend(outer.style, {
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          visibility: 'hidden',
          width: '200px',
          height: '150px',
          overflow: 'hidden'
      });

      outer.appendChild(inner);

      document.body.appendChild(outer);

      var widthContained = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var widthScroll = inner.offsetWidth;

      if (widthContained === widthScroll) {
          widthScroll = outer.clientWidth;
      }

      document.body.removeChild(outer);

      var width = widthContained - widthScroll;

      return { width: width, height: width };
  }

  function extend() {
      var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var args = [];

      Array.prototype.push.apply(args, arguments);

      args.slice(1).forEach(function (obj) {
          if (obj) {
              for (var key in obj) {
                  if (({}).hasOwnProperty.call(obj, key)) {
                      out[key] = obj[key];
                  }
              }
          }
      });

      return out;
  }

  function removeClass(el, name) {
      if (typeof el.classList !== 'undefined') {
          name.split(' ').forEach(function (cls) {
              if (cls.trim()) {
                  el.classList.remove(cls);
              }
          });
      } else {
          var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
          var className = getClassName(el).replace(regex, ' ');
          setClassName(el, className);
      }
  }

  function addClass(el, name) {
      if (typeof el.classList !== 'undefined') {
          name.split(' ').forEach(function (cls) {
              if (cls.trim()) {
                  el.classList.add(cls);
              }
          });
      } else {
          removeClass(el, name);
          var cls = getClassName(el) + (' ' + name);
          setClassName(el, cls);
      }
  }

  function hasClass(el, name) {
      if (typeof el.classList !== 'undefined') {
          return el.classList.contains(name);
      }
      var className = getClassName(el);
      return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
  }

  function getClassName(el) {
      // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
      // completely separately SVGAnimatedString base classes
      if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
          return el.className.baseVal;
      }
      return el.className;
  }

  function setClassName(el, className) {
      el.setAttribute('class', className);
  }

  function updateClasses(el, add, all) {
      // Of the set of 'all' classes, we need the 'add' classes, and only the
      // 'add' classes to be set.
      all.forEach(function (cls) {
          if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
              removeClass(el, cls);
          }
      });

      add.forEach(function (cls) {
          if (!hasClass(el, cls)) {
              addClass(el, cls);
          }
      });
  }

  var deferred = [];

  var defer = function defer(fn) {
      deferred.push(fn);
  };

  var flush = function flush() {
      var fn = undefined;
      while (fn = deferred.pop()) {
          fn();
      }
  };

  var Evented = (function () {
      function Evented() {
          _classCallCheck(this, Evented);
      }

      _createClass(Evented, [{
          key: 'on',
          value: function on(event, handler, ctx) {
              var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

              if (typeof this.bindings === 'undefined') {
                  this.bindings = {};
              }
              if (typeof this.bindings[event] === 'undefined') {
                  this.bindings[event] = [];
              }
              this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
          }
      }, {
          key: 'once',
          value: function once(event, handler, ctx) {
              this.on(event, handler, ctx, true);
          }
      }, {
          key: 'off',
          value: function off(event, handler) {
              if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
                  return;
              }

              if (typeof handler === 'undefined') {
                  delete this.bindings[event];
              } else {
                  var i = 0;
                  while (i < this.bindings[event].length) {
                      if (this.bindings[event][i].handler === handler) {
                          this.bindings[event].splice(i, 1);
                      } else {
                          ++i;
                      }
                  }
              }
          }
      }, {
          key: 'trigger',
          value: function trigger(event) {
              if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
                  var i = 0;

                  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      args[_key - 1] = arguments[_key];
                  }

                  while (i < this.bindings[event].length) {
                      var _bindings$event$i = this.bindings[event][i];
                      var handler = _bindings$event$i.handler;
                      var ctx = _bindings$event$i.ctx;
                      var once = _bindings$event$i.once;

                      var context = ctx;
                      if (typeof context === 'undefined') {
                          context = this;
                      }

                      handler.apply(context, args);

                      if (once) {
                          this.bindings[event].splice(i, 1);
                      } else {
                          ++i;
                      }
                  }
              }
          }
      }]);

      return Evented;
  })();

  TetherBase.Utils = {
      getActualBoundingClientRect: getActualBoundingClientRect,
      getScrollParents: getScrollParents,
      getBounds: getBounds,
      getOffsetParent: getOffsetParent,
      extend: extend,
      addClass: addClass,
      removeClass: removeClass,
      hasClass: hasClass,
      updateClasses: updateClasses,
      defer: defer,
      flush: flush,
      uniqueId: uniqueId,
      Evented: Evented,
      getScrollBarSize: getScrollBarSize,
      removeUtilElements: removeUtilElements
  };
  /* globals TetherBase, performance */

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  if (typeof TetherBase === 'undefined') {
      throw new Error('You must include the utils.js file before tether.js');
  }

  var _TetherBase$Utils = TetherBase.Utils;
  var getScrollParents = _TetherBase$Utils.getScrollParents;
  var getBounds = _TetherBase$Utils.getBounds;
  var getOffsetParent = _TetherBase$Utils.getOffsetParent;
  var extend = _TetherBase$Utils.extend;
  var addClass = _TetherBase$Utils.addClass;
  var removeClass = _TetherBase$Utils.removeClass;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;
  var flush = _TetherBase$Utils.flush;
  var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
  var removeUtilElements = _TetherBase$Utils.removeUtilElements;

  function within(a, b) {
      var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

      return a + diff >= b && b >= a - diff;
  }

  var transformKey = (function () {
      if (typeof document === 'undefined') {
          return '';
      }
      var el = document.createElement('div');

      var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
      for (var i = 0; i < transforms.length; ++i) {
          var key = transforms[i];
          if (el.style[key] !== undefined) {
              return key;
          }
      }
  })();

  var tethers = [];

  var position = function position() {
      tethers.forEach(function (tether) {
          tether.position(false);
      });
      flush();
  };

  function now() {
      if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
          return performance.now();
      }
      return +new Date();
  }

  (function () {
      var lastCall = null;
      var lastDuration = null;
      var pendingTimeout = null;

      var tick = function tick() {
          if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
              // We voluntarily throttle ourselves if we can't manage 60fps
              lastDuration = Math.min(lastDuration - 16, 250);

              // Just in case this is the last event, remember to position just once more
              pendingTimeout = setTimeout(tick, 250);
              return;
          }

          if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
              // Some browsers call events a little too frequently, refuse to run more than is reasonable
              return;
          }

          if (pendingTimeout != null) {
              clearTimeout(pendingTimeout);
              pendingTimeout = null;
          }

          lastCall = now();
          position();
          lastDuration = now() - lastCall;
      };

      if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
          ['resize', 'scroll', 'touchmove'].forEach(function (event) {
              window.addEventListener(event, tick);
          });
      }
  })();

  var MIRROR_LR = {
      center: 'center',
      left: 'right',
      right: 'left'
  };

  var MIRROR_TB = {
      middle: 'middle',
      top: 'bottom',
      bottom: 'top'
  };

  var OFFSET_MAP = {
      top: 0,
      left: 0,
      middle: '50%',
      center: '50%',
      bottom: '100%',
      right: '100%'
  };

  var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
      var left = attachment.left;
      var top = attachment.top;

      if (left === 'auto') {
          left = MIRROR_LR[relativeToAttachment.left];
      }

      if (top === 'auto') {
          top = MIRROR_TB[relativeToAttachment.top];
      }

      return { left: left, top: top };
  };

  var attachmentToOffset = function attachmentToOffset(attachment) {
      var left = attachment.left;
      var top = attachment.top;

      if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
          left = OFFSET_MAP[attachment.left];
      }

      if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
          top = OFFSET_MAP[attachment.top];
      }

      return { left: left, top: top };
  };

  function addOffset() {
      var out = { top: 0, left: 0 };

      for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
          offsets[_key] = arguments[_key];
      }

      offsets.forEach(function (_ref) {
          var top = _ref.top;
          var left = _ref.left;

          if (typeof top === 'string') {
              top = parseFloat(top, 10);
          }
          if (typeof left === 'string') {
              left = parseFloat(left, 10);
          }

          out.top += top;
          out.left += left;
      });

      return out;
  }

  function offsetToPx(offset, size) {
      if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
          offset.left = parseFloat(offset.left, 10) / 100 * size.width;
      }
      if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
          offset.top = parseFloat(offset.top, 10) / 100 * size.height;
      }

      return offset;
  }

  var parseOffset = function parseOffset(value) {
      var _value$split = value.split(' ');

      var _value$split2 = _slicedToArray(_value$split, 2);

      var top = _value$split2[0];
      var left = _value$split2[1];

      return { top: top, left: left };
  };
  var parseAttachment = parseOffset;

  var TetherClass = (function (_Evented) {
      _inherits(TetherClass, _Evented);

      function TetherClass(options) {
          var _this = this;

          _classCallCheck(this, TetherClass);

          _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
          this.position = this.position.bind(this);

          tethers.push(this);

          this.history = [];

          this.setOptions(options, false);

          TetherBase.modules.forEach(function (module) {
              if (typeof module.initialize !== 'undefined') {
                  module.initialize.call(_this);
              }
          });

          this.position();
      }

      _createClass(TetherClass, [{
          key: 'getClass',
          value: function getClass() {
              var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
              var classes = this.options.classes;

              if (typeof classes !== 'undefined' && classes[key]) {
                  return this.options.classes[key];
              } else if (this.options.classPrefix) {
                  return this.options.classPrefix + '-' + key;
              } else {
                  return key;
              }
          }
      }, {
          key: 'setOptions',
          value: function setOptions(options) {
              var _this2 = this;

              var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

              var defaults = {
                  offset: '0 0',
                  targetOffset: '0 0',
                  targetAttachment: 'auto auto',
                  classPrefix: 'tether'
              };

              this.options = extend(defaults, options);

              var _options = this.options;
              var element = _options.element;
              var target = _options.target;
              var targetModifier = _options.targetModifier;

              this.element = element;
              this.target = target;
              this.targetModifier = targetModifier;

              if (this.target === 'viewport') {
                  this.target = document.body;
                  this.targetModifier = 'visible';
              } else if (this.target === 'scroll-handle') {
                  this.target = document.body;
                  this.targetModifier = 'scroll-handle';
              }

              ['element', 'target'].forEach(function (key) {
                  if (typeof _this2[key] === 'undefined') {
                      throw new Error('Tether Error: Both element and target must be defined');
                  }

                  if (typeof _this2[key].jquery !== 'undefined') {
                      _this2[key] = _this2[key][0];
                  } else if (typeof _this2[key] === 'string') {
                      _this2[key] = document.querySelector(_this2[key]);
                  }
              });

              addClass(this.element, this.getClass('element'));
              if (!(this.options.addTargetClasses === false)) {
                  addClass(this.target, this.getClass('target'));
              }

              if (!this.options.attachment) {
                  throw new Error('Tether Error: You must provide an attachment');
              }

              this.targetAttachment = parseAttachment(this.options.targetAttachment);
              this.attachment = parseAttachment(this.options.attachment);
              this.offset = parseOffset(this.options.offset);
              this.targetOffset = parseOffset(this.options.targetOffset);

              if (typeof this.scrollParents !== 'undefined') {
                  this.disable();
              }

              if (this.targetModifier === 'scroll-handle') {
                  this.scrollParents = [this.target];
              } else {
                  this.scrollParents = getScrollParents(this.target);
              }

              if (!(this.options.enabled === false)) {
                  this.enable(pos);
              }
          }
      }, {
          key: 'getTargetBounds',
          value: function getTargetBounds() {
              if (typeof this.targetModifier !== 'undefined') {
                  if (this.targetModifier === 'visible') {
                      if (this.target === document.body) {
                          return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
                      } else {
                          var bounds = getBounds(this.target);

                          var out = {
                              height: bounds.height,
                              width: bounds.width,
                              top: bounds.top,
                              left: bounds.left
                          };

                          out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
                          out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
                          out.height = Math.min(innerHeight, out.height);
                          out.height -= 2;

                          out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
                          out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
                          out.width = Math.min(innerWidth, out.width);
                          out.width -= 2;

                          if (out.top < pageYOffset) {
                              out.top = pageYOffset;
                          }
                          if (out.left < pageXOffset) {
                              out.left = pageXOffset;
                          }

                          return out;
                      }
                  } else if (this.targetModifier === 'scroll-handle') {
                      var bounds = undefined;
                      var target = this.target;
                      if (target === document.body) {
                          target = document.documentElement;

                          bounds = {
                              left: pageXOffset,
                              top: pageYOffset,
                              height: innerHeight,
                              width: innerWidth
                          };
                      } else {
                          bounds = getBounds(target);
                      }

                      var style = getComputedStyle(target);

                      var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

                      var scrollBottom = 0;
                      if (hasBottomScroll) {
                          scrollBottom = 15;
                      }

                      var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

                      var out = {
                          width: 15,
                          height: height * 0.975 * (height / target.scrollHeight),
                          left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
                      };

                      var fitAdj = 0;
                      if (height < 408 && this.target === document.body) {
                          fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
                      }

                      if (this.target !== document.body) {
                          out.height = Math.max(out.height, 24);
                      }

                      var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
                      out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

                      if (this.target === document.body) {
                          out.height = Math.max(out.height, 24);
                      }

                      return out;
                  }
              } else {
                  return getBounds(this.target);
              }
          }
      }, {
          key: 'clearCache',
          value: function clearCache() {
              this._cache = {};
          }
      }, {
          key: 'cache',
          value: function cache(k, getter) {
              // More than one module will often need the same DOM info, so
              // we keep a cache which is cleared on each position call
              if (typeof this._cache === 'undefined') {
                  this._cache = {};
              }

              if (typeof this._cache[k] === 'undefined') {
                  this._cache[k] = getter.call(this);
              }

              return this._cache[k];
          }
      }, {
          key: 'enable',
          value: function enable() {
              var _this3 = this;

              var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

              if (!(this.options.addTargetClasses === false)) {
                  addClass(this.target, this.getClass('enabled'));
              }
              addClass(this.element, this.getClass('enabled'));
              this.enabled = true;

              this.scrollParents.forEach(function (parent) {
                  if (parent !== _this3.target.ownerDocument) {
                      parent.addEventListener('scroll', _this3.position);
                  }
              });

              if (pos) {
                  this.position();
              }
          }
      }, {
          key: 'disable',
          value: function disable() {
              var _this4 = this;

              removeClass(this.target, this.getClass('enabled'));
              removeClass(this.element, this.getClass('enabled'));
              this.enabled = false;

              if (typeof this.scrollParents !== 'undefined') {
                  this.scrollParents.forEach(function (parent) {
                      parent.removeEventListener('scroll', _this4.position);
                  });
              }
          }
      }, {
          key: 'destroy',
          value: function destroy() {
              var _this5 = this;

              this.disable();

              tethers.forEach(function (tether, i) {
                  if (tether === _this5) {
                      tethers.splice(i, 1);
                  }
              });

              // Remove any elements we were using for convenience from the DOM
              if (tethers.length === 0) {
                  removeUtilElements();
              }
          }
      }, {
          key: 'updateAttachClasses',
          value: function updateAttachClasses(elementAttach, targetAttach) {
              var _this6 = this;

              elementAttach = elementAttach || this.attachment;
              targetAttach = targetAttach || this.targetAttachment;
              var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

              if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
                  // updateAttachClasses can be called more than once in a position call, so
                  // we need to clean up after ourselves such that when the last defer gets
                  // ran it doesn't add any extra classes from previous calls.
                  this._addAttachClasses.splice(0, this._addAttachClasses.length);
              }

              if (typeof this._addAttachClasses === 'undefined') {
                  this._addAttachClasses = [];
              }
              var add = this._addAttachClasses;

              if (elementAttach.top) {
                  add.push(this.getClass('element-attached') + '-' + elementAttach.top);
              }
              if (elementAttach.left) {
                  add.push(this.getClass('element-attached') + '-' + elementAttach.left);
              }
              if (targetAttach.top) {
                  add.push(this.getClass('target-attached') + '-' + targetAttach.top);
              }
              if (targetAttach.left) {
                  add.push(this.getClass('target-attached') + '-' + targetAttach.left);
              }

              var all = [];
              sides.forEach(function (side) {
                  all.push(_this6.getClass('element-attached') + '-' + side);
                  all.push(_this6.getClass('target-attached') + '-' + side);
              });

              defer(function () {
                  if (!(typeof _this6._addAttachClasses !== 'undefined')) {
                      return;
                  }

                  updateClasses(_this6.element, _this6._addAttachClasses, all);
                  if (!(_this6.options.addTargetClasses === false)) {
                      updateClasses(_this6.target, _this6._addAttachClasses, all);
                  }

                  delete _this6._addAttachClasses;
              });
          }
      }, {
          key: 'position',
          value: function position() {
              var _this7 = this;

              var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

              // flushChanges commits the changes immediately, leave true unless you are positioning multiple
              // tethers (in which case call Tether.Utils.flush yourself when you're done)

              if (!this.enabled) {
                  return;
              }

              this.clearCache();

              // Turn 'auto' attachments into the appropriate corner or edge
              var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

              this.updateAttachClasses(this.attachment, targetAttachment);

              var elementPos = this.cache('element-bounds', function () {
                  return getBounds(_this7.element);
              });

              var width = elementPos.width;
              var height = elementPos.height;

              if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
                  var _lastSize = this.lastSize;

                  // We cache the height and width to make it possible to position elements that are
                  // getting hidden.
                  width = _lastSize.width;
                  height = _lastSize.height;
              } else {
                  this.lastSize = { width: width, height: height };
              }

              var targetPos = this.cache('target-bounds', function () {
                  return _this7.getTargetBounds();
              });
              var targetSize = targetPos;

              // Get an actual px offset from the attachment
              var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
              var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

              var manualOffset = offsetToPx(this.offset, { width: width, height: height });
              var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

              // Add the manually provided offset
              offset = addOffset(offset, manualOffset);
              targetOffset = addOffset(targetOffset, manualTargetOffset);

              // It's now our goal to make (element position + offset) == (target position + target offset)
              var left = targetPos.left + targetOffset.left - offset.left;
              var top = targetPos.top + targetOffset.top - offset.top;

              for (var i = 0; i < TetherBase.modules.length; ++i) {
                  var _module2 = TetherBase.modules[i];
                  var ret = _module2.position.call(this, {
                      left: left,
                      top: top,
                      targetAttachment: targetAttachment,
                      targetPos: targetPos,
                      elementPos: elementPos,
                      offset: offset,
                      targetOffset: targetOffset,
                      manualOffset: manualOffset,
                      manualTargetOffset: manualTargetOffset,
                      scrollbarSize: scrollbarSize,
                      attachment: this.attachment
                  });

                  if (ret === false) {
                      return false;
                  } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
                      continue;
                  } else {
                      top = ret.top;
                      left = ret.left;
                  }
              }

              // We describe the position three different ways to give the optimizer
              // a chance to decide the best possible way to position the element
              // with the fewest repaints.
              var next = {
                  // It's position relative to the page (absolute positioning when
                  // the element is a child of the body)
                  page: {
                      top: top,
                      left: left
                  },

                  // It's position relative to the viewport (fixed positioning)
                  viewport: {
                      top: top - pageYOffset,
                      bottom: pageYOffset - top - height + innerHeight,
                      left: left - pageXOffset,
                      right: pageXOffset - left - width + innerWidth
                  }
              };

              var doc = this.target.ownerDocument;
              var win = doc.defaultView;

              var scrollbarSize = undefined;
              if (doc.body.scrollWidth > win.innerWidth) {
                  scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
                  next.viewport.bottom -= scrollbarSize.height;
              }

              if (doc.body.scrollHeight > win.innerHeight) {
                  scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
                  next.viewport.right -= scrollbarSize.width;
              }

              if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
                  // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
                  next.page.bottom = doc.body.scrollHeight - top - height;
                  next.page.right = doc.body.scrollWidth - left - width;
              }

              if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
                  (function () {
                      var offsetParent = _this7.cache('target-offsetparent', function () {
                          return getOffsetParent(_this7.target);
                      });
                      var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
                          return getBounds(offsetParent);
                      });
                      var offsetParentStyle = getComputedStyle(offsetParent);
                      var offsetParentSize = offsetPosition;

                      var offsetBorder = {};
                      ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
                          offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
                      });

                      offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
                      offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

                      if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
                          if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
                              // We're within the visible part of the target's scroll parent
                              var scrollTop = offsetParent.scrollTop;
                              var scrollLeft = offsetParent.scrollLeft;

                              // It's position relative to the target's offset parent (absolute positioning when
                              // the element is moved to be a child of the target's offset parent).
                              next.offset = {
                                  top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                                  left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
                              };
                          }
                      }
                  })();
              }

              // We could also travel up the DOM and try each containing context, rather than only
              // looking at the body, but we're gonna get diminishing returns.

              this.move(next);

              this.history.unshift(next);

              if (this.history.length > 3) {
                  this.history.pop();
              }

              if (flushChanges) {
                  flush();
              }

              return true;
          }

          // THE ISSUE
      }, {
          key: 'move',
          value: function move(pos) {
              var _this8 = this;

              if (!(typeof this.element.parentNode !== 'undefined')) {
                  return;
              }

              var same = {};

              for (var type in pos) {
                  same[type] = {};

                  for (var key in pos[type]) {
                      var found = false;

                      for (var i = 0; i < this.history.length; ++i) {
                          var point = this.history[i];
                          if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
                              found = true;
                              break;
                          }
                      }

                      if (!found) {
                          same[type][key] = true;
                      }
                  }
              }

              var css = { top: '', left: '', right: '', bottom: '' };

              var transcribe = function transcribe(_same, _pos) {
                  var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
                  var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
                  if (gpu !== false) {
                      var yPos = undefined,
                          xPos = undefined;
                      if (_same.top) {
                          css.top = 0;
                          yPos = _pos.top;
                      } else {
                          css.bottom = 0;
                          yPos = -_pos.bottom;
                      }

                      if (_same.left) {
                          css.left = 0;
                          xPos = _pos.left;
                      } else {
                          css.right = 0;
                          xPos = -_pos.right;
                      }

                      css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

                      if (transformKey !== 'msTransform') {
                          // The Z transform will keep this in the GPU (faster, and prevents artifacts),
                          // but IE9 doesn't support 3d transforms and will choke.
                          css[transformKey] += " translateZ(0)";
                      }
                  } else {
                      if (_same.top) {
                          css.top = _pos.top + 'px';
                      } else {
                          css.bottom = _pos.bottom + 'px';
                      }

                      if (_same.left) {
                          css.left = _pos.left + 'px';
                      } else {
                          css.right = _pos.right + 'px';
                      }
                  }
              };

              var moved = false;
              if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
                  css.position = 'absolute';
                  transcribe(same.page, pos.page);
              } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
                  css.position = 'fixed';
                  transcribe(same.viewport, pos.viewport);
              } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
                  (function () {
                      css.position = 'absolute';
                      var offsetParent = _this8.cache('target-offsetparent', function () {
                          return getOffsetParent(_this8.target);
                      });

                      if (getOffsetParent(_this8.element) !== offsetParent) {
                          defer(function () {
                              _this8.element.parentNode.removeChild(_this8.element);
                              offsetParent.appendChild(_this8.element);
                          });
                      }

                      transcribe(same.offset, pos.offset);
                      moved = true;
                  })();
              } else {
                  css.position = 'absolute';
                  transcribe({ top: true, left: true }, pos.page);
              }

              if (!moved) {
                  var offsetParentIsBody = true;
                  var currentNode = this.element.parentNode;
                  while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
                      if (getComputedStyle(currentNode).position !== 'static') {
                          offsetParentIsBody = false;
                          break;
                      }

                      currentNode = currentNode.parentNode;
                  }

                  if (!offsetParentIsBody) {
                      this.element.parentNode.removeChild(this.element);
                      this.element.ownerDocument.body.appendChild(this.element);
                  }
              }

              // Any css change will trigger a repaint, so let's avoid one if nothing changed
              var writeCSS = {};
              var write = false;
              for (var key in css) {
                  var val = css[key];
                  var elVal = this.element.style[key];

                  if (elVal !== val) {
                      write = true;
                      writeCSS[key] = val;
                  }
              }

              if (write) {
                  defer(function () {
                      extend(_this8.element.style, writeCSS);
                  });
              }
          }
      }]);

      return TetherClass;
  })(Evented);

  TetherClass.modules = [];

  TetherBase.position = position;

  var Tether = extend(TetherClass, TetherBase);
  /* globals TetherBase */

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var _TetherBase$Utils = TetherBase.Utils;
  var getBounds = _TetherBase$Utils.getBounds;
  var extend = _TetherBase$Utils.extend;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;

  var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

  function getBoundingRect(tether, to) {
      if (to === 'scrollParent') {
          to = tether.scrollParents[0];
      } else if (to === 'window') {
          to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
      }

      if (to === document) {
          to = to.documentElement;
      }

      if (typeof to.nodeType !== 'undefined') {
          (function () {
              var node = to;
              var size = getBounds(to);
              var pos = size;
              var style = getComputedStyle(to);

              to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

              // Account any parent Frames scroll offset
              if (node.ownerDocument !== document) {
                  var win = node.ownerDocument.defaultView;
                  to[0] += win.pageXOffset;
                  to[1] += win.pageYOffset;
                  to[2] += win.pageXOffset;
                  to[3] += win.pageYOffset;
              }

              BOUNDS_FORMAT.forEach(function (side, i) {
                  side = side[0].toUpperCase() + side.substr(1);
                  if (side === 'Top' || side === 'Left') {
                      to[i] += parseFloat(style['border' + side + 'Width']);
                  } else {
                      to[i] -= parseFloat(style['border' + side + 'Width']);
                  }
              });
          })();
      }

      return to;
  }

  TetherBase.modules.push({
      position: function position(_ref) {
          var _this = this;

          var top = _ref.top;
          var left = _ref.left;
          var targetAttachment = _ref.targetAttachment;

          if (!this.options.constraints) {
              return true;
          }

          var _cache = this.cache('element-bounds', function () {
              return getBounds(_this.element);
          });

          var height = _cache.height;
          var width = _cache.width;

          if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
              var _lastSize = this.lastSize;

              // Handle the item getting hidden as a result of our positioning without glitching
              // the classes in and out
              width = _lastSize.width;
              height = _lastSize.height;
          }

          var targetSize = this.cache('target-bounds', function () {
              return _this.getTargetBounds();
          });

          var targetHeight = targetSize.height;
          var targetWidth = targetSize.width;

          var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

          this.options.constraints.forEach(function (constraint) {
              var outOfBoundsClass = constraint.outOfBoundsClass;
              var pinnedClass = constraint.pinnedClass;

              if (outOfBoundsClass) {
                  allClasses.push(outOfBoundsClass);
              }
              if (pinnedClass) {
                  allClasses.push(pinnedClass);
              }
          });

          allClasses.forEach(function (cls) {
              ['left', 'top', 'right', 'bottom'].forEach(function (side) {
                  allClasses.push(cls + '-' + side);
              });
          });

          var addClasses = [];

          var tAttachment = extend({}, targetAttachment);
          var eAttachment = extend({}, this.attachment);

          this.options.constraints.forEach(function (constraint) {
              var to = constraint.to;
              var attachment = constraint.attachment;
              var pin = constraint.pin;

              if (typeof attachment === 'undefined') {
                  attachment = '';
              }

              var changeAttachX = undefined,
                  changeAttachY = undefined;
              if (attachment.indexOf(' ') >= 0) {
                  var _attachment$split = attachment.split(' ');

                  var _attachment$split2 = _slicedToArray(_attachment$split, 2);

                  changeAttachY = _attachment$split2[0];
                  changeAttachX = _attachment$split2[1];
              } else {
                  changeAttachX = changeAttachY = attachment;
              }

              var bounds = getBoundingRect(_this, to);

              if (changeAttachY === 'target' || changeAttachY === 'both') {
                  if (top < bounds[1] && tAttachment.top === 'top') {
                      top += targetHeight;
                      tAttachment.top = 'bottom';
                  }

                  if (top + height > bounds[3] && tAttachment.top === 'bottom') {
                      top -= targetHeight;
                      tAttachment.top = 'top';
                  }
              }

              if (changeAttachY === 'together') {
                  if (tAttachment.top === 'top') {
                      if (eAttachment.top === 'bottom' && top < bounds[1]) {
                          top += targetHeight;
                          tAttachment.top = 'bottom';

                          top += height;
                          eAttachment.top = 'top';
                      } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
                          top -= height - targetHeight;
                          tAttachment.top = 'bottom';

                          eAttachment.top = 'bottom';
                      }
                  }

                  if (tAttachment.top === 'bottom') {
                      if (eAttachment.top === 'top' && top + height > bounds[3]) {
                          top -= targetHeight;
                          tAttachment.top = 'top';

                          top -= height;
                          eAttachment.top = 'bottom';
                      } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
                          top += height - targetHeight;
                          tAttachment.top = 'top';

                          eAttachment.top = 'top';
                      }
                  }

                  if (tAttachment.top === 'middle') {
                      if (top + height > bounds[3] && eAttachment.top === 'top') {
                          top -= height;
                          eAttachment.top = 'bottom';
                      } else if (top < bounds[1] && eAttachment.top === 'bottom') {
                          top += height;
                          eAttachment.top = 'top';
                      }
                  }
              }

              if (changeAttachX === 'target' || changeAttachX === 'both') {
                  if (left < bounds[0] && tAttachment.left === 'left') {
                      left += targetWidth;
                      tAttachment.left = 'right';
                  }

                  if (left + width > bounds[2] && tAttachment.left === 'right') {
                      left -= targetWidth;
                      tAttachment.left = 'left';
                  }
              }

              if (changeAttachX === 'together') {
                  if (left < bounds[0] && tAttachment.left === 'left') {
                      if (eAttachment.left === 'right') {
                          left += targetWidth;
                          tAttachment.left = 'right';

                          left += width;
                          eAttachment.left = 'left';
                      } else if (eAttachment.left === 'left') {
                          left += targetWidth;
                          tAttachment.left = 'right';

                          left -= width;
                          eAttachment.left = 'right';
                      }
                  } else if (left + width > bounds[2] && tAttachment.left === 'right') {
                      if (eAttachment.left === 'left') {
                          left -= targetWidth;
                          tAttachment.left = 'left';

                          left -= width;
                          eAttachment.left = 'right';
                      } else if (eAttachment.left === 'right') {
                          left -= targetWidth;
                          tAttachment.left = 'left';

                          left += width;
                          eAttachment.left = 'left';
                      }
                  } else if (tAttachment.left === 'center') {
                      if (left + width > bounds[2] && eAttachment.left === 'left') {
                          left -= width;
                          eAttachment.left = 'right';
                      } else if (left < bounds[0] && eAttachment.left === 'right') {
                          left += width;
                          eAttachment.left = 'left';
                      }
                  }
              }

              if (changeAttachY === 'element' || changeAttachY === 'both') {
                  if (top < bounds[1] && eAttachment.top === 'bottom') {
                      top += height;
                      eAttachment.top = 'top';
                  }

                  if (top + height > bounds[3] && eAttachment.top === 'top') {
                      top -= height;
                      eAttachment.top = 'bottom';
                  }
              }

              if (changeAttachX === 'element' || changeAttachX === 'both') {
                  if (left < bounds[0]) {
                      if (eAttachment.left === 'right') {
                          left += width;
                          eAttachment.left = 'left';
                      } else if (eAttachment.left === 'center') {
                          left += width / 2;
                          eAttachment.left = 'left';
                      }
                  }

                  if (left + width > bounds[2]) {
                      if (eAttachment.left === 'left') {
                          left -= width;
                          eAttachment.left = 'right';
                      } else if (eAttachment.left === 'center') {
                          left -= width / 2;
                          eAttachment.left = 'right';
                      }
                  }
              }

              if (typeof pin === 'string') {
                  pin = pin.split(',').map(function (p) {
                      return p.trim();
                  });
              } else if (pin === true) {
                  pin = ['top', 'left', 'right', 'bottom'];
              }

              pin = pin || [];

              var pinned = [];
              var oob = [];

              if (top < bounds[1]) {
                  if (pin.indexOf('top') >= 0) {
                      top = bounds[1];
                      pinned.push('top');
                  } else {
                      oob.push('top');
                  }
              }

              if (top + height > bounds[3]) {
                  if (pin.indexOf('bottom') >= 0) {
                      top = bounds[3] - height;
                      pinned.push('bottom');
                  } else {
                      oob.push('bottom');
                  }
              }

              if (left < bounds[0]) {
                  if (pin.indexOf('left') >= 0) {
                      left = bounds[0];
                      pinned.push('left');
                  } else {
                      oob.push('left');
                  }
              }

              if (left + width > bounds[2]) {
                  if (pin.indexOf('right') >= 0) {
                      left = bounds[2] - width;
                      pinned.push('right');
                  } else {
                      oob.push('right');
                  }
              }

              if (pinned.length) {
                  (function () {
                      var pinnedClass = undefined;
                      if (typeof _this.options.pinnedClass !== 'undefined') {
                          pinnedClass = _this.options.pinnedClass;
                      } else {
                          pinnedClass = _this.getClass('pinned');
                      }

                      addClasses.push(pinnedClass);
                      pinned.forEach(function (side) {
                          addClasses.push(pinnedClass + '-' + side);
                      });
                  })();
              }

              if (oob.length) {
                  (function () {
                      var oobClass = undefined;
                      if (typeof _this.options.outOfBoundsClass !== 'undefined') {
                          oobClass = _this.options.outOfBoundsClass;
                      } else {
                          oobClass = _this.getClass('out-of-bounds');
                      }

                      addClasses.push(oobClass);
                      oob.forEach(function (side) {
                          addClasses.push(oobClass + '-' + side);
                      });
                  })();
              }

              if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
                  eAttachment.left = tAttachment.left = false;
              }
              if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
                  eAttachment.top = tAttachment.top = false;
              }

              if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
                  _this.updateAttachClasses(eAttachment, tAttachment);
                  _this.trigger('update', {
                      attachment: eAttachment,
                      targetAttachment: tAttachment
                  });
              }
          });

          defer(function () {
              if (!(_this.options.addTargetClasses === false)) {
                  updateClasses(_this.target, addClasses, allClasses);
              }
              updateClasses(_this.element, addClasses, allClasses);
          });

          return { top: top, left: left };
      }
  });
  /* globals TetherBase */

  'use strict';

  var _TetherBase$Utils = TetherBase.Utils;
  var getBounds = _TetherBase$Utils.getBounds;
  var updateClasses = _TetherBase$Utils.updateClasses;
  var defer = _TetherBase$Utils.defer;

  TetherBase.modules.push({
      position: function position(_ref) {
          var _this = this;

          var top = _ref.top;
          var left = _ref.left;

          var _cache = this.cache('element-bounds', function () {
              return getBounds(_this.element);
          });

          var height = _cache.height;
          var width = _cache.width;

          var targetPos = this.getTargetBounds();

          var bottom = top + height;
          var right = left + width;

          var abutted = [];
          if (top <= targetPos.bottom && bottom >= targetPos.top) {
              ['left', 'right'].forEach(function (side) {
                  var targetPosSide = targetPos[side];
                  if (targetPosSide === left || targetPosSide === right) {
                      abutted.push(side);
                  }
              });
          }

          if (left <= targetPos.right && right >= targetPos.left) {
              ['top', 'bottom'].forEach(function (side) {
                  var targetPosSide = targetPos[side];
                  if (targetPosSide === top || targetPosSide === bottom) {
                      abutted.push(side);
                  }
              });
          }

          var allClasses = [];
          var addClasses = [];

          var sides = ['left', 'top', 'right', 'bottom'];
          allClasses.push(this.getClass('abutted'));
          sides.forEach(function (side) {
              allClasses.push(_this.getClass('abutted') + '-' + side);
          });

          if (abutted.length) {
              addClasses.push(this.getClass('abutted'));
          }

          abutted.forEach(function (side) {
              addClasses.push(_this.getClass('abutted') + '-' + side);
          });

          defer(function () {
              if (!(_this.options.addTargetClasses === false)) {
                  updateClasses(_this.target, addClasses, allClasses);
              }
              updateClasses(_this.element, addClasses, allClasses);
          });

          return true;
      }
  });
  /* globals TetherBase */

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  TetherBase.modules.push({
      position: function position(_ref) {
          var top = _ref.top;
          var left = _ref.left;

          if (!this.options.shift) {
              return;
          }

          var shift = this.options.shift;
          if (typeof this.options.shift === 'function') {
              shift = this.options.shift.call(this, { top: top, left: left });
          }

          var shiftTop = undefined,
              shiftLeft = undefined;
          if (typeof shift === 'string') {
              shift = shift.split(' ');
              shift[1] = shift[1] || shift[0];

              var _shift = shift;

              var _shift2 = _slicedToArray(_shift, 2);

              shiftTop = _shift2[0];
              shiftLeft = _shift2[1];

              shiftTop = parseFloat(shiftTop, 10);
              shiftLeft = parseFloat(shiftLeft, 10);
          } else {
              shiftTop = shift.top;
              shiftLeft = shift.left;
          }

          top += shiftTop;
          left += shiftLeft;

          return { top: top, left: left };
      }
  });
  return Tether;

}));
;/*!
* Bootstrap v4.0.0 (https://getbootstrap.com)
* Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e(t.bootstrap = {}, t.jQuery)
}(this, function(t, e) {
  "use strict";

  function n(t, e) {
      for (var n = 0; n < e.length; n++) {
          var i = e[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
      }
  }
  function i(t, e, i) {
      return e && n(t.prototype, e), i && n(t, i), t
  }
  function r() {
      return (r = Object.assign || function(t) {
          for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
          }
          return t
      }).apply(this, arguments)
  }
  for (var o, s, a, l, c, h, f, u, d, p, g, m, _, v, E, y, b, T, C, w, I, A, D, S, O, N, k, L, P, x, R, j, H, M, W, U, F, B, K, V, Q, Y, G, q, z, X, J, Z, $, tt, et, nt, it, rt, ot, st, at, lt, ct, ht, ft, ut, dt, pt, gt = function(t) {
      var e = !1;

      function n(e) {
          var n = this,
              r = !1;
          return t(this).one(i.TRANSITION_END, function() {
              r = !0
          }), setTimeout(function() {
              r || i.triggerTransitionEnd(n)
          }, e), this
      }
      var i = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function(t) {
              do {
                  t += ~~ (1e6 * Math.random())
              } while (document.getElementById(t));
              return t
          },
          getSelectorFromElement: function(e) {
              var n = e.getAttribute("data-target");
              n && "#" !== n || (n = e.getAttribute("href") || "");
              try {
                  return t(document).find(n).length > 0 ? n : null
              } catch (t) {
                  return null
              }
          },
          reflow: function(t) {
              return t.offsetHeight
          },
          triggerTransitionEnd: function(n) {
              t(n).trigger(e.end)
          },
          supportsTransitionEnd: function() {
              return Boolean(e)
          },
          isElement: function(t) {
              return (t[0] || t).nodeType
          },
          typeCheckConfig: function(t, e, n) {
              for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r)) {
                  var o = n[r],
                      s = e[r],
                      a = s && i.isElement(s) ? "element" : (l = s, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
                  if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + r + '" provided type "' + a + '" but expected type "' + o + '".')
              }
              var l
          }
      };
      return e = ("undefined" == typeof window || !window.QUnit) && {
          end: "transitionend"
      }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
          bindType: e.end,
          delegateType: e.end,
          handle: function(e) {
              if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
          }
      }), i
  }(e = e && e.hasOwnProperty("default") ? e.
  default : e), mt = (s = "alert", l = "." + (a = "bs.alert"), c = (o = e).fn[s], h = {
      CLOSE: "close" + l,
      CLOSED: "closed" + l,
      CLICK_DATA_API: "click" + l + ".data-api"
  }, f = "alert", u = "fade", d = "show", p = function() {
      function t(t) {
          this._element = t
      }
      var e = t.prototype;
      return e.close = function(t) {
          t = t || this._element;
          var e = this._getRootElement(t);
          this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
      }, e.dispose = function() {
          o.removeData(this._element, a), this._element = null
      }, e._getRootElement = function(t) {
          var e = gt.getSelectorFromElement(t),
              n = !1;
          return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
      }, e._triggerCloseEvent = function(t) {
          var e = o.Event(h.CLOSE);
          return o(t).trigger(e), e
      }, e._removeElement = function(t) {
          var e = this;
          o(t).removeClass(d), gt.supportsTransitionEnd() && o(t).hasClass(u) ? o(t).one(gt.TRANSITION_END, function(n) {
              return e._destroyElement(t, n)
          }).emulateTransitionEnd(150) : this._destroyElement(t)
      }, e._destroyElement = function(t) {
          o(t).detach().trigger(h.CLOSED).remove()
      }, t._jQueryInterface = function(e) {
          return this.each(function() {
              var n = o(this),
                  i = n.data(a);
              i || (i = new t(this), n.data(a, i)), "close" === e && i[e](this)
          })
      }, t._handleDismiss = function(t) {
          return function(e) {
              e && e.preventDefault(), t.close(this)
          }
      }, i(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.0.0"
          }
      }]), t
  }(), o(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)), o.fn[s] = p._jQueryInterface, o.fn[s].Constructor = p, o.fn[s].noConflict = function() {
      return o.fn[s] = c, p._jQueryInterface
  }, p), _t = (m = "button", v = "." + (_ = "bs.button"), E = ".data-api", y = (g = e).fn[m], b = "active", T = "btn", C = "focus", w = '[data-toggle^="button"]', I = '[data-toggle="buttons"]', A = "input", D = ".active", S = ".btn", O = {
      CLICK_DATA_API: "click" + v + E,
      FOCUS_BLUR_DATA_API: "focus" + v + E + " blur" + v + E
  }, N = function() {
      function t(t) {
          this._element = t
      }
      var e = t.prototype;
      return e.toggle = function() {
          var t = !0,
              e = !0,
              n = g(this._element).closest(I)[0];
          if (n) {
              var i = g(this._element).find(A)[0];
              if (i) {
                  if ("radio" === i.type) if (i.checked && g(this._element).hasClass(b)) t = !1;
                  else {
                      var r = g(n).find(D)[0];
                      r && g(r).removeClass(b)
                  }
                  if (t) {
                      if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                      i.checked = !g(this._element).hasClass(b), g(i).trigger("change")
                  }
                  i.focus(), e = !1
              }
          }
          e && this._element.setAttribute("aria-pressed", !g(this._element).hasClass(b)), t && g(this._element).toggleClass(b)
      }, e.dispose = function() {
          g.removeData(this._element, _), this._element = null
      }, t._jQueryInterface = function(e) {
          return this.each(function() {
              var n = g(this).data(_);
              n || (n = new t(this), g(this).data(_, n)), "toggle" === e && n[e]()
          })
      }, i(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.0.0"
          }
      }]), t
  }(), g(document).on(O.CLICK_DATA_API, w, function(t) {
      t.preventDefault();
      var e = t.target;
      g(e).hasClass(T) || (e = g(e).closest(S)), N._jQueryInterface.call(g(e), "toggle")
  }).on(O.FOCUS_BLUR_DATA_API, w, function(t) {
      var e = g(t.target).closest(S)[0];
      g(e).toggleClass(C, /^focus(in)?$/.test(t.type))
  }), g.fn[m] = N._jQueryInterface, g.fn[m].Constructor = N, g.fn[m].noConflict = function() {
      return g.fn[m] = y, N._jQueryInterface
  }, N), vt = (L = "carousel", x = "." + (P = "bs.carousel"), R = ".data-api", j = (k = e).fn[L], H = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0
  }, M = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean"
  }, W = "next", U = "prev", F = "left", B = "right", K = {
      SLIDE: "slide" + x,
      SLID: "slid" + x,
      KEYDOWN: "keydown" + x,
      MOUSEENTER: "mouseenter" + x,
      MOUSELEAVE: "mouseleave" + x,
      TOUCHEND: "touchend" + x,
      LOAD_DATA_API: "load" + x + R,
      CLICK_DATA_API: "click" + x + R
  }, V = "carousel", Q = "active", Y = "slide", G = "carousel-item-right", q = "carousel-item-left", z = "carousel-item-next", X = "carousel-item-prev", J = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]'
  }, Z = function() {
      function t(t, e) {
          this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = k(t)[0], this._indicatorsElement = k(this._element).find(J.INDICATORS)[0], this._transitionDuration = this._getTransitionDuration(), this._addEventListeners()
      }
      var e = t.prototype;
      return e.next = function() {
          this._isSliding || this._slide(W)
      }, e.nextWhenVisible = function() {
          !document.hidden && k(this._element).is(":visible") && "hidden" !== k(this._element).css("visibility") && this.next()
      }, e.prev = function() {
          this._isSliding || this._slide(U)
      }, e.pause = function(t) {
          t || (this._isPaused = !0), k(this._element).find(J.NEXT_PREV)[0] && gt.supportsTransitionEnd() && (gt.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
      }, e.cycle = function(t) {
          t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
      }, e.to = function(t) {
          var e = this;
          this._activeElement = k(this._element).find(J.ACTIVE_ITEM)[0];
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) k(this._element).one(K.SLID, function() {
              return e.to(t)
          });
          else {
              if (n === t) return this.pause(), void this.cycle();
              var i = t > n ? W : U;
              this._slide(i, this._items[t])
          }
      }, e.dispose = function() {
          k(this._element).off(x), k.removeData(this._element, P), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
      }, e._getConfig = function(t) {
          return t = r({}, H, t), gt.typeCheckConfig(L, t, M), t
      }, e._getTransitionDuration = function() {
          var t = k(this._element).find(J.ITEM).css("transition-duration");
          return t ? (t = t.split(",")[0]).indexOf("ms") > -1 ? parseFloat(t) : 1e3 * parseFloat(t) : 0
      }, e._addEventListeners = function() {
          var t = this;
          this._config.keyboard && k(this._element).on(K.KEYDOWN, function(e) {
              return t._keydown(e)
          }), "hover" === this._config.pause && (k(this._element).on(K.MOUSEENTER, function(e) {
              return t.pause(e)
          }).on(K.MOUSELEAVE, function(e) {
              return t.cycle(e)
          }), "ontouchstart" in document.documentElement && k(this._element).on(K.TOUCHEND, function() {
              t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                  return t.cycle(e)
              }, 500 + t._config.interval)
          }))
      }, e._keydown = function(t) {
          if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
              case 37:
                  t.preventDefault(), this.prev();
                  break;
              case 39:
                  t.preventDefault(), this.next()
          }
      }, e._getItemIndex = function(t) {
          return this._items = k.makeArray(k(t).parent().find(J.ITEM)), this._items.indexOf(t)
      }, e._getItemByDirection = function(t, e) {
          var n = t === W,
              i = t === U,
              r = this._getItemIndex(e),
              o = this._items.length - 1;
          if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
          var s = (r + (t === U ? -1 : 1)) % this._items.length;
          return -1 === s ? this._items[this._items.length - 1] : this._items[s]
      }, e._triggerSlideEvent = function(t, e) {
          var n = this._getItemIndex(t),
              i = this._getItemIndex(k(this._element).find(J.ACTIVE_ITEM)[0]),
              r = k.Event(K.SLIDE, {
                  relatedTarget: t,
                  direction: e,
                  from: i,
                  to: n
              });
          return k(this._element).trigger(r), r
      }, e._setActiveIndicatorElement = function(t) {
          if (this._indicatorsElement) {
              k(this._indicatorsElement).find(J.ACTIVE).removeClass(Q);
              var e = this._indicatorsElement.children[this._getItemIndex(t)];
              e && k(e).addClass(Q)
          }
      }, e._slide = function(t, e) {
          var n, i, r, o = this,
              s = k(this._element).find(J.ACTIVE_ITEM)[0],
              a = this._getItemIndex(s),
              l = e || s && this._getItemByDirection(t, s),
              c = this._getItemIndex(l),
              h = Boolean(this._interval);
          if (t === W ? (n = q, i = z, r = F) : (n = G, i = X, r = B), l && k(l).hasClass(Q)) this._isSliding = !1;
          else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && s && l) {
              this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
              var f = k.Event(K.SLID, {
                  relatedTarget: l,
                  direction: r,
                  from: a,
                  to: c
              });
              gt.supportsTransitionEnd() && k(this._element).hasClass(Y) ? (k(l).addClass(i), gt.reflow(l), k(s).addClass(n), k(l).addClass(n), k(s).one(gt.TRANSITION_END, function() {
                  k(l).removeClass(n + " " + i).addClass(Q), k(s).removeClass(Q + " " + i + " " + n), o._isSliding = !1, setTimeout(function() {
                      return k(o._element).trigger(f)
                  }, 0)
              }).emulateTransitionEnd(this._transitionDuration)) : (k(s).removeClass(Q), k(l).addClass(Q), this._isSliding = !1, k(this._element).trigger(f)), h && this.cycle()
          }
      }, t._jQueryInterface = function(e) {
          return this.each(function() {
              var n = k(this).data(P),
                  i = r({}, H, k(this).data());
              "object" == typeof e && (i = r({}, i, e));
              var o = "string" == typeof e ? e : i.slide;
              if (n || (n = new t(this, i), k(this).data(P, n)), "number" == typeof e) n.to(e);
              else if ("string" == typeof o) {
                  if ("undefined" == typeof n[o]) throw new TypeError('No method named "' + o + '"');
                  n[o]()
              } else i.interval && (n.pause(), n.cycle())
          })
      }, t._dataApiClickHandler = function(e) {
          var n = gt.getSelectorFromElement(this);
          if (n) {
              var i = k(n)[0];
              if (i && k(i).hasClass(V)) {
                  var o = r({}, k(i).data(), k(this).data()),
                      s = this.getAttribute("data-slide-to");
                  s && (o.interval = !1), t._jQueryInterface.call(k(i), o), s && k(i).data(P).to(s), e.preventDefault()
              }
          }
      }, i(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.0.0"
          }
      }, {
          key: "Default",
          get: function() {
              return H
          }
      }]), t
  }(), k(document).on(K.CLICK_DATA_API, J.DATA_SLIDE, Z._dataApiClickHandler), k(window).on(K.LOAD_DATA_API, function() {
      k(J.DATA_RIDE).each(function() {
          var t = k(this);
          Z._jQueryInterface.call(t, t.data())
      })
  }), k.fn[L] = Z._jQueryInterface, k.fn[L].Constructor = Z, k.fn[L].noConflict = function() {
      return k.fn[L] = j, Z._jQueryInterface
  }, Z), Et = (tt = "collapse", nt = "." + (et = "bs.collapse"), it = ($ = e).fn[tt], rt = {
      toggle: !0,
      parent: ""
  }, ot = {
      toggle: "boolean",
      parent: "(string|element)"
  }, st = {
      SHOW: "show" + nt,
      SHOWN: "shown" + nt,
      HIDE: "hide" + nt,
      HIDDEN: "hidden" + nt,
      CLICK_DATA_API: "click" + nt + ".data-api"
  }, at = "show", lt = "collapse", ct = "collapsing", ht = "collapsed", ft = "width", ut = "height", dt = {
      ACTIVES: ".show, .collapsing",
      DATA_TOGGLE: '[data-toggle="collapse"]'
  }, pt = function() {
      function t(t, e) {
          this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
          for (var n = $(dt.DATA_TOGGLE), i = 0; i < n.length; i++) {
              var r = n[i],
                  o = gt.getSelectorFromElement(r);
              null !== o && $(o).filter(t).length > 0 && (this._selector = o, this._triggerArray.push(r))
          }
          this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
      }
      var e = t.prototype;
      return e.toggle = function() {
          $(this._element).hasClass(at) ? this.hide() : this.show()
      }, e.show = function() {
          var e, n, i = this;
          if (!this._isTransitioning && !$(this._element).hasClass(at) && (this._parent && 0 === (e = $.makeArray($(this._parent).find(dt.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (n = $(e).not(this._selector).data(et)) && n._isTransitioning))) {
              var r = $.Event(st.SHOW);
              if ($(this._element).trigger(r), !r.isDefaultPrevented()) {
                  e && (t._jQueryInterface.call($(e).not(this._selector), "hide"), n || $(e).data(et, null));
                  var o = this._getDimension();
                  $(this._element).removeClass(lt).addClass(ct), this._element.style[o] = 0, this._triggerArray.length > 0 && $(this._triggerArray).removeClass(ht).attr("aria-expanded", !0), this.setTransitioning(!0);
                  var s = function() {
                      $(i._element).removeClass(ct).addClass(lt).addClass(at), i._element.style[o] = "", i.setTransitioning(!1), $(i._element).trigger(st.SHOWN)
                  };
                  if (gt.supportsTransitionEnd()) {
                      var a = "scroll" + (o[0].toUpperCase() + o.slice(1));
                      $(this._element).one(gt.TRANSITION_END, s).emulateTransitionEnd(600), this._element.style[o] = this._element[a] + "px"
                  } else s()
              }
          }
      }, e.hide = function() {
          var t = this;
          if (!this._isTransitioning && $(this._element).hasClass(at)) {
              var e = $.Event(st.HIDE);
              if ($(this._element).trigger(e), !e.isDefaultPrevented()) {
                  var n = this._getDimension();
                  if (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", gt.reflow(this._element), $(this._element).addClass(ct).removeClass(lt).removeClass(at), this._triggerArray.length > 0) for (var i = 0; i < this._triggerArray.length; i++) {
                      var r = this._triggerArray[i],
                          o = gt.getSelectorFromElement(r);
                      if (null !== o) $(o).hasClass(at) || $(r).addClass(ht).attr("aria-expanded", !1)
                  }
                  this.setTransitioning(!0);
                  var s = function() {
                      t.setTransitioning(!1), $(t._element).removeClass(ct).addClass(lt).trigger(st.HIDDEN)
                  };
                  this._element.style[n] = "", gt.supportsTransitionEnd() ? $(this._element).one(gt.TRANSITION_END, s).emulateTransitionEnd(600) : s()
              }
          }
      }, e.setTransitioning = function(t) {
          this._isTransitioning = t
      }, e.dispose = function() {
          $.removeData(this._element, et), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
      }, e._getConfig = function(t) {
          return (t = r({}, rt, t)).toggle = Boolean(t.toggle), gt.typeCheckConfig(tt, t, ot), t
      }, e._getDimension = function() {
          return $(this._element).hasClass(ft) ? ft : ut
      }, e._getParent = function() {
          var e = this,
              n = null;
          gt.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = $(this._config.parent)[0];
          var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
          return $(n).find(i).each(function(n, i) {
              e._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i])
          }), n
      }, e._addAriaAndCollapsedClass = function(t, e) {
          if (t) {
              var n = $(t).hasClass(at);
              e.length > 0 && $(e).toggleClass(ht, !n).attr("aria-expanded", n)
          }
      }, t._getTargetFromElement = function(t) {
          var e = gt.getSelectorFromElement(t);
          return e ? $(e)[0] : null
      }, t._jQueryInterface = function(e) {
          return this.each(function() {
              var n = $(this),
                  i = n.data(et),
                  o = r({}, rt, n.data(), "object" == typeof e && e);
              if (!i && o.toggle && /show|hide/.test(e) && (o.toggle = !1), i || (i = new t(this, o), n.data(et, i)), "string" == typeof e) {
                  if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                  i[e]()
              }
          })
      }, i(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.0.0"
          }
      }, {
          key: "Default",
          get: function() {
              return rt
          }
      }]), t
  }(), $(document).on(st.CLICK_DATA_API, dt.DATA_TOGGLE, function(t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var e = $(this),
          n = gt.getSelectorFromElement(this);
      $(n).each(function() {
          var t = $(this),
              n = t.data(et) ? "toggle" : e.data();
          pt._jQueryInterface.call(t, n)
      })
  }), $.fn[tt] = pt._jQueryInterface, $.fn[tt].Constructor = pt, $.fn[tt].noConflict = function() {
      return $.fn[tt] = it, pt._jQueryInterface
  }, pt), yt = "undefined" != typeof window && "undefined" != typeof document, bt = ["Edge", "Trident", "Firefox"], Tt = 0, Ct = 0; Ct < bt.length; Ct += 1) if (yt && navigator.userAgent.indexOf(bt[Ct]) >= 0) {
      Tt = 1;
      break
  }
  var wt = yt && window.Promise ? function(t) {
          var e = !1;
          return function() {
              e || (e = !0, window.Promise.resolve().then(function() {
                  e = !1, t()
              }))
          }
      } : function(t) {
          var e = !1;
          return function() {
              e || (e = !0, setTimeout(function() {
                  e = !1, t()
              }, Tt))
          }
      };

  function It(t) {
      return t && "[object Function]" === {}.toString.call(t)
  }
  function At(t, e) {
      if (1 !== t.nodeType) return [];
      var n = getComputedStyle(t, null);
      return e ? n[e] : n
  }
  function Dt(t) {
      return "HTML" === t.nodeName ? t : t.parentNode || t.host
  }
  function St(t) {
      if (!t) return document.body;
      switch (t.nodeName) {
          case "HTML":
          case "BODY":
              return t.ownerDocument.body;
          case "#document":
              return t.body
      }
      var e = At(t),
          n = e.overflow,
          i = e.overflowX,
          r = e.overflowY;
      return /(auto|scroll)/.test(n + r + i) ? t : St(Dt(t))
  }
  function Ot(t) {
      var e = t && t.offsetParent,
          n = e && e.nodeName;
      return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === At(e, "position") ? Ot(e) : e : t ? t.ownerDocument.documentElement : document.documentElement
  }
  function Nt(t) {
      return null !== t.parentNode ? Nt(t.parentNode) : t
  }
  function kt(t, e) {
      if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
      var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
          i = n ? t : e,
          r = n ? e : t,
          o = document.createRange();
      o.setStart(i, 0), o.setEnd(r, 0);
      var s, a, l = o.commonAncestorContainer;
      if (t !== l && e !== l || i.contains(r)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && Ot(s.firstElementChild) !== s ? Ot(l) : l;
      var c = Nt(t);
      return c.host ? kt(c.host, e) : kt(t, Nt(e).host)
  }
  function Lt(t) {
      var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
          n = t.nodeName;
      if ("BODY" === n || "HTML" === n) {
          var i = t.ownerDocument.documentElement;
          return (t.ownerDocument.scrollingElement || i)[e]
      }
      return t[e]
  }
  function Pt(t, e) {
      var n = "x" === e ? "Left" : "Top",
          i = "Left" === n ? "Right" : "Bottom";
      return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
  }
  var xt = void 0,
      Rt = function() {
          return void 0 === xt && (xt = -1 !== navigator.appVersion.indexOf("MSIE 10")), xt
      };

  function jt(t, e, n, i) {
      return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], Rt() ? n["offset" + t] + i["margin" + ("Height" === t ? "Top" : "Left")] + i["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
  }
  function Ht() {
      var t = document.body,
          e = document.documentElement,
          n = Rt() && getComputedStyle(e);
      return {
          height: jt("Height", t, e, n),
          width: jt("Width", t, e, n)
      }
  }
  var Mt = function(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
  }, Wt = function() {
      function t(t, e) {
          for (var n = 0; n < e.length; n++) {
              var i = e[n];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
      }
      return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
      }
  }(),
      Ut = function(t, e, n) {
          return e in t ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
          }) : t[e] = n, t
      }, Ft = Object.assign || function(t) {
          for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
          }
          return t
      };

  function Bt(t) {
      return Ft({}, t, {
          right: t.left + t.width,
          bottom: t.top + t.height
      })
  }
  function Kt(t) {
      var e = {};
      if (Rt()) try {
          e = t.getBoundingClientRect();
          var n = Lt(t, "top"),
              i = Lt(t, "left");
          e.top += n, e.left += i, e.bottom += n, e.right += i
      } catch (t) {} else e = t.getBoundingClientRect();
      var r = {
          left: e.left,
          top: e.top,
          width: e.right - e.left,
          height: e.bottom - e.top
      }, o = "HTML" === t.nodeName ? Ht() : {}, s = o.width || t.clientWidth || r.right - r.left,
          a = o.height || t.clientHeight || r.bottom - r.top,
          l = t.offsetWidth - s,
          c = t.offsetHeight - a;
      if (l || c) {
          var h = At(t);
          l -= Pt(h, "x"), c -= Pt(h, "y"), r.width -= l, r.height -= c
      }
      return Bt(r)
  }
  function Vt(t, e) {
      var n = Rt(),
          i = "HTML" === e.nodeName,
          r = Kt(t),
          o = Kt(e),
          s = St(t),
          a = At(e),
          l = parseFloat(a.borderTopWidth, 10),
          c = parseFloat(a.borderLeftWidth, 10),
          h = Bt({
              top: r.top - o.top - l,
              left: r.left - o.left - c,
              width: r.width,
              height: r.height
          });
      if (h.marginTop = 0, h.marginLeft = 0, !n && i) {
          var f = parseFloat(a.marginTop, 10),
              u = parseFloat(a.marginLeft, 10);
          h.top -= l - f, h.bottom -= l - f, h.left -= c - u, h.right -= c - u, h.marginTop = f, h.marginLeft = u
      }
      return (n ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (h = function(t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              i = Lt(e, "top"),
              r = Lt(e, "left"),
              o = n ? -1 : 1;
          return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
      }(h, e)), h
  }
  function Qt(t, e, n, i) {
      var r, o, s, a, l, c, h, f = {
          top: 0,
          left: 0
      }, u = kt(t, e);
      if ("viewport" === i) o = (r = u).ownerDocument.documentElement, s = Vt(r, o), a = Math.max(o.clientWidth, window.innerWidth || 0), l = Math.max(o.clientHeight, window.innerHeight || 0), c = Lt(o), h = Lt(o, "left"), f = Bt({
          top: c - s.top + s.marginTop,
          left: h - s.left + s.marginLeft,
          width: a,
          height: l
      });
      else {
          var d = void 0;
          "scrollParent" === i ? "BODY" === (d = St(Dt(e))).nodeName && (d = t.ownerDocument.documentElement) : d = "window" === i ? t.ownerDocument.documentElement : i;
          var p = Vt(d, u);
          if ("HTML" !== d.nodeName || function t(e) {
              var n = e.nodeName;
              return "BODY" !== n && "HTML" !== n && ("fixed" === At(e, "position") || t(Dt(e)))
          }(u)) f = p;
          else {
              var g = Ht(),
                  m = g.height,
                  _ = g.width;
              f.top += p.top - p.marginTop, f.bottom = m + p.top, f.left += p.left - p.marginLeft, f.right = _ + p.left
          }
      }
      return f.left += n, f.top += n, f.right -= n, f.bottom -= n, f
  }
  function Yt(t, e, n, i, r) {
      var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === t.indexOf("auto")) return t;
      var s = Qt(n, i, o, r),
          a = {
              top: {
                  width: s.width,
                  height: e.top - s.top
              },
              right: {
                  width: s.right - e.right,
                  height: s.height
              },
              bottom: {
                  width: s.width,
                  height: s.bottom - e.bottom
              },
              left: {
                  width: e.left - s.left,
                  height: s.height
              }
          }, l = Object.keys(a).map(function(t) {
              return Ft({
                  key: t
              }, a[t], {
                  area: (e = a[t], e.width * e.height)
              });
              var e
          }).sort(function(t, e) {
              return e.area - t.area
          }),
          c = l.filter(function(t) {
              var e = t.width,
                  i = t.height;
              return e >= n.clientWidth && i >= n.clientHeight
          }),
          h = c.length > 0 ? c[0].key : l[0].key,
          f = t.split("-")[1];
      return h + (f ? "-" + f : "")
  }
  function Gt(t, e, n) {
      return Vt(n, kt(e, n))
  }
  function qt(t) {
      var e = getComputedStyle(t),
          n = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
          i = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
      return {
          width: t.offsetWidth + i,
          height: t.offsetHeight + n
      }
  }
  function zt(t) {
      var e = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
      };
      return t.replace(/left|right|bottom|top/g, function(t) {
          return e[t]
      })
  }
  function Xt(t, e, n) {
      n = n.split("-")[0];
      var i = qt(t),
          r = {
              width: i.width,
              height: i.height
          }, o = -1 !== ["right", "left"].indexOf(n),
          s = o ? "top" : "left",
          a = o ? "left" : "top",
          l = o ? "height" : "width",
          c = o ? "width" : "height";
      return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[zt(a)], r
  }
  function Jt(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0]
  }
  function Zt(t, e, n) {
      return (void 0 === n ? t : t.slice(0, function(t, e, n) {
          if (Array.prototype.findIndex) return t.findIndex(function(t) {
              return t[e] === n
          });
          var i = Jt(t, function(t) {
              return t[e] === n
          });
          return t.indexOf(i)
      }(t, "name", n))).forEach(function(t) {
          t.
          function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
          var n = t.
              function || t.fn;
          t.enabled && It(n) && (e.offsets.popper = Bt(e.offsets.popper), e.offsets.reference = Bt(e.offsets.reference), e = n(e, t))
      }), e
  }
  function $t(t, e) {
      return t.some(function(t) {
          var n = t.name;
          return t.enabled && n === e
      })
  }
  function te(t) {
      for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length - 1; i++) {
          var r = e[i],
              o = r ? "" + r + n : t;
          if ("undefined" != typeof document.body.style[o]) return o
      }
      return null
  }
  function ee(t) {
      var e = t.ownerDocument;
      return e ? e.defaultView : window
  }
  function ne(t, e, n, i) {
      n.updateBound = i, ee(t).addEventListener("resize", n.updateBound, {
          passive: !0
      });
      var r = St(t);
      return function t(e, n, i, r) {
          var o = "BODY" === e.nodeName,
              s = o ? e.ownerDocument.defaultView : e;
          s.addEventListener(n, i, {
              passive: !0
          }), o || t(St(s.parentNode), n, i, r), r.push(s)
      }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
  }
  function ie() {
      var t, e;
      this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, ee(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
          t.removeEventListener("scroll", e.updateBound)
      }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
  }
  function re(t) {
      return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
  }
  function oe(t, e) {
      Object.keys(e).forEach(function(n) {
          var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && re(e[n]) && (i = "px"), t.style[n] = e[n] + i
      })
  }
  function se(t, e, n) {
      var i = Jt(t, function(t) {
          return t.name === e
      }),
          r = !! i && t.some(function(t) {
              return t.name === n && t.enabled && t.order < i.order
          });
      if (!r) {
          var o = "`" + e + "`",
              s = "`" + n + "`";
          console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
      }
      return r
  }
  var ae = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
      le = ae.slice(3);

  function ce(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = le.indexOf(t),
          i = le.slice(n + 1).concat(le.slice(0, n));
      return e ? i.reverse() : i
  }
  var he = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise"
  };

  function fe(t, e, n, i) {
      var r = [0, 0],
          o = -1 !== ["right", "left"].indexOf(i),
          s = t.split(/(\+|\-)/).map(function(t) {
              return t.trim()
          }),
          a = s.indexOf(Jt(s, function(t) {
              return -1 !== t.search(/,|\s/)
          }));
      s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
      var l = /\s*,\s*|\s+/,
          c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
      return (c = c.map(function(t, i) {
          var r = (1 === i ? !o : o) ? "height" : "width",
              s = !1;
          return t.reduce(function(t, e) {
              return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
          }, []).map(function(t) {
              return function(t, e, n, i) {
                  var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                      o = +r[1],
                      s = r[2];
                  if (!o) return t;
                  if (0 === s.indexOf("%")) {
                      var a = void 0;
                      switch (s) {
                          case "%p":
                              a = n;
                              break;
                          case "%":
                          case "%r":
                          default:
                              a = i
                      }
                      return Bt(a)[e] / 100 * o
                  }
                  if ("vh" === s || "vw" === s) return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o;
                  return o
              }(t, r, e, n)
          })
      })).forEach(function(t, e) {
          t.forEach(function(n, i) {
              re(n) && (r[e] += n * ("-" === t[i - 1] ? -1 : 1))
          })
      }), r
  }
  var ue = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function() {},
      onUpdate: function() {},
      modifiers: {
          shift: {
              order: 100,
              enabled: !0,
              fn: function(t) {
                  var e = t.placement,
                      n = e.split("-")[0],
                      i = e.split("-")[1];
                  if (i) {
                      var r = t.offsets,
                          o = r.reference,
                          s = r.popper,
                          a = -1 !== ["bottom", "top"].indexOf(n),
                          l = a ? "left" : "top",
                          c = a ? "width" : "height",
                          h = {
                              start: Ut({}, l, o[l]),
                              end: Ut({}, l, o[l] + o[c] - s[c])
                          };
                      t.offsets.popper = Ft({}, s, h[i])
                  }
                  return t
              }
          },
          offset: {
              order: 200,
              enabled: !0,
              fn: function(t, e) {
                  var n = e.offset,
                      i = t.placement,
                      r = t.offsets,
                      o = r.popper,
                      s = r.reference,
                      a = i.split("-")[0],
                      l = void 0;
                  return l = re(+n) ? [+n, 0] : fe(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), t.popper = o, t
              },
              offset: 0
          },
          preventOverflow: {
              order: 300,
              enabled: !0,
              fn: function(t, e) {
                  var n = e.boundariesElement || Ot(t.instance.popper);
                  t.instance.reference === n && (n = Ot(n));
                  var i = Qt(t.instance.popper, t.instance.reference, e.padding, n);
                  e.boundaries = i;
                  var r = e.priority,
                      o = t.offsets.popper,
                      s = {
                          primary: function(t) {
                              var n = o[t];
                              return o[t] < i[t] && !e.escapeWithReference && (n = Math.max(o[t], i[t])), Ut({}, t, n)
                          },
                          secondary: function(t) {
                              var n = "right" === t ? "left" : "top",
                                  r = o[n];
                              return o[t] > i[t] && !e.escapeWithReference && (r = Math.min(o[n], i[t] - ("right" === t ? o.width : o.height))), Ut({}, n, r)
                          }
                      };
                  return r.forEach(function(t) {
                      var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                      o = Ft({}, o, s[e](t))
                  }), t.offsets.popper = o, t
              },
              priority: ["left", "right", "top", "bottom"],
              padding: 5,
              boundariesElement: "scrollParent"
          },
          keepTogether: {
              order: 400,
              enabled: !0,
              fn: function(t) {
                  var e = t.offsets,
                      n = e.popper,
                      i = e.reference,
                      r = t.placement.split("-")[0],
                      o = Math.floor,
                      s = -1 !== ["top", "bottom"].indexOf(r),
                      a = s ? "right" : "bottom",
                      l = s ? "left" : "top",
                      c = s ? "width" : "height";
                  return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
              }
          },
          arrow: {
              order: 500,
              enabled: !0,
              fn: function(t, e) {
                  var n;
                  if (!se(t.instance.modifiers, "arrow", "keepTogether")) return t;
                  var i = e.element;
                  if ("string" == typeof i) {
                      if (!(i = t.instance.popper.querySelector(i))) return t
                  } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                  var r = t.placement.split("-")[0],
                      o = t.offsets,
                      s = o.popper,
                      a = o.reference,
                      l = -1 !== ["left", "right"].indexOf(r),
                      c = l ? "height" : "width",
                      h = l ? "Top" : "Left",
                      f = h.toLowerCase(),
                      u = l ? "left" : "top",
                      d = l ? "bottom" : "right",
                      p = qt(i)[c];
                  a[d] - p < s[f] && (t.offsets.popper[f] -= s[f] - (a[d] - p)), a[f] + p > s[d] && (t.offsets.popper[f] += a[f] + p - s[d]), t.offsets.popper = Bt(t.offsets.popper);
                  var g = a[f] + a[c] / 2 - p / 2,
                      m = At(t.instance.popper),
                      _ = parseFloat(m["margin" + h], 10),
                      v = parseFloat(m["border" + h + "Width"], 10),
                      E = g - t.offsets.popper[f] - _ - v;
                  return E = Math.max(Math.min(s[c] - p, E), 0), t.arrowElement = i, t.offsets.arrow = (Ut(n = {}, f, Math.round(E)), Ut(n, u, ""), n), t
              },
              element: "[x-arrow]"
          },
          flip: {
              order: 600,
              enabled: !0,
              fn: function(t, e) {
                  if ($t(t.instance.modifiers, "inner")) return t;
                  if (t.flipped && t.placement === t.originalPlacement) return t;
                  var n = Qt(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement),
                      i = t.placement.split("-")[0],
                      r = zt(i),
                      o = t.placement.split("-")[1] || "",
                      s = [];
                  switch (e.behavior) {
                      case he.FLIP:
                          s = [i, r];
                          break;
                      case he.CLOCKWISE:
                          s = ce(i);
                          break;
                      case he.COUNTERCLOCKWISE:
                          s = ce(i, !0);
                          break;
                      default:
                          s = e.behavior
                  }
                  return s.forEach(function(a, l) {
                      if (i !== a || s.length === l + 1) return t;
                      i = t.placement.split("-")[0], r = zt(i);
                      var c, h = t.offsets.popper,
                          f = t.offsets.reference,
                          u = Math.floor,
                          d = "left" === i && u(h.right) > u(f.left) || "right" === i && u(h.left) < u(f.right) || "top" === i && u(h.bottom) > u(f.top) || "bottom" === i && u(h.top) < u(f.bottom),
                          p = u(h.left) < u(n.left),
                          g = u(h.right) > u(n.right),
                          m = u(h.top) < u(n.top),
                          _ = u(h.bottom) > u(n.bottom),
                          v = "left" === i && p || "right" === i && g || "top" === i && m || "bottom" === i && _,
                          E = -1 !== ["top", "bottom"].indexOf(i),
                          y = !! e.flipVariations && (E && "start" === o && p || E && "end" === o && g || !E && "start" === o && m || !E && "end" === o && _);
                      (d || v || y) && (t.flipped = !0, (d || v) && (i = s[l + 1]), y && (o = "end" === (c = o) ? "start" : "start" === c ? "end" : c), t.placement = i + (o ? "-" + o : ""), t.offsets.popper = Ft({}, t.offsets.popper, Xt(t.instance.popper, t.offsets.reference, t.placement)), t = Zt(t.instance.modifiers, t, "flip"))
                  }), t
              },
              behavior: "flip",
              padding: 5,
              boundariesElement: "viewport"
          },
          inner: {
              order: 700,
              enabled: !1,
              fn: function(t) {
                  var e = t.placement,
                      n = e.split("-")[0],
                      i = t.offsets,
                      r = i.popper,
                      o = i.reference,
                      s = -1 !== ["left", "right"].indexOf(n),
                      a = -1 === ["top", "left"].indexOf(n);
                  return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = zt(e), t.offsets.popper = Bt(r), t
              }
          },
          hide: {
              order: 800,
              enabled: !0,
              fn: function(t) {
                  if (!se(t.instance.modifiers, "hide", "preventOverflow")) return t;
                  var e = t.offsets.reference,
                      n = Jt(t.instance.modifiers, function(t) {
                          return "preventOverflow" === t.name
                      }).boundaries;
                  if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                      if (!0 === t.hide) return t;
                      t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                  } else {
                      if (!1 === t.hide) return t;
                      t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                  }
                  return t
              }
          },
          computeStyle: {
              order: 850,
              enabled: !0,
              fn: function(t, e) {
                  var n = e.x,
                      i = e.y,
                      r = t.offsets.popper,
                      o = Jt(t.instance.modifiers, function(t) {
                          return "applyStyle" === t.name
                      }).gpuAcceleration;
                  void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                  var s = void 0 !== o ? o : e.gpuAcceleration,
                      a = Kt(Ot(t.instance.popper)),
                      l = {
                          position: r.position
                      }, c = {
                          left: Math.floor(r.left),
                          top: Math.floor(r.top),
                          bottom: Math.floor(r.bottom),
                          right: Math.floor(r.right)
                      }, h = "bottom" === n ? "top" : "bottom",
                      f = "right" === i ? "left" : "right",
                      u = te("transform"),
                      d = void 0,
                      p = void 0;
                  if (p = "bottom" === h ? -a.height + c.bottom : c.top, d = "right" === f ? -a.width + c.right : c.left, s && u) l[u] = "translate3d(" + d + "px, " + p + "px, 0)", l[h] = 0, l[f] = 0, l.willChange = "transform";
                  else {
                      var g = "bottom" === h ? -1 : 1,
                          m = "right" === f ? -1 : 1;
                      l[h] = p * g, l[f] = d * m, l.willChange = h + ", " + f
                  }
                  var _ = {
                      "x-placement": t.placement
                  };
                  return t.attributes = Ft({}, _, t.attributes), t.styles = Ft({}, l, t.styles), t.arrowStyles = Ft({}, t.offsets.arrow, t.arrowStyles), t
              },
              gpuAcceleration: !0,
              x: "bottom",
              y: "right"
          },
          applyStyle: {
              order: 900,
              enabled: !0,
              fn: function(t) {
                  var e, n;
                  return oe(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function(t) {
                      !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                  }), t.arrowElement && Object.keys(t.arrowStyles).length && oe(t.arrowElement, t.arrowStyles), t
              },
              onLoad: function(t, e, n, i, r) {
                  var o = Gt(0, e, t),
                      s = Yt(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                  return e.setAttribute("x-placement", s), oe(e, {
                      position: "absolute"
                  }), n
              },
              gpuAcceleration: void 0
          }
      }
  }, de = function() {
      function t(e, n) {
          var i = this,
              r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          Mt(this, t), this.scheduleUpdate = function() {
              return requestAnimationFrame(i.update)
          }, this.update = wt(this.update.bind(this)), this.options = Ft({}, t.Defaults, r), this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: []
          }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Ft({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
              i.options.modifiers[e] = Ft({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
          }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
              return Ft({
                  name: t
              }, i.options.modifiers[t])
          }).sort(function(t, e) {
              return t.order - e.order
          }), this.modifiers.forEach(function(t) {
              t.enabled && It(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
          }), this.update();
          var o = this.options.eventsEnabled;
          o && this.enableEventListeners(), this.state.eventsEnabled = o
      }
      return Wt(t, [{
          key: "update",
          value: function() {
              return function() {
                  if (!this.state.isDestroyed) {
                      var t = {
                          instance: this,
                          styles: {},
                          arrowStyles: {},
                          attributes: {},
                          flipped: !1,
                          offsets: {}
                      };
                      t.offsets.reference = Gt(this.state, this.popper, this.reference), t.placement = Yt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = Xt(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = Zt(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                  }
              }.call(this)
          }
      }, {
          key: "destroy",
          value: function() {
              return function() {
                  return this.state.isDestroyed = !0, $t(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[te("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
              }.call(this)
          }
      }, {
          key: "enableEventListeners",
          value: function() {
              return function() {
                  this.state.eventsEnabled || (this.state = ne(this.reference, this.options, this.state, this.scheduleUpdate))
              }.call(this)
          }
      }, {
          key: "disableEventListeners",
          value: function() {
              return ie.call(this)
          }
      }]), t
  }();
  de.Utils = ("undefined" != typeof window ? window : global).PopperUtils, de.placements = ae, de.Defaults = ue;
  var pe, ge, me, _e, ve, Ee, ye, be, Te, Ce, we, Ie, Ae, De, Se, Oe, Ne, ke, Le, Pe, xe, Re, je, He, Me, We, Ue, Fe, Be, Ke, Ve, Qe, Ye, Ge, qe, ze, Xe, Je, Ze, $e, tn, en, nn, rn, on, sn, an, ln, cn, hn, fn, un, dn, pn, gn, mn, _n, vn, En, yn, bn, Tn, Cn, wn, In, An, Dn, Sn, On, Nn, kn, Ln, Pn, xn, Rn, jn, Hn, Mn, Wn, Un, Fn, Bn, Kn, Vn, Qn, Yn, Gn, qn, zn, Xn, Jn, Zn, $n, ti, ei, ni, ii, ri, oi, si, ai, li, ci, hi, fi, ui, di, pi, gi, mi, _i, vi, Ei, yi = (ge = "dropdown", _e = "." + (me = "bs.dropdown"), ve = ".data-api", Ee = (pe = e).fn[ge], ye = new RegExp("38|40|27"), be = {
      HIDE: "hide" + _e,
      HIDDEN: "hidden" + _e,
      SHOW: "show" + _e,
      SHOWN: "shown" + _e,
      CLICK: "click" + _e,
      CLICK_DATA_API: "click" + _e + ve,
      KEYDOWN_DATA_API: "keydown" + _e + ve,
      KEYUP_DATA_API: "keyup" + _e + ve
  }, Te = "disabled", Ce = "show", we = "dropup", Ie = "dropright", Ae = "dropleft", De = "dropdown-menu-right", Se = "position-static", Oe = '[data-toggle="dropdown"]', Ne = ".dropdown form", ke = ".dropdown-menu", Le = ".navbar-nav", Pe = ".dropdown-menu .dropdown-item:not(.disabled)", xe = "top-start", Re = "top-end", je = "bottom-start", He = "bottom-end", Me = "right-start", We = "left-start", Ue = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic"
  }, Fe = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string"
  }, Be = function() {
      function t(t, e) {
          this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
      }
      var e = t.prototype;
      return e.toggle = function() {
          if (!this._element.disabled && !pe(this._element).hasClass(Te)) {
              var e = t._getParentFromElement(this._element),
                  n = pe(this._menu).hasClass(Ce);
              if (t._clearMenus(), !n) {
                  var i = {
                      relatedTarget: this._element
                  }, r = pe.Event(be.SHOW, i);
                  if (pe(e).trigger(r), !r.isDefaultPrevented()) {
                      if (!this._inNavbar) {
                          if ("undefined" == typeof de) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                          var o = this._element;
                          "parent" === this._config.reference ? o = e : gt.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && pe(e).addClass(Se), this._popper = new de(o, this._menu, this._getPopperConfig())
                      }
                      "ontouchstart" in document.documentElement && 0 === pe(e).closest(Le).length && pe(document.body).children().on("mouseover", null, pe.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), pe(this._menu).toggleClass(Ce), pe(e).toggleClass(Ce).trigger(pe.Event(be.SHOWN, i))
                  }
              }
          }
      }, e.dispose = function() {
          pe.removeData(this._element, me), pe(this._element).off(_e), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
      }, e.update = function() {
          this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
      }, e._addEventListeners = function() {
          var t = this;
          pe(this._element).on(be.CLICK, function(e) {
              e.preventDefault(), e.stopPropagation(), t.toggle()
          })
      }, e._getConfig = function(t) {
          return t = r({}, this.constructor.Default, pe(this._element).data(), t), gt.typeCheckConfig(ge, t, this.constructor.DefaultType), t
      }, e._getMenuElement = function() {
          if (!this._menu) {
              var e = t._getParentFromElement(this._element);
              this._menu = pe(e).find(ke)[0]
          }
          return this._menu
      }, e._getPlacement = function() {
          var t = pe(this._element).parent(),
              e = je;
          return t.hasClass(we) ? (e = xe, pe(this._menu).hasClass(De) && (e = Re)) : t.hasClass(Ie) ? e = Me : t.hasClass(Ae) ? e = We : pe(this._menu).hasClass(De) && (e = He), e
      }, e._detectNavbar = function() {
          return pe(this._element).closest(".navbar").length > 0
      }, e._getPopperConfig = function() {
          var t = this,
              e = {};
          "function" == typeof this._config.offset ? e.fn = function(e) {
              return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
          } : e.offset = this._config.offset;
          var n = {
              placement: this._getPlacement(),
              modifiers: {
                  offset: e,
                  flip: {
                      enabled: this._config.flip
                  },
                  preventOverflow: {
                      boundariesElement: this._config.boundary
                  }
              }
          };
          return "static" === this._config.display && (n.modifiers.applyStyle = {
              enabled: !1
          }), n
      }, t._jQueryInterface = function(e) {
          return this.each(function() {
              var n = pe(this).data(me);
              if (n || (n = new t(this, "object" == typeof e ? e : null), pe(this).data(me, n)), "string" == typeof e) {
                  if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                  n[e]()
              }
          })
      }, t._clearMenus = function(e) {
          if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var n = pe.makeArray(pe(Oe)), i = 0; i < n.length; i++) {
              var r = t._getParentFromElement(n[i]),
                  o = pe(n[i]).data(me),
                  s = {
                      relatedTarget: n[i]
                  };
              if (o) {
                  var a = o._menu;
                  if (pe(r).hasClass(Ce) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && pe.contains(r, e.target))) {
                      var l = pe.Event(be.HIDE, s);
                      pe(r).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && pe(document.body).children().off("mouseover", null, pe.noop), n[i].setAttribute("aria-expanded", "false"), pe(a).removeClass(Ce), pe(r).removeClass(Ce).trigger(pe.Event(be.HIDDEN, s)))
                  }
              }
          }
      }, t._getParentFromElement = function(t) {
          var e, n = gt.getSelectorFromElement(t);
          return n && (e = pe(n)[0]), e || t.parentNode
      }, t._dataApiKeydownHandler = function(e) {
          if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || pe(e.target).closest(ke).length)) : ye.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !pe(this).hasClass(Te))) {
              var n = t._getParentFromElement(this),
                  i = pe(n).hasClass(Ce);
              if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                  var r = pe(n).find(Pe).get();
                  if (0 !== r.length) {
                      var o = r.indexOf(e.target);
                      38 === e.which && o > 0 && o--, 40 === e.which && o < r.length - 1 && o++, o < 0 && (o = 0), r[o].focus()
                  }
              } else {
                  if (27 === e.which) {
                      var s = pe(n).find(Oe)[0];
                      pe(s).trigger("focus")
                  }
                  pe(this).trigger("click")
              }
          }
      }, i(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.0.0"
          }
      }, {
          key: "Default",
          get: function() {
              return Ue
          }
      }, {
          key: "DefaultType",
          get: function() {
              return Fe
          }
      }]), t
  }(), pe(document).on(be.KEYDOWN_DATA_API, Oe, Be._dataApiKeydownHandler).on(be.KEYDOWN_DATA_API, ke, Be._dataApiKeydownHandler).on(be.CLICK_DATA_API + " " + be.KEYUP_DATA_API, Be._clearMenus).on(be.CLICK_DATA_API, Oe, function(t) {
      t.preventDefault(), t.stopPropagation(), Be._jQueryInterface.call(pe(this), "toggle")
  }).on(be.CLICK_DATA_API, Ne, function(t) {
      t.stopPropagation()
  }), pe.fn[ge] = Be._jQueryInterface, pe.fn[ge].Constructor = Be, pe.fn[ge].noConflict = function() {
      return pe.fn[ge] = Ee, Be._jQueryInterface
  }, Be),
      bi = (Ve = "modal", Ye = "." + (Qe = "bs.modal"), Ge = (Ke = e).fn[Ve], qe = {
          backdrop: !0,
          keyboard: !0,
          focus: !0,
          show: !0
      }, ze = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean",
          show: "boolean"
      }, Xe = {
          HIDE: "hide" + Ye,
          HIDDEN: "hidden" + Ye,
          SHOW: "show" + Ye,
          SHOWN: "shown" + Ye,
          FOCUSIN: "focusin" + Ye,
          RESIZE: "resize" + Ye,
          CLICK_DISMISS: "click.dismiss" + Ye,
          KEYDOWN_DISMISS: "keydown.dismiss" + Ye,
          MOUSEUP_DISMISS: "mouseup.dismiss" + Ye,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + Ye,
          CLICK_DATA_API: "click" + Ye + ".data-api"
      }, Je = "modal-scrollbar-measure", Ze = "modal-backdrop", $e = "modal-open", tn = "fade", en = "show", nn = {
          DIALOG: ".modal-dialog",
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          STICKY_CONTENT: ".sticky-top",
          NAVBAR_TOGGLER: ".navbar-toggler"
      }, rn = function() {
          function t(t, e) {
              this._config = this._getConfig(e), this._element = t, this._dialog = Ke(t).find(nn.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
          }
          var e = t.prototype;
          return e.toggle = function(t) {
              return this._isShown ? this.hide() : this.show(t)
          }, e.show = function(t) {
              var e = this;
              if (!this._isTransitioning && !this._isShown) {
                  gt.supportsTransitionEnd() && Ke(this._element).hasClass(tn) && (this._isTransitioning = !0);
                  var n = Ke.Event(Xe.SHOW, {
                      relatedTarget: t
                  });
                  Ke(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), Ke(document.body).addClass($e), this._setEscapeEvent(), this._setResizeEvent(), Ke(this._element).on(Xe.CLICK_DISMISS, nn.DATA_DISMISS, function(t) {
                      return e.hide(t)
                  }), Ke(this._dialog).on(Xe.MOUSEDOWN_DISMISS, function() {
                      Ke(e._element).one(Xe.MOUSEUP_DISMISS, function(t) {
                          Ke(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                      })
                  }), this._showBackdrop(function() {
                      return e._showElement(t)
                  }))
              }
          }, e.hide = function(t) {
              var e = this;
              if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                  var n = Ke.Event(Xe.HIDE);
                  if (Ke(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                      this._isShown = !1;
                      var i = gt.supportsTransitionEnd() && Ke(this._element).hasClass(tn);
                      i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Ke(document).off(Xe.FOCUSIN), Ke(this._element).removeClass(en), Ke(this._element).off(Xe.CLICK_DISMISS), Ke(this._dialog).off(Xe.MOUSEDOWN_DISMISS), i ? Ke(this._element).one(gt.TRANSITION_END, function(t) {
                          return e._hideModal(t)
                      }).emulateTransitionEnd(300) : this._hideModal()
                  }
              }
          }, e.dispose = function() {
              Ke.removeData(this._element, Qe), Ke(window, document, this._element, this._backdrop).off(Ye), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
          }, e.handleUpdate = function() {
              this._adjustDialog()
          }, e._getConfig = function(t) {
              return t = r({}, qe, t), gt.typeCheckConfig(Ve, t, ze), t
          }, e._showElement = function(t) {
              var e = this,
                  n = gt.supportsTransitionEnd() && Ke(this._element).hasClass(tn);
              this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && gt.reflow(this._element), Ke(this._element).addClass(en), this._config.focus && this._enforceFocus();
              var i = Ke.Event(Xe.SHOWN, {
                  relatedTarget: t
              }),
                  r = function() {
                      e._config.focus && e._element.focus(), e._isTransitioning = !1, Ke(e._element).trigger(i)
                  };
              n ? Ke(this._dialog).one(gt.TRANSITION_END, r).emulateTransitionEnd(300) : r()
          }, e._enforceFocus = function() {
              var t = this;
              Ke(document).off(Xe.FOCUSIN).on(Xe.FOCUSIN, function(e) {
                  document !== e.target && t._element !== e.target && 0 === Ke(t._element).has(e.target).length && t._element.focus()
              })
          }, e._setEscapeEvent = function() {
              var t = this;
              this._isShown && this._config.keyboard ? Ke(this._element).on(Xe.KEYDOWN_DISMISS, function(e) {
                  27 === e.which && (e.preventDefault(), t.hide())
              }) : this._isShown || Ke(this._element).off(Xe.KEYDOWN_DISMISS)
          }, e._setResizeEvent = function() {
              var t = this;
              this._isShown ? Ke(window).on(Xe.RESIZE, function(e) {
                  return t.handleUpdate(e)
              }) : Ke(window).off(Xe.RESIZE)
          }, e._hideModal = function() {
              var t = this;
              this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                  Ke(document.body).removeClass($e), t._resetAdjustments(), t._resetScrollbar(), Ke(t._element).trigger(Xe.HIDDEN)
              })
          }, e._removeBackdrop = function() {
              this._backdrop && (Ke(this._backdrop).remove(), this._backdrop = null)
          }, e._showBackdrop = function(t) {
              var e = this,
                  n = Ke(this._element).hasClass(tn) ? tn : "";
              if (this._isShown && this._config.backdrop) {
                  var i = gt.supportsTransitionEnd() && n;
                  if (this._backdrop = document.createElement("div"), this._backdrop.className = Ze, n && Ke(this._backdrop).addClass(n), Ke(this._backdrop).appendTo(document.body), Ke(this._element).on(Xe.CLICK_DISMISS, function(t) {
                      e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                  }), i && gt.reflow(this._backdrop), Ke(this._backdrop).addClass(en), !t) return;
                  if (!i) return void t();
                  Ke(this._backdrop).one(gt.TRANSITION_END, t).emulateTransitionEnd(150)
              } else if (!this._isShown && this._backdrop) {
                  Ke(this._backdrop).removeClass(en);
                  var r = function() {
                      e._removeBackdrop(), t && t()
                  };
                  gt.supportsTransitionEnd() && Ke(this._element).hasClass(tn) ? Ke(this._backdrop).one(gt.TRANSITION_END, r).emulateTransitionEnd(150) : r()
              } else t && t()
          }, e._adjustDialog = function() {
              var t = this._element.scrollHeight > document.documentElement.clientHeight;
              !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
          }, e._resetAdjustments = function() {
              this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
          }, e._checkScrollbar = function() {
              var t = document.body.getBoundingClientRect();
              this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
          }, e._setScrollbar = function() {
              var t = this;
              if (this._isBodyOverflowing) {
                  Ke(nn.FIXED_CONTENT).each(function(e, n) {
                      var i = Ke(n)[0].style.paddingRight,
                          r = Ke(n).css("padding-right");
                      Ke(n).data("padding-right", i).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                  }), Ke(nn.STICKY_CONTENT).each(function(e, n) {
                      var i = Ke(n)[0].style.marginRight,
                          r = Ke(n).css("margin-right");
                      Ke(n).data("margin-right", i).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                  }), Ke(nn.NAVBAR_TOGGLER).each(function(e, n) {
                      var i = Ke(n)[0].style.marginRight,
                          r = Ke(n).css("margin-right");
                      Ke(n).data("margin-right", i).css("margin-right", parseFloat(r) + t._scrollbarWidth + "px")
                  });
                  var e = document.body.style.paddingRight,
                      n = Ke(document.body).css("padding-right");
                  Ke(document.body).data("padding-right", e).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")
              }
          }, e._resetScrollbar = function() {
              Ke(nn.FIXED_CONTENT).each(function(t, e) {
                  var n = Ke(e).data("padding-right");
                  "undefined" != typeof n && Ke(e).css("padding-right", n).removeData("padding-right")
              }), Ke(nn.STICKY_CONTENT + ", " + nn.NAVBAR_TOGGLER).each(function(t, e) {
                  var n = Ke(e).data("margin-right");
                  "undefined" != typeof n && Ke(e).css("margin-right", n).removeData("margin-right")
              });
              var t = Ke(document.body).data("padding-right");
              "undefined" != typeof t && Ke(document.body).css("padding-right", t).removeData("padding-right")
          }, e._getScrollbarWidth = function() {
              var t = document.createElement("div");
              t.className = Je, document.body.appendChild(t);
              var e = t.getBoundingClientRect().width - t.clientWidth;
              return document.body.removeChild(t), e
          }, t._jQueryInterface = function(e, n) {
              return this.each(function() {
                  var i = Ke(this).data(Qe),
                      o = r({}, t.Default, Ke(this).data(), "object" == typeof e && e);
                  if (i || (i = new t(this, o), Ke(this).data(Qe, i)), "string" == typeof e) {
                      if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                      i[e](n)
                  } else o.show && i.show(n)
              })
          }, i(t, null, [{
              key: "VERSION",
              get: function() {
                  return "4.0.0"
              }
          }, {
              key: "Default",
              get: function() {
                  return qe
              }
          }]), t
      }(), Ke(document).on(Xe.CLICK_DATA_API, nn.DATA_TOGGLE, function(t) {
          var e, n = this,
              i = gt.getSelectorFromElement(this);
          i && (e = Ke(i)[0]);
          var o = Ke(e).data(Qe) ? "toggle" : r({}, Ke(e).data(), Ke(this).data());
          "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
          var s = Ke(e).one(Xe.SHOW, function(t) {
              t.isDefaultPrevented() || s.one(Xe.HIDDEN, function() {
                  Ke(n).is(":visible") && n.focus()
              })
          });
          rn._jQueryInterface.call(Ke(e), o, this)
      }), Ke.fn[Ve] = rn._jQueryInterface, Ke.fn[Ve].Constructor = rn, Ke.fn[Ve].noConflict = function() {
          return Ke.fn[Ve] = Ge, rn._jQueryInterface
      }, rn),
      Ti = (sn = "tooltip", ln = "." + (an = "bs.tooltip"), cn = (on = e).fn[sn], hn = "bs-tooltip", fn = new RegExp("(^|\\s)" + hn + "\\S+", "g"), un = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)"
      }, dn = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left"
      }, pn = {
          animation: !0,
          template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: !1,
          selector: !1,
          placement: "top",
          offset: 0,
          container: !1,
          fallbackPlacement: "flip",
          boundary: "scrollParent"
      }, gn = "show", mn = "out", _n = {
          HIDE: "hide" + ln,
          HIDDEN: "hidden" + ln,
          SHOW: "show" + ln,
          SHOWN: "shown" + ln,
          INSERTED: "inserted" + ln,
          CLICK: "click" + ln,
          FOCUSIN: "focusin" + ln,
          FOCUSOUT: "focusout" + ln,
          MOUSEENTER: "mouseenter" + ln,
          MOUSELEAVE: "mouseleave" + ln
      }, vn = "fade", En = "show", yn = ".tooltip-inner", bn = ".arrow", Tn = "hover", Cn = "focus", wn = "click", In = "manual", An = function() {
          function t(t, e) {
              if ("undefined" == typeof de) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
              this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
          }
          var e = t.prototype;
          return e.enable = function() {
              this._isEnabled = !0
          }, e.disable = function() {
              this._isEnabled = !1
          }, e.toggleEnabled = function() {
              this._isEnabled = !this._isEnabled
          }, e.toggle = function(t) {
              if (this._isEnabled) if (t) {
                  var e = this.constructor.DATA_KEY,
                      n = on(t.currentTarget).data(e);
                  n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), on(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
              } else {
                  if (on(this.getTipElement()).hasClass(En)) return void this._leave(null, this);
                  this._enter(null, this)
              }
          }, e.dispose = function() {
              clearTimeout(this._timeout), on.removeData(this.element, this.constructor.DATA_KEY), on(this.element).off(this.constructor.EVENT_KEY), on(this.element).closest(".modal").off("hide.bs.modal"), this.tip && on(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
          }, e.show = function() {
              var e = this;
              if ("none" === on(this.element).css("display")) throw new Error("Please use show on visible elements");
              var n = on.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                  on(this.element).trigger(n);
                  var i = on.contains(this.element.ownerDocument.documentElement, this.element);
                  if (n.isDefaultPrevented() || !i) return;
                  var r = this.getTipElement(),
                      o = gt.getUID(this.constructor.NAME);
                  r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && on(r).addClass(vn);
                  var s = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                      a = this._getAttachment(s);
                  this.addAttachmentClass(a);
                  var l = !1 === this.config.container ? document.body : on(this.config.container);
                  on(r).data(this.constructor.DATA_KEY, this), on.contains(this.element.ownerDocument.documentElement, this.tip) || on(r).appendTo(l), on(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new de(this.element, r, {
                      placement: a,
                      modifiers: {
                          offset: {
                              offset: this.config.offset
                          },
                          flip: {
                              behavior: this.config.fallbackPlacement
                          },
                          arrow: {
                              element: bn
                          },
                          preventOverflow: {
                              boundariesElement: this.config.boundary
                          }
                      },
                      onCreate: function(t) {
                          t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                      },
                      onUpdate: function(t) {
                          e._handlePopperPlacementChange(t)
                      }
                  }), on(r).addClass(En), "ontouchstart" in document.documentElement && on(document.body).children().on("mouseover", null, on.noop);
                  var c = function() {
                      e.config.animation && e._fixTransition();
                      var t = e._hoverState;
                      e._hoverState = null, on(e.element).trigger(e.constructor.Event.SHOWN), t === mn && e._leave(null, e)
                  };
                  gt.supportsTransitionEnd() && on(this.tip).hasClass(vn) ? on(this.tip).one(gt.TRANSITION_END, c).emulateTransitionEnd(t._TRANSITION_DURATION) : c()
              }
          }, e.hide = function(t) {
              var e = this,
                  n = this.getTipElement(),
                  i = on.Event(this.constructor.Event.HIDE),
                  r = function() {
                      e._hoverState !== gn && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), on(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                  };
              on(this.element).trigger(i), i.isDefaultPrevented() || (on(n).removeClass(En), "ontouchstart" in document.documentElement && on(document.body).children().off("mouseover", null, on.noop), this._activeTrigger[wn] = !1, this._activeTrigger[Cn] = !1, this._activeTrigger[Tn] = !1, gt.supportsTransitionEnd() && on(this.tip).hasClass(vn) ? on(n).one(gt.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
          }, e.update = function() {
              null !== this._popper && this._popper.scheduleUpdate()
          }, e.isWithContent = function() {
              return Boolean(this.getTitle())
          }, e.addAttachmentClass = function(t) {
              on(this.getTipElement()).addClass(hn + "-" + t)
          }, e.getTipElement = function() {
              return this.tip = this.tip || on(this.config.template)[0], this.tip
          }, e.setContent = function() {
              var t = on(this.getTipElement());
              this.setElementContent(t.find(yn), this.getTitle()), t.removeClass(vn + " " + En)
          }, e.setElementContent = function(t, e) {
              var n = this.config.html;
              "object" == typeof e && (e.nodeType || e.jquery) ? n ? on(e).parent().is(t) || t.empty().append(e) : t.text(on(e).text()) : t[n ? "html" : "text"](e)
          }, e.getTitle = function() {
              var t = this.element.getAttribute("data-original-title");
              return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
          }, e._getAttachment = function(t) {
              return dn[t.toUpperCase()]
          }, e._setListeners = function() {
              var t = this;
              this.config.trigger.split(" ").forEach(function(e) {
                  if ("click" === e) on(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                      return t.toggle(e)
                  });
                  else if (e !== In) {
                      var n = e === Tn ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                          i = e === Tn ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                      on(t.element).on(n, t.config.selector, function(e) {
                          return t._enter(e)
                      }).on(i, t.config.selector, function(e) {
                          return t._leave(e)
                      })
                  }
                  on(t.element).closest(".modal").on("hide.bs.modal", function() {
                      return t.hide()
                  })
              }), this.config.selector ? this.config = r({}, this.config, {
                  trigger: "manual",
                  selector: ""
              }) : this._fixTitle()
          }, e._fixTitle = function() {
              var t = typeof this.element.getAttribute("data-original-title");
              (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
          }, e._enter = function(t, e) {
              var n = this.constructor.DATA_KEY;
              (e = e || on(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), on(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Cn : Tn] = !0), on(e.getTipElement()).hasClass(En) || e._hoverState === gn ? e._hoverState = gn : (clearTimeout(e._timeout), e._hoverState = gn, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                  e._hoverState === gn && e.show()
              }, e.config.delay.show) : e.show())
          }, e._leave = function(t, e) {
              var n = this.constructor.DATA_KEY;
              (e = e || on(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), on(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Cn : Tn] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = mn, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                  e._hoverState === mn && e.hide()
              }, e.config.delay.hide) : e.hide())
          }, e._isWithActiveTrigger = function() {
              for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
              return !1
          }, e._getConfig = function(t) {
              return "number" == typeof(t = r({}, this.constructor.Default, on(this.element).data(), t)).delay && (t.delay = {
                  show: t.delay,
                  hide: t.delay
              }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), gt.typeCheckConfig(sn, t, this.constructor.DefaultType), t
          }, e._getDelegateConfig = function() {
              var t = {};
              if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
              return t
          }, e._cleanTipClass = function() {
              var t = on(this.getTipElement()),
                  e = t.attr("class").match(fn);
              null !== e && e.length > 0 && t.removeClass(e.join(""))
          }, e._handlePopperPlacementChange = function(t) {
              this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
          }, e._fixTransition = function() {
              var t = this.getTipElement(),
                  e = this.config.animation;
              null === t.getAttribute("x-placement") && (on(t).removeClass(vn), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
          }, t._jQueryInterface = function(e) {
              return this.each(function() {
                  var n = on(this).data(an),
                      i = "object" == typeof e && e;
                  if ((n || !/dispose|hide/.test(e)) && (n || (n = new t(this, i), on(this).data(an, n)), "string" == typeof e)) {
                      if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                      n[e]()
                  }
              })
          }, i(t, null, [{
              key: "VERSION",
              get: function() {
                  return "4.0.0"
              }
          }, {
              key: "Default",
              get: function() {
                  return pn
              }
          }, {
              key: "NAME",
              get: function() {
                  return sn
              }
          }, {
              key: "DATA_KEY",
              get: function() {
                  return an
              }
          }, {
              key: "Event",
              get: function() {
                  return _n
              }
          }, {
              key: "EVENT_KEY",
              get: function() {
                  return ln
              }
          }, {
              key: "DefaultType",
              get: function() {
                  return un
              }
          }]), t
      }(), on.fn[sn] = An._jQueryInterface, on.fn[sn].Constructor = An, on.fn[sn].noConflict = function() {
          return on.fn[sn] = cn, An._jQueryInterface
      }, An),
      Ci = (Sn = "popover", Nn = "." + (On = "bs.popover"), kn = (Dn = e).fn[Sn], Ln = "bs-popover", Pn = new RegExp("(^|\\s)" + Ln + "\\S+", "g"), xn = r({}, Ti.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      }), Rn = r({}, Ti.DefaultType, {
          content: "(string|element|function)"
      }), jn = "fade", Hn = "show", Mn = ".popover-header", Wn = ".popover-body", Un = {
          HIDE: "hide" + Nn,
          HIDDEN: "hidden" + Nn,
          SHOW: "show" + Nn,
          SHOWN: "shown" + Nn,
          INSERTED: "inserted" + Nn,
          CLICK: "click" + Nn,
          FOCUSIN: "focusin" + Nn,
          FOCUSOUT: "focusout" + Nn,
          MOUSEENTER: "mouseenter" + Nn,
          MOUSELEAVE: "mouseleave" + Nn
      }, Fn = function(t) {
          var e, n;

          function r() {
              return t.apply(this, arguments) || this
          }
          n = t, (e = r).prototype = Object.create(n.prototype), e.prototype.constructor = e, e.__proto__ = n;
          var o = r.prototype;
          return o.isWithContent = function() {
              return this.getTitle() || this._getContent()
          }, o.addAttachmentClass = function(t) {
              Dn(this.getTipElement()).addClass(Ln + "-" + t)
          }, o.getTipElement = function() {
              return this.tip = this.tip || Dn(this.config.template)[0], this.tip
          }, o.setContent = function() {
              var t = Dn(this.getTipElement());
              this.setElementContent(t.find(Mn), this.getTitle());
              var e = this._getContent();
              "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(Wn), e), t.removeClass(jn + " " + Hn)
          }, o._getContent = function() {
              return this.element.getAttribute("data-content") || this.config.content
          }, o._cleanTipClass = function() {
              var t = Dn(this.getTipElement()),
                  e = t.attr("class").match(Pn);
              null !== e && e.length > 0 && t.removeClass(e.join(""))
          }, r._jQueryInterface = function(t) {
              return this.each(function() {
                  var e = Dn(this).data(On),
                      n = "object" == typeof t ? t : null;
                  if ((e || !/destroy|hide/.test(t)) && (e || (e = new r(this, n), Dn(this).data(On, e)), "string" == typeof t)) {
                      if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
                      e[t]()
                  }
              })
          }, i(r, null, [{
              key: "VERSION",
              get: function() {
                  return "4.0.0"
              }
          }, {
              key: "Default",
              get: function() {
                  return xn
              }
          }, {
              key: "NAME",
              get: function() {
                  return Sn
              }
          }, {
              key: "DATA_KEY",
              get: function() {
                  return On
              }
          }, {
              key: "Event",
              get: function() {
                  return Un
              }
          }, {
              key: "EVENT_KEY",
              get: function() {
                  return Nn
              }
          }, {
              key: "DefaultType",
              get: function() {
                  return Rn
              }
          }]), r
      }(Ti), Dn.fn[Sn] = Fn._jQueryInterface, Dn.fn[Sn].Constructor = Fn, Dn.fn[Sn].noConflict = function() {
          return Dn.fn[Sn] = kn, Fn._jQueryInterface
      }, Fn),
      wi = (Kn = "scrollspy", Qn = "." + (Vn = "bs.scrollspy"), Yn = (Bn = e).fn[Kn], Gn = {
          offset: 10,
          method: "auto",
          target: ""
      }, qn = {
          offset: "number",
          method: "string",
          target: "(string|element)"
      }, zn = {
          ACTIVATE: "activate" + Qn,
          SCROLL: "scroll" + Qn,
          LOAD_DATA_API: "load" + Qn + ".data-api"
      }, Xn = "dropdown-item", Jn = "active", Zn = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: ".active",
          NAV_LIST_GROUP: ".nav, .list-group",
          NAV_LINKS: ".nav-link",
          NAV_ITEMS: ".nav-item",
          LIST_ITEMS: ".list-group-item",
          DROPDOWN: ".dropdown",
          DROPDOWN_ITEMS: ".dropdown-item",
          DROPDOWN_TOGGLE: ".dropdown-toggle"
      }, $n = "offset", ti = "position", ei = function() {
          function t(t, e) {
              var n = this;
              this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + Zn.NAV_LINKS + "," + this._config.target + " " + Zn.LIST_ITEMS + "," + this._config.target + " " + Zn.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, Bn(this._scrollElement).on(zn.SCROLL, function(t) {
                  return n._process(t)
              }), this.refresh(), this._process()
          }
          var e = t.prototype;
          return e.refresh = function() {
              var t = this,
                  e = this._scrollElement === this._scrollElement.window ? $n : ti,
                  n = "auto" === this._config.method ? e : this._config.method,
                  i = n === ti ? this._getScrollTop() : 0;
              this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), Bn.makeArray(Bn(this._selector)).map(function(t) {
                  var e, r = gt.getSelectorFromElement(t);
                  if (r && (e = Bn(r)[0]), e) {
                      var o = e.getBoundingClientRect();
                      if (o.width || o.height) return [Bn(e)[n]().top + i, r]
                  }
                  return null
              }).filter(function(t) {
                  return t
              }).sort(function(t, e) {
                  return t[0] - e[0]
              }).forEach(function(e) {
                  t._offsets.push(e[0]), t._targets.push(e[1])
              })
          }, e.dispose = function() {
              Bn.removeData(this._element, Vn), Bn(this._scrollElement).off(Qn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
          }, e._getConfig = function(t) {
              if ("string" != typeof(t = r({}, Gn, t)).target) {
                  var e = Bn(t.target).attr("id");
                  e || (e = gt.getUID(Kn), Bn(t.target).attr("id", e)), t.target = "#" + e
              }
              return gt.typeCheckConfig(Kn, t, qn), t
          }, e._getScrollTop = function() {
              return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
          }, e._getScrollHeight = function() {
              return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
          }, e._getOffsetHeight = function() {
              return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
          }, e._process = function() {
              var t = this._getScrollTop() + this._config.offset,
                  e = this._getScrollHeight(),
                  n = this._config.offset + e - this._getOffsetHeight();
              if (this._scrollHeight !== e && this.refresh(), t >= n) {
                  var i = this._targets[this._targets.length - 1];
                  this._activeTarget !== i && this._activate(i)
              } else {
                  if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                  for (var r = this._offsets.length; r--;) {
                      this._activeTarget !== this._targets[r] && t >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                  }
              }
          }, e._activate = function(t) {
              this._activeTarget = t, this._clear();
              var e = this._selector.split(",");
              e = e.map(function(e) {
                  return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
              });
              var n = Bn(e.join(","));
              n.hasClass(Xn) ? (n.closest(Zn.DROPDOWN).find(Zn.DROPDOWN_TOGGLE).addClass(Jn), n.addClass(Jn)) : (n.addClass(Jn), n.parents(Zn.NAV_LIST_GROUP).prev(Zn.NAV_LINKS + ", " + Zn.LIST_ITEMS).addClass(Jn), n.parents(Zn.NAV_LIST_GROUP).prev(Zn.NAV_ITEMS).children(Zn.NAV_LINKS).addClass(Jn)), Bn(this._scrollElement).trigger(zn.ACTIVATE, {
                  relatedTarget: t
              })
          }, e._clear = function() {
              Bn(this._selector).filter(Zn.ACTIVE).removeClass(Jn)
          }, t._jQueryInterface = function(e) {
              return this.each(function() {
                  var n = Bn(this).data(Vn);
                  if (n || (n = new t(this, "object" == typeof e && e), Bn(this).data(Vn, n)), "string" == typeof e) {
                      if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                      n[e]()
                  }
              })
          }, i(t, null, [{
              key: "VERSION",
              get: function() {
                  return "4.0.0"
              }
          }, {
              key: "Default",
              get: function() {
                  return Gn
              }
          }]), t
      }(), Bn(window).on(zn.LOAD_DATA_API, function() {
          for (var t = Bn.makeArray(Bn(Zn.DATA_SPY)), e = t.length; e--;) {
              var n = Bn(t[e]);
              ei._jQueryInterface.call(n, n.data())
          }
      }), Bn.fn[Kn] = ei._jQueryInterface, Bn.fn[Kn].Constructor = ei, Bn.fn[Kn].noConflict = function() {
          return Bn.fn[Kn] = Yn, ei._jQueryInterface
      }, ei),
      Ii = (ri = "." + (ii = "bs.tab"), oi = (ni = e).fn.tab, si = {
          HIDE: "hide" + ri,
          HIDDEN: "hidden" + ri,
          SHOW: "show" + ri,
          SHOWN: "shown" + ri,
          CLICK_DATA_API: "click" + ri + ".data-api"
      }, ai = "dropdown-menu", li = "active", ci = "disabled", hi = "fade", fi = "show", ui = ".dropdown", di = ".nav, .list-group", pi = ".active", gi = "> li > .active", mi = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', _i = ".dropdown-toggle", vi = "> .dropdown-menu .active", Ei = function() {
          function t(t) {
              this._element = t
          }
          var e = t.prototype;
          return e.show = function() {
              var t = this;
              if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && ni(this._element).hasClass(li) || ni(this._element).hasClass(ci))) {
                  var e, n, i = ni(this._element).closest(di)[0],
                      r = gt.getSelectorFromElement(this._element);
                  if (i) {
                      var o = "UL" === i.nodeName ? gi : pi;
                      n = (n = ni.makeArray(ni(i).find(o)))[n.length - 1]
                  }
                  var s = ni.Event(si.HIDE, {
                      relatedTarget: this._element
                  }),
                      a = ni.Event(si.SHOW, {
                          relatedTarget: n
                      });
                  if (n && ni(n).trigger(s), ni(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                      r && (e = ni(r)[0]), this._activate(this._element, i);
                      var l = function() {
                          var e = ni.Event(si.HIDDEN, {
                              relatedTarget: t._element
                          }),
                              i = ni.Event(si.SHOWN, {
                                  relatedTarget: n
                              });
                          ni(n).trigger(e), ni(t._element).trigger(i)
                      };
                      e ? this._activate(e, e.parentNode, l) : l()
                  }
              }
          }, e.dispose = function() {
              ni.removeData(this._element, ii), this._element = null
          }, e._activate = function(t, e, n) {
              var i = this,
                  r = ("UL" === e.nodeName ? ni(e).find(gi) : ni(e).children(pi))[0],
                  o = n && gt.supportsTransitionEnd() && r && ni(r).hasClass(hi),
                  s = function() {
                      return i._transitionComplete(t, r, n)
                  };
              r && o ? ni(r).one(gt.TRANSITION_END, s).emulateTransitionEnd(150) : s()
          }, e._transitionComplete = function(t, e, n) {
              if (e) {
                  ni(e).removeClass(fi + " " + li);
                  var i = ni(e.parentNode).find(vi)[0];
                  i && ni(i).removeClass(li), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
              }
              if (ni(t).addClass(li), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), gt.reflow(t), ni(t).addClass(fi), t.parentNode && ni(t.parentNode).hasClass(ai)) {
                  var r = ni(t).closest(ui)[0];
                  r && ni(r).find(_i).addClass(li), t.setAttribute("aria-expanded", !0)
              }
              n && n()
          }, t._jQueryInterface = function(e) {
              return this.each(function() {
                  var n = ni(this),
                      i = n.data(ii);
                  if (i || (i = new t(this), n.data(ii, i)), "string" == typeof e) {
                      if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                      i[e]()
                  }
              })
          }, i(t, null, [{
              key: "VERSION",
              get: function() {
                  return "4.0.0"
              }
          }]), t
      }(), ni(document).on(si.CLICK_DATA_API, mi, function(t) {
          t.preventDefault(), Ei._jQueryInterface.call(ni(this), "show")
      }), ni.fn.tab = Ei._jQueryInterface, ni.fn.tab.Constructor = Ei, ni.fn.tab.noConflict = function() {
          return ni.fn.tab = oi, Ei._jQueryInterface
      }, Ei);
  ! function(t) {
      if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var e = t.fn.jquery.split(" ")[0].split(".");
      if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
  }(e), t.Util = gt, t.Alert = mt, t.Button = _t, t.Carousel = vt, t.Collapse = Et, t.Dropdown = yi, t.Modal = bi, t.Popover = Ci, t.Scrollspy = wi, t.Tab = Ii, t.Tooltip = Ti, Object.defineProperty(t, "__esModule", {
      value: !0
  })
});
//# sourceMappingURL=bootstrap.bundle.min.js.map
;!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
;/*!
Zoom 1.7.21
license: MIT
http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.setAttribute("role","presentation"),a.alt="",a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);;/*!
* JavaScript Cookie v2.1.3
* https://github.com/js-cookie/js-cookie
*
* Copyright 2006, 2015 Klaus Hartl & Fagner Brack
* Released under the MIT license
*/
;(function (factory) {
var registeredInModuleLoader = false;
if (typeof define === 'function' && define.amd) {
  define(factory);
  registeredInModuleLoader = true;
}
if (typeof exports === 'object') {
  module.exports = factory();
  registeredInModuleLoader = true;
}
if (!registeredInModuleLoader) {
  var OldCookies = window.Cookies;
  var api = window.Cookies = factory();
  api.noConflict = function () {
    window.Cookies = OldCookies;
    return api;
  };
}
}(function () {
function extend () {
  var i = 0;
  var result = {};
  for (; i < arguments.length; i++) {
    var attributes = arguments[ i ];
    for (var key in attributes) {
      result[key] = attributes[key];
    }
  }
  return result;
}

function init (converter) {
  function api (key, value, attributes) {
    var result;
    if (typeof document === 'undefined') {
      return;
    }

    // Write

    if (arguments.length > 1) {
      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        var expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
        attributes.expires = expires;
      }

      try {
        result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      if (!converter.write) {
        value = encodeURIComponent(String(value))
          .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      } else {
        value = converter.write(value, key);
      }

      key = encodeURIComponent(String(key));
      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
      key = key.replace(/[\(\)]/g, escape);

      return (document.cookie = [
        key, '=', value,
        attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        attributes.path ? '; path=' + attributes.path : '',
        attributes.domain ? '; domain=' + attributes.domain : '',
        attributes.secure ? '; secure' : ''
      ].join(''));
    }

    // Read

    if (!key) {
      result = {};
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling "get()"
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var rdecode = /(%[0-9A-Z]{2})+/g;
    var i = 0;

    for (; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var cookie = parts.slice(1).join('=');

      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }

      try {
        var name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = converter.read ?
          converter.read(cookie, name) : converter(cookie, name) ||
          cookie.replace(rdecode, decodeURIComponent);

        if (this.json) {
          try {
            cookie = JSON.parse(cookie);
          } catch (e) {}
        }

        if (key === name) {
          result = cookie;
          break;
        }

        if (!key) {
          result[name] = cookie;
        }
      } catch (e) {}
    }

    return result;
  }

  api.set = api;
  api.get = function (key) {
    return api.call(api, key);
  };
  api.getJSON = function () {
    return api.apply({
      json: true
    }, [].slice.call(arguments));
  };
  api.defaults = {};

  api.remove = function (key, attributes) {
    api(key, '', extend(attributes, {
      expires: -1
    }));
  };

  api.withConverter = init;

  return api;
}

return init(function () {});
}));
;/*!
* Flickity PACKAGED v2.0.5
* Touch, responsive, flickable carousels
*
* Licensed GPLv3 for open source use
* or Flickity Commercial License for commercial use
*
* http://flickity.metafizzy.co
* Copyright 2016 Metafizzy
*/

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,o,a){function l(t,e,n){var s,o="$()."+i+'("'+e+'")';return t.each(function(t,l){var h=a.data(l,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+o);var c=h[e];if(!c||"_"==e.charAt(0))return void r(o+" is not a valid method");var d=c.apply(h,n);s=void 0===s?d:s}),void 0!==s?s:t}function h(t,e){t.each(function(t,n){var s=a.data(n,i);s?(s.option(e),s._init()):(s=new o(n,e),a.data(n,i,s))})}a=a||e||t.jQuery,a&&(o.prototype.option||(o.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=s.call(arguments,1);return l(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var s=Array.prototype.slice,o=t.console,r="undefined"==typeof o?function(){}:function(t){o.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,s=i[n];e=e||[];for(var o=this._onceEvents&&this._onceEvents[t];s;){var r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e),n+=r?0:1,s=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=l[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function s(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var s=n(e);o.isBoxSizeOuter=r=200==t(s.width),i.removeChild(e)}}function o(e){if(s(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var o=n(e);if("none"==o.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var c=a.isBorderBox="border-box"==o.boxSizing,d=0;d<h;d++){var u=l[d],f=o[u],p=parseFloat(f);a[u]=isNaN(p)?0:p}var v=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,m=a.marginLeft+a.marginRight,y=a.marginTop+a.marginBottom,S=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,b=c&&r,x=t(o.width);x!==!1&&(a.width=x+(b?0:v+S));var C=t(o.height);return C!==!1&&(a.height=C+(b?0:g+E)),a.innerWidth=a.width-(v+S),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+m,a.outerHeight=a.height+y,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},l=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=l.length,c=!1;return o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],s=n+"MatchesSelector";if(t[s])return s}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var s=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void s.push(t);e(t,n)&&s.push(t);for(var i=t.querySelectorAll(n),o=0;o<i.length;o++)s.push(i[o])}}),s},i.debounceMethod=function(t,e,i){var n=t.prototype[e],s=e+"Timeout";t.prototype[e]=function(){var t=this[s];t&&clearTimeout(t);var e=arguments,o=this;this[s]=setTimeout(function(){n.apply(o,e),delete o[s]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,s){i.docReady(function(){var o=i.toDashed(s),r="data-"+o,a=document.querySelectorAll("["+r+"]"),l=document.querySelectorAll(".js-"+o),h=i.makeArray(a).concat(i.makeArray(l)),c=r+"-options",d=t.jQuery;h.forEach(function(t){var i,o=t.getAttribute(r)||t.getAttribute(c);try{i=o&&JSON.parse(o)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var l=new e(t,i);d&&d.data(t,s,l)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.x=0,this.shift=0},n.destroy=function(){this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.changeSelectedClass("add")},e.unselect=function(){this.changeSelectedClass("remove")},e.changeSelectedClass=function(t){this.cells.forEach(function(e){e.element.classList[t]("is-selected")})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.fizzyUIUtils))}(window,function(t,e){var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame,n=0;i||(i=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),s=setTimeout(t,i);return n=e+i,s});var s={};s.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},s.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;i(function(){e.animate()})}};var o=function(){var t=document.documentElement.style;return"string"==typeof t.transform?"transform":"WebkitTransform"}();return s.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&o?-t:t;var i=this.getPositionValue(t);this.slider.style[o]=this.isAnimating?"translate3d("+i+",0,0)":"translateX("+i+")";var n=this.slides[0];if(n){var s=-this.x-n.target,r=s/this.slidesWidth;this.dispatchEvent("scroll",null,[r,s])}},s.positionSliderAtSelected=function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.positionSlider())},s.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},s.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle"))},s.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},s._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n],o=e>0?i:0;s.wrapShift(o),e-=s.size.outerWidth}},s._unshiftCells=function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},s.integratePhysics=function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},s.applyForce=function(t){this.velocity+=t},s.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},s.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},s.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},s.applySelectedAttraction=function(){if(!this.isPointerDown&&!this.isFreeScrolling&&this.cells.length){var t=this.selectedSlide.target*-1-this.x,e=t*this.options.selectedAttraction;this.applyForce(e)}},s}),function(t,e){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(i,n,s,o,r,a){return e(t,i,n,s,o,r,a)});else if("object"==typeof module&&module.exports)module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,i.Cell,i.Slide,i.animatePrototype)}}(window,function(t,e,i,n,s,o,r){function a(t,e){for(t=n.makeArray(t);t.length;)e.appendChild(t.shift())}function l(t,e){var i=n.getQueryElement(t);if(!i)return void(d&&d.error("Bad element for Flickity: "+(i||t)));if(this.element=i,this.element.flickityGUID){var s=f[this.element.flickityGUID];return s.option(e),s}h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e),this._create()}var h=t.jQuery,c=t.getComputedStyle,d=t.console,u=0,f={};l.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},l.createMethods=[];var p=l.prototype;n.extend(p,e.prototype),p._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&t.addEventListener("resize",this),l.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){n.extend(this.options,t)},p.activate=function(){if(!this.isActive){this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize();var t=this._filterFindCellElements(this.element.children);a(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate");var e,i=this.options.initialIndex;e=this.isInitActivated?this.selectedIndex:void 0!==i&&this.cells[i]?i:0,this.select(e,!1,!0),this.isInitActivated=!0}},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return n.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){var e=this._filterFindCellElements(t),i=e.map(function(t){return new s(t,this)},this);return i},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,s=t;s<n;s++){var o=this.cells[s];o.setPosition(e),e+=o.size.outerWidth,this.maxCellHeight=Math.max(o.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var t=new o(this);this.slides.push(t);var e="left"==this.originSide,i=e?"marginRight":"marginLeft",n=this._getCanCellFit();this.cells.forEach(function(e,s){if(!t.cells.length)return void t.addCell(e);var r=t.outerWidth-t.firstMargin+(e.size.outerWidth-e.size[i]);n.call(this,s,r)?t.addCell(e):(t.updateTarget(),t=new o(this),this.slides.push(t),t.addCell(e))},this),t.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!==0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=i(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];t>0;){var s=this.cells[e];if(!s)break;n.push(s),e+=i,t-=s.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],s=n<this.size.innerWidth,o=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){s?t.target=n*this.cellAlign:(t.target=Math.max(t.target,o),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var o=h.Event(e);o.type=t,s=o}this.$element.trigger(s,i)}},p.select=function(t,e,i){this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=n.modulo(t,this.slides.length)),this.slides[t]&&(this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select"),this.dispatchEvent("cellSelect")))},p._wrapSelect=function(t){var e=this.slides.length,i=this.options.wrapAround&&e>1;if(!i)return t;var s=n.modulo(t,e),o=Math.abs(s-this.selectedIndex),r=Math.abs(s+e-this.selectedIndex),a=Math.abs(s-e-this.selectedIndex);!this.isDragSelect&&r<o?t+=e:!this.isDragSelect&&a<o&&(t-=e),t<0?this.x-=this.slideableWidth:t>=e&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),this.selectedSlide=t,t.select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectCell=function(t,e,i){var n;"number"==typeof t?n=this.cells[t]:("string"==typeof t&&(t=this.element.querySelector(t)),n=this.getCell(t));for(var s=0;n&&s<this.slides.length;s++){var o=this.slides[s],r=o.cells.indexOf(n);if(r!=-1)return void this.select(s,e,i)}},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getCell(t);i&&e.push(i)},this),e},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=n.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(1+2*t>=i)return this.getCellElements();for(var s=[],o=e-t;o<=e+t;o++){var r=this.options.wrapAround?n.modulo(o,i):o,a=this.slides[r];a&&(s=s.concat(a.getCellElements()))}return s},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){this.emitEvent("childUIPointerDown",[t])},p.onresize=function(){this.watchCSS(),this.resize()},n.debounceMethod(l,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=n.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=c(this.element,":after").content;e.indexOf("flickity")!=-1?this.activate():this.deactivate()}},p.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?"next":"previous";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?"previous":"next";this.uiChange(),this[i]()}},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.cells.forEach(function(t){t.destroy()}),this.unselectSelectedSlide(),this.element.removeChild(this.viewport),a(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),t.removeEventListener("resize",this),this.emitEvent("destroy"),h&&this.$element&&h.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete f[this.guid]},n.extend(p,r),l.data=function(t){t=n.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},n.htmlInit(l,"flickity"),h&&h.bridget&&h.bridget("flickity",l),l.Cell=s,l}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindStartEvent=function(t){this._bindStartEvent(t,!0)},s.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},s._bindStartEvent=function(e,i){i=void 0===i||!!i;var n=i?"addEventListener":"removeEventListener";t.navigator.pointerEnabled?e[n]("pointerdown",this):t.navigator.msPointerEnabled?e[n]("MSPointerDown",this):(e[n]("mousedown",this),e[n]("touchstart",this))},s.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},s.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},s.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},s.onMSPointerDown=s.onpointerdown=function(t){this._pointerDown(t,t)},s._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},s.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return s._bindPostStartEvents=function(e){if(e){var i=o[e.type];i.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=i}},s._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},s.onmousemove=function(t){this._pointerMove(t,t)},s.onMSPointerMove=s.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},s.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},s._pointerMove=function(t,e){this.pointerMove(t,e)},s.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},s.onmouseup=function(t){this._pointerUp(t,t)},s.onMSPointerUp=s.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},s.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},s._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},s._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},s.pointerDone=i,s.onMSPointerCancel=s.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},s.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},s._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},s.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.Unidragger=e(t,t.Unipointer)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindHandles=function(){this._bindHandles(!0)},s.unbindHandles=function(){this._bindHandles(!1)};var o=t.navigator;return s._bindHandles=function(t){t=void 0===t||!!t;var e;e=o.pointerEnabled?function(e){e.style.touchAction=t?"none":""}:o.msPointerEnabled?function(e){e.style.msTouchAction=t?"none":""}:i;for(var n=t?"addEventListener":"removeEventListener",s=0;s<this.handles.length;s++){var r=this.handles[s];this._bindStartEvent(r,t),e(r),r[n]("click",this)}},s.pointerDown=function(t,e){if("INPUT"==t.target.nodeName&&"range"==t.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(t,e);var i=document.activeElement;i&&i.blur&&i.blur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])},s._dragPointerDown=function(t,i){this.pointerDownPoint=e.getPointerPoint(i);var n=this.canPreventDefaultOnPointerDown(t,i);n&&t.preventDefault()},s.canPreventDefaultOnPointerDown=function(t){return"SELECT"!=t.target.nodeName},s.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},s._dragPointerMove=function(t,i){var n=e.getPointerPoint(i),s={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(s)&&this._dragStart(t,i),s},s.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},s._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},s._dragStart=function(t,i){this.isDragging=!0,this.dragStartPoint=e.getPointerPoint(i),this.isPreventingClicks=!0,this.dragStart(t,i)},s.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},s._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},s.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},s._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},s.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},s.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},s._staticClick=function(t,e){if(!this.isIgnoringMouseUp||"mouseup"!=t.type){var i=t.target.nodeName;"INPUT"!=i&&"TEXTAREA"!=i||t.target.focus(),this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400))}},s.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},n.getPointerPoint=e.getPointerPoint,n}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(){return{x:t.pageXOffset,y:t.pageYOffset}}n.extend(e.defaults,{draggable:!0,dragThreshold:3}),e.createMethods.push("_createDrag");var o=e.prototype;n.extend(o,i.prototype);var r="createTouch"in document,a=!1;o._createDrag=function(){this.on("activate",this.bindDrag),this.on("uiChange",this._uiChangeDrag),this.on("childUIPointerDown",this._childUIPointerDownDrag),this.on("deactivate",this.unbindDrag),r&&!a&&(t.addEventListener("touchmove",function(){}),a=!0)},o.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(this.element.classList.add("is-draggable"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},o.unbindDrag=function(){this.isDragBound&&(this.element.classList.remove("is-draggable"),this.unbindHandles(),delete this.isDragBound)},o._uiChangeDrag=function(){delete this.isFreeScrolling},o._childUIPointerDownDrag=function(t){t.preventDefault(),this.pointerDownFocus(t)};var l={TEXTAREA:!0,INPUT:!0,OPTION:!0},h={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};o.pointerDown=function(e,i){var n=l[e.target.nodeName]&&!h[e.target.type];if(n)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(e,i);var o=document.activeElement;o&&o.blur&&o!=this.element&&o!=document.body&&o.blur(),this.pointerDownFocus(e),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this._bindPostStartEvents(e),this.pointerDownScroll=s(),t.addEventListener("scroll",this),this.dispatchEvent("pointerDown",e,[i])};var c={touchstart:!0,MSPointerDown:!0},d={INPUT:!0,SELECT:!0};return o.pointerDownFocus=function(e){if(this.options.accessibility&&!c[e.type]&&!d[e.target.nodeName]){var i=t.pageYOffset;this.element.focus(),t.pageYOffset!=i&&t.scrollTo(t.pageXOffset,i)}},o.canPreventDefaultOnPointerDown=function(t){var e="touchstart"==t.type,i=t.target.nodeName;return!e&&"SELECT"!=i},o.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},o.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},o.pointerDone=function(){t.removeEventListener("scroll",this),delete this.pointerDownScroll},o.dragStart=function(e,i){this.dragStartPosition=this.x,this.startAnimation(),t.removeEventListener("scroll",this),this.dispatchEvent("dragStart",e,[i])},o.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},o.dragMove=function(t,e,i){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var o=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>o?.5*(s+o):s;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<r?.5*(s+r):s}this.dragX=s,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])},o.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])},o.dragEndRestingSelect=function(){
var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),s=i.distance<n.distance?i.index:n.index;return s},o._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,s=1/0,o=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};o(e,s)&&(n+=i,s=e,e=this.getSlideDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:s,index:n-i}},o.getSlideDistance=function(t,e){var i=this.slides.length,s=this.options.wrapAround&&i>1,o=s?n.modulo(e,i):e,r=this.slides[o];if(!r)return null;var a=s?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+a)},o.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:t<0&&e<0?-1:0},o.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])},o.onscroll=function(){var t=s(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},e}),function(t,e){"function"==typeof define&&define.amd?define("tap-listener/tap-listener",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){this.bindTap(t)}var n=i.prototype=Object.create(e.prototype);return n.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},n.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)},n.pointerUp=function(i,n){if(!this.isIgnoringMouseUp||"mouseup"!=i.type){var s=e.getPointerPoint(n),o=this.tapElement.getBoundingClientRect(),r=t.pageXOffset,a=t.pageYOffset,l=s.x>=o.left+r&&s.x<=o.right+r&&s.y>=o.top+a&&s.y<=o.bottom+a;if(l&&this.emitEvent("tap",[i,n]),"mouseup"!=i.type){this.isIgnoringMouseUp=!0;var h=this;setTimeout(function(){delete h.isIgnoringMouseUp},400)}}},n.destroy=function(){this.pointerDone(),this.unbindTap()},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";function s(t,e){this.direction=t,this.parent=e,this._create()}function o(t){return"string"==typeof t?t:"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}var r="http://www.w3.org/2000/svg";s.prototype=new i,s.prototype._create=function(){this.isEnabled=!0,this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"previous":"next");var i=this.createSVG();e.appendChild(i),this.on("tap",this.onTap),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.bindTap(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.element),i.prototype.destroy.call(this),this.element.removeEventListener("click",this)},s.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path"),i=o(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},s.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},s.prototype.handleEvent=n.handleEvent,s.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},s.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},s.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},s.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?"disable":"enable";this[n]()},s.prototype.destroy=function(){this.deactivate()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var a=e.prototype;return a._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new s((-1),this),this.nextButton=new s(1,this),this.on("activate",this.activatePrevNextButtons))},a.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},a.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){this.parent=t,this._create()}s.prototype=new i,s.prototype._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.on("tap",this.onTap),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.setDots(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),i.prototype.destroy.call(this)},s.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;t>0?this.addDots(t):t<0&&this.removeDots(-t)},s.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement("li");n.className="dot",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},s.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)},s.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected")},s.prototype.onTap=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},s.prototype.destroy=function(){this.deactivate()},e.PageDots=s,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var o=e.prototype;return o._createPageDots=function(){this.options.pageDots&&(this.pageDots=new s(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},o.activatePageDots=function(){this.pageDots.activate()},o.updateSelectedPageDots=function(){this.pageDots.updateSelected()},o.updatePageDots=function(){this.pageDots.setDots()},o.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):e(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",o&&(this.onVisibilityChange=function(){this.visibilityChange()}.bind(this),this.onVisibilityPlay=function(){this.visibilityPlay()}.bind(this))}var s,o;"hidden"in document?(s="hidden",o="visibilitychange"):"webkitHidden"in document&&(s="webkitHidden",o="webkitvisibilitychange"),n.prototype=Object.create(t.prototype),n.prototype.play=function(){if("playing"!=this.state){var t=document[s];if(o&&t)return void document.addEventListener(o,this.onVisibilityPlay);this.state="playing",o&&document.addEventListener(o,this.onVisibilityChange),this.tick()}},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),o&&document.removeEventListener(o,this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){var t=document[s];this[t?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener(o,this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var r=i.prototype;return r._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},r.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},r.playPlayer=function(){this.player.play()},r.stopPlayer=function(){this.player.stop()},r.pausePlayer=function(){this.player.pause()},r.unpausePlayer=function(){this.player.unpause()},r.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},r.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},r.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}var s=e.prototype;return s.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var s=this.cells.length;e=void 0===e?s:e;var o=n(i),r=e==s;if(r)this.slider.appendChild(o);else{var a=this.cells[e].element;this.slider.insertBefore(o,a)}if(0===e)this.cells=i.concat(this.cells);else if(r)this.cells=this.cells.concat(i);else{var l=this.cells.splice(e,s-e);this.cells=this.cells.concat(i).concat(l)}this._sizeCells(i);var h=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,h)}},s.append=function(t){this.insert(t,this.cells.length)},s.prepend=function(t){this.insert(t,0)},s.remove=function(t){var e,n,s=this.getCells(t),o=0,r=s.length;for(e=0;e<r;e++){n=s[e];var a=this.cells.indexOf(n)<this.selectedIndex;o-=a?1:0}for(e=0;e<r;e++)n=s[e],n.remove(),i.removeFrom(this.cells,n);s.length&&this._cellAddedRemoved(0,o)},s._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.slides.length-1,this.selectedIndex)),this.cellChange(t,!0),this.emitEvent("cellAddedRemoved",[t,e])},s.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},s.cellChange=function(t,e){var i=this.slideableWidth;if(this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("cellChange",[t]),this.options.freeScroll){var n=i-this.slideableWidth;this.x+=n*this.cellAlign,this.positionSlider()}else e&&this.positionSliderAtSelected(),this.select(this.selectedIndex)},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){"use strict";function n(t){if("IMG"==t.nodeName&&t.getAttribute("data-flickity-lazyload"))return[t];var e=t.querySelectorAll("img[data-flickity-lazyload]");return i.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}e.createMethods.push("_createLazyload");var o=e.prototype;return o._createLazyload=function(){this.on("select",this.lazyLoad)},o.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),o=[];i.forEach(function(t){var e=n(t);o=o.concat(e)}),o.forEach(function(t){new s(t,this)},this)}},s.prototype.handleEvent=i.handleEvent,s.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.img.getAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){function i(t,e,i){return(e-t)*i+t}t.createMethods.push("_createAsNavFor");var n=t.prototype;return n._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},n.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var s=this;this.onNavCompanionSelect=function(){s.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},n.navCompanionSelect=function(t){if(this.navCompanion){var e=this.navCompanion.selectedCells[0],n=this.navCompanion.cells.indexOf(e),s=n+this.navCompanion.selectedCells.length-1,o=Math.floor(i(n,s,this.navCompanion.cellAlign));if(this.selectCell(o,!1,t),this.removeNavSelectedElements(),!(o>=this.cells.length)){var r=this.cells.slice(n,s+1);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},n.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},n.activateAsNavFor=function(){this.navCompanionSelect(!0)},n.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},n.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},n.deactivateAsNavFor=function(){this.removeNavSelectedElements()},n.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,o){return this instanceof s?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?o=e:i(this.options,e),o&&this.on("always",o),this.getImages(),a&&(this.jqDeferred=new a.Deferred),void setTimeout(function(){this.check()}.bind(this))):new s(t,e,o)}function o(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var a=t.jQuery,l=t.console;s.prototype=Object.create(e.prototype),s.prototype.options={},s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&h[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(n=0;n<o.length;n++){var r=o[n];this.addElementBackgroundImages(r)}}}};var h={1:!0,9:!0,11:!0};return s.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var s=n&&n[2];s&&this.addBackground(s,t),n=i.exec(e.backgroundImage)}},s.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new r(t,e);this.images.push(i)},s.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&l&&l.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype=Object.create(o.prototype),r.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},s.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(a=e,a.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(a(this))})},s.makeJQueryPlugin(),s}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on("progress",t)}},e});;/*! lazysizes - v4.1.1 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d,e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("CustomEvent");return e||(e={}),e.instance=c,h.initCustomEvent(d,!f,!g,e),a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),e({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=a===!0)&&(g=33),b||(b=!0,d=e-(f.now()-c),0>d&&(d=0),a||9>d?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;d>a?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}};!function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b]);a.lazySizesConfig=d,k(function(){d.init&&F()})}();var D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K,L,M=/^img$/i,N=/^iframe$/i,O="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),P=0,Q=0,R=0,S=-1,T=function(a){R--,a&&a.target&&u(a.target,T),(!a||0>R||!a.target)&&(R=0)},U=function(a,c){var d,f=a,g="hidden"==x(b.body,"visibility")||"hidden"!=x(a.parentNode,"visibility")&&"hidden"!=x(a,"visibility");for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)g=(x(f,"opacity")||1)>0,g&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},V=function(){var a,f,h,j,k,m,n,p,q,r=c.elements;if((o=d.loadMode)&&8>R&&(a=r.length)){f=0,S++,null==K&&("expand"in d||(d.expand=e.clientHeight>500&&e.clientWidth>500?500:370),J=d.expand,K=J*d.expFactor),K>Q&&1>R&&S>2&&o>2&&!b.hidden?(Q=K,S=0):Q=o>1&&S>1&&6>R?J:P;for(;a>f;f++)if(r[f]&&!r[f]._lazyRace)if(O)if((p=r[f][i]("data-expand"))&&(m=1*p)||(m=Q),q!==m&&(y=innerWidth+m*L,D=innerHeight+m,n=-1*m,q=m),h=r[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*L&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||"hidden"!=x(r[f],"visibility"))&&(l&&3>R&&!p&&(3>o||4>S)||U(r[f],m))){if(ba(r[f]),k=!0,R>9)break}else!k&&l&&!j&&4>R&&4>S&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=r[f][i](d.sizesAttr)))&&(j=g[0]||r[f]);else ba(r[f]);j&&!k&&ba(j)}},W=B(V),X=function(a){s(a.target,d.loadedClass),t(a.target,d.loadingClass),u(a.target,Z),v(a.target,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},p&&(u(a,T,!0),clearTimeout(m),m=k(T,2500),s(a,d.loadingClass),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(N.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){(!p||a.complete&&a.naturalWidth>1)&&(p?T(o):R--,X(o))},!0)}),ba=function(a){var b,c=M.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,R++,aa(a,b,f,e,c))},ca=function(){if(!l){if(f.now()-p<999)return void k(ca,999);var a=C(function(){d.loadMode=3,W()});l=!0,d.loadMode=3,W(),j("scroll",function(){3==d.loadMode&&(d.loadMode=2),a()},!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),L=d.hFac,j("scroll",W,!0),j("resize",W,!0),a.MutationObserver?new MutationObserver(W).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",W,!0),e[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ca():(j("load",ca),b[h]("DOMContentLoaded",W),k(ca,2e4)),c.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;g>f;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width,d&&d!==a._lazysizesWidth&&c(a,f,e,d)))},f=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){F.i||(F.i=!0,E._(),D._())};return c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}}});
;/*!
* Infinite Ajax Scroll v2.2.2
* A jQuery plugin for infinite scrolling
* http://infiniteajaxscroll.com
*
* Commercial use requires one-time purchase of a commercial license
* http://infiniteajaxscroll.com/docs/license.html
*
* Non-commercial use is licensed under the MIT License
*
* Copyright (c) 2016 Webcreate (Jeroen Fiege)
*/
var IASCallbacks=function(a){return this.list=[],this.fireStack=[],this.isFiring=!1,this.isDisabled=!1,this.fire=function(a){var b=a[0],c=a[1],d=a[2];this.isFiring=!0;for(var e=0,f=this.list.length;f>e;e++)if(void 0!=this.list[e]&&!1===this.list[e].fn.apply(b,d)){c.reject();break}this.isFiring=!1,c.resolve(),this.fireStack.length&&this.fire(this.fireStack.shift())},this.inList=function(a,b){b=b||0;for(var c=b,d=this.list.length;d>c;c++)if(this.list[c].fn===a||a.guid&&this.list[c].fn.guid&&a.guid===this.list[c].fn.guid)return c;return-1},this};IASCallbacks.prototype={add:function(a,b){var c={fn:a,priority:b};b=b||0;for(var d=0,e=this.list.length;e>d;d++)if(b>this.list[d].priority)return this.list.splice(d,0,c),this;return this.list.push(c),this},remove:function(a){for(var b=0;(b=this.inList(a,b))>-1;)this.list.splice(b,1);return this},has:function(a){return this.inList(a)>-1},fireWith:function(a,b){var c=$.Deferred();return this.isDisabled?c.reject():(b=b||[],b=[a,c,b.slice?b.slice():b],this.isFiring?this.fireStack.push(b):this.fire(b),c)},disable:function(){this.isDisabled=!0},enable:function(){this.isDisabled=!1}},function(a){"use strict";var b=-1,c=function(c,d){return this.itemsContainerSelector=d.container,this.itemSelector=d.item,this.nextSelector=d.next,this.paginationSelector=d.pagination,this.$scrollContainer=c,this.$container=window===c.get(0)?a(document):c,this.defaultDelay=d.delay,this.negativeMargin=d.negativeMargin,this.nextUrl=null,this.isBound=!1,this.isPaused=!1,this.isInitialized=!1,this.jsXhr=!1,this.listeners={next:new IASCallbacks(a),load:new IASCallbacks(a),loaded:new IASCallbacks(a),render:new IASCallbacks(a),rendered:new IASCallbacks(a),scroll:new IASCallbacks(a),noneLeft:new IASCallbacks(a),ready:new IASCallbacks(a)},this.extensions=[],this.scrollHandler=function(){if(this.isBound&&!this.isPaused){var a=this.getCurrentScrollOffset(this.$scrollContainer),c=this.getScrollThreshold();b!=c&&(this.fire("scroll",[a,c]),a>=c&&this.next())}},this.getItemsContainer=function(){return a(this.itemsContainerSelector,this.$container)},this.getLastItem=function(){return a(this.itemSelector,this.getItemsContainer().get(0)).last()},this.getFirstItem=function(){return a(this.itemSelector,this.getItemsContainer().get(0)).first()},this.getScrollThreshold=function(a){var c;return a=a||this.negativeMargin,a=a>=0?-1*a:a,c=this.getLastItem(),0===c.length?b:c.offset().top+c.height()+a},this.getCurrentScrollOffset=function(a){var b=0,c=a.height();return b=window===a.get(0)?a.scrollTop():a.offset().top,(-1!=navigator.platform.indexOf("iPhone")||-1!=navigator.platform.indexOf("iPod"))&&(c+=80),b+c},this.getNextUrl=function(b){return b=b||this.$container,a(this.nextSelector,b).last().attr("href")},this.load=function(b,c,d){var e,f,g=this,h=[],i=+new Date;d=d||this.defaultDelay;var j={url:b};return g.fire("load",[j]),this.jsXhr=a.get(j.url,null,a.proxy(function(b){e=a(this.itemsContainerSelector,b).eq(0),0===e.length&&(e=a(b).filter(this.itemsContainerSelector).eq(0)),e&&e.find(this.itemSelector).each(function(){h.push(this)}),g.fire("loaded",[b,h]),c&&(f=+new Date-i,d>f?setTimeout(function(){c.call(g,b,h)},d-f):c.call(g,b,h))},g),"html"),this.jsXhr},this.render=function(b,c){var d=this,e=this.getLastItem(),f=0,g=this.fire("render",[b]);g.done(function(){a(b).hide(),e.after(b),a(b).fadeIn(400,function(){++f<b.length||(d.fire("rendered",[b]),c&&c())})}),g.fail(function(){c&&c()})},this.hidePagination=function(){this.paginationSelector&&a(this.paginationSelector,this.$container).hide()},this.restorePagination=function(){this.paginationSelector&&a(this.paginationSelector,this.$container).show()},this.throttle=function(b,c){var d,e,f=0;return d=function(){function a(){f=+new Date,b.apply(d,g)}var d=this,g=arguments,h=+new Date-f;e?clearTimeout(e):a(),h>c?a():e=setTimeout(a,c)},a.guid&&(d.guid=b.guid=b.guid||a.guid++),d},this.fire=function(a,b){return this.listeners[a].fireWith(this,b)},this.pause=function(){this.isPaused=!0},this.resume=function(){this.isPaused=!1},this};c.prototype.initialize=function(){if(this.isInitialized)return!1;var a=!!("onscroll"in this.$scrollContainer.get(0)),b=this.getCurrentScrollOffset(this.$scrollContainer),c=this.getScrollThreshold();return a?(this.hidePagination(),this.bind(),this.fire("ready"),this.nextUrl=this.getNextUrl(),b>=c?(this.next(),this.one("rendered",function(){this.isInitialized=!0})):this.isInitialized=!0,this):!1},c.prototype.reinitialize=function(){this.isInitialized=!1,this.unbind(),this.initialize()},c.prototype.bind=function(){if(!this.isBound){this.$scrollContainer.on("scroll",a.proxy(this.throttle(this.scrollHandler,150),this));for(var b=0,c=this.extensions.length;c>b;b++)this.extensions[b].bind(this);this.isBound=!0,this.resume()}},c.prototype.unbind=function(){if(this.isBound){this.$scrollContainer.off("scroll",this.scrollHandler);for(var a=0,b=this.extensions.length;b>a;a++)"undefined"!=typeof this.extensions[a].unbind&&this.extensions[a].unbind(this);this.isBound=!1}},c.prototype.destroy=function(){try{this.jsXhr.abort()}catch(a){}this.unbind(),this.$scrollContainer.data("ias",null)},c.prototype.on=function(b,c,d){if("undefined"==typeof this.listeners[b])throw new Error('There is no event called "'+b+'"');return d=d||0,this.listeners[b].add(a.proxy(c,this),d),this},c.prototype.one=function(a,b){var c=this,d=function(){c.off(a,b),c.off(a,d)};return this.on(a,b),this.on(a,d),this},c.prototype.off=function(a,b){if("undefined"==typeof this.listeners[a])throw new Error('There is no event called "'+a+'"');return this.listeners[a].remove(b),this},c.prototype.next=function(){var a=this.nextUrl,b=this;if(this.pause(),!a)return this.fire("noneLeft",[this.getLastItem()]),this.listeners.noneLeft.disable(),b.resume(),!1;var c=this.fire("next",[a]);return c.done(function(){b.load(a,function(a,c){b.render(c,function(){b.nextUrl=b.getNextUrl(a),b.resume()})})}),c.fail(function(){b.resume()}),!0},c.prototype.extension=function(a){if("undefined"==typeof a.bind)throw new Error('Extension doesn\'t have required method "bind"');return"undefined"!=typeof a.initialize&&a.initialize(this),this.extensions.push(a),this.isInitialized&&this.reinitialize(),this},a.ias=function(b){var c=a(window);return c.ias.apply(c,arguments)},a.fn.ias=function(b){var d=Array.prototype.slice.call(arguments),e=this;return this.each(function(){var f=a(this),g=f.data("ias"),h=a.extend({},a.fn.ias.defaults,f.data(),"object"==typeof b&&b);if(g||(f.data("ias",g=new c(f,h)),a(document).ready(a.proxy(g.initialize,g))),"string"==typeof b){if("function"!=typeof g[b])throw new Error('There is no method called "'+b+'"');d.shift(),g[b].apply(g,d)}e=g}),e},a.fn.ias.defaults={item:".item",container:".listing",next:".next",pagination:!1,delay:600,negativeMargin:10}}(jQuery);var IASHistoryExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.prevSelector=a.prev,this.prevUrl=null,this.listeners={prev:new IASCallbacks},this.onPageChange=function(a,b,c){if(window.history&&window.history.replaceState){var d=history.state;history.replaceState(d,document.title,c)}},this.onScroll=function(a,b){var c=this.getScrollThresholdFirstItem();this.prevUrl&&(a-=this.ias.$scrollContainer.height(),c>=a&&this.prev())},this.onReady=function(){var a=this.ias.getCurrentScrollOffset(this.ias.$scrollContainer),b=this.getScrollThresholdFirstItem();a-=this.ias.$scrollContainer.height(),b>=a&&this.prev()},this.getPrevUrl=function(a){return a||(a=this.ias.$container),jQuery(this.prevSelector,a).last().attr("href")},this.getScrollThresholdFirstItem=function(){var a;return a=this.ias.getFirstItem(),0===a.length?-1:a.offset().top},this.renderBefore=function(a,b){var c=this.ias,d=c.getFirstItem(),e=0;c.fire("render",[a]),jQuery(a).hide(),d.before(a),jQuery(a).fadeIn(400,function(){++e<a.length||(c.fire("rendered",[a]),b&&b())})},this};IASHistoryExtension.prototype.initialize=function(a){var b=this;this.ias=a,jQuery.extend(a.listeners,this.listeners),a.prev=function(){return b.prev()},this.prevUrl=this.getPrevUrl()},IASHistoryExtension.prototype.bind=function(a){a.on("pageChange",jQuery.proxy(this.onPageChange,this)),a.on("scroll",jQuery.proxy(this.onScroll,this)),a.on("ready",jQuery.proxy(this.onReady,this))},IASHistoryExtension.prototype.unbind=function(a){a.off("pageChange",this.onPageChange),a.off("scroll",this.onScroll),a.off("ready",this.onReady)},IASHistoryExtension.prototype.prev=function(){var a=this.prevUrl,b=this,c=this.ias;if(!a)return!1;c.pause();var d=c.fire("prev",[a]);return d.done(function(){c.load(a,function(a,d){b.renderBefore(d,function(){b.prevUrl=b.getPrevUrl(a),c.resume(),b.prevUrl&&b.prev()})})}),d.fail(function(){c.resume()}),!0},IASHistoryExtension.prototype.defaults={prev:".prev"};var IASNoneLeftExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.uid=(new Date).getTime(),this.html=a.html.replace("{text}",a.text),this.showNoneLeft=function(){var a=jQuery(this.html).attr("id","ias_noneleft_"+this.uid),b=this.ias.getLastItem();b.after(a),a.fadeIn()},this};IASNoneLeftExtension.prototype.bind=function(a){this.ias=a,a.on("noneLeft",jQuery.proxy(this.showNoneLeft,this))},IASNoneLeftExtension.prototype.unbind=function(a){a.off("noneLeft",this.showNoneLeft)},IASNoneLeftExtension.prototype.defaults={text:"You reached the end.",html:'<div class="ias-noneleft" style="text-align: center;">{text}</div>'};var IASPagingExtension=function(){return this.ias=null,this.pagebreaks=[[0,document.location.toString()]],this.lastPageNum=1,this.enabled=!0,this.listeners={pageChange:new IASCallbacks},this.onScroll=function(a,b){if(this.enabled){var c,d=this.ias,e=this.getCurrentPageNum(a),f=this.getCurrentPagebreak(a);this.lastPageNum!==e&&(c=f[1],d.fire("pageChange",[e,a,c])),this.lastPageNum=e}},this.onNext=function(a){var b=this.ias.getCurrentScrollOffset(this.ias.$scrollContainer);this.pagebreaks.push([b,a]);var c=this.getCurrentPageNum(b)+1;this.ias.fire("pageChange",[c,b,a]),this.lastPageNum=c},this.onPrev=function(a){var b=this,c=b.ias,d=c.getCurrentScrollOffset(c.$scrollContainer),e=d-c.$scrollContainer.height(),f=c.getFirstItem();this.enabled=!1,this.pagebreaks.unshift([0,a]),c.one("rendered",function(){for(var d=1,g=b.pagebreaks.length;g>d;d++)b.pagebreaks[d][0]=b.pagebreaks[d][0]+f.offset().top;var h=b.getCurrentPageNum(e)+1;c.fire("pageChange",[h,e,a]),b.lastPageNum=h,b.enabled=!0})},this};IASPagingExtension.prototype.initialize=function(a){this.ias=a,jQuery.extend(a.listeners,this.listeners)},IASPagingExtension.prototype.bind=function(a){try{a.on("prev",jQuery.proxy(this.onPrev,this),this.priority)}catch(b){}a.on("next",jQuery.proxy(this.onNext,this),this.priority),a.on("scroll",jQuery.proxy(this.onScroll,this),this.priority)},IASPagingExtension.prototype.unbind=function(a){try{a.off("prev",this.onPrev)}catch(b){}a.off("next",this.onNext),a.off("scroll",this.onScroll)},IASPagingExtension.prototype.getCurrentPageNum=function(a){for(var b=this.pagebreaks.length-1;b>0;b--)if(a>this.pagebreaks[b][0])return b+1;return 1},IASPagingExtension.prototype.getCurrentPagebreak=function(a){for(var b=this.pagebreaks.length-1;b>=0;b--)if(a>this.pagebreaks[b][0])return this.pagebreaks[b];return null},IASPagingExtension.prototype.priority=500;var IASSpinnerExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.uid=(new Date).getTime(),this.src=a.src,this.html=a.html.replace("{src}",this.src),this.showSpinner=function(){var a=this.getSpinner()||this.createSpinner(),b=this.ias.getLastItem();b.after(a),a.fadeIn()},this.showSpinnerBefore=function(){var a=this.getSpinner()||this.createSpinner(),b=this.ias.getFirstItem();b.before(a),a.fadeIn()},this.removeSpinner=function(){this.hasSpinner()&&this.getSpinner().remove()},this.getSpinner=function(){var a=jQuery("#ias_spinner_"+this.uid);return a.length>0?a:!1},this.hasSpinner=function(){var a=jQuery("#ias_spinner_"+this.uid);return a.length>0},this.createSpinner=function(){var a=jQuery(this.html).attr("id","ias_spinner_"+this.uid);return a.hide(),a},this};IASSpinnerExtension.prototype.bind=function(a){this.ias=a,a.on("next",jQuery.proxy(this.showSpinner,this)),a.on("render",jQuery.proxy(this.removeSpinner,this));try{a.on("prev",jQuery.proxy(this.showSpinnerBefore,this))}catch(b){}},IASSpinnerExtension.prototype.unbind=function(a){a.off("next",this.showSpinner),a.off("render",this.removeSpinner);try{a.off("prev",this.showSpinnerBefore)}catch(b){}},IASSpinnerExtension.prototype.defaults={src:"data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==",html:'<div class="ias-spinner" style="text-align: center;"><img src="{src}"/></div>'};var IASTriggerExtension=function(a){return a=jQuery.extend({},this.defaults,a),this.ias=null,this.html=a.html.replace("{text}",a.text),this.htmlPrev=a.htmlPrev.replace("{text}",a.textPrev),this.enabled=!0,this.count=0,this.offset=a.offset,this.$triggerNext=null,this.$triggerPrev=null,this.showTriggerNext=function(){if(!this.enabled)return!0;if(!1===this.offset||++this.count<this.offset)return!0;var a=this.$triggerNext||(this.$triggerNext=this.createTrigger(this.next,this.html)),b=this.ias.getLastItem();return b.after(a),a.fadeIn(),!1},this.showTriggerPrev=function(){if(!this.enabled)return!0;var a=this.$triggerPrev||(this.$triggerPrev=this.createTrigger(this.prev,this.htmlPrev)),b=this.ias.getFirstItem();return b.before(a),a.fadeIn(),!1},this.onRendered=function(){this.enabled=!0},this.createTrigger=function(a,b){var c,d=(new Date).getTime();return b=b||this.html,c=jQuery(b).attr("id","ias_trigger_"+d),c.hide(),c.on("click",jQuery.proxy(a,this)),c},this};IASTriggerExtension.prototype.bind=function(a){this.ias=a,a.on("next",jQuery.proxy(this.showTriggerNext,this),this.priority),a.on("rendered",jQuery.proxy(this.onRendered,this),this.priority);try{a.on("prev",jQuery.proxy(this.showTriggerPrev,this),this.priority)}catch(b){}},IASTriggerExtension.prototype.unbind=function(a){a.off("next",this.showTriggerNext),a.off("rendered",this.onRendered);try{a.off("prev",this.showTriggerPrev)}catch(b){}},IASTriggerExtension.prototype.next=function(){this.enabled=!1,this.ias.pause(),this.$triggerNext&&(this.$triggerNext.remove(),this.$triggerNext=null),this.ias.next()},IASTriggerExtension.prototype.prev=function(){this.enabled=!1,this.ias.pause(),this.$triggerPrev&&(this.$triggerPrev.remove(),this.$triggerPrev=null),this.ias.prev()},IASTriggerExtension.prototype.defaults={text:"Load more items",html:'<div class="ias-trigger ias-trigger-next" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',textPrev:"Load previous items",htmlPrev:'<div class="ias-trigger ias-trigger-prev" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',offset:0},IASTriggerExtension.prototype.priority=1e3;;!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c="CSS1Compat"===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data("inview");if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data("inview",!0).trigger("inview",[!0]):m&&h.data("inview",!1).trigger("inview",[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on("scroll resize scrollstop",function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent("onfocusin",function(){d=null})});
;/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

'use strict';

$.fn.fitVids = function( options ) {
  var settings = {
    customSelector: null,
    ignore: null
  };

  if(!document.getElementById('fit-vids-style')) {
    // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
    var head = document.head || document.getElementsByTagName('head')[0];
    var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
    var div = document.createElement("div");
    div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  }

  if ( options ) {
    $.extend( settings, options );
  }

  return this.each(function(){
    var selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]',
      'object',
      'embed'
    ];

    if (settings.customSelector) {
      selectors.push(settings.customSelector);
    }

    var ignoreList = '.fitvidsignore';

    if(settings.ignore) {
      ignoreList = ignoreList + ', ' + settings.ignore;
    }

    var $allVideos = $(this).find(selectors.join(','));
    $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
    $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

    $allVideos.each(function(){
      var $this = $(this);
      if($this.parents(ignoreList).length > 0) {
        return; // Disable FitVids on this video.
      }
      if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
      if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
      {
        $this.attr('height', 9);
        $this.attr('width', 16);
      }
      var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
          width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
          aspectRatio = height / width;
      if(!$this.attr('name')){
        var videoName = 'fitvid' + $.fn.fitVids._count;
        $this.attr('name', videoName);
        $.fn.fitVids._count++;
      }
      $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
      $this.removeAttr('height').removeAttr('width');
    });
  });
};

// Internal counter for unique video names.
$.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
;/*
   _ _      _       _
___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                 |__/

Version: 1.9.0
Author: Ken Wheeler
Website: http://kenwheeler.github.io
  Docs: http://kenwheeler.github.io/slick
  Repo: http://github.com/kenwheeler/slick
Issues: http://github.com/kenwheeler/slick/issues

*/
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
      module.exports = factory(require('jquery'));
  } else {
      factory(jQuery);
  }

}(function($) {
  'use strict';
  var Slick = window.Slick || {};

  Slick = (function() {

      var instanceUid = 0;

      function Slick(element, settings) {

          var _ = this, dataSettings;

          _.defaults = {
              accessibility: true,
              adaptiveHeight: false,
              appendArrows: $(element),
              appendDots: $(element),
              arrows: true,
              asNavFor: null,
              prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
              nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
              autoplay: false,
              autoplaySpeed: 3000,
              centerMode: false,
              centerPadding: '50px',
              cssEase: 'ease',
              customPaging: function(slider, i) {
                  return $('<button type="button" />').text(i + 1);
              },
              dots: false,
              dotsClass: 'slick-dots',
              draggable: true,
              easing: 'linear',
              edgeFriction: 0.35,
              fade: false,
              focusOnSelect: false,
              focusOnChange: false,
              infinite: true,
              initialSlide: 0,
              lazyLoad: 'ondemand',
              mobileFirst: false,
              pauseOnHover: true,
              pauseOnFocus: true,
              pauseOnDotsHover: false,
              respondTo: 'window',
              responsive: null,
              rows: 1,
              rtl: false,
              slide: '',
              slidesPerRow: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 500,
              swipe: true,
              swipeToSlide: false,
              touchMove: true,
              touchThreshold: 5,
              useCSS: true,
              useTransform: true,
              variableWidth: false,
              vertical: false,
              verticalSwiping: false,
              waitForAnimate: true,
              zIndex: 1000
          };

          _.initials = {
              animating: false,
              dragging: false,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
              direction: 1,
              $dots: null,
              listWidth: null,
              listHeight: null,
              loadIndex: 0,
              $nextArrow: null,
              $prevArrow: null,
              scrolling: false,
              slideCount: null,
              slideWidth: null,
              $slideTrack: null,
              $slides: null,
              sliding: false,
              slideOffset: 0,
              swipeLeft: null,
              swiping: false,
              $list: null,
              touchObject: {},
              transformsEnabled: false,
              unslicked: false
          };

          $.extend(_, _.initials);

          _.activeBreakpoint = null;
          _.animType = null;
          _.animProp = null;
          _.breakpoints = [];
          _.breakpointSettings = [];
          _.cssTransitions = false;
          _.focussed = false;
          _.interrupted = false;
          _.hidden = 'hidden';
          _.paused = true;
          _.positionProp = null;
          _.respondTo = null;
          _.rowCount = 1;
          _.shouldClick = true;
          _.$slider = $(element);
          _.$slidesCache = null;
          _.transformType = null;
          _.transitionType = null;
          _.visibilityChange = 'visibilitychange';
          _.windowWidth = 0;
          _.windowTimer = null;

          dataSettings = $(element).data('slick') || {};

          _.options = $.extend({}, _.defaults, settings, dataSettings);

          _.currentSlide = _.options.initialSlide;

          _.originalSettings = _.options;

          if (typeof document.mozHidden !== 'undefined') {
              _.hidden = 'mozHidden';
              _.visibilityChange = 'mozvisibilitychange';
          } else if (typeof document.webkitHidden !== 'undefined') {
              _.hidden = 'webkitHidden';
              _.visibilityChange = 'webkitvisibilitychange';
          }

          _.autoPlay = $.proxy(_.autoPlay, _);
          _.autoPlayClear = $.proxy(_.autoPlayClear, _);
          _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
          _.changeSlide = $.proxy(_.changeSlide, _);
          _.clickHandler = $.proxy(_.clickHandler, _);
          _.selectHandler = $.proxy(_.selectHandler, _);
          _.setPosition = $.proxy(_.setPosition, _);
          _.swipeHandler = $.proxy(_.swipeHandler, _);
          _.dragHandler = $.proxy(_.dragHandler, _);
          _.keyHandler = $.proxy(_.keyHandler, _);

          _.instanceUid = instanceUid++;

          // A simple way to check for HTML strings
          // Strict HTML recognition (must start with <)
          // Extracted from jQuery v1.11 source
          _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


          _.registerBreakpoints();
          _.init(true);

      }

      return Slick;

  }());

  Slick.prototype.activateADA = function() {
      var _ = this;

      _.$slideTrack.find('.slick-active').attr({
          'aria-hidden': 'false'
      }).find('a, input, button, select').attr({
          'tabindex': '0'
      });

  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

      var _ = this;

      if (typeof(index) === 'boolean') {
          addBefore = index;
          index = null;
      } else if (index < 0 || (index >= _.slideCount)) {
          return false;
      }

      _.unload();

      if (typeof(index) === 'number') {
          if (index === 0 && _.$slides.length === 0) {
              $(markup).appendTo(_.$slideTrack);
          } else if (addBefore) {
              $(markup).insertBefore(_.$slides.eq(index));
          } else {
              $(markup).insertAfter(_.$slides.eq(index));
          }
      } else {
          if (addBefore === true) {
              $(markup).prependTo(_.$slideTrack);
          } else {
              $(markup).appendTo(_.$slideTrack);
          }
      }

      _.$slides = _.$slideTrack.children(this.options.slide);

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.append(_.$slides);

      _.$slides.each(function(index, element) {
          $(element).attr('data-slick-index', index);
      });

      _.$slidesCache = _.$slides;

      _.reinit();

  };

  Slick.prototype.animateHeight = function() {
      var _ = this;
      if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
          var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
          _.$list.animate({
              height: targetHeight
          }, _.options.speed);
      }
  };

  Slick.prototype.animateSlide = function(targetLeft, callback) {

      var animProps = {},
          _ = this;

      _.animateHeight();

      if (_.options.rtl === true && _.options.vertical === false) {
          targetLeft = -targetLeft;
      }
      if (_.transformsEnabled === false) {
          if (_.options.vertical === false) {
              _.$slideTrack.animate({
                  left: targetLeft
              }, _.options.speed, _.options.easing, callback);
          } else {
              _.$slideTrack.animate({
                  top: targetLeft
              }, _.options.speed, _.options.easing, callback);
          }

      } else {

          if (_.cssTransitions === false) {
              if (_.options.rtl === true) {
                  _.currentLeft = -(_.currentLeft);
              }
              $({
                  animStart: _.currentLeft
              }).animate({
                  animStart: targetLeft
              }, {
                  duration: _.options.speed,
                  easing: _.options.easing,
                  step: function(now) {
                      now = Math.ceil(now);
                      if (_.options.vertical === false) {
                          animProps[_.animType] = 'translate(' +
                              now + 'px, 0px)';
                          _.$slideTrack.css(animProps);
                      } else {
                          animProps[_.animType] = 'translate(0px,' +
                              now + 'px)';
                          _.$slideTrack.css(animProps);
                      }
                  },
                  complete: function() {
                      if (callback) {
                          callback.call();
                      }
                  }
              });

          } else {

              _.applyTransition();
              targetLeft = Math.ceil(targetLeft);

              if (_.options.vertical === false) {
                  animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
              } else {
                  animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
              }
              _.$slideTrack.css(animProps);

              if (callback) {
                  setTimeout(function() {

                      _.disableTransition();

                      callback.call();
                  }, _.options.speed);
              }

          }

      }

  };

  Slick.prototype.getNavTarget = function() {

      var _ = this,
          asNavFor = _.options.asNavFor;

      if ( asNavFor && asNavFor !== null ) {
          asNavFor = $(asNavFor).not(_.$slider);
      }

      return asNavFor;

  };

  Slick.prototype.asNavFor = function(index) {

      var _ = this,
          asNavFor = _.getNavTarget();

      if ( asNavFor !== null && typeof asNavFor === 'object' ) {
          asNavFor.each(function() {
              var target = $(this).slick('getSlick');
              if(!target.unslicked) {
                  target.slideHandler(index, true);
              }
          });
      }

  };

  Slick.prototype.applyTransition = function(slide) {

      var _ = this,
          transition = {};

      if (_.options.fade === false) {
          transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
      } else {
          transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
      }

      if (_.options.fade === false) {
          _.$slideTrack.css(transition);
      } else {
          _.$slides.eq(slide).css(transition);
      }

  };

  Slick.prototype.autoPlay = function() {

      var _ = this;

      _.autoPlayClear();

      if ( _.slideCount > _.options.slidesToShow ) {
          _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
      }

  };

  Slick.prototype.autoPlayClear = function() {

      var _ = this;

      if (_.autoPlayTimer) {
          clearInterval(_.autoPlayTimer);
      }

  };

  Slick.prototype.autoPlayIterator = function() {

      var _ = this,
          slideTo = _.currentSlide + _.options.slidesToScroll;

      if ( !_.paused && !_.interrupted && !_.focussed ) {

          if ( _.options.infinite === false ) {

              if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                  _.direction = 0;
              }

              else if ( _.direction === 0 ) {

                  slideTo = _.currentSlide - _.options.slidesToScroll;

                  if ( _.currentSlide - 1 === 0 ) {
                      _.direction = 1;
                  }

              }

          }

          _.slideHandler( slideTo );

      }

  };

  Slick.prototype.buildArrows = function() {

      var _ = this;

      if (_.options.arrows === true ) {

          _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
          _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

          if( _.slideCount > _.options.slidesToShow ) {

              _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
              _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

              if (_.htmlExpr.test(_.options.prevArrow)) {
                  _.$prevArrow.prependTo(_.options.appendArrows);
              }

              if (_.htmlExpr.test(_.options.nextArrow)) {
                  _.$nextArrow.appendTo(_.options.appendArrows);
              }

              if (_.options.infinite !== true) {
                  _.$prevArrow
                      .addClass('slick-disabled')
                      .attr('aria-disabled', 'true');
              }

          } else {

              _.$prevArrow.add( _.$nextArrow )

                  .addClass('slick-hidden')
                  .attr({
                      'aria-disabled': 'true',
                      'tabindex': '-1'
                  });

          }

      }

  };

  Slick.prototype.buildDots = function() {

      var _ = this,
          i, dot;

      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

          _.$slider.addClass('slick-dotted');

          dot = $('<ul />').addClass(_.options.dotsClass);

          for (i = 0; i <= _.getDotCount(); i += 1) {
              dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
          }

          _.$dots = dot.appendTo(_.options.appendDots);

          _.$dots.find('li').first().addClass('slick-active');

      }

  };

  Slick.prototype.buildOut = function() {

      var _ = this;

      _.$slides =
          _.$slider
              .children( _.options.slide + ':not(.slick-cloned)')
              .addClass('slick-slide');

      _.slideCount = _.$slides.length;

      _.$slides.each(function(index, element) {
          $(element)
              .attr('data-slick-index', index)
              .data('originalStyling', $(element).attr('style') || '');
      });

      _.$slider.addClass('slick-slider');

      _.$slideTrack = (_.slideCount === 0) ?
          $('<div class="slick-track"/>').appendTo(_.$slider) :
          _.$slides.wrapAll('<div class="slick-track"/>').parent();

      _.$list = _.$slideTrack.wrap(
          '<div class="slick-list"/>').parent();
      _.$slideTrack.css('opacity', 0);

      if (_.options.centerMode === true || _.options.swipeToSlide === true) {
          _.options.slidesToScroll = 1;
      }

      $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

      _.setupInfinite();

      _.buildArrows();

      _.buildDots();

      _.updateDots();


      _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

      if (_.options.draggable === true) {
          _.$list.addClass('draggable');
      }

  };

  Slick.prototype.buildRows = function() {

      var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

      newSlides = document.createDocumentFragment();
      originalSlides = _.$slider.children();

      if(_.options.rows > 0) {

          slidesPerSection = _.options.slidesPerRow * _.options.rows;
          numOfSlides = Math.ceil(
              originalSlides.length / slidesPerSection
          );

          for(a = 0; a < numOfSlides; a++){
              var slide = document.createElement('div');
              for(b = 0; b < _.options.rows; b++) {
                  var row = document.createElement('div');
                  for(c = 0; c < _.options.slidesPerRow; c++) {
                      var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                      if (originalSlides.get(target)) {
                          row.appendChild(originalSlides.get(target));
                      }
                  }
                  slide.appendChild(row);
              }
              newSlides.appendChild(slide);
          }

          _.$slider.empty().append(newSlides);
          _.$slider.children().children().children()
              .css({
                  'width':(100 / _.options.slidesPerRow) + '%',
                  'display': 'inline-block'
              });

      }

  };

  Slick.prototype.checkResponsive = function(initial, forceUpdate) {

      var _ = this,
          breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
      var sliderWidth = _.$slider.width();
      var windowWidth = window.innerWidth || $(window).width();

      if (_.respondTo === 'window') {
          respondToWidth = windowWidth;
      } else if (_.respondTo === 'slider') {
          respondToWidth = sliderWidth;
      } else if (_.respondTo === 'min') {
          respondToWidth = Math.min(windowWidth, sliderWidth);
      }

      if ( _.options.responsive &&
          _.options.responsive.length &&
          _.options.responsive !== null) {

          targetBreakpoint = null;

          for (breakpoint in _.breakpoints) {
              if (_.breakpoints.hasOwnProperty(breakpoint)) {
                  if (_.originalSettings.mobileFirst === false) {
                      if (respondToWidth < _.breakpoints[breakpoint]) {
                          targetBreakpoint = _.breakpoints[breakpoint];
                      }
                  } else {
                      if (respondToWidth > _.breakpoints[breakpoint]) {
                          targetBreakpoint = _.breakpoints[breakpoint];
                      }
                  }
              }
          }

          if (targetBreakpoint !== null) {
              if (_.activeBreakpoint !== null) {
                  if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                      _.activeBreakpoint =
                          targetBreakpoint;
                      if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                          _.unslick(targetBreakpoint);
                      } else {
                          _.options = $.extend({}, _.originalSettings,
                              _.breakpointSettings[
                                  targetBreakpoint]);
                          if (initial === true) {
                              _.currentSlide = _.options.initialSlide;
                          }
                          _.refresh(initial);
                      }
                      triggerBreakpoint = targetBreakpoint;
                  }
              } else {
                  _.activeBreakpoint = targetBreakpoint;
                  if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                      _.unslick(targetBreakpoint);
                  } else {
                      _.options = $.extend({}, _.originalSettings,
                          _.breakpointSettings[
                              targetBreakpoint]);
                      if (initial === true) {
                          _.currentSlide = _.options.initialSlide;
                      }
                      _.refresh(initial);
                  }
                  triggerBreakpoint = targetBreakpoint;
              }
          } else {
              if (_.activeBreakpoint !== null) {
                  _.activeBreakpoint = null;
                  _.options = _.originalSettings;
                  if (initial === true) {
                      _.currentSlide = _.options.initialSlide;
                  }
                  _.refresh(initial);
                  triggerBreakpoint = targetBreakpoint;
              }
          }

          // only trigger breakpoints during an actual break. not on initialize.
          if( !initial && triggerBreakpoint !== false ) {
              _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
          }
      }

  };

  Slick.prototype.changeSlide = function(event, dontAnimate) {

      var _ = this,
          $target = $(event.currentTarget),
          indexOffset, slideOffset, unevenOffset;

      // If target is a link, prevent default action.
      if($target.is('a')) {
          event.preventDefault();
      }

      // If target is not the <li> element (ie: a child), find the <li>.
      if(!$target.is('li')) {
          $target = $target.closest('li');
      }

      unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
      indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

      switch (event.data.message) {

          case 'previous':
              slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
              if (_.slideCount > _.options.slidesToShow) {
                  _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
              }
              break;

          case 'next':
              slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
              if (_.slideCount > _.options.slidesToShow) {
                  _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
              }
              break;

          case 'index':
              var index = event.data.index === 0 ? 0 :
                  event.data.index || $target.index() * _.options.slidesToScroll;

              _.slideHandler(_.checkNavigable(index), false, dontAnimate);
              $target.children().trigger('focus');
              break;

          default:
              return;
      }

  };

  Slick.prototype.checkNavigable = function(index) {

      var _ = this,
          navigables, prevNavigable;

      navigables = _.getNavigableIndexes();
      prevNavigable = 0;
      if (index > navigables[navigables.length - 1]) {
          index = navigables[navigables.length - 1];
      } else {
          for (var n in navigables) {
              if (index < navigables[n]) {
                  index = prevNavigable;
                  break;
              }
              prevNavigable = navigables[n];
          }
      }

      return index;
  };

  Slick.prototype.cleanUpEvents = function() {

      var _ = this;

      if (_.options.dots && _.$dots !== null) {

          $('li', _.$dots)
              .off('click.slick', _.changeSlide)
              .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
              .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

          if (_.options.accessibility === true) {
              _.$dots.off('keydown.slick', _.keyHandler);
          }
      }

      _.$slider.off('focus.slick blur.slick');

      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
          _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
          _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

          if (_.options.accessibility === true) {
              _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
              _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
          }
      }

      _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
      _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
      _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
      _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

      _.$list.off('click.slick', _.clickHandler);

      $(document).off(_.visibilityChange, _.visibility);

      _.cleanUpSlideEvents();

      if (_.options.accessibility === true) {
          _.$list.off('keydown.slick', _.keyHandler);
      }

      if (_.options.focusOnSelect === true) {
          $(_.$slideTrack).children().off('click.slick', _.selectHandler);
      }

      $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

      $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

      $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

      $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

  };

  Slick.prototype.cleanUpSlideEvents = function() {

      var _ = this;

      _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
      _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

  };

  Slick.prototype.cleanUpRows = function() {

      var _ = this, originalSlides;

      if(_.options.rows > 0) {
          originalSlides = _.$slides.children().children();
          originalSlides.removeAttr('style');
          _.$slider.empty().append(originalSlides);
      }

  };

  Slick.prototype.clickHandler = function(event) {

      var _ = this;

      if (_.shouldClick === false) {
          event.stopImmediatePropagation();
          event.stopPropagation();
          event.preventDefault();
      }

  };

  Slick.prototype.destroy = function(refresh) {

      var _ = this;

      _.autoPlayClear();

      _.touchObject = {};

      _.cleanUpEvents();

      $('.slick-cloned', _.$slider).detach();

      if (_.$dots) {
          _.$dots.remove();
      }

      if ( _.$prevArrow && _.$prevArrow.length ) {

          _.$prevArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display','');

          if ( _.htmlExpr.test( _.options.prevArrow )) {
              _.$prevArrow.remove();
          }
      }

      if ( _.$nextArrow && _.$nextArrow.length ) {

          _.$nextArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display','');

          if ( _.htmlExpr.test( _.options.nextArrow )) {
              _.$nextArrow.remove();
          }
      }


      if (_.$slides) {

          _.$slides
              .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
              .removeAttr('aria-hidden')
              .removeAttr('data-slick-index')
              .each(function(){
                  $(this).attr('style', $(this).data('originalStyling'));
              });

          _.$slideTrack.children(this.options.slide).detach();

          _.$slideTrack.detach();

          _.$list.detach();

          _.$slider.append(_.$slides);
      }

      _.cleanUpRows();

      _.$slider.removeClass('slick-slider');
      _.$slider.removeClass('slick-initialized');
      _.$slider.removeClass('slick-dotted');

      _.unslicked = true;

      if(!refresh) {
          _.$slider.trigger('destroy', [_]);
      }

  };

  Slick.prototype.disableTransition = function(slide) {

      var _ = this,
          transition = {};

      transition[_.transitionType] = '';

      if (_.options.fade === false) {
          _.$slideTrack.css(transition);
      } else {
          _.$slides.eq(slide).css(transition);
      }

  };

  Slick.prototype.fadeSlide = function(slideIndex, callback) {

      var _ = this;

      if (_.cssTransitions === false) {

          _.$slides.eq(slideIndex).css({
              zIndex: _.options.zIndex
          });

          _.$slides.eq(slideIndex).animate({
              opacity: 1
          }, _.options.speed, _.options.easing, callback);

      } else {

          _.applyTransition(slideIndex);

          _.$slides.eq(slideIndex).css({
              opacity: 1,
              zIndex: _.options.zIndex
          });

          if (callback) {
              setTimeout(function() {

                  _.disableTransition(slideIndex);

                  callback.call();
              }, _.options.speed);
          }

      }

  };

  Slick.prototype.fadeSlideOut = function(slideIndex) {

      var _ = this;

      if (_.cssTransitions === false) {

          _.$slides.eq(slideIndex).animate({
              opacity: 0,
              zIndex: _.options.zIndex - 2
          }, _.options.speed, _.options.easing);

      } else {

          _.applyTransition(slideIndex);

          _.$slides.eq(slideIndex).css({
              opacity: 0,
              zIndex: _.options.zIndex - 2
          });

      }

  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

      var _ = this;

      if (filter !== null) {

          _.$slidesCache = _.$slides;

          _.unload();

          _.$slideTrack.children(this.options.slide).detach();

          _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

          _.reinit();

      }

  };

  Slick.prototype.focusHandler = function() {

      var _ = this;

      // If any child element receives focus within the slider we need to pause the autoplay
      _.$slider
          .off('focus.slick blur.slick')
          .on(
              'focus.slick',
              '*',
              function(event) {
                  var $sf = $(this);

                  setTimeout(function() {
                      if( _.options.pauseOnFocus ) {
                          if ($sf.is(':focus')) {
                              _.focussed = true;
                              _.autoPlay();
                          }
                      }
                  }, 0);
              }
          ).on(
              'blur.slick',
              '*',
              function(event) {
                  var $sf = $(this);

                  // When a blur occurs on any elements within the slider we become unfocused
                  if( _.options.pauseOnFocus ) {
                      _.focussed = false;
                      _.autoPlay();
                  }
              }
          );
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

      var _ = this;
      return _.currentSlide;

  };

  Slick.prototype.getDotCount = function() {

      var _ = this;

      var breakPoint = 0;
      var counter = 0;
      var pagerQty = 0;

      if (_.options.infinite === true) {
          if (_.slideCount <= _.options.slidesToShow) {
               ++pagerQty;
          } else {
              while (breakPoint < _.slideCount) {
                  ++pagerQty;
                  breakPoint = counter + _.options.slidesToScroll;
                  counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
              }
          }
      } else if (_.options.centerMode === true) {
          pagerQty = _.slideCount;
      } else if(!_.options.asNavFor) {
          pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
      }else {
          while (breakPoint < _.slideCount) {
              ++pagerQty;
              breakPoint = counter + _.options.slidesToScroll;
              counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
          }
      }

      return pagerQty - 1;

  };

  Slick.prototype.getLeft = function(slideIndex) {

      var _ = this,
          targetLeft,
          verticalHeight,
          verticalOffset = 0,
          targetSlide,
          coef;

      _.slideOffset = 0;
      verticalHeight = _.$slides.first().outerHeight(true);

      if (_.options.infinite === true) {
          if (_.slideCount > _.options.slidesToShow) {
              _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
              coef = -1

              if (_.options.vertical === true && _.options.centerMode === true) {
                  if (_.options.slidesToShow === 2) {
                      coef = -1.5;
                  } else if (_.options.slidesToShow === 1) {
                      coef = -2
                  }
              }
              verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
          }
          if (_.slideCount % _.options.slidesToScroll !== 0) {
              if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                  if (slideIndex > _.slideCount) {
                      _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                      verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                  } else {
                      _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                      verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                  }
              }
          }
      } else {
          if (slideIndex + _.options.slidesToShow > _.slideCount) {
              _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
              verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
          }
      }

      if (_.slideCount <= _.options.slidesToShow) {
          _.slideOffset = 0;
          verticalOffset = 0;
      }

      if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
          _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
      } else if (_.options.centerMode === true && _.options.infinite === true) {
          _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
      } else if (_.options.centerMode === true) {
          _.slideOffset = 0;
          _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
      }

      if (_.options.vertical === false) {
          targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
      } else {
          targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
      }

      if (_.options.variableWidth === true) {

          if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
              targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
          } else {
              targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
          }

          if (_.options.rtl === true) {
              if (targetSlide[0]) {
                  targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
              } else {
                  targetLeft =  0;
              }
          } else {
              targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
          }

          if (_.options.centerMode === true) {
              if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                  targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
              } else {
                  targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
              }

              if (_.options.rtl === true) {
                  if (targetSlide[0]) {
                      targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                  } else {
                      targetLeft =  0;
                  }
              } else {
                  targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
              }

              targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
          }
      }

      return targetLeft;

  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

      var _ = this;

      return _.options[option];

  };

  Slick.prototype.getNavigableIndexes = function() {

      var _ = this,
          breakPoint = 0,
          counter = 0,
          indexes = [],
          max;

      if (_.options.infinite === false) {
          max = _.slideCount;
      } else {
          breakPoint = _.options.slidesToScroll * -1;
          counter = _.options.slidesToScroll * -1;
          max = _.slideCount * 2;
      }

      while (breakPoint < max) {
          indexes.push(breakPoint);
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }

      return indexes;

  };

  Slick.prototype.getSlick = function() {

      return this;

  };

  Slick.prototype.getSlideCount = function() {

      var _ = this,
          slidesTraversed, swipedSlide, swipeTarget, centerOffset;

      centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
      swipeTarget = (_.swipeLeft * -1) + centerOffset;

      if (_.options.swipeToSlide === true) {

          _.$slideTrack.find('.slick-slide').each(function(index, slide) {

              var slideOuterWidth, slideOffset, slideRightBoundary;
              slideOuterWidth = $(slide).outerWidth();
              slideOffset = slide.offsetLeft;
              if (_.options.centerMode !== true) {
                  slideOffset += (slideOuterWidth / 2);
              }

              slideRightBoundary = slideOffset + (slideOuterWidth);

              if (swipeTarget < slideRightBoundary) {
                  swipedSlide = slide;
                  return false;
              }
          });

          slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

          return slidesTraversed;

      } else {
          return _.options.slidesToScroll;
      }

  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

      var _ = this;

      _.changeSlide({
          data: {
              message: 'index',
              index: parseInt(slide)
          }
      }, dontAnimate);

  };

  Slick.prototype.init = function(creation) {

      var _ = this;

      if (!$(_.$slider).hasClass('slick-initialized')) {

          $(_.$slider).addClass('slick-initialized');

          _.buildRows();
          _.buildOut();
          _.setProps();
          _.startLoad();
          _.loadSlider();
          _.initializeEvents();
          _.updateArrows();
          _.updateDots();
          _.checkResponsive(true);
          _.focusHandler();

      }

      if (creation) {
          _.$slider.trigger('init', [_]);
      }

      if (_.options.accessibility === true) {
          _.initADA();
      }

      if ( _.options.autoplay ) {

          _.paused = false;
          _.autoPlay();

      }

  };

  Slick.prototype.initADA = function() {
      var _ = this,
              numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
              tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                  return (val >= 0) && (val < _.slideCount);
              });

      _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
          'aria-hidden': 'true',
          'tabindex': '-1'
      }).find('a, input, button, select').attr({
          'tabindex': '-1'
      });

      if (_.$dots !== null) {
          _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
              var slideControlIndex = tabControlIndexes.indexOf(i);

              $(this).attr({
                  'role': 'tabpanel',
                  'id': 'slick-slide' + _.instanceUid + i,
                  'tabindex': -1
              });

              if (slideControlIndex !== -1) {
                 var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                 if ($('#' + ariaButtonControl).length) {
                   $(this).attr({
                       'aria-describedby': ariaButtonControl
                   });
                 }
              }
          });

          _.$dots.attr('role', 'tablist').find('li').each(function(i) {
              var mappedSlideIndex = tabControlIndexes[i];

              $(this).attr({
                  'role': 'presentation'
              });

              $(this).find('button').first().attr({
                  'role': 'tab',
                  'id': 'slick-slide-control' + _.instanceUid + i,
                  'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                  'aria-label': (i + 1) + ' of ' + numDotGroups,
                  'aria-selected': null,
                  'tabindex': '-1'
              });

          }).eq(_.currentSlide).find('button').attr({
              'aria-selected': 'true',
              'tabindex': '0'
          }).end();
      }

      for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
        if (_.options.focusOnChange) {
          _.$slides.eq(i).attr({'tabindex': '0'});
        } else {
          _.$slides.eq(i).removeAttr('tabindex');
        }
      }

      _.activateADA();

  };

  Slick.prototype.initArrowEvents = function() {

      var _ = this;

      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
          _.$prevArrow
             .off('click.slick')
             .on('click.slick', {
                  message: 'previous'
             }, _.changeSlide);
          _.$nextArrow
             .off('click.slick')
             .on('click.slick', {
                  message: 'next'
             }, _.changeSlide);

          if (_.options.accessibility === true) {
              _.$prevArrow.on('keydown.slick', _.keyHandler);
              _.$nextArrow.on('keydown.slick', _.keyHandler);
          }
      }

  };

  Slick.prototype.initDotEvents = function() {

      var _ = this;

      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
          $('li', _.$dots).on('click.slick', {
              message: 'index'
          }, _.changeSlide);

          if (_.options.accessibility === true) {
              _.$dots.on('keydown.slick', _.keyHandler);
          }
      }

      if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

          $('li', _.$dots)
              .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
              .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

      }

  };

  Slick.prototype.initSlideEvents = function() {

      var _ = this;

      if ( _.options.pauseOnHover ) {

          _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
          _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

      }

  };

  Slick.prototype.initializeEvents = function() {

      var _ = this;

      _.initArrowEvents();

      _.initDotEvents();
      _.initSlideEvents();

      _.$list.on('touchstart.slick mousedown.slick', {
          action: 'start'
      }, _.swipeHandler);
      _.$list.on('touchmove.slick mousemove.slick', {
          action: 'move'
      }, _.swipeHandler);
      _.$list.on('touchend.slick mouseup.slick', {
          action: 'end'
      }, _.swipeHandler);
      _.$list.on('touchcancel.slick mouseleave.slick', {
          action: 'end'
      }, _.swipeHandler);

      _.$list.on('click.slick', _.clickHandler);

      $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

      if (_.options.accessibility === true) {
          _.$list.on('keydown.slick', _.keyHandler);
      }

      if (_.options.focusOnSelect === true) {
          $(_.$slideTrack).children().on('click.slick', _.selectHandler);
      }

      $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

      $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

      $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

      $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
      $(_.setPosition);

  };

  Slick.prototype.initUI = function() {

      var _ = this;

      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

          _.$prevArrow.show();
          _.$nextArrow.show();

      }

      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

          _.$dots.show();

      }

  };

  Slick.prototype.keyHandler = function(event) {

      var _ = this;
       //Dont slide if the cursor is inside the form fields and arrow keys are pressed
      if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
          if (event.keyCode === 37 && _.options.accessibility === true) {
              _.changeSlide({
                  data: {
                      message: _.options.rtl === true ? 'next' :  'previous'
                  }
              });
          } else if (event.keyCode === 39 && _.options.accessibility === true) {
              _.changeSlide({
                  data: {
                      message: _.options.rtl === true ? 'previous' : 'next'
                  }
              });
          }
      }

  };

  Slick.prototype.lazyLoad = function() {

      var _ = this,
          loadRange, cloneRange, rangeStart, rangeEnd;

      function loadImages(imagesScope) {

          $('img[data-lazy]', imagesScope).each(function() {

              var image = $(this),
                  imageSource = $(this).attr('data-lazy'),
                  imageSrcSet = $(this).attr('data-srcset'),
                  imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                  imageToLoad = document.createElement('img');

              imageToLoad.onload = function() {

                  image
                      .animate({ opacity: 0 }, 100, function() {

                          if (imageSrcSet) {
                              image
                                  .attr('srcset', imageSrcSet );

                              if (imageSizes) {
                                  image
                                      .attr('sizes', imageSizes );
                              }
                          }

                          image
                              .attr('src', imageSource)
                              .animate({ opacity: 1 }, 200, function() {
                                  image
                                      .removeAttr('data-lazy data-srcset data-sizes')
                                      .removeClass('slick-loading');
                              });
                          _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                      });

              };

              imageToLoad.onerror = function() {

                  image
                      .removeAttr( 'data-lazy' )
                      .removeClass( 'slick-loading' )
                      .addClass( 'slick-lazyload-error' );

                  _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

              };

              imageToLoad.src = imageSource;

          });

      }

      if (_.options.centerMode === true) {
          if (_.options.infinite === true) {
              rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
              rangeEnd = rangeStart + _.options.slidesToShow + 2;
          } else {
              rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
              rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
          }
      } else {
          rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
          rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
          if (_.options.fade === true) {
              if (rangeStart > 0) rangeStart--;
              if (rangeEnd <= _.slideCount) rangeEnd++;
          }
      }

      loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

      if (_.options.lazyLoad === 'anticipated') {
          var prevSlide = rangeStart - 1,
              nextSlide = rangeEnd,
              $slides = _.$slider.find('.slick-slide');

          for (var i = 0; i < _.options.slidesToScroll; i++) {
              if (prevSlide < 0) prevSlide = _.slideCount - 1;
              loadRange = loadRange.add($slides.eq(prevSlide));
              loadRange = loadRange.add($slides.eq(nextSlide));
              prevSlide--;
              nextSlide++;
          }
      }

      loadImages(loadRange);

      if (_.slideCount <= _.options.slidesToShow) {
          cloneRange = _.$slider.find('.slick-slide');
          loadImages(cloneRange);
      } else
      if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
          cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
          loadImages(cloneRange);
      } else if (_.currentSlide === 0) {
          cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
          loadImages(cloneRange);
      }

  };

  Slick.prototype.loadSlider = function() {

      var _ = this;

      _.setPosition();

      _.$slideTrack.css({
          opacity: 1
      });

      _.$slider.removeClass('slick-loading');

      _.initUI();

      if (_.options.lazyLoad === 'progressive') {
          _.progressiveLazyLoad();
      }

  };

  Slick.prototype.next = Slick.prototype.slickNext = function() {

      var _ = this;

      _.changeSlide({
          data: {
              message: 'next'
          }
      });

  };

  Slick.prototype.orientationChange = function() {

      var _ = this;

      _.checkResponsive();
      _.setPosition();

  };

  Slick.prototype.pause = Slick.prototype.slickPause = function() {

      var _ = this;

      _.autoPlayClear();
      _.paused = true;

  };

  Slick.prototype.play = Slick.prototype.slickPlay = function() {

      var _ = this;

      _.autoPlay();
      _.options.autoplay = true;
      _.paused = false;
      _.focussed = false;
      _.interrupted = false;

  };

  Slick.prototype.postSlide = function(index) {

      var _ = this;

      if( !_.unslicked ) {

          _.$slider.trigger('afterChange', [_, index]);

          _.animating = false;

          if (_.slideCount > _.options.slidesToShow) {
              _.setPosition();
          }

          _.swipeLeft = null;

          if ( _.options.autoplay ) {
              _.autoPlay();
          }

          if (_.options.accessibility === true) {
              _.initADA();

              if (_.options.focusOnChange) {
                  var $currentSlide = $(_.$slides.get(_.currentSlide));
                  $currentSlide.attr('tabindex', 0).focus();
              }
          }

      }

  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function() {

      var _ = this;

      _.changeSlide({
          data: {
              message: 'previous'
          }
      });

  };

  Slick.prototype.preventDefault = function(event) {

      event.preventDefault();

  };

  Slick.prototype.progressiveLazyLoad = function( tryCount ) {

      tryCount = tryCount || 1;

      var _ = this,
          $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
          image,
          imageSource,
          imageSrcSet,
          imageSizes,
          imageToLoad;

      if ( $imgsToLoad.length ) {

          image = $imgsToLoad.first();
          imageSource = image.attr('data-lazy');
          imageSrcSet = image.attr('data-srcset');
          imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
          imageToLoad = document.createElement('img');

          imageToLoad.onload = function() {

              if (imageSrcSet) {
                  image
                      .attr('srcset', imageSrcSet );

                  if (imageSizes) {
                      image
                          .attr('sizes', imageSizes );
                  }
              }

              image
                  .attr( 'src', imageSource )
                  .removeAttr('data-lazy data-srcset data-sizes')
                  .removeClass('slick-loading');

              if ( _.options.adaptiveHeight === true ) {
                  _.setPosition();
              }

              _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
              _.progressiveLazyLoad();

          };

          imageToLoad.onerror = function() {

              if ( tryCount < 3 ) {

                  /**
                   * try to load the image 3 times,
                   * leave a slight delay so we don't get
                   * servers blocking the request.
                   */
                  setTimeout( function() {
                      _.progressiveLazyLoad( tryCount + 1 );
                  }, 500 );

              } else {

                  image
                      .removeAttr( 'data-lazy' )
                      .removeClass( 'slick-loading' )
                      .addClass( 'slick-lazyload-error' );

                  _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                  _.progressiveLazyLoad();

              }

          };

          imageToLoad.src = imageSource;

      } else {

          _.$slider.trigger('allImagesLoaded', [ _ ]);

      }

  };

  Slick.prototype.refresh = function( initializing ) {

      var _ = this, currentSlide, lastVisibleIndex;

      lastVisibleIndex = _.slideCount - _.options.slidesToShow;

      // in non-infinite sliders, we don't want to go past the
      // last visible index.
      if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
          _.currentSlide = lastVisibleIndex;
      }

      // if less slides than to show, go to start.
      if ( _.slideCount <= _.options.slidesToShow ) {
          _.currentSlide = 0;

      }

      currentSlide = _.currentSlide;

      _.destroy(true);

      $.extend(_, _.initials, { currentSlide: currentSlide });

      _.init();

      if( !initializing ) {

          _.changeSlide({
              data: {
                  message: 'index',
                  index: currentSlide
              }
          }, false);

      }

  };

  Slick.prototype.registerBreakpoints = function() {

      var _ = this, breakpoint, currentBreakpoint, l,
          responsiveSettings = _.options.responsive || null;

      if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

          _.respondTo = _.options.respondTo || 'window';

          for ( breakpoint in responsiveSettings ) {

              l = _.breakpoints.length-1;

              if (responsiveSettings.hasOwnProperty(breakpoint)) {
                  currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                  // loop through the breakpoints and cut out any existing
                  // ones with the same breakpoint number, we don't want dupes.
                  while( l >= 0 ) {
                      if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                          _.breakpoints.splice(l,1);
                      }
                      l--;
                  }

                  _.breakpoints.push(currentBreakpoint);
                  _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

              }

          }

          _.breakpoints.sort(function(a, b) {
              return ( _.options.mobileFirst ) ? a-b : b-a;
          });

      }

  };

  Slick.prototype.reinit = function() {

      var _ = this;

      _.$slides =
          _.$slideTrack
              .children(_.options.slide)
              .addClass('slick-slide');

      _.slideCount = _.$slides.length;

      if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
          _.currentSlide = _.currentSlide - _.options.slidesToScroll;
      }

      if (_.slideCount <= _.options.slidesToShow) {
          _.currentSlide = 0;
      }

      _.registerBreakpoints();

      _.setProps();
      _.setupInfinite();
      _.buildArrows();
      _.updateArrows();
      _.initArrowEvents();
      _.buildDots();
      _.updateDots();
      _.initDotEvents();
      _.cleanUpSlideEvents();
      _.initSlideEvents();

      _.checkResponsive(false, true);

      if (_.options.focusOnSelect === true) {
          $(_.$slideTrack).children().on('click.slick', _.selectHandler);
      }

      _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

      _.setPosition();
      _.focusHandler();

      _.paused = !_.options.autoplay;
      _.autoPlay();

      _.$slider.trigger('reInit', [_]);

  };

  Slick.prototype.resize = function() {

      var _ = this;

      if ($(window).width() !== _.windowWidth) {
          clearTimeout(_.windowDelay);
          _.windowDelay = window.setTimeout(function() {
              _.windowWidth = $(window).width();
              _.checkResponsive();
              if( !_.unslicked ) { _.setPosition(); }
          }, 50);
      }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

      var _ = this;

      if (typeof(index) === 'boolean') {
          removeBefore = index;
          index = removeBefore === true ? 0 : _.slideCount - 1;
      } else {
          index = removeBefore === true ? --index : index;
      }

      if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
          return false;
      }

      _.unload();

      if (removeAll === true) {
          _.$slideTrack.children().remove();
      } else {
          _.$slideTrack.children(this.options.slide).eq(index).remove();
      }

      _.$slides = _.$slideTrack.children(this.options.slide);

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.append(_.$slides);

      _.$slidesCache = _.$slides;

      _.reinit();

  };

  Slick.prototype.setCSS = function(position) {

      var _ = this,
          positionProps = {},
          x, y;

      if (_.options.rtl === true) {
          position = -position;
      }
      x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
      y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

      positionProps[_.positionProp] = position;

      if (_.transformsEnabled === false) {
          _.$slideTrack.css(positionProps);
      } else {
          positionProps = {};
          if (_.cssTransitions === false) {
              positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
              _.$slideTrack.css(positionProps);
          } else {
              positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
              _.$slideTrack.css(positionProps);
          }
      }

  };

  Slick.prototype.setDimensions = function() {

      var _ = this;

      if (_.options.vertical === false) {
          if (_.options.centerMode === true) {
              _.$list.css({
                  padding: ('0px ' + _.options.centerPadding)
              });
          }
      } else {
          _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
          if (_.options.centerMode === true) {
              _.$list.css({
                  padding: (_.options.centerPadding + ' 0px')
              });
          }
      }

      _.listWidth = _.$list.width();
      _.listHeight = _.$list.height();


      if (_.options.vertical === false && _.options.variableWidth === false) {
          _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
          _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

      } else if (_.options.variableWidth === true) {
          _.$slideTrack.width(5000 * _.slideCount);
      } else {
          _.slideWidth = Math.ceil(_.listWidth);
          _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
      }

      var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
      if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

  };

  Slick.prototype.setFade = function() {

      var _ = this,
          targetLeft;

      _.$slides.each(function(index, element) {
          targetLeft = (_.slideWidth * index) * -1;
          if (_.options.rtl === true) {
              $(element).css({
                  position: 'relative',
                  right: targetLeft,
                  top: 0,
                  zIndex: _.options.zIndex - 2,
                  opacity: 0
              });
          } else {
              $(element).css({
                  position: 'relative',
                  left: targetLeft,
                  top: 0,
                  zIndex: _.options.zIndex - 2,
                  opacity: 0
              });
          }
      });

      _.$slides.eq(_.currentSlide).css({
          zIndex: _.options.zIndex - 1,
          opacity: 1
      });

  };

  Slick.prototype.setHeight = function() {

      var _ = this;

      if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
          var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
          _.$list.css('height', targetHeight);
      }

  };

  Slick.prototype.setOption =
  Slick.prototype.slickSetOption = function() {

      /**
       * accepts arguments in format of:
       *
       *  - for changing a single option's value:
       *     .slick("setOption", option, value, refresh )
       *
       *  - for changing a set of responsive options:
       *     .slick("setOption", 'responsive', [{}, ...], refresh )
       *
       *  - for updating multiple values at once (not responsive)
       *     .slick("setOption", { 'option': value, ... }, refresh )
       */

      var _ = this, l, item, option, value, refresh = false, type;

      if( $.type( arguments[0] ) === 'object' ) {

          option =  arguments[0];
          refresh = arguments[1];
          type = 'multiple';

      } else if ( $.type( arguments[0] ) === 'string' ) {

          option =  arguments[0];
          value = arguments[1];
          refresh = arguments[2];

          if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

              type = 'responsive';

          } else if ( typeof arguments[1] !== 'undefined' ) {

              type = 'single';

          }

      }

      if ( type === 'single' ) {

          _.options[option] = value;


      } else if ( type === 'multiple' ) {

          $.each( option , function( opt, val ) {

              _.options[opt] = val;

          });


      } else if ( type === 'responsive' ) {

          for ( item in value ) {

              if( $.type( _.options.responsive ) !== 'array' ) {

                  _.options.responsive = [ value[item] ];

              } else {

                  l = _.options.responsive.length-1;

                  // loop through the responsive object and splice out duplicates.
                  while( l >= 0 ) {

                      if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                          _.options.responsive.splice(l,1);

                      }

                      l--;

                  }

                  _.options.responsive.push( value[item] );

              }

          }

      }

      if ( refresh ) {

          _.unload();
          _.reinit();

      }

  };

  Slick.prototype.setPosition = function() {

      var _ = this;

      _.setDimensions();

      _.setHeight();

      if (_.options.fade === false) {
          _.setCSS(_.getLeft(_.currentSlide));
      } else {
          _.setFade();
      }

      _.$slider.trigger('setPosition', [_]);

  };

  Slick.prototype.setProps = function() {

      var _ = this,
          bodyStyle = document.body.style;

      _.positionProp = _.options.vertical === true ? 'top' : 'left';

      if (_.positionProp === 'top') {
          _.$slider.addClass('slick-vertical');
      } else {
          _.$slider.removeClass('slick-vertical');
      }

      if (bodyStyle.WebkitTransition !== undefined ||
          bodyStyle.MozTransition !== undefined ||
          bodyStyle.msTransition !== undefined) {
          if (_.options.useCSS === true) {
              _.cssTransitions = true;
          }
      }

      if ( _.options.fade ) {
          if ( typeof _.options.zIndex === 'number' ) {
              if( _.options.zIndex < 3 ) {
                  _.options.zIndex = 3;
              }
          } else {
              _.options.zIndex = _.defaults.zIndex;
          }
      }

      if (bodyStyle.OTransform !== undefined) {
          _.animType = 'OTransform';
          _.transformType = '-o-transform';
          _.transitionType = 'OTransition';
          if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
      }
      if (bodyStyle.MozTransform !== undefined) {
          _.animType = 'MozTransform';
          _.transformType = '-moz-transform';
          _.transitionType = 'MozTransition';
          if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
      }
      if (bodyStyle.webkitTransform !== undefined) {
          _.animType = 'webkitTransform';
          _.transformType = '-webkit-transform';
          _.transitionType = 'webkitTransition';
          if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
      }
      if (bodyStyle.msTransform !== undefined) {
          _.animType = 'msTransform';
          _.transformType = '-ms-transform';
          _.transitionType = 'msTransition';
          if (bodyStyle.msTransform === undefined) _.animType = false;
      }
      if (bodyStyle.transform !== undefined && _.animType !== false) {
          _.animType = 'transform';
          _.transformType = 'transform';
          _.transitionType = 'transition';
      }
      _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
  };


  Slick.prototype.setSlideClasses = function(index) {

      var _ = this,
          centerOffset, allSlides, indexOffset, remainder;

      allSlides = _.$slider
          .find('.slick-slide')
          .removeClass('slick-active slick-center slick-current')
          .attr('aria-hidden', 'true');

      _.$slides
          .eq(index)
          .addClass('slick-current');

      if (_.options.centerMode === true) {

          var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

          centerOffset = Math.floor(_.options.slidesToShow / 2);

          if (_.options.infinite === true) {

              if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                  _.$slides
                      .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              } else {

                  indexOffset = _.options.slidesToShow + index;
                  allSlides
                      .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              }

              if (index === 0) {

                  allSlides
                      .eq(allSlides.length - 1 - _.options.slidesToShow)
                      .addClass('slick-center');

              } else if (index === _.slideCount - 1) {

                  allSlides
                      .eq(_.options.slidesToShow)
                      .addClass('slick-center');

              }

          }

          _.$slides
              .eq(index)
              .addClass('slick-center');

      } else {

          if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

              _.$slides
                  .slice(index, index + _.options.slidesToShow)
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false');

          } else if (allSlides.length <= _.options.slidesToShow) {

              allSlides
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false');

          } else {

              remainder = _.slideCount % _.options.slidesToShow;
              indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

              if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                  allSlides
                      .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              } else {

                  allSlides
                      .slice(indexOffset, indexOffset + _.options.slidesToShow)
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              }

          }

      }

      if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
          _.lazyLoad();
      }
  };

  Slick.prototype.setupInfinite = function() {

      var _ = this,
          i, slideIndex, infiniteCount;

      if (_.options.fade === true) {
          _.options.centerMode = false;
      }

      if (_.options.infinite === true && _.options.fade === false) {

          slideIndex = null;

          if (_.slideCount > _.options.slidesToShow) {

              if (_.options.centerMode === true) {
                  infiniteCount = _.options.slidesToShow + 1;
              } else {
                  infiniteCount = _.options.slidesToShow;
              }

              for (i = _.slideCount; i > (_.slideCount -
                      infiniteCount); i -= 1) {
                  slideIndex = i - 1;
                  $(_.$slides[slideIndex]).clone(true).attr('id', '')
                      .attr('data-slick-index', slideIndex - _.slideCount)
                      .prependTo(_.$slideTrack).addClass('slick-cloned');
              }
              for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                  slideIndex = i;
                  $(_.$slides[slideIndex]).clone(true).attr('id', '')
                      .attr('data-slick-index', slideIndex + _.slideCount)
                      .appendTo(_.$slideTrack).addClass('slick-cloned');
              }
              _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                  $(this).attr('id', '');
              });

          }

      }

  };

  Slick.prototype.interrupt = function( toggle ) {

      var _ = this;

      if( !toggle ) {
          _.autoPlay();
      }
      _.interrupted = toggle;

  };

  Slick.prototype.selectHandler = function(event) {

      var _ = this;

      var targetElement =
          $(event.target).is('.slick-slide') ?
              $(event.target) :
              $(event.target).parents('.slick-slide');

      var index = parseInt(targetElement.attr('data-slick-index'));

      if (!index) index = 0;

      if (_.slideCount <= _.options.slidesToShow) {

          _.slideHandler(index, false, true);
          return;

      }

      _.slideHandler(index);

  };

  Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

      var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
          _ = this, navTarget;

      sync = sync || false;

      if (_.animating === true && _.options.waitForAnimate === true) {
          return;
      }

      if (_.options.fade === true && _.currentSlide === index) {
          return;
      }

      if (sync === false) {
          _.asNavFor(index);
      }

      targetSlide = index;
      targetLeft = _.getLeft(targetSlide);
      slideLeft = _.getLeft(_.currentSlide);

      _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

      if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
          if (_.options.fade === false) {
              targetSlide = _.currentSlide;
              if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                  _.animateSlide(slideLeft, function() {
                      _.postSlide(targetSlide);
                  });
              } else {
                  _.postSlide(targetSlide);
              }
          }
          return;
      } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
          if (_.options.fade === false) {
              targetSlide = _.currentSlide;
              if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                  _.animateSlide(slideLeft, function() {
                      _.postSlide(targetSlide);
                  });
              } else {
                  _.postSlide(targetSlide);
              }
          }
          return;
      }

      if ( _.options.autoplay ) {
          clearInterval(_.autoPlayTimer);
      }

      if (targetSlide < 0) {
          if (_.slideCount % _.options.slidesToScroll !== 0) {
              animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
          } else {
              animSlide = _.slideCount + targetSlide;
          }
      } else if (targetSlide >= _.slideCount) {
          if (_.slideCount % _.options.slidesToScroll !== 0) {
              animSlide = 0;
          } else {
              animSlide = targetSlide - _.slideCount;
          }
      } else {
          animSlide = targetSlide;
      }

      _.animating = true;

      _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

      oldSlide = _.currentSlide;
      _.currentSlide = animSlide;

      _.setSlideClasses(_.currentSlide);

      if ( _.options.asNavFor ) {

          navTarget = _.getNavTarget();
          navTarget = navTarget.slick('getSlick');

          if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
              navTarget.setSlideClasses(_.currentSlide);
          }

      }

      _.updateDots();
      _.updateArrows();

      if (_.options.fade === true) {
          if (dontAnimate !== true) {

              _.fadeSlideOut(oldSlide);

              _.fadeSlide(animSlide, function() {
                  _.postSlide(animSlide);
              });

          } else {
              _.postSlide(animSlide);
          }
          _.animateHeight();
          return;
      }

      if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(targetLeft, function() {
              _.postSlide(animSlide);
          });
      } else {
          _.postSlide(animSlide);
      }

  };

  Slick.prototype.startLoad = function() {

      var _ = this;

      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

          _.$prevArrow.hide();
          _.$nextArrow.hide();

      }

      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

          _.$dots.hide();

      }

      _.$slider.addClass('slick-loading');

  };

  Slick.prototype.swipeDirection = function() {

      var xDist, yDist, r, swipeAngle, _ = this;

      xDist = _.touchObject.startX - _.touchObject.curX;
      yDist = _.touchObject.startY - _.touchObject.curY;
      r = Math.atan2(yDist, xDist);

      swipeAngle = Math.round(r * 180 / Math.PI);
      if (swipeAngle < 0) {
          swipeAngle = 360 - Math.abs(swipeAngle);
      }

      if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
          return (_.options.rtl === false ? 'left' : 'right');
      }
      if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
          return (_.options.rtl === false ? 'left' : 'right');
      }
      if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
          return (_.options.rtl === false ? 'right' : 'left');
      }
      if (_.options.verticalSwiping === true) {
          if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
              return 'down';
          } else {
              return 'up';
          }
      }

      return 'vertical';

  };

  Slick.prototype.swipeEnd = function(event) {

      var _ = this,
          slideCount,
          direction;

      _.dragging = false;
      _.swiping = false;

      if (_.scrolling) {
          _.scrolling = false;
          return false;
      }

      _.interrupted = false;
      _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

      if ( _.touchObject.curX === undefined ) {
          return false;
      }

      if ( _.touchObject.edgeHit === true ) {
          _.$slider.trigger('edge', [_, _.swipeDirection() ]);
      }

      if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

          direction = _.swipeDirection();

          switch ( direction ) {

              case 'left':
              case 'down':

                  slideCount =
                      _.options.swipeToSlide ?
                          _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                          _.currentSlide + _.getSlideCount();

                  _.currentDirection = 0;

                  break;

              case 'right':
              case 'up':

                  slideCount =
                      _.options.swipeToSlide ?
                          _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                          _.currentSlide - _.getSlideCount();

                  _.currentDirection = 1;

                  break;

              default:


          }

          if( direction != 'vertical' ) {

              _.slideHandler( slideCount );
              _.touchObject = {};
              _.$slider.trigger('swipe', [_, direction ]);

          }

      } else {

          if ( _.touchObject.startX !== _.touchObject.curX ) {

              _.slideHandler( _.currentSlide );
              _.touchObject = {};

          }

      }

  };

  Slick.prototype.swipeHandler = function(event) {

      var _ = this;

      if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
          return;
      } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
          return;
      }

      _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
          event.originalEvent.touches.length : 1;

      _.touchObject.minSwipe = _.listWidth / _.options
          .touchThreshold;

      if (_.options.verticalSwiping === true) {
          _.touchObject.minSwipe = _.listHeight / _.options
              .touchThreshold;
      }

      switch (event.data.action) {

          case 'start':
              _.swipeStart(event);
              break;

          case 'move':
              _.swipeMove(event);
              break;

          case 'end':
              _.swipeEnd(event);
              break;

      }

  };

  Slick.prototype.swipeMove = function(event) {

      var _ = this,
          edgeWasHit = false,
          curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

      touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

      if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
          return false;
      }

      curLeft = _.getLeft(_.currentSlide);

      _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
      _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

      _.touchObject.swipeLength = Math.round(Math.sqrt(
          Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

      verticalSwipeLength = Math.round(Math.sqrt(
          Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

      if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
          _.scrolling = true;
          return false;
      }

      if (_.options.verticalSwiping === true) {
          _.touchObject.swipeLength = verticalSwipeLength;
      }

      swipeDirection = _.swipeDirection();

      if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
          _.swiping = true;
          event.preventDefault();
      }

      positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
      if (_.options.verticalSwiping === true) {
          positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
      }


      swipeLength = _.touchObject.swipeLength;

      _.touchObject.edgeHit = false;

      if (_.options.infinite === false) {
          if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
              swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
              _.touchObject.edgeHit = true;
          }
      }

      if (_.options.vertical === false) {
          _.swipeLeft = curLeft + swipeLength * positionOffset;
      } else {
          _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
      }
      if (_.options.verticalSwiping === true) {
          _.swipeLeft = curLeft + swipeLength * positionOffset;
      }

      if (_.options.fade === true || _.options.touchMove === false) {
          return false;
      }

      if (_.animating === true) {
          _.swipeLeft = null;
          return false;
      }

      _.setCSS(_.swipeLeft);

  };

  Slick.prototype.swipeStart = function(event) {

      var _ = this,
          touches;

      _.interrupted = true;

      if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
          _.touchObject = {};
          return false;
      }

      if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
          touches = event.originalEvent.touches[0];
      }

      _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
      _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

      _.dragging = true;

  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

      var _ = this;

      if (_.$slidesCache !== null) {

          _.unload();

          _.$slideTrack.children(this.options.slide).detach();

          _.$slidesCache.appendTo(_.$slideTrack);

          _.reinit();

      }

  };

  Slick.prototype.unload = function() {

      var _ = this;

      $('.slick-cloned', _.$slider).remove();

      if (_.$dots) {
          _.$dots.remove();
      }

      if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.remove();
      }

      if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.remove();
      }

      _.$slides
          .removeClass('slick-slide slick-active slick-visible slick-current')
          .attr('aria-hidden', 'true')
          .css('width', '');

  };

  Slick.prototype.unslick = function(fromBreakpoint) {

      var _ = this;
      _.$slider.trigger('unslick', [_, fromBreakpoint]);
      _.destroy();

  };

  Slick.prototype.updateArrows = function() {

      var _ = this,
          centerOffset;

      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if ( _.options.arrows === true &&
          _.slideCount > _.options.slidesToShow &&
          !_.options.infinite ) {

          _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
          _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

          if (_.currentSlide === 0) {

              _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
              _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

          } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

              _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
              _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

          } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

              _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
              _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

          }

      }

  };

  Slick.prototype.updateDots = function() {

      var _ = this;

      if (_.$dots !== null) {

          _.$dots
              .find('li')
                  .removeClass('slick-active')
                  .end();

          _.$dots
              .find('li')
              .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
              .addClass('slick-active');

      }

  };

  Slick.prototype.visibility = function() {

      var _ = this;

      if ( _.options.autoplay ) {

          if ( document[_.hidden] ) {

              _.interrupted = true;

          } else {

              _.interrupted = false;

          }

      }

  };

  $.fn.slick = function() {
      var _ = this,
          opt = arguments[0],
          args = Array.prototype.slice.call(arguments, 1),
          l = _.length,
          i,
          ret;
      for (i = 0; i < l; i++) {
          if (typeof opt == 'object' || typeof opt == 'undefined')
              _[i].slick = new Slick(_[i], opt);
          else
              ret = _[i].slick[opt].apply(_[i].slick, args);
          if (typeof ret != 'undefined') return ret;
      }
      return _;
  };

}));
;// Cart.js
// version: 0.4.1
// author: Gavin Ballard
// license: MIT
(function() {
// Public sightglass interface.
function sightglass(obj, keypath, callback, options) {
  return new Observer(obj, keypath, callback, options)
}

// Batteries not included.
sightglass.adapters = {}

// Constructs a new keypath observer and kicks things off.
function Observer(obj, keypath, callback, options) {
  this.options = options || {}
  this.options.adapters = this.options.adapters || {}
  this.obj = obj
  this.keypath = keypath
  this.callback = callback
  this.objectPath = []
  this.parse()

  if (isObject(this.target = this.realize())) {
    this.set(true, this.key, this.target, this.callback)
  }
}

// Tokenizes the provided keypath string into interface + path tokens for the
// observer to work with.
Observer.tokenize = function(keypath, interfaces, root) {
  var tokens = []
  var current = {i: root, path: ''}
  var index, chr

  for (index = 0; index < keypath.length; index++) {
    chr = keypath.charAt(index)

    if (!!~interfaces.indexOf(chr)) {
      tokens.push(current)
      current = {i: chr, path: ''}
    } else {
      current.path += chr
    }
  }

  tokens.push(current)
  return tokens
}

// Parses the keypath using the interfaces defined on the view. Sets variables
// for the tokenized keypath as well as the end key.
Observer.prototype.parse = function() {
  var interfaces = this.interfaces()
  var root, path

  if (!interfaces.length) {
    error('Must define at least one adapter interface.')
  }

  if (!!~interfaces.indexOf(this.keypath[0])) {
    root = this.keypath[0]
    path = this.keypath.substr(1)
  } else {
    if (typeof (root = this.options.root || sightglass.root) === 'undefined') {
      error('Must define a default root adapter.')
    }

    path = this.keypath
  }

  this.tokens = Observer.tokenize(path, interfaces, root)
  this.key = this.tokens.pop()
}

// Realizes the full keypath, attaching observers for every key and correcting
// old observers to any changed objects in the keypath.
Observer.prototype.realize = function() {
  var current = this.obj
  var unreached = false
  var prev

  this.tokens.forEach(function(token, index) {
    if (isObject(current)) {
      if (typeof this.objectPath[index] !== 'undefined') {
        if (current !== (prev = this.objectPath[index])) {
          this.set(false, token, prev, this.update.bind(this))
          this.set(true, token, current, this.update.bind(this))
          this.objectPath[index] = current
        }
      } else {
        this.set(true, token, current, this.update.bind(this))
        this.objectPath[index] = current
      }

      current = this.get(token, current)
    } else {
      if (unreached === false) {
        unreached = index
      }

      if (prev = this.objectPath[index]) {
        this.set(false, token, prev, this.update.bind(this))
      }
    }
  }, this)

  if (unreached !== false) {
    this.objectPath.splice(unreached)
  }

  return current
}

// Updates the keypath. This is called when any intermediary key is changed.
Observer.prototype.update = function() {
  var next, oldValue

  if ((next = this.realize()) !== this.target) {
    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback)
    }

    if (isObject(next)) {
      this.set(true, this.key, next, this.callback)
    }

    oldValue = this.value()
    this.target = next

    if (this.value() !== oldValue) this.callback()
  }
}

// Reads the current end value of the observed keypath. Returns undefined if
// the full keypath is unreachable.
Observer.prototype.value = function() {
  if (isObject(this.target)) {
    return this.get(this.key, this.target)
  }
}

// Sets the current end value of the observed keypath. Calling setValue when
// the full keypath is unreachable is a no-op.
Observer.prototype.setValue = function(value) {
  if (isObject(this.target)) {
    this.adapter(this.key).set(this.target, this.key.path, value)
  }
}

// Gets the provided key on an object.
Observer.prototype.get = function(key, obj) {
  return this.adapter(key).get(obj, key.path)
}

// Observes or unobserves a callback on the object using the provided key.
Observer.prototype.set = function(active, key, obj, callback) {
  var action = active ? 'observe' : 'unobserve'
  this.adapter(key)[action](obj, key.path, callback)
}

// Returns an array of all unique adapter interfaces available.
Observer.prototype.interfaces = function() {
  var interfaces = Object.keys(this.options.adapters)

  Object.keys(sightglass.adapters).forEach(function(i) {
    if (!~interfaces.indexOf(i)) {
      interfaces.push(i)
    }
  })

  return interfaces
}

// Convenience function to grab the adapter for a specific key.
Observer.prototype.adapter = function(key) {
  return this.options.adapters[key.i] ||
    sightglass.adapters[key.i]
}

// Unobserves the entire keypath.
Observer.prototype.unobserve = function() {
  var obj

  this.tokens.forEach(function(token, index) {
    if (obj = this.objectPath[index]) {
      this.set(false, token, obj, this.update.bind(this))
    }
  }, this)

  if (isObject(this.target)) {
    this.set(false, this.key, this.target, this.callback)
  }
}

// Check if a value is an object than can be observed.
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

// Error thrower.
function error(message) {
  throw new Error('[sightglass] ' + message)
}

// Export module for Node and the browser.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sightglass
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return this.sightglass = sightglass
  })
} else {
  this.sightglass = sightglass
}
}).call(this);

// Rivets.js
// version: 0.8.1
// author: Michael Richards
// license: MIT
(function() {
var Rivets, bindMethod, unbindMethod, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Rivets = {
  options: ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler'],
  extensions: ['binders', 'formatters', 'components', 'adapters'],
  "public": {
    binders: {},
    components: {},
    formatters: {},
    adapters: {},
    prefix: 'rv',
    templateDelimiters: ['{', '}'],
    rootInterface: '.',
    preloadData: true,
    handler: function(context, ev, binding) {
      return this.call(context, ev, binding.view.models);
    },
    configure: function(options) {
      var descriptor, key, option, value;
      if (options == null) {
        options = {};
      }
      for (option in options) {
        value = options[option];
        if (option === 'binders' || option === 'components' || option === 'formatters' || option === 'adapters') {
          for (key in value) {
            descriptor = value[key];
            Rivets[option][key] = descriptor;
          }
        } else {
          Rivets["public"][option] = value;
        }
      }
    },
    bind: function(el, models, options) {
      var view;
      if (models == null) {
        models = {};
      }
      if (options == null) {
        options = {};
      }
      view = new Rivets.View(el, models, options);
      view.bind();
      return view;
    },
    init: function(component, el, data) {
      var scope, view;
      if (data == null) {
        data = {};
      }
      if (el == null) {
        el = document.createElement('div');
      }
      component = Rivets["public"].components[component];
      el.innerHTML = component.template.call(this, el);
      scope = component.initialize.call(this, el, data);
      view = new Rivets.View(el, scope);
      view.bind();
      return view;
    }
  }
};

if (window['jQuery'] || window['$']) {
  _ref = 'on' in jQuery.prototype ? ['on', 'off'] : ['bind', 'unbind'], bindMethod = _ref[0], unbindMethod = _ref[1];
  Rivets.Util = {
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
  Rivets.Util = {
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

Rivets.TypeParser = (function() {
  function TypeParser() {}

  TypeParser.types = {
    primitive: 0,
    keypath: 1
  };

  TypeParser.parse = function(string) {
    if (/^'.*'$|^".*"$/.test(string)) {
      return {
        type: this.types.primitive,
        value: string.slice(1, -1)
      };
    } else if (string === 'true') {
      return {
        type: this.types.primitive,
        value: true
      };
    } else if (string === 'false') {
      return {
        type: this.types.primitive,
        value: false
      };
    } else if (string === 'null') {
      return {
        type: this.types.primitive,
        value: null
      };
    } else if (string === 'undefined') {
      return {
        type: this.types.primitive,
        value: void 0
      };
    } else if (isNaN(Number(string)) === false) {
      return {
        type: this.types.primitive,
        value: Number(string)
      };
    } else {
      return {
        type: this.types.keypath,
        value: string
      };
    }
  };

  return TypeParser;

})();

Rivets.TextTemplateParser = (function() {
  function TextTemplateParser() {}

  TextTemplateParser.types = {
    text: 0,
    binding: 1
  };

  TextTemplateParser.parse = function(template, delimiters) {
    var index, lastIndex, lastToken, length, substring, tokens, value;
    tokens = [];
    length = template.length;
    index = 0;
    lastIndex = 0;
    while (lastIndex < length) {
      index = template.indexOf(delimiters[0], lastIndex);
      if (index < 0) {
        tokens.push({
          type: this.types.text,
          value: template.slice(lastIndex)
        });
        break;
      } else {
        if (index > 0 && lastIndex < index) {
          tokens.push({
            type: this.types.text,
            value: template.slice(lastIndex, index)
          });
        }
        lastIndex = index + delimiters[0].length;
        index = template.indexOf(delimiters[1], lastIndex);
        if (index < 0) {
          substring = template.slice(lastIndex - delimiters[1].length);
          lastToken = tokens[tokens.length - 1];
          if ((lastToken != null ? lastToken.type : void 0) === this.types.text) {
            lastToken.value += substring;
          } else {
            tokens.push({
              type: this.types.text,
              value: substring
            });
          }
          break;
        }
        value = template.slice(lastIndex, index).trim();
        tokens.push({
          type: this.types.binding,
          value: value
        });
        lastIndex = index + delimiters[1].length;
      }
    }
    return tokens;
  };

  return TextTemplateParser;

})();

Rivets.View = (function() {
  function View(els, models, options) {
    var k, option, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5;
    this.els = els;
    this.models = models;
    if (options == null) {
      options = {};
    }
    this.update = __bind(this.update, this);
    this.publish = __bind(this.publish, this);
    this.sync = __bind(this.sync, this);
    this.unbind = __bind(this.unbind, this);
    this.bind = __bind(this.bind, this);
    this.select = __bind(this.select, this);
    this.traverse = __bind(this.traverse, this);
    this.build = __bind(this.build, this);
    this.buildBinding = __bind(this.buildBinding, this);
    this.bindingRegExp = __bind(this.bindingRegExp, this);
    this.options = __bind(this.options, this);
    if (!(this.els.jquery || this.els instanceof Array)) {
      this.els = [this.els];
    }
    _ref1 = Rivets.extensions;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      option = _ref1[_i];
      this[option] = {};
      if (options[option]) {
        _ref2 = options[option];
        for (k in _ref2) {
          v = _ref2[k];
          this[option][k] = v;
        }
      }
      _ref3 = Rivets["public"][option];
      for (k in _ref3) {
        v = _ref3[k];
        if ((_base = this[option])[k] == null) {
          _base[k] = v;
        }
      }
    }
    _ref4 = Rivets.options;
    for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
      option = _ref4[_j];
      this[option] = (_ref5 = options[option]) != null ? _ref5 : Rivets["public"][option];
    }
    this.build();
  }

  View.prototype.options = function() {
    var option, options, _i, _len, _ref1;
    options = {};
    _ref1 = Rivets.extensions.concat(Rivets.options);
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      option = _ref1[_i];
      options[option] = this[option];
    }
    return options;
  };

  View.prototype.bindingRegExp = function() {
    return new RegExp("^" + this.prefix + "-");
  };

  View.prototype.buildBinding = function(binding, node, type, declaration) {
    var context, ctx, dependencies, keypath, options, pipe, pipes;
    options = {};
    pipes = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = declaration.split('|');
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        pipe = _ref1[_i];
        _results.push(pipe.trim());
      }
      return _results;
    })();
    context = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = pipes.shift().split('<');
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        ctx = _ref1[_i];
        _results.push(ctx.trim());
      }
      return _results;
    })();
    keypath = context.shift();
    options.formatters = pipes;
    if (dependencies = context.shift()) {
      options.dependencies = dependencies.split(/\s+/);
    }
    return this.bindings.push(new Rivets[binding](this, node, type, keypath, options));
  };

  View.prototype.build = function() {
    var el, parse, _i, _len, _ref1;
    this.bindings = [];
    parse = (function(_this) {
      return function(node) {
        var block, childNode, delimiters, n, parser, text, token, tokens, _i, _j, _len, _len1, _ref1, _results;
        if (node.nodeType === 3) {
          parser = Rivets.TextTemplateParser;
          if (delimiters = _this.templateDelimiters) {
            if ((tokens = parser.parse(node.data, delimiters)).length) {
              if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
                for (_i = 0, _len = tokens.length; _i < _len; _i++) {
                  token = tokens[_i];
                  text = document.createTextNode(token.value);
                  node.parentNode.insertBefore(text, node);
                  if (token.type === 1) {
                    _this.buildBinding('TextBinding', text, null, token.value);
                  }
                }
                node.parentNode.removeChild(node);
              }
            }
          }
        } else if (node.nodeType === 1) {
          block = _this.traverse(node);
        }
        if (!block) {
          _ref1 = (function() {
            var _k, _len1, _ref1, _results1;
            _ref1 = node.childNodes;
            _results1 = [];
            for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
              n = _ref1[_k];
              _results1.push(n);
            }
            return _results1;
          })();
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            childNode = _ref1[_j];
            _results.push(parse(childNode));
          }
          return _results;
        }
      };
    })(this);
    _ref1 = this.els;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      el = _ref1[_i];
      parse(el);
    }
    this.bindings.sort(function(a, b) {
      var _ref2, _ref3;
      return (((_ref2 = b.binder) != null ? _ref2.priority : void 0) || 0) - (((_ref3 = a.binder) != null ? _ref3.priority : void 0) || 0);
    });
  };

  View.prototype.traverse = function(node) {
    var attribute, attributes, binder, bindingRegExp, block, identifier, regexp, type, value, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
    bindingRegExp = this.bindingRegExp();
    block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
    _ref1 = node.attributes;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      attribute = _ref1[_i];
      if (bindingRegExp.test(attribute.name)) {
        type = attribute.name.replace(bindingRegExp, '');
        if (!(binder = this.binders[type])) {
          _ref2 = this.binders;
          for (identifier in _ref2) {
            value = _ref2[identifier];
            if (identifier !== '*' && identifier.indexOf('*') !== -1) {
              regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
              if (regexp.test(type)) {
                binder = value;
              }
            }
          }
        }
        binder || (binder = this.binders['*']);
        if (binder.block) {
          block = true;
          attributes = [attribute];
        }
      }
    }
    _ref3 = attributes || node.attributes;
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      attribute = _ref3[_j];
      if (bindingRegExp.test(attribute.name)) {
        type = attribute.name.replace(bindingRegExp, '');
        this.buildBinding('Binding', node, type, attribute.value);
      }
    }
    if (!block) {
      type = node.nodeName.toLowerCase();
      if (this.components[type] && !node._bound) {
        this.bindings.push(new Rivets.ComponentBinding(this, node, type));
        block = true;
      }
    }
    return block;
  };

  View.prototype.select = function(fn) {
    var binding, _i, _len, _ref1, _results;
    _ref1 = this.bindings;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      if (fn(binding)) {
        _results.push(binding);
      }
    }
    return _results;
  };

  View.prototype.bind = function() {
    var binding, _i, _len, _ref1, _results;
    _ref1 = this.bindings;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      _results.push(binding.bind());
    }
    return _results;
  };

  View.prototype.unbind = function() {
    var binding, _i, _len, _ref1, _results;
    _ref1 = this.bindings;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      _results.push(binding.unbind());
    }
    return _results;
  };

  View.prototype.sync = function() {
    var binding, _i, _len, _ref1, _results;
    _ref1 = this.bindings;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      _results.push(typeof binding.sync === "function" ? binding.sync() : void 0);
    }
    return _results;
  };

  View.prototype.publish = function() {
    var binding, _i, _len, _ref1, _results;
    _ref1 = this.select(function(b) {
      var _ref1;
      return (_ref1 = b.binder) != null ? _ref1.publishes : void 0;
    });
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      _results.push(binding.publish());
    }
    return _results;
  };

  View.prototype.update = function(models) {
    var binding, key, model, _i, _len, _ref1, _results;
    if (models == null) {
      models = {};
    }
    for (key in models) {
      model = models[key];
      this.models[key] = model;
    }
    _ref1 = this.bindings;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      binding = _ref1[_i];
      _results.push(typeof binding.update === "function" ? binding.update(models) : void 0);
    }
    return _results;
  };

  return View;

})();

Rivets.Binding = (function() {
  function Binding(view, el, type, keypath, options) {
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.options = options != null ? options : {};
    this.getValue = __bind(this.getValue, this);
    this.update = __bind(this.update, this);
    this.unbind = __bind(this.unbind, this);
    this.bind = __bind(this.bind, this);
    this.publish = __bind(this.publish, this);
    this.sync = __bind(this.sync, this);
    this.set = __bind(this.set, this);
    this.eventHandler = __bind(this.eventHandler, this);
    this.formattedValue = __bind(this.formattedValue, this);
    this.parseTarget = __bind(this.parseTarget, this);
    this.observe = __bind(this.observe, this);
    this.setBinder = __bind(this.setBinder, this);
    this.formatters = this.options.formatters || [];
    this.dependencies = [];
    this.formatterObservers = {};
    this.model = void 0;
    this.setBinder();
  }

  Binding.prototype.setBinder = function() {
    var identifier, regexp, value, _ref1;
    if (!(this.binder = this.view.binders[this.type])) {
      _ref1 = this.view.binders;
      for (identifier in _ref1) {
        value = _ref1[identifier];
        if (identifier !== '*' && identifier.indexOf('*') !== -1) {
          regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
          if (regexp.test(this.type)) {
            this.binder = value;
            this.args = new RegExp("^" + (identifier.replace(/\*/g, '(.+)')) + "$").exec(this.type);
            this.args.shift();
          }
        }
      }
    }
    this.binder || (this.binder = this.view.binders['*']);
    if (this.binder instanceof Function) {
      return this.binder = {
        routine: this.binder
      };
    }
  };

  Binding.prototype.observe = function(obj, keypath, callback) {
    return Rivets.sightglass(obj, keypath, callback, {
      root: this.view.rootInterface,
      adapters: this.view.adapters
    });
  };

  Binding.prototype.parseTarget = function() {
    var token;
    token = Rivets.TypeParser.parse(this.keypath);
    if (token.type === 0) {
      return this.value = token.value;
    } else {
      this.observer = this.observe(this.view.models, this.keypath, this.sync);
      return this.model = this.observer.target;
    }
  };

  Binding.prototype.formattedValue = function(value) {
    var ai, arg, args, fi, formatter, id, observer, processedArgs, _base, _i, _j, _len, _len1, _ref1;
    _ref1 = this.formatters;
    for (fi = _i = 0, _len = _ref1.length; _i < _len; fi = ++_i) {
      formatter = _ref1[fi];
      args = formatter.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g);
      id = args.shift();
      formatter = this.view.formatters[id];
      args = (function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
          arg = args[_j];
          _results.push(Rivets.TypeParser.parse(arg));
        }
        return _results;
      })();
      processedArgs = [];
      for (ai = _j = 0, _len1 = args.length; _j < _len1; ai = ++_j) {
        arg = args[ai];
        processedArgs.push(arg.type === 0 ? arg.value : ((_base = this.formatterObservers)[fi] || (_base[fi] = {}), !(observer = this.formatterObservers[fi][ai]) ? (observer = this.observe(this.view.models, arg.value, this.sync), this.formatterObservers[fi][ai] = observer) : void 0, observer.value()));
      }
      if ((formatter != null ? formatter.read : void 0) instanceof Function) {
        value = formatter.read.apply(formatter, [value].concat(__slice.call(processedArgs)));
      } else if (formatter instanceof Function) {
        value = formatter.apply(null, [value].concat(__slice.call(processedArgs)));
      }
    }
    return value;
  };

  Binding.prototype.eventHandler = function(fn) {
    var binding, handler;
    handler = (binding = this).view.handler;
    return function(ev) {
      return handler.call(fn, this, ev, binding);
    };
  };

  Binding.prototype.set = function(value) {
    var _ref1;
    value = value instanceof Function && !this.binder["function"] ? this.formattedValue(value.call(this.model)) : this.formattedValue(value);
    return (_ref1 = this.binder.routine) != null ? _ref1.call(this, this.el, value) : void 0;
  };

  Binding.prototype.sync = function() {
    var dependency, observer;
    return this.set((function() {
      var _i, _j, _len, _len1, _ref1, _ref2, _ref3;
      if (this.observer) {
        if (this.model !== this.observer.target) {
          _ref1 = this.dependencies;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            observer = _ref1[_i];
            observer.unobserve();
          }
          this.dependencies = [];
          if (((this.model = this.observer.target) != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
            _ref3 = this.options.dependencies;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
              dependency = _ref3[_j];
              observer = this.observe(this.model, dependency, this.sync);
              this.dependencies.push(observer);
            }
          }
        }
        return this.observer.value();
      } else {
        return this.value;
      }
    }).call(this));
  };

  Binding.prototype.publish = function() {
    var args, formatter, id, value, _i, _len, _ref1, _ref2, _ref3;
    if (this.observer) {
      value = this.getValue(this.el);
      _ref1 = this.formatters.slice(0).reverse();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        formatter = _ref1[_i];
        args = formatter.split(/\s+/);
        id = args.shift();
        if ((_ref2 = this.view.formatters[id]) != null ? _ref2.publish : void 0) {
          value = (_ref3 = this.view.formatters[id]).publish.apply(_ref3, [value].concat(__slice.call(args)));
        }
      }
      return this.observer.setValue(value);
    }
  };

  Binding.prototype.bind = function() {
    var dependency, observer, _i, _len, _ref1, _ref2, _ref3;
    this.parseTarget();
    if ((_ref1 = this.binder.bind) != null) {
      _ref1.call(this, this.el);
    }
    if ((this.model != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
      _ref3 = this.options.dependencies;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        dependency = _ref3[_i];
        observer = this.observe(this.model, dependency, this.sync);
        this.dependencies.push(observer);
      }
    }
    if (this.view.preloadData) {
      return this.sync();
    }
  };

  Binding.prototype.unbind = function() {
    var ai, args, fi, observer, _i, _len, _ref1, _ref2, _ref3, _ref4;
    if ((_ref1 = this.binder.unbind) != null) {
      _ref1.call(this, this.el);
    }
    if ((_ref2 = this.observer) != null) {
      _ref2.unobserve();
    }
    _ref3 = this.dependencies;
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      observer = _ref3[_i];
      observer.unobserve();
    }
    this.dependencies = [];
    _ref4 = this.formatterObservers;
    for (fi in _ref4) {
      args = _ref4[fi];
      for (ai in args) {
        observer = args[ai];
        observer.unobserve();
      }
    }
    return this.formatterObservers = {};
  };

  Binding.prototype.update = function(models) {
    var _ref1, _ref2;
    if (models == null) {
      models = {};
    }
    this.model = (_ref1 = this.observer) != null ? _ref1.target : void 0;
    return (_ref2 = this.binder.update) != null ? _ref2.call(this, models) : void 0;
  };

  Binding.prototype.getValue = function(el) {
    if (this.binder && (this.binder.getValue != null)) {
      return this.binder.getValue.call(this, el);
    } else {
      return Rivets.Util.getInputValue(el);
    }
  };

  return Binding;

})();

Rivets.ComponentBinding = (function(_super) {
  __extends(ComponentBinding, _super);

  function ComponentBinding(view, el, type) {
    var attribute, bindingRegExp, propertyName, _i, _len, _ref1, _ref2;
    this.view = view;
    this.el = el;
    this.type = type;
    this.unbind = __bind(this.unbind, this);
    this.bind = __bind(this.bind, this);
    this.locals = __bind(this.locals, this);
    this.component = this.view.components[this.type];
    this["static"] = {};
    this.observers = {};
    this.upstreamObservers = {};
    bindingRegExp = view.bindingRegExp();
    _ref1 = this.el.attributes || [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      attribute = _ref1[_i];
      if (!bindingRegExp.test(attribute.name)) {
        propertyName = this.camelCase(attribute.name);
        if (__indexOf.call((_ref2 = this.component["static"]) != null ? _ref2 : [], propertyName) >= 0) {
          this["static"][propertyName] = attribute.value;
        } else {
          this.observers[propertyName] = attribute.value;
        }
      }
    }
  }

  ComponentBinding.prototype.sync = function() {};

  ComponentBinding.prototype.update = function() {};

  ComponentBinding.prototype.publish = function() {};

  ComponentBinding.prototype.locals = function() {
    var key, observer, result, value, _ref1, _ref2;
    result = {};
    _ref1 = this["static"];
    for (key in _ref1) {
      value = _ref1[key];
      result[key] = value;
    }
    _ref2 = this.observers;
    for (key in _ref2) {
      observer = _ref2[key];
      result[key] = observer.value();
    }
    return result;
  };

  ComponentBinding.prototype.camelCase = function(string) {
    return string.replace(/-([a-z])/g, function(grouped) {
      return grouped[1].toUpperCase();
    });
  };

  ComponentBinding.prototype.bind = function() {
    var k, key, keypath, observer, option, options, scope, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _results;
    if (!this.bound) {
      _ref1 = this.observers;
      for (key in _ref1) {
        keypath = _ref1[key];
        this.observers[key] = this.observe(this.view.models, keypath, ((function(_this) {
          return function(key) {
            return function() {
              return _this.componentView.models[key] = _this.observers[key].value();
            };
          };
        })(this)).call(this, key));
      }
      this.bound = true;
    }
    if (this.componentView != null) {
      return this.componentView.bind();
    } else {
      this.el.innerHTML = this.component.template.call(this);
      scope = this.component.initialize.call(this, this.el, this.locals());
      this.el._bound = true;
      options = {};
      _ref2 = Rivets.extensions;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        option = _ref2[_i];
        options[option] = {};
        if (this.component[option]) {
          _ref3 = this.component[option];
          for (k in _ref3) {
            v = _ref3[k];
            options[option][k] = v;
          }
        }
        _ref4 = this.view[option];
        for (k in _ref4) {
          v = _ref4[k];
          if ((_base = options[option])[k] == null) {
            _base[k] = v;
          }
        }
      }
      _ref5 = Rivets.options;
      for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
        option = _ref5[_j];
        options[option] = (_ref6 = this.component[option]) != null ? _ref6 : this.view[option];
      }
      this.componentView = new Rivets.View(this.el, scope, options);
      this.componentView.bind();
      _ref7 = this.observers;
      _results = [];
      for (key in _ref7) {
        observer = _ref7[key];
        _results.push(this.upstreamObservers[key] = this.observe(this.componentView.models, key, ((function(_this) {
          return function(key, observer) {
            return function() {
              return observer.setValue(_this.componentView.models[key]);
            };
          };
        })(this)).call(this, key, observer)));
      }
      return _results;
    }
  };

  ComponentBinding.prototype.unbind = function() {
    var key, observer, _ref1, _ref2, _ref3;
    _ref1 = this.upstreamObservers;
    for (key in _ref1) {
      observer = _ref1[key];
      observer.unobserve();
    }
    _ref2 = this.observers;
    for (key in _ref2) {
      observer = _ref2[key];
      observer.unobserve();
    }
    return (_ref3 = this.componentView) != null ? _ref3.unbind.call(this) : void 0;
  };

  return ComponentBinding;

})(Rivets.Binding);

Rivets.TextBinding = (function(_super) {
  __extends(TextBinding, _super);

  function TextBinding(view, el, type, keypath, options) {
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.options = options != null ? options : {};
    this.sync = __bind(this.sync, this);
    this.formatters = this.options.formatters || [];
    this.dependencies = [];
    this.formatterObservers = {};
  }

  TextBinding.prototype.binder = {
    routine: function(node, value) {
      return node.data = value != null ? value : '';
    }
  };

  TextBinding.prototype.sync = function() {
    return TextBinding.__super__.sync.apply(this, arguments);
  };

  return TextBinding;

})(Rivets.Binding);

Rivets["public"].binders.text = function(el, value) {
  if (el.textContent != null) {
    return el.textContent = value != null ? value : '';
  } else {
    return el.innerText = value != null ? value : '';
  }
};

Rivets["public"].binders.html = function(el, value) {
  return el.innerHTML = value != null ? value : '';
};

Rivets["public"].binders.show = function(el, value) {
  return el.style.display = value ? '' : 'none';
};

Rivets["public"].binders.hide = function(el, value) {
  return el.style.display = value ? 'none' : '';
};

Rivets["public"].binders.enabled = function(el, value) {
  return el.disabled = !value;
};

Rivets["public"].binders.disabled = function(el, value) {
  return el.disabled = !!value;
};

Rivets["public"].binders.checked = {
  publishes: true,
  priority: 2000,
  bind: function(el) {
    return Rivets.Util.bindEvent(el, 'change', this.publish);
  },
  unbind: function(el) {
    return Rivets.Util.unbindEvent(el, 'change', this.publish);
  },
  routine: function(el, value) {
    var _ref1;
    if (el.type === 'radio') {
      return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) === (value != null ? value.toString() : void 0);
    } else {
      return el.checked = !!value;
    }
  }
};

Rivets["public"].binders.unchecked = {
  publishes: true,
  priority: 2000,
  bind: function(el) {
    return Rivets.Util.bindEvent(el, 'change', this.publish);
  },
  unbind: function(el) {
    return Rivets.Util.unbindEvent(el, 'change', this.publish);
  },
  routine: function(el, value) {
    var _ref1;
    if (el.type === 'radio') {
      return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) !== (value != null ? value.toString() : void 0);
    } else {
      return el.checked = !value;
    }
  }
};

Rivets["public"].binders.value = {
  publishes: true,
  priority: 3000,
  bind: function(el) {
    if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
      this.event = el.tagName === 'SELECT' ? 'change' : 'input';
      return Rivets.Util.bindEvent(el, this.event, this.publish);
    }
  },
  unbind: function(el) {
    if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
      return Rivets.Util.unbindEvent(el, this.event, this.publish);
    }
  },
  routine: function(el, value) {
    var o, _i, _len, _ref1, _ref2, _ref3, _results;
    if (el.tagName === 'INPUT' && el.type === 'radio') {
      return el.setAttribute('value', value);
    } else if (window.jQuery != null) {
      el = jQuery(el);
      if ((value != null ? value.toString() : void 0) !== ((_ref1 = el.val()) != null ? _ref1.toString() : void 0)) {
        return el.val(value != null ? value : '');
      }
    } else {
      if (el.type === 'select-multiple') {
        if (value != null) {
          _results = [];
          for (_i = 0, _len = el.length; _i < _len; _i++) {
            o = el[_i];
            _results.push(o.selected = (_ref2 = o.value, __indexOf.call(value, _ref2) >= 0));
          }
          return _results;
        }
      } else if ((value != null ? value.toString() : void 0) !== ((_ref3 = el.value) != null ? _ref3.toString() : void 0)) {
        return el.value = value != null ? value : '';
      }
    }
  }
};

Rivets["public"].binders["if"] = {
  block: true,
  priority: 4000,
  bind: function(el) {
    var attr, declaration;
    if (this.marker == null) {
      attr = [this.view.prefix, this.type].join('-').replace('--', '-');
      declaration = el.getAttribute(attr);
      this.marker = document.createComment(" rivets: " + this.type + " " + declaration + " ");
      this.bound = false;
      el.removeAttribute(attr);
      el.parentNode.insertBefore(this.marker, el);
      return el.parentNode.removeChild(el);
    }
  },
  unbind: function() {
    var _ref1;
    return (_ref1 = this.nested) != null ? _ref1.unbind() : void 0;
  },
  routine: function(el, value) {
    var key, model, models, _ref1;
    if (!!value === !this.bound) {
      if (value) {
        models = {};
        _ref1 = this.view.models;
        for (key in _ref1) {
          model = _ref1[key];
          models[key] = model;
        }
        (this.nested || (this.nested = new Rivets.View(el, models, this.view.options()))).bind();
        this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        return this.bound = true;
      } else {
        el.parentNode.removeChild(el);
        this.nested.unbind();
        return this.bound = false;
      }
    }
  },
  update: function(models) {
    var _ref1;
    return (_ref1 = this.nested) != null ? _ref1.update(models) : void 0;
  }
};

Rivets["public"].binders.unless = {
  block: true,
  priority: 4000,
  bind: function(el) {
    return Rivets["public"].binders["if"].bind.call(this, el);
  },
  unbind: function() {
    return Rivets["public"].binders["if"].unbind.call(this);
  },
  routine: function(el, value) {
    return Rivets["public"].binders["if"].routine.call(this, el, !value);
  },
  update: function(models) {
    return Rivets["public"].binders["if"].update.call(this, models);
  }
};

Rivets["public"].binders['on-*'] = {
  "function": true,
  priority: 1000,
  unbind: function(el) {
    if (this.handler) {
      return Rivets.Util.unbindEvent(el, this.args[0], this.handler);
    }
  },
  routine: function(el, value) {
    if (this.handler) {
      Rivets.Util.unbindEvent(el, this.args[0], this.handler);
    }
    return Rivets.Util.bindEvent(el, this.args[0], this.handler = this.eventHandler(value));
  }
};

Rivets["public"].binders['each-*'] = {
  block: true,
  priority: 4000,
  bind: function(el) {
    var attr, view, _i, _len, _ref1;
    if (this.marker == null) {
      attr = [this.view.prefix, this.type].join('-').replace('--', '-');
      this.marker = document.createComment(" rivets: " + this.type + " ");
      this.iterated = [];
      el.removeAttribute(attr);
      el.parentNode.insertBefore(this.marker, el);
      el.parentNode.removeChild(el);
    } else {
      _ref1 = this.iterated;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        view.bind();
      }
    }
  },
  unbind: function(el) {
    var view, _i, _len, _ref1, _results;
    if (this.iterated != null) {
      _ref1 = this.iterated;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        _results.push(view.unbind());
      }
      return _results;
    }
  },
  routine: function(el, collection) {
    var binding, data, i, index, key, model, modelName, options, previous, template, view, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3, _results;
    modelName = this.args[0];
    collection = collection || [];
    if (this.iterated.length > collection.length) {
      _ref1 = Array(this.iterated.length - collection.length);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        i = _ref1[_i];
        view = this.iterated.pop();
        view.unbind();
        this.marker.parentNode.removeChild(view.els[0]);
      }
    }
    for (index = _j = 0, _len1 = collection.length; _j < _len1; index = ++_j) {
      model = collection[index];
      data = {
        index: index
      };
      data[modelName] = model;
      if (this.iterated[index] == null) {
        _ref2 = this.view.models;
        for (key in _ref2) {
          model = _ref2[key];
          if (data[key] == null) {
            data[key] = model;
          }
        }
        previous = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker;
        options = this.view.options();
        options.preloadData = true;
        template = el.cloneNode(true);
        view = new Rivets.View(template, data, options);
        view.bind();
        this.iterated.push(view);
        this.marker.parentNode.insertBefore(template, previous.nextSibling);
      } else if (this.iterated[index].models[modelName] !== model) {
        this.iterated[index].update(data);
      }
    }
    if (el.nodeName === 'OPTION') {
      _ref3 = this.view.bindings;
      _results = [];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        binding = _ref3[_k];
        if (binding.el === this.marker.parentNode && binding.type === 'value') {
          _results.push(binding.sync());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  },
  update: function(models) {
    var data, key, model, view, _i, _len, _ref1, _results;
    data = {};
    for (key in models) {
      model = models[key];
      if (key !== this.args[0]) {
        data[key] = model;
      }
    }
    _ref1 = this.iterated;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      view = _ref1[_i];
      _results.push(view.update(data));
    }
    return _results;
  }
};

Rivets["public"].binders['class-*'] = function(el, value) {
  var elClass;
  elClass = " " + el.className + " ";
  if (!value === (elClass.indexOf(" " + this.args[0] + " ") !== -1)) {
    return el.className = value ? "" + el.className + " " + this.args[0] : elClass.replace(" " + this.args[0] + " ", ' ').trim();
  }
};

Rivets["public"].binders['*'] = function(el, value) {
  if (value != null) {
    return el.setAttribute(this.type, value);
  } else {
    return el.removeAttribute(this.type);
  }
};

Rivets["public"].adapters['.'] = {
  id: '_rv',
  counter: 0,
  weakmap: {},
  weakReference: function(obj) {
    var id, _base, _name;
    if (!obj.hasOwnProperty(this.id)) {
      id = this.counter++;
      Object.defineProperty(obj, this.id, {
        value: id
      });
    }
    return (_base = this.weakmap)[_name = obj[this.id]] || (_base[_name] = {
      callbacks: {}
    });
  },
  cleanupWeakReference: function(ref, id) {
    if (!Object.keys(ref.callbacks).length) {
      if (!(ref.pointers && Object.keys(ref.pointers).length)) {
        return delete this.weakmap[id];
      }
    }
  },
  stubFunction: function(obj, fn) {
    var map, original, weakmap;
    original = obj[fn];
    map = this.weakReference(obj);
    weakmap = this.weakmap;
    return obj[fn] = function() {
      var callback, k, r, response, _i, _len, _ref1, _ref2, _ref3, _ref4;
      response = original.apply(obj, arguments);
      _ref1 = map.pointers;
      for (r in _ref1) {
        k = _ref1[r];
        _ref4 = (_ref2 = (_ref3 = weakmap[r]) != null ? _ref3.callbacks[k] : void 0) != null ? _ref2 : [];
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          callback = _ref4[_i];
          callback();
        }
      }
      return response;
    };
  },
  observeMutations: function(obj, ref, keypath) {
    var fn, functions, map, _base, _i, _len;
    if (Array.isArray(obj)) {
      map = this.weakReference(obj);
      if (map.pointers == null) {
        map.pointers = {};
        functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
        for (_i = 0, _len = functions.length; _i < _len; _i++) {
          fn = functions[_i];
          this.stubFunction(obj, fn);
        }
      }
      if ((_base = map.pointers)[ref] == null) {
        _base[ref] = [];
      }
      if (__indexOf.call(map.pointers[ref], keypath) < 0) {
        return map.pointers[ref].push(keypath);
      }
    }
  },
  unobserveMutations: function(obj, ref, keypath) {
    var idx, map, pointers;
    if (Array.isArray(obj) && (obj[this.id] != null)) {
      if (map = this.weakmap[obj[this.id]]) {
        if (pointers = map.pointers[ref]) {
          if ((idx = pointers.indexOf(keypath)) >= 0) {
            pointers.splice(idx, 1);
          }
          if (!pointers.length) {
            delete map.pointers[ref];
          }
          return this.cleanupWeakReference(map, obj[this.id]);
        }
      }
    }
  },
  observe: function(obj, keypath, callback) {
    var callbacks, desc, value;
    callbacks = this.weakReference(obj).callbacks;
    if (callbacks[keypath] == null) {
      callbacks[keypath] = [];
      desc = Object.getOwnPropertyDescriptor(obj, keypath);
      if (!((desc != null ? desc.get : void 0) || (desc != null ? desc.set : void 0))) {
        value = obj[keypath];
        Object.defineProperty(obj, keypath, {
          enumerable: true,
          get: function() {
            return value;
          },
          set: (function(_this) {
            return function(newValue) {
              var map, _i, _len, _ref1;
              if (newValue !== value) {
                _this.unobserveMutations(value, obj[_this.id], keypath);
                value = newValue;
                if (map = _this.weakmap[obj[_this.id]]) {
                  callbacks = map.callbacks;
                  if (callbacks[keypath]) {
                    _ref1 = callbacks[keypath].slice();
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                      callback = _ref1[_i];
                      if (__indexOf.call(callbacks[keypath], callback) >= 0) {
                        callback();
                      }
                    }
                  }
                  return _this.observeMutations(newValue, obj[_this.id], keypath);
                }
              }
            };
          })(this)
        });
      }
    }
    if (__indexOf.call(callbacks[keypath], callback) < 0) {
      callbacks[keypath].push(callback);
    }
    return this.observeMutations(obj[keypath], obj[this.id], keypath);
  },
  unobserve: function(obj, keypath, callback) {
    var callbacks, idx, map;
    if (map = this.weakmap[obj[this.id]]) {
      if (callbacks = map.callbacks[keypath]) {
        if ((idx = callbacks.indexOf(callback)) >= 0) {
          callbacks.splice(idx, 1);
          if (!callbacks.length) {
            delete map.callbacks[keypath];
          }
        }
        this.unobserveMutations(obj[keypath], obj[this.id], keypath);
        return this.cleanupWeakReference(map, obj[this.id]);
      }
    }
  },
  get: function(obj, keypath) {
    return obj[keypath];
  },
  set: function(obj, keypath, value) {
    return obj[keypath] = value;
  }
};

Rivets.factory = function(sightglass) {
  Rivets.sightglass = sightglass;
  Rivets["public"]._ = Rivets;
  return Rivets["public"];
};

if (typeof (typeof module !== "undefined" && module !== null ? module.exports : void 0) === 'object') {
  module.exports = Rivets.factory(require('sightglass'));
} else if (typeof define === 'function' && define.amd) {
  define(['sightglass'], function(sightglass) {
    return this.rivets = Rivets.factory(sightglass);
  });
} else {
  this.rivets = Rivets.factory(sightglass);
}

}).call(this);

(function() {
var $document, Cart, CartJS, Item, processing, queue,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Cart = (function() {
  function Cart() {
    this.update = __bind(this.update, this);
  }

  Cart.prototype.update = function(cart) {
    var item, key, value;
    for (key in cart) {
      value = cart[key];
      if (key !== 'items') {
        this[key] = value;
      }
    }
    return this.items = (function() {
      var _i, _len, _ref, _results;
      _ref = cart.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(new Item(item));
      }
      return _results;
    })();
  };

  return Cart;

})();

Item = (function() {
  function Item(item) {
    this.propertyArray = __bind(this.propertyArray, this);
    this.update = __bind(this.update, this);
    this.update(item);
  }

  Item.prototype.update = function(item) {
    var key, value;
    for (key in item) {
      value = item[key];
      if (key !== 'properties') {
        this[key] = value;
      }
    }
    return this.properties = CartJS.Utils.extend({}, item.properties);
  };

  Item.prototype.propertyArray = function() {
    var name, value, _ref, _results;
    _ref = this.properties;
    _results = [];
    for (name in _ref) {
      value = _ref[name];
      _results.push({
        name: name,
        value: value
      });
    }
    return _results;
  };

  return Item;

})();

CartJS = {
  settings: {
    debug: false,
    dataAPI: true,
    requestBodyClass: null,
    rivetsModels: {},
    currency: null,
    moneyFormat: null,
    moneyWithCurrencyFormat: null,
    weightUnit: 'g',
    weightPrecision: 0
  },
  cart: new Cart()
};

CartJS.init = function(cart, settings) {
  if (settings == null) {
    settings = {};
  }
  CartJS.configure(settings);
  CartJS.Utils.log('Initialising CartJS.');
  CartJS.cart.update(cart);
  if (CartJS.settings.dataAPI) {
    CartJS.Utils.log('"dataAPI" setting is true, initialising Data API.');
    CartJS.Data.init();
  }
  if (CartJS.settings.requestBodyClass) {
    CartJS.Utils.log('"requestBodyClass" set, adding event listeners.');
    jQuery(document).on('cart.requestStarted', function() {
      return jQuery('body').addClass(CartJS.settings.requestBodyClass);
    });
    jQuery(document).on('cart.requestComplete', function() {
      return jQuery('body').removeClass(CartJS.settings.requestBodyClass);
    });
  }
  CartJS.Rivets.init();
  jQuery(document).trigger('cart.ready', [CartJS.cart]);
  return
};

CartJS.configure = function(settings) {
  if (settings == null) {
    settings = {};
  }
  return CartJS.Utils.extend(CartJS.settings, settings);
};

if (window.console == null) {
  window.console = {};
  window.console.log = function() {};
}

CartJS.Utils = {
  log: function() {
    return CartJS.Utils.console(console.log, arguments);
  },
  error: function() {
    return CartJS.Utils.console(console.error, arguments);
  },
  console: function(method, args) {
    if (CartJS.settings.debug && (typeof console !== "undefined" && console !== null)) {
      args = Array.prototype.slice.call(args);
      args.unshift('[CartJS]:');
      return method.apply(console, args);
    }
  },
  wrapKeys: function(obj, type, override) {
    var key, value, wrapped;
    if (type == null) {
      type = 'properties';
    }
    wrapped = {};
    for (key in obj) {
      value = obj[key];
      wrapped["" + type + "[" + key + "]"] = override != null ? override : value;
    }
    return wrapped;
  },
  unwrapKeys: function(obj, type, override) {
    var key, unwrapped, unwrappedKey, value;
    if (type == null) {
      type = 'properties';
    }
    unwrapped = {};
    for (key in obj) {
      value = obj[key];
      unwrappedKey = key.replace("" + type + "[", "").replace("]", "");
      unwrapped[unwrappedKey] = override != null ? override : value;
    }
    return unwrapped;
  },
  extend: function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  },
  clone: function(object) {
    var key, newInstance;
    if ((object == null) || typeof object !== 'object') {
      return object;
    }
    newInstance = new object.constructor();
    for (key in object) {
      newInstance[key] = clone(object[key]);
    }
    return newInstance;
  },
  isArray: Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  },
  ensureArray: function(value) {
    if (CartJS.Utils.isArray(value)) {
      return value;
    }
    if (value != null) {
      return [value];
    } else {
      return [];
    }
  },
  formatMoney: function(value, format, formatName, currency) {
    var _ref, _ref1;
    if (currency == null) {
      currency = '';
    }
    if (!currency) {
      currency = CartJS.settings.currency;
    }
    if ((window.Currency != null) && currency !== CartJS.settings.currency) {
      value = Currency.convert(value, CartJS.settings.currency, currency);
      if ((((_ref = window.Currency) != null ? _ref.moneyFormats : void 0) != null) && (currency in window.Currency.moneyFormats)) {
        format = window.Currency.moneyFormats[currency][formatName];
      }
    }
    if (((_ref1 = window.Shopify) != null ? _ref1.formatMoney : void 0) != null) {
      return Shopify.formatMoney(value, format);
    } else {
      return value;
    }
  },
  getSizedImageUrl: function(src, size) {
    var _ref, _ref1;
    if (((_ref = window.Shopify) != null ? (_ref1 = _ref.Image) != null ? _ref1.getSizedImageUrl : void 0 : void 0) != null) {
      if (src) {
        return Shopify.Image.getSizedImageUrl(src, size);
      } else {
        return Shopify.Image.getSizedImageUrl('https://cdn.shopify.com/s/images/admin/no-image-.gif', size).replace('-_', '-');
      }
    } else {
      if (src) {
        return src;
      } else {
        return 'https://cdn.shopify.com/s/images/admin/no-image-large.gif';
      }
    }
  }
};

queue = [];

processing = false;

CartJS.Queue = {
  add: function(url, data, options, $target) {
    var request;
    if ($target == null) {
      target = {};
    }
    if (options == null) {
      options = {};
    }
    request = {
      url: url,
      data: data,
      type: options.type || 'POST',
      dataType: options.dataType || 'json',
      success: CartJS.Utils.ensureArray(options.success),
      error: CartJS.Utils.ensureArray(options.error),
      complete: CartJS.Utils.ensureArray(options.complete)
    };
    if (options.updateCart) {
      request.success.push(CartJS.cart.update);
    }
    queue.push(request);
    if (processing) {
      return;
    }
    jQuery(document).trigger('cart.requestStarted', [CartJS.cart, $target]);
    return CartJS.Queue.process();
  },
  process: function() {
    var params;
    if (!queue.length) {
      processing = false;
      jQuery(document).trigger('cart.requestComplete', [CartJS.cart]);
      return;
    }
    processing = true;
    params = queue.shift();
    params.complete = CartJS.Queue.process;
    return jQuery.ajax(params);
  }
};

CartJS.Core = {
  getCart: function(options) {
    if (options == null) {
      options = {};
    }
    options.type = 'GET';
    options.updateCart = true;
    return CartJS.Queue.add('/cart.js', {}, options);
  },
  addItem: function(id, quantity, properties, options) {
    var data;
    if (quantity == null) {
      quantity = 1;
    }
    if (properties == null) {
      properties = {};
    }
    if (options == null) {
      options = {};
    }
    data = CartJS.Utils.wrapKeys(properties);
    data.id = id;
    data.quantity = quantity;
    CartJS.Queue.add('/cart/add.js', data, options);
    return CartJS.Core.getCart();
  },
  updateItem: function(line, quantity, properties, options, $target) {
    var data;
    if (properties == null) {
      properties = {};
    }
    if (options == null) {
      options = {};
    }
    data = CartJS.Utils.wrapKeys(properties);
    data.line = line;
    if (quantity != null) {
      data.quantity = quantity;
    }
    options.updateCart = true;
    if ($target != null) {
      return CartJS.Queue.add('/cart/change.js', data, options, $target);
    } else {
      return CartJS.Queue.add('/cart/change.js', data, options);
    }
  },
  removeItem: function(line, options) {
    if (options == null) {
      options = {};
    }
    return CartJS.Core.updateItem(line, 0, {}, options);
  },
  updateItemById: function(id, quantity, properties, options) {
    var data;
    if (properties == null) {
      properties = {};
    }
    if (options == null) {
      options = {};
    }
    data = CartJS.Utils.wrapKeys(properties);
    data.id = id;
    if (quantity != null) {
      data.quantity = quantity;
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/change.js', data, options);
  },
  updateItemQuantitiesById: function(updates, options) {
    if (updates == null) {
      updates = {};
    }
    if (options == null) {
      options = {};
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/update.js', {
      updates: updates
    }, options);
  },
  removeItemById: function(id, options) {
    var data;
    if (options == null) {
      options = {};
    }
    data = {
      id: id,
      quantity: 0
    };
    options.updateCart = true;
    return CartJS.Queue.add('/cart/change.js', data, options);
  },
  clear: function(options) {
    if (options == null) {
      options = {};
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/clear.js', {}, options);
  },
  getAttribute: function(attributeName, defaultValue) {
    if (attributeName in CartJS.cart.attributes) {
      return CartJS.cart.attributes[attributeName];
    } else {
      return defaultValue;
    }
  },
  setAttribute: function(attributeName, value, options) {
    var attributes;
    if (options == null) {
      options = {};
    }
    attributes = {};
    attributes[attributeName] = value;
    return CartJS.Core.setAttributes(attributes, options);
  },
  getAttributes: function() {
    return CartJS.cart.attributes;
  },
  setAttributes: function(attributes, options) {
    if (attributes == null) {
      attributes = {};
    }
    if (options == null) {
      options = {};
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(attributes, 'attributes'), options);
  },
  clearAttributes: function(options) {
    if (options == null) {
      options = {};
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(CartJS.Core.getAttributes(), 'attributes', ''), options);
  },
  getNote: function() {
    return CartJS.cart.note;
  },
  setNote: function(note, options) {
    if (options == null) {
      options = {};
    }
    options.updateCart = true;
    return CartJS.Queue.add('/cart/update.js', {
      note: note
    }, options);
  }
};

$document = null;

CartJS.Data = {
  init: function() {
    $document = jQuery(document);
    CartJS.Data.setEventListeners('on');
    return CartJS.Data.render(null, CartJS.cart);
  },
  destroy: function() {
    return CartJS.Data.setEventListeners('off');
  },
  setEventListeners: function(method) {
    $document[method]('click', '[data-cart-add]', CartJS.Data.add);
    $document[method]('click', '[data-cart-remove]', CartJS.Data.remove);
    $document[method]('click', '[data-cart-remove-id]', CartJS.Data.removeById);
    $document[method]('click', '[data-cart-update]', CartJS.Data.update);
    $document[method]('click', '[data-cart-update-id]', CartJS.Data.updateById);
    $document[method]('click', '[data-cart-clear]', CartJS.Data.clear);
    $document[method]('change', '[data-cart-toggle]', CartJS.Data.toggle);
    $document[method]('change', '[data-cart-toggle-attribute]', CartJS.Data.toggleAttribute);
    $document[method]('submit', '[data-cart-submit]', CartJS.Data.submit);
    return $document[method]('cart.requestComplete', CartJS.Data.render);
  },
  add: function(e) {
    var $this;
    e.preventDefault();
    $this = jQuery(this);
    return CartJS.Core.addItem($this.attr('data-cart-add'), $this.attr('data-cart-quantity'));
  },
  remove: function(e) {
    var $this;
    e.preventDefault();
    $this = jQuery(this);
    return CartJS.Core.removeItem($this.attr('data-cart-remove'));
  },
  removeById: function(e) {
    var $this;
    e.preventDefault();
    $this = jQuery(this);
    return CartJS.Core.removeItemById($this.attr('data-cart-remove-id'));
  },
  update: function(e) {
    var $this;
    e.preventDefault();
    $this = jQuery(this);
    return CartJS.Core.updateItem($this.attr('data-cart-update'), $this.attr('data-cart-quantity'), null, null, $(e.target));
  },
  updateById: function(e) {
    var $this;
    e.preventDefault();
    $this = jQuery(this);
    return CartJS.Core.updateItemById($this.attr('data-cart-update-id'), $this.attr('data-cart-quantity'));
  },
  clear: function(e) {
    e.preventDefault();
    return CartJS.Core.clear();
  },
  toggle: function(e) {
    var $input, id;
    $input = jQuery(this);
    id = $input.attr('data-cart-toggle');
    if ($input.is(':checked')) {
      return CartJS.Core.addItem(id);
    } else {
      return CartJS.Core.removeItemById(id);
    }
  },
  toggleAttribute: function(e) {
    var $input, attribute;
    $input = jQuery(this);
    attribute = $input.attr('data-cart-toggle-attribute');
    return CartJS.Core.setAttribute(attribute, $input.is(':checked') ? 'Yes' : '');
  },
  submit: function(e) {
    var dataArray, id, properties, quantity;
    e.preventDefault();
    dataArray = jQuery(this).serializeArray();
    id = void 0;
    quantity = void 0;
    properties = {};
    jQuery.each(dataArray, function(i, item) {
      if (item.name === 'id') {
        return id = item.value;
      } else if (item.name === 'quantity') {
        return quantity = item.value;
      } else if (item.name.match(/^properties\[\w+\]$/)) {
        return properties[item.name] = item.value;
      }
    });
    return CartJS.Core.addItem(id, quantity, CartJS.Utils.unwrapKeys(properties));
  },
  render: function(e, cart) {
    var context;
    context = {
      'item_count': cart.item_count,
      'total_price': cart.total_price,
      'total_price_money': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyFormat, 'money_format', (typeof Currency !== "undefined" && Currency !== null ? Currency.currentCurrency : void 0) != null ? Currency.currentCurrency : void 0),
      'total_price_money_with_currency': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', (typeof Currency !== "undefined" && Currency !== null ? Currency.currentCurrency : void 0) != null ? Currency.currentCurrency : void 0)
    };
    return jQuery('[data-cart-render]').each(function() {
      var $this;
      $this = jQuery(this);
      return $this.html(context[$this.attr('data-cart-render')]);
    });
  }
};

if ('rivets' in window) {
  CartJS.Rivets = {
    model: null,
    boundViews: [],
    init: function() {
      return CartJS.Rivets.bindViews();
    },
    destroy: function() {
      return CartJS.Rivets.unbindViews();
    },
    bindViews: function() {
      CartJS.Utils.log('Rivets.js is present, binding views.');
      CartJS.Rivets.unbindViews();
      CartJS.Rivets.model = CartJS.Utils.extend({
        cart: CartJS.cart
      }, CartJS.settings.rivetsModels);
      if (window.Currency != null) {
        CartJS.Rivets.model.Currency = window.Currency;
      }
      return jQuery('[data-cart-view]').each(function() {
        var view;
        view = rivets.bind(jQuery(this), CartJS.Rivets.model);
        return CartJS.Rivets.boundViews.push(view);
      });
    },
    unbindViews: function() {
      var view, _i, _len, _ref;
      _ref = CartJS.Rivets.boundViews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        view.unbind();
      }
      return CartJS.Rivets.boundViews = [];
    }
  };
  rivets.formatters.eq = function(a, b) {
    return a === b;
  };
  rivets.formatters.includes = function(a, b) {
    return a.indexOf(b) >= 0;
  };
  rivets.formatters.match = function(a, regexp, flags) {
    return a.match(new RegExp(regexp, flags));
  };
  rivets.formatters.lt = function(a, b) {
    return a < b;
  };
  rivets.formatters.gt = function(a, b) {
    return a > b;
  };
  rivets.formatters.not = function(a) {
    return !a;
  };
  rivets.formatters.empty = function(a) {
    return !a.length;
  };
  rivets.formatters.plus = function(a, b) {
    return parseInt(a) + parseInt(b);
  };
  rivets.formatters.minus = function(a, b) {
    return parseInt(a) - parseInt(b);
  };
  rivets.formatters.times = function(a, b) {
    return a * b;
  };
  rivets.formatters.divided_by = function(a, b) {
    return a / b;
  };
  rivets.formatters.modulo = function(a, b) {
    return a % b;
  };
  rivets.formatters.prepend = function(a, b) {
    return b + a;
  };
  rivets.formatters.append = function(a, b) {
    return a + b;
  };
  rivets.formatters.slice = function(value, start, end) {
    return value.slice(start, end);
  };
  rivets.formatters.pluralize = function(input, singular, plural) {
    if (plural == null) {
      plural = singular + 's';
    }
    if (CartJS.Utils.isArray(input)) {
      input = input.length;
    }
    if (input === 1) {
      return singular;
    } else {
      return plural;
    }
  };
  rivets.formatters.array_element = function(array, index) {
    return array[index];
  };
  rivets.formatters.array_first = function(array) {
    return array[0];
  };
  rivets.formatters.array_last = function(array) {
    return array[array.length - 1];
  };
  rivets.formatters.money = function(value, currency) {
    return CartJS.Utils.formatMoney(value, CartJS.settings.moneyFormat, 'money_format', currency);
  };
  rivets.formatters.money_with_currency = function(value, currency) {
    return CartJS.Utils.formatMoney(value, CartJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', currency);
  };
  rivets.formatters.weight = function(grams) {
    switch (CartJS.settings.weightUnit) {
      case 'kg':
        return (grams / 1000).toFixed(CartJS.settings.weightPrecision);
      case 'oz':
        return (grams * 0.035274).toFixed(CartJS.settings.weightPrecision);
      case 'lb':
        return (grams * 0.00220462).toFixed(CartJS.settings.weightPrecision);
      default:
        return grams.toFixed(CartJS.settings.weightPrecision);
    }
  };
  rivets.formatters.weight_with_unit = function(grams) {
    return rivets.formatters.weight(grams) + CartJS.settings.weightUnit;
  };
  rivets.formatters.product_image_size = function(src, size) {
    return CartJS.Utils.getSizedImageUrl(src, size);
  };
  rivets.formatters.moneyWithCurrency = rivets.formatters.money_with_currency;
  rivets.formatters.weightWithUnit = rivets.formatters.weight_with_unit;
  rivets.formatters.productImageSize = rivets.formatters.product_image_size;
} else {
  CartJS.Rivets = {
    init: function() {},
    destroy: function() {}
  };
}

CartJS.factory = function(exports) {
  exports.init = CartJS.init;
  exports.configure = CartJS.configure;
  exports.cart = CartJS.cart;
  exports.settings = CartJS.settings;
  exports.getCart = CartJS.Core.getCart;
  exports.addItem = CartJS.Core.addItem;
  exports.updateItem = CartJS.Core.updateItem;
  exports.updateItemById = CartJS.Core.updateItemById;
  exports.updateItemQuantitiesById = CartJS.Core.updateItemQuantitiesById;
  exports.removeItem = CartJS.Core.removeItem;
  exports.removeItemById = CartJS.Core.removeItemById;
  exports.clear = CartJS.Core.clear;
  exports.getAttribute = CartJS.Core.getAttribute;
  exports.setAttribute = CartJS.Core.setAttribute;
  exports.getAttributes = CartJS.Core.getAttributes;
  exports.setAttributes = CartJS.Core.setAttributes;
  exports.clearAttributes = CartJS.Core.clearAttributes;
  exports.getNote = CartJS.Core.getNote;
  exports.setNote = CartJS.Core.setNote;
  return exports.render = CartJS.Data.render;
};

if (typeof exports === 'object') {
  CartJS.factory(exports);
} else if (typeof define === 'function' && define.amd) {
  define(['exports'], function(exports) {
    CartJS.factory(this.CartJS = exports);
    return exports;
  });
} else {
  CartJS.factory(this.CartJS = {});
}

}).call(this);
;/*!
* Isotope PACKAGED v3.0.6
*
* Licensed GPLv3 for open source use
* or Isotope Commercial License for commercial use
*
* https://isotope.metafizzy.co
* Copyright 2010-2018 Metafizzy
*/

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);r=200==Math.round(t(n.width)),s.isBoxSizeOuter=r,i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,I=d&&r,x=t(s.width);x!==!1&&(a.width=x+(I?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(I?0:y+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+z),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var o=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?o.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){i=i||100;var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=parseFloat(o),r=parseFloat(n),a=this.layout.size;o.indexOf("%")!=-1&&(s=s/100*a.width),n.indexOf("%")!=-1&&(r=r/100*a.height),s=isNaN(s)?0:s,r=isNaN(r)?0:r,s-=e?a.paddingLeft:a.paddingRight,r-=i?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),n&&!this.isTransitioning)return void this.layoutPosition();var s=t-i,r=e-o,a={};a.transform=this.getTranslate(s,r),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t);
}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});;/**
* jQuery plugin paroller.js v1.4.4
* https://github.com/tgomilar/paroller.js
* preview: https://tgomilar.github.io/paroller/
**/
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
      define('parollerjs', ['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = factory(require('jquery'));
  }
  else {
      factory(jQuery);
  }
})(function ($) {
  'use strict';

  var working = false;
  var scrollAction = function() {
      working = false;
  };

  var setDirection = {
      bgVertical: function (elem, bgOffset) {
          return elem.css({'background-position': 'center ' + -bgOffset + 'px'});
      },
      bgHorizontal: function (elem, bgOffset) {
          return elem.css({'background-position': -bgOffset + 'px' + ' center'});
      },
      vertical: function (elem, elemOffset, oldTransform) {
          (oldTransform === 'none' ? oldTransform = '' : true);
          return elem.css({
              '-webkit-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
              '-moz-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
              'transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
              'transition': 'transform linear',
              'will-change': 'transform'
          });
      },
      horizontal: function (elem, elemOffset, oldTransform) {
          (oldTransform === 'none' ? oldTransform = '' : true);
          return elem.css({
              '-webkit-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
              '-moz-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
              'transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
              'transition': 'transform linear',
              'will-change': 'transform'
          });
      }
  };

  var setMovement = {
      factor: function (elem, width, options) {
          var dataFactor = elem.data('paroller-factor');
          var factor = (dataFactor) ? dataFactor : options.factor;
          if (width < 576) {
              var dataFactorXs = elem.data('paroller-factor-xs');
              var factorXs = (dataFactorXs) ? dataFactorXs : options.factorXs;
              return (factorXs) ? factorXs : factor;
          }
          else if (width <= 768) {
              var dataFactorSm = elem.data('paroller-factor-sm');
              var factorSm = (dataFactorSm) ? dataFactorSm : options.factorSm;
              return (factorSm) ? factorSm : factor;
          }
          else if (width <= 1024) {
              var dataFactorMd = elem.data('paroller-factor-md');
              var factorMd = (dataFactorMd) ? dataFactorMd : options.factorMd;
              return (factorMd) ? factorMd : factor;
          }
          else if (width <= 1200) {
              var dataFactorLg = elem.data('paroller-factor-lg');
              var factorLg = (dataFactorLg) ? dataFactorLg : options.factorLg;
              return (factorLg) ? factorLg : factor;
          } else if (width <= 1920) {
              var dataFactorXl = elem.data('paroller-factor-xl');
              var factorXl = (dataFactorXl) ? dataFactorXl : options.factorXl;
              return (factorXl) ? factorXl : factor;
          } else {
              return factor;
          }
      },
      bgOffset: function (offset, factor) {
          return Math.round(offset * factor);
      },
      transform: function (offset, factor, windowHeight, height) {
          return Math.round((offset - (windowHeight / 2) + height) * factor);
      }
  };

  var clearPositions = {
      background: function (elem) {
          return elem.css({'background-position': 'unset'});
      },
      foreground: function (elem) {
          return elem.css({
              'transform' : 'unset',
              'transition' : 'unset'
          });
      }
  };

  $.fn.paroller = function (options) {
      var windowHeight = $(window).height();
      var documentHeight = $(document).height();

      // default options
      var options = $.extend({
          factor: 0, // - to +
          factorXs: 0, // - to +
          factorSm: 0, // - to +
          factorMd: 0, // - to +
          factorLg: 0, // - to +
          factorXl: 0, // - to +
          type: 'background', // foreground
          direction: 'vertical' // horizontal
      }, options);

      return this.each(function () {
          var $this = $(this);
          var width = $(window).width();
          var offset = $this.offset().top;
          var height = $this.outerHeight();

          var dataType = $this.data('paroller-type');
          var dataDirection = $this.data('paroller-direction');
          var oldTransform = $this.css('transform');

          var type = (dataType) ? dataType : options.type;
          var direction = (dataDirection) ? dataDirection : options.direction;
          var factor = setMovement.factor($this, width, options);
          var bgOffset = setMovement.bgOffset(offset, factor);
          var transform = setMovement.transform(offset, factor, windowHeight, height);

          if (type === 'background') {
              if (direction === 'vertical') {
                  setDirection.bgVertical($this, bgOffset);
              }
              else if (direction === 'horizontal') {
                  setDirection.bgHorizontal($this, bgOffset);
              }
          }
          else if (type === 'foreground') {
              if (direction === 'vertical') {
                  setDirection.vertical($this, transform, oldTransform);
              }
              else if (direction === 'horizontal') {
                  setDirection.horizontal($this, transform, oldTransform);
              }
          }

          $(window).on('resize', function () {
              var scrolling = $(this).scrollTop();
              width = $(window).width();
              offset = $this.offset().top;
              height = $this.outerHeight();
              factor = setMovement.factor($this, width, options);

              bgOffset = Math.round(offset * factor);
              transform = Math.round((offset - (windowHeight / 2) + height) * factor);

              if (! working) {
                  window.requestAnimationFrame(scrollAction);
                  working = true;
              }

              if (type === 'background') {
                  clearPositions.background($this);
                  if (direction === 'vertical') {
                      setDirection.bgVertical($this, bgOffset);
                  }
                  else if (direction === 'horizontal') {
                      setDirection.bgHorizontal($this, bgOffset);
                  }
              }
              else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                  clearPositions.foreground($this);
                  if (direction === 'vertical') {
                      setDirection.vertical($this, transform);
                  }
                  else if (direction === 'horizontal') {
                      setDirection.horizontal($this, transform);
                  }
              }
          });

          $(window).on('scroll', function () {
              var scrolling = $(this).scrollTop();
              documentHeight = $(document).height();

              bgOffset = Math.round((offset - scrolling) * factor);
              transform = Math.round(((offset - (windowHeight / 2) + height) - scrolling) * factor);

              if (! working) {
                  window.requestAnimationFrame(scrollAction);
                  working = true;
              }

              if (type === 'background') {
                  if (direction === 'vertical') {
                      setDirection.bgVertical($this, bgOffset);
                  }
                  else if (direction === 'horizontal') {
                      setDirection.bgHorizontal($this, bgOffset);
                  }
              }
              else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                  if (direction === 'vertical') {
                      setDirection.vertical($this, transform, oldTransform);
                  }
                  else if (direction === 'horizontal') {
                      setDirection.horizontal($this, transform, oldTransform);
                  }
              }
          });
      });
  };
});
;(function() {
var Instafeed, addInfinteScrollToCollection, addScrolledClass, arr_diff, checkCart, clickHeroSliderImage, closeMegaMenu, closeModalVideo, closeSubModal, contains, destroyZoomOverlay, detectLoggedinAdmin, detectMobile, disableMailChimpForms, doZoom, enableMailChimpForms, fitVids, getRandomInt, handlePdpDescriptionClick, handleVideo, hideRecoverPasswordForm, inArray, inIframe, initGridSection, initHomePage, initInlineScripts, initIsotope, initMailchimp, initPDPVideo, initPLPMasonry, initPageJs, initParoller, initPdpDescription, initPdpMonogram, initPdpScripts, initProductSlider, initRelatedSlider, initThumbnailSlider, initVideos, inner, intToFloat, isMobile, loadSizeGuide, matches, muteOnClick, navCloseClick, navCollectionClick, navCollectionClickMobile, navToggle, onClick, onResize, pageJs, pdpAccordion, pjaxComplete, preventPJAXonProfilePage, productSelect, registerMailchimpForm, removeCookie, resetMailchimpForms, setActiveStateOnNav, setCart, setCartError, setCookie, setFlickity, setPdpError, setUpAddToCartFunctions, showRecoverPasswordForm, target_image, toggleClass, toggleMiniCart, toggleMobileMenu, toggleNotifyMe, toggleSearch, toggleSizeGuide, triggerElemInView, validateQuantityInput, zoom;

arr_diff = function(a1, a2) {
  var a, diff, i, j, k;
  a = [];
  diff = [];
  i = 0;
  j = 0;
  i;
  while (i < a1.length) {
    a[a1[i]] = true;
    i++;
  }
  j;
  while (j < a2.length) {
    if (a[a2[j]]) {
      delete a[a2[j]];
    } else {
      a[a2[j]] = true;
    }
    j++;
  }
  for (k in a) {
    diff.push(k);
  }
  return diff;
};

contains = function(arr, element) {
  var i;
  i = 0;
  while (i < arr.length) {
    if (arr[i] === element) {
      return true;
    }
    i++;
  }
  return false;
};

intToFloat = function(num, decPlaces) {
  return num.toFixed(decPlaces);
};

getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

inArray = function(needle, haystack) {
  var i, length;
  length = haystack.length;
  i = 0;
  while (i < length) {
    if (haystack[i] === needle) {
      return true;
    }
    i++;
  }
  return false;
};

toggleMiniCart = function(e) {
  var b, blocker, w;
  if (e) {
    e.preventDefault();
  }
  blocker = $("#blocker");
  b = $("body");
  w = $(window).width();
  if (b.hasClass("cart-shown")) {
    return b.removeClass("cart-shown");
  } else {
    return b.addClass("cart-shown");
  }
};

window.toggleMiniCart = toggleMiniCart;

setUpAddToCartFunctions = function() {
  var productForm;
  $(document).on('cart.requestComplete', function(event, cart) {
    if (cart.item_count < 1) {
      $('.cart__upsell .cart__upsell-free-content').html('');
    }
    $('#CartCount').html(cart.item_count);
  });
  productForm = $(".product-add-form");
  return productForm.on("submit", function(e) {
    var $pdpError, cartNotes, lineItemPropInputs, lineItemPropNameRgx, qtySelector, qtyToAddVal, selectedVariant, selectedVariantVal;
    e.preventDefault();
    $pdpError = $(this).find(".pdp-error");
    selectedVariant = $(this).find(".product-single__variants")[0] || $(this).find("input[type=radio]:checked")[0];
    qtySelector = $(this).find(".quantity-selector")[0];
    selectedVariantVal = selectedVariant.value;
    qtyToAddVal = qtySelector ? qtySelector.value : 1;
    cartNotes = {};
    lineItemPropInputs = $(this).find('input[name^=\'properties\']');
    lineItemPropNameRgx = /properties\[(.*?)\]/;
    lineItemPropInputs.each(function() {
      var propKey, propName, propNameKeyMatch, propValue;
      propName = $(this).attr('name');
      propNameKeyMatch = lineItemPropNameRgx.exec(propName);
      propKey = propNameKeyMatch && propNameKeyMatch.length && propNameKeyMatch[1];
      propValue = $(this).val();
      if (propKey && propValue) {
        cartNotes[propKey] = propValue;
      }
    });
    if ($("#customer-note").val()) {
      cartNotes.customerNote = $("#customer-note").val();
    }
    return CartJS.addItem(selectedVariantVal, qtyToAddVal, cartNotes, {
      success: function(data, textStatus, jqXHR) {
        $(".pdp-error").text("");
        return setTimeout((function() {
          return $("body").hasClass("cart-shown") ? 1 : toggleMiniCart();
        }), 300);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var response;
        response = jqXHR.responseJSON;
        if (globals.dev) {
          console.error(response.status + " (" + response.message + "): " + response.description);
        }
        return setPdpError($pdpError, response.description);
      }
    });
  });
};

window.setUpAddToCartFunctions = setUpAddToCartFunctions;

toggleMobileMenu = function(e) {
  var b, blocker, w, target;
  if (e) {
    e.preventDefault();
  }
  blocker = $("#blocker");
  b = $("body");
  w = $(window).width();
  target = e.target;

  if (target.classList.contains('t-circular-reveal--show')) {
    target.classList.remove('t-circular-reveal--show');
  } else {
    target.classList.add('t-circular-reveal--show');
  }

  if (b.hasClass("mobile-menu-shown")) {
    return b.removeClass("mobile-menu-shown");
  } else {
    return b.addClass("mobile-menu-shown");
  }
};

window.toggleMiniCart = toggleMiniCart;

setPdpError = function($el, message) {
  if (globals.$pdpErrorEl) {
    globals.$pdpErrorEl.text("");
  }
  $el.text(message);
  return globals.$pdpErrorEl = $el;
};

globals.$loader = $(".loader");

globals.cartItems = {};

globals.productQuantity = 0;

globals.productTitle = "";

globals.$errorEl = null;

setCart = function(cart, $target) {
  var $product, item, l, len, ref, results;
  if ($target) {
    $product = $target.closest("tr");
    globals.productQuantity = parseInt($target.siblings("span").text());
    globals.productTitle = $product.find(".product-title").text();
    globals.$errorEl = $product.find(".cart-error");
  }
  ref = cart.items;
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    item = ref[l];
    results.push(globals.cartItems[item.sku] = item.quantity);
  }
  return results;
};

checkCart = function(cart) {
  var change, item, l, len, ref;
  change = false;
  ref = cart.items;
  for (l = 0, len = ref.length; l < len; l++) {
    item = ref[l];
    if (globals.cartItems[item.sku] !== item.quantity) {
      change = true;
      break;
    }
  }
  if (!change) {
    return setCartError();
  }
};

setCartError = function() {
  var message;
  message = "All " + globals.productQuantity + " " + globals.productTitle + " are in your cart.";
  if (globals.$errorEl !== null) {
    globals.$errorEl.text(message);
    return setTimeout(function() {
      return $(".cart-error").text("");
    }, 5000);
  }
};

$(document).on("cart.requestStarted", function(event, cart, $target) {
  setCart(cart, $target);
  return globals.$loader.show();
});

$(document).on("cart.requestComplete", function(event, cart) {
  checkCart(cart);
  $(".cart-item-count").html(cart.item_count);
  $(".cart-total-price").html(cart.total_price);
  return globals.$loader.hide();
});

addInfinteScrollToCollection = function() {
  var ias;
  ias = jQuery.ias({
    container: '.collection-items',
    item: '.plp__item',
    pagination: '.pagination',
    next: '.next'
  });
  ias.extension(new IASPagingExtension);
  ias.extension(new IASHistoryExtension({
    prev: '.previous'
  }));
  ias.extension(new IASSpinnerExtension({
    html: '<div class="ias-spinner col-12"><div class="spinner"></div></div>'
  }));
  ias.on('pageChange', function(pageNum, scrollOffset, url) {
    $('body').off('submit', '.plp-form--ajax');
    $('body').on('submit', '.plp-form--ajax', function(e) {
      e.preventDefault();
      var $pdpError, cartNotes, lineItemPropInputs, lineItemPropNameRgx, qtySelector, qtyToAddVal, selectedVariant, selectedVariantVal;
      $pdpError = $(this).find(".pdp-error");
      selectedVariant = $(this).find(".product-single__variants")[0] || $(this).find("input[type=radio]:checked")[0];
      qtySelector = $(this).find(".quantity-selector")[0];
      selectedVariantVal = selectedVariant.value;
      qtyToAddVal = qtySelector ? qtySelector.value : 1;
      cartNotes = {};
      lineItemPropInputs = $(this).find('input[name^=\'properties\']');
      lineItemPropNameRgx = /properties\[(.*?)\]/;
      lineItemPropInputs.each(function() {
        var propKey, propName, propNameKeyMatch, propValue;
        propName = $(this).attr('name');
        propNameKeyMatch = lineItemPropNameRgx.exec(propName);
        propKey = propNameKeyMatch && propNameKeyMatch.length && propNameKeyMatch[1];
        propValue = $(this).val();
        if (propKey && propValue) {
          cartNotes[propKey] = propValue;
        }
      });
      if ($("#customer-note").val()) {
        cartNotes.customerNote = $("#customer-note").val();
      }
      CartJS.addItem(selectedVariantVal, qtyToAddVal, cartNotes, {
        success: function(data, textStatus, jqXHR) {
          $(".pdp-error").text("");
          setTimeout((function() {
            $("body").hasClass("cart-shown") ? 1 : toggleMiniCart();
          }), 300);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          var response;
          response = jqXHR.responseJSON;
          if (globals.dev) {
            console.error(response.status + " (" + response.message + "): " + response.description);
          }
          setPdpError($pdpError, response.description);
        }
      });
    });
  });
  ias.on('scroll', function() {
    if (typeof yotpo !== 'undefined') {
      // Select the node that will be observed for mutations
      var targetNode = document.querySelector('.collection-items');
      // Options for the observer (which mutations to observe)
      var config = { attributes: true, childList: true };
      // Callback function to execute when mutations are observed
      var callback = function(mutationsList) {
          for (var mutation of mutationsList) {
            if (mutation.type == 'childList') {
              // Reload Yotpo stars
              yotpo.initWidgets();
            }
          }
      };
      // Create an observer instance linked to the callback function
      var observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }
  });
  if (globals.dev) {
    return console.log('next page loaded');
  }
};

matches = function() {};

muteOnClick = function() {};

navCloseClick = function() {};

navCollectionClick = function() {};

navCollectionClickMobile = function() {};

navToggle = function() {};

onClick = function() {};

onResize = function() {};

matches = function(target, selector) {
  return target.matches(selector);
};

navCloseClick = function(event) {};

onClick = function(event) {
  navToggle(event);
  navCollectionClickMobile(event);
  return navCollectionClick(event);
};

onResize = function(event) {
  var navigationClassActive, ref, ref1, ref2, ref3, transitionClassActive, transitionClassDesktop, transitionClassMobile;
  transitionClassDesktop = 't-circular-reveal--desktop';
  transitionClassMobile = 't-circular-reveal--mobile';
  transitionClassActive = 't-circular-reveal--show';
  navigationClassActive = 'fostr-header__navigation--open';
  if (!document.querySelector("." + navigationClassActive)) {
    return;
  }
  if (event.target.innerWidth >= 768) {
    if ((ref = document.querySelector("." + transitionClassMobile)) != null) {
      ref.classList.remove(transitionClassActive);
    }
    return (ref1 = document.querySelector("." + transitionClassDesktop)) != null ? ref1.classList.add(transitionClassActive) : void 0;
  } else {
    if ((ref2 = document.querySelector("." + transitionClassMobile)) != null) {
      ref2.classList.add(transitionClassActive);
    }
    return (ref3 = document.querySelector("." + transitionClassDesktop)) != null ? ref3.classList.remove(transitionClassActive) : void 0;
  }
};

document.addEventListener('click', onClick, false);

window.addEventListener('resize', onResize, false);

muteOnClick = function(event) {
  var mute, soundToggleClass, videoContainerClass, videoContainerMutedClass, videoContainerUnmutedClass;
  videoContainerClass = 'html5-video';
  videoContainerMutedClass = 'html5-video--muted';
  videoContainerUnmutedClass = 'html5-video--unmuted';
  soundToggleClass = 'html5-video__sound-toggle';
  if (!event.target.matches("." + soundToggleClass)) {
    return;
  }
  event.preventDefault();
  mute = event.target.parentElement.matches('.html5-video--unmuted');
  if (mute) {
    event.target.parentElement.classList.remove('html5-video--unmuted');
    event.target.parentElement.classList.add('html5-video--muted');
    return event.target.parentElement.querySelector('video').muted = true;
  } else {
    event.target.parentElement.classList.remove('html5-video--muted');
    event.target.parentElement.classList.add('html5-video--unmuted');
    return event.target.parentElement.querySelector('video').muted = false;
  }
};

onClick = function(event) {
  return muteOnClick(event);
};

document.addEventListener('click', onClick, false);

setFlickity = function() {
  var $carousel, $cellButtonGroup, $cellButtons, flkty;
  $carousel = $(".mobile-hero").flickity({
    prevNextButtons: false,
    pageDots: false
  });
  $carousel.addClass("images-loaded");
  $(".mobile-hero__slide").each(function() {
    var activeDot, index;
    index = $(this).data("index");
    activeDot = $(this).find(".button-group--cells li").eq(index);
    activeDot.addClass("is-selected");
    return console.log(index + " of index");
  });
  flkty = $carousel.data('flickity');
  $cellButtonGroup = $('.button-group--cells');
  $cellButtons = $cellButtonGroup.find('.dot');
  return $cellButtonGroup.on('click', '.dot', function() {
    var index;
    index = $(this).index();
    return $carousel.flickity('select', index);
  });
};

handleVideo = function() {
  $('.js-video-play').on('click', function() {
    var container, isPlayingClass, video;
    isPlayingClass = 'is-playing';
    container = $(this).closest('.js-video-container');
    video = container.find('video');
    if (video.length) {
      if (!container.hasClass(isPlayingClass)) {
        video[0].play();
        return container.addClass(isPlayingClass);
      } else {
        video[0].pause();
        return container.removeClass(isPlayingClass);
      }
    }
  });
  return false;
};

initIsotope = function(plpMasonry) {
  var isExist;
  if ($(window).outerWidth() >= 992) {
    isExist = plpMasonry.data('isotope');
    if (!isExist) {
      return plpMasonry.isotope({
        itemSelector: '.plp-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.plp-item'
        }
      });
    }
  } else {
    isExist = plpMasonry.data('isotope');
    if (isExist) {
      return plpMasonry.isotope('destroy');
    }
  }
};

initPLPMasonry = function() {
  var plpMasonry;
  plpMasonry = $('.js-plp-masonry');
  if (plpMasonry.length) {
    initIsotope(plpMasonry);
    return $(window).on('resize', function() {
      return initIsotope(plpMasonry);
    });
  }
};

initGridSection = function() {
  var gridSlider;
  gridSlider = $('.js-homepage-grid-slider');
  if (gridSlider.length) {
    gridSlider.on('init', function() {
      return gridSlider.css('opacity', '1');
    });
    return gridSlider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    });
  }
};

clickHeroSliderImage = function() {};

initHomePage = function() {
  var headerNotice, headerNoticeHeight, navHeight, offsetHeight, slider, wh;
  triggerElemInView($('.in-view__parent'));
  slider = $('.js-homepage-slider');
  wh = $(window).outerHeight();
  navHeight = $('.header').innerHeight();
  headerNotice = $('.header-notice');
  headerNoticeHeight = 0;
  if (headerNotice.length) {
    headerNoticeHeight = headerNotice.outerHeight();
  }
  offsetHeight = wh - (navHeight + headerNoticeHeight);
  $(window).on("resize", function() {});
  if (slider.length) {
    slider.on('init', function() {
      return $('.js-homepage-slider').css('opacity', '1');
    });
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      adaptiveHeight: true,
      draggable: false
    });
  }
  initGridSection();
  handleVideo();
  setFlickity();
  return clickHeroSliderImage();
};

function updateUpsellContent() {
setTimeout(function(){
  $.ajax({
    url: "/cart",
    type: "GET",
    dataType: "html",
    success: function (data) {
      var result = $('<div />').append(data).find(".cart__upsell-free-content").html();
      var giftReminder = $('<div />').append(data).find("[data-free-gift-reminder]").html();
      $(".cart__upsell-free-content").html(result);
      $("[data-free-gift-reminder]").html(giftReminder);
      $('.upsell-carousel__inner').removeClass("d-none").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        focusOnSelect: true
      });
      var productFormAjax = $(".product-add-form--ajax");
      return productFormAjax.on("submit", function(e) {
        var cartNotes, qtySelector, qtyToAddVal, selectedVariant, selectedVariantVal;
        e.preventDefault();
        selectedVariant = $(this).find(".product-single__variants")[0] || $(this).find("input[type=radio]:checked")[0];
        qtySelector = $(this).find(".quantity-selector")[0];
        selectedVariantVal = selectedVariant.value;
        qtyToAddVal = qtySelector ? qtySelector.value : 1;
        cartNotes = {};
        lineItemPropInputs = $(this).find('input[name^=\'properties\']');
        lineItemPropNameRgx = /properties\[(.*?)\]/;
        lineItemPropInputs.each(function() {
          var propKey, propName, propNameKeyMatch, propValue;
          propName = $(this).attr('name');
          propNameKeyMatch = lineItemPropNameRgx.exec(propName);
          propKey = propNameKeyMatch && propNameKeyMatch.length && propNameKeyMatch[1];
          propValue = $(this).val();
          if (propKey && propValue) {
            cartNotes[propKey] = propValue;
          }
        });
        if ($("#customer-note").val()) {
          cartNotes.customerNote = $("#customer-note").val();
        }
        return CartJS.addItem(selectedVariantVal, qtyToAddVal, cartNotes, {
          success: function(data, textStatus, jqXHR) {
          },
          error: function(jqXHR, textStatus, errorThrown) {
            var response;
            response = jqXHR.responseJSON;
            if (globals.dev) {
              console.error(response.status + " (" + response.message + "): " + response.description);
            }
          }
        });
      });
    }
  });
}, 500);
}

window.updateUpsellContent = updateUpsellContent;

$(function() {

/*
$("body").on("click", ".upsell-carousel__btn-cart", function() {
  $("body").removeClass("cart-shown");
});
*/

$(".cart__body").on("click", "a.no-pjax", function() {
  updateUpsellContent();
});

$("body").on("submit", "form.product-add-form", function() {
  updateUpsellContent();
});

if ($('.upsell-carousel__inner').length) {
  $('.upsell-carousel__inner').removeClass("d-none").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    focusOnSelect: true
  });
}
});

loadSizeGuide = function() {
  var targetDiv, targetUrl;
  targetUrl = "/pages/size-guide #size-guide-wrapper";
  targetDiv = $("#sg-ajax-target");
  return targetDiv.load(targetUrl);
};

pdpAccordion = function() {
  var $t;
  $t = $(this);
  if ($t.hasClass("open")) {
    $t.removeClass("open");
    return $t.next().removeAttr("style");
  } else {
    $(".product-description table tr").removeClass("open").removeAttr("style");
    $t.addClass("open");
    return $t.next().show();
  }
};

toggleSearch = function(e) {
  e.preventDefault();
  return toggleClass($(".search-modal"), "open");
};

toggleSizeGuide = function(e) {
  e.preventDefault();
  toggleClass($(".size-guide-wrapper"), "open");
  return loadSizeGuide();
};

productSelect = function(e) {
  var $active, $clicked, $newOption, $otherActive, $otherList, $select, $thisList, clickedText, otherOption, otherText, thisOption, val;
  e.preventDefault();
  $clicked = $(e.target);
  clickedText = $clicked.text();
  $active = $clicked.siblings(".active");
  $thisList = $clicked.closest(".selector-list");
  thisOption = $thisList.data("option");
  $otherList = $(".selector-list").not($thisList);
  otherOption = $otherList.data("option");
  $otherActive = $otherList.find(".active");
  otherText = $otherActive.text();
  $select = $("#productSelect");
  if (otherText !== '') {
    $newOption = $select.find("[data-" + thisOption + "='" + clickedText + "'][data-" + otherOption + "='" + otherText + "']");
  } else {
    $newOption = $select.find("[data-" + thisOption + "='" + clickedText + "']");
  }
  val = $newOption.val();
  $active.removeClass("active");
  $clicked.addClass("active");
  return $select.val(val).trigger("change");
};

toggleNotifyMe = function(e) {
  var $selected, option1, option2, title, variantId;
  e.preventDefault();
  $selected = $("#productSelect").find(":selected");
  option1 = $selected.data("option-one");
  option2 = $selected.data("option-two");
  variantId = $selected.val();
  title = $(".product-meta__name").text();
  $("#notify-me-variant").val("Please notify me when " + title + " " + option1 + " " + option2 + " becomes available.");
  return toggleClass($(".notify-me-wrapper"), "open");
};

initProductSlider = function() {
  var slider;
  slider = $('.js-product-slider');
  if (slider.length) {
    slider.on('init', function() {
      slider.css('opacity', '1');
      return $('#pdp-tag').prependTo('figure.product-images__featured');
    });
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      dots: false,
      speed: 200,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: true
          }
        }
      ]
    });
    $('.js-product-thumbnail-item').click(function() {
      var dataIndex;
      dataIndex = $(this).data('index');
      slider.slick('slickGoTo', dataIndex);
      return false;
    });
    slider.on('afterChange', function(event, slick, currentSlide) {
      $('.js-product-thumbnail-item').removeClass('active');
      $('.js-product-thumbnail-item').eq(currentSlide).addClass('active');
      if (globals.dev) {
        console.log(currentSlide);
      }
      if (globals.dev) {
        console.log('slick go to', currentSlide);
      }
      if (currentSlide === 0) {
        $('#pdp-tag').show();
      } else {
        $('#pdp-tag').hide();
      }
      $(".js-product-thumbnails").slick('slickGoTo', currentSlide);
    });
  }
  return false;
};

validateQuantityInput = function() {
  var quantityInput;
  quantityInput = $('.js-product-quantity-input');
  quantityInput.on('change paste keyup input', function() {
    $(this).val();
    return false;
  });
  $('.js-product-quantity-minus').click(function() {
    var currentValue;
    currentValue = quantityInput.val();
    if (currentValue > 1) {
      quantityInput.val(parseInt(currentValue) - 1);
    }
    return false;
  });
  $('.js-product-quantity-plus').click(function() {
    var currentValue;
    currentValue = quantityInput.val();
    if (currentValue < 99) {
      quantityInput.val(parseInt(currentValue) + 1);
    }
    return false;
  });
  return false;
};

$(document).on("click, touchend", ".product__variants-label", function(e) {
  var labels;
  labels = $(".product__variants-label");
  labels.removeClass("active");
  return $(this).addClass("active");
});

handlePdpDescriptionClick = function() {
  $('body').on('click', '.js-product-description table tr:nth-child(odd)', function() {
    var t;
    t = void 0;
    t = $(this);
    if (t.hasClass('open')) {
      t.removeClass('open');
      t.next().removeAttr('style');
      return;
    } else {
      $('body').find('.js-product-description table tr').removeClass('open').removeAttr('style');
      t.addClass('open');
      t.next().css('display', 'block');
      return;
    }
    return false;
  });
};

initPdpDescription = function() {
  //if (!isMobile.any()) {
    $('body').find('.js-product-description table tr').removeClass('open').removeAttr('style');
    $('body').find('.js-product-description table tr:first-of-type').addClass('open').next().toggle();
  //}
  handlePdpDescriptionClick();
  return false;
};

initRelatedSlider = function() {
  var relatedSlider;
  relatedSlider = $('.js-related-slider');
  if (relatedSlider.length) {
    relatedSlider.on('init', function() {
      return relatedSlider.css('opacity', '1');
    });
    relatedSlider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  return false;
};

initThumbnailSlider = function() {
  var thumbnailSlider;
  thumbnailSlider = $('.js-product-thumbnails');
  if (thumbnailSlider.length) {
    thumbnailSlider.on('init', function() {
      return thumbnailSlider.css('opacity', '1');
    });
    thumbnailSlider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      centerMode: false,
      infinite: false,
      dots: false,
      vertical: true,
      verticalSwiping: true,
      responsive: []
    });
  }
  return false;
};

initPDPVideo = function() {
  $('.js-open-product-video').on('click', function(e) {
    var data, isVimeo, isYoutube, template, videoID, videoInner, videoWrap;
    e.preventDefault();
    data = $(this).data('video');
    isYoutube = false;
    isVimeo = false;
    if (data.indexOf('youtube.com') !== -1 || data.indexOf('youtu.be') !== -1) {
      isYoutube = true;
    } else if (data.indexOf('vimeo.com') !== -1) {
      isVimeo = true;
    }
    if (isYoutube) {
      videoID = data.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/);
      if (videoID !== null) {
        if (globals.dev) {
          console.log(videoID[1]);
        }
        template = $('<div class="vid-overlay"><div class="vid-overlay-inner"><div class="vid-overlay-inner-cell"><iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoID[1] + '" frameborder="0" allowfullscreen></iframe></div></div></div>');
      }
    } else if (isVimeo) {
      videoID = data.match(/https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/);
      if (videoID !== null) {
        if (globals.dev) {
          console.log(videoID[2]);
        }
        template = $('<div class="vid-overlay"><div class="vid-overlay-inner"><div class="vid-overlay-inner-cell"><iframe src="https://player.vimeo.com/video/' + videoID[2] + '?title=0&byline=0&portrait=0&autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div></div>');
      }
    }
    videoWrap = $('.modal-video-wrapper');
    videoInner = $('.modal-video-container');
    videoWrap.fadeIn(300, function() {
      videoInner.append(template);
      return $('.vid-overlay-inner-cell').fitVids();
    });
  });
};

initPdpMonogram = function() {
  var colorButtons, colorDisplay, container, getMonogramColor, getMonogramPlacement, getMonogramPlacement2, getMonogramText, letterInputs, modal, monogramDisplay, monogramDisplay2, monogramInputColor, monogramInputPlacement, monogramInputPlacement2, monogramInputText, placement2Input, placement2Offsets, placementInput, placementOffsets, submitBtn;
  container = $('.pdp-monogram-container').first();
  placementOffsets = container.data("placement-offsets");
  placement2Offsets = container.data("placement-2-offsets");
  monogramInputText = container.find('input[name="properties[Monogram Letters]"]').first();
  monogramInputColor = container.find('input[name="properties[Monogram Color]"]').first();
  monogramInputPlacement = container.find('input[name="properties[Monogram Placement]"]').first();
  monogramInputPlacement2 = container.find('input[name="properties[Monogram Placement 2]"]').first();
  modal = container.find('.modal').first();
  letterInputs = modal.find('input[name^=\'q3.monogram\']');
  placementInput = modal.find('input[name=\'q3.monogram.placement\']').first();
  placement2Input = modal.find('input[name=\'q3.monogram.placement.2\']').first();
  colorButtons = modal.find('.product__colors-item > a');
  monogramDisplay = modal.find('.monogram-letter-display').first();
  monogramDisplay2 = modal.find('.monogram-letter-display-2').first();
  colorDisplay = modal.find('.product__current-color').first();
  submitBtn = modal.find('.confirm-monogram-btn').first();
  console.log('initPdpMonogram', {
    container: container,
    letterInputs: letterInputs,
    placementOffsets: placementOffsets,
    placement2Offsets: placement2Offsets
  });
  getMonogramText = function() {
    var letters, nameRgx;
    letters = ['', '', ''];
    nameRgx = /q3.monogram\[(\d)\]/;
    letterInputs.each(function() {
      var propKey, propKeyInt, propName, propNameKeyMatch, propValue;
      propName = $(this).attr('name');
      propNameKeyMatch = nameRgx.exec(propName);
      propKey = propNameKeyMatch && propNameKeyMatch.length && propNameKeyMatch[1];
      propKeyInt = propKey && parseInt(propKey, 10);
      propValue = $(this).val();
      if (propKey && propValue) {
        letters[propKeyInt] = propValue;
      }
    });
    return letters.join('').toUpperCase();
  };
  getMonogramColor = function() {
    var activeBtn, hex, name;
    activeBtn = colorButtons.filter('.active').first();
    name = activeBtn.data('colorName');
    hex = activeBtn.data('color');
    return {
      name: name,
      hex: hex
    };
  };
  getMonogramPlacement = function() {
    return placementInput.val();
  };
  getMonogramPlacement2 = function() {
    return placement2Input.val();
  };
  letterInputs.change(function() {
    var monogramText;
    monogramText = getMonogramText();
    console.log('letterChanged', {
      monogramText: monogramText
    });
    monogramDisplay.text(monogramText);
    monogramDisplay2.text(monogramText);
    if (monogramText) {
      submitBtn.prop('disabled', false);
    } else {
      submitBtn.prop('disabled', true);
    }
  });
  colorButtons.click(function() {
    var button, color, monogram2Offsets, monogramOffsets, monogramPlacement, monogramPlacement2;
    button = $(this);
    colorButtons.each(function() {
      $(this).removeClass('active');
    });
    button.addClass('active');
    color = getMonogramColor();
    console.log('colorClicked', {
      button: button,
      color: color
    });
    monogramPlacement = getMonogramPlacement();
    monogramPlacement2 = getMonogramPlacement2();
    monogramOffsets = placementOffsets && placementOffsets[monogramPlacement];
    monogram2Offsets = placement2Offsets && placement2Offsets[monogramPlacement2];
    if (monogramOffsets) {
      monogramDisplay.css({
        'color': color.hex,
        'top': monogramOffsets.top,
        'left': monogramOffsets.left
      });
    } else {
      monogramDisplay.css({
        'color': color.hex
      });
    }
    if (monogram2Offsets) {
      monogramDisplay2.css({
        'color': color.hex,
        'top': monogram2Offsets.top,
        'left': monogram2Offsets.left
      });
    } else {
      monogramDisplay2.css({
        'color': color.hex
      });
    }
    colorDisplay.text('Type: ' + color.name);
  });
  colorButtons.first().click();
  submitBtn.click(function() {
    var monogramColor, monogramPlacement, monogramPlacement2, monogramText;
    monogramText = getMonogramText();
    monogramColor = getMonogramColor();
    monogramPlacement = getMonogramPlacement();
    monogramPlacement2 = getMonogramPlacement2();
    console.log('submitBtn.click', {
      monogramText: monogramText,
      monogramColor: monogramColor,
      monogramPlacement: monogramPlacement,
      monogramPlacement2: monogramPlacement2
    });
    monogramInputText.val(monogramText);
    monogramInputColor.val(monogramColor.name);
    monogramInputPlacement.val(monogramPlacement);
    if (monogramPlacement2) {
      monogramInputPlacement2.val(monogramPlacement2);
    }
    setTimeout((function() {
      monogramInputText.removeAttr('value');
      monogramInputColor.removeAttr('value');
      monogramInputPlacement.removeAttr('value');
      monogramInputPlacement2.removeAttr('value');
      modal.modal('hide');
    }), 200);
  });
};

$(document).on('cart.requestComplete', function(event, cart) {
  var MONOGRAM_VARIANT_ID, monogramLineItems, monogramQuantity, monogrammedLineItems, monogrammedQuantity;
  MONOGRAM_VARIANT_ID = 30299742666888;
  console.log('cart.requestComplete', {
    event: event,
    cart: cart
  });
  monogrammedLineItems = cart.items.filter(function(item) {
    return item.properties && item.properties['Monogram Letters'];
  });
  monogramLineItems = cart.items.filter(function(item) {
    return item.variant_id === MONOGRAM_VARIANT_ID;
  });
  monogrammedQuantity = monogrammedLineItems.map(function(x) {
    return x.quantity;
  }).reduce((function(a, b) {
    return a + b;
  }), 0);
  monogramQuantity = monogramLineItems.map(function(x) {
    return x.quantity;
  }).reduce((function(a, b) {
    return a + b;
  }), 0);
  if (monogrammedQuantity > monogramQuantity) {
    CartJS.addItem(MONOGRAM_VARIANT_ID, monogrammedQuantity - monogramQuantity);
  } else if (monogramQuantity > monogrammedQuantity) {
    CartJS.updateItemById(MONOGRAM_VARIANT_ID, monogrammedQuantity);
  }
  console.log('cart.requestComplete', {
    monogrammedLineItems: monogrammedLineItems,
    monogramLineItems: monogramLineItems,
    monogrammedQuantity: monogrammedQuantity,
    monogramQuantity: monogramQuantity
  });
});

initPdpScripts = function() {
  initProductSlider();
  validateQuantityInput();
  initPdpDescription();
  initRelatedSlider();
  initThumbnailSlider();
  initPDPVideo();
  return initPdpMonogram();
};

pageJs = initPageJs = function() {};

showRecoverPasswordForm = function(e) {
  $('#RecoverPasswordForm').show();
  return $('#CustomerLoginForm').hide();
};

hideRecoverPasswordForm = function(e) {
  e.preventDefault();
  $('#RecoverPasswordForm').hide();
  return $('#CustomerLoginForm').show();
};

preventPJAXonProfilePage = function() {
  return $('.js-account-buttons a').each(function() {
    $(this).addClass('no-pjax');
  });
};

setActiveStateOnNav = function() {
  var className, navLink;
  navLink = $('.navigation a');
  return className = "current";
};

detectLoggedinAdmin = function() {
  var adminbar, html;
  adminbar = $("#admin-bar-iframe") || $("#admin_bar_iframe");
  html = $("html");
  if (adminbar.length) {
    html.addClass("admin-logged-in");
  }
  if (window.self !== window.top) {
    return html.addClass("admin-logged-in");
  }
};

initializeMobileSlick = function() {
    $('.mobile-menu__products').slick({
        slidesToShow: 3.5,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        dots: false,
        speed: 200,
        responsive: [{
            breakpoint: 450,
            settings: {
                slidesToShow: 2.5,
            }
        }]
    });
};
$(document).ready(function() {
    initializeMobileSlick();
});

$(document).on("click", ".toggle-search", toggleSearch);

$(document).on("click", ".js-toggle-size-guide, .size-guide-wrapper > .close", toggleSizeGuide);

$(document).on("click", ".product-description table tr", pdpAccordion);

$(document).on("click", ".selector-list li:not(.list-title)", productSelect);

$(document).on("click", ".toggle-notify-me", toggleNotifyMe);

$(document).on("click touchend", ".js-toggle-cart", toggleMiniCart);

$(document).on("click touchend", ".js-toggle-mobile-menu", toggleMobileMenu);

$(document).on("click", "#RecoverPassword", showRecoverPasswordForm);

$(document).on("click", "#HideRecoverPasswordLink", hideRecoverPasswordForm);

$(document).on('click', '.vid-overlay-inner:not(iframe)', function() {
  return closeModalVideo();
});

$(document).on('click', '.js-modal-video-close', function(e) {
  return closeModalVideo();
});

$(document).keyup(function(e) {
  if (e.key === 'Escape') {
    closeModalVideo();
  }
});

$(document).on("click touchend", ".js-toggle-nav", function(e) {
  var b, megaMenu;
  e.preventDefault();
  b = $("body");
  megaMenu = $(".mega-menu");
  toggleClass(b, "nav-open");
  if (b.hasClass("mega-menu-shown")) {
    b.removeClass("mega-menu-shown");
    return megaMenu.removeClass("shown");
  }
});

$(document).on("click", ".navigation a", function(e) {
  var b, megaMenu;
  b = $("body");
  megaMenu = $("#mega-menu");
  if (b.hasClass("nav-open")) {
    b.removeClass("nav-open");
  }
  if (megaMenu.hasClass("shown")) {
    return megaMenu.removeClass("shown");
  }
});

$(document).on("click", "span[data-toggle='mega-menu']", function(e) {
  var megaMenu;
  e.preventDefault();
  megaMenu = $("#mega-menu");
  megaMenu.toggleClass("shown");
  if (megaMenu.hasClass("shown")) {
    return $("body").addClass('mega-menu-shown');
  } else {
    return $("body").removeClass('mega-menu-shown');
  }
});

$(document).on("click", "#blocker", function(e) {
  var b, megaMenu;
  e.preventDefault();
  megaMenu = $("#mega-menu");
  megaMenu.removeClass("shown");
  b = $("body");
  b.removeClass("cart-shown");
  b.removeClass("mega-menu-shown");
  b.removeClass("mobile-menu-shown")
});

triggerElemInView = function(elem) {
  return elem.on('inview', function(event, isInView) {
    if (isInView) {
      elem.addClass("in-view");
    } else {
      elem.removeClass("in-view");
    }
  });
};

closeMegaMenu = function() {
  var mega;
  mega = $("#mega-menu");
  if (mega.hasClass("shown")) {
    return mega.removeClass("shown");
  }
};

Instafeed = (function() {
  function Instafeed(params, context) {
    var option, value;
    this.options = {
      target: 'instafeed',
      get: 'popular',
      resolution: 'thumbnail',
      sortBy: 'none',
      links: true,
      mock: false,
      useHttp: false
    };
    if (typeof params === 'object') {
      for (option in params) {
        value = params[option];
        this.options[option] = value;
      }
    }
    this.context = context != null ? context : this;
    this.unique = this._genKey();
  }

  Instafeed.prototype.hasNext = function() {
    return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
  };

  Instafeed.prototype.next = function() {
    if (!this.hasNext()) {
      return false;
    }
    return this.run(this.context.nextUrl);
  };

  Instafeed.prototype.run = function(url) {
    var header, instanceName, script;
    if (typeof this.options.clientId !== 'string') {
      if (typeof this.options.accessToken !== 'string') {
        throw new Error("Missing clientId or accessToken.");
      }
    }
    if (typeof this.options.accessToken !== 'string') {
      if (typeof this.options.clientId !== 'string') {
        throw new Error("Missing clientId or accessToken.");
      }
    }
    if ((this.options.before != null) && typeof this.options.before === 'function') {
      this.options.before.call(this);
    }
    if (typeof document !== "undefined" && document !== null) {
      script = document.createElement('script');
      script.id = 'instafeed-fetcher';
      script.src = url || this._buildUrl();
      header = document.getElementsByTagName('head');
      header[0].appendChild(script);
      instanceName = "instafeedCache" + this.unique;
      window[instanceName] = new Instafeed(this.options, this);
      window[instanceName].unique = this.unique;
    }
    return true;
  };

  Instafeed.prototype.parse = function(response) {
    var anchor, childNodeCount, childNodeIndex, childNodesArr, e, eMsg, error, fragment, header, htmlString, httpProtocol, image, imageObj, imageString, imageUrl, images, img, imgHeight, imgOrient, imgUrl, imgWidth, instanceName, l, len, len1, len2, m, n, node, parsedLimit, reverse, sortSettings, targetEl, tmpEl;
    if (typeof response !== 'object') {
      if ((this.options.error != null) && typeof this.options.error === 'function') {
        this.options.error.call(this, 'Invalid JSON data');
        return false;
      } else {
        throw new Error('Invalid JSON response');
      }
    }
    if (response.meta.code !== 200) {
      if ((this.options.error != null) && typeof this.options.error === 'function') {
        this.options.error.call(this, response.meta.error_message);
        return false;
      } else {
        throw new Error("Error from Instagram: " + response.meta.error_message);
      }
    }
    if (response.data.length === 0) {
      if ((this.options.error != null) && typeof this.options.error === 'function') {
        this.options.error.call(this, 'No images were returned from Instagram');
        return false;
      } else {
        throw new Error('No images were returned from Instagram');
      }
    }
    if ((this.options.success != null) && typeof this.options.success === 'function') {
      this.options.success.call(this, response);
    }
    this.context.nextUrl = '';
    if (response.pagination != null) {
      this.context.nextUrl = response.pagination.next_url;
    }
    if (this.options.sortBy !== 'none') {
      if (this.options.sortBy === 'random') {
        sortSettings = ['', 'random'];
      } else {
        sortSettings = this.options.sortBy.split('-');
      }
      reverse = sortSettings[0] === 'least' ? true : false;
      switch (sortSettings[1]) {
        case 'random':
          response.data.sort(function() {
            return 0.5 - Math.random();
          });
          break;
        case 'recent':
          response.data = this._sortBy(response.data, 'created_time', reverse);
          break;
        case 'liked':
          response.data = this._sortBy(response.data, 'likes.count', reverse);
          break;
        case 'commented':
          response.data = this._sortBy(response.data, 'comments.count', reverse);
          break;
        default:
          throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
      }
    }
    if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
      images = response.data;
      parsedLimit = parseInt(this.options.limit, 10);
      if ((this.options.limit != null) && images.length > parsedLimit) {
        images = images.slice(0, parsedLimit);
      }
      fragment = document.createDocumentFragment();
      if ((this.options.filter != null) && typeof this.options.filter === 'function') {
        images = this._filter(images, this.options.filter);
      }
      if ((this.options.template != null) && typeof this.options.template === 'string') {
        htmlString = '';
        imageString = '';
        imgUrl = '';
        tmpEl = document.createElement('div');
        for (l = 0, len = images.length; l < len; l++) {
          image = images[l];
          imageObj = image.images[this.options.resolution];
          if (typeof imageObj !== 'object') {
            eMsg = "No image found for resolution: " + this.options.resolution + ".";
            throw new Error(eMsg);
          }
          imgWidth = imageObj.width;
          imgHeight = imageObj.height;
          imgOrient = "square";
          if (imgWidth > imgHeight) {
            imgOrient = "landscape";
          }
          if (imgWidth < imgHeight) {
            imgOrient = "portrait";
          }
          imageUrl = imageObj.url;
          httpProtocol = window.location.protocol.indexOf("http") >= 0;
          if (httpProtocol && !this.options.useHttp) {
            imageUrl = imageUrl.replace(/https?:\/\//, '//');
          }
          imageString = this._makeTemplate(this.options.template, {
            model: image,
            id: image.id,
            link: image.link,
            type: image.type,
            image: imageUrl,
            width: imgWidth,
            height: imgHeight,
            orientation: imgOrient,
            caption: this._getObjectProperty(image, 'caption.text'),
            likes: image.likes.count,
            comments: image.comments.count,
            location: this._getObjectProperty(image, 'location.name')
          });
          htmlString += imageString;
        }
        tmpEl.innerHTML = htmlString;
        childNodesArr = [];
        childNodeIndex = 0;
        childNodeCount = tmpEl.childNodes.length;
        while (childNodeIndex < childNodeCount) {
          childNodesArr.push(tmpEl.childNodes[childNodeIndex]);
          childNodeIndex += 1;
        }
        for (m = 0, len1 = childNodesArr.length; m < len1; m++) {
          node = childNodesArr[m];
          fragment.appendChild(node);
        }
      } else {
        for (n = 0, len2 = images.length; n < len2; n++) {
          image = images[n];
          img = document.createElement('img');
          imageObj = image.images[this.options.resolution];
          if (typeof imageObj !== 'object') {
            eMsg = "No image found for resolution: " + this.options.resolution + ".";
            throw new Error(eMsg);
          }
          imageUrl = imageObj.url;
          httpProtocol = window.location.protocol.indexOf("http") >= 0;
          if (httpProtocol && !this.options.useHttp) {
            imageUrl = imageUrl.replace(/https?:\/\//, '//');
          }
          img.src = imageUrl;
          if (this.options.links === true) {
            anchor = document.createElement('a');
            anchor.href = image.link;
            anchor.appendChild(img);
            fragment.appendChild(anchor);
          } else {
            fragment.appendChild(img);
          }
        }
      }
      targetEl = this.options.target;
      if (typeof targetEl === 'string') {
        targetEl = document.getElementById(targetEl);
      }
      if (targetEl == null) {
        eMsg = "No element with id=\"" + this.options.target + "\" on page.";
        throw new Error(eMsg);
      }
      targetEl.appendChild(fragment);
      header = document.getElementsByTagName('head')[0];
      header.removeChild(document.getElementById('instafeed-fetcher'));
      instanceName = "instafeedCache" + this.unique;
      window[instanceName] = void 0;
      try {
        delete window[instanceName];
      } catch (error) {
        e = error;
      }
    }
    if ((this.options.after != null) && typeof this.options.after === 'function') {
      this.options.after.call(this);
    }
    return true;
  };

  Instafeed.prototype._buildUrl = function() {
    var base, endpoint, final;
    base = "https://api.instagram.com/v1";
    switch (this.options.get) {
      case "popular":
        endpoint = "media/popular";
        break;
      case "tagged":
        if (!this.options.tagName) {
          throw new Error("No tag name specified. Use the 'tagName' option.");
        }
        endpoint = "tags/" + this.options.tagName + "/media/recent";
        break;
      case "location":
        if (!this.options.locationId) {
          throw new Error("No location specified. Use the 'locationId' option.");
        }
        endpoint = "locations/" + this.options.locationId + "/media/recent";
        break;
      case "user":
        if (!this.options.userId) {
          throw new Error("No user specified. Use the 'userId' option.");
        }
        endpoint = "users/" + this.options.userId + "/media/recent";
        break;
      default:
        throw new Error("Invalid option for get: '" + this.options.get + "'.");
    }
    final = base + "/" + endpoint;
    if (this.options.accessToken != null) {
      final += "?access_token=" + this.options.accessToken;
    } else {
      final += "?client_id=" + this.options.clientId;
    }
    if (this.options.limit != null) {
      final += "&count=" + this.options.limit;
    }
    final += "&callback=instafeedCache" + this.unique + ".parse";
    return final;
  };

  Instafeed.prototype._genKey = function() {
    var S4;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return "" + (S4()) + (S4()) + (S4()) + (S4());
  };

  Instafeed.prototype._makeTemplate = function(template, data) {
    var output, pattern, ref, varName, varValue;
    pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
    output = template;
    while (pattern.test(output)) {
      varName = output.match(pattern)[1];
      varValue = (ref = this._getObjectProperty(data, varName)) != null ? ref : '';
      output = output.replace(pattern, function() {
        return "" + varValue;
      });
    }
    return output;
  };

  Instafeed.prototype._getObjectProperty = function(object, property) {
    var piece, pieces;
    property = property.replace(/\[(\w+)\]/g, '.$1');
    pieces = property.split('.');
    while (pieces.length) {
      piece = pieces.shift();
      if ((object != null) && piece in object) {
        object = object[piece];
      } else {
        return null;
      }
    }
    return object;
  };

  Instafeed.prototype._sortBy = function(data, property, reverse) {
    var sorter;
    sorter = function(a, b) {
      var valueA, valueB;
      valueA = this._getObjectProperty(a, property);
      valueB = this._getObjectProperty(b, property);
      if (reverse) {
        if (valueA > valueB) {
          return 1;
        } else {
          return -1;
        }
      }
      if (valueA < valueB) {
        return 1;
      } else {
        return -1;
      }
    };
    data.sort(sorter.bind(this));
    return data;
  };

  Instafeed.prototype._filter = function(images, filter) {
    var filteredImages, fn, image, l, len;
    filteredImages = [];
    fn = function(image) {
      if (filter(image)) {
        return filteredImages.push(image);
      }
    };
    for (l = 0, len = images.length; l < len; l++) {
      image = images[l];
      fn(image);
    }
    return filteredImages;
  };

  return Instafeed;

})();

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    return define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    return module.exports = factory();
  } else {
    return root.Instafeed = factory();
  }
})(this, function() {
  return Instafeed;
});

closeSubModal = function() {
  var subWrap;
  subWrap = $('.subscribe-wrapper');
  if (subWrap.hasClass("open")) {
    return subWrap.removeClass("open");
  }
};

disableMailChimpForms = function() {
  var allForms;
  allForms = $('.js-form-subscription');
  return allForms.find('input, button').prop("disabled", true);
};

enableMailChimpForms = function() {
  var allForms;
  allForms = $('.js-form-subscription');
  return allForms.find('input, button').prop("disabled", false);
};

resetMailchimpForms = function() {
  var allForms, successDivs;
  allForms = $('.js-form-subscription');
  successDivs = $('.js-subscribe-text-success');
  successDivs.hide();
  allForms.each(function() {
    return $(this)[0].reset();
  });
  return enableMailChimpForms();
};

initMailchimp = function() {
  var mailchimpForm;
  mailchimpForm = $('.js-form-subscription');
  return mailchimpForm.on('submit', function(e) {
    var $mcForm, $mcFormEmail;
    e.preventDefault();
    $mcForm = $(this);
    $mcFormEmail = $mcForm.find('.email').val();
    if ($mcFormEmail === "") {
      return alert("Valid email address required");
    } else {
      return registerMailchimpForm($mcForm);
    }
  });
};

registerMailchimpForm = function($form, sucessDiv) {
  var successDiv;
  successDiv = $form.find('.js-subscribe-text-success');
  return $.ajax({
    type: $form.attr('method'),
    url: globals.mailChimpUrl,
    data: $form.serialize(),
    cache: false,
    dataType: 'jsonp',
    jsonp: 'c',
    error: function(err) {
      return alert("Could not connect to the server. Please try again later.");
    },
    success: function(data) {
      var msg;
      if (data.result === 'error') {
        msg = data.msg;
        if (msg.indexOf("already") >= 0) {
          return successDiv.show().removeClass("successfull").html(globals.subscribeOnListMessage);
        } else {
          return successDiv.show().removeClass("successfull").html(globals.subscribeErrorMessage);
        }
      } else {
        successDiv.show().addClass("successfull").html(globals.subscribeThankYouMessage);
        disableMailChimpForms();
        setTimeout(resetMailchimpForms, 3000);
        setTimeout(closeSubModal, 3500);
        return setCookie('subscribe', 'subscribed', globals.subscribe_hide_duration);
      }
    }
  });
};

isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

detectMobile = function() {
  if (isMobile.any()) {
    globals.mobile = true;
    if (globals.dev) {
      return console.log("Mobile = " + mobile);
    }
  } else {
    globals.mobile = false;
    if (globals.dev) {
      return console.log("Mobile = " + mobile);
    }
  }
};

closeModalVideo = function() {
  var modalVideoContainer, modalVideoWrapper;
  modalVideoWrapper = $('.modal-video-wrapper');
  modalVideoContainer = $('.modal-video-container');
  return modalVideoWrapper.fadeOut(300, function() {
    return modalVideoContainer.empty();
  });
};

addScrolledClass = function(scrollDist) {
  var dist, win;
  win = $(window);
  dist = scrollDist;
  if (win.scrollTop() > dist) {
    return $('body').addClass('scrolled');
  } else {
    return $('body').removeClass('scrolled');
  }
};

$(window).on('scroll', function(e) {
  var scrollDown, scrollUp;
  addScrolledClass(200);
  if (e.dir === 'up') {
    scrollUp++;
    scrollDown = 0;
    if (globals.dev) {
      return console.log("scrolling up");
    }
  } else if (e.dir === 'down') {
    scrollDown++;
    scrollUp = 0;
    return console.log("scrollign down");
  }
});

setCookie = function(cookieName, value, expiration) {
  if (!Cookies.get(cookieName)) {
    return Cookies.set(cookieName, value, {
      expires: expiration
    });
  }
};

removeCookie = function(cookieName) {
  return Cookies.remove(cookieName);
};

toggleClass = function($wrap, className) {
  return $wrap.toggleClass(className);
};

initVideos = function() {
  return $('.video-container__play').on('click touchend', function() {
    var iframe, parent, placeholderImg, player, theVideo;
    parent = $(this).closest('.video-container');
    placeholderImg = $(this).closest('.video-container__image-holder');
    theVideo = $(this).closest('.video-container__video-holder');
    parent.toggleClass('is-playing');
    iframe = parent.find($('iframe'));
    player = new Vimeo.Player(iframe);
    player.play();
    return player.on('ended', function() {
      return parent.removeClass('is-playing');
    });
  });
};

zoom = $('.zoom-wrapper');

inner = $('.zoom-wrapper > .inner');

target_image = '#ProductPhotoImg';

doZoom = function($img) {
  var img, src, srcHires;
  globals.body.addClass('zoom-open');
  src = $img.attr('src');
  srcHires = $img.data('zoom');
  img = $('<img src="' + srcHires + '" class="img-100 img-fluid">');
  zoom.addClass('open');
  inner.append(img);
  return inner.imagesLoaded(function() {
    return img.addClass('loaded');
  });
};

$(document).on('keyup', function(e) {
  if (e.keyCode === 27) {
    return destroyZoomOverlay();
  }
});

$(document).on('click', '.zoom-wrapper img, .zoom-wrapper > .close', function(e) {
  return destroyZoomOverlay();
});

destroyZoomOverlay = function() {
  globals.body.removeAttr('style').removeClass('zoom-open');
  if (zoom.hasClass('open')) {
    zoom.removeClass('open');
    return inner.empty();
  }
};

$(document).on('click', target_image, function(e) {
  e.preventDefault();
  return doZoom($(this));
});

inIframe = function() {
  var e, error;
  try {
    return window.self !== window.top;
  } catch (error) {
    e = error;
    return true;
  }
};

initInlineScripts = function() {
  return $('#pjax-container').find('script').each(function() {
    return $.globalEval(this.text || this.textContent || this.innerHTML || '');
  });
};

fitVids = function() {
  return $('.fitvids').parent().fitVids();
};

initParoller = function() {
  $('[data-paroller-factor]').paroller();
};

pjaxComplete = function(e) {
  closeMegaMenu();
  $('.js-plp-item-image').zoom();
  detectLoggedinAdmin();
  initHomePage();
  initParoller();
  initVideos();
  initPLPMasonry();
  fitVids();
  addInfinteScrollToCollection();
  setUpAddToCartFunctions();
  initPdpScripts();
  initPageJs();
  return preventPJAXonProfilePage();
};

window.pjaxComplete = pjaxComplete;

$(document).ready(function() {
  return pjaxComplete();
});

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if (historyTraversal) {
    CartJS.addItem(28822385918032, 0);
    setTimeout(function(){$("#CartCount").removeClass("cart-loading");}, 800);
  } else {
    $("#CartCount").removeClass("cart-loading");
  }
});

}).call(this);

/** Mega Menu. */
function megaMenuFunction() {
var $siteHeader = $('.fostr-header');
var $menuNavItem = $('.fostr-header__navigation__links .fostr-header__navigation__links__item');
var $menuHolder = $('.mega-menu');
var $menuNavHolder = $('.mega-menu__nav');
var eventTarget;

var pointerPosition = function megaMenuPointerPosition(item) {
  var menu;

  if (!$menuHolder.hasClass('is-active')) {
    $menuNavHolder.removeClass('is-visible');
    $(item).addClass('is-open');

    if ($(item).parent().data('attach') != null) {
      menu = '.menu-' + $(item).data('attach');
    } else {
      menu = '.menu-' + ($(item).index() + 1);
    }

    $menuHolder.css({
      height: $(menu).outerHeight(true) + 1
    });

    //working out column count based on screen size
    if($(window).width() <= 1000 && !$(menu).hasClass('4-column')) {
      const prodContainer = $(menu).find('.mega-menu_collections');
      const products = prodContainer.find('.mega-menu__product');
      const callContainer = $(menu).find('.mega-menu_callouts')[0];
      const callCount = callContainer.children.length;

      if (callCount > 0) {
        const lastCallout = callContainer.children[callCount-1];
        lastCallout.style.display = 'none';
        callContainer.style.width = ((callCount - 1) * 215) + 'px';

        for (let item of callContainer.children) {
          item.style.width = (100 / (callCount - 1)) + '%';
        };
      } else {
        products[products.length-1].style.display = 'none';
        products[products.length-2].style.display = 'none';
        prodContainer[0].style.width = (((products.length - 2) / 2) * 240) + 'px';

        for (let item of products) {
          item.style.width = (100 / ((products.length - 2) / 2)) + '%';
        };
      }

      $(menu).removeClass('5-column');
      $(menu).addClass('4-column');
    } else if ($(window).width() > 1000 && !$(menu).hasClass('5-column')) {
      const prodContainer = $(menu).find('.mega-menu_collections');
      const products = prodContainer.find('.mega-menu__product');
      const callContainer = $(menu).find('.mega-menu_callouts')[0];
      const callCount = callContainer.children.length;

      if (callCount > 0) {
        const lastCallout = callContainer.children[callCount-1];
        lastCallout.style.display = 'flex';
        callContainer.style.width = (callCount * 215) + 'px';

        for (let item of callContainer.children) {
          item.style.width = (100 / callCount) + '%';
        };
      } else {
        products[products.length-1].style.display = 'flex';
        products[products.length-2].style.display = 'flex';
        prodContainer[0].style.width = ((products.length / 2) * 240) + 'px';

        for (let item of products) {
          item.style.width = (100 / (products.length / 2)) + '%';
        };
      }

      $(menu).removeClass('4-column');
      $(menu).addClass('5-column');
    }

    $(menu).addClass('is-visible');
  }
};

if ($('html').hasClass('touchevents')) {
  $('.site-nav li .menu__link').on('click', function megaMenuTouchevents(e) {
    if ($(this).hasClass('contain-mega')) {
        e.preventDefault();
        if ($(this).hasClass('is-open')) {
          $menuHolder.removeClass('is-active');
          $siteHeader.removeClass('mega-menu-open');
          $(this).removeClass('is-open');
        } else {
          if ($menuHolder.hasClass('is-active')) {
            $menuHolder.removeClass('is-active');
            $siteHeader.removeClass('mega-menu-open');
            $menuNavItem.removeClass('is-open');
          }
          if ($(e.target).is('span')) {
            eventTarget = $(e.target).parent('a');
          } else {
            eventTarget = e.target;
          }
          pointerPosition(eventTarget);
          $menuHolder.addClass('is-active');
          $siteHeader.addClass('mega-menu-open');
          $siteHeader.removeClass('is-toggled-on');
       }
    } else {
      $menuHolder.removeClass('is-active');
      $siteHeader.removeClass('mega-menu-open');
      $menuNavItem.removeClass('is-open');
    }
  });
} else {
  $menuNavItem.on('mouseover', function megaMenuNoTouchevents(e) {
    if ($(this).hasClass('contain-mega')) {
      if ($menuHolder.hasClass('is-active')) {
        $menuHolder.removeClass('is-active');
        $siteHeader.removeClass('mega-menu-open');
        $menuNavItem.removeClass('is-open');
      }
      if ($(e.target).is('span')) {
        eventTarget = $(e.target).parent('a');
      } else {
        eventTarget = e.target;
      }
      pointerPosition(eventTarget);
      $menuHolder.addClass('is-active');
      $siteHeader.addClass('mega-menu-open');
      $siteHeader.removeClass('is-toggled-on');
    } else {
      $menuHolder.removeClass('is-active');
      $siteHeader.removeClass('mega-menu-open');
      $menuNavItem.removeClass('is-open');
    }
  });
}

$menuHolder.on('mouseleave', function megaMenuMouseLeave() {
  $(this).removeClass('is-active');
  $siteHeader.removeClass('mega-menu-open');
  $menuNavItem.removeClass('is-open');
});

function resize() {
  $menuHolder.css({
  height: $('.mega-menu__nav.is-visible').outerHeight(true) + 1
  });
}

$(window).resize(resize).trigger('resize');
};

$(document).ready(() => {
megaMenuFunction();
});

$(document).on('shopify:section:load', () => {
megaMenuFunction();
});

/** Mobile Menu. */
$(document).ready(function mobileMenuFunction() {
const $menuNavItem = $('.mobile-menu__link-title');

$menuNavItem.on('click', function() {
  let item = $(this)[0].parentElement;
  if (item.classList.contains('is-open')) {
    item.classList.remove('is-open');
  } else {
    $('.mobile-menu__link-item.is-open').removeClass('is-open');
    if(item.classList.contains('has-submenu')) {
      item.classList.add('is-open');
    }
  }
});

$(".mobile-menu__product a").click(function(e) {
  e.stopPropagation();
});
});

function hideLineItemProperties() {
  $('.line-properties .Compare_Price').each( function(){
    var compareVal = $(this).text();
    var finalPriceVal = $(this).attr('data-final-price');
    if (compareVal === finalPriceVal) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

$(document).on("cart.requestComplete", function() {
  hideLineItemProperties();
});

$(function(){
    const popupButton = $('.pdpCtaButton');
    const popupButtonClose = $('.pdpSizeOverlay--close');
    const popupOverlay = $('.pdpSizeOverlay');

    function togglePopup() {
        popupOverlay.toggleClass('hidden');
        $('body').toggleClass('overlay-hidden')
    }

    popupButton.on('click', togglePopup);
    popupButtonClose.on('click', togglePopup);
});
