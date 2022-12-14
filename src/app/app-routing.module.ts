import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetPageComponent } from './tweet-page/tweet-page.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'my-tweet', component: TweetPageComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component:ForgotComponent },
  { path: 'user-list', component:UserlistComponent, canActivate: [AuthGuard] },
  { path: 'user-details', component:UserdetailsComponent, canActivate: [AuthGuard] },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
