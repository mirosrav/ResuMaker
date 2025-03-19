import { Component, Input } from '@angular/core';
import { ResumeComponent } from "../../resume/resume/resume.component";
import { ResumeformComponent } from "../../resumeForm/resumeform/resumeform.component";
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumakerhome',
  standalone: true,
  imports: [ResumeComponent, ResumeformComponent, CommonModule, HeaderComponent],
  templateUrl: './resumakerhome.component.html',
  styleUrl: './resumakerhome.component.css'
})
export class ResumakerhomeComponent {
  formData: any;
  currentStep = 0;

  sections = ['header', 'summary', 'skills'];

  nextStep(){
    if(this.currentStep < this.sections.length - 1){
      this.currentStep++;
    }
  }

  prevStep(){
    if(this.currentStep > 0){
      this.currentStep--;
    }
  }
  
  handleFormSubmit(data: any) {
    this.formData = data;
    console.log('Form Data:', data);
  }

}