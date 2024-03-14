import { Component } from '@angular/core';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
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
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    PasswordModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    InputTextModule,
    DialogModule,
    MenuModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  task!: Task[];
  states!: SelectItem[];
  visible: boolean = false;

  items: MenuItem[] | undefined;

  tasksForm = this.fb.group({
    task: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private route: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private form: FormBuilder,
    private auth: AuthService
  ) {
    this.task = [];
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.closeSession();
            },
          },
        ],
      },
    ];
    this.states = [{ label: 'Finalizar', value: 'Completada' }];
  }

  addTodo(): void {
    if (this.tasksForm.valid) {
      const name = this.tasksForm.get('task')?.value;
      const description = this.tasksForm.get('description')?.value;
      this.task.push({
        id: this.task.length + 1,
        name: name!,
        description: description!,
        state: false,
      });
      this.closeDialog();
    }
  }
  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }
  closeSession() {
    this.auth
      .logout()
      .then(() => {
        this.route.navigate(['login']);
      })
      .catch((error) => console.log(error));
  }
  changeState(newState: string, taskId: number) {
    const taskIndex = this.task.find((task) => task.id === taskId);
    console.log(newState);
    console.log(taskId);
    if (taskIndex) {
      taskIndex.state = newState === 'Completada';
    }
  }
}
