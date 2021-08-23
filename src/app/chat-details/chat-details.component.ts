import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from '../chat.service';
import { Ichats } from '../ichats';
import { MessageStorageService } from '../message-storage.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {
  // For displaying chat contact info
  selectedChatData: Ichats;

  messageForm: FormGroup;

  // For display messages from localstorage
  messageForDisplay: Observable<Ichats[]>;

  // For storing messages into observable
  getChats$: BehaviorSubject<Ichats[]> = new BehaviorSubject([]);

  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private routeActivated: ActivatedRoute,
    private route: Router,
    private services: ChatService,
    private messageService: MessageStorageService
  ) {}

  ngOnInit() {
    this.id = this.routeActivated.snapshot.params['id'];

    this.services.getParticularChatDetails(this.id).subscribe(res => {
      this.selectedChatData = res.find(item => item.id === this.id);
    });

    this.messageForm = this.formBuilder.group({
      message: ['']
    });

    if (this.messageService.getMessage(this.id)) {
      this.messageForDisplay = JSON.parse(
        this.messageService.getMessage(this.id)
      );
      this.getChats$.next(JSON.parse(this.messageService.getMessage(this.id)));
    }
  }

  saveMessage() {
    this.getChats$.next([
      ...this.getChats$.getValue(),
      this.messageForm.value.message
    ]);
    this.messageService.setMessage(
      this.selectedChatData.id,
      this.getChats$.value
    );
    this.messageForDisplay = JSON.parse(
      this.messageService.getMessage(this.selectedChatData.id)
    );
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/chat']);
  }
}
