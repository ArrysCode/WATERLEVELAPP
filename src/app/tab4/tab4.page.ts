import { Component, OnInit } from '@angular/core';
import { WaterLevelService } from '../services/water-level.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  waterLevel: number = 0;

  constructor(private waterLevelService: WaterLevelService) {}

  ngOnInit() {
    console.log('Tab4Page initialized');
    this.waterLevel = this.waterLevelService.waterLevel;
    console.log("Nivel de agua en Tab4Page:", this.waterLevel); // Agregar log para mostrar el nivel de agua en Tab4Page
    // Puedes agregar aquí la lógica para mostrar la tarjeta de alerta si el nivel supera el 90%
    if (this.waterLevel >= 90) {
      console.log("El nivel de agua en el tanque ha alcanzado el 90%. Se recomienda acudir a la planta de tratamiento de aguas pluviales.");
      // Lógica para mostrar la tarjeta de alerta automáticamente
    }
  }
}
