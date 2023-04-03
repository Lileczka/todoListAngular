import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo, ITODOS } from 'src/app/todo.mock';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component {
  todos: ITodo[] = ITODOS;
  selectedTasks: any[] = [];
  historyList: {id: number, task: string}[]= [];
  labelBtn= "Créer une tache";
  label= "Historique des tâches :";
  showPage = false;
  
  constructor(private todoService: TodoService, 
    private router: Router) {
    // Récupérer la liste d'historique depuis le local storage
    const historyList = JSON.parse(localStorage.getItem('historyList') || '[]');
    if (historyList.length === 0) {
      this.showPage = true;
    } else {
      this.historyList = historyList;
    }
  }

  ngOnInit(): void {}
  
  //aller à la 2ème partie de la page home 
  goPageHome(): void {
  // Vérifie si l'indicateur de la deuxième partie de la page home est stocké en local
  const storedShowPage = localStorage.getItem('showPage');
  // Si l'indicateur est stocké, le récupère et le transforme en objet Json
  const showPage = storedShowPage ? JSON.parse(storedShowPage) : false;
  this.router.navigate(['/'], { queryParams: { showPage: showPage } });
  }

  goPageFirstHome() {
    this.router.navigate(['/page2']);
  }
  
  moveFromHistory(task: { id: number, task: string }) {
    // Récupère la liste des tâches de l'historique depuis le stockage local
    const historyList = JSON.parse(localStorage.getItem('historyList') || '[]');
    // Trouve la tâche à déplacer dans la liste d'historique en utilisant son identifiant unique
    const taskToMove = historyList.find((t: { id: number, task: string, isUrgent: boolean }) => t.id === task.id);
    // Si la tâche est trouvée dans l'historique, la déplacer dans la liste de tâches urgentes ou ordinaires
    if (taskToMove) {
        this.todoService.moveFromHistory(taskToMove);
        // Redirect to the home page
        this.goPageHome();
    }
}
}
  

