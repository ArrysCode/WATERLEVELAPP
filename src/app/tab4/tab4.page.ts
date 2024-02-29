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
  waterLevel2: number = 0;
  waterLevel3: number = 0;

  constructor(
  
    private db: AngularFireDatabase) {
      this.getMeasures();
      this.getMeasures2();
      this.getMeasures3();
    }

  getMeasures() {
    const path = "test/float";

    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición alerta tab4: ", res);
        this.waterLevel = Math.floor(this.calculateWaterLevel(res));
        
      } else {
        console.log("El valor es nulo.");
      }
    });
    
  }

  getMeasures2() {
    const path = "test2/float";

    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición alerta tab4: ", res);
        this.waterLevel2 = Math.floor(this.calculateWaterLevel(res));
       
      } else {
        console.log("El valor es nulo.");
      }
    });
    
  }

  getMeasures3() {
    const path = "test3/float";

    this.db.object<number | null>(path).valueChanges().subscribe((res: number | null) => {
      if (res !== null) {
        console.log("Medición alerta tab4: ", res);
        this.waterLevel3 = Math.floor(this.calculateWaterLevel(res));
        
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
