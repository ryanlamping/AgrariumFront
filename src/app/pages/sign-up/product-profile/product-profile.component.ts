import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
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
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})

export class ProductProfileComponent {
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
      clones: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.sellerUserId = params['userId'];
    });
  }

  showForm(): void {
    const selectedProduct = this.productForm.get('product_type')!.value;
    if (selectedProduct) {
      this._auth.getProductType(selectedProduct).subscribe(keys => {
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
  
    if (this.organolepticEvalKeys.length > 0) {
      const organolepticEvaluationGroup: { [key: string]: any } = {};
      this.organolepticEvalKeys.forEach(key => {
        organolepticEvaluationGroup[key] = [''];
      });
      this.productForm.addControl('organolepticEvaluation', this.fb.group(organolepticEvaluationGroup));
    }
  }

  deleteProduct(index: number): void {
    this.productForms.splice(index, 1);
  }  

  onSubmit(): void {
    let formData = this.productForm.value;
    delete formData.product_type;

    formData = {
      name: this.sellerUserId,
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
        mold: formData.mold || 0,
        overFermented: formData.overFermented || 0,
        fuel: formData.fuel || 0,
        bitterness: formData.bitterness || 0,
        astringency: formData.astringency || 0,
        flowerly: formData.flowerly|| 0,
        freshFruit: formData.freshFruit || 0,
        dryFruit: formData.dryFruit|| 0,
        sweet: formData.sweet || 0,
        cocoa: formData.cocoa || 0,
        pleasantAroma: formData.pleasantAroma || 0,
        other: formData.other || 0,
        flavorInMouth: formData.flavorInMouth || 0,
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
