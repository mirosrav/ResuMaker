import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;

  getErrorMessage(){
    if(this.control?.hasError('required')){
      return 'This field is required';
    }
    return 'Invalid Field';
  }
}
