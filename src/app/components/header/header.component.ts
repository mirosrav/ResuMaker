import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { EventEmitter } from 'stream';
import { SharedServiceService } from '../../services/sharedService.service';
import { __values } from 'tslib';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isHeaderVisible = true;
  @Output() next = new EventEmitter<void>();
  headerStorageData = JSON.parse(localStorage.getItem('headerData') || '{}');
  constructor(private headerDataService: SharedServiceService) {

  }

  ngOnInit() {
    const savedData = this.headerDataService.headerFormData();
    if (savedData) {
      this.headerForm.patchValue(savedData);
    }

    this.headerForm.valueChanges.subscribe((newData) => {
      this.headerDataService.updateHeaderPreview(newData);
    })
  }

  headerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contact: new FormGroup({
      location: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    }),
  })

  updateForm(e: Event) {
    e.preventDefault();
    this.markFormGroupTouched(this.headerForm);
    
    if (this.headerForm.invalid) {
      return;
    }
    
    this.headerDataService.updateHeaderForm(this.headerForm.value);
    this.headerDataService.nextStep();
  }

  markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control); // recursively touch nested groups
    } else {
      control.markAsTouched();
    }
  });
}


}


