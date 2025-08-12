import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() submitEmitter = new EventEmitter();
  form: FormGroup;
  errorMsg : string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }


submit(userData:{email:string, password:string}) {
console.log(userData) 
this.authService.login(userData).subscribe({ next:(data) => {
  localStorage.setItem('loggedUser', userData.email);
  localStorage.setItem('token', data.access_token);
  this.router.navigate(['dashboard']);
  
  console.log("po loginie ",data)
  this.authService.loggedIn = true;
},
error: err => {this.errorMsg = err.message; console.log("Error", err.message)}
});
}

cancel() {
  this.form.reset();
}




}



