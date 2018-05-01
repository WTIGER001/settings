import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {JsonSchemaFormModule, Bootstrap4FrameworkModule  } from 'angular2-json-schema-form';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { SettingAreaComponent } from './setting-area/setting-area.component';
import { FooterComponent } from './footer/footer.component';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProviderListComponent,
    SettingAreaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
     HttpModule,
     Bootstrap4FrameworkModule,
     JsonSchemaFormModule.forRoot(Bootstrap4FrameworkModule )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
