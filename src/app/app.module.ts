import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'chat-details/:id', component: ChatDetailsComponent },
  { path: '', redirectTo: 'chat', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ChatComponent,
    ChatDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
