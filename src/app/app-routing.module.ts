import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLogeadoGuard } from './guards/usuario-logeado.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventoCRUDComponent } from './pages/eventos/evento-crud/evento-crud.component';
import { EventosUsuarioComponent } from './pages/eventos/eventos-usuario/eventos-usuario.component';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientesComponent } from './pages/cliente/clientes/clientes.component';
import { TareasComponent } from './pages/tarea/tareas/tareas.component';
import { TiposEventoComponent } from './pages/tipoEvento/tipos-evento/tipos-evento.component';
import { EntornosComponent } from './pages/entorno/entornos/entornos.component';
import { ModulosComponent } from './pages/modulo/modulos/modulos.component';
import { RolesComponent } from './pages/rol/roles/roles.component';
import { UsuariosComponent } from './pages/usuario/usuarios/usuarios.component';
import { ProductosComponent } from './pages/producto/productos/productos.component';
import { EventoComponent } from './pages/eventos/evento/evento.component';
import { HorasComponent } from './pages/hora/horas/horas.component';
import { HorasUsuarioComponent } from './pages/hora/horas-usuario/horas-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'evento', canActivate: [UsuarioLogeadoGuard], children:[
    { path: 'eventos', component: EventosComponent },
    { path: 'usuario', component: EventosUsuarioComponent },
    { path: 'nuevo', component: EventoCRUDComponent },
    { path: ':evento', component: EventoComponent}
  ]},
  { path: 'hora', canActivate: [UsuarioLogeadoGuard], children:[
    { path: 'horas', component: HorasComponent },
    { path: 'usuario', component: HorasUsuarioComponent },
  ]},
  { path: 'clientes', component: ClientesComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'tipoevento', canActivate: [UsuarioLogeadoGuard], children: [
    { path: 'tiposevento', component: TiposEventoComponent},
    { path: 'tareas', component: TareasComponent},
  ]},
  { path: 'producto', canActivate: [UsuarioLogeadoGuard], children: [
    { path: 'entornos', component: EntornosComponent},
    { path: 'modulos', component: ModulosComponent},
    { path: 'productos', component: ProductosComponent},
  ]},
  { path: 'usuario', canActivate: [UsuarioLogeadoGuard], children: [
    { path: 'roles', component: RolesComponent},
    { path: 'usuarios', component: UsuariosComponent},
  ]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

