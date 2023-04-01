import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo, ITODOS } from 'src/app/todo.mock';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  todos: ITodo[] = ITODOS;
  isActive: boolean = false;
  activeTodo: ITodo | null = null;
  // ajouter cette variable pour stocker l'état de la condition
  isInputEmpty = false;
  newTask!: string;
  showPage = false;
  
  label= "Valider une tache";
   
  constructor(public todoService: TodoService, 
    private router: Router) {
     
     // garantir que tous les éléments soient désactivés par défaut avant interaction avec eux
    this.todos.forEach(todo => todo.isActive = false);
  }

  btnActive(todo: ITodo) {
    if (this.activeTodo === todo) {
      todo.isActive = false;
      this.activeTodo = null;
    } else {
      this.todos.forEach(t => t.isActive = false);
      todo.isActive = true;
      this.activeTodo = todo;
    }
  }

//activer un bouton lorsque on saisi du texte dans un champ d'entrée (input).
activerBtnFullInput() {
  this.isInputEmpty = this.newTask.trim().length > 0;
  }
//buton selection isurgent
btnCheckActive() {
    this.isActive = !this.isActive;
  }

saveTask(): void {
    if (this.isInputEmpty) {
//ajouter icone 
      this.newTask = this.activeTodo?.content ? this.activeTodo.content + ' ' + this.newTask : this.newTask;
      this.todoService.saveTask(this.newTask, this.isActive);
      this.newTask = '';
      this.isActive = false;
 }
    console.log('Liste urgente:');
  this.todoService.isUrgent.forEach(task => {
    console.log(`Tâche ${task.id}: ${task.task}`);
  });
  
  console.log('Liste ordinaire:');
  this.todoService.isOrdinary.forEach(task => {
    console.log(`Tâche ${task.id}: ${task.task}`);
  });
  this.goPageHome();
  
  }
  
  //recuperer la valeur true de showPage pour changer l'affichage de la page1
  goPageHome(): void {
    const storedShowPage = localStorage.getItem('showPage');
    const showPage = storedShowPage ? JSON.parse(storedShowPage) : false;
    this.router.navigate(['/'], { queryParams: { showPage: showPage } });
  }
  
}
