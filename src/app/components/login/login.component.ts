import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/classes/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public recuerdame: boolean;

  constructor(private authService: AuthService, public router: Router) {
    this.email = '';
    this.password = '';
    this.recuerdame = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.recuerdame = true;
    } else {
      this.email = '';
      this.recuerdame = false;
    }
  }


  async login(formulario: NgForm){
  try {
    if (formulario.invalid) {
      return;
    }
    // console.log(formulario);
    const usuario = new User(null, formulario.value.email, formulario.value.password);
    const resLogin = await this.authService.login(usuario, formulario.value.recuerdame).toPromise();
    console.log(resLogin);
    if (resLogin) {
      // this.router.navigate(['/dashboard']);
    }
  } catch (error) {
    console.log(error)
  }
  }

}
