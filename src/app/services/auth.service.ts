import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { API } from 'src/config/api';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user: User;
  public token: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  login(usuario: User, recordar?: boolean) {
    try {
      if (recordar) {
        localStorage.setItem('email', usuario.email);
      } else {
        localStorage.removeItem('email');
      }

      return this.httpClient.post(`${URL}${API.login}`, usuario).pipe(
        map((resLogin: any) => {
          console.log('resLogin del map: ', resLogin);
          this.guardarStorage(resLogin.userLogin._id, resLogin.token, resLogin.userLogin);
          return resLogin;
        })
      );
    } catch (error) {
      console.log({error});
    }
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  guardarStorage(id: string, token: string, user: User ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
    } else {
      this.user = null;
      this.token = '';
    }
  }
}
