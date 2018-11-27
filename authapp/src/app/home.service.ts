import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private rootUrl = 'http://localhost:4000/api/';
  constructor(private http: HttpClient , private router: Router) { }

  getAllData() {
    return this.http.get<any>(this.rootUrl + 'viewAllData');
  }
}
