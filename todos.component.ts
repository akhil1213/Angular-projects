import { Component, OnInit } from '@angular/core';
import {Todo} from 'src/app/components/todos/models/todo';
import {TodoService} from '../../services/todo.service'
import { template } from '@angular/core/src/render3';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[]; // an array of Todo objects
  count:number = 4;
  todoToChange:Todo;
  addTypedToDo:boolean = false;
  /*Reserve the constructor for simple initialization such as wiring constructor 
  parameters to properties. The constructor shouldn't do anything. 
  It certainly shouldn't call a function that makes HTTP requests 
  to a remote server as a real data service would.*/
  constructor(private toDoService:TodoService) { }//makes the todoservice available to the todoscomponent so it can get todos from json website
  //the Dependency Injection system sets the todoService parameter to the singleton instance of todoService.
  
  ngOnInit() {
      this.toDoService.getToDos().subscribe( todos =>{//your subsricibing to all the todos being sent to you from json website in the todoservice.
        this.todos = todos;
      }
      );
      
  }
  deleteTodo(todo:Todo){
     this.todos = this.todos.filter(td => td.id !== todo.id);
     this.toDoService.deleteTodo(todo).subscribe();
     this.count--;
  }
  addTodo(todo:Todo){
      this.todos.push(todo);
      console.log(todo.title);
      this.todos[++this.count] = {
        title: "",
        completed:false,
        id:8
      }
  }
  changeTodoTitle(newtitle:string){
    this.todoToChange = this.todos[this.count];
    this.todoToChange.title = newtitle;
  }

}
