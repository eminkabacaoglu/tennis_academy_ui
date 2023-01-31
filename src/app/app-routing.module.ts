import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'members', pathMatch:'full'},
  {path: 'members',component:MembersComponent},
  {path: 'members/create',component:MemberCreateComponent},
  {path: 'members/:memberId',component:MemberDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules,
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
