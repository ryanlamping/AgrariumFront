import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-upload-products',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    MatButtonModule, 
    MatRadioModule, 
    FormsModule, 
    MatButtonToggleModule,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.scss']
})
export class UploadProductsComponent {
    productForm!: FormGroup;
  typologyKeys: string[] = [];
  physicalEvaluationKeys: string[] = [];
  organolepticEvalKeys: string[] = [];
  organolepticEvalSubKeys: string[] = [];
  name: string | undefined;
  sellerUserId: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product_type: [''],
      naturalHybrid: [''],
      criollo: [''],
      national: [''],
      nationalClones: [''],
      wellFermented: [''],
      mediumFermented: [''],
      violets: [''],
      slate: [''],
      moho: [''],
      vulnerated: [''],
      aglomerades: [''],
      weightX100: [''],
      smoked: [''],
      mold: [''],
      overFermented: [''],
      fuel: [''],
      remarks: [''],
      bitterness: [''],
      astringency: [''],
      flowerly: [''],
      freshFruit: [''],
      dryFruit: [''],
      sweet: [''],
      cocoa: [''],
      pleasantAroma: [''],
      other: [''],
      flavorInMouth: [''],
      hybrid: [''],
      clones: [''],
      acidity: [''],
      altitude: [''],
      washed: ['']
    });

    // this.route.queryParams.subscribe(params => {
    //   this.sellerUserId = params['userId'];
    // });
  }

  showForm(): void {
    const selectedProduct = this.productForm.get('product_type')!.value;
    if (selectedProduct) {
        console.log("selected product", selectedProduct);
      this._auth.getProductType(selectedProduct).subscribe(keys => {
        console.log("selected product", selectedProduct);
        console.log("organolepticEvalKeys:", keys.organolepticEvalKeys);
        console.log("organolepticEvalSubKeys:", keys.organolepticEvalSubKeys)
        this.typologyKeys = keys.typologyKeys;
        this.physicalEvaluationKeys = keys.physicalEvaluationKeys;
        this.organolepticEvalKeys = keys.organolepticEvalKeys;
        this.organolepticEvalSubKeys = keys.organolepticEvalSubKeys;
  
        const form = document.querySelector('.modal-content');
        if (form) {
          form.classList.remove('hidden');
        }
      });
    }
  }

  productForms: FormGroup[] = []; 

  addNewProduct(): void {
    const newProductForm: FormGroup = this.fb.group({
      product_type: ['']
    });
    this.productForms.push(newProductForm);
    
  }

  generateForm(): void {
    // Clear existing form controls
    this.productForm.removeControl('typology');
    this.productForm.removeControl('physicalEvaluation');
    this.productForm.removeControl('organolepticEvaluation');
  
    // Generate the form controls based on the selected product
    if (this.typologyKeys.length > 0) {
      const typologyGroup: { [key: string]: any } = {};
      this.typologyKeys.forEach(typology => {
        typologyGroup[typology] = [''];
      });
      this.productForm.addControl('typology', this.fb.group(typologyGroup));
    }
  
    if (this.physicalEvaluationKeys.length > 0) {
      const physicalEvaluationGroup: { [key: string]: any } = {};
      this.physicalEvaluationKeys.forEach(key => {
        physicalEvaluationGroup[key] = [''];
      });
      this.productForm.addControl('physicalEvaluation', this.fb.group(physicalEvaluationGroup));
    }
  
    if (this.organolepticEvalKeys.length > 0 && this.organolepticEvalSubKeys.length > 0) {
        const organolepticEvaluationGroup: { [key: string]: any } = {};
      
        this.organolepticEvalKeys.forEach(evalKey => {
          const subKeyGroup: { [key: string]: any } = {};
          
          this.organolepticEvalSubKeys.forEach(subKey => {
            subKeyGroup[subKey] = ['']; // Add a form control for each subkey
          });
      
          organolepticEvaluationGroup[evalKey] = this.fb.group(subKeyGroup);
        });
      
        this.productForm.addControl('organolepticEvaluation', this.fb.group(organolepticEvaluationGroup));
      }

      
    // if (this.organolepticEvalKeys.length > 0) {
    //   const organolepticEvaluationGroup: { [key: string]: any } = {};
    //   this.organolepticEvalKeys.forEach(key => {
    //     organolepticEvaluationGroup[key] = [''];
    //   });
    //   this.productForm.addControl('organolepticEvaluation', this.fb.group(organolepticEvaluationGroup));
    // }
  }

  deleteProduct(index: number): void {
    this.productForms.splice(index, 1);
  }  

  onSubmit(): void {
    let formData = this.productForm.value;
    // delete formData.product_type;
    console.log(this._auth.getUserId());

    formData = {
      name: this._auth.getUserId(),
      productType: formData.product_type,
      typology: {
        naturalHybrid: formData.naturalHybrid || 0,
        criollo: formData.criollo || 0,
        national: formData.national || 0,
        nationalClones: formData.nationalClones || 0
      },
      physicalEvaluation: {
        wellFermented: formData.wellFermented || 0,
        mediumFermented: formData.mediumFermented || 0,
        violets: formData.violets || 0,
        slate: formData.slate || 0,
        moho: formData.moho || 0,
        vulnerated: formData.vulnerated || 0,
        aglomerades: formData.aglomerades || 0,
        weightX100: formData.weightX100 || 0,
        smoked: formData.smoked || 0,
        mold: formData.mold || 0,
        overFermented: formData.overFermented || 0,
        fuel: formData.fuel || 0,
        remarks: formData.remarks || 0,
      },
      organolepticEvaluation: {
        mold: {
          hybrid: formData.mold.hybrid || 1,
          criollo: formData.mold.criollo || 2,
          national: formData.mold.national || 4,
          clones: formData.mold.clones || 3
        },
        overFermented: {
          hybrid: formData.overFermented.hybrid || 5,
          criollo: formData.overFermented.criollo || 1,
          national: formData.overFermented.national || 1,
          clones: formData.overFermented.clones || 0
        },
        fuel: {
          hybrid: formData.fuel.hybrid || 2,
          criollo: formData.fuel.criollo || 0,
          national: formData.fuel.national || 1,
          clones: formData.fuel.clones || 0
        },
        bitterness: {
          hybrid: formData.bitterness.hybrid || 3,
          criollo: formData.bitterness.criollo || 4,
          national: formData.bitterness.national || 5,
          clones: formData.bitterness.clones || 0
        },
        astringency: {
          hybrid: formData.astringency.hybrid || 0,
          criollo: formData.astringency.criollo || 1,
          national: formData.astringency.national || 1,
          clones: formData.astringency.clones || 0
        },
        flowerly: {
          hybrid: formData.flowerly.hybrid || 4,
          criollo: formData.flowerly.criollo || 0,
          national: formData.flowerly.national || 2,
          clones: formData.flowerly.clones || 5
      },
        freshFruit: {
          hybrid: formData.freshFruit.hybrid || 1,
          criollo: formData.freshFruit.criollo || 0,
          national: formData.freshFruit.national || 0,
          clones: formData.freshFruit.clones || 0
      },
        dryFruit: {
          hybrid: formData.dryFruit.hybrid || 0,
          criollo: formData.dryFruit.criollo || 0,
          national: formData.dryFruit.national || 0,
          clones: formData.dryFruit.clones || 0
      },
        sweet: {
          hybrid: formData.sweet.hybrid || 0,
          criollo: formData.sweet.criollo || 0,
          national: formData.sweet.national || 0,
          clones: formData.sweet.clones || 0
      },
        cocoa: {
          hybrid: formData.mold.hybrid || 0,
          criollo: formData.mold.criollo || 0,
          national: formData.mold.national || 0,
          clones: formData.mold.clones || 0
      },
        pleasantAroma: {
          hybrid: formData.pleasantAroma.hybrid || 0,
          criollo: formData.pleasantAroma.criollo || 0,
          national: formData.pleasantAroma.national || 0,
          clones: formData.pleasantAroma.clones || 0
      },
        other: {
          hybrid: formData.other.hybrid || 0,
          criollo: formData.other.criollo || 0,
          national: formData.other.national || 0,
          clones: formData.other.clones || 0
      },
        flavorInMouth: {
          hybrid: formData.flavorInMouth.hybrid || 0,
          criollo: formData.flavorInMouth.criollo || 0,
          national: formData.flavorInMouth.national || 0,
          clones: formData.flavorInMouth.clones || 0
      }
      }
    };

    console.log('formData:', formData);
  
    this._auth.saveProduct(formData).subscribe(
      (response) => {
        console.log('Product saved successfully:', response);
        this.notificationService.showNotification('Product saved successfully! Please click next to review & submit.');
      },
      (error) => {
        console.error('Error saving product:', error);
      }
    );
}
}  
