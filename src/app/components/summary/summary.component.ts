import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedServiceService } from '../../services/sharedService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  summaryData = JSON.parse(localStorage.getItem('summaryData') || '{}');
  
  constructor(private summaryService:SharedServiceService){
  }

  ngOnInit(){
    const savedData = this.summaryService.summaryFormData();
    if(savedData){
      this.summaryForm.patchValue(savedData);
    }

    this.summaryForm.valueChanges.subscribe((newData)=>{
      this.summaryService.updateSummaryPreview(newData);
    })  
  }


  summaryForm = new FormGroup({
    summary: new FormControl('', Validators.required)
  })

  next(){
    this.summaryService.markFormGroupTouched(this.summaryForm);

    if(this.summaryForm.invalid){
      return;
    }
    this.summaryService.updateSummaryForm(this.summaryForm.value);
    this.summaryService.nextStep();

  }

  previous() {
    this.summaryService.prevStep();
  }
  
}
