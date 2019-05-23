import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RootStoreModule } from './_store/root-store.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';

@NgModule({
  declarations: [AppComponent, SearchFormComponent, SearchResultsComponent, SearchResultCardComponent],
  imports: [BrowserModule, HttpClientModule, RootStoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
