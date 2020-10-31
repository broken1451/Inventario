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
export class UserService {

  public user: User;

  constructor(private httpClient: HttpClient) { }


  getAllUsers(){
    try {
      return this.httpClient.get(`${URL}${API.user}`).pipe(
        map((users: any) => {
          console.log('users del map: ', users);
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
        map((user: any) => {
          console.log('users del map: ', user);
          return user;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  updateUser(user: User){
    try {
      return this.httpClient.put(`${URL}${API.update}${user._id}`, user).pipe(
        map((user: any) => {
          console.log('users del map: ', user);
          return user;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }



}
