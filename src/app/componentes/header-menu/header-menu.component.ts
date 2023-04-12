import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit{
    private usuarioService = inject(UsuarioService);
    private router = inject(Router);

    usuario!: Usuario;

    // items!: MegaMenuItem[];
    items!: MenuItem[];
    itemsUsuario!: MenuItem[];

    ngOnInit() {

        this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
            next: (res:any) => {
                this.usuario = res;
                this.cargarItems();
            },
            error: (err) => {
                console.log(err);
            }
        });

        
    }

    cerrarSesion(){
        this.usuarioService.logout();
        this.router.navigate(['/login']);
    }

    cargarItems(){
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
                routerLink: ['/evento/usuario'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Horas Usuario',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['/hora/usuario'],
                routerLinkActiveOptions: 'active'
            }
        ];
        let itemsAdmin = [
            {
                label: 'Eventos',
                icon: 'pi pi-fw pi-server',
                routerLink: ['/evento/eventos'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Clientes',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/clientes'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Horas',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['/hora/horas'],
                routerLinkActiveOptions: 'active'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Productos',
                        routerLink: ['/producto/productos'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Modulos',
                        routerLink: ['/producto/modulos'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        label: 'Entornos',
                        routerLink: ['/producto/entornos'],
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
                        routerLink: ['/tipoevento/tiposevento'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Tareas',
                        routerLink: ['/tipoevento/tareas'],
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
                        routerLink: ['/usuario/usuarios'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Roles',
                        routerLink: ['/usuario/roles'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            },
        ];

        if(this.usuario.rol.id==='ADMIN'){
            this.items = this.items.concat(itemsAdmin);
        }

        this.itemsUsuario = [
            {
                label: `${this.usuario.nombre} ${this.usuario.apellido}`,
                disabled: true,
                styleClass: "itemDscUsuario"
            },
            {
                label: `${this.usuario.rol.descipcion}`,
                disabled: true,
                styleClass: "itemDscUsuario"
            },
            {
                separator: true,
            },
            {
                label: 'Mi Perfil',
                icon: 'pi pi-fw pi-user',
                routerLink: [`/usuario/${this.usuario.id}`],
                routerLinkActiveOptions: 'active'
            },
            {
                separator: true,
            },
            {
                label: 'Solicitar Licencia',
                icon: 'pi pi-fw pi-pencil',
                url: 'https://docs.google.com/a/gaci.com.ar/forms/d/e/1FAIpQLSdbSw6Cs9pj3WF1g5ly8xwnM01Ag3_PaWrpMqFUwCMyHh0wMQ/viewform',
                target: '_blank'
            },
            {
                separator: true,
            },
            {
                label: 'Cerrar Sesion',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.cerrarSesion()
            }
        ]
    }
}
