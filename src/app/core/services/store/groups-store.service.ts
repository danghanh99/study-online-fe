import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GroupsHttpService } from "src/app/shared/http/groups-http.service";
import { GetAllGroupsResponse } from "src/app/shared/models/get-all-groups-response.model";
import { Group } from "src/app/shared/models/group.model";
import { User } from "src/app/shared/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class GroupsStoreService {
  public readonly groups$;
  private readonly _groups = new BehaviorSubject<GetAllGroupsResponse>(undefined);

  constructor(
      private groupHttpService: GroupsHttpService
  ) {
    this.groups$ = this._groups.asObservable();
  }

  public get groups(): GetAllGroupsResponse {
    return this._groups.getValue();
  }

  public set groups(value: GetAllGroupsResponse) {
    this._groups.next(value);
  }

  public fetchGroups(): Observable<GetAllGroupsResponse> {
    return this.groupHttpService.getAllGroups().pipe(tap(res => {
        if (res) {
          this.groups = res;
        }
      }));
  }

  public getGroupById(id: number): Group | undefined {
    return this.findGroupById(this.groups.others, id) || this.findGroupById(this.groups.joined.admin, id) || this.findGroupById(this.groups.joined.others, id);
  }

  private findGroupById(groups: Group[], id: number): Group | undefined {
      return groups.find(g => g.id === id);
  }
}
