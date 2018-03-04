import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import 'rxjs/add/operator/map'; 

@Injectable()
export class PlayerService {

  url = 'http://localhost:3000/player';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Player> {
    return this.http.get<Player>(this.url).map(
      (response) => {
         return response;
      }
    );
  }

}
