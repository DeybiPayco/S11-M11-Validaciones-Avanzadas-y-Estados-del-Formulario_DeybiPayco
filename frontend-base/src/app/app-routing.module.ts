import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './features/enrollments/pages/enrollments/enrollments.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { CursosComponent } from './features/cursos/pages/cursos/cursos.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { PanelComponent } from './features/panel/pages/panel/panel.component';
import { EstudiantesComponent } from './features/estudiantes/pages/estudiantes/estudiantes.component';
const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [

      {
        path: '',
        component: PanelComponent
      },

      {
        path: 'enrollments',
        component: EnrollmentsComponent
      },

      {
        path: 'cursos',
        component: CursosComponent
      },
      
      {
        path: 'estudiantes',
        component: EstudiantesComponent
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
