import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignalRConnection } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  url = environment.api;
  subject: Subject<string> = new Subject();
  private hubConnection!: signalR.HubConnection;

  constructor(private readonly http: HttpClient) {
    this.http.get<SignalRConnection>(`${this.url}/negotiate`).subscribe(connection => {

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(connection.url, { accessTokenFactory: () => connection.accessToken })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log(`Error while starting connection: ${err}`));

      this.hubConnection.on('updateAgent', data => {
        this.subject.next(data);
      });
    });
  }

  //constructor() {
  //  this.hubConnection = new signalR.HubConnectionBuilder()
  //    .withUrl(`${this.url}`)
  //    .configureLogging(signalR.LogLevel.Information)
  //    .build();

  //  this.hubConnection
  //    .start()
  //    .then(() => console.log('Connection started'))
  //    .catch(err => console.log(`Error while starting connection: ${err}`));
  //}

  //on(method: string): Observable<any> {
  //  const subject: Subject<any> = new Subject<any>();
  //  this.hubConnection.on(method, data => subject.next(data));
  //  return subject.asObservable();
  //}
}
