import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PvpBattleComponent } from './pvp-battle/pvp-battle.component';
import { AppRoutingModule } from './/app-routing.module';
import { DeepstreamService } from '../services/deepstream.service';
import { PlayerService } from '../services/player.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    PvpBattleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    DeepstreamService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
