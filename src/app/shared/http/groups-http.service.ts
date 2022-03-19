import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IHttpResponse } from "./http-response.model";
import { Category, Group, GroupDetail } from "../models/group.model";
import * as camelcaseKeys from "camelcase-keys";
import { User } from "../models/user.model";
import { GetAllGroupsResponse } from "../models/get-all-groups-response.model";
import * as snakecaseKeys from "snakecase-keys";


@Injectable({ providedIn: 'root' })
export class GroupsHttpService {
  private resource = `${environment.APILink}`;

  constructor(private http: HttpClient) { }

  public joinGroup(code: string): Observable<unknown> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return this.http
      .post<unknown>(
        `${this.resource}/join`,
        {
          user_id: currentUser.id,
          code
        }
      )
      .pipe(
        map((res) => camelcaseKeys(res)),
      );
  }

  public outGroup(room_id: number): Observable<unknown> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return this.http
      .post<unknown>(
        `${this.resource}/out-group`,
        {
          user_id: currentUser.id,
          room_id
        }
      )
      .pipe(
        map((res) => camelcaseKeys(res)),
      );
  }

  public getAllGroups(): Observable<GetAllGroupsResponse> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return this.http
      .get<GetAllGroupsResponse>(
        `${this.resource}/groups?user_id=${currentUser.id}`
      )
      .pipe(
        map((res) => camelcaseKeys(res)),
      );
  }

  public startGroup(user_id: number, room_id: number): Observable<any> {
    return this.http.put<void>(`${this.resource}/start`, { user_id, room_id });
  }

  public closeGroup(user_id: number, room_id: number): Observable<any> {
    return this.http.put<void>(`${this.resource}/close`, { user_id, room_id });
  }

  public getGroupDetail(id: number, user_id: number): Observable<GroupDetail> {
    return this.http.get<GroupDetail>(`${this.resource}/groups/${id}?user_id=${user_id}`).pipe(map(res => camelcaseKeys(res, {
      deep
        : true
    })));
  }

  public removeMember(admin_id: number, room_id: number, member_id: number): Observable<GroupDetail> {
    return this.http.put<GroupDetail>(`${this.resource}/remove-member`, { admin_id, member_id, room_id });
  }

  public revertMember(admin_id: number, room_id: number, member_id: number): Observable<GroupDetail> {
    return this.http.put<GroupDetail>(`${this.resource}/revert-member`, { admin_id, member_id, room_id });
  }

  public deleteGroup(room_id: number, user_id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${this.resource}/delete-group?room_id=${room_id}&user_id=${user_id}`);
  }

  public editGroup(group: Group, userId: number): Observable<GroupDetail> {
    return this.http.put<GroupDetail>(`${this.resource}/groups/${group.id}?user_id=${userId}`, snakecaseKeys(group, { deep: true }));
  }

  public createGroup(group: Group, userId: number): Observable<GroupDetail> {
    return this.http.post<GroupDetail>(`${this.resource}/groups?user_id=${userId}`, snakecaseKeys(group, { deep: true }));
  }
}
