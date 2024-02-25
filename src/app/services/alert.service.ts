// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private waterLevelAlert = new BehaviorSubject<boolean>(false);
  waterLevelAlert$ = this.waterLevelAlert.asObservable();

  constructor() {}

  setWaterLevelAlert(value: boolean) {
    this.waterLevelAlert.next(value);
  }
}
