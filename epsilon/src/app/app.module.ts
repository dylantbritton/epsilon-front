import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PvpBattleComponent } from './pvp-battle/pvp-battle.component';
import { AppRoutingModule } from './/app-routing.module';
import { DeepstreamService } from '../services/deepstream.service';


@NgModule({
  declarations: [
    AppComponent,
    PvpBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DeepstreamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
