import { Component } from '@angular/core';
import { SkillsListComponent } from "../skillsList/skills-list/skills-list.component";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillsListComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

}
