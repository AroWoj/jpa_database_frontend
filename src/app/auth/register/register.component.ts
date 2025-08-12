import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMsg = '';

  form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  submit(userData: {
    name: string,
    email: string,
    password: string
  }) {
   

    this.authService.register(userData).subscribe({next: (data)=> {
       console.log("register userData: ", data)
      this.router.navigate(['/activate-account']); 
    },
     error: (err) => this.errorMsg = 'Wystąpił błąd'
    })
   
  }
  cancel() {
  this.form.reset();
}
}
