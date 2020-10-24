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
  div:any;
  posX: any;
  posY: any;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit() {
    const currentElement = this.elRef.nativeElement;
    this.div = this.renderer.createElement('div');
    this.image = this.renderer.createElement('img');
    this.hoverDiv = this.renderer.createElement('img');
    this.renderer.addClass(this.div , "image-zoom");
    this.renderer.addClass(this.image , "image-zoom-src");
    this.renderer.setStyle(this.div,"left","400");
    this.renderer.setStyle(this.div,"border","6px solid #ef6c00");
    this.renderer.setStyle(this.div,"display","none")
    this.renderer.setStyle(this.elRef.nativeElement.parentElement,"cursor","zoom-in")
    this.renderer.setStyle(this.div,"background-image","url('"+currentElement.getAttribute("src")+"')");
    let i = 0;
  
    this.renderer.appendChild(this.div, this.image);
    this.renderer.appendChild(this.elRef.nativeElement.parentElement, this.div);
  }

  @HostListener('mousemove', ['$event'])
  onClick(event) {
    let pre = {x:this.posX,y:this.posY}
    this.posX = event.offsetX ? (event.offsetX) : event.pageX - this.image.offsetLeft;
    this.posY = event.offsetY ? (event.offsetY) : event.pageY - this.image.offsetTop;

    this.posX = (this.posX < 350) ? this.posX :  pre.x;
    this.posY = (this.posY < 350) ? this.posY :  pre.y;
    this.renderer.setStyle(this.div,"background-position","-"+(this.posX*2)+"px -"+(this.posY*2)+"px");
    this.renderer.setStyle(this.div,"display","inline-block")
  
  }

  @HostListener('mouseout', ['$event'])
  onOut(evt) {
   this.renderer.setStyle(this.div,"display","none")
  
  }
}
