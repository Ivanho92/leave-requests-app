import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditFormComponent },
  { path: 'add', component: AddFormComponent },
  { path: 'homepage', component: LeaveRequestsComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
