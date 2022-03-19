import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ah-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  public id: number;
  public type: string;
  public employeeId: number;
  public params: any;
  constructor(
    public bsModalRef: BsModalRef,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  public getTitle(): string {
    switch (this.type) {
      case 'delete':
        return this.translate.instant('CONFIRM_MODAL.DELETE_TITLE');
      case 'approve':
        return this.translate.instant('CONFIRM_MODAL.APPROVE_TITLE');
      case 'cancel':
        return this.translate.instant('CONFIRM_MODAL.CANCEL_TITLE');
      case 'deny':
        return this.translate.instant('CONFIRM_MODAL.DENY_TITLE');
    }
  }

  public getParam(): string {
    switch (this.type) {
      case 'delete':
        return this.translate.instant('CONFIRM_MODAL.DELETE_PARAM');
      case 'approve':
        return this.translate.instant('CONFIRM_MODAL.APPROVE_PARAM');
      case 'cancel':
        return this.translate.instant('CONFIRM_MODAL.CANCEL_PARAM');
      case 'deny':
        return this.translate.instant('CONFIRM_MODAL.DENY_PARAM');
    }
  }

  public onConfirm() {
    this.bsModalRef.hide();
  }
}
