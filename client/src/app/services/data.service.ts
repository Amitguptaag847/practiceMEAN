import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any;
  dataChange: Subject<any> = new Subject<any>();
  constructor() {
    this.dataChange.subscribe((value) => {
      this.data = value;
    });
  }
  setData(d: any) {
    this.dataChange.next(d);
  }
  getData() {
    return this.data;
  }
}
