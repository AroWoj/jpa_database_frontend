import { Component } from '@angular/core';
import { AuthComponent } from '../../auth/auth/auth.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AuthComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
