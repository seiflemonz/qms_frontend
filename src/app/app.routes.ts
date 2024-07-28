import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'status',
        component: StatusComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'page-not-found',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    },
];
