import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PaymentType } from './payment-type.model';
import { Component, OnInit } from '@angular/core';
import { PaymentTypeService } from './payment-type.service';

@Component({
  selector: 'app-payment-types',
  templateUrl: './payment-types.component.html',
  styleUrls: ['./payment-types.component.css'],
  providers:[PaymentTypeService]
})
export class PaymentTypesComponent implements OnInit{
  paymentTypes:PaymentType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private paymentTypeService:PaymentTypeService, private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.dtOption={
      pagingType:"full_numbers",
      search:true,
      lengthChange:true,
      paging:true,

    }
    this.loadData();

  }

  loadData(){
    this.paymentTypeService.getPaymentTypes().subscribe(data=>{
      this.paymentTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}
