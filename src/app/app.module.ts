import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { RootStoreModule } from './_store/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    SearchResultCardComponent,
    UserDetailsModalComponent
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule, RootStoreModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserDetailsModalComponent]
})
export class AppModule {}
