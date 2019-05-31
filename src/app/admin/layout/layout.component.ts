import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {

  fullname: string;

  constructor(
    private router: Router
  ) {
    
   }

  ngOnInit() {
    this.fullname = sessionStorage.getItem('fullname');
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');
    this.router.navigateByUrl('login');
  }

}
