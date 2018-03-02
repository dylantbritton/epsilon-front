import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PvpBattleComponent } from './pvp-battle/pvp-battle.component';
import { AppRoutingModule } from './/app-routing.module';
import { DeepstreamService } from '../services/deepstream.service';
import { PlayerService } from '../services/player.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PvpBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DeepstreamService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
