import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  constructor(private router: Router){}



  onLogout() {
    this.router.navigate(['/budget-planner/login']);
}

  onHistory() {
    this.router.navigate(['/budget-planner/history']);
}
  onProfile() {
    this.router.navigate(['/budget-planner/profile']);
}
  onDash() {
    this.router.navigate(['/budget-planner/dashboard']);
}

  isSlideOut = true;

  toggleSlideOut(){
    this.isSlideOut = !this.isSlideOut;
  }

}
