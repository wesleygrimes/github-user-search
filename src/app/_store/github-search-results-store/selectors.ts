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
