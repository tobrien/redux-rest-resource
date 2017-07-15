'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.HttpError = exports.mergeReducers = exports.combineReducers = exports.reduceReducers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaults = require('./defaults');

Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaults[key];
    }
  });
});

var _helpers = require('./reducers/helpers');

Object.defineProperty(exports, 'reduceReducers', {
  enumerable: true,
  get: function get() {
    return _helpers.reduceReducers;
  }
});
Object.defineProperty(exports, 'combineReducers', {
  enumerable: true,
  get: function get() {
    return _helpers.combineReducers;
  }
});
Object.defineProperty(exports, 'mergeReducers', {
  enumerable: true,
  get: function get() {
    return _helpers.mergeReducers;
  }
});

var _fetch = require('./helpers/fetch');

Object.defineProperty(exports, 'HttpError', {
  enumerable: true,
  get: function get() {
    return _fetch.HttpError;
  }
});
Object.defineProperty(exports, 'fetch', {
  enumerable: true,
  get: function get() {
    return _fetch.fetch;
  }
});
exports.createResource = createResource;

var _actions = require('./actions');

var _reducers = require('./reducers');

var _types = require('./types');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// https://github.com/angular/angular.js/blob/master/src/ngResource/resource.js
// var User = $resource('/user/:userId', {userId:'@id'});

var mergeObjects = function mergeObjects(object) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  var concat = Array.prototype.concat;
  var uniqueKeys = concat.apply(Object.keys(object), sources.map(Object.keys)).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
  return uniqueKeys.reduce(function (soFar, key) {
    soFar[key] = Object.assign.apply(Object, [soFar[key] || {}].concat(_toConsumableArray(sources.map(function (source) {
      return source[key] || {};
    })))); // eslint-disable-line no-param-reassign
    return soFar;
  }, object);
};

function createResource(_ref) {
  var name = _ref.name,
      url = _ref.url,
      _ref$actions = _ref.actions,
      actions = _ref$actions === undefined ? {} : _ref$actions,
      _ref$pick = _ref.pick,
      pick = _ref$pick === undefined ? [] : _ref$pick,
      args = _objectWithoutProperties(_ref, ['name', 'url', 'actions', 'pick']);

  var actionsOpts = mergeObjects({}, _defaults.defaultActions, actions);
  if (pick.length) {
    actionsOpts = pick.reduce(function (soFar, key) {
      return _extends({}, soFar, _defineProperty({}, key, actionsOpts[key]));
    }, {});
  }
  return {
    actions: (0, _actions.createActions)(_extends({ name: name, url: url, actions: actionsOpts }, args)),
    reducers: (0, _reducers.createReducers)(_extends({ name: name }, args)),
    types: (0, _types.createTypes)(_extends({ name: name, actions: actionsOpts }, args))
  };
}
//# sourceMappingURL=index.js.map