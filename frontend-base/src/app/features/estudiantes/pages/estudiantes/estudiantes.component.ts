import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';

/* Validador: solo letras y espacios (sin números ni símbolos) */
function soloLetras(): ValidatorFn {
  return (control: AbstractControl) => {
    const valor = control.value as string;
    if (!valor) return null;
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)
      ? null
      : { soloLetras: true };
  };
}

/* Validador: fecha de nacimiento debe ser en el pasado y la persona
   debe tener al menos 16 años */
function fechaNacimientoValida(): ValidatorFn {
  return (control: AbstractControl) => {
    const valor = control.value as string;
    if (!valor) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(valor);

    if (fecha >= hoy) {
      return { fechaFutura: true };
    }

    const edadMinima = new Date(hoy);
    edadMinima.setFullYear(edadMinima.getFullYear() - 16);

    if (fecha > edadMinima) {
      return { menorDeEdad: true };
    }

    const edadMaxima = new Date(hoy);
    edadMaxima.setFullYear(edadMaxima.getFullYear() - 80);

    if (fecha < edadMaxima) {
      return { edadMaxima: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {

  /* PASOS DEL FORMULARIO */
  paso = 1;

  /* FORMULARIO */
  estudianteForm: FormGroup;

  /* LISTA */
  estudiantes: any[] = [];

  /* MODAL DETALLES */
  estudianteSeleccionado: any = null;

  /* EDITAR */
  editando = false;

  indiceEditando: number | null = null;

  constructor(private fb: FormBuilder) {

    this.estudianteForm = this.fb.group({

      nombre: [
        '',
        [Validators.required, Validators.minLength(2), soloLetras()]
      ],

      apellido: [
        '',
        [Validators.required, Validators.minLength(2), soloLetras()]
      ],

      correo: [
        '',
        [Validators.required, Validators.email]
      ],

      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9]{7,15}$/)
        ]
      ],

      edad: [
        '',
        [Validators.required, Validators.min(16), Validators.max(80)]
      ],

      carrera: [
        '',
        [Validators.required]
      ],

      codigo: [
        '',
        [Validators.required, Validators.minLength(4)]
      ],

      fechaNacimiento: ['', [fechaNacimientoValida()]],

      genero: [''],

      direccion: [
        '',
        [Validators.required, Validators.minLength(5)]
      ]

    });

  }

  /* ACCESO RÁPIDO A CONTROLES */
  getField(name: string): AbstractControl {
    return this.estudianteForm.get(name)!;
  }

  /* CAMPOS DEL PASO 1 */
  private camposPaso1 = [
    'nombre', 'apellido', 'correo', 'telefono', 'edad', 'codigo'
  ];

  /* CAMPOS DEL PASO 2 */
  private camposPaso2 = ['carrera', 'direccion'];

  /* VERIFICAR SI EL PASO 1 ES VÁLIDO */
  get paso1Valido(): boolean {
    return this.camposPaso1.every(
      campo => this.getField(campo).valid
    );
  }

  /* VERIFICAR SI EL PASO 2 ES VÁLIDO */
  get paso2Valido(): boolean {
    return this.camposPaso2.every(
      campo => this.getField(campo).valid
    );
  }

  /* AVANZAR AL PASO 2 — marca touched para mostrar errores */
  avanzarPaso2() {
    this.camposPaso1.forEach(campo => {
      this.getField(campo).markAsTouched();
    });

    if (this.paso1Valido) {
      this.paso = 2;
    }
  }

  /* GUARDAR */
  guardarEstudiante() {

    /* Marcar todos los campos como touched */
    this.estudianteForm.markAllAsTouched();

    if (this.estudianteForm.invalid) {
      return;
    }

    if (this.editando) {

      this.estudiantes[this.indiceEditando!] =
        this.estudianteForm.value;

      this.editando = false;

      this.indiceEditando = null;

    } else {

      this.estudiantes.push(
        this.estudianteForm.value
      );

    }

    /* RESET */
    this.estudianteForm.reset();

    /* VOLVER AL PASO 1 */
    this.paso = 1;

  }

  /* EDITAR */
  editarEstudiante(estudiante: any, index: number) {

    this.estudianteForm.patchValue(estudiante);

    /* Marcar como pristine/untouched al cargar datos */
    this.estudianteForm.markAsPristine();
    this.estudianteForm.markAsUntouched();

    this.editando = true;

    this.indiceEditando = index;

    /* IR AL PASO 1 */
    this.paso = 1;

  }

  /* ELIMINAR */
  eliminarEstudiante(index: number) {

    this.estudiantes.splice(index, 1);

  }

}
