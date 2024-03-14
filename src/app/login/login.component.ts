import { Component } from '@angular/core';
import { CellEditor, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { Users } from '../../interfaces/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    PasswordModule,
    MenuModule,
    CardModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private messageService: MessageService
  ) {}
  login() {
    if (this.loginForm.valid) {
      this.auth
        .login(this.loginForm.value as Users)
        .then((response) => {
          const tokenId = response.user.getIdToken();
          this.route.navigate(['home']);
        })
        .catch((error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Rechazado',
            detail: 'El usuario o la contraseña ingresada es incorrecta',
            life: 2000,
          });
        });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Rechazado',
        detail: 'Complete con su usuario y contraseña',
        life: 2000,
      });
    }
  }
  register() {}
}
