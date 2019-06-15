import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { AlertService } from '../../shared/alert.service';
import { UsersService } from '../users.service';
import { ModalNewEmployeeComponent } from '../../shared/modal-new-employee/modal-new-employee.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  @ViewChild('mdlNewEmployee') private mdlNewEmployee: ModalNewEmployeeComponent;

  items: any = [];
  itemsTypeId1: any = [];

  employeeId: any = sessionStorage.getItem('id');
  departmentId: any = '';
  subDepartmentId: any = '';
  employeeTypeId: any = '';
  pageSize = 1;
  offset = 0;
  totalTypeId1: any;
  totalTypeId2: any;
  totalTypeId3: any;
  totalTypeId4: any;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getTypeLeaves1();
    this.getTypeLeaves2();
    this.getTypeLeaves3();
    this.getTypeLeaves4();
  }

  async getEmployees() {
    try {
      const rs: any = await this.employeeService.list(
        this.employeeId,
        this.employeeTypeId,
        this.departmentId,
        this.subDepartmentId,
        this.pageSize,
        this.offset);
      if (rs.ok) {
        this.items = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getTypeLeaves1() {
    try {
      const rs: any = await this.userService.getTypeLeaves(this.employeeId,'APPROVED','1');
      if (rs.ok) {
        this.totalTypeId1 = rs.rows[0].total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getTypeLeaves2() {
    try {
      const rs: any = await this.userService.getTypeLeaves(this.employeeId,'APPROVED','2');
      if (rs.ok) {
        this.totalTypeId2 = rs.rows[0].total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getTypeLeaves3() {
    try {
      const rs: any = await this.userService.getTypeLeaves(this.employeeId,'APPROVED','3');
      if (rs.ok) {
        this.totalTypeId3 = rs.rows[0].total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getTypeLeaves4() {
    try {
      const rs: any = await this.userService.getTypeLeaves(this.employeeId,'APPROVED','4');
      if (rs.ok) {
        this.totalTypeId4 = rs.rows[0].total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  openModal(item: any = null) {
    this.mdlNewEmployee.open(item);
  }

  onSave(event: any) {
    if (event) {
      this.getEmployees();
    }
  }

}
