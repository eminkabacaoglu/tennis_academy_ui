import { ModuleTypeService } from './module-type.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModuleType } from './module-type.model';

@Component({
  selector: 'app-module-types',
  templateUrl: './module-types.component.html',
  styleUrls: ['./module-types.component.css'],
  providers:[ModuleTypeService]
})
export class ModuleTypesComponent implements OnInit{
  moduleTypes:ModuleType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private moduleTypeService:ModuleTypeService, private activatedRoute:ActivatedRoute){}

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
    this.moduleTypeService.getModuleTypes().subscribe(data=>{
      this.moduleTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}
