import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {ChatService} from "../../services/chat.service";
import {GroupeService} from "../../services/groupe.service";
import {User} from "../../models/user";
import {Groupe} from "../../models/groupe";
import {Discussion} from "../../models/discussion";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users: User[] = [];
  receiver: User;
  currentUser: User;
  selectGroupe: Groupe;
  groupes: Groupe[] = [];
  userDiscussions: Discussion[] = [];
  groupeDiscussions: Discussion[] = [];
  messageForm: FormGroup;
  groupeForm: FormGroup;
  isSubmitted  =  false;
  addGroupForm  =  false;
  blockUser = true;
  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private groupeService: GroupeService,
  ) { }

  ngOnInit(): void {
    this.messageForm  =  this.formBuilder.group({
      message: ['', Validators.required],
    });
    this.groupeForm  =  this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getAllGroupes();
    this.getAllUsers();
  }

  sendMessage(isInGroupeChat?: boolean) {
    console.log(this.messageForm.value);
    this.isSubmitted = true;
    if (this.messageForm.invalid ||this.currentUser.id === undefined || this.currentUser.id === null){
      return;
    }
    const message = this.messageForm.value;
    message.sender = this.currentUser.id;
    message.receiver = this.receiver.id;
    isInGroupeChat ? message.groupeId = this.selectGroupe.id : '';
    this.chatService
      .sendMessage(message)
      .subscribe((response: any) => {
        this.messageForm.reset();
        this.isSubmitted = false;
        this.getAllUsersDiscussions();
        this.getAllGroupesDiscussions();
        console.log('response api', 'data: ' + response);
      });
  }

  getAllUsersDiscussions() {
    if (this.receiver !== undefined && this.currentUser !== undefined) {
      const chatlist = {
        sender: this.currentUser.id,
        receiver: this.receiver.id
      };
      this.chatService.getAllUsersDiscussions(chatlist).subscribe((response: any) => {
        if (response !== undefined && response !== null) {
          this.userDiscussions = response;
          this.userDiscussions = this.userDiscussions.filter((message) =>{
            return message.groupeId === undefined;
          });
          console.log('response api', 'data: ' + this.userDiscussions.length);
        }
      });
    }
  }
  getAllGroupesDiscussions() {
    console.log('this.selectGroupe.id', 'this.selectGroupe.id: '+this.selectGroupe.id);
    if (this.selectGroupe !== undefined && this.selectGroupe !== null) {
      const chatlist = {
        groupeId: this.selectGroupe.id
      };
      this.chatService.getAllGroupesDiscussions(chatlist).subscribe((response: any) => {
        if (response !== undefined && response !== null) {
          this.groupeDiscussions = response;
          console.log('getAllGroupesDiscussions', 'data: ' + this.groupeDiscussions.length);
        }
      });
    }
  }

  switchUser(user) {
    this.receiver = user;
    this.getAllUsersDiscussions();
  }
  switchGroupe(groupe) {
    this.selectGroupe = groupe;
    console.log(this.selectGroupe.name);
    this.getAllGroupesDiscussions();
  }

  getAllGroupes() {
    this.groupeService.getAllGroupes().subscribe((response: any) => {
      console.log('response api', 'data: ' + response);
      if (response !== undefined && response !== null) {
        this.groupes = response;
        this.selectGroupe = this.groupes[0];
        this.getAllGroupesDiscussions();
      }
    });
  }
  getAllUsers() {
    this.chatService.getAllUsers().subscribe((response: any) => {
      console.log('response api', 'data: ' + response);
      if (response !== undefined && response !== null) {
        this.users = response;
        this.users = this.users.filter((user) =>{
          return user.id !== this.currentUser.id;
        });
        this.receiver = this.users[0];
        this.getAllUsersDiscussions();
      }
    });
  }

  get formControls() { return this.messageForm.controls; }

  createGroupe() {
    const groupe = this.groupeForm.value;
    groupe.owner = this.currentUser.id ?? {};
    console.log('groupe', 'groupe'+ groupe);
    this.groupeService.createGroupe(groupe).subscribe((response: any) => {
      console.log('response api', 'data: ' + response);
      this.groupeForm.reset();
      this.addGroupForm = !this.addGroupForm;
    });
  }

  getInitials(name){
    if (name !== undefined && name !== null) {
      const fullName = name.split(' ');
      const initials = fullName.shift().charAt(0);
      return initials.toUpperCase();
    }
  }

  toggleBlock() {
    this.blockUser = !this.blockUser;
    this.getAllGroupes();
    this.getAllUsers();
  }
}
