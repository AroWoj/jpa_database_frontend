import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDTO } from '../../interface/userDTO';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete',
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  id: number = 0;
  userDTO: UserDTO | undefined;
  errorMsg: string = '';


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.userDTO = user;
        console.log("Delete user ", user);
      },
      error: (err) => {
        console.error('Error fetching user', err);
      }
    });

  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
        console.log("User deleted", res);
      },
      error: (err) => {
        this.errorMsg = 'Wystąpił błąd podczas usuwania użytkownika, spróbuj ponownie.';
        console.error('Error deleting user', err);
      }
    });

  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
