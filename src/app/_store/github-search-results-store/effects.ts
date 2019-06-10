import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
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

  searchOnUpdateQueryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.updateSearchQuery),
      map(() => featureActions.searchRequest())
    )
  );

  loadUserOnShowDetailsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.showDetails),
      map(({ userUrl }) =>
        featureActions.loadUserRequest({
          url: userUrl
        })
      )
    )
  );

  searchRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.searchRequest),
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
          map(results =>
            featureActions.searchSuccess({
              results
            })
          ),
          catchError(error =>
            observableOf(
              featureActions.searchFailure({
                error: serializeError(error).message
              })
            )
          )
        )
      )
    )
  );

  requestLoadNextPageOnGotoNextPageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.gotoNextPage),
      map(() => featureActions.loadNextPageRequest())
    )
  );

  loadNextPageIfNeededRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadNextPageRequest),
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
          map(results =>
            featureActions.loadNextPageSuccess({
              results
            })
          ),
          catchError(error =>
            observableOf(
              featureActions.loadNextPageFailure({
                error: serializeError(error).message
              })
            )
          )
        )
      )
    )
  );

  loadUserRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadUserRequest),
      switchMap(({ url }) =>
        this.githubService.getUser(url).pipe(
          map(user =>
            featureActions.loadUserSuccess({
              user
            })
          ),
          catchError(error =>
            observableOf(
              featureActions.loadUserFailure({
                error: serializeError(error).message
              })
            )
          )
        )
      )
    )
  );

  showUserDetailsModalOnLoadUserSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.loadUserSuccess),
        withLatestFrom(
          this.store.select(
            GithubSearchResultsStoreSelectors.selectGithubSearchResultsCurrentUser
          )
        ),
        map(([_, user]) => this.showUserDetailsModal(user))
      ),
    { dispatch: false }
  );

  private showUserDetailsModal(user: GithubUser) {
    const modalRef = this.modalService.open(UserDetailsModalComponent, {
      centered: true
    });
    modalRef.componentInstance.user = user;
  }
}
