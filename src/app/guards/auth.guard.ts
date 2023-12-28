import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class CustomFirebaseAuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth) {}
  canActivate() {
    if (!this.afAuth.currentUser) {
      return false;
    }
    return true;
  }
}
