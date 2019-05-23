import { Action } from '@ngrx/store';
import { GithubSearchQuery, GithubSearchResults } from 'src/app/_models';

export enum ActionTypes {
  UPDATE_SEARCH_QUERY = '[Search Form] Update Search Query',
  SEARCH_REQUEST = '[Github Search Effect] Search Request',
  SEARCH_FAILURE = '[Github Search API] Search Failure',
  SEARCH_SUCCESS = '[Github Search API] Search Success'
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

export type Actions =
  | UpdateSearchQueryAction
  | SearchRequestAction
  | SearchFailureAction
  | SearchSuccessAction;
