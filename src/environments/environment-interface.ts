import { NgModuleRef } from '@angular/core';

export interface Environment {
    env: 'staging' | 'prod';
    decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    }
}
