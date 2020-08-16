import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { MatchesComponent } from './components/main/matches/matches.component';
import { ViewprofileComponent } from './components/main/viewprofile/viewprofile.component';
import { EditprofileComponent } from './components/main/editprofile/editprofile.component';
import { McqComponent } from './components/mcq/mcq.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mcq', component: McqComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: '', component: MatchesComponent },
      { path: 'matches', component: MatchesComponent},
      { path: 'viewprofile/:id', component: ViewprofileComponent },
      { path: 'editprofile', component: EditprofileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
