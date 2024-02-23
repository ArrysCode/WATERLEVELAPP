import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonTabs } from '@ionic/angular';
import { Usuario } from '../services/interfaces';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin: boolean = false; // Variable para controlar la visibilidad del Tab5


  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController
    
    ) {}

    ngOnInit() {
      // Verificar el rol del usuario al cargar la página
      this.authService.getCurrentUser2().pipe(
        switchMap(user => {
          if (user) {
            // Si el usuario está autenticado, verificar si tiene el rol de administrador
            return this.authService.getUserRoles(user.uid);
          } else {
            // Si el usuario no está autenticado, establecer isAdmin como false
            this.isAdmin = false;
            console.log('¿Es administrador?', 'No');
            return [];
          }
        })
      ).subscribe(roles => {
        this.isAdmin = roles.includes('admin');
        console.log('¿Es administrador?', this.isAdmin ? 'Sí' : 'No');
      });
    }

    async ionViewWillEnter() {
      // Obtener el usuario actual
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        // Obtener datos del usuario actual
        const userData = await this.authService.getUserData(currentUser.uid);
        if (userData) {
          // Verificar el rol del usuario y establecer la visibilidad del Tab5
          this.isAdmin = this.authService.hasRequiredRole(userData);
        }
      }
    }












    isLoginPage(): boolean {
      return this.router.url === '/tabs/tab1';
    }


    async logout() {
      const alert = await this.alertController.create({
        header: 'Cerrar sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Aceptar',
            handler: async () => {
              try {
                await this.authService.logout(); // Cerrar sesión
                this.router.navigateByUrl('/tabs/tab1'); // Redirigir al usuario a la página de inicio de sesión
              } catch (error) {
                console.error('Error al cerrar sesión:', error);
              }
            }
          }
        ]
      });
  
      await alert.present();
    }
}
