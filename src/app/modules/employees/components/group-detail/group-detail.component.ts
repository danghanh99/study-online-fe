import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserStoreService } from 'src/app/core/services/store/user-store.service';
import { GroupsHttpService } from 'src/app/shared/http/groups-http.service';
import { Group, GroupDetail } from 'src/app/shared/models/group.model';
import { EditGroupModalComponent } from '../edit-group-modal/edit-group-modal.component';
import { RemoveUserModalComponent } from '../room-remove-user/remove-user-modal.component';
import { StatusConfirmComponent } from '../status-confirm/status-confirm.component';

@Component({
  selector: 'ah-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  public groupDetail: GroupDetail;
  public id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private groupHttpService: GroupsHttpService,
    private userStore: UserStoreService,
    private toastr: ToastrService,
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    const userId: number = this.userStore.currentUser.id;
    this.fetchGroupDetail(userId);
  }


  public openRemoveUserModal(id: number): void {
    const bsModalRef = this.modalService.show(RemoveUserModalComponent);
    bsModalRef.content.onClose
      .pipe(
        switchMap(res => res ? this.groupHttpService.removeMember(this.groupDetail.adminId, this.groupDetail.id, id) : of(false))
      )
      .subscribe((r) => {
        if (r) {
          this.fetchGroupDetail(this.userStore.currentUser.id);
          this.toastr.success(null, 'Remove member success.');
        }
      })
  };
  public openRevertUserModal(id: number): void {
    const bsModalRef = this.modalService.show(RemoveUserModalComponent);
    bsModalRef.content.onClose
      .pipe(
        switchMap(res => res ? this.groupHttpService.revertMember(this.groupDetail.adminId, this.groupDetail.id, id) : of(false))
      )
      .subscribe((r) => {
        if (r) {
          this.fetchGroupDetail(this.userStore.currentUser.id);
          this.toastr.success(null, 'Revert member success.');
        }
      })
  };

  public openDeleteGroupModal(
  ) {
    const initialState = { type: 'delete-group' };
    const userId: number = this.userStore.currentUser.id;
    this.bsModalRef = this.modalService.show(StatusConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose
      .pipe(
        switchMap((res) =>
          res ? this.groupHttpService.deleteGroup(this.id, userId) : of(false)
        )
      )
      .subscribe((r) => {
        if (r) {
          this.router.navigateByUrl('classes');
          this.toastr.success(null, 'Delete room success.');
        }
      },
        () => this.toastr.success(null, 'Delete room failed.'));
  }

  public openEditGroupModal(
  ) {
    const initialState = { groupDetail: this.groupDetail };
    this.bsModalRef = this.modalService.show(EditGroupModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose
      .subscribe((res) => {
        res && this.fetchGroupDetail(this.userStore.currentUser.id);
      });
  }

  private fetchGroupDetail(userId: number): void {
    this.groupHttpService.getGroupDetail(this.id, userId).pipe(
      tap(res => this.groupDetail = res)
    ).toPromise();
  }
}
