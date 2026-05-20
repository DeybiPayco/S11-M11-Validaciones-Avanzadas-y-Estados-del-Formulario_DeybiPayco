import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses = [ { name: 'Desarrollo web', description: 'HTML, CSS, JavaScript, Angular, React, Node.js' },
              { name: 'Diseño gráfico', description: 'Photoshop, Illustrator, InDesign' },
              { name: 'Marketing digital', description: 'Redes Sociales, Publicidad en línea, SEO' }
  ];

}
