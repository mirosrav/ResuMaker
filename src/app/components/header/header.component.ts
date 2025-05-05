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
  constructor(private headerDataService: SharedServiceService){

  }

  ngOnInit(){
    const savedData = this.headerDataService.headerFormData();
    if(savedData){
      this.headerForm.patchValue(savedData);
    }

    this.headerForm.valueChanges.subscribe((newData)=>{
      this.headerDataService.updateHeaderPreview(newData);
    })
  }

  headerForm = new FormGroup({
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
    this.headerDataService.updateHeaderForm(this.headerForm.value);
    this.proceed();
  }

  proceed(){
    this.headerDataService.nextStep();
  }
}  


