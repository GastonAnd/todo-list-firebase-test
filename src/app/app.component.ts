import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    CardModule,
    ToolbarModule,
    ConfirmDialogModule,
    AvatarModule,
    AvatarGroupModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-list';
}
