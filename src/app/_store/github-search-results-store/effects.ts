import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { UserDetailsModalComponent } from 'src/app/user-details-modal/user-details-modal.component';
import { GithubUser } from 'src/app/_models';
import { GithubService } from 'src/app/_services';
import { serializeError } from 'src/app/_utils/serialize-error';
import { GithubSearchResultsStoreSelectors } from '.';
import { RootState } from '../root-state';
import * as featureActions from './actions';

@Injectable()
export class GithubSearchResultsStoreEffects {
  constructor(
    private githubService: GithubService,
    private store: Store<RootState>,
    private actions$: Actions,
    private modalService: NgbModal
  ) {}

  @Effect()
  searchOnUpdateQueryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateSearchQueryAction>(
      featureActions.ActionTypes.UPDATE_SEARCH_QUERY
    ),
    map(() => new featureActions.SearchRequestAction())
  );

  @Effect()
  loadUserOnShowDetailsEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.ShowDetailsAction>(
      featureActions.ActionTypes.SHOW_DETAILS
    ),
    map(
      action =>
        new featureActions.LoadUserRequestAction({
          url: action.payload.userUrl
        })
    )
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
    concatMap(([_, query, sort, order]) =>
      this.githubService.searchUsers(query, sort, order).pipe(
        map(
          results =>
            new featureActions.SearchSuccessAction({
              results
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.SearchFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect()
  requestLoadNextPageOnGotoNextPageEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<featureActions.GotoNextPageAction>(
      featureActions.ActionTypes.GOTO_NEXT_PAGE
    ),
    map(() => new featureActions.LoadNextPageRequestAction())
  );

  @Effect()
  loadNextPageIfNeededRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadNextPageRequestAction>(
      featureActions.ActionTypes.LOAD_NEXT_PAGE_REQUEST
    ),
    withLatestFrom(
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsIsCurrentPageRetrieved
      )
    ),
    filter(([_, isPageRetrieved]) => !isPageRetrieved),
    withLatestFrom(
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentQuery
      ),
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentSort
      ),
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentOrder
      ),
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentPage
      )
    ),
    concatMap(([_, query, sort, order, page]) =>
      this.githubService.searchUsers(query, sort, order, page).pipe(
        map(
          results =>
            new featureActions.LoadNextPageSuccessAction({
              results
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.LoadNextPageFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect()
  loadUserRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadUserRequestAction>(
      featureActions.ActionTypes.LOAD_USER_REQUEST
    ),
    map(action => action.payload),
    switchMap(({ url }) =>
      this.githubService.getUser(url).pipe(
        map(
          user =>
            new featureActions.LoadUserSuccessAction({
              user
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.LoadUserFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  showUserDetailsModalOnLoadUserSuccessEffect$ = this.actions$.pipe(
    ofType<featureActions.LoadUserSuccessAction>(
      featureActions.ActionTypes.LOAD_USER_SUCCESS
    ),
    withLatestFrom(
      this.store.select(
        GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentUser
      )
    ),
    map(([_, user]) => this.showUserDetailsModal(user))
  );

  private showUserDetailsModal(user: GithubUser) {
    const modalRef = this.modalService.open(UserDetailsModalComponent, {
      centered: true
    });
    modalRef.componentInstance.user = user;
  }
}
