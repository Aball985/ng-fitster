import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { authActions } from '../../store/actions/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {
    this.fireAuth.user.subscribe((user: firebase.default.User | null) => {
      if (user) {
        const copyUser: firebase.default.User = JSON.parse(
          JSON.stringify(user)
        );
        this.store.dispatch(authActions.login({ User: copyUser }));
      }
    });
  }

  loginWithEmail(email: string, password: string): void {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate([''], { relativeTo: this.router.routerState.root });
    });
  }

  loginWithGoogle(): void {
    this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(() => {
      this.router.navigate([''], { relativeTo: this.router.routerState.root });
    });
  }

  signUp(email: string, password: string): void {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate([''], { relativeTo: this.router.routerState.root });
    });
  }

  signOut(): void {
    this.fireAuth.signOut().then(() => {
      this.store.dispatch(authActions.logout());
      this.router.navigate(['login'], {
        relativeTo: this.router.routerState.root,
      });
    });
  }
}
