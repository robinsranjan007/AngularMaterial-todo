import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

{
  path:'',
  component:LoginComponent
},
{
  path:'home',
  component:HomeComponent
},
{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'login',
  component:LoginComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
