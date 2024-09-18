import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LegalComponent } from './pages/legal/legal.component';
import { SupportComponent } from './pages/support/support.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TestComponent } from './test/test.component';

import { BuyerProfileComponent } from './pages/sign-up/buyer-profile/buyer-profile.component';
import { SellerProfileComponent } from './pages/sign-up/seller-profile/seller-profile.component';
import { UserSignUpComponent } from './pages/sign-up/user-signup.component';
import { UserLoginComponent } from './pages/log-in/log-in.component';
import { ProductProfileComponent } from './pages/sign-up/product-profile/product-profile.component';
import { TransactionProfileComponent } from './pages/sign-up/trans-profile/trans-profile.component';
import { BuyerTransactionProfileComponent } from './pages/sign-up/buyer-trans-profile/buyer-trans-profile.component';
import { ReviewSubmitComponent } from './pages/sign-up/review/review.component';
import { BuyerReviewSubmitComponent } from './pages/sign-up/buyer-review/buyer-review.component';
import { EmailVerificationPageComponent } from './pages/sign-up/email-verification-page/email-verification-page.component';
import { BuyerEmailVerificationComponent } from './pages/sign-up/buyer-email-verification/buyer-email-verification.component';
import { AccountReviewComponent } from './pages/sign-up/account-under-review/account-under-review.component';

import { ChartComponent } from './chart/chart.component';
import { ProductComponent } from './product/product.component';
import { CustomerDashComponent } from './pages/customer-dash/customer-dash.component';

import { MyShopComponent } from './pages/my-shop/my-shop.component';
import { CartMenuComponent } from './components/cart-menu/cart-menu.component'; 
import { CartShippingDetailsComponent } from './pages/cart-shipping-details/cart-shipping-details.component';
import { CartPaymentComponent } from './pages/cart-payment/cart-payment.component';
import { CartConfirmationComponent } from './pages/cart-confirmation/cart-confirmation.component';
import { CartOrderManagementComponent } from './pages/cart-order-management/cart-order-management.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { UploadProductsComponent } from './pages/upload-products/upload-products.component';
import { AdminDashComponent } from './pages/admin-dash/admin-dash.component';
import { TotalSalesComponent } from './dashboard charts/total-sales/total-sales.component';
import { TotalOrdersComponent } from './dashboard charts/total-orders/total-orders.component';
import { SalesByProductComponent } from './dashboard charts/sales-by-product/sales-by-product.component';
import { OrdersByProductComponent } from './dashboard charts/orders-by-product/orders-by-product.component';
import { OrdersByLocationComponent } from './dashboard charts/orders-by-location/orders-by-location.component';
import { SalesByLocationComponent } from './dashboard charts/sales-by-location/sales-by-location.component';
import { TotalSalesSupComponent } from './dashboard charts/total-sales-sup/total-sales-sup.component';
import { TotalOrdersSupComponent } from './dashboard charts/total-orders-sup/total-orders-sup.component';
import { SellerDashComponent } from './seller-dash/seller-dash.component';
import { TotalSalesSupplierComponent } from './seller charts/total-sales-supplier/total-sales-supplier.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search', component: SearchComponent},
  { path: 'terms-of-service', component: TermsOfServiceComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'legal', component: LegalComponent},
  { path: 'support', component: SupportComponent},
  { path: 'test', component: TestComponent},
  { path: 'sign-up', component: UserSignUpComponent},
  { path: 'log-in', component: UserLoginComponent},
  { path: 'product-profile', component: ProductProfileComponent},
  { path: 'trans-profile', component: TransactionProfileComponent},
  { path: 'buyer-trans-profile', component: BuyerTransactionProfileComponent},
  { path: 'review', component: ReviewSubmitComponent},
  { path: 'buyer-review', component: BuyerReviewSubmitComponent},
  { path: 'email-verification-page', component: EmailVerificationPageComponent},
  { path: 'buyer-email-verification', component: BuyerEmailVerificationComponent},
  { path: 'buyer-profile', component: BuyerProfileComponent},
  { path: 'seller-profile', component: SellerProfileComponent},
  { path: 'account-under-review', component: AccountReviewComponent},
  { path: 'test', component: TestComponent},
  { path: 'chart', component: ChartComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'email-verification-page', component: EmailVerificationPageComponent},
  { path: 'my-shop', component: MyShopComponent}, //MyShop tab goes to MyCart tab in side menu
  { path: 'cart-menu', component: CartMenuComponent},
  { path: 'my-cart', component: MyCartComponent},
  { path: 'shipping-details', component: CartShippingDetailsComponent},
  { path: 'payment', component: CartPaymentComponent},
  { path: 'confirmation', component: CartConfirmationComponent},
  { path: 'order-management', component: CartOrderManagementComponent},
  { path: 'customer-dash', component: CustomerDashComponent},  // update this to include customer id
  { path: 'upload-products', component: UploadProductsComponent}
  { path: 'customer-dash', component: CustomerDashComponent},
  { path: 'admin-dash', component: AdminDashComponent},
  // remember to change
  { path: 'total-sales', component: TotalSalesComponent},
  { path: 'total-orders', component: TotalOrdersComponent},
  { path: 'sales-by-product', component: SalesByProductComponent},
  { path: 'orders-by-product', component: OrdersByProductComponent},
  { path: 'orders-by-location', component: OrdersByLocationComponent},
  { path: 'sales-by-location', component: SalesByLocationComponent},
  { path: 'sales-by-sup', component: TotalSalesSupComponent},
  { path: 'orders-by-sup', component: TotalOrdersSupComponent},
  { path: 'seller-dash', component: SellerDashComponent},
  { path: 'total-sales-sup', component: TotalSalesSupplierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }