import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../../services/sharedService.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { style } from '@angular/animations';




@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit{
  @ViewChild('resumePreview') resumePreview!: ElementRef;//get the div with the related id

  savedHeaderData = JSON.parse(localStorage.getItem('headerData') || '{}');
  savedSummaryData = JSON.parse(localStorage.getItem('summaryData') || '{}');
  savedExpData = JSON.parse(localStorage.getItem('expData') || '{}');
  savedHLData = Array.isArray(this.savedExpData.expHighlight) ? this.savedExpData.expHighlight : [];
  hldata = (()=>{
    return this.resumeService.experienceFormData()?.expHighlight;
  })
  savedEduData = JSON.parse(localStorage.getItem('eduData')|| '{}');
  savedSkillData = JSON.parse(localStorage.getItem('skillData') || '{}');
  

  resumeDatas:any;
  @Input() data: any;

  constructor(public resumeService:SharedServiceService){

  }

  get headerData(){
    return this.resumeService.headerFormData();
  }

  get experienceData(){
    return this.resumeService.experienceFormData();
  }

  get educationData(){
    return this.resumeService.educationFormData();
  }

  get skillData(){
    return this.resumeService.skillsFormData();
  }

ngOnInit(){
}
/* 
downloadPdf(){
  const buttons = document.querySelectorAll('.noclick') as NodeListOf<HTMLElement>;

  if(buttons.length > 0){
    buttons.forEach(button =>{
      button.style.display = 'none';
    });
  }
  
  const data = this.resumePreview.nativeElement;

  const options = {
    margin: [0, 0, 0, 0],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(data).set(options).save().then(()=>{
    if(buttons.length > 0){
      buttons.forEach(button =>{
        button.style.display = 'block';
      });
    }
  })

  // html2canvas(data, {scale: 2}).then(canvas =>{
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p','mm','a4');
  //   const imgWidth = 210;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //   pdf.save('resume.pdf');


  //   if(buttons.length > 0){
  //     buttons.forEach(button =>{
  //       button.style.display = 'block';
  //     });
  //   }
  // })
}
*/

downloadPdf() {
  const buttons = document.querySelectorAll('.noclick') as NodeListOf<HTMLElement>;
  
  // Hide buttons during PDF generation
  if (buttons.length > 0) {
    buttons.forEach(button => {
      button.style.display = 'none';
    });
  }
  
  const element = this.resumePreview.nativeElement;
  const pdf = new jsPDF('p', 'mm', 'a4');

  pdf.setFont("helvetica", "normal");
  
  // Use the fromHTML method to convert HTML to PDF
  pdf.html(element, {
    callback: function(pdf) {
      pdf.save('resume.pdf');
      
      // Show buttons after PDF generation is complete
      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.style.display = 'block';
        });
      }
    },
    x: 0,
    y: 0,
    width: 210, // slightly less than A4 width (210mm)
    windowWidth: element.offsetWidth,
    html2canvas:{
      letterRendering: true,
      useCORS:true
    }
  });
}

/*downloadPdf() {
  const pdf = new jsPDF();
  const element = this.resumePreview.nativeElement; // Replace with your element ID
  pdf.html(element, {
    callback: (doc) => {
      doc.save('document.pdf');
    },
    margin: [10, 10, 10, 10],
    autoPaging: 'text',
    x: 0,
    y: 0,
    width: 210, // Adjust as needed
    windowWidth: element.offsetWidth // Adjust as needed
  });
}*/

previous(){
  this.resumeService.prevStep();
}

get isLastStep():boolean{
  return this.resumeService.currentStep() === 5;
}
  // ngOnChanges(changes: SimpleChanges): void {
  //     this.resumeDatas = JSON.parse(this.resumeData.getFormData()!);
  //     console.log(this.resumeDatas);
  // }


}
