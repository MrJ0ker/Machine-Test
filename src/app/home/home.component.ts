import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  strCustName = "";
  strInvoiceId = "";
  strEmail = "";
  dblAmount = "";
  dctData: any = {}
  dctInvoiceData:any = {}
  blnData: boolean = false;


  constructor(private server: ServerService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    // calling get method to get the list of all the invoices to be paid by the customers

    this.server.getData('home/add_invoice').subscribe((res) => {
        
      if (res['status'] == 1) {
        this.blnData = true
        this.dctInvoiceData = res['invoice_data']
      }
      else {
        this.toastr.error('Failed' ,'Error')
      }
    })
  }
  // function which validates name ,email, amount, id of invoices and passes them to the backend to save in the invoice_master table
  goHome() {
  
    if (this.strCustName == '') {
      this.toastr.error('Provide Name','Error')
      
    }
    else if (this.strInvoiceId == '') {
      this.toastr.error('Provide Invoice Id','Error')
      
    }
    else if (this.strEmail == '') {
      this.toastr.error('Provide Email','Error')
      
    }
    else if (this.dblAmount == "") {
      this.toastr.error('Provide Amount','Error')
      
    }
    else {
      
      this.dctData['strCustName'] = this.strCustName
      this.dctData['strInvoiceId'] = this.strInvoiceId
      this.dctData['strEmail'] = this.strEmail
      this.dctData['dblAmount'] = this.dblAmount
      
      this.server.postData('home/add_invoice', this.dctData).subscribe((res) => {
        
        if (res['status'] == 1) {
          this.toastr.success('Invoice Created')
          this.dctInvoiceData = res['invoice_data']
        
          
        }
        else {
          this.toastr.error('Failed' ,'Error')
        }
      })
    }
    
  }
  // function which is called to send email to the customers who are yet to pay their respective invoice
  sendEmail() {
    this.server.getData('home/send_email').subscribe((res) => {
        
      if (res['status'] == 1) {
        this.toastr.success('Mail Sent')
        
        
      }
      else {
        this.toastr.error('Failed' ,'Error')
      }
    })
    
  }

}
