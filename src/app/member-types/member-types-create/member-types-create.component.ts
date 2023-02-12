import { PaymentType } from './../../payment-types/payment-type.model';
import { PaymentTypeService } from './../../payment-types/payment-type.service';
import { AlertifyService } from './../../shared/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberTypeService } from './../member-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-types-create',
  templateUrl: './member-types-create.component.html',
  styleUrls: ['./member-types-create.component.css'],
  providers:[MemberTypeService,PaymentTypeService]
})
export class MemberTypesCreateComponent implements OnInit{
  
  

  myData: any;
  memberType:any;
  paymentTypes:PaymentType[];

  constructor(private memberTypeService:MemberTypeService,private router:Router,private alertify:AlertifyService,private paymentTypeService:PaymentTypeService){}


  
  ngOnInit(): void {
    this.paymentTypeService.getPaymentTypes().subscribe(data=>{
      this.paymentTypes =data;
   })
    
  }

  memberTypeForm = new FormGroup({
    typeCode : new FormControl("",[Validators.required, Validators.minLength(3)]),
    description : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
    // paymentType: new FormControl("",[Validators.required]),
  })

  createMemberType(){


    if(this.memberTypeForm.valid){
      this.memberType=Object.assign({},this.memberTypeForm.value)
    }

    this.memberTypeService.createMemberType(this.memberType).subscribe(data=>{
        this.alertify.success("Kaydedildi")
        this.router.navigate(["/member-types"+"/"+data.id])

      });
  }
}