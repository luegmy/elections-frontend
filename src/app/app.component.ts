import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; // <--- 1. Importar RouterModule
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- 2. DEBE estar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isInicio: boolean = true;
  isMenuOpen: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isInicio = event.url === '/' || event.urlAfterRedirects === '/';
    });
  }

  // Cremos esta función para forzar el salto si el routerLink falla
  irAInicio() {
    this.isMenuOpen = false;
    this.router.navigate(['/']).then(() => {
      // Si ya estás en el inicio, esto limpia todo
      if (this.router.url === '/') {
        window.location.href = '/'; 
      }
    });
  }
}