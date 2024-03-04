import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // BehaviorSubject para controlar las alertas de nivel de agua
  private waterLevelAlert = new BehaviorSubject<boolean>(false);
  // Observable para suscribirse a las alertas de nivel de agua
  waterLevelAlert$ = this.waterLevelAlert.asObservable();

  constructor() {}

  // Método para establecer la alerta de nivel de agua
  setWaterLevelAlert(value: boolean) {
    this.waterLevelAlert.next(value);
  }
}
