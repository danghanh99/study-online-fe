import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { Router } from '@angular/router';
import { StatusConfirmComponent } from '../status-confirm/status-confirm.component';
import { GroupsHttpService } from 'src/app/shared/http/groups-http.service';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { Group } from 'src/app/shared/models/group.model';
import { JitsiService } from 'src/app/core/services/jitsi/jitsi-service';
import { UserStoreService } from 'src/app/core/services/store/user-store.service';
import {
  GetAllGroupsResponse,
  JoinedGroup,
} from 'src/app/shared/models/get-all-groups-response.model';
import { ToastrService } from 'ngx-toastr';
import { GroupsStoreService } from 'src/app/core/services/store/groups-store.service';
import { async } from '@angular/core/testing';
import { EditGroupModalComponent } from '../edit-group-modal/edit-group-modal.component';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public currentPage = 1;
  private currentSearch = '';
  public searchStatusFormControl = new FormControl('');
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;
  public searchParams: any;

  public selectedClass?: Group;
  public filteredJoinedGroups: JoinedGroup = {
    admin: [],
    others: [],
  };
  public filteredOtherGroups: Group[] = [];
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private groupHttpService: GroupsHttpService,
    private jitsiService: JitsiService,
    private userStore: UserStoreService,
    private toastr: ToastrService,
    private groupsStore: GroupsStoreService
  ) { }

  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    this.closeMetting();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    this.closeMetting();
  }

  ngOnInit(): void {
    this.fetchGroups();
    this.searchChangeEvent();
  }

  public openModalWithComponent(
    id: number,
    type?: string,
    refresh?: any
  ) {
    const initialState = { id, type, refresh };
    this.bsModalRef = this.modalService.show(StatusConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose
      .pipe(
        switchMap((res) =>
          res ? this.groupHttpService.outGroup(id) : of(false)
        )
      )
      .subscribe((r) => {
        if (r) {
          this.fetchGroups();
          this.toastr.success(null, 'Out room success.');
        }
      },
        () => this.toastr.success(null, 'Out room failed.'));
  }



  public openRemoveGroupModal(
    id: number,
    type?: string,
    refresh?: any
  ) {
    const initialState = { id, type, refresh };
    this.bsModalRef = this.modalService.show(StatusConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose
      .pipe(
        switchMap((res) =>
          res ? this.groupHttpService.deleteGroup(id, this.userStore.currentUser.id) : of(false)
        )
      )
      .subscribe((r) => {
        if (r) {
          this.fetchGroups();
          this.toastr.success(null, 'Delete room success.');
        }
      },
        () => this.toastr.success(null, 'Delete room failed.'));
  }

  public navigateDetail(id: number): void {
    this.router.navigateByUrl(`/${RouteConstant.rooms}/${id}`);
  }

  public navigateEdit(id: number): void {
    this.router.navigateByUrl(`/${RouteConstant.rooms}/${id}/edit`);
  }

  public openCreateGroupModal(
  ) {
    this.bsModalRef = this.modalService.show(EditGroupModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose
      .subscribe((res) => {
        res && this.fetchGroups();
      });
  }

  public onSearchSubmit(): void {
    if (
      this.currentSearch !== this.searchFormControl.value.replace(/\s/g, '')
    ) {
      this.currentSearch = this.searchFormControl.value.replace(/\s/g, '');
    }
  }

  public selectClass(selectedClass: Group): void {
    console.log(selectedClass);
    this.groupHttpService.startGroup(this.userStore.currentUser.id, selectedClass.id).pipe(
      tap(() => {
        this.selectedClass = selectedClass;
        setTimeout(async () => {
          await this.jitsiService.startMeeting(
            this.userStore.currentUser.name,
            selectedClass.code
          );
          this.jitsiService.api.addListener(
            'videoConferenceLeft',
            () => {
              this.closeMetting();
              this.selectedClass = undefined;
            }
          );
        }, 1);
      })
    ).toPromise();
  }

  public joinRoom(code: string): void {
    this.groupHttpService
      .joinGroup(code)
      .pipe(
        tap(
          () => {
            this.fetchGroups();
            this.toastr.success(null, 'Join room success.');
          },
          () => this.toastr.error(null, 'Join room error.')
        )
      )
      .toPromise();
  }

  public isRoomAdmin(roomId: number): boolean {
    return this.groupsStore.groups.joined.admin.some((g) => g.id === roomId);
  }

  public get allJoinedRoom(): Group[] {
    return [
      ...this.filteredJoinedGroups.admin,
      ...this.filteredJoinedGroups.others,
    ];
  }

  private fetchGroups(): void {
    this.groupsStore
      .fetchGroups()
      .pipe(
        tap((res) => {
          if (res) {
            this.filteredJoinedGroups = res.joined;
            this.filteredOtherGroups = res.others;
          }
        })
      )
      .toPromise();
  }

  private searchChangeEvent(): void {
    this.searchFormControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((params) => {
        this.filteredJoinedGroups.admin =
          this.groupsStore.groups.joined.admin.filter((g) =>
            this.compareString(g.name + g.code, params)
          );
        this.filteredJoinedGroups.others =
          this.groupsStore.groups.joined.others.filter((g) =>
            this.compareString(g.name + g.code, params)
          );
        this.filteredOtherGroups = this.groupsStore.groups.others.filter((g) =>
          this.compareString(g.name + g.code, params)
        );
      });
  }

  private compareString(base: string, sub: string): boolean {
    return base.toUpperCase().includes(sub.toUpperCase());
  }

  private closeMetting(): void {
    if (this.selectedClass && this.userStore.currentUser.id === this.selectedClass.admin_id) {
      this.groupHttpService.closeGroup(this.userStore.currentUser.id, this.selectedClass?.id).toPromise();
    }
  }
}
