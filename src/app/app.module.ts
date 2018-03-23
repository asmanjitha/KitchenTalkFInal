import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService} from './service/auth.service';
import { RecipedataService } from './service/recipedata.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchpageComponent } from './components/searchpage/searchpage.component';
import { RecipecardComponent } from './components/recipecard/recipecard.component';
import { AddrecipeComponent } from './components/addrecipe/addrecipe.component';
import { RedipedetailsComponent } from './components/redipedetails/redipedetails.component';




const applicationRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: LandingpageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search', component: SearchpageComponent},
  {path: 'recipe/:_id', component: RedipedetailsComponent},
  {path: 'add', component: AddrecipeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchpageComponent,
    RecipecardComponent,
    AddrecipeComponent,
    RedipedetailsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(applicationRoutes)
  ],
  providers: [
    AuthService,
    RecipedataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
