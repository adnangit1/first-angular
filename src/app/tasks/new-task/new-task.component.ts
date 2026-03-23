import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {type NewTaskData } from '../task/task.model';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
 styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
@Output() cancel = new EventEmitter<void>()
@Output() add = new EventEmitter<NewTaskData>()
enteredTitle = '';
enteredSummary = '';
enteredDate = '';
priority: 'low' | 'medium' | 'high' = 'medium';

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate,
      priority: this.priority,

    })

  }

}
