import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AllfoundsComponent } from './allfounds/allfounds.component';
import { AlllossesComponent } from './alllosses/alllosses.component';
import { AuthGuard } from './auth.guard';
import { FoundComponent } from './found/found.component';
import { FoundmineComponent } from './foundmine/foundmine.component';
import { FoundyoursComponent } from './foundyours/foundyours.component';
import { HomeComponent } from './home/home.component';
import { LostComponent } from './lost/lost.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserpostsComponent } from './userposts/userposts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'user/posts/:id', canActivate: [AuthGuard], component: UserpostsComponent },
  { path: 'loss/foundIt/sendEmail/:id', canActivate: [AuthGuard], component: FoundyoursComponent },
  { path: 'found/mine/sendEmail/:id', canActivate: [AuthGuard], component: FoundmineComponent },
  { path: 'admin', canActivate: [AuthGuard, AdminGuard], component: AdminComponent },
  { path: 'losses', component: AlllossesComponent },
  { path: 'founds', component: AllfoundsComponent },
  { path: 'user/lost', canActivate: [AuthGuard], component: LostComponent },
  { path: 'user/found', canActivate: [AuthGuard], component: FoundComponent },
  { path: 'found/search/:id', canActivate: [AuthGuard], component: SearchComponent },
  { path: '**' , component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
