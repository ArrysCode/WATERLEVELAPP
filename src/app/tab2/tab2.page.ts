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

  async ionViewWillEnter() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const uid = user.uid;
      console.log('UID del usuario:', uid);
      this.userData = await this.authService.getUserData(uid);
      if (!this.userData) {
        console.error('Los datos del usuario no se encontraron en Firestore.');
      }
    }
  }
  
  
  

}
