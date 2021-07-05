
import {Component,OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentUrl: any;
  strikeCheckout: any = null;
  strName: any
  dblAmount: any
  strInvoice: any
  intId: any
  blnPayment: any = true;

  constructor(public router: Router,
  public server:ServerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.stripePaymentGateway();
    this.paymentUrl = this.router.url.split('/')[2];
    // passing the unique id of the customer to retrieve invoice data from the backend
    this.server.getData('home/payment/'+String(this.paymentUrl)).subscribe((res) => {
      if (res['status'] == 1) {
        //declaring variables
        this.strName = res['data']['vchr_cust_name']
        this.dblAmount = res['data']['dbl_amt']
        this.strInvoice = res['data']['vchr_invoice_id']
        this.intId = res['data']['pk_bint_id']
        
        
      }
      else {
        this.blnPayment =false
      }
    })
    
  }
  // stripe payment window starts here
  checkout(amount:any) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: '//stripe api key to be provided here//',
      locale: 'auto',
      currency: 'inr',
      token: (token:any) => {
        this.saveData()
    
    }
    });
    
  
    strikeCheckout.open({
      name: 'Invoice Payment',
      description: 'Invoice Id : '+String(this.strInvoice),
      amount: amount * 100
    });
  }
  //stripe window ends here
  
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";
      
      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: '//stripe key to be preovided here//',
          locale: 'auto',
          token: (token:any) => {
            this.saveData()
            
          }
        });
      }
      
      window.document.body.appendChild(scr);
    }
  }
  
  // after successfull payemnt, updation of invoice_master to be followed
  saveData() {
    this.server.postData('home/save_payment', {'intId':this.intId}).subscribe((res:any) => {
          if (res['status'] == 1) {
            this.toastr.success('Paid Successfully')
          }
          else {
            this.toastr.error('Payment Not Successfull','Error')
          }
        })
    
  }
}
