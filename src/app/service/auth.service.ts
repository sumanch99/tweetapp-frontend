import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForgotPassword } from '../model/Forgotpassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(data: User) {
    data.userId=data.email;
    return this.http.post<any>(`${environment.login}`, data)
      .pipe(map(response => {
        console.log(response);
        // login successful if there's a jwt token in the response
        if (response.status == 500) {
          return response;
        }
        if (response.data && response.status == 200) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.currentUserValue = response.data.jwt;
          localStorage.setItem('currentUser', response.data.jwt);
          localStorage.setItem('username', response.data.username);
          this.token = localStorage.getItem('currentUser')
          console.log("Local Storage - " + this.token)
          this.currentUserSubject.next(response.data);
        }

        return response;
      }));
  }
  currentUserSubject: BehaviorSubject<any>;
  currentUser: any;
  token: string | null;

  gettoken() {
    return !!localStorage.getItem("currentUser");
  }

  logout() {
    // remove user from local storage to log user out
    console.log("In logout")
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    return true;
  }
  currentUserValue: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>((localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = localStorage.getItem('currentUser')
  }

  register(registerData: User) {
    return this.http.post<any>(`${environment.register}`, registerData)
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  forgotPassword(forgotData: ForgotPassword) {
    return this.http.post<any>(`${environment.forgotPassword}`+forgotData.username+"/forgot", forgotData)
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  getAllUsersWithRegex(user: any): Observable<any> {
    return this.http.get<any>(`${environment.regex}${user}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.getAllUsers}`);
  }

}
