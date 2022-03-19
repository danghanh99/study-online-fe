import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface ISnackBarConfig {
  message: string;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  panelClass?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  public open(snackBarConfig: ISnackBarConfig) {
    this.snackBar.open(snackBarConfig.message, '', {
      duration: snackBarConfig.duration || 2000,
      horizontalPosition: snackBarConfig.horizontalPosition || 'center',
      verticalPosition: snackBarConfig.verticalPosition || 'top',
      panelClass: snackBarConfig.panelClass || 'success-snackbar'
    });
  }
}
