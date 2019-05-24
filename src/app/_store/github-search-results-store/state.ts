import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  GithubSearchOrder,
  GithubSearchResult,
  GithubSearchSort,
  GithubUser
} from 'src/app/_models';

export const featureAdapter = createEntityAdapter<GithubSearchResult>({
  selectId: model => model.id
});

export interface State extends EntityState<GithubSearchResult> {
  isLoading: boolean;
  error: string;
  totalCount: number;
  incompleteResults: boolean;
  currentQuery: string;
  currentSort: GithubSearchSort;
  currentOrder: GithubSearchOrder;
  currentUser: GithubUser;
  currentPage: number;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null,
  totalCount: 0,
  incompleteResults: false,
  currentQuery: null,
  currentSort: GithubSearchSort.Repositories,
  currentOrder: GithubSearchOrder.Descending,
  currentUser: null,
  currentPage: 1
});
