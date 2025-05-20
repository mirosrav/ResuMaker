import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headerFormData = signal(this.loadFromLocalStorage('headerData'));
  summaryFormData = signal(this.loadFromLocalStorage('summaryData'));
  experienceFormData = signal(this.loadFromLocalStorage('expData'));
  educationFormData = signal(this.loadFromLocalStorage('eduData'));
  skillsFormData = signal(this.loadFromLocalStorage('skillData'));

  currentStep = signal(3);

  constructor(){
    effect(()=>{
      console.log(this.educationFormData());
    })
  }


  getFormData(){
    return localStorage.getItem('headerFormData');
  }

  /* Live preview by setting the signal data */
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

  updateSkillPreview(newData:any){
    this.skillsFormData.set(newData);
  }


  /* set local storage data from user input */
  updateHeaderForm(newData:any){
    this.updateFormData(this.headerFormData, 'headerData', newData)
  }

  updateSummaryForm(newData:any){
    this.updateFormData(this.summaryFormData, 'summaryData',newData);
  }

  updateExpForm(newData:any){
    this.updateFormData(this.experienceFormData, 'expData',newData);
  }

  updateEduForm(newData:any){
    this.updateFormData(this.educationFormData, 'eduData',newData);
  }

  updateSkillForm(newData:any){
    this.updateFormData(this.skillsFormData, 'skillData',newData);
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
  
  markFormGroupTouched(group: FormGroup | FormArray) {
    Object.values(group.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    })
  }


  updateFormData<T>(
      signal: {set: (val: T) => void},//arrow function which means signal object has a function named set,that takes 'val' as parameter of type T that returns nothing
      key: string,//name for localstorage name
      newData: T //new data to be updated in the signal and localstorage
    ){
      signal.set(newData);
      localStorage.setItem(key, JSON.stringify(newData));
  }

}
