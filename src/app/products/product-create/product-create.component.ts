import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers : [CategoryService]
})

export class ProductCreateComponent implements OnInit{

  categories : Category[] = [];
  error : string = "";
  model : any = {
    name : "Iphone 17",
    categoryId : "0"
  };
  //two-way binding

  constructor(private productService : ProductService,
    private categoryService : CategoryService,
    private router : Router
    ){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data =>{
      this.categories = data;
    });
  }

  saveProduct(form : NgForm){

    console.log(this.model);

    const extensions = ["jpeg","png","jpg"];
    const extension = this.model.imgUrl.split(".").pop();

    if(extensions.indexOf(extension) == -1)
    {
      this.error = "Fotoğraf uzantisi sadece jpeg, png, jpg olabilir !";
      return;
    }

    if(this.model.categoryId == "0")
    {
      this.error = "Kategori seçmelisiniz !";
      return;
    }

      const product =
      {
        id : 1,
        name : this.model.name,
        price : this.model.price,
        imgUrl : this.model.imgUrl,
        description : this.model.description,
        isActive : this.model.isActive,
        categoryId : this.model.categoryId
      }

      if(form.valid)
      this.productService.createProduct(product).subscribe(data => this.router.navigate(["/products"]));
      else
      this.error = "Formu kontrol ediniz !";
    }
}
