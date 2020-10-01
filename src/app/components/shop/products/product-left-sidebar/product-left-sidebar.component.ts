import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'list';
  public viewCol: number = 33.3;
  public colorFilters :   ColorFilter[] = [];
  public products_list:any=[];
  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public categorys :any;
  public priceFrom :string;
  public priceTo :string;
  public selectedCat :any;
  public productTotal:any;
  pageEvent: PageEvent;

  public colorArray : any = [];//[{code:"red",selected:false},
  //{code:"blue",selected:false},{code:"green",selected:false},{code:"black",selected:false}];

  public sizes :any;//= [{size:"X",selected:false},{size:"XL",selected:false},{size:"M",selected:false}];

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCat = params['category'];
        this.updateProducts();
      
      }
    )
  }

  updateProducts(){
    this.productService.getProductsList(this.selectedCat);
    this.productService.productList.subscribe(products => {
       //this.products = products.slice(0.8);
       this.products_list = products["data"]["categoryDto"]["productDto"];
       this.categorys = products['data']['categoryDto']['childCategory'];
       this.allItems = this.products_list;

       if(this.productService.productFilter["minPrice"] ==undefined ||
        this.productService.productFilter["minPrice"] ==""){
          this.priceFrom = products['data']['categoryDto']['minPrice'];
        }

        if(this.productService.productFilter["maxPrice"] ==undefined ||
        this.productService.productFilter["maxPrice"] ==""){
          this.priceFrom = products['data']['categoryDto']['maxPrice'];
        }
       this.productTotal=products['data']['categoryDto']['totalProduct'];
       this.setSize(products);
       this.setColor(products);
       //this.setColor(products)
        })
  }

    public changePage(event){
      this.productService.updateProductFilter("page",event["pageIndex"]);
      this.productService.updateProductFilter("pageSize",event["pageSize"]);
      this.updateProducts();

    }
  
     public colorSelect(e){
      let selectedColor = this.colorArray.filter(function(obj){
        if(obj.selected)
        return obj.code;
      });
      this.productService.updateProductFilter("color",selectedColor.map(ob=>ob.code));
      this.updateProducts();
     }

     public sizeSelect(e){
      let selectedsizes = this.sizes.filter(function(obj){
        if(obj.selected)
        return obj.value;
      });
      this.productService.updateProductFilter("size",selectedsizes.map(ob=>ob.value));
      this.updateProducts();
     }


     public setColor(products){
      
      let tempColor = [];
        for(let i in products["data"]["categoryDto"]["color"]){

          let tmColor = {code:products["data"]["categoryDto"]["color"][i]["colorCode"],
          value:products["data"]["categoryDto"]["color"][i]["colorName"],
          selected:false}

          if(this.productService.checkFilterOptionExist("color",products["data"]["categoryDto"]["color"][i]["colorCode"])){
            tmColor.selected = true;
          }

          tempColor.push(tmColor);
        }
        this.colorArray = tempColor;
     }

     public setSize(products){

      let tempSize = [];
        for(let i in products["data"]["categoryDto"]["size"]){
          let tmsize = {size:products["data"]["categoryDto"]["size"][i]["displayName"],
          value:products["data"]["categoryDto"]["size"][i]["sizeName"],
          selected:false}

          if(this.productService.checkFilterOptionExist("size",products["data"]["categoryDto"]["size"][i]["sizeName"])){
            tmsize.selected = true;
          }
          tempSize.push(tmsize);
        }
        this.sizes = tempSize;
     }

     // Get current product tags
     public getTags(products) {
      var uniqueBrands = []
      var itemBrand = Array();
      products.map((product, index) => {
         if(product.tags) {
            product.tags.map((tag) => {
            const index = uniqueBrands.indexOf(tag);
            if(index === -1)  uniqueBrands.push(tag);
         })
        }
      });
      for (var i = 0; i < uniqueBrands.length; i++) {
           itemBrand.push({brand:uniqueBrands[i]})
      }
      this.tags = itemBrand
   }

     // Get current product colors
     public getColors(products) {
      var uniqueColors = []
      var itemColor = Array();
      products.map((product, index) => {
        if(product.colors) {
        product.colors.map((color) => {
            const index = uniqueColors.indexOf(color);
            if(index === -1)  uniqueColors.push(color);
        })
       }
      });
      for (var i = 0; i < uniqueColors.length; i++) {
           itemColor.push({color:uniqueColors[i]})
      }
      this.colors = itemColor
   }

  ngOnInit() {

    console.log(this.colors);
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
    // Animation Effect fadeIn
    public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

    // Update tags filter
    public updateTagFilters(tags: any[]) {
      this.tagsFilters = tags;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



    // sorting type ASC / DESC / A-Z / Z-A etc.
    public onChangeSorting(val) {
      this.sortByOrder = val;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
   }

     // Initialize filetr Items
  public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
        const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
          if(item.colors){
            if (item.colors.includes(curr.color)) {
              return prev && true;
            }
          }
        }, true);
        const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
          if(item.tags) {
            if (item.tags.includes(curr)) {
              return prev && true;
            }
          }
        }, true);
        return Colors && Tags; // return true
    });

}

public onPageChanged(event){
  this.page = event;
  this.allItems;
  window.scrollTo(0,0);
}


  // Update price filter
//   public updatePriceFilters(price: any) {
//     let items: any[] = [];
//     this.products.filter((item: Product) => {
//         if (item.price >= price[0] && item.price <= price[1] )  {
//            items.push(item); // push in array
//         }
//     });
//     this.items = items;
// }


  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);


   this.allItems = this.products.filter((item: Product) => {
     return item.price >= price.priceFrom && item.price <= price.priceTo
    });
     console.log(this.products);

}

onBrendsChanged(newBrend) {
  console.log(newBrend);
  this.allItems = newBrend === 'all' ? this.products : this.products.filter(

    item => item.brand === newBrend
  )
  console.log(this.allItems);


}
}
