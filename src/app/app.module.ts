import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonSchemaFormModule, Bootstrap4FrameworkModule } from 'angular2-json-schema-form';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AceEditorModule } from 'ng2-ace-editor';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { SettingAreaComponent } from './setting-area/setting-area.component';
import { FooterComponent } from './footer/footer.component';
import { DataService } from './data.service';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SettingEditorComponent } from './setting-editor/setting-editor.component';
import { NewProfileDialogComponent } from './dialogs/new-profile-dialog/new-profile-dialog.component';
import { DialogService } from './dialogs/dialog.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProviderListComponent,
    SettingAreaComponent,
    FooterComponent,
    ProfileSelectorComponent,
    SettingEditorComponent,
    NewProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Bootstrap4FrameworkModule,
    NgbModule.forRoot(),

    FontAwesomeModule,
    AceEditorModule,
    JsonSchemaFormModule.forRoot(Bootstrap4FrameworkModule)
  ],
  providers: [DataService, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [NewProfileDialogComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
