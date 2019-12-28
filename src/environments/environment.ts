// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { enableDebugTools } from '@angular/platform-browser';

import { Environment } from './environment-interface';
import { decorateModuleRef } from './dev-decorateModuleRef';

export const environment: Environment = {
    env: 'staging',
    decorateModuleRef: decorateModuleRef,
    firebaseConfig: {
        "apiKey": "AIzaSyAKS2Wld9W9sTcsi9m3w8CjRwt1Av3lBFo",
        "authDomain": "rocket-rounding-staging.firebaseapp.com",
        "databaseURL": "https://rocket-rounding-staging.firebaseio.com",
        "projectId": "rocket-rounding-staging",
        "storageBucket": "rocket-rounding-staging.appspot.com",
        "messagingSenderId": "575984349635",
        "appId": "1:575984349635:web:febaf7eb94a5e161ed4d76"
    }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';    // Included with Angular CLI.
