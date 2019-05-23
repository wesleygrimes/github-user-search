import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class SearchFormComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean;
  @Output() updateSearchQuery = new EventEmitter<GithubSearchQuery>();

  GithubSearchSort = GithubSearchSort;
  GithubSearchOrder = GithubSearchOrder;

  form: FormGroup;

  formValue: {
    query: string;
    sort: GithubSearchSort;
    order: GithubSearchOrder;
  };

  formValueSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();

    this.formValueSub = this.form.valueChanges.subscribe(value => {
      this.formValue = value;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      query: [''],
      sort: [GithubSearchSort.Repositories],
      order: [GithubSearchOrder.Descending]
    });
  }

  search() {
    this.updateSearchQuery.emit({ ...this.formValue });
  }

  ngOnDestroy() {
    if (this.formValueSub) {
      this.formValueSub.unsubscribe();
    }
  }
}
