import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthActionComponent } from './authAction.component';
import { AuthActionRoutingModule } from './authAction-routing.module';

@NgModule({
    declarations: [
        AuthActionComponent
    ],
    imports: [
        CommonModule,
        AuthActionRoutingModule,
    ]
})
export class AuthActionModule { }
