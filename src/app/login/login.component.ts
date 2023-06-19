import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router){}
  username:string = "";
  password:String = "";

  loginError: boolean = false;

  login() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.http.post('https://fakestoreapi.com/auth/login', user)
      .subscribe(
        (response) => {
          console.log(response);
          const tokenString = JSON.stringify(response);
          localStorage.setItem("token", tokenString);
          this.router.navigateByUrl('/profile');
        },
        (error) => {
          console.log(error);
          this.loginError = true;
        }
      );
  }

}
