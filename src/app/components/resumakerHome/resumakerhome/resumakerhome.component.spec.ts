import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumakerhomeComponent } from './resumakerhome.component';

describe('ResumakerhomeComponent', () => {
  let component: ResumakerhomeComponent;
  let fixture: ComponentFixture<ResumakerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumakerhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumakerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
