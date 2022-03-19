import { Injectable } from '@angular/core';
import { JitsiApi } from './jitsi.api';

@Injectable({
  providedIn: 'root',
})
export class JitsiService {
  public api: any;

  public async startMeeting(userName: string, jitsiLink: string) {
    this.api = await JitsiApi.startMeeting(userName, jitsiLink);
  }

  public closeMeeting(): void {
    JitsiApi.closeMeeting();
  }
}
