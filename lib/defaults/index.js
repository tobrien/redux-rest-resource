'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = exports.defaultState = exports.defaultTransformResponsePipeline = exports.defaultHeaders = exports.defaultActions = exports.defaultGlobals = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpRange = require('http-range');

var defaultActions = {
  create: { method: 'POST', alias: 'save' },
  fetch: { method: 'GET', isArray: true },
  get: { method: 'GET' },
  update: { method: 'PATCH' },
  delete: { method: 'DELETE' }
};

var defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

var defaultTransformResponsePipeline = [function (res) {
  return res.json().then(function (body) {
    return { body: body, code: res.status, contentRange: res.headers.get('Content-Range') };
  });
}, function (res) {
  var contentRange = res.contentRange;

  if (contentRange) {
    var cr = _httpRange.ContentRange.prototype.parse(contentRange);
    res.contentRange = {
      high: cr.range.high,
      low: cr.range.low,
      length: cr.length
    };
  }
  return res;
}];

var defaultState = {
  create: {
    isCreating: false
  },
  fetch: {
    items: [],
    isFetching: false,
    lastUpdated: 0,
    didInvalidate: true,
    contentRange: {
      high: 0,
      low: 0,
      length: 0
    }
  },
  get: {
    item: null,
    isFetchingItem: false,
    lastUpdatedItem: 0,
    didInvalidateItem: true
  },
  update: {
    isUpdating: false
  },
  delete: {
    isDeleting: false
  }
};

var initialState = Object.keys(defaultState).reduce(function (soFar, key) {
  return _extends({}, soFar, defaultState[key]);
}, {});

var defaultGlobals = {
  Promise: Promise
};

exports.defaultGlobals = defaultGlobals;
exports.defaultActions = defaultActions;
exports.defaultHeaders = defaultHeaders;
exports.defaultTransformResponsePipeline = defaultTransformResponsePipeline;
exports.defaultState = defaultState;
exports.initialState = initialState;
//# sourceMappingURL=index.js.map