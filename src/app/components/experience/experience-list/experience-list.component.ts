import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedServiceService } from '../../../services/sharedService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css'
})
export class ExperienceListComponent implements OnInit{
  expStorageData =  JSON.parse(localStorage.getItem('expData') || '{}');

  constructor(private expData:SharedServiceService){}

  ngOnInit(){

    this.experienceForm.valueChanges.subscribe((newData)=>{
      this.expData.updateExpPreview(newData)
    })
  }

  experienceForm = new FormGroup({
    company:new FormControl(''),
    designation:new FormControl(''),
    date: new FormControl(''),
    compLocation: new FormControl(''),
    expHighlight : new FormArray([
      new FormControl('')
    ])
  })

  get expHighlight() {
    return this.experienceForm.get('expHighlight') as FormArray;
  }
  updateForm(){
    this.expData.updateExpForm(this.experienceForm.value);
    console.log(this.experienceForm.value)
  }

  addHighlights(){
    this.expHighlight.push(new FormControl(''));
  }
}
