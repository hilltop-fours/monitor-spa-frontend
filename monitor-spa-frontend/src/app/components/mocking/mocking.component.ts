import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-mocking',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mocking.component.html',
  // styleUrls: ['./home.component.scss'],
  // providers: [UserService]
})

export class MockingComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data
    });

    this.userService.getUsers()
      .subscribe({
        next: (data: User[]) => this.users = data,
        error: (err: Error) => console.error(`Observer got an error: ${err}`)
      });
  }
}

class User {
  id!: number
  name!: string
  age!: number
  eyeColor!: string
}

// .getAgent(this.subscriptionId)
// .subscribe({
//   next: (data: Agent) => this.agent = data,
//   error: (err: Error) => console.error(`Observer got an error: ${err}`),
//   complete: () => console.log('ok')
//   // complete: () => this.updateAwaitingResponses(this.agents)
// });