import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { SummaryComponent } from "../../summary/summary.component";
import { ExperienceComponent } from "../../experience/experience.component";
import { EducationComponent } from "../../education/education/education.component";
import { SkillsComponent } from "../../skills/skills/skills.component";
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [HeaderComponent, SummaryComponent, ExperienceComponent, EducationComponent, SkillsComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnChanges{
  @Input() nameFromParent: any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.nameFromParent);
  }

  // ngOnInit(): void {
  //   console.log(this.nameFromParent);
  // }
}
