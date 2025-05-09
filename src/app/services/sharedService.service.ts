import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { single } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  headerFormData = signal(this.loadFromLocalStorage('headerData'));
  summaryFormData = signal(this.loadFromLocalStorage('summaryData'));
  experienceFormData = signal(this.loadFromLocalStorage('expData'));
  educationFormData = signal(this.loadFromLocalStorage('eduData'));
  skillsFormData = signal(this.loadFromLocalStorage('skillData'));

  currentStep = signal(0);

  constructor(){
    effect(()=>{//untuk tahu bila signal berubah.
      console.log(this.currentStep());
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

  updateSkillForm(newData:any){
    this.skillsFormData.set(newData);
    localStorage.setItem('skillData', JSON.stringify(newData));
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

  handleNext(form: FormGroup | FormArray){
    this.markFormGroupTouched(form);

    if (form.invalid) {
      return;
    }

    this.nextStep();
    this.updateExpForm(form.value);
  }

}
