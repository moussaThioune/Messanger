import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ChatList} from "../models/chat-list";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatUrl = environment.baseURL + 'chat';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  sendMessage(message: any) {
    return this.http.post(this.chatUrl + '/message', message);
  }

  getAllUsers() {
    return this.http.get(this.chatUrl + '/users');
  }

  getAllUsersDiscussions(chatList: ChatList) {
    return this.http.get(this.chatUrl + '/users-discussions/' + chatList.sender + '/' + chatList.receiver);
  }

  getAllGroupesDiscussions(chatList) {
    return this.http.get(this.chatUrl + '/groupes-discussions/' + chatList.groupeId );
  }
}
