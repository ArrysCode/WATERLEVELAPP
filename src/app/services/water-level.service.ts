import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
    const path = "test/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        this.waterLevel = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado:", this.waterLevel); // Agregar log para mostrar el nivel de agua actualizado
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  getMeasures2() {
    const path = "test2/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición tanque 2: ", res);
        this.waterLevel2 = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado para tanque 2:", this.waterLevel2);
      } else {
        console.log("El valor es nulo para el tanque 2.");
      }
    });
  }
  
  getMeasures3() {
    const path = "test3/float";
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición tanque 3: ", res);
        this.waterLevel3 = Math.floor(this.calculateWaterLevel(res));
        console.log("Nivel de agua actualizado para tanque 3:", this.waterLevel3);
      } else {
        console.log("El valor es nulo para el tanque 3.");
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

  updateWaterLevel(level: number) {
    this.waterLevel = level;
    console.log("Nivel de agua actualizado (desde servicio):", this.waterLevel); // Agregar log para mostrar el nivel de agua actualizado desde el servicio
  }
}
