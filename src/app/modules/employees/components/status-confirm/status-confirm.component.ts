import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'ah-status-confirm',
  templateUrl: './status-confirm.component.html',
  styleUrls: ['./status-confirm.component.scss'],
})
export class StatusConfirmComponent implements OnInit {
  public onClose: Subject<boolean>;
  public id: number;
  public type: string;
  public refresh: any;
  constructor(
    public bsModalRef: BsModalRef,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public getTitle(): string {
    if (this.type === 'out-group') {
      return this.translate.instant('Out room');
    }
    if (this.type === 'remove-group') {
      return this.translate.instant('Delete room');
    }

    if (this.type === 'delete-group') {
      return this.translate.instant('Delete room');
    }
    return this.translate.instant('PROFILE_STATUS_CHANGE.TITLE_ACTIVE');
  }

  public getParam(): string {
    if (this.type === 'out-group') {
      return this.translate.instant('Are you want to out room?');
    }
    if (this.type === 'delete-group' || this.type === 'remove-group') {
      return this.translate.instant('Are you sure delete this room?');
    }
    return this.translate.instant('PROFILE_STATUS_CHANGE.PARAM_ACTIVE');
  }

  public onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onDecline() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
