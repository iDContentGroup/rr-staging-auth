import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/messaging';
// import 'firebase/functions';

// Initialize Firebase
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
