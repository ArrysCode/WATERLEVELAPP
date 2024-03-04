import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  userData: any; // Variable para almacenar los datos del usuario

  constructor(
    private authService: AuthService
  ) {}

  // Método que se ejecuta cuando la vista está a punto de entrar
  async ionViewWillEnter() {
    // Obtener el usuario actual
    const user = await this.authService.getCurrentUser();
    if (user) {
      // Si hay un usuario, obtener su UID
      const uid = user.uid;
      // Obtener los datos del usuario desde Firestore
      this.userData = await this.authService.getUserData(uid);
      // Verificar si se encontraron los datos del usuario en Firestore
      if (!this.userData) {
        console.error('Los datos del usuario no se encontraron en Firestore.');
      }
    }
  }
}
