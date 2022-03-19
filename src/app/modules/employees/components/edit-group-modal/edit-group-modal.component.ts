import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStoreService } from 'src/app/core/services/store/user-store.service';
import { CategoryHttpService } from 'src/app/shared/http/category-http.service';
import { GroupsHttpService } from 'src/app/shared/http/groups-http.service';
import { Category, GroupDetail } from 'src/app/shared/models/group.model';

@Component({
  selector: 'ah-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit {
  public editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    categoryId: new FormControl('', Validators.required)
  });

  public categories!: Category[];
  public groupDetail: GroupDetail;
  public onClose = new Subject<boolean>();


  constructor(
    private categoryHttpService: CategoryHttpService,
    private groupHttpService: GroupsHttpService,
    public bsModalRef: BsModalRef,
    public translate: TranslateService,
    private userStore: UserStoreService,
    private toastr: ToastrService) {
    this.categoryHttpService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  ngOnInit(): void {
    this.groupDetail && this.editForm.setValue({
      name: this.groupDetail.name,
      description: this.groupDetail.description,
      categoryId: this.groupDetail.category.id
    });
  }

  public onCancel(): void {
    this.bsModalRef.hide();
    this.onClose.next(false);
  }

  public onSave(): void {
    this.groupDetail ? this.updateGroup() : this.createGroup();
  }

  private createGroup(): void {
    this.groupHttpService.createGroup(this.editForm.value, this.userStore.currentUser.id).pipe(tap(res => {
      if (res) {
        this.bsModalRef.hide(); this.toastr.success('Create success.');
        this.onClose.next(true);
      }
    })).toPromise();
  }

  private updateGroup(): void {
    this.groupHttpService.editGroup({
      ...this.groupDetail, ...this.editForm.value
    }, this.userStore.currentUser.id).pipe(tap(res => {
      if (res) {
        this.bsModalRef.hide(); this.toastr.success('Edit success.');
        this.onClose.next(true);
      }
    })).toPromise();
  }

  get f() {
    return this.editForm.controls;
  }
}
