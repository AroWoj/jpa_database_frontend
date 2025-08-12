import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}