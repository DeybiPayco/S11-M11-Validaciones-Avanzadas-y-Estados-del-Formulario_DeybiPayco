import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../services/enrollments.service';
import { Enrollment } from '../../interfaces/enrollments.interface';
 
@Component({
  selector: 'app-enrollments',
  standalone: false,
  styleUrl: './enrollments.component.css',

  templateUrl: './enrollments.component.html'
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];
  enrollment: Enrollment = { name: '', course: '', date: '' };
  editMode = false;


  constructor(private service: EnrollmentService) { }


  ngOnInit() {
    this.load();
  }


  load() {
    this.service.getAll().subscribe(data => this.enrollments = data);
  }


  save() {
    if (this.editMode) {
      this.service.update(this.enrollment.id!, this.enrollment)
        .subscribe(() => this.load());
      this.editMode = false;
    } else {
      this.service.create(this.enrollment)
        .subscribe(() => this.load());
    }


    this.enrollment = { name: '', course: '', date: '' };
  }


  edit(e: Enrollment) {
    this.enrollment = { ...e };
    this.editMode = true;
  }


  delete(id: number) {
    this.service.delete(id)
      .subscribe(() => this.load());
 }
}
