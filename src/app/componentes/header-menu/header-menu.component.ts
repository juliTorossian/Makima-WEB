import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit{
    // items!: MegaMenuItem[];
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
                label: 'Eventos Usuario',
                icon: 'pi pi-fw pi-server',
                routerLink: ['/eventos/usuario'],
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
                routerLink: ['/clientes'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Productos',
                        routerLink: ['/productos'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Modulos',
                        routerLink: ['/modulos'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        label: 'Entornos',
                        routerLink: ['/entornos'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            },
            {
                label: 'Tipos Evento',
                icon: 'pi pi-fw pi-tags',
                items: [
                    {
                        label: 'Tipos Evento',
                        routerLink: ['/tiposEvento'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Tareas',
                        routerLink: ['/tareas'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            },
            {
                label: 'Usuario',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Usuarios',
                        routerLink: ['/usuario'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Roles',
                        routerLink: ['/roles'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            },
            // {
            //     label: 'Admin',
            //     icon: 'pi pi-fw pi-user',
            //     items: [
            //         [
            //             {
            //                 label: 'Producto',
            //                 items: [
            //                     {
            //                         label: 'productos'
            //                     },
            //                     {
            //                         label: 'modulos'
            //                     },
            //                     {
            //                         label: 'entornos'
            //                     }
            //                 ]
            //             }
            //         ],
            //         [
            //             {
            //                 label: 'Tipo Evento',
            //                 items: [
            //                     {
            //                         label: 'Tipos Evento'
            //                     },
            //                     {
            //                         label: 'Tareas'
            //                     }
            //                 ]
            //             }
            //         ],
            //         [
            //             {
            //                 label: 'Usuario',
            //                 items: [
            //                     {
            //                         label: 'Usuarios'
            //                     },
            //                     {
            //                         label: 'Roles'
            //                     }
            //                 ]
            //             }
            //         ],
            //     ]
            // },
        ];
    }
}
