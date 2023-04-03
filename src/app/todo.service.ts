import { Injectable } from '@angular/core';
import { ITodo, ITODOS } from './todo.mock';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: ITodo[] = ITODOS;
  Urgent: ITodo[] = [];
  Ordinary: ITodo[] = [];
  isActive: boolean = false;
  public showPage = false;
  isUrgent: {id: number, task: string}[] = [];
  isOrdinary: {id: number, task: string}[] = [];
  nextId: number = 1;
   historyList: {id: number, task: string}[] = [];
  constructor() {}
  
  //afficher 2ème partie de la page home
  afficherTaches() {
    this.showPage = !this.showPage;
    console.log(this.showPage );
    return this.showPage;
  }
  
  saveTask(task: string, isUrgent: boolean): void {
    if (isUrgent) {
      const newTask = {id: this.isUrgent.length + 1, task: task, isUrgent: isUrgent};
      this.isUrgent.push(newTask);
      //enregistrer dans local storage
      localStorage.setItem('urgentList', JSON.stringify(this.isUrgent));
      // pour que id debute de 1
      this.isOrdinary.forEach((task, index) => {
        task.id = index + 1;
      });
    } else {
      const newTask = {id: this.isOrdinary.length + 1, task: task, isUrgent: isUrgent};
      this.isOrdinary.push(newTask);
      localStorage.setItem('ordinaryList', JSON.stringify(this.isOrdinary));
      // pour que id debute de 1
      this.isUrgent.forEach((task, index) => {
        task.id = index + 1;
      });
    }
  }
  //de la page home à la page 3
  removeTask(task: {id: number, task: string}, listType: string): void {
    if (listType === 'urgentList') {
      this.isUrgent = this.isUrgent.filter(t => t.id !== task.id);
      localStorage.setItem('urgentList', JSON.stringify(this.isUrgent));
    } else if (listType === 'ordinaryList') {
      this.isOrdinary = this.isOrdinary.filter(t => t.id !== task.id);
      localStorage.setItem('ordinaryList', JSON.stringify(this.isOrdinary));
    }
  }

  addToHistoryList(task: {id: number, task: string}): void {
    // Récupérer la liste d'historique depuis le local storage
    const historyList = JSON.parse(localStorage.getItem('historyList') || '[]');
  
    // Ajouter la nouvelle tâche au début de la liste
    historyList.unshift(task);
  
    // Tri des tâches par ordre croissant de date
  historyList.sort((a: {date: Date}, b: {date: Date}) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    // Mettre à jour la liste d'historique dans le local storage
    localStorage.setItem('historyList', JSON.stringify(historyList));
  
    // Mettre à jour la variable historyList du service
    this.historyList = historyList;
  }

  addPageHome(task: {id: number, task: string, isUrgent: boolean}): void {
    // Ajoute la tâche à la liste appropriée
if (task.isUrgent) {
    this.isUrgent.push(task);
    localStorage.setItem('urgentList', JSON.stringify(this.isUrgent));
  } else {
    this.isOrdinary.push(task);
    localStorage.setItem('ordinaryList', JSON.stringify(this.isOrdinary));
  }
  }

  moveFromHistory(task: {id: number, task: string, isUrgent: boolean}): void {
    // supprimer task de historyList dans local storage
    const historyList = JSON.parse(localStorage.getItem('historyList') || '[]');
    const index = historyList.findIndex((t: {id: number, task: string}) => t.id === task.id);
    if (index > -1) {
      historyList.splice(index, 1);
      localStorage.setItem('historyList', JSON.stringify(historyList));
    }
    // supprimer task de la page 3
    const taskElement = document.getElementById(`task-${task.id}`);
    if (taskElement) {
      taskElement.remove();
    }
    this.addPageHome({id: task.id, task: task.task, isUrgent: task.isUrgent});
  }

}
  
