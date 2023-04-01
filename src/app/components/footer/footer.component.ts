import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isPage1 = false;
  isPage2 = false;
  isPage3 = false;
  showPage= false;
// Constructeur prend une instance de Router comme argument.
  constructor(private router: Router,
    ) {
//s'inscrire aux événements du router
    this.router.events.subscribe(event => {
// NavigationEnd est une classe qui représente la fin de la navigation de l'utilisateur dans l'application.
//verifie si l'objet event est une instance de la classe NavigationEnd     
if (event instanceof NavigationEnd) {
  switch (event.url) {
    case '/':
      this.isPage1 = true;
      this.isPage2 = false;
      this.isPage3 = false;
      break;
    case '/page2':
      this.isPage1 = false;
      this.isPage2 = true;
      this.isPage3 = false;
      break;
    case '/page3':
      this.isPage1 = false;
      this.isPage2 = false;
      this.isPage3 = true;
      break;
    default:
      this.isPage1 = true;
      this.isPage2 = false;
      this.isPage3 = false;
      break;
  }
 
}
});
}
goPageHome(): void {
  const storedShowPage = localStorage.getItem('showPage');
  const showPage = storedShowPage ? JSON.parse(storedShowPage) : false;
  this.router.navigate(['/'], { queryParams: { showPage: showPage } });
}

goToHomePage() {
  
  this.router.navigate(['/']);
  this.goPageHome()
  
}
goToPage2() {
 this.router.navigateByUrl('/page2');
 
}

goToPage3() {
  this.router.navigateByUrl('/page3');
}
}

