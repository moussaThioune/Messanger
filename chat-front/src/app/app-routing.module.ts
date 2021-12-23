import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {AuthGuard} from './services/auth.guard';
import {ChatComponent} from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  { path: 'auth/register', component: SignUpComponent },
  { path: 'auth/login', component: SignInComponent },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

