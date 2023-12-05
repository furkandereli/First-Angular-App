import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, delay, exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../authentication/auth.service";
import { environment } from "src/environments/environment.development";


//local service
@Injectable()
export class ProductService{
    private url = environment.url;

    constructor(private http : HttpClient, private authService : AuthService){

    }

    getProducts(categoryId : number) : Observable<Product[]> {
        return this.http
        .get<Product[]>(this.url + "products.json")
        .pipe(
            map(data => {
                const products : Product[] = [];
                for(const key in data){
                    if(categoryId){
                        if(categoryId == data[key].categoryId)
                        {
                            products.push({ ...data[key], id : key});
                        }
                    }
                    else{
                        products.push({ ...data[key], id : key});
                    }
                  }

                return products;
            }),
            tap(data => console.log(data)),
            delay(300)
        );
    }

    getProductById(id : string) : Observable<Product> {
        return this.http.get<Product>(this.url + "products/" + id + ".json").pipe(delay(300));
    }

    createProduct(product : Product) : Observable<Product>{
        return this.authService.user.pipe(
            take(1),
            tap(user => console.log(user)),
            exhaustMap(user =>{
                return this.http.post<Product>(this.url + "products.json?auth=" + user?.token, product);
            })
        );
    }
}
