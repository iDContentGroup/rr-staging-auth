import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'test',
        // loadChildren: './dest/test/test.module#TestModule',// Angular 7
        loadChildren: () => import('./dest/test/test.module').then( m => m.TestModule),// Angular 8
        data: {
            name: "Test"
        }
    },
    {
        path: 'auth/action',
        // loadChildren: './dest/authAction/authAction.module#AuthActionModule',// Angular 7
        loadChildren: () => import('./dest/authAction/authAction.module').then( m => m.AuthActionModule),// Angular 8
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
