# TodoAngular

Ce projet Angular est une application de liste de tâches qui permet à l'utilisateur de créer et de gérer des tâches à réaliser. L'application a deux listes : les tâches urgentes et les tâches non urgentes. L'utilisateur peut céer les taches, marquer les tâches comme étant terminées et les mettre dans historique ou les corriger/ré-rediger.


## Author

[@Lileczka](https://github.com/Lileczka)



### Installation

Installation du projet :
 
 ```bash
  npm new todoAngular
```

Installation depondences dans
app.module.ts :  
@angular/core
@angular/router
rxjs
NavigationEnd@angular/router
FormsModule@angular/forms

Exécutez l'application :  
 
 ```bash
  npm serve -o
```
#### Description project

 1.Pages 
---------------------------------
L'application a trois pages: 

-- page HomeComponent: --
* 1 ère section permet naviguer vers la page 2
* 2 ème section affiche 2 listes des tâches: urgents et ordinaires (non urgente) 
* un bouton à côté de chaque tache pour envoyer la tache vers historique. 

--page 2Component-- 
* permet de créer une nouvelle tâche. En cliquant sur un de 6 bouton de sélection on choisi le caractère de la tache , puis à l'aide un autre button on peut choisir si la tâche est urgente ou non. En cliquant sur le bouton  "Valider une tache" , la tâche est ajoutée à la liste appropriée et la navigation se fait vers HomeComponent.

--page 3Component historique-- 
* affiche une liste de taches en ordre croissant 
* un bouton à côté de chaque tache pour envoyer la tache à la page home sur sa place initiale sur des listes appropriés.

2.Mock 
-------------------
Cette partie de code est une implémentation en TypeScript de la structure de données pour une liste de tâches (ITodo). Elle définit également un ensemble de constantes ITODOS représentant une liste de tâches prédéfinies.

La structure de données ITodo est composée des éléments suivants:

- id : identifiant unique de la tâche
content : description de la tâche
- type : type de la tâche, qui doit appartenir à l'une des catégories suivantes : shopping, health, work, bills, cleaning, other.
isUrgent : indicateur booléen pour spécifier si la tâche est urgente ou non
- isActive : indicateur booléen pour spécifier si la tâche est active ou non
- doneDate : date à laquelle la tâche a été marquée comme terminée, ou null si la tâche n'a pas encore été terminée.

 Utilisation
_________________________________________________________

pour créer une liste de tâches à partir de la structure de données ITodo, et pour manipuler cette liste en ajoutant, supprimant ou modifiant des tâches. Les constantes ITODOS peuvent être utilisées comme point de départ pour une liste de tâches prédéfinies, ou modifiées pour créer des listes de tâches personnalisées.

Utilisation des  méthodes pour manipuler la liste de tâches: 
la méthode push : pour ajouter une tâche à la liste


  3.Service 
-------------------

* L'application utilise un service TodoService pour gérer les tâches.
* Il dispose des méthodes suivantes :
afficherTaches()
- une méthode qui permet afficher ou masquer la seconde partie de la page.
saveTask(task: string, isUrgent: boolean).          
- une méthode qui permet de sauvegarder une nouvelle tâche dans la liste appropriée (isUrgent ou isOrdinary) et de la stocker dans le stockage local.
removeTask(task: {id: number, task: string}, listType: string).          
- une méthode qui permet de supprimer une tâche de la liste appropriée (isUrgent ou isOrdinary) et de la stocker dans le tableau historyList du stockage local.
removeTask(task: {id: number, task: string}, listType: string)           
- une méthode qui permet de supprimer une tâche de la liste appropriée (isUrgent ou isOrdinary) et de la stocker dans le tableau historyList du stockage local.

 4.Local storage 
-------------------
Le stockage local est une fonctionnalité des navigateurs web qui permet aux applications web de stocker des données localement sur l'appareil d'un utilisateur. Ces données peuvent être récupérées et utilisées par l'application web même après que l'utilisateur a fermé le navigateur ou navigué loin du site web.
Pour définir une valeur dans le stockage local :
**
localStorage.setItem('clé', 'valeur');
**
Pour récupérer une valeur depuis le stockage local :
***
const valeur = localStorage.getItem('clé');
***
Pour supprimer une valeur du stockage local :
****
localStorage.removeItem('clé');
****

##### Ce que j'ai appris:

Css: flex: 1;

Tri des tâches par ordre croissant de date: 
nomVariable.sort((a: {date: Date}, b: {date: Date}) => new Date(a.date).getTime() - new Date(b.date).getTime());
Inscription aux événements du router:
 this.router.events.subscribe event => {...}      NavigationEnd, une classe qui représente la fin de la navigation dans l'application.
Verification si l'objet event est une instance de la classe NavigationEnd
if (event instanceof NavigationEnd) {...}

###### Organisation du projet

[Trello](https://trello.com/b/0xD1iheS/to-do-list-simplon)

