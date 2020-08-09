import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-widgets-two',
  templateUrl: './shopping-widgets-two.component.html',
  styleUrls: ['./shopping-widgets-two.component.sass']
})
export class ShoppingWidgetsTwoComponent implements OnInit {

  products: Product[];
  indexProduct: number;

  public sidenavMenuItems:Array<any>;

  @Input() shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService, public productService: ProductService) { }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }


  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

}
