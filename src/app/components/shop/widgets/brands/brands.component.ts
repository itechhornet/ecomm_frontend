import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  // brands: string[] = ['all', 'Lenovo', 'Dell', 'Dell', 'Lg', 'Samsung'];
  //brands: string[] = ['Brand-1', 'Brand-2', 'Brand-3', 'Brand-4', 'Brand-5'];


  public brands : any = [{name:"Brand-1",id:1},{name:"Brand-2",id:2},{name:"Brand-3",id:3},
  {name:"Brand-5",id:4}];

  @Output() brandChanged = new EventEmitter();
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }


  selectChange(e){
    let categories = e.map(v=>v.value);
    this.productService.updateProductFilter("brands",categories);
  }

}
