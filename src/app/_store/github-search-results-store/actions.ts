import { Action } from '@ngrx/store';
import {
  GithubSearchQuery,
  GithubSearchResults,
  GithubUser
} from 'src/app/_models';

export enum ActionTypes {
  UPDATE_SEARCH_QUERY = '[Search Form] Update Search Query',
  SEARCH_REQUEST = '[Github Search Effect] Search Request',
  SEARCH_FAILURE = '[Github Search API] Search Failure',
  SEARCH_SUCCESS = '[Github Search API] Search Success',
  SHOW_DETAILS = '[Search Results] Show Details',
  LOAD_USER_REQUEST = '[Github Search Effect] Load User Request',
  LOAD_USER_FAILURE = '[Github User API] Load User Failure',
  LOAD_USER_SUCCESS = '[Github User API] Load User Success',
  GOTO_NEXT_PAGE = '[Search Results] Goto Next Page',
  GOTO_PREVIOUS_PAGE = '[Search Results] Goto Previous Page',
  LOAD_NEXT_PAGE_REQUEST = '[Search Results] Load Next Page Request',
  LOAD_NEXT_PAGE_FAILURE = '[Github User API] Load Next Page Failure',
  LOAD_NEXT_PAGE_SUCCESS = '[Github User API] Load Next Page Success'
}

export class UpdateSearchQueryAction implements Action {
  readonly type = ActionTypes.UPDATE_SEARCH_QUERY;
  constructor(
    public payload: {
      searchQuery: GithubSearchQuery;
    }
  ) {}
}

export class SearchRequestAction implements Action {
  readonly type = ActionTypes.SEARCH_REQUEST;
}

export class SearchFailureAction implements Action {
  readonly type = ActionTypes.SEARCH_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SearchSuccessAction implements Action {
  readonly type = ActionTypes.SEARCH_SUCCESS;
  constructor(public payload: { results: GithubSearchResults }) {}
}

export class ShowDetailsAction implements Action {
  readonly type = ActionTypes.SHOW_DETAILS;
  constructor(public payload: { userUrl: string }) {}
}

export class LoadUserRequestAction implements Action {
  readonly type = ActionTypes.LOAD_USER_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class LoadUserFailureAction implements Action {
  readonly type = ActionTypes.LOAD_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadUserSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: { user: GithubUser }) {}
}

export class GotoNextPageAction implements Action {
  readonly type = ActionTypes.GOTO_NEXT_PAGE;
}

export class GotoPreviousPageAction implements Action {
  readonly type = ActionTypes.GOTO_PREVIOUS_PAGE;
}

export class LoadNextPageRequestAction implements Action {
  readonly type = ActionTypes.LOAD_NEXT_PAGE_REQUEST;
}

export class LoadNextPageFailureAction implements Action {
  readonly type = ActionTypes.LOAD_NEXT_PAGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadNextPageSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_NEXT_PAGE_SUCCESS;
  constructor(public payload: { results: GithubSearchResults }) {}
}

export type Actions =
  | UpdateSearchQueryAction
  | SearchRequestAction
  | SearchFailureAction
  | SearchSuccessAction
  | ShowDetailsAction
  | LoadUserRequestAction
  | LoadUserSuccessAction
  | LoadUserFailureAction
  | GotoNextPageAction
  | GotoPreviousPageAction
  | LoadNextPageRequestAction
  | LoadNextPageFailureAction
  | LoadNextPageSuccessAction;
