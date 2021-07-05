import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  { path: '',   redirectTo: '/homepage', pathMatch: 'full' }, // redirect to `home-component`
  { path: 'homepage', component: HomeComponent },
  { path: 'payment/:id', component: PaymentComponent }, // Wildcard route for a 404 page
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
