import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService
    ) {

    }
  ngOnInit() {
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