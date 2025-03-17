import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { SummaryComponent } from "../../summary/summary.component";
import { ExperienceComponent } from "../../experience/experience.component";
import { EducationComponent } from "../../education/education/education.component";
import { SkillsComponent } from "../../skills/skills/skills.component";
import { tick } from '@angular/core/testing';
import { SharedServiceService } from '../../../services/sharedService.service';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent{
  constructor(private getFormDatas:SharedServiceService){

  }
  getFormData(){
    this.getFormDatas.getData();
  }


}
