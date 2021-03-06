import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  providers: []
})
export class Page1Component implements OnInit {
  users: any = [];
  currentDate: any;

  @ViewChild('modalAlert') private modalAlert: AlertComponent;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {

  }

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    try {
      const rs: any = await this.apiService.getUser();
      if (rs.results) {
        this.users = rs.results;
      }
    } catch (e) {
      console.log(e);
    }
  }

  gotoPage2() {
    this.router.navigate(['/page2', {name: 'Express.js', version: '4.5.1'}]);
  }

  openModal() {
    this.modalAlert.open();
  }
}
