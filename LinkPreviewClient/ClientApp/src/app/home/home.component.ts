import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GetDataService } from '../get-data.service'
import { Type } from '../linkType';
import { MatMenuTrigger } from '@angular/material/menu';
import { ViewChild } from '@angular/core';



export interface LinkPreview {
  description: string;
  image: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  preview: LinkPreview = {          // JSON format
    title: '',
    description: '',
    url: '',
    image: ''
  };

  link = new FormControl('', [Validators.required]);

  public typeEnum = Type;

  public type = this.typeEnum.None;

  private linkSubmit: any;

  private linkShow: any;

  constructor(private getContentService: GetDataService) { }

  public onSubmit() {
    this.checkURL(this.link.value)
    if (this.type === this.typeEnum.Link) {
      this.getContentService.getData(this.link.value).subscribe((data) => {
        this.preview.title = data.title;
        this.preview.description = data.description;
        this.preview.image = data.images;
        this.preview.url = data.url;
      });
    }
  }

  public checkURL(link: any) {

    //check ifUrl
    const pageRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;      //regex for validate url
    if (RegExp(pageRegex).test(link)) {
      this.type = this.typeEnum.Link;
    }

    //checkUrlImage
    const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    if (RegExp(imgRegex).test(link)) {
      this.type = this.typeEnum.Image;
    }

    //checkUrlPDF
    const pdfRegex = /\bhttps?:\/\/(.+)\/(.+)\.pdf\b/g;
    if (RegExp(pdfRegex).test(link)) {
      this.type = this.typeEnum.Pdf;
    }

    //checkUrlDocx
    const docxRegex = /\bhttps?:\/\/(.+)\/(.+)\.doc(x)?\b/g;
    if (RegExp(docxRegex).test(link)) {
      this.type = this.typeEnum.Word;
    }

    //checkUrlBin
    const binRegex = /\bhttps?:\/\/(.+)\/(.+)\.bin\b/g;
    if (RegExp(binRegex).test(link)) {
      this.type = this.typeEnum.Binary;
    }

    this.linkSubmit = link;

    if (this.type === this.typeEnum.Binary || this.type === this.typeEnum.Pdf || this.type === this.typeEnum.Word) {
      var re = new RegExp(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/gm);
      let result = re[Symbol.match](link);
      this.linkShow = result;
    }

    if (this.type === this.typeEnum.Image || this.type === this.typeEnum.Link) {
      var re = new RegExp("(https?://)([^:^/]*)(:\\d*)?(.*)?");
      let split = re[Symbol.split](link);
      this.linkShow = split[0] + split[1] + split[2];
    }
  }

  // we create an object that contains coordinates
  menuTopLeftPosition = { x: 0, y: 0 }

  //// reference to the MatMenuTrigger in the DOM
  @ViewChild('rightClickMenuTrigger', { static: false }) rightClickMenuTrigger: MatMenuTrigger;
  onRightClick(event: MouseEvent) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;

    // we open the menu
    this.rightClickMenuTrigger.openMenu();
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.linkSubmit;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
