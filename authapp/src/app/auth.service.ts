import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token : string;
  isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  private rootUrl = 'http://localhost:4000/api/';
  constructor(private http: HttpClient , private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  loginUser(user) {
    this.http.post<any>(this.rootUrl + 'login', user).subscribe(response => {
      const token = response.message;
      this.token = token;
      if(token) {
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        this.router.navigate(['/home']);
      }
    });
    // return this.http.post<any>(this.rootUrl + 'login', user);
  }

  registerUser(user) {
    return this.http.post<any>(this.rootUrl + 'register', user);
  }

  logoutUser() {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListner.next(false);
      this.router.navigate(['/login']);
  }


}
