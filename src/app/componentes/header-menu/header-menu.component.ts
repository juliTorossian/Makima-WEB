import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { interval, tap } from 'rxjs';
import { Rol, Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit{
    private usuarioService = inject(UsuarioService);
    private router = inject(Router);
    // private intervalSubscription = inject(Subscription);
    private cookies = inject(CookieService);

    INTERVALO: number = 30000;

    usuario!: Usuario;
    permisos!: Rol;

    // items!: MegaMenuItem[];
    items!: MenuItem[];
    itemsUsuario!: MenuItem[];

    ngOnInit() {

        this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
            next: (res:any) => {
                this.usuario = res;
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                if (this.usuario){
                    this.permisos = this.usuarioService.getPermisos(this.usuario);
                    this.cargarItems();
                }
                this.checkSesion();
            }
        });
    }

    checkSesion(){
        interval(this.INTERVALO).subscribe({
            next: () => {
                const tokenExpiration = this.cookies.get("userToken");
                if (!tokenExpiration) {
                    this.cerrarSesion();
                }
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
            },
            {
                label: 'Eventos',
                icon: 'pi pi-fw pi-server',
                routerLink: ['/evento/eventos'],
                routerLinkActiveOptions: 'active'
            },
        ];

        if (this.permisos.controlCliente){
            this.items.push({
                label: 'Clientes',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/clientes'],
                routerLinkActiveOptions: 'active'
            });
        }
        if (this.permisos.controlHora){
            this.items.push({
                label: 'Horas',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['/hora/horas'],
                routerLinkActiveOptions: 'active'
            });
        }
        if (this.permisos.controlProducto){
            this.items.push({
                label: 'Productos',
                icon: 'pi pi-fw pi-book',
                items: [
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
                    {
                        separator: true,
                    },
                    {
                        label: 'Productos',
                        routerLink: ['/producto/productos'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            });
        }
        if (this.permisos.controlTipo){
            this.items.push({
                label: 'Tipos Evento',
                icon: 'pi pi-fw pi-tags',
                items: [
                    {
                        label: 'Tareas',
                        routerLink: ['/tipoevento/tareas'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Tipos Evento',
                        routerLink: ['/tipoevento/tiposevento'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            });
        }
        if (this.permisos.controlUsuario){
            this.items.push({
                label: 'Usuario',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Roles',
                        routerLink: ['/usuario/roles'],
                        routerLinkActiveOptions: 'active'
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Usuarios',
                        routerLink: ['/usuario/usuarios'],
                        routerLinkActiveOptions: 'active'
                    },
                ],
            });
        }

        // let itemsAdmin = [
        //     {
        //         label: 'Clientes',
        //         icon: 'pi pi-fw pi-id-card',
        //         routerLink: ['/clientes'],
        //         routerLinkActiveOptions: 'active'
        //     },
        //     {
        //         label: 'Horas',
        //         icon: 'pi pi-fw pi-clock',
        //         routerLink: ['/hora/horas'],
        //         routerLinkActiveOptions: 'active'
        //     },
        //     {
        //         label: 'Productos',
        //         icon: 'pi pi-fw pi-book',
        //         items: [
        //             {
        //                 label: 'Productos',
        //                 routerLink: ['/producto/productos'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //             {
        //                 separator: true,
        //             },
        //             {
        //                 label: 'Modulos',
        //                 routerLink: ['/producto/modulos'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //             {
        //                 label: 'Entornos',
        //                 routerLink: ['/producto/entornos'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //         ],
        //     },
        //     {
        //         label: 'Tipos Evento',
        //         icon: 'pi pi-fw pi-tags',
        //         items: [
        //             {
        //                 label: 'Tipos Evento',
        //                 routerLink: ['/tipoevento/tiposevento'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //             {
        //                 separator: true,
        //             },
        //             {
        //                 label: 'Tareas',
        //                 routerLink: ['/tipoevento/tareas'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //         ],
        //     },
        //     {
        //         label: 'Usuario',
        //         icon: 'pi pi-fw pi-user',
        //         items: [
        //             {
        //                 label: 'Usuarios',
        //                 routerLink: ['/usuario/usuarios'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //             {
        //                 separator: true,
        //             },
        //             {
        //                 label: 'Roles',
        //                 routerLink: ['/usuario/roles'],
        //                 routerLinkActiveOptions: 'active'
        //             },
        //         ],
        //     },
        // ];

        // if(this.usuarioTieneRol(this.usuario, "ADMIN")){
        //     this.items = this.items.concat(itemsAdmin);
        // }

        this.itemsUsuario = [
            {
                label: `${this.usuario.nombre} ${this.usuario.apellido}`,
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

    usuarioTieneRol(usuario:Usuario, rol:string) : boolean {
        let tiene = false;
        usuario.rol.map( (r:Rol) => {
            if (r.id === rol){
                tiene = true;
            }
        })
        return tiene;
    }

    // getPermisos(){
    //     let permisos : Rol = {
    //         id : "temp",
    //         descipcion: "temp",
    //         controlTotal: false,
    //         controlEvento: false,
    //         controlCliente: false,
    //         controlProducto: false,
    //         controlTipo: false,
    //         controlHora: false,
    //         controlUsuario: false
    //     }

    //     this.usuario.rol.map( (r:Rol) => {
    //         permisos.controlTotal = (!permisos.controlTotal && !r.controlTotal) ? false : true;
    //         permisos.controlEvento = (!permisos.controlEvento && !r.controlEvento) ? false : true;
    //         permisos.controlCliente = (!permisos.controlCliente && !r.controlCliente) ? false : true;
    //         permisos.controlProducto = (!permisos.controlProducto && !r.controlProducto) ? false : true;
    //         permisos.controlTipo = (!permisos.controlTipo && !r.controlTipo) ? false : true;
    //         permisos.controlHora = (!permisos.controlHora && !r.controlHora) ? false : true;
    //         permisos.controlUsuario = (!permisos.controlUsuario && !r.controlUsuario) ? false : true;
    //     })

    //     // console.log(permisos);
    //     return permisos;
    // }
}
