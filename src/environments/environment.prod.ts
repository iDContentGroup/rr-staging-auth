import { enableProdMode } from '@angular/core';

import { Environment } from './environment-interface';
import { decorateModuleRef } from './prod-decorateModuleRef';

enableProdMode();

export const environment: Environment = {
    env: 'prod',
    decorateModuleRef: decorateModuleRef,
    firebaseConfig: {
        "apiKey": "AIzaSyAbYLrGKg9l9s3ShrFVwg8PeUxgF-z6Zds",
        "authDomain": "rocket-rounding.firebaseapp.com",
        "databaseURL": "https://rocket-rounding.firebaseio.com",
        "projectId": "rocket-rounding",
        "storageBucket": "rocket-rounding.appspot.com",
        "messagingSenderId": "1024282212718",
        "appId": "1:1024282212718:web:c79e4c0367e84e0f86297f"
    }
};
