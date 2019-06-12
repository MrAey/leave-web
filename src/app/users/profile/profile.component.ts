import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  items: any = [];

  employeeId: any = sessionStorage.getItem('id');
  departmentId: any = '';
  subDepartmentId: any = '';
  employeeTypeId: any = '';
  pageSize = 1;
  offset = 0;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getEmployees();
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

}
