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
  dctData:any = {}


  constructor(private server: ServerService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  goHome() {
    console.log(this.strCustName);
  
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
          
        }
        else {
          this.toastr.error('Failed' ,'Error')
        }
      })
    }
    
  }

}
