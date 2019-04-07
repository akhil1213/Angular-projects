import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Todo} from 'src/app/components/todos/models/todo';
import {Observable} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
//must go above injectable
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos'
  constructor(private http:HttpClient) { }
  todosLimit = '?_limit=5'
  getToDos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl + this.todosLimit);
  }
  toggleCompleted(todo:Todo):Observable<any>{
    const url = this.todosUrl + "/" + todo.id;
    return this.http.put(url,todo,httpOptions)
  }
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = this.todosUrl + "/" + todo.id;
    return this.http.delete<Todo>(url, httpOptions);
  }
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl,todo, httpOptions);

  }
}
