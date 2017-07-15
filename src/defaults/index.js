import { ContentRange } from 'http-range';

const defaultActions = {
  create: {method: 'POST', alias: 'save'},
  fetch: {method: 'GET', isArray: true},
  get: {method: 'GET'},
  update: {method: 'PATCH'},
  delete: {method: 'DELETE'}
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultTransformResponsePipeline = [
  (res) => res.json().then(body => ({body, code: res.status, contentRange: res.headers.get('Content-Range')})),
  (res) => {
    const contentRange = res.contentRange;

    if (contentRange) {
      const cr = ContentRange.prototype.parse(contentRange);
      res.contentRange = {
        high: cr.range.high,
        low: cr.range.low,
        length: cr.length
      };
    }
    return res;
  }
];

const defaultState = {
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
    },
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

const initialState = Object.keys(defaultState).reduce((soFar, key) => ({...soFar, ...defaultState[key]}), {});

const defaultGlobals = {
  Promise
};

export {
  defaultGlobals,
  defaultActions,
  defaultHeaders,
  defaultTransformResponsePipeline,
  defaultState,
  initialState
};
