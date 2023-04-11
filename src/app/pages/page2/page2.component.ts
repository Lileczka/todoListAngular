import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo, ITODOS } from 'src/app/todo.mock';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  todos: ITodo[] = ITODOS;
  isActive: boolean = false;
  activeTodo: ITodo | null = null;
  // ajouter cette variable pour stocker l'état de la condition
  isInputEmpty = false;
  newTask!: string;
  showPage = false;
  
  label= "Valider une tache";
  
  modifiedTask: string = '';
  
constructor(public todoService: TodoService, 
    private router: Router,
    private route: ActivatedRoute) {
     
  // garantir que tous les éléments soient désactivés par défaut avant interaction avec eux
  this.todos.forEach(todo => todo.isActive = false);
  }
  
  //afficher task à modifier
  ngOnInit(): void {
    //recuperer task de la page2
    const task = this.route.snapshot.queryParamMap.get('task');
    //enlever emoji de task
    if (task) {
    // Extraire toutes les chaînes de caractères de la tâche
    const taskParts = task.split(" ");
    // Enlever l'emoji en retirant la première partie
    taskParts.shift();
    // Joindre les parties restantes pour obtenir la nouvelle tâche
    this.newTask = taskParts.join(" ");
    // Mettre à jour modifiedTask avec newTask
    this.modifiedTask = this.newTask;
  // extraire emoji 
  const taskContent = task.split(" ")[0];
  // mettre emoji dans local storage
  localStorage.setItem('taskContent', taskContent); 
    
    

   
// Activer le bouton selecteur
if (taskContent) {
  this.modifiedTask = taskContent;
  this.todos.forEach(todo => {
    if (todo.content === taskContent) {
      if (this.activeTodo === todo) {
        todo.isActive = false;
        this.activeTodo = null;
      } else {
        this.todos.forEach(t => t.isActive = false);
        todo.isActive = true;
        this.activeTodo = todo;
      }
    } else {
      todo.isActive = false;
    }
  });
}
}
  this.activerBtnFullInput();
    
    this.goToPage2();
    
  }
  
  goToPage2() {
    this.router.navigate(['/page2']);
    
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
  
  saveTask(): void {
    if (this.isInputEmpty) {
      //  ajouter emoji à la nouvelle tâche
     this.newTask = this.activeTodo?.content ? this.activeTodo.content + ' ' + this.newTask : this.newTask;
      // Appeler le service pour sauvegarder la nouvelle tâche
     this.todoService.saveTask(this.newTask, this.isActive);
       // Réinitialiser l'input et la valeur d'activation du bouton
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
//activer un bouton lorsque on saisi du texte dans un champ d'entrée (input).
activerBtnFullInput() {
  this.isInputEmpty = this.newTask?.trim().length > 0;
  }

  //buton selection isurgent
btnCheckActive() {
    this.isActive = !this.isActive;
  }
  

//recuperer la valeur true de showPage pour changer l'affichage de la page1
  goPageHome(): void {
    const storedShowPage = localStorage.getItem('showPage');
    const showPage = storedShowPage ? JSON.parse(storedShowPage) : false;
    this.router.navigate(['/'], { queryParams: { showPage: showPage } });
  }
}
