import { Component, Input, OnInit } from '@angular/core';
import { GithubSearchResult } from '../_models';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.css']
})
export class SearchResultCardComponent implements OnInit {
  @Input() result: GithubSearchResult;

  constructor() {}

  ngOnInit() {}

  get profileUrl() {
    return `https://github.com/${this.result.login}`;
  }
}
