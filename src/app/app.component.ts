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
  results$: Observable<GithubSearchResult[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  totalCount$: Observable<number>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.results$ = this.store.select(
      GithubSearchResultsStoreSelectors.selectAllGithubSearchResultsItems
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
  }

  onUpdateSearchQuery(searchQuery: GithubSearchQuery) {
    this.store.dispatch(
      new GithubSearchResultsStoreActions.UpdateSearchQueryAction({
        searchQuery
      })
    );
  }

  onShowDetails(userUrl: string) {
    this.store.dispatch(
      new GithubSearchResultsStoreActions.ShowDetailsAction({ userUrl })
    );
  }
}
