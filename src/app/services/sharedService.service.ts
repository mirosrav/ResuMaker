import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  formData:any[]=[];

  logFormData() {
    console.log("Current formData in service:", this.formData);
  }
  
}
