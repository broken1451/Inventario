import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/classes/user';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  private token: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.token =  localStorage.getItem('token');
   }


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
        map((userUpdate: any) => {
          console.log('userUpdate del map: ', userUpdate);
          const userUp: User = userUpdate.userUpdate;
          console.log('userUp del map: ', userUp);
          this.authService.guardarStorage( userUp._id ,this.token, user)
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



}
