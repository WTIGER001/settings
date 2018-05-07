import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { ConfigurationService } from './services/configuration.service';
import { PreferencesService } from './services/preferences.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   ConfigurationService,
   PreferencesService
  ],
})
export class ApiModule { }
