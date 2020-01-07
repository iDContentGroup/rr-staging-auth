import { enableProdMode } from '@angular/core';

import { Environment } from './environment-interface';
import { decorateModuleRef } from './prod-decorateModuleRef';

enableProdMode();

export const environment: Environment = {
    env: 'prod',
    decorateModuleRef: decorateModuleRef
};
