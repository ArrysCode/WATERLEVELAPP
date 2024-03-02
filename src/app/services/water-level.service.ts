import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {
  waterLevel: number = 0;
  waterLevel2: number = 0;
  waterLevel3: number = 0;

  constructor(private db: AngularFireDatabase) {
    console.log('WaterLevelService initialized');
    this.getMeasures();
    this.getMeasures2();
    this.getMeasures3();
  }

  getMeasures() {
    const path = "test1/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        this.waterLevel = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado:", this.waterLevel);
        this.checkAndSendNotification(this.waterLevel);
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
        this.checkAndSendNotification(this.waterLevel2);
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
        this.checkAndSendNotification(this.waterLevel3);
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  private calculateWaterLevel(distance: number): number {
    // Suponiendo que 1.5m representa el tanque lleno
    const tankHeight = 150; // 1.5m en cm
    let percentage = ((tankHeight - distance) / tankHeight) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
  }

  private async checkAndSendNotification(waterLevel: number) {
    if (waterLevel >= 80 && waterLevel < 90) {
      await this.sendNotification('Nivel de agua alto', 'El nivel de agua está por encima del 80%.');
    } else if (waterLevel >= 90) {
      await this.sendNotification('¡Nivel de agua crítico!', 'El nivel de agua ha superado el 90%.');
    }
  }

  private async sendNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 10) }, // Programa la notificación para 10 segundos después
          sound: 'beep.wav',
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#488AFF',
        }
      ]
    });
  }
}
