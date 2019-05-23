import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GithubSearchResultsStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('githubSearchResults', featureReducer),
    EffectsModule.forFeature([GithubSearchResultsStoreEffects])
  ]
})
export class GithubSearchResultsStoreModule {}
