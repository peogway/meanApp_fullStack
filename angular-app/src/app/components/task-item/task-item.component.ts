import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgStyle, NgClass } from '@angular/common';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task: Task = { text: '', day: '', reminder: true };
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  // faTimes = faTimes;

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
