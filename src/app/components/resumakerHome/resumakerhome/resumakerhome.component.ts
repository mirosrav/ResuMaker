import { Component, Input } from '@angular/core';
import { ResumeComponent } from "../../resume/resume/resume.component";
import { ResumeformComponent } from "../../resumeForm/resumeform/resumeform.component";

@Component({
  selector: 'app-resumakerhome',
  standalone: true,
  imports: [ResumeComponent, ResumeformComponent],
  templateUrl: './resumakerhome.component.html',
  styleUrl: './resumakerhome.component.css'
})
export class ResumakerhomeComponent {
  name: any;

  handleFormSubmit(data: any) {
    this.name = data;
    console.log('Form Data:', data);
  }

}