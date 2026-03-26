import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { TasksComponent } from "./tasks/tasks.component";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'first-angular-app';

  users: any[] = []; // b
  selectedUserId?: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.users;
    });
  }

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId)!;
  }

  onselectUser(id: string) {
    this.selectedUserId = id;
  }
}