import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class LoginComponent {
  emailTextInput: string = '';
  passwordTextInput: string = '';

  constructor(private authService: AuthService) {}
  // ngOnInit(): void {

  // }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logInWithEmailAndPassword(): void {
    if (this.emailTextInput && this.passwordTextInput) {
      this.authService.loginWithEmail(
        this.emailTextInput,
        this.passwordTextInput
      );
    }
  }

  createNewUser(): void {
    if (this.emailTextInput && this.passwordTextInput) {
      this.authService.signUp(this.emailTextInput, this.passwordTextInput);
    }
  }
}
