import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: any = {};
  loginForm: FormGroup;
  isSubmitted  =  false;

  constructor(
    private service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.service.login(this.loginForm.value)
      .subscribe((response: any) => {
        console.log('response api', 'data: ' + response.data.user.name);
        this.user = response.data.user;
        this.getUser();
        localStorage.setItem('accessToken', response.data.accessToken);
        this.router.navigateByUrl('/chat');
      }, error => {
      });
  }
  getUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  get formControls() { return this.loginForm.controls; }

}
