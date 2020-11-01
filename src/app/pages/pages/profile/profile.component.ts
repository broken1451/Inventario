import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../../classes/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';


declare function initPlugings();
declare function initPlugings1();
declare function initPlugings2();
declare function initPlugings3();
declare const $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public usuario: User;
  public formulario: FormGroup;
  public formularioUpdate: FormGroup;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;
  public user$: Subscription;
  @ViewChild('barraProgreso', {static: true}) barraProgreso: ElementRef;
  @ViewChild('customFile', {static: true}) customFile: ElementRef;

  constructor(public router: Router , private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      this.loading = false;
      this.cont = 0;
      this.user$ = this.userService.itemsObservable$.subscribe((data) => {
        this.usuario = data;
      });
    } else {
      this.usuario = null;
    }
    initPlugings();
    initPlugings1();
    initPlugings2();

    this.formulario = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required])
      },
      // Validacion de todo el formulario
      // {validators: funcion}
      {validators: this.sonIguales('password', 'password2') }
    );

    this.formulario.setValue({
      name: '',
      email: '',
      password: '',
      password2: ''
    });

    this.formularioUpdate = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
      });

    this.formularioUpdate.setValue({
      name: this.usuario.name,
      email: this.usuario.email,
    });
  }


  get form() {
    return this.formulario.controls;
  }

  get formUpdate() {
    return this.formularioUpdate.controls;
  }

  async updateUser(){

    try {
      this.usuario.name = this.formUpdate.name.value;
      this.usuario.email = this.formUpdate.email.value;
      const userUpdate: any = await this.userService.updateUser(this.usuario).toPromise();
      console.log({userUpdate})
      console.log(userUpdate)
      if (userUpdate) {
        Swal.fire(`Usuario ${userUpdate.name}`, `Actualizado existosamente`, 'success');
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }

  }

  async registrarUsuario() {
    try {
      if (this.formulario.invalid) {
        return;
      }

      const usuario = new User(
        this.form.name.value,
        this.form.email.value,
        this.form.password.value,
      );

      const user: any = await this.userService.createUser(usuario).toPromise();
      if (user) {
        $('#exampleModal').modal('hide');
        Swal.fire(`Usuario ${user.userCreated.name}`, `Creado existosamente`, 'success');
        this.router.navigate(['/users']);
      } else {
        return false;
      }
      console.log({user});
    } catch (error) {
        Swal.fire(
          'Invalid',
          `${error.error.error.error} / ${error.error.error.message}`,
          'error'
        );
        console.log(error);
    }

  }

  seleccionImage(archivo: File){
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo se permiten imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    // si recibimmos un archivo
    this.imagenSubir = archivo;
     // Cargar imagen temporal
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
       this.imagenSubirTemp = reader.result;
       // console.log(reader.result);
     };
  }

  cambiarImagen() {
    // var barra = document.getElementsByClassName('progress');
    this.loading = true;
    const interval =  setInterval(() => {
      this.loading = true;
      if (this.cont < 100) {
        // console.log(' this.cont primer if ', this.cont);
        this.cont = this.cont + 20;
        this.barraProgreso.nativeElement.style.width = this.cont + '%';
        this.barraProgreso.nativeElement.innerHTML = this.cont + '%';
        if (this.cont >= 100) {
          this.userService.cambiarImagen(this.imagenSubir, this.usuario._id);
          setTimeout(() => {
            this.imagenSubirTemp = null;
            this.imagenSubir =  null;
          }, 800);
        }
      }

      if (this.cont === 100) {
        clearInterval(interval);
        this.cont = 0;
        this.barraProgreso.nativeElement.style.width = this.cont + '%';
        // this.customFile.nativeElement.value = '';
       }
    }, 1000);

  }


  private sonIguales(campo1: string, campo2: string) {
    // Retornar una funcion
    return ((group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      // console.log({ grupo: group});

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    });
  }
}
