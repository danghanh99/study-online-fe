import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import * as snakecaseKeys from 'snakecase-keys';
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";


@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private resource = `${environment.APILink}`;

  constructor(private http: HttpClient) { }

  public login(body: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>(
        `${this.resource}/login`, snakecaseKeys(body)
      )
      .pipe(
        map((res) => res),
      );
  }

  public updateUser(id: number, body: any): Observable<User> {
    return this.http
      .put<User>(
        `${this.resource}/users/${id}`, snakecaseKeys(body)
      );
  }

  public signUp(body: any): Observable<User> {
    return this.http
      .post<User>(
        `${this.resource}/users/`, snakecaseKeys(body)
      );
  }
}
