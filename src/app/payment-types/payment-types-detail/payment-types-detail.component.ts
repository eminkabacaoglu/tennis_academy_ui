import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../shared/alertify.service';
import { PaymentTypeService } from './../payment-type.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-types-detail',
  templateUrl: './payment-types-detail.component.html',
  styleUrls: ['./payment-types-detail.component.css'],
  providers:[PaymentTypeService]
})
export class PaymentTypesDetailComponent  implements OnInit{


  paymentType:any
  paymentTypeUpdated:any
  paymentTypeForm:FormGroup;
  constructor(private paymentTypeService:PaymentTypeService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.paymentTypeForm = new FormGroup({
      description : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
      // paymentType: new FormControl("",[Validators.required]),
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.paymentTypeService.getPaymentTypeById(params["paymentTypeId"]).subscribe(data=>{
        this.paymentType=data
        if(this.paymentType==null){
          this.router.navigate(["/payment-types"])
        }
        console.log(this.paymentType)
        this.paymentTypeForm.patchValue({
          description:this.paymentType.description,

        })
      
      })
    })  
  }


  updatePaymentType(){
    
    if(this.paymentTypeForm.valid){
      this.paymentTypeUpdated=Object.assign({},this.paymentTypeForm.value)
      console.log(this.paymentTypeUpdated)
    }

    this.paymentTypeService.updatePaymentType(this.paymentType.id,this.paymentTypeUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/payment-types"+"/"+data.id])

    });
  }

  deletePaymentDetail(){
    
    this.paymentTypeService.deletePaymentType(this.paymentType.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/payment-types"])

    });
  }
}