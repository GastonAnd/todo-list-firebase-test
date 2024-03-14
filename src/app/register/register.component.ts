import { Component } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { CellEditor, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    MenuModule,
    DialogModule,
    CardModule,
    ConfirmDialogModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private auth: AuthService
  ) {}

  confirm1() {
    this.confirmationService.confirm({
      message: '¿Confirma sus datos?',
      header: 'Confirmado',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.auth
          .register(this.registerForm.value)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Usuario Creado',
        });
        setTimeout(() => {
          this.route.navigate(['login']);
        }, 2000);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: 'El usuario no ha sido creado',
          life: 3000,
        });
      },
    });
  }
}
