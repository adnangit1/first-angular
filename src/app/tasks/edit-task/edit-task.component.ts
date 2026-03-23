import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  @Input() task: any;

  editableTask: any = {};

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  ngOnChanges() {
    this.editableTask = { ...this.task }; 
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.save.emit(this.editableTask);
  }
}