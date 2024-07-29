import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgFor } from '@angular/common';

import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnChanges {
  @Input() user: any;
  tasks: Task[] = [];

  constructor(private taskSerVice: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.taskSerVice
        .getTask(this.user.id)
        .subscribe((tasks) => (this.tasks = tasks));
    }
  }

  deleteTask(task: Task) {
    this.taskSerVice
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskSerVice.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    task.user_id = this.user.id;
    this.taskSerVice.addTask(task).subscribe((t) => this.tasks.push(t));
  }
}
