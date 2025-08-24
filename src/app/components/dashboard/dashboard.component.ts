import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../interface/userDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterLink, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  title = 'Database';
  users: Array<UserDTO> = [];
  filteredUsers: Array<UserDTO> = [];
  errorMsg: string = '';
  loggedUser: string = '';
  searchTerm: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'age','addresses'];
  dataSource = new MatTableDataSource<UserDTO>();


  constructor(private service: UserService,
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('loggedUser') as string;

    this.service.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.dataSource.data = users;
        console.log("Dashboard ", users);
      },
      error: (err) => {
        this.errorMsg = 'Wystąpił błąd, spróbuj ponownie później';

      }
    })


  }

  search():void {
    const term = this.searchTerm.trim().toLowerCase();
  if (!term) {
    this.filteredUsers = this.users;
    this.dataSource.data = this.users;
    return;
  }
  this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
  this.dataSource.data = this.filteredUsers;
  }
}


