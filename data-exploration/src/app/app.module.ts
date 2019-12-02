import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapAgmComponent } from './map-agm/map-agm.component';
import {DataService} from "./data.service";
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    MapAgmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDO9bV8thdfvCbXLSWAkcACR84McRGDvSM'
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
