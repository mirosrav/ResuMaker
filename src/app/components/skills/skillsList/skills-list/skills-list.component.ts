import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../../../services/sharedService.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.css'
})
export class SkillsListComponent implements OnInit{
  hasDataInLocalStorage:boolean = false;
  skillStorageData = JSON.parse(localStorage.getItem('skillData') || '{}');

  constructor(private skillService:SharedServiceService){}

  ngOnInit() {
    this.hasDataInLocalStorage = !!this.skillStorageData;
    const savedData = this.skillStorageData;//variable that stores data from localstorage
    if(savedData?.skills?.length){//if data exists
      savedData.skills.forEach((skill:any)=>{//fills skills formArray with said data
        this.skills.push(this.createSkillList(skill));
      });
    }else{//if no data exists
      this.skills.push(this.createSkillList());//push empty formArray input
    }

    this.skillListForm.valueChanges.subscribe((newData)=>{
      this.skillService.updateSkillPreview(newData);
    })
  }

  skillListForm = new FormGroup({
    skills: new FormArray([])
  })

  createSkillList(data?:any):FormGroup{
    return new FormGroup({
      title: new FormControl(data?.title, Validators.required),
      details: new FormControl(data?.details)
    })
  }

  get skills():FormArray{
    return this.skillListForm.get('skills') as FormArray;
  }

  addSkill(){
    this.skills.push(this.createSkillList());
  }

  updateSkill(){
    this.skillService.updateSkillForm(this.skillListForm.value);
  }

  deleteSkill(index:number){
    const confirmed = confirm("Delete this skill?");
    if(confirmed){
      this.skills.removeAt(index);
    }
  }

  next(){
    this.skillService.markFormGroupTouched(this.skillListForm);

    if(this.skillListForm.invalid){
      return;
    }
    this.updateSkill()
    this.skillService.nextStep();
  }

  previous(){
    this.skillService.prevStep();
  }
}
