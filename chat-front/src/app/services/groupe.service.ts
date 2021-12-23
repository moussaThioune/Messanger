import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private chatUrl = environment.baseURL + 'groupe';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createGroupe(groupe: any) {
    return this.http.post(this.chatUrl, groupe);
  }

  getAllGroupes() {
    return this.http.get(this.chatUrl);
  }
}
