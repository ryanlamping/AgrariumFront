// use this component if you want to test certain features, will be deleted before production

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ProductService } from 'src/services/product.service';
import { ProductType } from 'src/app/interfaces/product-type'
import { Product } from '../interfaces/proudct';
import { Cacao } from '../interfaces/cacao';
import { ContinentCountries } from '../interfaces/continent-countries';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './test.component.html',

})

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  dataset: number[] = [0, 0, 0, 0, 0]; // Initialize dataset with zeros
  product: Cacao | null = null;

  constructor(private productService: ProductService) {}

  fetchProductsAndUpdate(): void {
    this.productService.getProductsByCountryType('Ecuador', 'ca').subscribe(
      (products: Cacao[]) => {
        // Update product variable with the first product from the array
        this.product = products[0];

        // Update dataset with attribute values of the product
        this.updateDatasetWithProductAttributes();

        // Create Bar Chart here
        this.createBarChart();
      },
      (error) => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  updateDatasetWithProductAttributes(): void {
    console.log(this.product);
    if (this.product) {
      // Update dataset array with attribute values of the product
      this.dataset = [
        this.product.mongodbData.organolepticEvaluation.astringency.clones,
        this.product.mongodbData.organolepticEvaluation.bitterness.clones,
        this.product.mongodbData.organolepticEvaluation.freshFruit.clones,
        this.product.mongodbData.organolepticEvaluation.sweet.clones,
        this.product.mongodbData.organolepticEvaluation.mold.clones
      ];
      console.log(this.dataset);
    }
  }

  createBarChart(): void {
    // Create Bar Chart using Chart.js or any other library
    // Use this.dataset as the data for the chart
  }
}