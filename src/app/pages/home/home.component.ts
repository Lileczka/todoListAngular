import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ITODOS, ITodo } from 'src/app/todo.mock';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  todos: ITodo[] = ITODOS;
  label= "Créer une tache";
  showPage = false;
  // Déclarer les variables pour stocker la liste d'éléments urgents
  urgentList: { id: number, task: string, isUrgent: boolean }[] = [];
  ordinaryList: { id: number, task: string, isUrgent: boolean }[] = [];
  //pour modifier le task
  modifiedTask: string = '';
  
  constructor(private todoService: TodoService, 
    private router: Router,
    private route: ActivatedRoute) {}
    
    ngOnInit(): void {
 // Récupérer la liste des éléments  du localStorage
 this.urgentList = JSON.parse(localStorage.getItem('urgentList') || '[]');
 this.ordinaryList = JSON.parse(localStorage.getItem('ordinaryList') || '[]');

 //afficher la pertie caché de ng-container
 this.route.queryParams.subscribe(params => {
  this.showPage = params['showPage'] === 'false';
});
}
 
//passer la valeur de showPage à true pour cacher la partie selection
afficherSelectedTask() {
  this.showPage = !this.showPage;
  localStorage.setItem('showPage', JSON.stringify(this.showPage));
}

goToPage2() {
  this.router.navigate(['/page2']);
  
  }
goToPage3() {
    
    this.router.navigate(['/page3']); 
  }

removeTask(task: {id: number, task: string}, listType: string): void {
    this.todoService.removeTask(task, listType);
    // Navigate to page 3
     this.goToPage3();
   // Ajouter la tâche enlevée à historyList, méthode appelé du service
     this.todoService.addToHistoryList(task);
  }
  
  getmodifiedTask(task: string): void {
    // Supprimer la tâche de la liste 'urgentList'
  const indexUrgent = this.todoService.isUrgent.findIndex(t => t.task === task);
  if (indexUrgent !== -1) {
    this.todoService.isUrgent.splice(indexUrgent, 1);
    localStorage.setItem('urgentList', JSON.stringify(this.todoService.isUrgent));
  }
 // Supprimer la tâche de la liste 'ordinaryList'
 const indexOrdinary = this.todoService.isOrdinary.findIndex(t => t.task === task);
 if (indexOrdinary !== -1) {
   this.todoService.isOrdinary.splice(indexOrdinary, 1);
   localStorage.setItem('ordinaryList', JSON.stringify(this.todoService.isOrdinary));
 }
 
  
 this.modifiedTask = task;
    
    let queryParams: NavigationExtras = {
      queryParams: {
        task: this.modifiedTask
      }
    };
    // Naviguer vers la page 2 avec le task comme paramètre de requête
    this.router.navigate(['/page2'], queryParams); 
    return; 
  }

  }