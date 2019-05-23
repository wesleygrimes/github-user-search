import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GithubUser } from '../_models';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent implements OnInit {
  @Input() user: GithubUser;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  close() {
    this.activeModal.close('Close click');
  }

  get profileUrl() {
    return `https://github.com/${this.user.login}`;
  }
}
