import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConverterComponent } from './converter/converter.component';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'conversion',
    pathMatch: 'full',
  },*/
  { path: 'login',  component: LoginComponent },
  { path: '',  component: ConverterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
