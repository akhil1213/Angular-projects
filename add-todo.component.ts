import { Component, OnInit, EventEmitter, Output  } from '@angular/core'; // added eventemitter and output so i can pass the todo up to the todo component and add a todo item.
import { Todo } from '../todos/models/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  @Output() changeTodoTitle: EventEmitter<any> = new EventEmitter();
  item:string;//item is already going to be whatever the user enters automatically thats how ngmodel works
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    const todo = {
      title: this.item,
      completed: false
    }
  }
  onKey(event:any){
    console.log(event.key);
    if(event.key != "Enter" && event.key!="Backspace"){
      this.item = event.target.value
      this.changeTodoTitle.emit(this.item);
    }
  }
  add(){
    const todo = {
      title: this.item,
      completed: false
    }
    this.addTodo.emit(todo);
  }

}

