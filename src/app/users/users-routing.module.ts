import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { UserGuardService } from '../shared/user-guard.service';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivate: [UserGuardService],
    children: [
      {path: 'main', component: MainComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '', redirectTo: 'main', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
