import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers : [CategoryService]
})
export class CategoryCreateComponent implements OnInit{

  constructor(private categoryService : CategoryService, private router : Router) { }

  ngOnInit(): void {

  }

  saveCategory(name : any){
    this.categoryService.createCategory({ id : 0, name : name.value }).subscribe(data => {
      this.router.navigate(["/products"]);
    });
  }
}
