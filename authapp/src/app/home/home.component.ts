import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: HomeService) { }
  details = [];
  ngOnInit() {
    this.fetchAllData();
  }

  fetchAllData() {
    this.auth.getAllData().
    subscribe(
      res => { this.details = res.message; },
      err => { console.log(err); }
    );
  }

}
