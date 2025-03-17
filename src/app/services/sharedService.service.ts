import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  sharedData:any;
  constructor() { }

  setData(data:any){
    this.sharedData = data;
  }

  getData():any{
    return this.sharedData;
  }

}
