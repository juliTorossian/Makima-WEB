import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppComponent } from './app.component';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { HeaderMenuComponent } from './componentes/header-menu/header-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioService } from './servicios/usuario.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { EventosUsuarioComponent } from './pages/eventos/eventos-usuario/eventos-usuario.component';
import { EventoCRUDComponent } from './pages/eventos/evento-crud/evento-crud.component';
import { ClientesComponent } from './pages/cliente/clientes/clientes.component';
import { ClienteCrudComponent } from './pages/cliente/cliente-crud/cliente-crud.component';
import { TareasComponent } from './pages/tarea/tareas/tareas.component';
import { TareaCrudComponent } from './pages/tarea/tarea-crud/tarea-crud.component';
import { TipoEventoCrudComponent } from './pages/tipoEvento/tipo-evento-crud/tipo-evento-crud.component';
import { TiposEventoComponent } from './pages/tipoEvento/tipos-evento/tipos-evento.component';
import { ActivoPipe } from './pipes/activo.pipe';
import { ClienteSeleccionComponent } from './pages/cliente/cliente-seleccion/cliente-seleccion.component';
import { EntornosComponent } from './pages/entorno/entornos/entornos.component';
import { EntornoCrudComponent } from './pages/entorno/entorno-crud/entorno-crud.component';
import { ModulosComponent } from './pages/modulo/modulos/modulos.component';
import { ModuloCrudComponent } from './pages/modulo/modulo-crud/modulo-crud.component';
import { RolCrudComponent } from './pages/rol/rol-crud/rol-crud.component';
import { RolesComponent } from './pages/rol/roles/roles.component';
import { UsuariosComponent } from './pages/usuario/usuarios/usuarios.component';
import { UsuarioCrudComponent } from './pages/usuario/usuario-crud/usuario-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    EventosComponent,
    DashboardComponent,
    LoginComponent,
    EventosUsuarioComponent,
    EventoCRUDComponent,
    ClientesComponent,
    ClienteCrudComponent,
    TareasComponent,
    TareaCrudComponent,
    TipoEventoCrudComponent,
    TiposEventoComponent,
    ActivoPipe,
    ClienteSeleccionComponent,
    EntornosComponent,
    EntornoCrudComponent,
    ModulosComponent,
    ModuloCrudComponent,
    RolCrudComponent,
    RolesComponent,
    UsuariosComponent,
    UsuarioCrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    MenubarModule,
    MegaMenuModule,
    TableModule,
    CardModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
    DynamicDialogModule,
    DividerModule,
    AutoCompleteModule,
    DropdownModule,
    TagModule,
    DialogModule,
    ColorPickerModule,
    ToggleButtonModule,
  ],
  providers: [
    CookieService,
    HttpClient,
    UsuarioService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
