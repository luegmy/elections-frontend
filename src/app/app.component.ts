import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private router = inject(Router);

  // Signals para un manejo de estado más eficiente
  isMenuOpen = signal(false);
  showDropdown = signal(false);

  // Convertimos el evento de ruta en un Signal reactivo
  // Esto detecta automáticamente si estamos en el Home o en una vista de filtros
  isInicio = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const url = this.router.url;
        return url === '/' || url.includes('view=all');
      })
    ), 
    { initialValue: true }
  );

  toggleDropdown(state: boolean) {
    this.showDropdown.set(state);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  irAInicio() {
    this.isMenuOpen.set(false);
    // En lugar de recargar la página, navegamos limpiando parámetros
    this.router.navigate(['/'], { queryParams: {} });
  }

  irALista(filtro: string) {
    this.isMenuOpen.set(false);
    this.showDropdown.set(false);
    // Navegación profesional usando queryParams
    this.router.navigate(['/'], { 
      queryParams: { view: 'all', filter: filtro } 
    });
  }
}