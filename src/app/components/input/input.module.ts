import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule
    ],
    exports: [InputComponent]
})
export class InputModule { }
