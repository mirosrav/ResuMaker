import { Component, EventEmitter, OnInit, Output,} from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { SharedServiceService } from '../../../services/sharedService.service';

@Component({
  selector: 'app-resumeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resumeform.component.html',
  styleUrl: './resumeform.component.css'
})
export class ResumeformComponent{
}
