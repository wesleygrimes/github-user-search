import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GithubSearchOrder,
  GithubSearchResult,
  GithubSearchSort,
  GithubUser
} from 'src/app/_models';
import { featureAdapter, State } from './state';

export const selectGithubSearchResultsState = createFeatureSelector<State>(
  'githubSearchResults'
);

export const selectAllGithubSearchResultsItems: (
  state: object
) => GithubSearchResult[] = featureAdapter.getSelectors(
  selectGithubSearchResultsState
).selectAll;

export const selectGithubSearchResultsError = createSelector(
  selectGithubSearchResultsState,
  (state: State): any => state.error
);

export const selectGithubSearchResultsIsLoading = createSelector(
  selectGithubSearchResultsState,
  (state: State): boolean => state.isLoading
);

export const selectGithubSearchResultsTotalCount = createSelector(
  selectGithubSearchResultsState,
  (state: State): number => state.totalCount
);

export const selectGithubSearchResultsCurrentQuery = createSelector(
  selectGithubSearchResultsState,
  (state: State): string => state.currentQuery
);

export const selectGithubSearchResultsCurrentSort = createSelector(
  selectGithubSearchResultsState,
  (state: State): GithubSearchSort => state.currentSort
);

export const selectGithubSearchResultsCurrentOrder = createSelector(
  selectGithubSearchResultsState,
  (state: State): GithubSearchOrder => state.currentOrder
);

export const selectGithubSearchResultsCurrentUser = createSelector(
  selectGithubSearchResultsState,
  (state: State): GithubUser => state.currentUser
);

export const selectGithubSearchResultsCurrentPage = createSelector(
  selectGithubSearchResultsState,
  (state: State): number => state.currentPage
);

export const selectGithubSearchResultsIsCurrentPageRetrieved = createSelector(
  selectGithubSearchResultsState,
  (state: State): boolean => {
    const rowsPerPage = 30;
    const totalRowsRetrieved = state.ids.length;
    const currentPage = state.currentPage;
    const maxRetrievedPage = totalRowsRetrieved / rowsPerPage;
    return currentPage <= maxRetrievedPage;
  }
);

export const selectGithubSearchResultsHasPreviousPage = createSelector(
  selectGithubSearchResultsState,
  (state: State): boolean => {
    const currentPage = state.currentPage;
    return currentPage > 1;
  }
);

export const selectGithubSearchResultsHasNextPage = createSelector(
  selectGithubSearchResultsState,
  (state: State): boolean => {
    const rowsPerPage = 30;
    const currentPage = state.currentPage;
    const maxPage = state.totalCount / rowsPerPage;
    return currentPage <= maxPage;
  }
);

export const selectGithubSearchResultsForCurrentPage = createSelector(
  selectGithubSearchResultsState,
  selectAllGithubSearchResultsItems,
  (state: State, items: GithubSearchResult[]): GithubSearchResult[] => {
    const rowsPerPage = 30;
    const currentPage = state.currentPage;

    const startRow = currentPage * rowsPerPage - 30;
    const endRow = currentPage * rowsPerPage - 1;

    return items.slice(startRow, endRow);
  }
);
