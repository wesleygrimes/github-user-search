import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { GithubService } from 'src/app/_services';
import { GithubSearchResultsStoreSelectors } from '.';
import { RootState } from '../root-state';
import * as featureActions from './actions';

@Injectable()
export class GithubSearchResultsStoreEffects {
  constructor(
    private githubService: GithubService,
    private store: Store<RootState>,
    private actions$: Actions
  ) {}

  @Effect()
  searchOnUpdateQueryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateSearchQueryAction>(
      featureActions.ActionTypes.UPDATE_SEARCH_QUERY
    ),
    map(() => new featureActions.SearchRequestAction())
  );

  @Effect()
  searchRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.SearchRequestAction>(
      featureActions.ActionTypes.SEARCH_REQUEST
    ),
    withLatestFrom(
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentQuery
      ),
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentSort
      ),
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentOrder
      )
    ),
    switchMap(([_, query, sort, order]) =>
      this.githubService.searchUsers(query, sort, order).pipe(
        map(
          results =>
            new featureActions.SearchSuccessAction({
              results
            })
        ),
        catchError(error =>
          observableOf(new featureActions.SearchFailureAction({ error }))
        )
      )
    )
  );
}
