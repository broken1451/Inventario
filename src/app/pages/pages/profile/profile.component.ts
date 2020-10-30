import { Component, OnInit } from '@angular/core';
import { User } from '../../../../classes/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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

  constructor(public router: Router , private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.usuario = JSON.parse(localStorage.getItem('user'));
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
  }


  get form() {
    return this.formulario.controls;
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
        this.router.navigate(['/users']);
      } else {
        return false;
      }
      console.log({user});
    } catch (error) {
      console.log(error);
    }

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
