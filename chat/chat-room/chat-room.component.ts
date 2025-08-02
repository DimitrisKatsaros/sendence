import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '@sendence/common';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class ChatRoomComponent implements OnInit {
  private _chatService = inject(ChatService);

  private _user = 'Sir Chat-a-lot';

  public messages: Message[] = [];
  public messageText = '';
  public error: string | null = null;

  public ngOnInit(): void {
    this._chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  public sendMessage() {
    if (this.messageText.trim()) {
      this._chatService.sendMessage({
        user: this._user,
        message: this.messageText,
      });
      this.messageText = '';
    }
  }
}
