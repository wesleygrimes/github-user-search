import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { UserDetailsModalComponent } from 'src/app/user-details-modal/user-details-modal.component';
import { GithubUser } from 'src/app/_models';
import { GithubService } from 'src/app/_services';
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
          observableOf(new featureActions.SearchFailureAction({ error }))
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
          observableOf(new featureActions.LoadUserFailureAction({ error }))
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
