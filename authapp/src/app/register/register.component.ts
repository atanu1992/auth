import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData).
    subscribe(
      res => {
        if (res.message.affectedRows === 1) {
         this.router.navigate(['/home']);
        } else {
          alert(res.message.sqlMessage);
        }
      },
      err => { console.log(err); }
    );
  }

}
