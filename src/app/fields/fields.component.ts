import { Component, OnInit } from '@angular/core';
import { FieldService } from './field.service';
import { ActivatedRoute } from '@angular/router';
import { Field } from './field.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  providers:[FieldService]
})
export class FieldsComponent implements OnInit{
  fields:Field[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private fieldService:FieldService, private activatedRoute:ActivatedRoute){}
  
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
    this.fieldService.getFields().subscribe(data=>{
      this.fields = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}