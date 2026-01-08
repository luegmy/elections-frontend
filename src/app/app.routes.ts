import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaCandidatosComponent } from './components/lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from './components/detalle-candidato/detalle-candidato.component';
import { FormularioCandidatoComponent } from './components/formulario-candidato/formulario-candidato.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'candidatos',
    loadComponent: () => import('./components/lista-candidatos/lista-candidatos.component').then(m => m.ListaCandidatosComponent)
  },
  {
    path: 'candidato/:id',
    loadComponent: () => import('./components/detalle-candidato/detalle-candidato.component').then(m => m.DetalleCandidatoComponent)
  },
  {
    path: 'nuevo-candidato',
    loadComponent: () => import('./components/formulario-candidato/formulario-candidato.component').then(m => m.FormularioCandidatoComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];