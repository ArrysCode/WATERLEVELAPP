import { Component } from '@angular/core';
import { WaterLevelService } from './services/water-level.service';
import { AlertService } from './services/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private waterLevelService: WaterLevelService, private alertService: AlertService) {}
  ngOnInit() {
    // Inicialización del servicio WaterLevel
    this.waterLevelService.getMeasures();
    
  }
}
