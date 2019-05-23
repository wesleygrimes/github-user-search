import { GithubSearchResult } from './github-search-result';

export interface GithubSearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: GithubSearchResult[];
}
