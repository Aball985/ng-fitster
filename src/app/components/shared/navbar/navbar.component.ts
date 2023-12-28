import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapChevronDown } from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../../store/selectors/auth/auth.selector';
@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, AsyncPipe, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapChevronDown })],
})
export class NavbarComponent implements OnInit {
  currentUser$!: Observable<firebase.default.User | null>;

  isProfileOpen: boolean = false;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.getAuthState();
  }

  getAuthState(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logOut(): void {
    this.authService.signOut();
  }
}
