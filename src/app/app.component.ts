import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { EducationComponent } from "./components/education/education/education.component";
import { SkillsComponent } from "./components/skills/skills/skills.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SummaryComponent, ExperienceComponent, EducationComponent, SkillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ResuMaker';
}
