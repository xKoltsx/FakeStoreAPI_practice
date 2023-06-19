import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CartService } from "src/app/service/cart.service";
import {ApiService} from "../service/api.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService, private cartService : CartService) {}

  products: any[] = []; // Змінна products тепер має тип масиву


  ngOnInit(){
    this.apiService.getProduct().subscribe(res=>{
      this.products = res;
      this.products.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });
    });
  }

  getProductByCategory(event: any) {
    this.http.get(`https://fakestoreapi.com/products/category/${event.target.value}`).subscribe(
      (data: any) => {
        this.products = data; // Присвоїть отримані дані до масиву products
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getProductds(){
    this.http.get<any>("https://fakestoreapi.com/products").subscribe(
      (data: any) => {
        this.products = data; // Присвоїть отримані дані до масиву products
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  addToCart(item:any){
    this.cartService.addtoCart(item);
    console.log(item);
  }

}
