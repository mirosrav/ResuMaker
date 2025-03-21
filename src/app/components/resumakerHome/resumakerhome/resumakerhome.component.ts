import { Component, Input } from '@angular/core';
import { ResumeComponent } from "../../resume/resume/resume.component";
import { ResumeformComponent } from "../../resumeForm/resumeform/resumeform.component";
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../../../services/sharedService.service';

@Component({
  selector: 'app-resumakerhome',
  standalone: true,
  imports: [ResumeComponent, ResumeformComponent, CommonModule, HeaderComponent],
  templateUrl: './resumakerhome.component.html',
  styleUrl: './resumakerhome.component.css'
})
export class ResumakerhomeComponent {

  constructor(public resumeService:SharedServiceService){}

  formData: any;
  
  handleFormSubmit(data: any) {
    this.formData = data;
    console.log('Form Data:', data);
  }

}