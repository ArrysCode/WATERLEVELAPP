// water-level.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {
  waterLevel: number = 0;

  constructor() { }
}
