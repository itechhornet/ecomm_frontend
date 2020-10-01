import { Component, OnInit ,Input} from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  @Input() 
  category : string;
   
  public selectedItems : any =[];
  //public category : any = [{name:"Tights",id:1},{name:"Night suits",id:2},{name:"Leggings",id:3},
  //{name:"Dresses",id:4},
  //{name:"Sarees",id:5},{name:"Kurtas",id:6}];

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }
  selectChange(e){
    let categories = e.map(v=>v.value);
    this.productService.updateProductFilter("subCategory",categories);
    this.productService.getProductsList();
    //this.productService.updateProducts();
  }

}
