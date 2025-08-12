import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 title = 'Database';
  users: Array<User> = [];
  errorMsg: string = '';
  loggedUser: string ='';

   constructor(private service: UserServiceService,
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


