import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Ichats } from '../ichats';
import { MessageStorageService } from '../message-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatData: Ichats[];
  constructor(
    private services: ChatService,
    private messageService: MessageStorageService
  ) {}

  ngOnInit() {
    this.services.getChatList().subscribe(result => {
      this.chatData = result.map(
        res =>
          ({
            ...res,
            message: JSON.parse(this.messageService.getMessage(res.id))
          } as Ichats)
      );
    });
  }
}
