import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { EventEmitter } from 'stream';
import { SharedServiceService } from '../../services/sharedService.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isHeaderVisible = true;
  @Output() next = new EventEmitter<void>();
  headerStorageData = JSON.parse(localStorage.getItem('headerData') || '{}');
  constructor(private headerData: SharedServiceService){

  }

  ngOnInit(){
    const savedData = this.headerData.headerFormData();
    if(savedData){
      this.resumeForm.patchValue(savedData);
    }

    this.resumeForm.valueChanges.subscribe((newData)=>{
      this.headerData.updateHeaderPreview(newData);
    })
  }

  resumeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contact: new FormGroup({
      location: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    }),
  })

  updateForm(e:Event){
    e.preventDefault();
    this.headerData.updateHeaderForm(this.resumeForm.value);
    this.proceed();
  }

  proceed(){
    this.headerData.nextStep();
  }
}  


