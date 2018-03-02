import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from '../../services/deepstream.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-pvp-battle',
  templateUrl: './pvp-battle.component.html',
  styleUrls: ['./pvp-battle.component.css']
})
export class PvpBattleComponent implements OnInit {

  title = 'Chat DeepStream Battle';
  username;
  text: string;
  chats;
  chatArray = [];
  playerOne: Player;
  players: Player[];
  users: Set<string> = new Set<string>();


  constructor(
    private ds: DeepstreamService
  ) { }

  ngOnInit() {
    // Get username from
    // window prompt and use 'anonymous' for
    // null or invalid response
    const defaultUsername = 'Randy McRandyson';
    const username = window.prompt('Please enter your username', defaultUsername);

    this.username = username || 'Randy McRandyson ' + Math.random();
    this.getPlayer(this.username);
    // Login without credentials
    this.ds.login(null, this.loginHandler);

    this.chats = this.ds.getList('chat');

    const message = this.ds.getRecord('chat');
    message.whenReady(() => {
      const list = message.get();
      list.forEach(elem => {
        this.users.add(elem.get('username'));
      });
    });
    console.log(this.users);

    this.chats.on('entry-added', recordName => {

      this.ds.getRecord(recordName).whenReady(record => {
        record.subscribe((data) => {
          if (data.username && data.text) {
            this.chatArray.push(data);
            this.parseChatAction(data.username, data.text);
          }
        }, true);
      });
    });
  }


  loginHandler(success, data) {
    console.log('logged in', success, data);
  }

  addChat() {
    const recordName = 'chat/' + this.ds.dsInstance.getUid();

    const chatRecord = this.ds.getRecord(recordName);
    chatRecord.set({ username: this.username, text: this.text });
    this.text = '';
    // Update the chats list
    this.chats.addEntry(recordName);
  }

  getPlayer(name: string) {
    this.playerOne = new Player(1, 1000, 1000, 100, 100, 1, 1, 1, 1, null);
  }

  parseChatAction(user: string, text: string) {
    if (text === 'New Player') {

    }
  }
}
