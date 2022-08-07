import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LostComponent } from './lost/lost.component';
import { FoundComponent } from './found/found.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserpostsComponent } from './userposts/userposts.component';
import { YourpostsComponent } from './yourposts/yourposts.component';
import { FooterComponent } from './footer/footer.component';
import { AlllossesComponent } from './alllosses/alllosses.component';
import { AllfoundsComponent } from './allfounds/allfounds.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FoundyoursComponent } from './foundyours/foundyours.component';
import { FoundmineComponent } from './foundmine/foundmine.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    LostComponent,
    FoundComponent,
    PagenotfoundComponent,
    UserpostsComponent,
    YourpostsComponent,
    FooterComponent,
    AlllossesComponent,
    AllfoundsComponent,
    FoundyoursComponent,
    FoundmineComponent,
    SearchComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
