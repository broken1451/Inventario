import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: User[] = [];

  constructor(private authService: AuthService, private userservice: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
   try {
    const users: any = await this.userservice.getAllUsers().toPromise();
    if (users) {
      this.users = users.users.users;
      console.log(this.users);
    } else {
      this.users = [];
    }

   } catch (error) {
     console.log(error);
   }
  }

}
