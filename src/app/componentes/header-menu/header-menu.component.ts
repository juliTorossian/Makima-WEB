import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent {
    items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-qrcode',
                routerLink: ['/dashboard'],
                routerLinkActiveOptions: 'active'
                
            },
            {
                label: 'Eventos',
                icon: 'pi pi-fw pi-server',
                routerLink: ['/eventos'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Clientes',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/home']
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Productos',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Modulos',
                    },
                    {
                        label: 'Entornos',
                    },
                ],
            },
            {
                label: 'Tipos Evento',
                icon: 'pi pi-fw pi-tags',
                items: [
                    {
                        label: 'Tipos Evento',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Tareas',
                    },
                ],
            },
            {
                label: 'Usuario',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Usuarios',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Roles',
                    },
                ],
            },
        ];
    }
}
