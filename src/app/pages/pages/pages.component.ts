import { Component, OnInit } from '@angular/core';
import { API } from '../../../config/api';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

declare function initPlugings();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public userActive: User;

  constructor(
    private authService: AuthService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    initPlugings();
    if (localStorage.getItem('user')) {
      this.userActive = JSON.parse(localStorage.getItem('user'));
      // console.log(this.userActive);
    } else {
      this.userActive = null;
    }
  }
}
