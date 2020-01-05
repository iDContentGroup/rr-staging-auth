import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule } from '../icon/icon.module';
import { WarningComponent } from './warning.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [WarningComponent],
    imports: [
        CommonModule,
        FormsModule,
        IconModule,
        ButtonModule
    ],
    exports: [WarningComponent]
})
export class WarningModule { }
