import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../../services/sharedService.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { HeaderComponent } from "../../header/header.component";
// import { SummaryComponent } from "../../summary/summary.component";
// import { ExperienceComponent } from "../../experience/experience.component";
// import { EducationComponent } from "../../education/education/education.component";
// import { SkillsComponent } from "../../skills/skills/skills.component";
// import { tick } from '@angular/core/testing';



@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit{
  @ViewChild('resumePreview') resumePreview!: ElementRef;//get the div with the related id

  savedHeaderData = JSON.parse(localStorage.getItem('headerFormData') || '{}');
  savedSummaryData = JSON.parse(localStorage.getItem('summaryFormData') || '{}');
  resumeDatas:any;
  @Input() data: any;

  constructor(public resumeService:SharedServiceService){
    console.log(this.savedHeaderData);
  }

ngOnInit(){
}

downloadPdf(){
  const button = document.querySelector('.noclick') as HTMLElement;
  if (button) button.style.display = 'none';
  const data = this.resumePreview.nativeElement;

  html2canvas(data, {scale: 2}).then(canvas =>{
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p','mm','a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('resume.pdf');

    if (button) button.style.display = 'block';
  })
}
  // ngOnChanges(changes: SimpleChanges): void {
  //     this.resumeDatas = JSON.parse(this.resumeData.getFormData()!);
  //     console.log(this.resumeDatas);
  // }


}
