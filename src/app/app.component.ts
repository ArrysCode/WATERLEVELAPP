import { Component } from '@angular/core';
import { WaterLevelService } from './services/water-level.service';
import { AlertService } from './services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { IonicModule, Platform } from '@ionic/angular';
import { NotificationsService } from './services/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],

})
export class AppComponent {
  constructor(
    private waterLevelService: WaterLevelService, 
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private platform: Platform,
    private fcm: NotificationsService

    ) {
      this.platform.ready().then(() => {
        this.fcm.initPush();
      }).catch(e => {
        console.log('error fcm: ', e);
      });
    



    }


  ngOnInit() {
    // Inicialización del servicio WaterLevel
    this.waterLevelService.getMeasures();

    // Verifica si hay un usuario autenticado al iniciar la aplicación
    this.authService.getCurrentUser().then(user => {
      if (user) {
        // Si hay un usuario autenticado, redirige a la página deseada (por ejemplo, 'tabs/tab2')
        this.router.navigate(['/tabs/tab2']);
      } else {
        // Si no hay usuario autenticado, redirige a la página de inicio de sesión u otra página predeterminada
        this.router.navigate(['/tabs/tab1']);
      }
    }).catch(error => {
      console.error('Error al obtener el usuario actual:', error);
    });
    
  }
}