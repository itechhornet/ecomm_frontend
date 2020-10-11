import { HostListener } from '@angular/core';
import {Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appZoomImage]'
})
export class ZoomImageDirective {
  image:any;
  hoverDiv:any;
  xPos:number;
  yPos:number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit() {
    const currentElement = this.elRef.nativeElement;
    const div = this.renderer.createElement('div');
    this.image = this.renderer.createElement('img');
    this.hoverDiv = this.renderer.createElement('img');
    this.renderer.addClass(div , "image-zoom");
    this.renderer.addClass(this.image , "image-zoom-src");
    this.renderer.setStyle(div,"left","400")
    this.renderer.setStyle(this.elRef.nativeElement.parentElement,"cursor","zoom-in")
    this.renderer.setAttribute(this.image,"src",currentElement.getAttribute("src"));
    let i = 0;
  
    this.renderer.appendChild(div, this.image);
    this.renderer.appendChild(this.elRef.nativeElement.parentElement, div);
  }

  @HostListener('mousemove', ['$event'])
  onClick(evt) {
    let x = (((evt.offsetX)/evt.target.clientWidth)*100);
    let y = (((evt.offsetY)/evt.target.clientHeight)*100);
    this.yPos = (y < 75) ? y : this.yPos;
    this.xPos = (x < 75) ? x : this.xPos;
    let fx = ((this.xPos-10) >= 0 ) ? (this.xPos-10) :  this.xPos;
    let fy = ((this.yPos-10) >= 0 ) ? (this.yPos-10) :  this.yPos;
  //  if(x<70 && y<70)
     this.renderer.setAttribute(this.image,"style","transform:translate(-"+fx+"%, -"+fy+"%)");
  
  }
}
