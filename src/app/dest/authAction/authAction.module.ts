import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthActionComponent } from './authAction.component';
import { AuthActionRoutingModule } from './authAction-routing.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { ButtonModule } from '../../components/button/button.module';
import { IconModule } from '../../components/icon/icon.module';
import { InputModule } from '../../components/input/input.module';
import { WarningModule } from '../../components/warning/warning.module';

@NgModule({
    declarations: [
        AuthActionComponent
    ],
    imports: [
        CommonModule,
        AuthActionRoutingModule,
        PreloaderModule,
        IconModule,
        ButtonModule,
        InputModule,
        WarningModule
    ]
})
export class AuthActionModule { }
