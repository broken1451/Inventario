import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../classes/user';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public userImg: string;
  public totalUser: number;
  public loading: boolean;
  public noExiste: boolean;
  public desde: number;

  constructor(
    private authService: AuthService,
    private userservice: UserService
  ) {
    // this.getAllUsers();
    this.authService.cargarStorage();
  }

  ngOnInit(): void {
    this.desde = 0;
    this.totalUser = 0;
    this.loading = true;
    this.noExiste = false;
    this.getAllUsers();
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalUser) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = this.desde + valor;
    const next: any = document.getElementsByClassName('number');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < next.length; i++) {
      const element = next[i];
      if (desde === 0 && element.textContent === '1') {
        document.getElementById('demo').classList.add('back');
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('demo').classList.add('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo').classList.add('back');
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('btnb').classList.add('active');
        document.getElementById('btns').classList.remove('active');
      } else if (desde === 3 && element.textContent === '2') {
        document.getElementById('demo').classList.remove('back');
        document.getElementById('demo1').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.add('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo1').classList.add('back');
        document.getElementById('demo2').classList.remove('back');
      } else if (desde === 6 && element.textContent === '3') {
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('demo2').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.add('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo2').classList.add('back');
        document.getElementById('demo3').classList.remove('back');
      } else if (desde === 9 && element.textContent === '4') {
        document.getElementById('demo2').classList.remove('back');
        document.getElementById('demo3').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.add('active');
        document.getElementById('btnb').classList.remove('active');
        document.getElementById('btns').classList.add('active');
      }
    }

    this.getAllUsers();
  }

  cambiarDesdeNav(valor: number) {
    $('li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
    console.log(valor);
    console.log('desde: ', this.desde);
  }

  async getAllUsers() {
    try {
      const users: any = await this.userservice
      .getAllUsers(this.desde)
      .toPromise();
      if (users) {

        setTimeout(() => {
          this.loading = true;
          this.users = users.users;
          this.loading =  false;
          this.totalUser = users.usersNumbers;
        }, 800);
        } else {
          this.users = [];
        }
    } catch (error) {
      console.log('error ', error);
    }
  }

  async borrarUsuario(user: User) {
    if (user._id === JSON.parse(localStorage.getItem('user'))._id) {
      Swal.fire(
        'No puede Eliminar usuario',
        'No se puede eliminar el usuario logueado o a si mismo',
        'error'
      );
      return;
    }
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + user.name,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'warning',
      confirmButtonText: 'Si!',
    }).then(async (borrar) => {
      if (borrar.value) {
        const userDeleted = await this.userservice.deleteUser(user).toPromise();
        console.log({ userDeleted });
        if (userDeleted) {
          Swal.fire({
            title: '',
            text: 'El usuario fue borrado exitosamente',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            icon: 'success',
            confirmButtonText: 'ok!',
          });
          this.getAllUsers();
        } else {
          return false;
        }
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El Usuario ' + user.name + ' esta a salvo :)',
          'info'
        );
      }
    });
  }
}