import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_QUERY: {
      const {
        query,
        sort = state.currentSort,
        order = state.currentOrder
      } = action.payload.searchQuery;

      return {
        ...state,
        currentQuery: query,
        currentSort: sort,
        currentOrder: order
      };
    }
    case ActionTypes.SEARCH_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.SEARCH_SUCCESS: {
      return featureAdapter.addAll(action.payload.results.items, {
        ...state,
        isLoading: false,
        error: null,
        incompleteResults: action.payload.results.incomplete_results,
        totalCount: action.payload.results.total_count
      });
    }
    case ActionTypes.SEARCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.LOAD_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: action.payload.user
      };
    }
    case ActionTypes.LOAD_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
