import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
    
  url : string = '';
  loggedIn = false;

    constructor(private router: Router,
      public authService: AuthService) {
      this.getRoute();
    }
  
  ngOnInit(): void {
    
  }
  getRoute() {
    this.router.events.subscribe(data => {
    if(data instanceof NavigationEnd) {
      this.url = data.url;
      console.log("url", this.url)
      this.loggedIn = this.authService.isLoggedIn && this.url.includes('dashboard') && !this.url.includes('login')
    }
    });
  }
}
