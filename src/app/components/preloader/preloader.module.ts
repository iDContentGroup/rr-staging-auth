import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloaderComponent } from './preloader.component';

import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    declarations: [PreloaderComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [PreloaderComponent]
})
export class PreloaderModule { }
