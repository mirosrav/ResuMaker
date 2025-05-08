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
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() resumeSummaryData = new EventEmitter<any>();
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

  onSubmit(){
    this.next.emit();
    // this.addData();
  }

  proceed(){
    if(this.summaryForm.invalid){
      return;
    }

    this.summaryService.updateSummaryForm(this.summaryForm.value);
    this.summaryService.nextStep();

  }

  goBack() {
    this.summaryService.prevStep();
  }
  
}
