import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { WaterLevelService } from '../services/water-level.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  waterLevel: number = 0;

  constructor(
    //private waterLevelService: WaterLevelService,
    private db: AngularFireDatabase) {
      this.getMeasures();
    }

  /*ngOnInit() {
    console.log('Tab4Page initialized');
    this.waterLevel = this.waterLevelService.waterLevel;
    console.log("Nivel de agua en Tab4Page:", this.waterLevel); // Agregar log para mostrar el nivel de agua en Tab4Page
    // Puedes agregar aquí la lógica para mostrar la tarjeta de alerta si el nivel supera el 90%
    if (this.waterLevel >= 90) {
      console.log("El nivel de agua en el tanque ha alcanzado el 90%. Se recomienda acudir a la planta de tratamiento de aguas pluviales.");
      // Lógica para mostrar la tarjeta de alerta automáticamente
    }
  }*/


  getMeasures() {
    const path = "test/float";

    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición alerta tab4: ", res);
        this.waterLevel = Math.floor(this.calculateWaterLevel(res));
        //this.waterLevelService.updateWaterLevel(this.waterLevel); // Actualizar el nivel de agua en el servicio
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
