import { NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

export function decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any> {
    disableDebugTools();
    return modRef;
}
