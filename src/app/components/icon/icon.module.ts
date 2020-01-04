import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component'; 
import { IconService } from '../../services/icon.service';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [IconComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [IconComponent],
    providers: [IconService]
})
export class IconModule { }
