import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product : Product | undefined;
  loading : boolean = false;

  constructor(private route : ActivatedRoute, private productService : ProductService) {
  }

  ngOnInit():void{
    this.route.params.subscribe(params => {
      const id = params["productId"];
      this.loading = true;

      this.productService.getProductById(id).subscribe(result => {
        this.product = {...result, id : id }
        this.loading = false;
      });
    });
  }
}
