import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  waterLevel: number = 0;

  constructor(public db: AngularFireDatabase) {
    this.getMeasures();
  }

  getMeasures() {
    const path = "test/float";
  
    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición: ", res);
        // Convertir la distancia a porcentaje
        this.waterLevel = this.calculateWaterLevel(res);
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
}
