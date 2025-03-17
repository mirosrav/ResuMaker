import { Component, inject, EventEmitter, Output, OnChanges, SimpleChanges, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { SharedServiceService } from '../../../services/sharedService.service';

@Component({
  selector: 'app-resumeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resumeform.component.html',
  styleUrl: './resumeform.component.css'
})
export class ResumeformComponent{

  constructor(private sharedData:SharedServiceService){}

  resumeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  }) 

  onSubmit(formData: any){
    this.resumeForm.patchValue(formData);
    console.log(formData);
  }


}
