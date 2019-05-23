import { Component, Input, OnInit } from '@angular/core';
import { GithubSearchResult } from '../_models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() results: GithubSearchResult[];

  constructor() {}

  ngOnInit() {}
}
