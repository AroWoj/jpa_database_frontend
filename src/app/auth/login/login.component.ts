import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = signal(true);
  @Output() submitEmitter = new EventEmitter();
  form: FormGroup;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit(userData: { email: string, password: string }) {
    console.log(userData)
    this.authService.login(userData).subscribe({
      next: (data) => {
        localStorage.setItem('loggedUser', userData.email);
        localStorage.setItem('token', data.access_token);
        if (userData.email) {
          this.authService.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        }

        console.log("po loginie ", data)
      },
      error: err => {
        this.errorMsg = "Wystąpił błąd, spróbuj ponownie.";
        console.log("Error", err.message)
      }
    });
  }

  cancel() {
    this.form.reset();
  }




}



