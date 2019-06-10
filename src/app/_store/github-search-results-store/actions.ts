import { createAction, props } from '@ngrx/store';
import {
  GithubSearchQuery,
  GithubSearchResults,
  GithubUser
} from 'src/app/_models';

export const updateSearchQuery = createAction(
  '[Search Form] Update Search Query',
  props<{ searchQuery: GithubSearchQuery }>()
);

export const searchRequest = createAction(
  '[Github Search Effect] Search Request'
);

export const searchFailure = createAction(
  '[Github Search API] Search Failure',
  props<{ error: string }>()
);

export const searchSuccess = createAction(
  '[Github Search API] Search Success',
  props<{ results: GithubSearchResults }>()
);

export const showDetails = createAction(
  '[Search Results] Show Details',
  props<{ userUrl: string }>()
);

export const loadUserRequest = createAction(
  '[Github Search Effect] Load User Request',
  props<{ url: string }>()
);

export const loadUserFailure = createAction(
  '[Github User API] Load User Failure',
  props<{ error: string }>()
);

export const loadUserSuccess = createAction(
  '[Github User API] Load User Success',
  props<{ user: GithubUser }>()
);

export const gotoNextPage = createAction('[Search Results] Goto Next Page');

export const gotoPreviousPage = createAction(
  '[Search Results] Goto Previous Page'
);

export const loadNextPageRequest = createAction(
  '[Search Results] Load Next Page Request'
);

export const loadNextPageFailure = createAction(
  '[Github User API] Load Next Page Failure',
  props<{ error: string }>()
);

export const loadNextPageSuccess = createAction(
  '[Github User API] Load Next Page Success',
  props<{ results: GithubSearchResults }>()
);
