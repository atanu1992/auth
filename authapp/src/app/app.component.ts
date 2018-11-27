import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().
    subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  title = 'authapp';
  logout() {
    this.authService.logoutUser();
  }
}
