import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/shared/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  public readonly currentUser$;
  private readonly _currentUser = new BehaviorSubject<User>(undefined);

  constructor(
  ) {
    this.currentUser$ = this._currentUser.asObservable();
  }

  public get currentUser(): User {
    return this._currentUser.getValue();
  }

  public set currentUser(value: User) {
    this._currentUser.next(value);
  }

  public fetchCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
