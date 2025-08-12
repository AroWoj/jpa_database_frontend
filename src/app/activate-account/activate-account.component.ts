import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-activate-account',
  imports: [CommonModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {

  
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  
redirectToLogin() {
  this.router.navigate(['login'])
}

  
  onCodeComplete(token: string) {
    this.confirmAccount(token);
  }
  private confirmAccount(token: string) {
    this.authService.confirm(
      token
    ).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login'
        this.submitted = true
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }

}
