import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() resumeSummaryData = new EventEmitter<any>();

  constructor(private summaryService: SharedServiceService){
    // this.summaryForm.valueChanges.subscribe(value =>{
    //   this.resumeSummaryData.emit(value);
    // })

  }

  ngOnInit(){
    const savedData = this.summaryService.summaryFormData();
    if(savedData){
      this.summaryForm.patchValue(savedData);
    }

    this.summaryForm.valueChanges.subscribe((newData2)=>{
      this.summaryService.updateSummaryForm(newData2);
    })  
  }


  summaryForm = new FormGroup({
    summary: new FormControl('')
  })

  onSubmit(){
    this.next.emit();
    // this.addData();
  }

  proceed(){
    this.summaryService.nextStep();
  }

  goBack() {
    this.summaryService.prevStep();
  }
  // addData(){
  //   if(this.summaryData.formData.length === 0){
  //     this.summaryData.formData.push(this.summaryForm.value);
  //   }else{
  //     this.summaryData.formData[0] = this.summaryForm.value;
  //   }
  // }
}  
