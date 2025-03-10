import { Component } from '@angular/core';
import { ExperienceListComponent } from "./experience-list/experience-list.component";

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ExperienceListComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

}
