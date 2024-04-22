import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { MockingComponent } from './components/mocking/mocking.component';

export const routes: Routes = [
    { path: 'chat/:subscriptionId', component: ChatComponent },
    { path: 'mocking', component: MockingComponent }
];
