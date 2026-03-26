import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, NewTaskData } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // GET /todos/:userId — fetch tasks for a specific user
  getTasksByUser(userId: string): Observable<{ todos: Task[] }> {
    return this.http.get<{ todos: Task[] }>(`${this.apiUrl}/todos/${userId}`);
  }

  // POST /todos — create and persist a new task
  addTask(task: Task): Observable<{ todo: Task }> {
    return this.http.post<{ todo: Task }>(`${this.apiUrl}/todos`, task);
  }

  // PUT /todos/:id — update an existing task
  updateTask(task: Task): Observable<{ todo: Task }> {
    return this.http.put<{ todo: Task }>(`${this.apiUrl}/todos/${task.id}`, task);
  }

  // DELETE /todos/:id — delete a task by id
  deleteTask(taskId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/todos/${taskId}`);
  }
}
