import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  authToken: any;
  private apiUrl = '/dashboard';

  constructor(private http: HttpClient) {}

  getTask(userId: string): Observable<Task[]> {
    this.loadToken();
    if (!this.authToken) {
      return of([]);
    }
    const headers = new HttpHeaders({
      Authorization: this.authToken,
    });

    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Task[]>(url, { headers });
  }

  updateTaskReminder(task: Task): Observable<Task> {
    this.loadToken();
    if (!this.authToken) {
      return of({ success: false });
    }
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/${task.user_id}/${task.id}`;
    return this.http.put<Task>(url, task, { headers });
  }

  deleteTask(task: Task): Observable<Task> {
    this.loadToken();
    if (!this.authToken) {
      return of({ success: false });
    }
    const headers = new HttpHeaders({
      Authorization: this.authToken,
    });
    const url = `${this.apiUrl}/${task.user_id}/${task.id}`;

    return this.http.delete<Task>(url, { headers });
  }

  addTask(task: Task): Observable<Task> {
    this.loadToken();
    if (!this.authToken) {
      return of({ success: false });
    }
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/${task.user_id}/`;
    return this.http.post<Task>(url, task, { headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
