import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../classes/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: User[] = [];
  public userImg: string;

  constructor(private authService: AuthService, private userservice: UserService) {
    // this.getAllUsers();
    this.authService.cargarStorage();
   }

  ngOnInit(): void {
    this.getAllUsers();
    // this.getImgUser();
  }

  async getAllUsers() {
   try {
    const users: any = await this.userservice.getAllUsers().toPromise();
    console.log(users);
    if (users) {
      this.users = users.users;
    } else {
      this.users = [];
    }

   } catch (error) {
     console.log('error ', error);
   }
  }


  async borrarUsuario(user: User){
    if (user._id  === JSON.parse(localStorage.getItem('user'))._id) {
      Swal.fire('No puede Eliminar usuario', 'No se puede eliminar el usuario logueado o a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + user.name,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'warning',
      confirmButtonText: 'Si!'
    }).then( async (borrar) => {
        if (borrar.value) {
          const userDeleted =  await this.userservice.deleteUser(user).toPromise();
          console.log({userDeleted});
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
          Swal.fire('Cancelado', 'El Usuario ' + user.name + ' esta a salvo :)', 'info');
        }
    });
  }

}
