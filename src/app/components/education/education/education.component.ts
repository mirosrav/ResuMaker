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
    this.hasDataInLocalStorage = !!this.eduStorageData;
    const savedData = this.eduStorageData;

    // Load states once
    this.states = this.stateService.getStates();

    if(savedData?.educations?.length){
      savedData.educations.forEach((edu:any, index:number)=>{
        // Initialize districts array for this index
        this.districts[index] = [];

        // Create the form group
        this.educations.push(this.createEducationList(edu));
        
        // If there's a saved state, populate the districts
        if(edu.state){
          if(edu.state === 'Putrajaya' || edu.state === 'Labuan'){
            this.districts[index] = [];
            // No need to clear validators here since they're already handled in createEducationList
          }else{
            this.districts[index] = this.stateService.getDistrictsByState(edu.state);
          }
        }
      });
    }else{
      this.districts[0] = [];
      this.educations.push(this.createEducationList());
    }

    this.educationListForm.valueChanges.subscribe((newdata)=>{
      this.eduDataService.updateEduPreview(newdata);
    });
  }

  educationListForm = new FormGroup({
    educations: new FormArray([])
  })

  createEducationList(data?:any):FormGroup{
    // Check if this is a federal territory to conditionally set district validator
    const isFederalTerritory = data?.state === 'Putrajaya' || data?.state === 'Labuan';
    
    const group = new FormGroup({
      title: new FormControl(data?.title || '', Validators.required),
      startDate: new FormControl(data?.startDate || '', Validators.required),
      gradDate: new FormControl(data?.gradDate || '', Validators.required),
      institute: new FormControl(data?.institute || '', Validators.required),
      district: new FormControl(data?.district || '', isFederalTerritory ? [] : Validators.required),
      state: new FormControl(data?.state || '', Validators.required)
    });

    group.get('state')?.valueChanges.subscribe((selectedState) => {
      if (selectedState) {
        const index = this.educations.controls.findIndex(control => control === group);
        
        if (selectedState === 'Putrajaya' || selectedState === 'Labuan') {
          // Federal territories - no districts
          this.districts[index] = [];
          
          // Clear district requirement and value
          const districtControl = group.get('district');
          districtControl?.clearValidators();
          districtControl?.setValue('');
          districtControl?.updateValueAndValidity();
          
        } else {
          // Regular states - load districts and require selection
          const districtList = this.stateService.getDistrictsByState(selectedState);
          this.districts[index] = districtList;
          
          // Ensure district is required for regular states
          const districtControl = group.get('district');
          districtControl?.setValidators(Validators.required);
          
          // Only clear district value if current district is not valid for new state
          const currentDistrict = districtControl?.value;
          if (currentDistrict && !districtList.includes(currentDistrict)) {
            districtControl?.setValue('');
          }
          
          districtControl?.updateValueAndValidity();
        }
      }
    });

    return group;
  }

  getDistrictForIndex(index:number):string[]{
    return this.districts[index] || [];
  }

  hasDistrictForIndex(index:number):boolean{
    return this.districts[index] && this.districts[index].length > 0;
  }

  get educations():FormArray{
    return this.educationListForm.get('educations') as FormArray;
  }

  addEducation(){
    const newIndex = this.educations.length;
    this.districts[newIndex] = []; // Initialize districts array for new form
    this.educations.push(this.createEducationList());
  }

  updateEducation(){
    this.eduDataService.updateEduForm(this.educationListForm.value);
  }

  deleteEducation(index:number){
    const confirmed = confirm("Are you sure to delete this education?")
    if(confirmed){
      this.educations.removeAt(index);
      // Clean up districts array
      delete this.districts[index];
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