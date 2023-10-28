import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { interval, tap } from 'rxjs';
import { PermisoClave, PermisoRol, Rol, Usuario } from 'src/app/interfaces/usuario';
import { ColorSchemeService } from 'src/app/servicios/color-scheme.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

enum ThemeIcon {
    LIGHT = 'pi-sun',
    DARK  = 'pi-moon'
}

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
    private colorSchemeService = inject(ColorSchemeService)

    INTERVALO: number = 30000;

    usuario!: Usuario;
    permisos!: PermisoRol[];

    // items!: MegaMenuItem[];
    items!: MenuItem[];
    itemsUsuario!: MenuItem[];

    themeIcon!: string;

    ngOnInit() {

        if (this.colorSchemeService.currentActive() === 'dark') {
            this.themeIcon = ThemeIcon.DARK
        }else{
            this.themeIcon = ThemeIcon.LIGHT
        }

        this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
            next: (res:any) => {
                this.usuario = res;
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                if (this.usuario){
                    this.permisos = this.usuarioService.normalizarPermisos(this.usuario);
                    // console.log(this.permisos);
                    this.cargarItems();
                }
                this.checkSesion();
            }
        });
    }

    changeTheme() {
        console.log(this.colorSchemeService.currentActive());
        if (this.colorSchemeService.currentActive() === 'dark') {
            // this.colorSchemeService.update('light')
            this.themeIcon = ThemeIcon.DARK
            this.colorSchemeService.switchTheme('lightTheme')
        }else{
            // this.colorSchemeService.update('dark')
            this.themeIcon = ThemeIcon.LIGHT
            this.colorSchemeService.switchTheme('darkTheme')
        }
        console.log(this.colorSchemeService.currentActive());
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
        ];

        if (this.tienePermiso(PermisoClave.EVENTO)){
            this.items.push({
                label: 'Eventos',
                icon: 'pi pi-fw pi-server',
                routerLink: ['/evento/eventos'],
                routerLinkActiveOptions: 'active'
            });
        }

        if (this.tienePermiso(PermisoClave.CLIENTE)){
            this.items.push({
                label: 'Clientes',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/clientes'],
                routerLinkActiveOptions: 'active'
            });
        }
        if (this.tienePermiso(PermisoClave.HORAS_GENERALES)){
            this.items.push({
                label: 'Horas',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['/hora/horas'],
                routerLinkActiveOptions: 'active'
            });
        }
        if (this.tienePermiso(PermisoClave.PRODUCTO) || this.tienePermiso(PermisoClave.MODULO) || this.tienePermiso(PermisoClave.ENTORNO)){

            let itemProducto: MenuItem = {
                label: 'Productos',
                icon: 'pi pi-fw pi-book',
                items: []
            }

            if (this.tienePermiso(PermisoClave.MODULO)){
                itemProducto.items!.push({
                    label: 'Modulos',
                    routerLink: ['/producto/modulos'],
                    routerLinkActiveOptions: 'active'
                });
            }

            if (this.tienePermiso(PermisoClave.ENTORNO)){
                itemProducto.items!.push({
                    label: 'Entornos',
                    routerLink: ['/producto/entornos'],
                    routerLinkActiveOptions: 'active'
                });
            }

            if (this.tienePermiso(PermisoClave.PRODUCTO)){
                itemProducto.items!.push({
                    separator: true,
                })
                itemProducto.items!.push({
                    label: 'Productos',
                    routerLink: ['/producto/productos'],
                    routerLinkActiveOptions: 'active'
                });
            }
            this.items.push(itemProducto);
        }
        if (this.tienePermiso(PermisoClave.TAREA) || this.tienePermiso(PermisoClave.TIPO_EVENTO)){

            let itemTipoEvento: MenuItem = {
                label: 'Tipos Evento',
                icon: 'pi pi-fw pi-tags',
                items: []
            }

            if (this.tienePermiso(PermisoClave.TAREA)){
                itemTipoEvento.items!.push({
                    label: 'Tareas',
                    routerLink: ['/tipoevento/tareas'],
                    routerLinkActiveOptions: 'active'
                });
            }

            if (this.tienePermiso(PermisoClave.TIPO_EVENTO)){
                itemTipoEvento.items!.push({
                    separator: true,
                })
                itemTipoEvento.items!.push({
                    label: 'Tipos Evento',
                    routerLink: ['/tipoevento/tiposevento'],
                    routerLinkActiveOptions: 'active'
                });
            }
            this.items.push(itemTipoEvento);
        }
        if (this.tienePermiso(PermisoClave.USUARIO) || this.tienePermiso(PermisoClave.ROL)){

            let itemUsuario: MenuItem = {
                label: 'Usuario',
                icon: 'pi pi-fw pi-user',
                items: []
            }

            if (this.tienePermiso(PermisoClave.ROL)){
                itemUsuario.items!.push({
                    label: 'Roles',
                    routerLink: ['/usuario/roles'],
                    routerLinkActiveOptions: 'active'
                });
            }

            if (this.tienePermiso(PermisoClave.USUARIO)){
                itemUsuario.items!.push({
                    separator: true,
                })
                itemUsuario.items!.push({
                    label: 'Usuarios',
                    routerLink: ['/usuario/usuarios'],
                    routerLinkActiveOptions: 'active'
                });
            }
            this.items.push(itemUsuario);
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

    tienePermiso(clave:string):boolean{
        let aux = this.permisos.find( (p) => p.clave === clave);
        let tiene = (aux) ? aux!.nivel >= 1 : false;
        let admin = this.permisos.some( (p) => p.clave === PermisoClave.ADMIN);
        return (tiene || admin);
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
