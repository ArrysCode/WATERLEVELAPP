import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {
  waterLevel1: number = 0;
  waterLevel2: number = 0;
  waterLevel3: number = 0;

  constructor(private db: AngularFireDatabase) {
    console.log('WaterLevelService initialized');
    this.getMeasures1();
    this.getMeasures2();
    this.getMeasures3();
  }

  getMeasures1() {
    
    const path = "test1/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        this.waterLevel1 = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado:", this.waterLevel1);
        
        this.checkAndSendNotification(this.waterLevel1, 1);
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  getMeasures2() {
    const path = "test2/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        this.waterLevel2 = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado:", this.waterLevel2);
        
        this.checkAndSendNotification(this.waterLevel2, 2);
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  getMeasures3() {
    const path = "test3/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        this.waterLevel3 = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado:", this.waterLevel3);
        
        this.checkAndSendNotification(this.waterLevel3, 3);
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  calculateWaterLevel(distance: number): number {
    // Suponiendo que 1.5m representa el tanque lleno
    const tankHeight = 150; // 1.5m en cm
    let percentage = ((tankHeight - distance) / tankHeight) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
  }

  private async checkAndSendNotification(waterLevel: number, TankId: number) {
    if (waterLevel >= 80 && waterLevel < 90) {
      await this.sendNotification(TankId, 'Nivel de agua alto en el tanque '+ TankId, 'El nivel de agua está por encima del 80%.');
    } else if (waterLevel >= 90) {
      await this.sendNotification(TankId, '¡Nivel de agua crítico! en el tanque '+ TankId, 'El nivel de agua ha superado el 90%.');
    }
  }

  sendNotification(id: number, title: string, body: string) {
    const options = {
      notifications: [{
        id: id,
        title: title,
        body: body,
        allowWhileIdle: true // Esta opción permite que la notificación se entregue incluso en el modo Doze
      }]
    };
  
    LocalNotifications.schedule(options).then(() => {
      console.log('Notificación enviada con éxito.');
    }).catch((error) => {
      console.error('Error al enviar la notificación:', error);
    });
  }
  
}
