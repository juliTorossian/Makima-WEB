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
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

