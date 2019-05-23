import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GithubSearchResult } from '../_models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Output() showDetails = new EventEmitter<string>();
  @Input() results: GithubSearchResult[];

  constructor() {}

  ngOnInit() {}

  onShowDetails(userUrl: string) {
    this.showDetails.emit(userUrl);
  }
}
