import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  waterLevel: number = 0; // Variable para almacenar el nivel de agua del tanque 1
  waterLevel2: number = 0; // Variable para almacenar el nivel de agua del tanque 2
  waterLevel3: number = 0; // Variable para almacenar el nivel de agua del tanque 3

  constructor(private db: AngularFireDatabase) {
    // Obtener medidas del tanque 1
    this.getMeasures();
    // Obtener medidas del tanque 2
    this.getMeasures2();
    // Obtener medidas del tanque 3
    this.getMeasures3();
  }

  // Método para obtener medidas del tanque 1
  getMeasures() {
    const path = "test1/float";
    // Suscribirse a los cambios en la base de datos
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        // Calcular nivel de agua y almacenar en waterLevel
        this.waterLevel = Math.floor(this.calculateWaterLevel(res));
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  // Método para obtener medidas del tanque 2
  getMeasures2() {
    const path = "test2/float";
    // Suscribirse a los cambios en la base de datos
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        // Calcular nivel de agua y almacenar en waterLevel2
        this.waterLevel2 = Math.floor(this.calculateWaterLevel(res));
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  // Método para obtener medidas del tanque 3
  getMeasures3() {
    const path = "test3/float";
    // Suscribirse a los cambios en la base de datos
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        // Calcular nivel de agua y almacenar en waterLevel3
        this.waterLevel3 = Math.floor(this.calculateWaterLevel(res));
      } else {
        console.log("El valor es nulo.");
      }
    });
  }

  // Método para calcular el nivel de agua
  calculateWaterLevel(distance: number): number {
    // Suponiendo que 1.5m representa el tanque lleno
    const tankHeight = 150; // 1.5m en cm
    let percentage = ((tankHeight - distance) / tankHeight) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
  }
}
