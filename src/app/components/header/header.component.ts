import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

declare function initPlugings();
declare function initPlugings1();
declare function initPlugings2();
declare function initPlugings3();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public user$: Subscription;

  constructor(private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {
    initPlugings();
    initPlugings1();
    initPlugings2();
    // initPlugings3();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user$ = this.userService.itemsObservable$.subscribe((data) => {
      this.user = data;
    });
  }

  logout(){
    this.authService.logout();
  }
}
