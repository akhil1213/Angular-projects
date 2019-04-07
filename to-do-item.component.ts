import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';//since ur passing an input from todos.component.html of a todo
import { Todo } from 'src/app/components/todos/models/todo';
import {TodoService} from 'src/app/services/todo.service'
import { TodosComponent } from '../todos/todos.component';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {
  @Input() todo: Todo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()
  count:number;
  constructor(private tds:TodoService) { }

  ngOnInit() {
  }
  setClasses(){
    let classes = {
      todo: true, 
      'is-complete': this.todo.completed
    }
    return classes;
  }
  onToggle(todo){
    todo.completed = !todo.completed;
    //toggle on server
    this.tds.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }
  onDelete(todo){
      this.deleteTodo.emit(todo);//inside of the todos component ts will be a deleteTodo(todo) method 
  }
}
/*If a change is made on a todo item component for example if u click a checkbox u need to make that 
todo’s completed value to be true. also if u click on the x button you want to delete the todo. 
However, all of these events are happening inside the todo item component but the array of todoitems
are inside the todos component. So since u want to delete the todo item component that was clicked , 
it must be done from the todos component’s todo array and you need an emitter to pass that todo clicked 
to the parent todos component and delete that todo from the todos array.*/
