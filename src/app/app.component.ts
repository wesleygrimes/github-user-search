import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubSearchQuery, GithubSearchResult } from './_models';
import {
  GithubSearchResultsStoreActions,
  GithubSearchResultsStoreSelectors
} from './_store/github-search-results-store';
import { RootState } from './_store/root-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  resultsForCurrentPage$: Observable<GithubSearchResult[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  totalCount$: Observable<number>;

  hasPreviousPage$: Observable<boolean>;
  hasNextPage$: Observable<boolean>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.resultsForCurrentPage$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsForCurrentPage
    );
    this.isLoading$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsIsLoading
    );
    this.error$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsError
    );
    this.totalCount$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsTotalCount
    );
    this.hasPreviousPage$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsHasPreviousPage
    );
    this.hasNextPage$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectGithubSearchResultsHasNextPage
    );
  }

  onUpdateSearchQuery(searchQuery: GithubSearchQuery) {
    this.store.dispatch(
      GithubSearchResultsStoreActions.updateSearchQuery({
        searchQuery
      })
    );
  }

  onShowDetails(userUrl: string) {
    this.store.dispatch(
      GithubSearchResultsStoreActions.showDetails({ userUrl })
    );
  }

  onGotoPreviousPage() {
    this.store.dispatch(GithubSearchResultsStoreActions.gotoPreviousPage());
  }

  onGotoNextPage() {
    this.store.dispatch(GithubSearchResultsStoreActions.gotoNextPage());
  }
}
