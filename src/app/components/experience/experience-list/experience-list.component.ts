import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedServiceService } from '../../../services/sharedService.service';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css'
})
export class ExperienceListComponent implements OnInit {
  expStorageData = JSON.parse(localStorage.getItem('expData') || '{}');

  constructor(private expDataService: SharedServiceService) {
  }

  ngOnInit() {
    const savedData = this.expStorageData;
    if (savedData?.experiences?.length) {
      savedData.experiences.forEach((exp: any) => {
        this.experiences.push(this.createExperienceList(exp));
      });
    } else {
      this.experiences.push(this.createExperienceList());
    }

    this.experienceListForm.valueChanges.subscribe((newData) => {
      this.expDataService.updateExpPreview(newData);
    });

  }

  experienceListForm = new FormGroup({
    experiences: new FormArray([])
  })

  createExperienceList(data?: any): FormGroup {
    const formGroup = new FormGroup({
      company: new FormControl(data?.company || '', Validators.required),
      designation: new FormControl(data?.designation || '', Validators.required),
      startDate: new FormControl(data?.startDate || '', Validators.required),
      endDate: new FormControl(data?.endDate || ''),//no validator is set to bypass the invalid form flag. dynamically add validators via setEndDateValidation
      isCurrent:new FormControl(data?.isCurrent || false),
      compLocation: new FormControl(data?.compLocation || '', Validators.required),
      expHighlight: new FormArray(
        (data?.expHighlight?.length ? data.expHighlight : ['']).map(
          (hl: string) => new FormControl(hl, Validators.required)
        ))
    });

    this.setEndDateValidation(formGroup);

    formGroup.get('isCurrent')?.valueChanges.subscribe(()=>{
      this.setEndDateValidation(formGroup);
    });

    return formGroup;
  }


  private setEndDateValidation(form:FormGroup):void{//set isCurrent control validators with this helper function
    const endDateControl = form.get('endDate');
    const isCurrentControl = form.get('isCurrent');

    if(endDateControl && isCurrentControl){//both control have data
      if(isCurrentControl.value === true){//isCurrent control is set to true
        endDateControl.clearValidators();//delete endDate control validators to ensure form is VALID when form is loaded
      }else{
        endDateControl.setValidators(Validators.required);//if isCurrent set to false, set endDate control validators to required
      }
      endDateControl.updateValueAndValidity();
    }

  }

  get experiences(): FormArray {
    return this.experienceListForm.get('experiences') as FormArray;//get formArray experiences
  }

  getHighlights(index: number): FormArray {
    return this.experiences.at(index).get('expHighlight') as FormArray;//get formArray highlight
  }

  addHighlight(index: number) {
    this.getHighlights(index).push(new FormControl(''));
  }

  addExperience() {
    this.experiences?.push(this.createExperienceList());
  }

  deleteHighlight(index: number, highlightIndex: number) {
    const confirmed = confirm("Are you sure to delete this work highlight?")
    if (confirmed) {
      this.getHighlights(index).removeAt(highlightIndex);
    }
  }

  deleteExperience(index: number) {
    this.experiences.removeAt(index);
  }

  next() {
    this.expDataService.markFormGroupTouched(this.experienceListForm);

    if(this.experienceListForm.invalid){
      return;
    }

    this.expDataService.updateExpForm(this.experienceListForm.value);
    this.expDataService.nextStep();
  }

  previous() {
    this.expDataService.prevStep();
  }

  setToCurrent(index:number){
    const experienceGroup = this.experiences.at(index) as FormGroup;
    const isCurrentControl = experienceGroup.get('isCurrent');
    const endDateControl = experienceGroup.get('endDate');

    const newValue = !isCurrentControl?.value;
    isCurrentControl?.setValue(newValue);

  }

}
