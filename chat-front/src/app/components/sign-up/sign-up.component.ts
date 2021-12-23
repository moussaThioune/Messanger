import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: any = {};
  registerForm: FormGroup;
  isSubmitted  =  false;
  constructor(
    private service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.registerForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    console.log(this.registerForm.value);
    this.isSubmitted = true;
    if (this.registerForm.invalid){
      return;
    }
    this.registerForm.value.groups = [];
    this.service
      .register(this.registerForm.value)
      .subscribe((response: any) => {
        console.log('response api', 'data: ' + response);
        this.user = response.data.user;
        this.getUser();
        localStorage.setItem('accessToken', response.data.accessToken);
        this.router.navigateByUrl('/chat');
      });
  }

  getUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  get formControls() { return this.registerForm.controls; }

}
