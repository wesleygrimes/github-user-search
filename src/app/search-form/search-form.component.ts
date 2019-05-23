import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GithubSearchOrder,
  GithubSearchQuery,
  GithubSearchSort
} from '../_models';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Input() isLoading: boolean;
  @Output() updateSearchQuery = new EventEmitter<GithubSearchQuery>();
  constructor() {}

  ngOnInit() {}

  search() {
    this.updateSearchQuery.emit({
      query: 'wes',
      sort: GithubSearchSort.Repositories,
      order: GithubSearchOrder.Descending
    });
  }
}
