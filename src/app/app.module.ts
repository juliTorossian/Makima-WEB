import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr);

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
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TimelineModule } from 'primeng/timeline';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { EventosComponent } from './pages/eventos/eventos/eventos.component';
import { HeaderMenuComponent } from './componentes/header-menu/header-menu.component';
import { BotonBackComponent } from './componentes/boton-back/boton-back.component';
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
import { ProductosComponent } from './pages/producto/productos/productos.component';
import { ProductoCrudComponent } from './pages/producto/producto-crud/producto-crud.component';
import { ProductoSeleccionComponent } from './pages/producto/producto-seleccion/producto-seleccion.component';
import { EventoComponent } from './pages/eventos/evento/evento.component';
import { ModalSeleccionUsuarioComponent } from './componentes/modal-seleccion-usuario/modal-seleccion-usuario.component';
import { ModalEstimacionComponent } from './pages/eventos/componentes/modal-estimacion/modal-estimacion.component';
import { ComentarioComponent } from './componentes/comentario/comentario.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoTiposComponent } from './pages/dashboard/componentes/grafico-tipos/grafico-tipos.component';
import { HorasComponent } from './pages/hora/horas/horas.component';
import { HorasUsuarioComponent } from './pages/hora/horas-usuario/horas-usuario.component';
import { HoraCrudComponent } from './pages/hora/hora-crud/hora-crud.component';
import { TotalComoNumeroPipe } from './pipes/total-como-numero.pipe';
import { VidaEventoComponent } from './pages/eventos/componentes/vida-evento/vida-evento.component';
import { NovedadesComponent } from './pages/dashboard/componentes/novedades/novedades.component';
import { SeleccionarEventoComponent } from './pages/hora/componentes/seleccionar-evento/seleccionar-evento.component';
import { ActivadoPipe } from './pipes/activado.pipe';
import { UsuarioComponent } from './pages/usuario/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    BotonBackComponent,
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
    UsuarioCrudComponent,
    ProductosComponent,
    ProductoCrudComponent,
    ProductoSeleccionComponent,
    EventoComponent,
    ModalSeleccionUsuarioComponent,
    ModalEstimacionComponent,
    BotonBackComponent,
    ComentarioComponent,
    GraficoTiposComponent,
    HorasComponent,
    HorasUsuarioComponent,
    HoraCrudComponent,
    TotalComoNumeroPipe,
    VidaEventoComponent,
    NovedadesComponent,
    SeleccionarEventoComponent,
    ActivadoPipe,
    UsuarioComponent,
  ],
  imports: [
    CKEditorModule,
    NgApexchartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    MenuModule,
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
    BreadcrumbModule,
    TooltipModule,
    ProgressBarModule,
    EditorModule,
    InputNumberModule,
    FileUploadModule,
    BlockUIModule,
    PanelModule,
    CalendarModule,
    InputMaskModule,
    TimelineModule,
    MultiSelectModule,
    ChipModule,
    InputTextareaModule,
    TabViewModule,
  ],
  providers: [
    CookieService,
    HttpClient,
    UsuarioService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'es-Ar' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
