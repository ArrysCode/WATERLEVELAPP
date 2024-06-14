import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  waterLevel1: number = 0; // Nivel de agua del tanque 1
  waterLevel2: number = 0; // Nivel de agua del tanque 2
  waterLevel3: number = 0; // Nivel de agua del tanque 3

  constructor(private db: AngularFireDatabase) {
    // Obtener las medidas de los tres tanques al inicializar la página
    this.getMeasures1();
    this.getMeasures2();
    this.getMeasures3();
  }

  // Método para obtener las medidas del primer tanque
  getMeasures1() {
    const path = "test1/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        // Calcular y actualizar el nivel de agua del tanque 1
        this.waterLevel1 = Math.floor(this.calculateWaterLevel(res));
        // Verificar y enviar notificación si es necesario
        this.checkAndSendNotification(this.waterLevel1, 1);
      }
    });
  }

  // Método para obtener las medidas del segundo tanque (similar a getMeasures1)
  getMeasures2() {
    const path = "test2/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        this.waterLevel2 = Math.floor(this.calculateWaterLevel(res));
        this.checkAndSendNotification(this.waterLevel2, 2);
      }
    });
  }

  // Método para obtener las medidas del tercer tanque (similar a getMeasures1)
  getMeasures3() {
    const path = "test3/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        this.waterLevel3 = Math.floor(this.calculateWaterLevel(res));
        this.checkAndSendNotification(this.waterLevel3, 3);
      }
    });
  }

  // Método para calcular el nivel de agua basado en la distancia
  calculateWaterLevel(distance: number): number {
    const tankHeight = 150; // Altura del tanque en cm (suponiendo 1.5m)
    let percentage = ((tankHeight - distance) / tankHeight) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
  }

  // Método privado para verificar el nivel de agua y enviar notificaciones si es necesario
  private async checkAndSendNotification(waterLevel: number, TankId: number) {
    if (waterLevel >= 80 && waterLevel < 90) {
      await this.sendNotification(TankId, 'Nivel de agua alto en el tanque '+ TankId, 'El nivel de agua está por encima del 80%.');
    } else if (waterLevel >= 90) {
      await this.sendNotification(TankId, '¡Nivel de agua crítico! en el tanque '+ TankId, 'El nivel de agua ha superado el 90%.');
    }
  }

  // Método para enviar notificaciones locales
  sendNotification(id: number, title: string, body: string) {
    const options = {
      notifications: [{
        id: id,
        title: title,
        body: body,
        allowWhileIdle: true // Esta opción permite que la notificación se entregue incluso en el modo Doze
      }]
    };
  
    // Utilización de Capacitor para programar la notificación local
    LocalNotifications.schedule(options).then(() => {
      // Notificación enviada con éxito
    }).catch((error) => {
      // Error al enviar la notificación
    });
  }
}
