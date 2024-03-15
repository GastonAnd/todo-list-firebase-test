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
import { Users } from '../../interfaces/user';
import { TaskService } from '../task.service';
import { UtilsService } from '../utils.service';
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
  user = {} as Users;
  task: Task[] = [];
  states!: SelectItem[];
  visible: boolean = false;
  username: string;

  items: MenuItem[] | undefined;

  tasksForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    state: [false],
  });

  constructor(
    private route: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private form: FormBuilder,
    private auth: AuthService,
    private taskService: TaskService,
    private utilsService: UtilsService
  ) {
    this.getTasks();
    this.getName();
    this.username = '';
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
    this.states = [{ label: 'Finalizar', value: true }];
  }

  addTodo(): void {
    if (this.tasksForm.valid) {
      const uid = this.auth.getUid('uid');
      const path = `users/${uid}/tasks`;
      this.taskService
        .addTask(path, this.tasksForm.value)
        .then(async (res) => {
          this.closeDialog();
          this.messageService.add({
            severity: 'info',
            summary: 'Aceptado',
            detail: 'Tarea agregada correctamente',
            life: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'La tarea no fue agregada',
            life: 2000,
          });
        });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Complete los campos',
        life: 2000,
      });
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

  getTasks() {
    const uid = this.auth.getUid('uid');
    const path = `users/${uid}/tasks`;
    this.taskService.getTasks(path).subscribe((response: any) => {
      this.task = response;
      console.log(response);
    });
  }
  async getName() {
    try {
      const uid = this.auth.getUid('uid');
      const name = await this.utilsService.getUserName(uid!);
      this.username = name;
    } catch (error) {
      console.log(error);
    }
  }

  updateTask(task: Task, newState: boolean) {
    task.state = newState;
    console.log(task.state);
    const path = `users/${this.auth.getUid('uid')}/tasks/${task.id}`;
    this.taskService.updateTask(path, { state: newState }).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Estado de la tarea actualizado correctamente',
        life: 2000,
      });
    });
  }
}
