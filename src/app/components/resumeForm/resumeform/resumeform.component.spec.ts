import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeformComponent } from './resumeform.component';

describe('ResumeformComponent', () => {
  let component: ResumeformComponent;
  let fixture: ComponentFixture<ResumeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
