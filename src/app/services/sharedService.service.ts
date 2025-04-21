import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headerFormData = signal(this.loadFromLocalStorage('headerData'));
  summaryFormData = signal(this.loadFromLocalStorage('summaryData'));
  experienceFormData = signal(this.loadFromLocalStorage('expData'));
  educationFormData = signal(this.loadFromLocalStorage('eduData'));

  currentStep = signal(0);

  constructor(){
    effect(()=>{//untuk tahu bila signal berubah.
      console.log(this.currentStep());
    })
  }


  
  getFormData(){
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

  updateEduPreview(newData:any){
    this.educationFormData.set(newData);
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
    localStorage.setItem('summaryData', JSON.stringify(newData));
  }

  updateExpForm(newData:any){
    this.experienceFormData.set(newData);
    localStorage.setItem('expData', JSON.stringify(newData));
  }

  updateEduForm(newData:any){
    this.educationFormData.set(newData);
    localStorage.setItem('eduData',JSON.stringify(newData));
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

  setStep(index:number){
    this.currentStep.set(index);
    console.log(this.currentStep())
  }
  
}
