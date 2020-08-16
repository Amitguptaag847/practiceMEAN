import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';

import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/main/nav/nav.component';
import { MatchesComponent } from './components/main/matches/matches.component';
import { McqComponent } from './components/mcq/mcq.component';
import { ViewprofileComponent } from './components/main/viewprofile/viewprofile.component';
import { EditprofileComponent } from './components/main/editprofile/editprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NavComponent,
    MatchesComponent,
    McqComponent,
    ViewprofileComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
