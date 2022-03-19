import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public setLoadingState(loadingState: boolean): void {
    this._loading$.next(loadingState);
  }

  public get loadingState() {
    return this._loading$;
  }

}
