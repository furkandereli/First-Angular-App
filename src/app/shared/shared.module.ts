import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule
  ],
  exports : [
    NavbarComponent,
    HomeComponent
  ]
})
export class SharedModule { }
