import { NgModuleRef } from '@angular/core';

export interface Environment {
    env: 'staging' | 'prod';
    decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
}
