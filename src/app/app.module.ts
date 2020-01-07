import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';

import { GlobalService } from '../app/services/global.service';
import { IconService } from '../app/services/icon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'firebase/auth';
import { MatSnackBarModule } from '@angular/material';
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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    GlobalService,
    IconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
