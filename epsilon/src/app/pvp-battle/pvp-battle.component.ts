import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from '../../services/deepstream.service';
import { Player } from '../models/player.model';
import { PlayerService } from '../../services/player.service';
import { Ability } from '../models/ability.model';

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
  chatRoomName = 'chat';
  selectedAbility: Ability;


  constructor(private ds: DeepstreamService, private playerService: PlayerService) { }

  ngOnInit() {
    // Get username from
    // window prompt and use 'anonymous' for
    // null or invalid response
    const defaultUsername = '';
    const username = window.prompt('Please enter your username', defaultUsername);

    this.username = username || 'Randy McRandyson ' + Math.random();
    this.getPlayer(this.username);
    // Login without credentials
    this.ds.login(null, this.loginHandler);



    this.chats = this.ds.getList(this.chatRoomName);
    // Notifies everyone that a new user has entered room
    this.text = 'Entered Room';
    this.addChat();
    // Gets all the messages in the room
    const message = this.ds.getRecord(this.chatRoomName);
    message.whenReady(() => {
      message.get().forEach(element => {
        const rec = this.ds.getRecord(element).whenReady(record => {
          // Checks all the users to populate oppenents list
          if (record.get('username') !== undefined) {
            this.users.add(record.get('username'));
          }
        });
      });
    });
    console.log('The user set: ', this.users);

    this.chats.on('entry-added', recordName => {

      this.ds.getRecord(recordName).whenReady(record => {
        record.subscribe((data) => {
          if (data.username && data.text) {
            this.chatArray.push(data);
            if (data.ability && data.toPlayer) {
              this.parseChatAction(data.username, data.text, data.ability, data.toPlayer);
            } else {
              this.parseChatAction(data.username, data.text, null, null);
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
    const recordName = this.chatRoomName + '/' + this.ds.dsInstance.getUid();

    const chatRecord = this.ds.getRecord(recordName);
    chatRecord.set({ username: this.username, text: this.text });
    this.text = '';
    // Update the chats list
    this.chats.addEntry(recordName);
  }

  getPlayer(name: string) {
    this.playerOne = new Player(1, name, 1000, 1000, 100, 100, 1, 1, 1, 1, null);
    this.playerService.getAllUsers().subscribe(data => {
      this.playerOne = data;
      this.playerOne.name = this.username;
    });
  }

  parseChatAction(user: string, text: string, ability: Ability, toPlayer: string) {
    if (text === 'Leaving') {
      this.users.delete(user);
    }
    if (text === 'Entered Room') {
      this.users.add(user);
    }
    if (text === '//Clear-Room') {
      this.clear();
    }
    if (text === '/Perform Ability/') {
      if (this.playerOne.name === toPlayer) {
        this.takeAction(ability);
      }
    }
  }

  takeAction(ability: Ability) {
    if ((this.playerOne.currentHealth - ability.damage) <= 0) {
      this.killed();
    } else {
      this.playerOne.currentHealth -= ability.damage;
    }
  }

  killed() {
    this.playerOne.currentHealth = 0;
    this.playerOne.abilitySet = new Set<Ability>();
  }

  clear() {
    this.ds.getRecord(this.chatRoomName).delete();
  }

  leaveRoom() {
    this.text = 'Leaving';
    this.addChat();
    const messages = this.ds.getRecord(this.chatRoomName);
    messages.whenReady(() => {
      messages.get().forEach(element => {
        const rec = this.ds.getRecord(element).whenReady(record => {
          console.log(record.get());
          if (record.get('username') === this.playerOne.name) {
            record.delete();
          }
        });
      });
    });
  }

  onSelectionChange(ability) {
    this.selectedAbility = ability;
  }

  performAbility(username) {
    this.text = '/Perform Ability/';
    const recordName = this.chatRoomName + '/' + this.ds.dsInstance.getUid();

    const chatRecord = this.ds.getRecord(recordName);
    chatRecord.set({ username: this.username, text: this.text, ability: this.selectedAbility, toPlayer: username });
    this.text = '';
    // Update the chats list
    this.chats.addEntry(recordName);
  }
}
