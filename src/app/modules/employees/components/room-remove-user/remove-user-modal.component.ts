import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'ah-remove-user-modal',
  templateUrl: './remove-user-modal.component.html',
  styleUrls: ['./remove-user-modal.component.scss'],
})
export class RemoveUserModalComponent {
  public onClose = new Subject<boolean>();

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  public onClosed(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  public onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
}
