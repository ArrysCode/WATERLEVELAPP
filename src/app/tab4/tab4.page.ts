// tab4.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertService } from '../services/alert.service';
import { WaterLevelService } from '../services/water-level.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  waterLevel: number = 0;
  waterLevelAlert: boolean = false;
  constructor(private waterLevelService: WaterLevelService, private route: ActivatedRoute, private alertService: AlertService) {
    
  }

  ngOnInit() {
    this.alertService.waterLevelAlert$.subscribe(alert => {
      this.waterLevelAlert = alert;
      if (alert) {
        console.log("El nivel de agua en el tanque ha alcanzado el 90%. Se recomienda acudir a la planta de tratamiento de aguas pluviales.");
      }
    });
  }

}
