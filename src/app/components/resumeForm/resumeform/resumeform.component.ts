import { Component, inject, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resumeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resumeform.component.html',
  styleUrl: './resumeform.component.css'
})
export class ResumeformComponent{
  dataform:any;

  @Output() onFormSubmitEmitter = new EventEmitter<any>();

  resumeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  }) 

  // onSubmit(){
  //   console.log(this.resumeForm.value);
  // }

// count = 0;

// Increase(){
//   this.count;
// }

formData(){
  this.onFormSubmitEmitter.emit(this.resumeForm.value);
}
onChange(value:any){
    this.resumeForm = value.target.value
}
}
