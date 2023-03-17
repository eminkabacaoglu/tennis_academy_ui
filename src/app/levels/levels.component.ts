import { LevelService } from './level.service';
import { Component, OnInit } from '@angular/core';
import { Level } from './level.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
  providers:[LevelService]
})
export class LevelsComponent implements OnInit{
  levels:Level[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private levelService:LevelService, private activatedRoute:ActivatedRoute){}
  
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
    this.levelService.getLevels().subscribe(data=>{
      this.levels = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}

