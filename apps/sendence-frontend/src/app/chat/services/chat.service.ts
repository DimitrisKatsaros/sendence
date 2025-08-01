import { Injectable } from '@angular/core';
import { ACTION, Message, RESULT } from '@sendence/common';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const LOCAL_BE_SERVER_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _socket: Socket;
  private _messages$ = new Subject<Message>();
  private _errors$ = new Subject<string>();

  public constructor() {
    this._socket = io(LOCAL_BE_SERVER_URL);

    this._socket.on(RESULT.MESSAGE_SENT, (message: Message) => {
      this._messages$.next(message);
    });

    this._socket.on(RESULT.MESSAGE_ERROR, (error: string) => {
      this._errors$.next(error);
    });
  }

  public sendMessage(message: Omit<Message, 'id' | 'timestamp'>): void {
    this._socket.emit(ACTION.SEND_MESSAGE, message);
  }

  public getMessages(): Observable<Message> {
    return this._messages$.asObservable();
  }

  public getErrors(): Observable<string> {
    return this._errors$.asObservable();
  }
}
