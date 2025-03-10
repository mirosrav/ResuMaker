import { Component } from '@angular/core';
import { EducationListComponent } from "./education-list/education-list.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [EducationListComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

}
