import { Component, OnInit } from '@angular/core';
import { FieldTypesService } from './field-types.service';
import { FieldType } from './field-type.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-field-types',
  templateUrl: './field-types.component.html',
  styleUrls: ['./field-types.component.css'],
  providers:[FieldTypesService]
})
export class FieldTypesComponent implements OnInit{
  fieldTypes:FieldType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private fieldTypesService:FieldTypesService, private activatedRoute:ActivatedRoute){}
  
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
    this.fieldTypesService.getFieldTypes().subscribe(data=>{
      this.fieldTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}


