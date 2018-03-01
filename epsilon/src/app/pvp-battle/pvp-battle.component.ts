import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from '../../services/deepstream.service';

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
  health = 1000;
  total = 1000;

  constructor(
    private ds: DeepstreamService
  ) { }

  ngOnInit() {
    // Get username from
    // window prompt and use 'anonymous' for
    // null or invalid response
    const defaultUsername = 'anonymous';
    const username = window.prompt('Please enter your username', defaultUsername);

    this.username = username || defaultUsername;
    // Login without credentials
    this.ds.login(null, this.loginHandler);

    this.chats = this.ds.getList('chats');

    this.chats.on('entry-added', recordName => {

      this.ds.getRecord(recordName).whenReady(record => {
        record.subscribe((data) => {
          if (data.username && data.text) {
            // Update bindable property
            this.chatArray.push(data);
            if (data.username !== this.username) {
              if (data.text.charAt(0) === '/') {
                if (data.text.substr(1, 7)) {
                  if (Number(data.text.substr(8, data.text.length))) {
                    const damage = Number(data.text.substr(8, data.text.length));
                    this.health -= damage;
                  }
                }
              }
            }
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
}
