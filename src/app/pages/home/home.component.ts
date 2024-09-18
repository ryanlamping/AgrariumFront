import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * @component Home
 * @description Represents the home component of the application.
 * @selector app-home
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

/** 
 * Home Component class
 */
export class HomeComponent {

//     /**
//    * @description Array of background image URLs.
//    * @type {string[]}
//    */
//   backgroundImages: string[] = [];

//    /**
//    * @description Index of the currently displayed background image.
//    * @type {number}
//    */
//   currentBackgroundIndex = 0;

//     /**
//    * @description Lifecycle hook that is called after data-bound properties of the directive are initialized.
//    */
//   ngOnInit(): void {
//     this.backgroundImages = [
//       '/assets/images/main/main1.jpg',
//       '/assets/images/main/main2.jpg',
//       '/assets/images/main/main3.jpg',
//       '/assets/images/main/main4.jpg',
//       '/assets/images/main/main5.jpg'
//     ];

//     this.preloadImages(this.backgroundImages).then(() => {
//       setInterval(() => {
//         this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgroundImages.length;
//       }, 2000);
//     });
//   }


//   // remove flickering by preloading images?

//     /**
//    * @description Preloads the given array of image URLs.
//    * @param {string[]} imageUrls - Array of image URLs to be preloaded.
//    * @returns {Promise<void[]>} A promise that resolves when all images are preloaded.
//    */

//   preloadImages(imageUrls: string[]): Promise<void[]> {
//     const promises: Promise<void>[] = [];

//     imageUrls.forEach((url) => {
//       const img = new Image();
//       const promise = new Promise<void>((resolve) => {
//         img.onload = () => resolve();
//       });

//       img.src = url;
//       promises.push(promise);
//     });
//     return Promise.all(promises);
//   }
// }

}
