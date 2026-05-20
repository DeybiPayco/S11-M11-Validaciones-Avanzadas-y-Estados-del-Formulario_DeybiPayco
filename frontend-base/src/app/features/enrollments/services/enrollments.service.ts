import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../interfaces/enrollments.interface';

 
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

   private apiUrl = 'http://localhost:8081/enrollments';
  constructor(private http: HttpClient) { }

  //GET - listar

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  };

  //POST - crear
  create(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  //PUT - actualizar
  update(id: number, enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}`, enrollment);
  }
  //DELETE - eliminar
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
