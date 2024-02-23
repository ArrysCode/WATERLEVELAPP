import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private alertController: AlertController) {}

  async loginUser() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        // Iniciar sesión exitosa, redirigir a tab2 u otra página
        this.router.navigateByUrl('/tabs/tab2');
      } else {
        // Iniciar sesión fallida, mostrar mensaje de error al usuario
        console.log('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async presentSignupAlert() {
    const alert = await this.alertController.create({
      header: 'Registro',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Registrarse',
          handler: async data => {
            try {
              const result = await this.authService.signup(data.email, data.password);
              if (result.success) {
                this.presentAlert('Éxito', result.message);
              } else {
                this.presentAlert('Error', result.message);
              }
            } catch (error: any) { // Especificamos el tipo de error como 'any'
              this.presentAlert('Error', 'Error al registrar: ' + error.message);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
