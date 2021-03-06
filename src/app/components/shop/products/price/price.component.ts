import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {

  @Input()
  priceFrom

  @Input()
  priceTo

  //public priceFrom: number = 750;
  //public priceTo: number = 1599;
  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();

  // define min, max and range
  public min : number = 100;
  public max : number = 1000;
  public range = [100,1000];

  constructor(private productService: ProductService) { }

  ngOnInit() {  }

  // rangeChanged
  priceChanged(event:any) {
    // setInterval(() => {
    //   this.priceFilters.emit(event);
    // }, 1000);
    
  

  }

  priceFilter() {
    this.productService.updateProductFilter("minPrice",this.priceFrom);
    this.productService.updateProductFilter("maxPrice",this.priceTo);
    this.productService.getProductsList();
    // this.priceFilters.emit({
    //   priceFrom: this.priceFrom,
    //   priceTo: this.priceTo
    // });
  }
}
