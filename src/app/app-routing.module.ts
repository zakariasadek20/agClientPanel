import { AuthGuardGuard } from './guards/auth-guard.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component:DashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'login',component:LoginComponent},
  {path:'registre',component:RegisterComponent},
  {path:'client/add',component:AddClientComponent,canActivate:[AuthGuardGuard]},
  {path:'client/add/:id',component:EditClientComponent,canActivate:[AuthGuardGuard]},
  {path:'client/:id',component:DetailsClientComponent,canActivate:[AuthGuardGuard]},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuardGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule { }
