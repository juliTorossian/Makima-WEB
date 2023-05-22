import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/servicios/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorUsuario: boolean = false;
  errorPassword: boolean = false;

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  private authService = inject(UsuarioService);
  private messageService = inject(MessageService);
  private encryptService = inject(EncryptDecryptService);
  private router = inject(Router);

  login() {
    
    
    this.errorUsuario = this.loginForm.get("usuario")?.valid === false;
    this.errorPassword = this.loginForm.get("password")?.valid === false;

    if (this.errorUsuario === false && this.errorPassword === false){
      let usuario = {
        "usuario": this.loginForm.get("usuario")?.value,
        "password": this.encryptService.encryptUsingAES256(this.loginForm.get("password")?.value)
        // "password": this.loginForm.get("password")?.value
      }
      
      this.authService.login(usuario).subscribe({
        next: (res) => {
          this.authService.setToken(res.toString());
        },
        error: (err) => {
          this.errorLogin(err);
        },
        complete: () => {
          this.continuarLogin();
        }
      });
    }
  }

  errorLogin(error: any){
    this.loginForm.setValue({usuario: '', password: ''});
    if (error.status === 404){
      this.messageService.add({severity: 'error', summary: '', detail: 'Usuario y/o Contraseña invalidos'});
    }else{
      this.messageService.add({severity: 'error', summary: '', detail: 'Ocurrio un error inesperado'});
    }
  }

  continuarLogin(){
    // console.log("inicio de sesion satisfactorio");
    this.router.navigateByUrl("/dashboard");
  }

  // ejecutarAccion(e:any){
  //   console.log(e);
  //   if (e.keyCode === 13 && !e.shiftKey) {
  //     e.preventDefault();
  //     this.login();
  //   }
  // }
}
