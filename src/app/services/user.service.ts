import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SubirArchivoService } from './subir-archivo.service';
import { Subject } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: User;
  private token: string;
  private userSubject = new Subject<User>();
  public itemsObservable$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService, private subirArchivoService: SubirArchivoService) {
    this.token =  localStorage.getItem('token');
    this.usuario =  JSON.parse(localStorage.getItem('user'));
  }


  getAllUsers(){
    try {
      return this.httpClient.get(`${URL}${API.user}`).pipe(
        map((users: any) => {
          return users;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  createUser(user: User){
    try {
      return this.httpClient.post(`${URL}${API.create}`, user).pipe(
        map((userCreated: any) => {
          return userCreated;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  updateUser(user: User){
    try {
      return this.httpClient.put(`${URL}${API.update}${user._id}`, user).pipe(
        map((userUpdate: any) => {
          console.log('userUpdate del map: ', userUpdate);
          const userUp: User = userUpdate.userUpdateSave;
          this.authService.guardarStorage( userUp._id , this.token, user);
          return userUp;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser(user: User){
    try {
      return this.httpClient.delete(`${URL}${API.delete}${user._id}`).pipe(
        map((userDelete: any) => {
          console.log('userDelete del map: ', userDelete);
          return userDelete;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  cambiarImagen(archivo: File, id: string) {
    try {
      this.subirArchivoService.subirArchivo(archivo, id).then((data: any) => {
        this.usuario.img = data.user.img;
        this.userSubject.next(this.usuario);
        this.authService.guardarStorage( id , this.token, this.usuario);
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
