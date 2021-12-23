import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from './services/alert.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
