import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task/task.model';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent, EditTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name!: string;
  isAddingTask = false; 

editingTaskId: string | null = null;
editingTask: any = null;

onStartEditTask(taskId: string) {
  this.editingTaskId = taskId;

  this.editingTask = this.selectedUserTasks.find(
    (task) => task.id === taskId
  );
}


tasks: Task[] = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Master Angular',
    summary:
      'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
    priority: 'high' as 'high'
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
    priority: 'medium' as 'medium'
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
    priority: 'low' as 'low'
  }
];

get selectedUserTasks() {
  return this.tasks.filter((task) => task.userId === this.userId); 
}

onCompleteTask(id: string) {
  this.tasks = this.tasks.filter((task) => task.id !== id);
}

onStartAddTask() {
   this.isAddingTask = true;
}

onCancelAddTask() {
  this.isAddingTask = false;
}

onAddTask(taskData: NewTaskData) {
  this.tasks.unshift({
    id: new Date().toString(),
    userId: this.userId,
    title: taskData.title,
    summary: taskData.summary,
    dueDate: taskData.date,
    priority: taskData.priority

  })
  this.isAddingTask = false
  
}

onSaveEditedTask(updatedTask: any) {
  const index = this.tasks.findIndex(task => task.id === updatedTask.id);

  if (index > -1) {
    this.tasks[index] = updatedTask;
  }

  this.editingTask = null;
}


}
