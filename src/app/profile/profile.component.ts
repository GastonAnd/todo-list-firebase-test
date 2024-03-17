import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { Users } from '../../interfaces/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    ToastModule,
    ButtonModule,
    MenuModule,
    DropdownModule,
    TabMenuModule,
    BadgeModule,
    CardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: Users;
  items: MenuItem[] | undefined;
  username: string;
  itemsMenu: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(
    private auth: AuthService,
    private utilsServices: UtilsService,
    private route: Router
  ) {
    this.username = '';
    this.user = {} as Users;
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => {
              this.homeSession();
            },
          },
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
    this.itemsMenu = [
      { label: 'Ajustes', icon: 'pi pi-cog' },
      { label: 'Tareas', icon: 'pi pi-envelope' },
    ];

    this.activeItem = this.items[0];
    this.getName();
    this.getUser();
  }

  closeSession() {
    this.auth
      .logout()
      .then(() => {
        this.route.navigate(['login']);
      })
      .catch((error) => console.log(error));
  }
  homeSession() {
    this.route.navigate(['home']);
  }
  async getName() {
    try {
      const uid = this.auth.getUid('uid');
      console.log(uid);
      const name = await this.utilsServices.getUserName(uid!);
      this.username = name;
    } catch (error) {
      console.log(error);
    }
  }
  async getUser() {
    try {
      const uid = this.auth.getUid('uid');
      const user = await this.utilsServices.getUser(uid!);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  }
}
