import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headerFormData = signal(this.loadFromLocalStorage('personal'));
  summaryFormData = signal(this.loadFromLocalStorage('summary'));
  currentStep = signal(0);

  constructor(){
  }

  // formData:any[]=[];

  // logFormData() {
  //   console.log("Current formData in service:", this.formData);
  // }
  

  // setFormdata(data:any){
      // this.formData = data;
    //   if (this.isBrowser){
    //     localStorage.setItem('dataform', JSON.stringify(data));
    // }
    // this.formData.set(data);
    // console.log(this.formData());
  // }

  getFormData(){
    // console.log(this.formData);
    // return this.formData;
    return localStorage.getItem('headerFormData');
  }

  updateHeaderForm(newData:any){
    this.headerFormData.set(newData);
    localStorage.setItem('headerFormData', JSON.stringify(newData));//convert data from object to string
  }

  updateSummaryForm(newData:any){
    this.summaryFormData.set(newData);
    localStorage.setItem('summaryFormData', JSON.stringify(newData));//convert data from object to string
  }

  private loadFromLocalStorage(key:string){
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : null;//convert data from string to json object
  }

  nextStep(){
    this.currentStep.update(step => step + 1 )
  }

  prevStep(){
    this.currentStep.update(step => step - 1 )
  }


  downloadPdf(){
    
  }
}
