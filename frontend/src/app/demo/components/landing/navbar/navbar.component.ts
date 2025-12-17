import { Component, OnInit, HostListener } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/demo/models/user';
import { AuthService } from 'src/app/demo/services/auth.service';
import { UserService } from 'src/app/demo/services/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User;
  isSponsor = false;
  isMentor = false; 

  userId: string | null = null;
  isAdmin = false;
  isStudent = false;
  userMenuVisible = false; 
  

  constructor(
    public router: Router,
    public layoutService: LayoutService,
    private userService: UserService,
    private storageService: StorageService,
    private authService: AuthService,
    
      
  ) {}

  username = '';
  applicationsMenuVisible = false;


  ngOnInit(): void {
    this.userMenuVisible = false;
    this.applicationsMenuVisible = false;

  } 




  navigateToLanding() {
    this.router.navigate(['/landing']);
  }

    navigateToTeamSubmission(): void {
        this.router.navigate(['/team-submission']); 
    }
  closeUserMenu(): void {
    this.userMenuVisible = false;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const dropdown = document.querySelector('.user-dropdown');
    
    if (dropdown && !dropdown.contains(clickedElement)) {
      this.userMenuVisible = false;
    }
  }

toggleApplicationsMenu(event: Event) {
  event.stopPropagation();
  this.applicationsMenuVisible = !this.applicationsMenuVisible;
  
  // Close user menu if open
  if (this.applicationsMenuVisible && this.userMenuVisible) {
    this.userMenuVisible = false;
  }
}

toggleUserMenu(event: Event) {
  event.stopPropagation();
  this.userMenuVisible = !this.userMenuVisible;
  
  if (this.userMenuVisible && this.applicationsMenuVisible) {
    this.applicationsMenuVisible = false;
  }
}

@HostListener('document:click', ['$event'])
handleDocumentClick(event: MouseEvent) {
  const userMenuButton = document.querySelector('.badge-icon');
  const userDropdownMenu = document.querySelector('.user-dropdown-menu');
  const applicationsMenuButton = document.querySelector('.applications-toggle');
  const applicationsDropdown = document.querySelector('.applications-dropdown');
  
  if (userMenuButton && !userMenuButton.contains(event.target as Node) && 
      userDropdownMenu && !userDropdownMenu.contains(event.target as Node) &&
      this.userMenuVisible) {
    this.userMenuVisible = false;
  }
  
  if (applicationsMenuButton && !applicationsMenuButton.contains(event.target as Node) && 
      applicationsDropdown && !applicationsDropdown.contains(event.target as Node) &&
      this.applicationsMenuVisible) {
    this.applicationsMenuVisible = false;
  }
} 
}
