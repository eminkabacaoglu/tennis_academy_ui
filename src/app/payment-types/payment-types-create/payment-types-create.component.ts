import { Router } from '@angular/router';
import { AlertifyService } from './../../shared/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentTypeService } from './../payment-type.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-types-create',
  templateUrl: './payment-types-create.component.html',
  styleUrls: ['./payment-types-create.component.css'],
  providers:[PaymentTypeService]
})
export class PaymentTypesCreateComponent {


  paymentType:any

  constructor(private paymentTypeService:PaymentTypeService, private alertify:AlertifyService,private router:Router){}

  paymentTypeForm = new FormGroup({
    description : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
    // paymentType: new FormControl("",[Validators.required]),
  })

  createPaymentType(){
    
    if(this.paymentTypeForm.valid){
      this.paymentType=Object.assign({},this.paymentTypeForm.value)
    }

    this.paymentTypeService.createPaymentType(this.paymentType).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/payment-types"+"/"+data.id])

    });
  }

}
