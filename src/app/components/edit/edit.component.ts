import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../interface/userDTO';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  id: number = 0;
  userDTO!: UserDTO;
  form!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) { this.authService.isLoggedIn = true; }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.userDTO = user;
        this.form = this.fb.group({
          name: [user.name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          age: [user.age, [Validators.required, Validators.min(0)]],
          password: ['', [Validators.required, Validators.minLength(8)]], // hasło puste do edycji
          addresses: this.fb.array(
            user.addresses?.map(addr =>
              this.fb.group({
                street: [addr.street, Validators.required],
                city: [addr.city, Validators.required],
                zipcode: [addr.zipcode, [Validators.required, Validators.pattern('^\\d{2}-\\d{3}$')]]
              })
            ) || []
          )
        });



        console.log("Edit user ", user);
      },
      error: (err) => {
        console.error('Error fetching user', err);
      }
    });
  }
  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^\\d{2}-\\d{3}$')]]
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      const updatedUser = { ...this.userDTO, ...this.form.value };
      this.userService.updateUser(this.id, updatedUser).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => console.error('Update failed', err)
      });
    }
  }


}
