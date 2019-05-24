import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GithubSearchOrder,
  GithubSearchResults,
  GithubSearchSort,
  GithubUser
} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private API_BASE_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  searchUsers(
    query: string,
    sort: GithubSearchSort,
    order: GithubSearchOrder,
    page: number = 1
  ): Observable<GithubSearchResults> {
    const params = new HttpParams()
      .set('q', `${query}+sort:${sort}-${order}`)
      .set('page', page.toString());
    return this.http.get<GithubSearchResults>(
      `${this.API_BASE_URL}/search/users`,
      {
        params
      }
    );
  }

  getUser(url: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(url);
  }
}
