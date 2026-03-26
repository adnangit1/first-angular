import { Component, Input, inject, OnChanges } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { type NewTaskData, Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent, EditTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnChanges {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  tasks: Task[] = [];
  isAddingTask = false;
  editingTask: Task | null = null;

  private tasksService = inject(TasksService);

  // Alias used by the template
  get selectedUserTasks(): Task[] {
    return this.tasks;
  }

  // Reload from backend whenever the selected user changes
  ngOnChanges() {
    this.isAddingTask = false;
    this.editingTask = null;
    this.loadTasks();
  }

  // GET /todos/:userId
  loadTasks() {
    this.tasksService.getTasksByUser(this.userId).subscribe({
      next: (res) => (this.tasks = res.todos),
      error: (err) => console.error('Failed to load tasks', err),
    });
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  // POST /todos — persist the new task so it survives user switching
  onAddTask(taskData: NewTaskData) {
    const newTask: Task = {
      // Use a clean alphanumeric id — ISO strings contain colons which break URL params
      id: 't' + Math.random().toString(36).slice(2, 10),
      userId: this.userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
      priority: taskData.priority,
    };

    this.tasksService.addTask(newTask).subscribe({
      next: (res) => {
        this.tasks.unshift(res.todo);
        this.isAddingTask = false;
      },
      error: (err) => console.error('Failed to add task', err),
    });
  }

  onStartEditTask(taskId: string) {
    this.editingTask = this.tasks.find((t) => t.id === taskId) ?? null;
  }

  // PUT /todos/:id
  onSaveEditedTask(updatedTask: Task) {
    this.tasksService.updateTask(updatedTask).subscribe({
      next: (res) => {
        const index = this.tasks.findIndex((t) => t.id === res.todo.id);
        if (index > -1) this.tasks[index] = res.todo;
        this.editingTask = null;
      },
      error: (err) => console.error('Failed to update task', err),
    });
  }

  // DELETE /todos/:id
  onCompleteTask(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
      },
      error: (err) => console.error('Failed to delete task', err),
    });
  }
}
