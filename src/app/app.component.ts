
import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/product.service';
import { AuthService } from './authentication/auth.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent implements OnInit{

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    console.log(environment.production);
    console.log(environment.adminEmail);
  }
}
