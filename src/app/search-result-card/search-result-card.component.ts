import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GithubSearchResult } from '../_models';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.css']
})
export class SearchResultCardComponent implements OnInit {
  @Output() showDetails = new EventEmitter<string>();
  @Input() result: GithubSearchResult;

  constructor() {}

  ngOnInit() {}

  showUser() {
    this.showDetails.emit(this.result.url);
  }
}
