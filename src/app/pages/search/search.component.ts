import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Product } from 'src/app/interfaces/proudct';
import { ProductType } from 'src/app/interfaces/product-type';
import { ContinentCountries } from 'src/app/interfaces/continent-countries';
import { Cacao } from 'src/app/interfaces/cacao';
import { Chart} from 'chart.js';
import { DecimalPipe } from '@angular/common';
import { ChartComponent } from 'src/app/chart/chart.component';
import { Router } from '@angular/router';
import { ProductComponent } from 'src/app/product/product.component';



// Creating enum for sortChoice to ensure only one value is selected
enum SortChoice {
  Geographic = 'Geographic Origin',
  ProductType = 'Product Type',
  TopRated = 'Top Rated',
  DealsAndSales = 'Deals And Sales',
  Trending = 'Trending',
  New = 'New'
}

/**
 * @component Search
 * @description Represents the search component of the application.
 * @selector app-search
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    MatButtonModule, 
    MatRadioModule, 
    FormsModule, 
    MatButtonToggleModule, 
    MatIconModule,
    ChartComponent,
    ProductComponent
  ],
  providers: [
    DecimalPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

/** 
 * Search Component class
 */
export class SearchComponent {

  /**
   * @description Array of product types.
   * @type {ProductType[]}
   */
  types: ProductType[] = [];

   /**
   * @description Array of products.
   * @type {Product[]}
   */
  products: Cacao[] = [];

   /**
   * @description Array of continents.
   * @type {string[]}
   */
  continents: string[] = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania" ];

  /**
   * @description Array of continent countries.
   * @type {ContinentCountries[]}
   */
  countries: ContinentCountries[] = [];

    /**
   * @description Selected continent country object.
   * @type {ContinentCountries | null}
   */
  countryO: ContinentCountries | null = null;
  countryIcon: ContinentCountries | null = null;
  typeChoiceO: ProductType | null = null;

    /**
   * @description Selected country name.
   * @type {any | null}
   */

  country: any | null = null;
  

  /**
   * @description Selected product type.
   * @type {string | null}
   */

  typeChoice: ProductType | null=null;

  items: string | null = null;

   /**
   * @description Enum for sort choice.
   * @type {SortChoice}
   */
  sortChoiceEnum = SortChoice;

    /**
   * @description Array of enum values for icons.
   * @type {SortChoice[]}
   */
  icons: SortChoice[] = Object.values(SortChoice);  // array of enum values for icons

  /**
   * @description Selected sort choice.
   * @type {SortChoice | null}
   */

  sortChoice: SortChoice | null = null;  // initialize to blank

  /**
   * @description Selected continent choice.
   * @type {string | null}
   */
  continentChoice: string | null = null;
  
  /**
   * @description Selected product choice.
   * @type {Product | null}
   */
  productChoice: Cacao | null = null;
  //productChoice: any | null = null;

   /**
   * @description State of the menu.
   * @type {boolean}
   */
  menu: Boolean = true;

  dataset = [];


    /**
   * @description Injects the product service.
   * @param {ProductService} productService - The product service to be injected.
   */

  // injecting the product service

  constructor(private productService: ProductService, private router: Router) {}  // inject the service
  
   /**
   * @description Updates the sortChoice variable based on the user's selection.
   * @param {SortChoice | null} selectedChoice - The selected sort choice.
   */

  // function to update the sortChoice variable based on what the user chooses 
  selectSortChoice(selectedChoice: SortChoice | null): void {
    this.sortChoice = selectedChoice;
    console.log("SortChoice: ", this.sortChoice)
    if (this.sortChoice === this.sortChoiceEnum.Geographic) {
      console.log("geo");
    }
    else if(this.sortChoice === this.sortChoiceEnum.ProductType) {
      this.productService.getProductTypes().subscribe(
        (data) => {
          this.types = data;
          console.log('data: ', data);
        },
        (error) => {
          console.error("Error fetching types: ", error);
        }
      );
    }
    else if(this.sortChoice = this.sortChoiceEnum.TopRated) {
      this.productService.getProductsByRating().subscribe(
        (data) => {
          this.products = data;
          console.log('products by rating: ', this.products);
        },
        (error) => {
          console.error("Error fetching products: ", error);
        }
      );
    }
  }

  /**
 * @description Updates the continentChoice variable based on the user's selection.
 * @param {string} continent - The selected continent.
 */

  // function to update the contientChoice variable based on what the user chooses 

  selectContinentChoice(continent: string): void {
    this.continentChoice = continent;
    console.log("ContinentChoice: ", this.continentChoice);
    this.productService.getCountriesByContinent(this.continentChoice).subscribe(
      (data) => {
        this.countries = data;
        console.log("countries:", this.countries)
        console.log("countries", this.countries[0].country_name)
      },
      (error) => {
        console.error("Error fetching countries: ", error)
      }
    );
  }

    /**
   * @description Updates the countryChoice variable based on the user's selection.
   * @param {ContinentCountries | null} selectedChoice - The selected continent country.
   */
    // function to update the countryChoice variable based on what the user chooses 

  selectCountryChoice(selectedChoice: ContinentCountries | null): void {
    console.log("input: ", selectedChoice);
    console.log("country: ", this.country);
    console.log("countryIcon: ", this.countryIcon);

    if(this.country === null) {
      this.country = this.countryIcon;
    }
    else if (this.countryIcon ===  null || this.countryIcon != this.country) {
      this.countryIcon = this.country;
    }

    console.log("select country choice called");
    if(selectedChoice?.country_name === this.countryO?.country_name) {
      console.log("would reset")
      this.countryO = null;
      this.country = null;
      this.countryIcon = null;
      this.typeChoice = null;
      this.typeChoiceO = null;
      this.productChoice = null;
      console.log("country", this.country);
      console.log("countryO", this.countryO);
    }
    else {
      this.countryO = selectedChoice;
      this.country = this.countryO?.country_name;
      console.log('Country Choice: ', this.country);
      this.productService.getTypeByCountry(this.country).subscribe(
        (data) => {
          this.types = data;
          console.log("types", this.types);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      ); 
    }
  }  

  /**
 * @description Updates the typeChoice variable based on the user's selection.
 * @param {string | null} selectedChoice - The selected product type.
 */
    // function to update the typeChoice variable based on what the user chooses 

  selectTypeChoice(selectedChoice: ProductType | null) {
    console.log("selected: ", selectedChoice?.type_id, "type:", this.typeChoice?.type_id);
    if(selectedChoice?.type_id === this.typeChoiceO?.type_id) {
      console.log("would reset");
      this.typeChoiceO = null;
      this.typeChoice = null;
    }
    else {
      this.typeChoiceO = selectedChoice;
      this.typeChoice = this.typeChoiceO;
      console.log('Type Choice: ', this.typeChoice);
      if(this.sortChoice === this.sortChoiceEnum.ProductType){
        console.log("chose to sort by type")
        this.productService.getProductsByType(this.typeChoice?.type_id).subscribe(
          (data) => {
            this.products = data;
            console.log(this.products);
          },
          (error) => {
            console.error('Error fetching products by type: ', error);
          }
        );
      }
      else {
        this.productService.getProductsByCountryType(this.country, this.typeChoice?.type_id).subscribe(
          (data) => {
            this.products = data;
            console.log("Products: ", this.products);
          },
          (error) => {
            console.error('Error fetching products: ', error);
          }
        );
      }
    }
  }

  // function to update the productChoice variable based on what the user chooses 

  /**
 * @description Updates the productChoice variable based on the user's selection.
 * @param {any | null} selectedChoice - The selected product.
 */


  selectProduct(selectedChoice: Cacao) {  
    this.productChoice = selectedChoice;
    if(this.productChoice) {
      this.productChoice.harvest_date = new Date(this.productChoice.harvest_date)
      console.log(this.productChoice.harvest_date);
    }
    console.log('product Choice: ', this.productChoice);
    this.onSelectProduct(this.productChoice);
  }

  onSelectProduct(product: Cacao) {
    console.log('Selected product:', product);
    const product_id = product.product_id;
    console.log(product_id);
    this.router.navigate(['/product', product_id]);
  }

    /**
   * @description Updates the menu variable based on the user's selection.
   */
  // function to update the menu variable based on what the user chooses 
  hideMenuToggle() {
    this.menu = !this.menu;
  }

  /**
   * @description Navigates back based on the current state.
   */

  back() {
    if (this.sortChoice === null) {
      this.sortChoice === null;
    }

    else if (this.sortChoice === this.sortChoiceEnum.Geographic && this.continentChoice === null) {
      this.sortChoice = null;
    }

    else if (this.sortChoice === this.sortChoiceEnum.Geographic && this.continentChoice != null && this.country === null && this.countryIcon === null) {
      this.continentChoice = null;
      this.country = null;
      this.countryIcon = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.Geographic && this.continentChoice != null && this.country != null && this.typeChoice === null) {
      this.country = null;
      this.countryIcon = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.Geographic && this.continentChoice != null && this.country != null && this.countryIcon != null && this.typeChoice != null && this.productChoice === null) {
      this.typeChoice = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.ProductType && this.typeChoice === null) {
      this.sortChoice = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.ProductType && this.typeChoice != null) {
      this.typeChoice = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.TopRated && this.productChoice === null) {
      this.sortChoice = null;
    }
    else if (this.sortChoice === this.sortChoiceEnum.TopRated && this.productChoice != null) {
      this.productChoice = null;
    }
  }

  clearSortChoice() {
    this.sortChoice = null;
    this.continentChoice = null;
    this.country = null;
    this.countryIcon = null
    this.countryO=null;
    this.typeChoice = null;
    this.typeChoiceO = null;
    this.productChoice = null;
    console.log(this.sortChoice);
  }
  clearContinent() {
    console.log("clear continent called");
    this.continentChoice = null;
    this.country = null;
    this.countryIcon = null;
    this.countryO=null;
    this.typeChoice = null;
    this.typeChoiceO = null;
    this.productChoice = null;
    console.log(this.continentChoice);
  }

}
