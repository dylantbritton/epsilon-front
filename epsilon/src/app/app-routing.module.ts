import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PvpBattleComponent } from './pvp-battle/pvp-battle.component';


const routes: Routes = [
  { path: '', redirectTo: '/pvp', pathMatch: 'full' },
  { path: 'pvp', component: PvpBattleComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
