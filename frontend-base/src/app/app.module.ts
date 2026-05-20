import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { CoursesComponent } from './shared/components/courses/courses.component';
import { BenefitsComponent } from './shared/components/benefits/benefits.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EnrollmentsComponent } from './features/enrollments/pages/enrollments/enrollments.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { CursosComponent } from './features/cursos/pages/cursos/cursos.component';
import { PanelComponent } from './features/panel/pages/panel/panel.component';
import { EstudiantesComponent } from './features/estudiantes/pages/estudiantes/estudiantes.component'; 
@NgModule({ 
  declarations: [
    AppComponent, 
    HeaderComponent,
    HeroComponent,
    CoursesComponent,  
    BenefitsComponent,
    ContactComponent,
    FooterComponent,
    EnrollmentsComponent,
    DashboardComponent,
    CursosComponent,
    PanelComponent,
    EstudiantesComponent,
    HomeComponent
  ],  
  imports: [
    BrowserModule,    
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }