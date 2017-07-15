'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducers = exports.reducers = exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// http://facebook.github.io/react/docs/update.html

var _defaults = require('./../defaults');

var _types = require('./../types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reducers = {
  create: function create(state, action) {
    switch (action.status) {
      case 'pending':
        // Add object to store as soon as possible?
        return _extends({}, state, {
          isCreating: true
          // items: [{
          //   id: state.items.reduce((maxId, obj) => Math.max(obj.id, maxId), -1) + 1,
          //   ...action.context
          // }, ...state.items]
        });
      case 'resolved':
        // Assign returned object
        return _extends({}, state, {
          isCreating: false,
          items: [].concat(_toConsumableArray(state.items), [action.body])
        });
      case 'rejected':
        return _extends({}, state, {
          isCreating: false
        });
      default:
        return state;
    }
  },
  fetch: function fetch(state, action) {
    switch (action.status) {
      case 'pending':
        return _extends({}, state, {
          isFetching: true,
          didInvalidate: false
        });
      case 'resolved':
        return _extends({}, state, {
          isFetching: false,
          didInvalidate: false,
          contentRange: action.contentRange,
          items: action.body,
          lastUpdated: action.receivedAt
        });
      case 'rejected':
        return _extends({}, state, {
          isFetching: false,
          didInvalidate: false
        });
      default:
        return state;
    }
  },
  get: function get(state, action) {
    switch (action.status) {
      case 'pending':
        return _extends({}, state, {
          isFetchingItem: true,
          didInvalidateItem: false
        });
      case 'resolved':
        return _extends({}, state, {
          isFetchingItem: false,
          didInvalidateItem: false,
          item: action.body,
          lastUpdatedItem: action.receivedAt
        });
      case 'rejected':
        return _extends({}, state, {
          isFetchingItem: false,
          didInvalidateItem: false
        });
      default:
        return state;
    }
  },
  update: function update(state, action) {
    switch (action.status) {
      case 'pending':
        // Update object in store as soon as possible?
        return _extends({}, state, {
          isUpdating: true
        });
      case 'resolved':
        {
          // Assign context or returned object
          var id = action.context.id || action.context;
          var actionOpts = action.options || {};
          var update = actionOpts.assignResponse ? action.body : action.context;
          var listItemIndex = state.items.findIndex(function (el) {
            return el.id === id;
          });
          var updatedItems = state.items;
          if (listItemIndex !== -1) {
            var _updatedItem = _extends({}, state.items.splice(listItemIndex, 1)[0], update);
            updatedItems.splice(listItemIndex, 0, _updatedItem);
          }
          var updatedItem = state.item && state.item.id === id ? _extends({}, state.item, update) : state.item;
          return _extends({}, state, {
            isUpdating: false,
            items: listItemIndex !== -1 ? updatedItems.slice() : updatedItems,
            item: updatedItem
          });
        }
      case 'rejected':
        return _extends({}, state, {
          isUpdating: false
        });
      default:
        return state;
    }
  },
  delete: function _delete(state, action) {
    switch (action.status) {
      case 'pending':
        // Update object in store as soon as possible?
        return _extends({}, state, {
          isDeleting: true
        });
      case 'resolved':
        // eslint-disable-line
        var id = action.context.id || action.context;
        return _extends({}, state, {
          isDeleting: false,
          items: [].concat(_toConsumableArray(state.items.filter(function (el) {
            return el.id !== id;
          })))
        });
      case 'rejected':
        return _extends({}, state, {
          isDeleting: false
        });
      default:
        return state;
    }
  }
};

var createReducers = function createReducers(_ref) {
  var name = _ref.name;

  var namespace = (0, _types.getNamespace)({ name: name }) + '/';
  // const localInitialState = {
  //   ...Object.keys(defaultState).reduce((soFar, key) => ({...soFar, ...defaultState[key]}), {}),
  //   ...initialState
  // };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, _defaults.initialState, { name: name });
    var action = arguments[1];

    // Only process relevant namespace
    if (!String(action.type).startsWith(namespace)) {
      return state;
    }
    // Only process relevant action type
    var type = action.type.substr(namespace.length).toLowerCase();
    if (reducers[type]) {
      return reducers[type](state, action);
    }
    return state;
  };
};

exports.initialState = _defaults.initialState;
exports.reducers = reducers;
exports.createReducers = createReducers;
//# sourceMappingURL=index.js.map