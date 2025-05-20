import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../../services/sharedService.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { StateServiceService } from '../../../services/stateService.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent,],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{
  states: any[] = [];
  districts: {[index:number]: string[]} = {};
  hasDataInLocalStorage:boolean = false;

  eduStorageData = JSON.parse(localStorage.getItem('eduData') || '{}');

  constructor(private eduDataService:SharedServiceService, private stateService: StateServiceService){

  }

  ngOnInit(){
    this.hasDataInLocalStorage = !!this.eduStorageData ;
    const savedData = this.eduStorageData;
    if(savedData?.educations?.length){
      savedData.educations.forEach((edu:any)=>{
        this.educations.push(this.createEducationList(edu));
      });
    }else{
      this.educations.push(this.createEducationList());
    }

    this.educationListForm.valueChanges.subscribe((newdata)=>{
      this.eduDataService.updateEduPreview(newdata);
    })

    this.states = this.stateService.getStates();
    // this.educationListForm.get('state')?.valueChanges.subscribe(selectedState =>{
    //   this.districts = this.stateService.getDistrictsByState(selectedState);
    // })

  }

  educationListForm = new FormGroup({
    educations: new FormArray([])
  })

  createEducationList(data?:any):FormGroup{
    const group = new FormGroup({
      title: new FormControl(data?.title || '', Validators.required),
      startDate: new FormControl(data?.startDate || '', Validators.required),
      gradDate: new FormControl(data?.gradDate || '', Validators.required),
      institute: new FormControl(data?.institute || '', Validators.required),
      district: new FormControl(data?.district || null, Validators.required),
      state: new FormControl(data?.state || null, Validators.required)  // Changed from data?.district to data?.state
    });

    group.get('state')?.valueChanges.subscribe((selectedState)=>{
      if(selectedState){
        const districtList = this.stateService.getDistrictsByState(selectedState);

        const index = this.educations.controls.findIndex(control => control === group);

        this.districts[index] = districtList;

        group.get('district')?.setValue('');
      }
    });

    return group;
  }

  get educations():FormArray{
    return this.educationListForm.get('educations') as FormArray;
  }

  addEducation(){
    this.educations.push(this.createEducationList());
  }

  updateEducation(){
    this.eduDataService.updateEduForm(this.educationListForm.value);
    // this.eduData.nextStep();
  }

  deleteEducation(index:number){
    const confirmed = confirm("Are you sure to delete this education?")
    if(confirmed){
      this.educations.removeAt(index);
    }
  }

  next(){
    this.eduDataService.markFormGroupTouched(this.educationListForm);

    if(this.educationListForm.invalid){
      return;
    };

    this.updateEducation();
    this.eduDataService.nextStep();
  }

  previous(){
    this.eduDataService.prevStep();
  }

}
