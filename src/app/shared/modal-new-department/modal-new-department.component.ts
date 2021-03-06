import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../services/department.service';

import Swal from 'sweetalert2';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-modal-new-department',
  templateUrl: './modal-new-department.component.html',
  styles: []
})
export class ModalNewDepartmentComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') private content;
  isEnabled: any = true;
  departmentName: any = '';
  item: any;
  departmentId: any;

  constructor(
    private modalService: NgbModal,
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
  }

  open(item: any) {
    this.departmentName = item ? item.department_name : null;
    this.departmentId = item ? item.department_id : null;
    this.isEnabled = item ? item.is_enabled === 'Y' ? true : false : true;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
    }, (reason) => {
      // this.onSave.emit(false);
    });
  }

  async doSave() {

    if (this.departmentName) {
      try {
        const _isEnabled = this.isEnabled ? 'Y' : 'N';
        let rs: any;

        if (this.departmentId) {
          rs = await this.departmentService.update(this.departmentId, this.departmentName, _isEnabled);
        } else {
          rs = await this.departmentService.create(this.departmentName, _isEnabled);
        }

        if (rs.ok) {
          this.onSave.emit(true);
          this.alertService.success();
          this.modalService.dismissAll();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        this.alertService.error(e.message);
      }
    } else {
      this.alertService.error('กรุณาระบุชื่อหน่วยงาน');
    }

  }

}
