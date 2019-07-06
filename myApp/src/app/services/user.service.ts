import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../model/user.model'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private user: User;
  public userSubject: BehaviorSubject<User>;

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("gamerRecruiterUser") == null) {
      this.userSubject = new BehaviorSubject(new User());
    }
    else {
      try {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("gamerRecruiterUser")));
      }
      catch (e) {
        this.userSubject = new BehaviorSubject(new User());
      }
    }
  }

  updateUser(newUser: User): void {
    this.userSubject.next(newUser);
  }


  login(userName: String, password: String): Promise<string> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return new Promise<string>((resolve, reject) => {
      this.httpClient.post<any>("http://localhost:8080/api/authenticate", { "username": userName, "password": password }, options).subscribe(
        res => {
          console.log("response token from authenticate api: " + JSON.stringify(res.token));
          let newUser = new User();
          newUser.username = userName;
          newUser.role = "user";
          newUser.token = res.token;
          newUser.userFormGroup = undefined;
          localStorage.setItem("gamerRecruiterUser", JSON.stringify(newUser));
          this.userSubject.next(newUser);
          resolve("login success");
        },
        err => {
          this.userSubject.next(new User());
          console.error('wrong username or password: ' + JSON.stringify(err));
          reject("wrong username or password");
        }
      );

    });

  }


  logout() {
    localStorage.removeItem("gamerRecruiterUser");
    this.userSubject.next(new User());
  }

}
