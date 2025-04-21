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
export class ExperienceListComponent implements OnInit{
  expStorageData =  JSON.parse(localStorage.getItem('expData') || '{}');

  constructor(private expData:SharedServiceService){
  }

  ngOnInit() {
    const savedData = this.expStorageData;
    if(savedData?.experiences?.length){
      savedData.experiences.forEach((exp:any) => {
        this.experiences.push(this.createExperienceList(exp));
      });
    }else{
      this.experiences.push(this.createExperienceList());
    }
    
  
    this.experienceListForm.valueChanges.subscribe((newData) => {
      this.expData.updateExpPreview(newData);
    });
  }


  experienceListForm = new FormGroup({
    experiences: new FormArray([])
  })

  createExperienceList(data?:any):FormGroup{
    return new FormGroup({
      company:new FormControl(data?.company || '', Validators.required),
      designation:new FormControl(data?.designation || '', Validators.required),
      date: new FormControl(data?.date || '', Validators.required),
      compLocation: new FormControl(data?.compLocation || '', Validators.required),
      expHighlight : new FormArray(
        (data?.expHighlight?.length ? data.expHighlight : ['']).map(
          (hl:string) => new FormControl(hl, Validators.required)
        ))
    });
  }

  get experiences():FormArray{
    return this.experienceListForm.get('experiences') as FormArray;//get formArray experiences
  }

  getHighlights(index:number):FormArray{
    return this.experiences.at(index).get('expHighlight') as FormArray;//get formArray highlight
  }

  addHighlight(index:number){
    this.getHighlights(index).push(new FormControl(''));
  }

  addExperience(){
    this.experiences?.push(this.createExperienceList());
  }

  updateExperience(){
    this.expData.updateExpForm(this.experienceListForm.value);
    // this.expData.nextStep();
  }

  deleteHighlight(index:number,highlightIndex:number){
    const confirmed = confirm("Are you sure to delete this work highlight?")
    if(confirmed){
      this.getHighlights(index).removeAt(highlightIndex);
    }
  }

  deleteExperience(index:number){
    this.experiences.removeAt(index);
  }

  next(){
    this.expData.nextStep();
  }

  previous(){
    this.expData.prevStep();
  }

}
