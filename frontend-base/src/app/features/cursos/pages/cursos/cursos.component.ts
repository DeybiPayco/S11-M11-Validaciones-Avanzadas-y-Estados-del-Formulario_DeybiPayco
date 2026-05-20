import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {


  cursoForm: FormGroup;


  cursos: any[] = [];


  editando: boolean = false;


  indiceEditar: number | null = null;


  constructor(private fb: FormBuilder) {


    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });


  }


  guardarCurso() {


    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }


    if (this.editando && this.indiceEditar !== null) {


      this.cursos[this.indiceEditar] = this.cursoForm.value;


      this.editando = false;
      this.indiceEditar = null;


    } else {


      this.cursos.push(this.cursoForm.value);


    }


    this.cursoForm.reset();


  }


  editarCurso(index: number) {


    this.editando = true;


    this.indiceEditar = index;


    this.cursoForm.patchValue(this.cursos[index]);


  }


  eliminarCurso(index: number) {


    this.cursos.splice(index, 1);


  }


}

