import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },

    {
        path: 'activate-account',
        component: ActivateAccountComponent,
        title: 'Activate account'
    },

    {
        path: 'dashboard/edit/users/:id',
        component: EditComponent,
        title: 'Edit user'
    },
    {
        path: 'dashboard/delete/users/:id',
        component: DeleteComponent,
        title: 'Delete user'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',

    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
