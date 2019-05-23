import { GithubSearchOrder } from './github-search-order';
import { GithubSearchSort } from './github-search-sort';

export interface GithubSearchQuery {
  query: string;
  sort?: GithubSearchSort;
  order?: GithubSearchOrder;
}
