import { Component, EventEmitter, Output,} from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { SharedServiceService } from '../../../services/sharedService.service';

@Component({
  selector: 'app-resumeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resumeform.component.html',
  styleUrl: './resumeform.component.css'
})
export class ResumeformComponent{
  @Output() resumeHeaderData = new EventEmitter<any>();
  @Output() next = new EventEmitter<void>();
  isHeaderVisible = true;
  isProSumVisible = false;

  constructor(private headerData:SharedServiceService){
    this.resumeForm.valueChanges.subscribe(value => {
      this.resumeHeaderData.emit(value);
    })
  }

  resumeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contact: new FormGroup({
      location: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      site: new FormControl(''),
    }),
    summary: new FormControl('')
  })


  onSubmit(){
    this.next.emit();
    this.addData();
    console.log(this.headerData.logFormData())
  }

  addData(){
    if(this.headerData.formData.length === 0){
      this.headerData.formData.push(this.resumeForm.value);
    }else{
      this.headerData.formData[0] = this.resumeForm.value;
    }
  }


}
