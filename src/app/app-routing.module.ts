import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  // providing paths to respective pages
  { path: '',   redirectTo: '/homepage', pathMatch: 'full' }, // redirect to homepage
  { path: 'homepage', component: HomeComponent },// direct to home page
  { path: 'payment/:id', component: PaymentComponent }, // direct to payment page
  { path: '**', component: PagenotfoundComponent },// Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
