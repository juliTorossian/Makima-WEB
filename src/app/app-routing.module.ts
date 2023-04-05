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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'eventos', canActivate: [UsuarioLogeadoGuard], children:[
    { path: '', component: EventosComponent },
    { path: 'usuario', component: EventosUsuarioComponent },
    { path: 'nuevo', component: EventoCRUDComponent }
  ]},
  { path: 'clientes', component: ClientesComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'tiposEvento', component: TiposEventoComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'tareas', component: TareasComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'entornos', component: EntornosComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'modulos', component: ModulosComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'roles', component: RolesComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [UsuarioLogeadoGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

