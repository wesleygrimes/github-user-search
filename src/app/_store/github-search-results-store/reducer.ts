import { Action, createReducer, on } from '@ngrx/store';
import * as featureActions from './actions';
import { featureAdapter, initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.updateSearchQuery, (state, { searchQuery }) => ({
    ...state,
    currentQuery: searchQuery.query,
    currentSort: searchQuery.sort || state.currentSort,
    currentOrder: searchQuery.order || state.currentOrder
  })),
  on(featureActions.searchRequest, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(featureActions.searchSuccess, (state, { results }) =>
    featureAdapter.addAll(results.items, {
      ...state,
      isLoading: false,
      error: null,
      incompleteResults: results.incomplete_results,
      totalCount: results.total_count,
      currentPage: 1
    })
  ),
  on(featureActions.searchFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(featureActions.gotoNextPage, state => {
    const maxPage = state.totalCount / 30;
    const nextPage = Math.min(state.currentPage + 1, maxPage);

    return {
      ...state,
      currentPage: nextPage
    };
  }),
  on(featureActions.gotoPreviousPage, state => {
    const prevPage = Math.max(state.currentPage - 1, 1);
    return {
      ...state,
      currentPage: prevPage
    };
  }),
  on(featureActions.loadNextPageRequest, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(featureActions.loadNextPageSuccess, (state, { results }) =>
    featureAdapter.upsertMany(results.items, {
      ...state,
      isLoading: false,
      error: null
    })
  ),
  on(featureActions.loadNextPageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(featureActions.loadUserRequest, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(featureActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    isLoading: true,
    error: null,
    currentUser: user
  })),
  on(featureActions.loadUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
