'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = exports.getActionKey = exports.getNamespace = exports.createTypes = undefined;

var _util = require('./helpers/util');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNamespace = function getNamespace(_ref) {
  var name = _ref.name;
  return '@@resource/' + (0, _util.upperSnakeCase)(name);
};

var getActionKey = function getActionKey(_ref2) {
  var name = _ref2.name,
      pluralName = _ref2.pluralName,
      actionKey = _ref2.actionKey,
      _ref2$actionOpts = _ref2.actionOpts,
      actionOpts = _ref2$actionOpts === undefined ? {} : _ref2$actionOpts;

  // `${actionKey.toUpperCase()}`;
  var actualPluralName = pluralName || name + 's';
  return actionKey.toUpperCase() + '_' + (0, _util.upperSnakeCase)(actionOpts.isArray ? actualPluralName : name);
};

var getActionType = function getActionType(_ref3) {
  var name = _ref3.name,
      actionKey = _ref3.actionKey;
  return (
    // `${actionKey.toUpperCase()}_${name.toUpperCase()}${action.isArray ? 'S' : ''}`;
    getNamespace({ name: name }) + '/' + actionKey.toUpperCase()
  );
};

var createTypes = function createTypes(_ref4) {
  var name = _ref4.name,
      actions = _ref4.actions;
  return Object.keys(actions).reduce(function (types, actionKey) {
    var actionOpts = actions[actionKey];
    var type = getActionType({ name: name, actionOpts: actionOpts, actionKey: actionKey });
    return Object.assign(types, _defineProperty({}, getActionKey({ name: name, actionOpts: actionOpts, actionKey: actionKey }), type));
  }, {});
};

exports.createTypes = createTypes;
exports.getNamespace = getNamespace;
exports.getActionKey = getActionKey;
exports.getActionType = getActionType;
//# sourceMappingURL=types.js.map