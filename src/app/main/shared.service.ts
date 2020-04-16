import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private coi = new BehaviorSubject('nfl');
  sharedCoi = this.coi.asObservable();
  

  constructor() { console.log('in SharedService, sharedCoi is ', this.sharedCoi); }

  nextCoi(coi: string) {
    this.coi.next(coi)
  }
  
}