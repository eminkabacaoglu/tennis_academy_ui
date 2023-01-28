import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'members', pathMatch:'full'},
  {path: 'members',component:MembersComponent},
  {path: 'members/create',component:MemberCreateComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
