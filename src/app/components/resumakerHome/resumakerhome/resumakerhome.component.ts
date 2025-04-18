import { Component, Input } from '@angular/core';
import { ResumeComponent } from "../../resume/resume/resume.component";
import { ResumeformComponent } from "../../resumeForm/resumeform/resumeform.component";
import { HeaderComponent } from "../../header/header.component";
import { SummaryComponent } from '../../summary/summary.component';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../../../services/sharedService.service';
import { EducationComponent } from "../../education/education/education.component";
import { ExperienceListComponent } from "../../experience/experience-list/experience-list.component";

@Component({
  selector: 'app-resumakerhome',
  standalone: true,
  imports: [ResumeComponent, CommonModule, HeaderComponent, SummaryComponent, ExperienceListComponent, EducationComponent],
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