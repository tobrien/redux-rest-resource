'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActions = exports.getActionName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @inspiration https://github.com/angular/angular.js/blob/master/src/ngResource/resource.js

var _types = require('./../types');

var _transform = require('./transform');

var _url = require('./../helpers/url');

var _fetch = require('./../helpers/fetch');

var _util = require('./../helpers/util');

var _defaults = require('./../defaults');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const d = ::console.info;

var getActionName = function getActionName(_ref) {
  var name = _ref.name,
      pluralName = _ref.pluralName,
      actionKey = _ref.actionKey,
      _ref$actionOpts = _ref.actionOpts,
      actionOpts = _ref$actionOpts === undefined ? {} : _ref$actionOpts;

  var actualPluralName = pluralName || name + 's';
  return '' + actionKey + (0, _util.ucfirst)(actionOpts.isArray ? actualPluralName : name);
};

var createActions = function createActions(_ref2) {
  var name = _ref2.name,
      pluralName = _ref2.pluralName,
      defaultUrl = _ref2.url,
      _ref2$actions = _ref2.actions,
      actions = _ref2$actions === undefined ? {} : _ref2$actions,
      credentials = _ref2.credentials;
  return Object.keys(actions).reduce(function (actionFuncs, actionKey) {
    var action = actions[actionKey];
    var actionOpts = _extends({}, actions[actionKey], { credentials: credentials });
    var reducerOpts = (0, _util.pick)(actionOpts, 'assignResponse');
    var type = (0, _types.getActionType)({ name: name, action: action, actionKey: actionKey });
    var url = action.url || defaultUrl;
    var urlParams = (0, _url.parseUrlParams)(url);
    // Compute actual function name
    var actionName = getActionName({ name: name, pluralName: pluralName, actionKey: actionKey, actionOpts: actionOpts });
    // Actual action function
    var actionFunc = function actionFunc(context) {
      var contextOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return function (dispatch) {
        // First dispatch a pending action
        dispatch({ type: type, status: 'pending', context: context });
        var fetchUrl = (0, _fetch.buildFetchUrl)({ url: url, urlParams: urlParams, context: context, contextOpts: contextOpts });
        var fetchOptions = (0, _fetch.buildFetchOpts)({ context: context, contextOpts: contextOpts, actionOpts: actionOpts });
        // d(`${name}Actions.${actionName}()`, fetchUrl, fetchOptions);
        return (0, _fetch.fetch)(fetchUrl, fetchOptions).then((0, _transform.applyTransformPipeline)((0, _transform.buildTransformPipeline)(_defaults.defaultTransformResponsePipeline, actionOpts.transformResponse))).then(function (payload) {
          return dispatch(_extends({ type: type, status: 'resolved', context: context, options: reducerOpts, receivedAt: Date.now() }, payload));
        }).catch(function (err) {
          // Catch HttpErrors
          if (err.statusCode) {
            dispatch({ type: type, status: 'rejected', code: err.statusCode, body: err.body, context: context, options: reducerOpts, receivedAt: Date.now() });
            // Catch regular Errors
          } else {
            dispatch({ type: type, status: 'rejected', context: context, options: reducerOpts, err: err, receivedAt: Date.now() });
          }
          throw err;
        });
      };
    };
    return _extends({}, actionFuncs, _defineProperty({}, actionName, actionFunc));
  }, {});
};

exports.getActionName = getActionName;
exports.createActions = createActions;
//# sourceMappingURL=index.js.map