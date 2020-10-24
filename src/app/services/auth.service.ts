import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/classes/user';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(usuario: User, recordar?: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.httpClient.post(`${URL}${API.login}`, usuario).pipe(map((resLogin) => {
      console.log('resLogin del map: ', resLogin);
      return resLogin;
    }));
  }

}
