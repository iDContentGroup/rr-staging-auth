import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthActionComponent } from './authAction.component';

const routes: Routes = [
    {
        path: '',
        component: AuthActionComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthActionRoutingModule { }
