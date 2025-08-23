import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../interface/userDTO';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 title = 'Database';
  users: Array<UserDTO> = [];
  errorMsg: string = '';
  loggedUser: string ='';

   constructor(private service: UserService,
              private activeRoute: ActivatedRoute
   ) {}

   
   ngOnInit(): void {
   this.loggedUser = localStorage.getItem('loggedUser') as string; 
  
this.service.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log("Dashboard ", users);
      },
      error: (err) => {
        this.errorMsg = 'Wystąpił błąd'

        
      }
    })
   

  }
}


