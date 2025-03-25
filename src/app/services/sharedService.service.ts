import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headerFormData = signal(this.loadFromLocalStorage('headerData'));
  summaryFormData = signal(this.loadFromLocalStorage('summaryData'));
  experienceFormData = signal(this.loadFromLocalStorage('expData'));

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

  updateHeaderPreview(newData:any){
    this.headerFormData.set(newData);
  }

  updateSummaryPreview(newData:any){
    this.summaryFormData.set(newData);
  }

  updateExpPreview(newData:any){
    this.experienceFormData.set(newData);
  }
    
  updateHeaderForm(newData:any){
    this.headerFormData.set(newData);
    if(!localStorage.getItem('headerData')){
      this.headerFormData.set(newData);
    }else{
      console.log('data already exists');
    }

    localStorage.setItem('headerData', JSON.stringify(newData));//convert data from object to string
  }

  updateSummaryForm(newData:any){
    this.summaryFormData.set(newData);
    localStorage.setItem('summaryData', JSON.stringify(newData));//convert data from object to string
  }

  updateExpForm(newData:any){
    this.experienceFormData.set(newData);
    localStorage.setItem('expData', JSON.stringify(newData));
  }

  private loadFromLocalStorage(key:string){
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;//convert data from string to json object
  }

  nextStep(){
    this.currentStep.update(step => step + 1 )
  }

  prevStep(){
    this.currentStep.update(step => step - 1 )
  }


  
}
