import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'test',
        loadChildren: () => import('./dest/test/test.module').then( m => m.TestModule),
        data: {
            name: "Test"
        }
    },
    {
        path: '',
        loadChildren: () => import('./dest/authAction/authAction.module').then(m => m.AuthActionModule),
        data: {
            name: "Auth Action (dynamic link handler)"
        }
    },
    {
        path: 'auth/action',
        loadChildren: () => import('./dest/authAction/authAction.module').then( m => m.AuthActionModule),
        data: {
            name: "Auth Action (dynamic link handler)"
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
